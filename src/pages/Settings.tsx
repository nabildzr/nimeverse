import { useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Crown, Trash2, Upload } from 'lucide-react'
import { accountApi, ApiError, bannerUrl } from '../api/client'
import type { Accessory, AccessorySlot } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { userFace } from '../components/Avatar'
import { Box } from '../components/Box'
import { AccessoryArt, FramedAvatar } from '../components/Decor'
import { ItemPreview, RarityTag, SourceTag } from '../components/ItemPreview'
import { RARITY_COLOR } from '../lib/rarity'
import { PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

const MAX_UPLOAD = 3 * 1024 * 1024

function msg(e: unknown): string {
  return e instanceof ApiError ? e.message : 'Tidak dapat terhubung ke server.'
}

function Status({ ok, text }: { ok: boolean; text: string }) {
  if (!text) return null
  return (
    <p role={ok ? 'status' : 'alert'} className={`text-[12.5px] ${ok ? 'text-[#2ecc71]' : 'text-[#e5484d]'}`}>
      {text}
    </p>
  )
}

function ProfileForm() {
  const { user, refresh } = useAuth()
  const [name, setName] = useState(user?.displayName ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [isPublic, setPublic] = useState(user?.profilePublic ?? true)
  const [favPublic, setFavPublic] = useState(user?.favoritesPublic ?? true)
  const [state, setState] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  if (!user) return null

  return (
    <form
      className="flex flex-col gap-3 p-[15px]"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        try {
          await accountApi.updateMe({ displayName: name.trim(), bio: bio.trim(), profilePublic: isPublic, favoritesPublic: favPublic })
          await refresh()
          setState({ ok: true, text: 'Tersimpan.' })
        } catch (err) {
          setState({ ok: false, text: msg(err) })
        } finally {
          setBusy(false)
        }
      }}
    >
      <label className="block text-[13px]">
        Nama tampilan
        <input value={name} onChange={(e) => setName(e.target.value)} minLength={3} maxLength={24} required className="mt-1 h-10 w-full rounded-[3px] border border-input-border bg-input px-3 text-heading outline-none focus:border-accent" />
      </label>
      <label className="block text-[13px]">
        Bio
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={300} rows={3} className="mt-1 w-full rounded-[3px] border border-input-border bg-input p-3 text-heading outline-none focus:border-accent" />
        <span className="text-[11.5px] text-muted">{bio.length}/300</span>
      </label>
      <label className="flex items-start gap-2 text-[13px]">
        <input type="checkbox" checked={isPublic} onChange={(e) => setPublic(e.target.checked)} className="mt-1" />
        <span>
          Profil publik
          <span className="block text-[11.5px] text-muted">Profil terlihat orang lain dan kamu muncul di papan peringkat. Jika dimatikan, namamu di komentar tetap tampil.</span>
        </span>
      </label>
      <label className="flex items-start gap-2 text-[13px]">
        <input type="checkbox" checked={favPublic} onChange={(e) => setFavPublic(e.target.checked)} className="mt-1" />
        <span>
          Tampilkan anime favorit di profil
          <span className="block text-[11.5px] text-muted">Watchlist lain tetap pribadi.</span>
        </span>
      </label>
      <Status {...state} />
      <button disabled={busy} className="h-9 w-fit rounded-[3px] bg-accent px-5 text-[13.5px] font-medium text-white disabled:opacity-60">
        Simpan
      </button>
    </form>
  )
}

