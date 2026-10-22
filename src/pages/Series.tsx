import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Youtube } from 'lucide-react'
import { api } from '../api/client'
import { Comments } from '../components/Comments'
import { ListButton } from '../components/ListButton'
import { AltTitles, GenreTags, InfoFacts } from '../components/AnimeInfo'
import { Box } from '../components/Box'
import { AnimeCardItem, CardGrid } from '../components/Cards'
import { EpisodeList } from '../components/EpisodeList'
import { SeriesDownloads } from '../components/SeriesDownloads'
import { TwoColumn } from '../components/Layout'
import { Poster } from '../components/Poster'
import { Sidebar } from '../components/Sidebar'
import { ErrorView, PageLoader } from '../components/States'
import { countdown, watchPath } from '../lib/format'
import { lastWatched } from '../lib/history'
import { useTitle } from '../lib/useTitle'

export default function Series() {
  const { slug = '' } = useParams()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['anime', slug],
    queryFn: ({ signal }) => api.detail(slug, signal),
    staleTime: 120_000,
  })
  const [showTrailer, setShowTrailer] = useState(false)
  useTitle(data ? `Nonton ${data.anime.title} Subtitle Indonesia` : '')

  const hasAnyStream = useMemo(
    () => (data?.episodes ? data.episodes.some((e) => e.hasStream) : false),
    [data?.episodes],
  )

  if (isLoading) return <PageLoader />
  if (error || !data) return <ErrorView error={error} retry={refetch} />

  const { anime, episodes, recommendations, downloads = [] } = data
  const first = episodes.at(-1)
  const last = episodes[0]
  const history = lastWatched(slug)
  const trailer = anime.trailerSite === 'youtube' && anime.trailerId ? anime.trailerId : null

  return (
    <TwoColumn sidebar={<Sidebar />}>
      <article className="box">
        <div className="flex flex-col gap-4 p-[15px] sm:flex-row sm:gap-[14px] sm:pb-[25px]">
          <div className="mx-auto w-[165px] flex-none sm:mx-0">
            <Poster src={anime.coverImage} alt={anime.title} color={anime.coverColor} eager className="aspect-[225/317] w-full" />
            <div className="mt-2.5 flex flex-col gap-1.5">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex h-[35px] items-center justify-center gap-1.5 rounded-[5px] bg-[#c00] text-[13px] text-white hover:bg-[#e00]"
                >
                  <Youtube className="h-4 w-4" /> Trailer
                </button>
              )}
              <ListButton slug={slug} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="mb-2.5 text-[19px] font-bold leading-[1.5] text-heading">{anime.title}</h1>
            <p className="mb-2.5 text-[14px] leading-[1.6]">
              Nonton <b className="text-heading">{anime.title}</b> subtitle Indonesia. Daftar episode, jadwal tayang, dan
              informasi lengkap tersedia di bawah.
            </p>
            <AltTitles anime={anime} />
            <InfoFacts anime={anime} episodeCount={episodes.length} />
            <GenreTags anime={anime} />
            {anime.nextAiringAt && anime.nextAiringEpisode && (
              <div className="mt-2 inline-block rounded-[3px] bg-item px-3 py-2 text-[13px]">
                Episode {anime.nextAiringEpisode} tayang dalam{' '}
                <b className="text-sub">{countdown(anime.nextAiringAt)}</b>
              </div>
            )}
          </div>
        </div>
      </article>

      <Box title={`Synopsis ${anime.title}`}>
        <div className="whitespace-pre-line p-[15px] text-[14px] leading-[1.7]">
          {anime.synopsis || 'Sinopsis belum tersedia.'}
        </div>
      </Box>

      {/* Watch section: rendered if there are streamable episodes */}
      {hasAnyStream && (
        <Box title={`Watch ${anime.title}`}>
          {first && last && (
            <div className="m-2.5 grid grid-cols-2">
              {[
                { label: 'First Episode', ep: first },
                { label: history ? 'Lanjutkan' : 'New Episode', ep: history ? { ...last, number: history.episode } : last },
              ].map(({ label, ep }) => (
                <Link
                  key={label}
                  to={watchPath(slug, ep.number)}
                  className="m-[5px] rounded-[5px] bg-nav p-[15px] text-center text-white hover:bg-accent"
                >
                  <span className="block text-[14px]">{label}</span>
                  <span className="block text-[20px] font-semibold">Episode {ep.number}</span>
                </Link>
              ))}
            </div>
          )}
          <EpisodeList slug={slug} title={anime.title} episodes={episodes} />
        </Box>
      )}

      {/* Download section on Anime Detail page (Batch & Episode downloads) */}
      {downloads.length > 0 && (
        <Box title={`Download ${anime.title}`}>
          <SeriesDownloads downloads={downloads} />
        </Box>
      )}

      {/* When neither streaming episodes nor downloads exist */}
      {!hasAnyStream && downloads.length === 0 && (
        <Box title="Status Episode & Unduhan">
          <div className="p-6 text-center text-[13.5px] text-muted">
            Belum ada video streaming atau link unduhan yang tersedia untuk anime ini di server.
          </div>
        </Box>
      )}

      <Comments target={{ anime: slug }} title="Diskusi" />

      {recommendations.length > 0 && (
        <Box title="Recommended Series">
          <CardGrid>
            {recommendations.map((a) => (
              <AnimeCardItem key={a.id} item={a} />
            ))}
          </CardGrid>
        </Box>
      )}

      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-label="Trailer"
          onClick={() => setShowTrailer(false)}
        >
          <div className="aspect-video w-full max-w-3xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=1`}
              title={`Trailer ${anime.title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </TwoColumn>
  )
}
