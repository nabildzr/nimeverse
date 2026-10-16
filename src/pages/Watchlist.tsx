import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Heart, Play } from 'lucide-react'
import { accountApi } from '../api/client'
import type { ListStatus } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { Poster } from '../components/Poster'
import { Empty, ErrorView, PageLoader, Pagination } from '../components/States'
import { seriesPath, watchPath } from '../lib/format'
import { useTitle } from '../lib/useTitle'

export const STATUS_LABEL: Record<ListStatus, string> = {
  plan: 'Rencana',
  watching: 'Sedang ditonton',
  completed: 'Selesai',
  on_hold: 'Ditunda',
  dropped: 'Ditinggalkan',
}

const TABS: { key: string; label: string }[] = [
  { key: '', label: 'Semua' },
  { key: 'watching', label: STATUS_LABEL.watching },
  { key: 'plan', label: STATUS_LABEL.plan },
  { key: 'completed', label: STATUS_LABEL.completed },
  { key: 'on_hold', label: STATUS_LABEL.on_hold },
  { key: 'dropped', label: STATUS_LABEL.dropped },
  { key: 'favorit', label: 'Favorit' },
]

function ContinueRow() {
  const { data } = useQuery({ queryKey: ['continue'], queryFn: ({ signal }) => accountApi.continueWatching(signal), staleTime: 30_000 })
  const items = (data?.items ?? []).filter((i) => !i.completed || i.nextEpisode)
  if (items.length === 0) return null
  return (
    <Box title="Lanjutkan menonton" as="h2">
      <ul className="grid grid-cols-1 gap-2.5 p-[15px] sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((i) => {
          const episode = i.completed && i.nextEpisode ? i.nextEpisode : i.episode
          const pct = !i.completed && i.duration > 0 ? Math.min(100, Math.round((i.position / i.duration) * 100)) : 0
          return (
            <li key={i.slug}>
              <Link to={watchPath(i.slug, episode)} className="flex gap-3 rounded-[4px] bg-item p-2 hover:bg-item-active">
                <Poster src={i.coverImage} alt="" className="h-[72px] w-[52px] flex-none" />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-[13px] font-medium text-heading">{i.title}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[12px] text-muted">
                    <Play className="h-3 w-3" aria-hidden="true" /> Episode {episode}
                  </div>
                  {pct > 0 && (
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-control" aria-hidden="true">
                      <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default function Watchlist() {
  useTitle('Watchlist')
  const { user, loading } = useAuth()
  const [params] = useSearchParams()
  const tab = params.get('status') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)
  const favorite = tab === 'favorit'
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['library', tab, page],
    queryFn: () => accountApi.watchlist(favorite ? '' : tab, favorite, page),
    enabled: !!user,
  })

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/watchlist" replace />

  const href = (status: string, p = 1) => {
    const q = new URLSearchParams()
    if (status) q.set('status', status)
    if (p > 1) q.set('page', String(p))
    const s = q.toString()
    return s ? `/watchlist?${s}` : '/watchlist'
  }

  return (
    <div>
      <ContinueRow />
      <Box title="Watchlist saya" as="h1">
        <div className="flex flex-wrap gap-1.5 p-[15px] pb-0" role="tablist">
          {TABS.map((t) => (
            <Link
              key={t.key}
              to={href(t.key)}
              role="tab"
              aria-selected={tab === t.key}
              className={`rounded-[3px] px-3 py-1 text-[13px] ${tab === t.key ? 'bg-accent text-white' : 'bg-item hover:text-heading'}`}
            >
              {t.label}
            </Link>
          ))}
        </div>
        {isLoading ? (
          <PageLoader />
        ) : error || !data ? (
          <ErrorView error={error} retry={refetch} />
        ) : data.items.length === 0 ? (
          <Empty>
            Belum ada anime di sini. Buka halaman anime dan tambahkan ke daftarmu, atau{' '}
            <Link to="/anime" className="text-accent hover:underline">
              jelajahi daftar anime
            </Link>
            .
          </Empty>
        ) : (
          <ul className="grid grid-cols-3 gap-3 p-[15px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {data.items.map((i) => (
              <li key={i.slug}>
                <Link to={seriesPath(i.slug)} className="block">
                  <div className="relative">
                    <Poster src={i.coverImage} alt={i.title} className="aspect-[225/317] w-full" />
                    {i.favorite && <Heart className="absolute right-1 top-1 h-4 w-4 text-[#e5484d] drop-shadow" fill="currentColor" aria-label="Favorit" role="img" />}
                    <span className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-0.5 text-[11px] text-white">
                      {i.watched}
                      {i.episodesTotal ? ` / ${i.episodesTotal}` : ''} eps
                    </span>
                  </div>
                  <span className="mt-1 line-clamp-2 text-[12.5px] leading-4 text-heading">{i.title}</span>
                  <span className="text-[11px] text-muted">{STATUS_LABEL[i.listStatus]}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {data && <Pagination page={page} totalPages={Math.ceil(data.total / data.pageSize)} href={(p) => href(tab, p)} />}
      </Box>
    </div>
  )
}