function AvatarForm() {
  const { user, refresh } = useAuth()
  const input = useRef<HTMLInputElement>(null)
  const [state, setState] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  if (!user) return null

  const upload = async (file: File | undefined) => {
    if (!file) return
    if (file.size > MAX_UPLOAD) return setState({ ok: false, text: 'Ukuran file maksimal 3 MB.' })
    setBusy(true)
    try {
      await accountApi.uploadAvatar(file)
      await refresh()
      setState({ ok: true, text: 'Foto profil diperbarui.' })
    } catch (err) {
      setState({ ok: false, text: msg(err) })
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-3 p-[15px] sm:flex-row sm:items-center">
      <div className="flex-none p-3">
        <FramedAvatar face={userFace(user)} frame={user.frame} size={88} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <input ref={input} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} aria-label="Pilih foto profil" />
          <button disabled={busy} onClick={() => input.current?.click()} className="flex h-9 items-center gap-1.5 rounded-[3px] bg-nav px-4 text-[13px] text-white hover:bg-accent disabled:opacity-60">
            <Upload className="h-4 w-4" aria-hidden="true" /> {busy ? 'Mengunggah...' : 'Unggah foto'}
          </button>
          {user.hasAvatar && (
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true)
                try {
                  await accountApi.removeAvatar()
                  await refresh()
                  setState({ ok: true, text: 'Foto dihapus.' })
                } catch (err) {
                  setState({ ok: false, text: msg(err) })
                } finally {
                  setBusy(false)
                }
              }}
              className="flex h-9 items-center gap-1.5 rounded-[3px] bg-item px-4 text-[13px] hover:text-[#e5484d]"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus
            </button>
          )}
        </div>
        <p className="text-[11.5px] text-muted">
          PNG, JPG, atau WebP sampai 3 MB.{' '}
          {user.premium ? (
            'GIF animasi (maks. 2 MB) tersedia untuk akun Premium kamu.'
          ) : (
            <>
              GIF animasi khusus{' '}
              <Link to="/premium" className="text-sub hover:underline">
                Premium
              </Link>
              .
            </>
          )}{' '}
          Metadata foto dibuang otomatis.
        </p>
        <Status {...state} />
      </div>
    </div>
  )
}

function AccentForm() {
  const { user, refresh } = useAuth()
  const { data } = useQuery({ queryKey: ['profile', 'palette'], queryFn: () => accountApi.me(), staleTime: Infinity })
  const [state, setState] = useState({ ok: false, text: '' })
  if (!user) return null
  const choose = async (color: string) => {
    try {
      await accountApi.updateMe({ accentColor: color })
      await refresh()
      setState({ ok: true, text: color ? 'Warna disimpan.' : 'Warna dihapus.' })
    } catch (err) {
      setState({ ok: false, text: msg(err) })
    }
  }
  return (
    <div className="p-[15px]">
      <p className="mb-2 text-[12.5px] text-muted">Warna nama dan bingkai foto kamu di komentar dan profil.</p>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Warna aksen">
        {(data?.palette ?? []).map((c) => (
          <button
            key={c}
            disabled={!user.premium}
            onClick={() => void choose(c)}
            aria-label={`Warna ${c}`}
            aria-pressed={user.accentColor === c}
            style={{ backgroundColor: c }}
            className={`h-8 w-8 rounded-full border-2 disabled:cursor-not-allowed disabled:opacity-40 ${user.accentColor === c ? 'border-white' : 'border-transparent'}`}
          />
        ))}
        {user.accentColor && (
          <button onClick={() => void choose('')} className="text-[12.5px] text-muted hover:text-heading">
            Hapus warna
          </button>
        )}
      </div>
      {!user.premium && (
        <p className="mt-2 text-[12.5px]">
          <Crown className="mr-1 inline h-3.5 w-3.5 text-sub" aria-hidden="true" />
          Khusus{' '}
          <Link to="/premium" className="text-sub hover:underline">
            Premium
          </Link>
          .
        </p>
      )}
      <Status {...state} />
    </div>
  )
}

function PasswordForm() {
  const { user } = useAuth()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [state, setState] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  if (!user) return null
  if (!user.hasPassword) {
    return <p className="p-[15px] text-[13px] text-muted">Akun ini masuk dengan Google dan tidak memakai password.</p>
  }
  const field = 'mt-1 h-10 w-full rounded-[3px] border border-input-border bg-input px-3 text-heading outline-none focus:border-accent'
  return (
    <form
      className="flex flex-col gap-3 p-[15px]"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        try {
          await accountApi.changePassword(current, next)
          setCurrent('')
          setNext('')
          setState({ ok: true, text: 'Password diganti. Perangkat lain keluar otomatis.' })
        } catch (err) {
          setState({ ok: false, text: msg(err) })
        } finally {
          setBusy(false)
        }
      }}
    >
      <label className="block text-[13px]">
        Password saat ini
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" className={field} />
      </label>
      <label className="block text-[13px]">
        Password baru
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} required minLength={8} autoComplete="new-password" className={field} />
      </label>
      <Status {...state} />
      <button disabled={busy} className="h-9 w-fit rounded-[3px] bg-nav px-5 text-[13.5px] text-white hover:bg-accent disabled:opacity-60">
        Ganti password
      </button>
    </form>
  )
}

