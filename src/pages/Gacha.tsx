import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Coins, Gift, Info, Sparkles } from 'lucide-react'
import { accountApi, ApiError } from '../api/client'
import type { Accessory, PullBatch, Rarity } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { ItemPreview, RarityTag } from '../components/ItemPreview'
import { useToasts } from '../components/Toasts'
import { PageLoader } from '../components/States'
import { RARITY_COLOR, RARITY_LABEL, SLOT_LABEL } from '../lib/rarity'
import { useTitle } from '../lib/useTitle'

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

/** Cards fall in one after another; epic and legendary pulls glow so they are easy to spot in a ten pull. */
function Reveal({ batch, items, onClose }: { batch: PullBatch; items: Map<string, Accessory>; onClose: () => void }) {
  return (
    <div role="dialog" aria-label="Hasil gacha" className="fixed inset-0 z-[70] flex flex-col items-center overflow-y-auto bg-black/90 p-4">
      <h2 className="mt-6 mb-4 text-[20px] font-bold text-white">Hasil tarikan</h2>
      <ul className={`grid w-full max-w-[880px] gap-3 ${batch.results.length > 1 ? 'grid-cols-2 sm:grid-cols-5' : 'max-w-[220px] grid-cols-1'}`}>
        {batch.results.map((r, i) => {
          const c = RARITY_COLOR[r.rarity]
          const item = items.get(r.code)
          const glow = r.rarity === 'epic' || r.rarity === 'legendary'
          return (
            <li
              key={i}
              className={`reveal-card flex flex-col items-center gap-2 rounded-[6px] border-2 bg-box p-3 text-center ${glow ? 'glow' : ''}`}
              style={{ borderColor: c.border, animationDelay: `${i * 120}ms`, ['--glow' as string]: c.glow }}
            >
              <ItemPreview item={{ code: r.code, slot: r.slot, name: r.name }} />
              <span className="text-[13px] font-semibold text-heading">{r.name}</span>
              <RarityTag rarity={r.rarity} />
              <span className="text-[11px] text-muted">{SLOT_LABEL[r.slot]}</span>
              {r.duplicate ? (
                <span className="rounded-[3px] bg-item px-1.5 py-0.5 text-[11px] text-sub">Duplikat +{r.refund} koin</span>
              ) : (
                <span className="rounded-[3px] bg-[#2ecc71]/20 px-1.5 py-0.5 text-[11px] font-semibold text-[#2ecc71]">BARU!</span>
              )}
              {!r.duplicate && item && <span className="sr-only">{item.description}</span>}
            </li>
          )
        })}
      </ul>
      {batch.newBadges.length > 0 && <p className="mt-4 text-[13px] text-sub">Lencana baru: {batch.newBadges.map((b) => b.name).join(', ')}</p>}
      <p className="mt-3 text-[12.5px] text-muted">
        Sisa koin: <b className="text-heading">{batch.coins.toLocaleString('id-ID')}</b>
        {batch.refunded > 0 && <> (kembali {batch.refunded} dari duplikat)</>}
      </p>
      <div className="mt-4 mb-8 flex gap-2">
        <button onClick={onClose} className="h-10 rounded-[3px] bg-accent px-8 text-[14px] font-semibold text-white hover:brightness-110">
          Oke
        </button>
        <Link to="/pengaturan" className="flex h-10 items-center rounded-[3px] bg-nav px-6 text-[14px] text-white hover:bg-accent">
          Pakai di profil
        </Link>
      </div>
    </div>
  )
}

