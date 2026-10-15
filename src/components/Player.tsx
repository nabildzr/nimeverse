import { useEffect, useRef } from 'react'
import { ExternalLink, Youtube } from 'lucide-react'
import type { AnimeDetail, Episode, VideoSource } from '../api/types'

/** Plays HLS (via hls.js when not native), MP4, or embeds an iframe source. */
function NativeVideo({ source, poster }: { source: VideoSource; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (source.kind === 'mp4' || video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source.url
      return
    }
    let destroyed = false
    let hls: import('hls.js').default | undefined
    import('hls.js').then(({ default: Hls }) => {
      if (destroyed || !Hls.isSupported()) return
      hls = new Hls({ enableWorker: true })
      hls.loadSource(source.url)
      hls.attachMedia(video)
    })
    return () => {
      destroyed = true
      hls?.destroy()
    }
  }, [source])

  return <video ref={ref} controls playsInline poster={poster} className="h-full w-full bg-black" />
}

export function Player({
  source,
  anime,
  episode,
}: {
  source: VideoSource | undefined
  anime: AnimeDetail
  episode: Episode
}) {
  if (source?.kind === 'iframe') {
    return (
      <iframe
        key={source.id}
        src={source.url}
        title={`${anime.title} Episode ${episode.number}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="no-referrer"
        className="h-full w-full"
      />
    )
  }
  if (source) return <NativeVideo key={source.id} source={source} poster={episode.thumbnail ?? anime.bannerImage ?? undefined} />

  // No registered source: offer the official stream and the trailer instead.
  const bg = episode.thumbnail ?? anime.bannerImage ?? anime.coverImage
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      {bg && <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[2px]" />}
      <div className="relative z-10 max-w-md px-6 text-center">
        <p className="mb-4 text-[14px] text-white">Belum ada sumber video untuk episode ini di server.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {episode.officialUrl && (
            <a
              href={episode.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-accent px-4 py-2 text-[13px] font-medium text-white"
            >
              <ExternalLink className="h-4 w-4" /> Tonton di {episode.officialSite ?? 'situs resmi'}
            </a>
          )}
          {anime.trailerSite === 'youtube' && anime.trailerId && (
            <a
              href={`https://www.youtube.com/watch?v=${anime.trailerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-[#c00] px-4 py-2 text-[13px] font-medium text-white"
            >
              <Youtube className="h-4 w-4" /> Trailer
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