function BannerForm() {
  const { user, refresh } = useAuth()
  const input = useRef<HTMLInputElement>(null)
  const [state, setState] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  if (!user) return null

  const upload = async (file: File | undefined) => {
    if (!file) return
    if (file.size > MAX_UPLOAD) return setState({ ok: false, text: 'Ukuran file maksimal 3 MB.' })
    setBusy(true)
    try {
      await accountApi.uploadBanner(file)
      await refresh()
      setState({ ok: true, text: 'Banner diperbarui. Semua orang bisa melihatnya di profilmu.' })
    } catch (err) {
      setState({ ok: false, text: msg(err) })
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="p-[15px]">
      <div className="relative aspect-[3/1] w-full overflow-hidden rounded-[4px] bg-gradient-to-br from-nav to-item sm:aspect-[4/1]">
        {user.hasBanner && <img src={bannerUrl(user.displayName, user.bannerVersion)} alt="Banner profil" className="absolute inset-0 h-full w-full object-cover" />}
        <AccessoryArt slot="effect" code={user.effect} cover className="absolute inset-0 h-full w-full" />
        {!user.hasBanner && <span className="absolute inset-0 flex items-center justify-center text-[13px] text-muted">Belum ada banner</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input ref={input} type="file" accept="image/png,image/jpeg,image/gif" className="hidden" onChange={(e) => void upload(e.target.files?.[0])} aria-label="Pilih banner" />
        <button disabled={busy} onClick={() => input.current?.click()} className="flex h-9 items-center gap-1.5 rounded-[3px] bg-nav px-4 text-[13px] text-white hover:bg-accent disabled:opacity-60">
          <Upload className="h-4 w-4" aria-hidden="true" /> {busy ? 'Mengunggah...' : 'Unggah banner'}
        </button>
        {user.hasBanner && (
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              try {
                await accountApi.removeBanner()
                await refresh()
                setState({ ok: true, text: 'Banner dihapus.' })
              } catch (err) {
                setState({ ok: false, text: msg(err) })
              } finally {
                setBusy(false)
              }
            }}
            className="flex h-9 items-center gap-1.5 rounded-[3px] bg-item px-4 text-[13px] hover:text-[#e5484d]"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Hapus
          </button>
        )}
      </div>
      <p className="mt-2 text-[11.5px] text-muted">
        PNG atau JPG, 400x100 sampai 2400x1200 piksel, maksimal 3 MB. Rasio 4:1 (mis. 1600x400) paling pas.{' '}
        {user.premium ? (
          'GIF animasi tersedia untuk akun Premium kamu.'
        ) : (
          <>
            GIF animasi khusus{' '}
            <Link to="/premium" className="text-sub hover:underline">
              Premium
            </Link>
            .
          </>
        )}
      </p>
      <div className="mt-1">
        <Status {...state} />
      </div>
    </div>
  )
}

function AccessoryCard({ item, active, onPick, busy }: { item: Accessory; active: boolean; onPick: () => void; busy: boolean }) {
  const border = item.rarity ? RARITY_COLOR[item.rarity].border : undefined
  return (
    <li>
      <button
        type="button"
        disabled={busy || !item.unlocked}
        onClick={onPick}
        aria-pressed={active}
        style={active ? undefined : { borderColor: border ? `${border}66` : undefined }}
        className={`flex w-full flex-col items-center gap-2 rounded-[4px] border-2 bg-item p-3 text-center ${active ? 'border-accent' : 'border-transparent'} ${item.unlocked ? 'hover:bg-item-active' : 'cursor-not-allowed opacity-60'}`}
      >
        <ItemPreview item={item} />
        <span className="text-[13px] font-semibold text-heading">{item.name}</span>
        <RarityTag rarity={item.rarity} />
        <span className="text-[11.5px] leading-4 text-muted">{item.description}</span>
        <span className="flex items-center gap-1 text-[11.5px]">
          <SourceTag item={item} active={active} />
        </span>
      </button>
    </li>
  )
}