export default function Gacha() {
  useTitle('Gacha')
  const { user, loading, refresh } = useAuth()
  const client = useQueryClient()
  const toasts = useToasts()
  const [batch, setBatch] = useState<PullBatch | null>(null)
  const [error, setError] = useState('')

  const state = useQuery({ queryKey: ['gacha'], queryFn: () => accountApi.gacha(), enabled: !!user, staleTime: 10_000 })
  const catalogue = useQuery({ queryKey: ['profile', 'accessories', user?.level, user?.premium, user?.coins], queryFn: ({ signal }) => accountApi.accessories(signal), enabled: !!user, staleTime: 30_000 })

  const byCode = useMemo(() => new Map((catalogue.data?.items ?? []).map((i) => [i.code, i])), [catalogue.data])
  const pool = useMemo(() => (catalogue.data?.items ?? []).filter((i) => i.source === 'gacha'), [catalogue.data])

  const pull = useMutation({
    mutationFn: (count: 1 | 10) => accountApi.pull(count),
    onSuccess: async (b) => {
      setError('')
      setBatch(b)
      if (b.newBadges.length > 0) toasts.push(b.newBadges.map((n) => ({ tone: 'badge' as const, title: `Lencana: ${n.name}` })))
      await Promise.all([client.invalidateQueries({ queryKey: ['gacha'] }), client.invalidateQueries({ queryKey: ['profile', 'accessories'] }), refresh()])
    },
    onError: (e) => setError(e instanceof ApiError ? e.message : 'Tarikan gagal. Coba lagi.'),
  })

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/gacha" replace />
  const st = state.data
  const coins = st?.coins ?? user.coins
  const busy = pull.isPending

  return (
    <div className="mx-auto max-w-[900px]">
      <Box title="Gacha" as="h1">
        <div className="grid gap-4 p-[18px] md:grid-cols-[1fr_280px]">
          <div>
            <p className="text-[13.5px] leading-[1.7]">
              Tukar koin dengan bingkai, efek banner, skin kartu, dan gelar yang tidak dijual di tempat lain. Koin didapat dari menonton, berkomentar, level-up,
              dan{' '}
              <Link to="/misi" className="text-accent hover:underline">
                misi harian
              </Link>
              . Item yang sama dua kali dikembalikan sebagian sebagai koin.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                disabled={busy || !st || coins < st.costOne}
                onClick={() => pull.mutate(1)}
                className="flex h-11 items-center gap-2 rounded-[4px] bg-nav px-5 text-[14px] font-semibold text-white hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Gift className="h-4 w-4" aria-hidden="true" /> Tarik x1 <span className="text-[12px] font-normal opacity-80">{st?.costOne ?? 100} koin</span>
              </button>
              <button
                disabled={busy || !st || coins < st.costTen}
                onClick={() => pull.mutate(10)}
                className="flex h-11 items-center gap-2 rounded-[4px] bg-accent px-5 text-[14px] font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Tarik x10 <span className="text-[12px] font-normal opacity-80">{st?.costTen ?? 900} koin</span>
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-[13px] text-[#e5484d]">
                {error}
              </p>
            )}
          </div>
          <div className="rounded-[4px] bg-item p-3">
            <div className="mb-3 flex items-center gap-2 text-[18px] font-bold text-heading">
              <Coins className="h-5 w-5 text-sub" aria-hidden="true" /> {coins.toLocaleString('id-ID')}
              <span className="text-[12px] font-normal text-muted">koin</span>
            </div>
            {st && (
              <div className="flex flex-col gap-2.5">
                <Pity label="Menuju epik (dijamin)" value={st.pityEpic} max={st.pityEpicAt} color={RARITY_COLOR.epic.border} />
                <Pity label="Menuju legendaris (dijamin)" value={st.pityLegend} max={st.pityLegendAt} color={RARITY_COLOR.legendary.border} />
                <p className="text-[11.5px] text-muted">{st.pulls} tarikan sejauh ini</p>
              </div>
            )}
          </div>
        </div>
        {st && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-[18px] py-2.5 text-[12px] text-muted">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            {RARITIES.map((r) => (
              <span key={r} style={{ color: RARITY_COLOR[r].text }}>
                {RARITY_LABEL[r]} {st.rates[r]}%
              </span>
            ))}
          </div>
        )}
      </Box>

      <Box title={`Koleksi (${pool.filter((i) => i.unlocked).length}/${pool.length})`} as="h2">
        {catalogue.isLoading ? (
          <PageLoader />
        ) : (
          <div className="p-[15px]">
            {RARITIES.map((r) => {
              const items = pool.filter((i) => i.rarity === r)
              if (items.length === 0) return null
              return (
                <section key={r} className="mb-4">
                  <h3 className="mb-2 text-[13px] font-semibold" style={{ color: RARITY_COLOR[r].text }}>
                    {RARITY_LABEL[r]} ({items.filter((i) => i.unlocked).length}/{items.length}) · duplikat +{st?.refunds[r] ?? 0} koin
                  </h3>
                  <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                    {items.map((i) => (
                      <li key={i.code} className={`flex flex-col items-center gap-1.5 rounded-[4px] border-2 bg-item p-2.5 text-center ${i.unlocked ? '' : 'opacity-45 grayscale'}`} style={{ borderColor: `${RARITY_COLOR[r].border}${i.unlocked ? '' : '55'}` }}>
                        <ItemPreview item={i.unlocked ? i : { ...i, name: '???' }} />
                        <span className="text-[12.5px] font-semibold text-heading">{i.unlocked ? i.name : '???'}</span>
                        <span className="text-[11px] text-muted">{SLOT_LABEL[i.slot]}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </Box>

      {st && st.history.length > 0 && (
        <Box title="Riwayat tarikan" as="h2">
          <ul className="divide-y divide-line px-[15px] py-1">
            {st.history.map((h, i) => (
              <li key={i} className="flex items-center gap-2 py-1.5 text-[12.5px]">
                <span className="w-[72px] font-semibold" style={{ color: RARITY_COLOR[h.rarity].text }}>
                  {RARITY_LABEL[h.rarity]}
                </span>
                <span className="min-w-0 flex-1 truncate text-heading">{h.name || byCode.get(h.code)?.name || h.code}</span>
                {h.duplicate && <span className="text-muted">duplikat</span>}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {batch && <Reveal batch={batch} items={byCode} onClose={() => setBatch(null)} />}
    </div>
  )
}
