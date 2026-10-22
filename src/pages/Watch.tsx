import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronLeft, ChevronRight, LayoutGrid, Lightbulb, Maximize2, Minimize2, PlayCircle } from 'lucide-react'
import { accountApi, api } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Comments } from '../components/Comments'
import { DownloadPicker } from '../components/DownloadPicker'
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

  const sources = useMemo(() => {
    const list = data?.sources ? [...data.sources] : []
    if (list.length === 0 && data) {
      if (data.episode.officialUrl && (data.episode.officialUrl.includes('youtube.com') || data.episode.officialUrl.includes('youtu.be'))) {
        let embed = data.episode.officialUrl
        try {
          const u = new URL(embed)
          const listId = u.searchParams.get('list')
          const v = u.searchParams.get('v')
          if (listId) {
            embed = `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`
          } else if (v) {
            embed = `https://www.youtube-nocookie.com/embed/${v}`
          } else if (u.hostname.includes('youtu.be')) {
            const vid = u.pathname.replace(/^\//, '')
            if (vid) embed = `https://www.youtube-nocookie.com/embed/${vid}`
          }
        } catch {}
        list.push({
          id: -1,
          label: 'YouTube Resmi',
          kind: 'iframe',
          url: embed,
          quality: '1080p',
          priority: 10,
        })
      } else if (data.anime.trailerSite === 'youtube' && data.anime.trailerId) {
        list.push({
          id: -2,
          label: 'Trailer / Preview',
          kind: 'iframe',
          url: `https://www.youtube-nocookie.com/embed/${data.anime.trailerId}?autoplay=0`,
          quality: '1080p',
          priority: 5,
        })
      }
    }
    return list
  }, [data])

  const source = useMemo(
    () => sources.find((s) => s.id === sourceId) ?? sources[0],
    [sources, sourceId],
  )

  useTitle(data ? `${data.anime.title} Episode ${number} Subtitle Indonesia` : '')

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

  const { anime, episode, prev, next, recommendations, downloads } = data
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
          <div className="flex flex-wrap items-center justify-between gap-3 bg-box px-[15px] py-2.5 text-[12.5px]">
            {sources.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-muted">Server:</span>
                <select
                  aria-label="Pilih server stream"
                  value={source?.id}
                  onChange={(e) => setSourceId(Number(e.target.value))}
                  className="h-8 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2.5 text-[12.5px] font-medium text-white outline-none focus:border-accent"
                >
                  {sources.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                      {s.quality ? ` (${s.quality})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="ml-auto flex flex-wrap items-center gap-4">
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
        </div>

        {downloads && downloads.length > 0 && <DownloadPicker downloads={downloads} episode={episode.number} />}

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
