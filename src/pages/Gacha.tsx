import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Coins, Gift, Info, Sparkles, Store } from 'lucide-react'
import { accountApi, ApiError } from '../api/client'
import type { PullBatch, Rarity } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { ItemPreview } from '../components/ItemPreview'
import { useToasts } from '../components/Toasts'
import { PageLoader } from '../components/States'
import { RARITY_COLOR, RARITY_LABEL, SLOT_LABEL } from '../lib/rarity'
import { useTitle } from '../lib/useTitle'
import { GachaMachine } from '../components/GachaMachine'
import { CapsuleRevealOverlay } from '../components/CapsuleRevealOverlay'
import { playLongCrankSound } from '../lib/gachaAudio'

const RARITIES: Rarity[] = ['legendary', 'epic', 'rare', 'common']

function Pity({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11.5px] text-muted">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-control" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function Gacha() {
  useTitle('Gacha Mesin')
  const { user, loading, refresh } = useAuth()
  const client = useQueryClient()
  const toasts = useToasts()
  const [batch, setBatch] = useState<PullBatch | null>(null)
  const [error, setError] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)

  const state = useQuery({ queryKey: ['gacha'], queryFn: () => accountApi.gacha(), enabled: !!user, staleTime: 10_000 })
  const catalogue = useQuery({
    queryKey: ['profile', 'accessories', user?.level, user?.premium, user?.coins],
    queryFn: ({ signal }) => accountApi.accessories(signal),
    enabled: !!user,
    staleTime: 30_000,
  })

  const byCode = useMemo(() => new Map((catalogue.data?.items ?? []).map((i) => [i.code, i])), [catalogue.data])
  const pool = useMemo(() => (catalogue.data?.items ?? []).filter((i) => i.source === 'gacha'), [catalogue.data])

  const pull = useMutation({
    mutationFn: (count: 1 | 10) => accountApi.pull(count),
    onSuccess: async (b) => {
      setError('')
      setTimeout(() => {
        setIsSpinning(false)
        setBatch(b)
        if (b.newBadges.length > 0) toasts.push(b.newBadges.map((n) => ({ tone: 'badge' as const, title: `Lencana: ${n.name}` })))
      }, 1800)
      await Promise.all([client.invalidateQueries({ queryKey: ['gacha'] }), client.invalidateQueries({ queryKey: ['profile', 'accessories'] }), refresh()])
    },
    onError: (e) => {
      setIsSpinning(false)
      setError(e instanceof ApiError ? e.message : 'Tarikan gagal. Coba lagi.')
    },
  })

  const handleSpin = (count: 1 | 10) => {
    setIsSpinning(true)
    playLongCrankSound()
    pull.mutate(count)
  }

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/gacha" replace />
  const st = state.data
  const coins = st?.coins ?? user.coins

  return (
    <div className="mx-auto max-w-[950px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-line bg-box p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#a855f7]/15 text-[#a855f7]">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[19px] font-black tracking-tight text-heading">Gacha Mesin Kapsul</h1>
            <p className="text-[12.5px] text-muted">
              Putar tuas gacha dan dapatkan border chibi anime legendaris, efek, skin kartu, dan gelar langka!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-[6px] border border-line bg-item px-3 py-1.5 shadow-inner">
          <Coins className="h-4 w-4 text-[#eab308]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Koin Kamu</span>
            <span className="font-mono text-[13px] font-black text-[#eab308]">
              {coins.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-[4px] bg-accent px-4 py-2 text-[13px] font-bold text-white shadow-xs"
        >
          <Gift className="h-4 w-4" /> Mesin Gacha
        </button>
        <Link
          to="/toko"
          className="flex items-center gap-2 rounded-[4px] border border-line bg-box px-4 py-2 text-[13px] font-medium text-sub hover:bg-item hover:text-heading transition"
        >
          <Store className="h-4 w-4 text-[#22c55e]" /> Toko Harian
        </Link>
        <Link
          to="/pengaturan"
          className="flex items-center gap-2 rounded-[4px] border border-line bg-box px-4 py-2 text-[13px] font-medium text-sub hover:bg-item hover:text-heading transition"
        >
          <Sparkles className="h-4 w-4 text-[#38bdf8]" /> Pakai di Profil
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_310px]">
        <Box title="Mesin Pemutar Kapsul" as="h2">
          <div className="p-4 flex flex-col items-center">
            {error && (
              <p role="alert" className="mb-4 w-full rounded-[4px] border border-red-500/30 bg-red-500/15 p-2.5 text-center text-[13px] text-red-400">
                {error}
              </p>
            )}

            <GachaMachine
              isSpinning={isSpinning}
              onSpinOne={() => handleSpin(1)}
              onSpinTen={() => handleSpin(10)}
              costOne={st?.costOne ?? 100}
              costTen={st?.costTen ?? 900}
              userCoins={coins}
              disabled={pull.isPending}
            />

            <p className="mt-4 text-center text-[12px] text-muted">
              Tekan tombol tarik untuk memutar mesin gacha secara otomatis. Duplikat dikembalikan sebagian sebagai koin.
            </p>
          </div>

          {st && (
            <div className="flex flex-wrap items-center justify-around gap-x-4 gap-y-1 border-t border-line px-4 py-3 text-[12px]">
              <div className="flex items-center gap-1.5 text-muted">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Peluang:</span>
              </div>
              {RARITIES.map((r) => (
                <span key={r} className="font-semibold" style={{ color: RARITY_COLOR[r].text }}>
                  {RARITY_LABEL[r]} {st.rates[r]}%
                </span>
              ))}
            </div>
          )}
        </Box>

        <div className="space-y-4">
          <Box title="Status & Jaminan Pity" as="h2">
            <div className="p-4 space-y-3">
              {st && (
                <div className="flex flex-col gap-3">
                  <Pity label="Menuju Epik (Dijamin)" value={st.pityEpic} max={st.pityEpicAt} color={RARITY_COLOR.epic.border} />
                  <Pity label="Menuju Legendaris (Dijamin)" value={st.pityLegend} max={st.pityLegendAt} color={RARITY_COLOR.legendary.border} />
                  <div className="border-t border-line/60 pt-2 text-[12px] text-muted flex justify-between">
                    <span>Total Tarikan:</span>
                    <b className="text-heading">{st.pulls} kali</b>
                  </div>
                </div>
              )}
            </div>
          </Box>

          {st && st.history.length > 0 && (
            <Box title="Riwayat Tarikan Terakhir" as="h2">
              <ul className="max-h-[290px] overflow-y-auto divide-y divide-line px-3 py-1">
                {st.history.slice(0, 10).map((h, i) => (
                  <li key={i} className="flex items-center justify-between py-2 text-[12px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-[11px] px-1.5 py-0.5 rounded-[3px]" style={{ backgroundColor: `${RARITY_COLOR[h.rarity].border}25`, color: RARITY_COLOR[h.rarity].text }}>
                        {RARITY_LABEL[h.rarity]}
                      </span>
                      <span className="truncate text-heading font-medium">{h.name || byCode.get(h.code)?.name || h.code}</span>
                    </div>
                    {h.duplicate && <span className="text-muted text-[11px] shrink-0">duplikat</span>}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </div>
      </div>

      <Box title={`Katalog Border & Koleksi (${pool.filter((i) => i.unlocked).length}/${pool.length})`} as="h2">
        {catalogue.isLoading ? (
          <PageLoader />
        ) : (
          <div className="p-4">
            {RARITIES.map((r) => {
              const items = pool.filter((i) => i.rarity === r).sort((a, b) => (a.unlocked === b.unlocked ? 0 : a.unlocked ? -1 : 1))
              if (items.length === 0) return null
              return (
                <section key={r} className="mb-5 last:mb-0">
                  <div className="mb-2.5 flex items-center justify-between">
                    <h3 className="text-[13px] font-bold" style={{ color: RARITY_COLOR[r].text }}>
                      {RARITY_LABEL[r]} ({items.filter((i) => i.unlocked).length}/{items.length})
                    </h3>
                    <span className="text-[11.5px] text-muted">
                      Refund duplikat: +{st?.refunds[r] ?? 0} koin
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {items.map((i) => (
                      <li
                        key={i.code}
                        className={`flex flex-col items-center gap-1.5 rounded-[6px] border-2 bg-item p-2.5 text-center transition ${
                          i.unlocked ? 'hover:scale-[1.02]' : 'opacity-40 grayscale'
                        }`}
                        style={{ borderColor: `${RARITY_COLOR[r].border}${i.unlocked ? '' : '44'}` }}
                      >
                        <ItemPreview item={i.unlocked ? i : { ...i, name: '???' }} />
                        <span className="text-[12px] font-bold text-heading line-clamp-1">{i.unlocked ? i.name : '???'}</span>
                        <span className="text-[10.5px] text-muted">{SLOT_LABEL[i.slot]}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </Box>

      {batch && <CapsuleRevealOverlay batch={batch} items={byCode} onClose={() => setBatch(null)} />}
    </div>
  )
}