function AccessoriesForm() {
  const { user, refresh } = useAuth()
  const { data } = useQuery({
    queryKey: ['profile', 'accessories', user?.level, user?.premium, user?.coins],
    queryFn: ({ signal }) => accountApi.accessories(signal),
    staleTime: 30_000,
  })
  const [state, setState] = useState({ ok: false, text: '' })
  const [busy, setBusy] = useState(false)
  if (!user) return null

  const wear = async (slot: AccessorySlot, code: string) => {
    setBusy(true)
    try {
      await accountApi.equip({ [slot]: code })
      await refresh()
      setState({ ok: true, text: code ? 'Aksesoris dipakai.' : 'Aksesoris dilepas.' })
    } catch (err) {
      setState({ ok: false, text: msg(err) })
    } finally {
      setBusy(false)
    }
  }

  const sections: { slot: AccessorySlot; title: string; hint: string; cols: string }[] = [
    { slot: 'frame', title: 'Bingkai foto', hint: 'Animasi di sekeliling foto profilmu.', cols: 'grid-cols-2 sm:grid-cols-3' },
    { slot: 'effect', title: 'Efek banner', hint: 'Animasi yang bermain di atas banner profilmu.', cols: 'grid-cols-1 sm:grid-cols-2' },
    { slot: 'skin', title: 'Skin kartu', hint: 'Latar animasi untuk kartu profil yang muncul saat fotomu diklik.', cols: 'grid-cols-1 sm:grid-cols-2' },
    { slot: 'title', title: 'Gelar', hint: 'Teks di bawah namamu pada kartu profil.', cols: 'grid-cols-2 sm:grid-cols-3' },
  ]
  const worn: Record<AccessorySlot, string | undefined> = { frame: user.frame, effect: user.effect, skin: user.skin, title: user.title }
  return (
    <div className="p-[15px]">
      <p className="mb-3 text-[12.5px] text-muted">
        Sebagian terbuka dengan naik level, sebagian khusus Premium, dan sisanya hanya dari{' '}
        <Link to="/gacha" className="text-accent hover:underline">
          gacha
        </Link>
        . Pilihanmu terlihat oleh semua orang.
      </p>
      {sections.map(({ slot, title, hint, cols }) => {
        const items = (data?.items ?? []).filter((i) => i.slot === slot)
        const current = worn[slot]
        return (
          <section key={slot} className="mb-4">
            <div className="mb-2 flex flex-wrap items-center gap-x-3">
              <h3 className="text-[14px] font-semibold text-heading">{title}</h3>
              <span className="text-[12px] text-muted">{hint}</span>
              {current && (
                <button disabled={busy} onClick={() => void wear(slot, '')} className="ml-auto text-[12.5px] text-muted hover:text-heading">
                  Lepas
                </button>
              )}
            </div>
            <ul className={`grid gap-2.5 ${cols}`}>
              {items.map((i) => (
                <AccessoryCard key={i.code} item={i} active={current === i.code} busy={busy} onPick={() => void wear(slot, i.code)} />
              ))}
            </ul>
          </section>
        )
      })}
      <Status {...state} />
    </div>
  )
}

export default function Settings() {
  useTitle('Pengaturan akun')
  const { user, loading } = useAuth()
  const [params] = useSearchParams()
  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/pengaturan" replace />

  return (
    <div className="mx-auto max-w-[680px]">
      {params.get('baru') && (
        <div role="status" className="mb-[18px] rounded-[3px] bg-accent/15 px-4 py-3 text-[13.5px]">
          Selamat datang, <b className="text-heading">{user.displayName}</b>! Atur foto dan profilmu di sini, lalu mulai nonton untuk mengumpulkan XP.
        </div>
      )}
      <Box title="Foto profil" as="h2">
        <AvatarForm />
      </Box>
      <Box title="Banner profil" as="h2">
        <BannerForm />
      </Box>
      <Box title="Profil" as="h2">
        <ProfileForm />
      </Box>
      <Box title="Aksesoris" as="h2">
        <AccessoriesForm />
      </Box>
      <Box title="Warna aksen" as="h2">
        <AccentForm />
      </Box>
      <Box title="Keamanan" as="h2">
        <PasswordForm />
      </Box>
    </div>
  )
}
