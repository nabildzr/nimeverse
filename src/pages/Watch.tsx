import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronLeft, ChevronRight, Download, ExternalLink, LayoutGrid, Lightbulb, Maximize2, Minimize2, Monitor, PlayCircle } from 'lucide-react'
import { accountApi, api } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Comments } from '../components/Comments'
import { useToasts } from '../components/Toasts'
import { useProgress, type PlayerMode } from '../lib/useProgress'
import type { WatchData } from '../api/types'
import { AltTitles, GenreTags, InfoFacts } from '../components/AnimeInfo'
import { Box } from '../components/Box'
import { AnimeCardItem, CardGrid } from '../components/Cards'
import { Player } from '../components/Player'
import { Poster } from '../components/Poster'
import { QuickFilter, SeriesList } from '../components/Sidebar'
import { ErrorView, PageLoader } from '../components/States'
import { formatDate, parseWatchSlug, seriesPath, statusLabel, timeAgo, watchPath } from '../lib/format'
import { pushHistory } from '../lib/history'
import { useTitle } from '../lib/useTitle'
import NotFound from './NotFound'

/** Right column episode list with thumbnails (reference: ".episodelist"). */
function EpisodeSidebar({ data }: { data: WatchData }) {
  const { anime, episodes, episode } = data
  const activeRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [episode.number])

  return (
    <div className="box overflow-hidden">
      <div className="flex items-center gap-3 bg-box p-[15px]">
        <Poster src={anime.coverImage} alt={anime.title} className="h-[50px] w-[50px] flex-none rounded-full" />
        <div className="min-w-0">
          <Link to={seriesPath(anime.slug)} className="line-clamp-2 text-[14px] font-semibold text-heading hover:text-accent">
            {anime.title}
          </Link>
          <div className="text-[13px] italic text-sub">
            {statusLabel(anime.status)} <span className="not-italic text-text">- {episodes.length} / {anime.episodesTotal ?? '?'}</span>
          </div>
        </div>
      </div>
      <ul className="scrollbar-thin max-h-[420px] overflow-y-auto">
        {[...episodes].reverse().map((e) => {
          const active = e.number === episode.number
          return (
            <li key={e.id} ref={active ? activeRef : undefined} className={active ? 'bg-item-active' : 'bg-item'}>
              <Link to={watchPath(anime.slug, e.number)} className="flex gap-2.5 border-t border-line p-2 hover:bg-item-active">
                <div className="relative h-[50px] w-[80px] flex-none overflow-hidden bg-black">
                  {e.thumbnail && <img src={e.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />}
                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <PlayCircle className="h-6 w-6 text-white" />
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className={`line-clamp-2 text-[13px] leading-[1.4] ${active ? 'text-accent' : 'text-heading'}`}>
                    {anime.title} Episode {e.number}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-muted">
                    Episode {e.number} - {formatDate(e.airedAt)}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Watch() {
  const parsed = parseWatchSlug(useParams().watchSlug)
  const slug = parsed?.slug ?? ''
  const number = parsed?.number ?? 0

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['watch', slug, number],
    queryFn: ({ signal }) => api.watch(slug, number, signal),
    enabled: !!parsed,
    staleTime: 60_000,
  })

  const [sourceId, setSourceId] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [lightsOff, setLightsOff] = useState(false)
  const source = useMemo(
    () => data?.sources.find((s) => s.id === sourceId) ?? data?.sources[0],
    [data, sourceId],
  )

  useTitle(data ? `${data.anime.title} Episode ${number} Subtitle Indonesia` : '')

  const groupedDownloads = useMemo(() => {
    const list = data?.downloads
    if (!list || list.length === 0) return {}
    const map: Record<string, typeof list> = {}
    for (const dl of list) {
      const key = `${dl.format.toUpperCase()} ${dl.quality}`
      if (!map[key]) map[key] = []
      map[key].push(dl)
    }
    return map
  }, [data?.downloads])

  const { user } = useAuth()
  const toasts = useToasts()
  const mode: PlayerMode = !source ? 'none' : source.kind === 'iframe' ? 'iframe' : 'native'
  const progress = useProgress({ slug, episode: number, mode })
  const library = useQuery({
    queryKey: ['anime-state', slug],
    queryFn: ({ signal }) => accountApi.animeState(slug, signal),
    enabled: !!user && !!parsed,
    staleTime: 30_000,
  })
  const saved = library.data?.progress[String(number)]
  const alreadyWatched = progress.completed || !!saved?.completed

  useEffect(() => {
    setSourceId(null)
    if (data) {
      pushHistory({ slug, title: data.anime.title, coverImage: data.anime.coverImage, episode: number })
    }
  }, [data, slug, number])

  if (!parsed) return <NotFound />
  if (isLoading) return <PageLoader />
  if (error || !data) return <ErrorView error={error} retry={refetch} />

  const { anime, episode, prev, next, sources, recommendations, downloads } = data
  const navBtn = 'flex h-[39px] items-center justify-center gap-1 rounded-[3px] bg-box text-[13px]'

  return (
    <div className="flex flex-col gap-0 desk:flex-row desk:gap-[25px]">
      {lightsOff && <div className="lights-off" onClick={() => setLightsOff(false)} />}
      <div className="min-w-0 flex-1">
        <div className="mb-[15px] bg-box px-[15px] py-2.5">
          <h1 className="text-[17px] font-semibold leading-[1.6] text-heading">
            {anime.title} Episode {episode.number} Subtitle Indonesia
          </h1>
          <div className="mt-1 text-[11.9px] text-muted">
            Released {timeAgo(episode.airedAt) || '-'} · Series{' '}
            <Link to={seriesPath(anime.slug)} className="text-heading hover:text-accent">
              {anime.title}
            </Link>
          </div>
        </div>

        <div className={`relative ${lightsOff ? 'z-50' : ''} ${expanded ? 'fixed inset-0 z-50 bg-black' : ''}`}>
          <div className={`${expanded ? 'h-full' : 'aspect-video'} w-full bg-black`}>
            <Player source={source} anime={anime} episode={episode} startAt={saved && !saved.completed ? saved.position : undefined} onTime={progress.onTime} />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4 bg-box px-[15px] py-2.5 text-[12.5px]">
            {sources.length > 1 && (
              <select
                aria-label="Pilih server"
                value={source?.id}
                onChange={(e) => setSourceId(Number(e.target.value))}
                className="mr-auto h-7 rounded-[2px] border border-control bg-control px-2 text-[12px] text-text"
              >
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                    {s.quality ? ` ${s.quality}` : ''}
                  </option>
                ))}
              </select>
            )}
            {user && source && (
              <button
                type="button"
                disabled={alreadyWatched}
                onClick={async () => {
                  const ok = await progress.markDone()
                  if (!ok) toasts.push({ tone: 'xp', title: 'Belum bisa ditandai selesai', text: 'Tonton lebih lama dulu, lalu coba lagi.' })
                }}
                className="flex items-center gap-1 hover:text-heading disabled:opacity-60"
              >
                <Check className="h-3.5 w-3.5 text-[#2ecc71]" /> {alreadyWatched ? 'Sudah ditonton' : 'Tandai selesai'}
              </button>
            )}
            <button onClick={() => setExpanded((v) => !v)} className="flex items-center gap-1 hover:text-heading">
              {expanded ? <Minimize2 className="h-3.5 w-3.5 text-[#2ecc71]" /> : <Maximize2 className="h-3.5 w-3.5 text-[#2ecc71]" />}
              {expanded ? 'Shrink' : 'Expand'}
            </button>
            <button onClick={() => setLightsOff((v) => !v)} className="flex items-center gap-1 hover:text-heading">
              <Lightbulb className="h-3.5 w-3.5 text-sub" /> {lightsOff ? 'Turn On Light' : 'Turn Off Light'}
            </button>
          </div>
        </div>

        {sources.length > 0 && (
          <div className="my-[15px] rounded-[8px] border border-[#263e60] bg-[#071426] p-[14px]">
            <div className="mb-2.5 flex items-center gap-2 text-[15px] font-semibold text-white">
              <span className="flex items-center justify-center text-accent">
                <Monitor className="h-4 w-4" />
              </span>
              <strong>SUB</strong>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sources.map((s) => {
                const isActive = source?.id === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSourceId(s.id)}
                    className={`inline-flex min-h-[38px] min-w-[100px] items-center justify-center gap-1.5 rounded-[6px] px-3.5 py-2 text-[13.5px] font-semibold transition-all ${
                      isActive
                        ? 'border border-accent bg-accent text-white shadow-[0_3px_10px_rgba(21,151,245,0.25)]'
                        : 'border border-[#2b405f] bg-[#17263e] text-white hover:border-accent hover:bg-accent/80'
                    }`}
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    {s.label}
                    {s.quality && !s.label.includes(s.quality) ? ` ${s.quality}` : ''}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {downloads && downloads.length > 0 && (
          <div className="my-[15px] rounded-[8px] border border-[#263e60] bg-[#071426] p-[14px]">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[15px] font-semibold text-white">
                <span className="flex items-center justify-center text-accent">
                  <Download className="h-4 w-4" />
                </span>
                <strong>Download Episode {episode.number}</strong>
              </div>
              <span className="hidden sm:inline text-[11.5px] text-muted">
                Pilih resolusi & server unduhan
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {Object.entries(groupedDownloads).map(([groupKey, items]) => (
                <div
                  key={groupKey}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-[6px] border border-[#1b2e47] bg-[#0b1b30] px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-accent/20 border border-accent/40 px-2 py-0.5 text-[12px] font-bold text-accent uppercase tracking-wider">
                      {items[0].format} {items[0].quality}
                    </span>
                    {items[0].size && (
                      <span className="text-[11.5px] text-muted">({items[0].size})</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {items.map((dl) => (
                      <a
                        key={dl.id || dl.url}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2.5 py-1 text-[12px] font-medium text-white hover:border-accent hover:bg-accent/80 transition-all"
                      >
                        <ExternalLink className="h-3 w-3 opacity-60" />
                        {dl.host}
                        <span className="text-[10px] text-muted opacity-80">({dl.provider})</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="my-[15px] grid grid-cols-3 gap-[5px] py-[3px]">
          {prev !== null ? (
            <Link to={watchPath(anime.slug, prev)} className={`${navBtn} hover:bg-accent hover:text-white`}>
              <ChevronLeft className="h-4 w-4" /> Prev
            </Link>
          ) : (
            <span className={`${navBtn} opacity-40`}>
              <ChevronLeft className="h-4 w-4" /> Prev
            </span>
          )}
          <Link to={seriesPath(anime.slug)} className={`${navBtn} hover:bg-accent hover:text-white`}>
            <LayoutGrid className="h-4 w-4" /> All Episodes
          </Link>
          {next !== null ? (
            <Link to={watchPath(anime.slug, next)} className={`${navBtn} hover:bg-accent hover:text-white`}>
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className={`${navBtn} opacity-40`}>
              Next <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <div className="mb-[18px] desk:hidden">
          <EpisodeSidebar data={data} />
        </div>

        <div className="box flex flex-col gap-4 p-[15px] sm:flex-row">
          <Poster src={anime.coverImage} alt={anime.title} className="mx-auto aspect-[225/317] w-[140px] flex-none sm:mx-0" />
          <div className="min-w-0">
            <h2 className="mb-1 text-[17px] font-bold text-heading">{anime.title}</h2>
            <AltTitles anime={anime} />
            <InfoFacts anime={anime} episodeCount={data.episodes.length} />
            <GenreTags anime={anime} />
            <p className="line-clamp-[6] whitespace-pre-line text-[13.5px] leading-[1.7]">{anime.synopsis}</p>
          </div>
        </div>

        <Comments target={{ anime: anime.slug, episode: episode.number }} title={`Komentar Episode ${episode.number}`} />

        {recommendations.length > 0 && (
          <Box title="Recommended Series" as="h3">
            <CardGrid>
              {recommendations.map((a) => (
                <AnimeCardItem key={a.id} item={a} />
              ))}
            </CardGrid>
          </Box>
        )}
      </div>

      <aside className="w-full desk:w-[320px] desk:flex-none min-[1100px]:w-[360px]">
        <div className="mb-[18px] hidden desk:block">
          <EpisodeSidebar data={data} />
        </div>
        <QuickFilter />
        {recommendations.length > 0 && (
          <Box title="Serupa" as="h3">
            <SeriesList items={recommendations} />
          </Box>
        )}
      </aside>
    </div>
  )
}
