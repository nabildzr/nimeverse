import { Link } from 'react-router-dom'
import type { AnimeDetail } from '../api/types'
import { formatDate, formatLabel, seasonLabel, statusLabel } from '../lib/format'

/** Two-column "Status / Studio / Released..." facts block (reference: ".spe"). */
export function InfoFacts({ anime, episodeCount }: { anime: AnimeDetail; episodeCount: number }) {
  const facts: [string, React.ReactNode][] = [
    ['Status', statusLabel(anime.status)],
    ['Studio', anime.studio ?? '-'],
    ['Released', anime.startDate ? new Date(anime.startDate).getFullYear() : '-'],
    ['Season', seasonLabel(anime.season, anime.seasonYear)],
    ['Type', formatLabel(anime.format)],
    ['Episodes', anime.episodesTotal ? `${episodeCount} / ${anime.episodesTotal}` : episodeCount || '?'],
    ['Duration', anime.duration ? `${anime.duration} min. per ep.` : '-'],
    ['Score', anime.score ? `${(anime.score / 10).toFixed(1)} / 10` : '-'],
    ['Source', anime.source ? anime.source.replaceAll('_', ' ').toLowerCase() : '-'],
    ['Aired', `${formatDate(anime.startDate)}${anime.endDate ? ` to ${formatDate(anime.endDate)}` : ''}`],
    ['Updated on', formatDate(anime.updatedAt)],
  ]
  return (
    <div className="mb-2.5 grid grid-cols-1 text-[13.5px] sm:grid-cols-2">
      {facts.map(([k, v]) => (
        <span key={k} className="mb-[7px] pr-[7px]">
          <b className="font-semibold text-heading">{k}:</b> <span className={k === 'Source' ? 'capitalize' : ''}>{v}</span>
        </span>
      ))}
    </div>
  )
}

export function GenreTags({ anime }: { anime: AnimeDetail }) {
  return (
    <div className="mb-2 flex flex-wrap">
      {anime.genres.map((g) => (
        <Link
          key={g.slug}
          to={`/genres/${g.slug}`}
          className="mb-[5px] mr-[5px] rounded-[3px] border border-nav px-2 py-1 text-[13px] hover:border-accent hover:bg-accent hover:text-white"
        >
          {g.name}
        </Link>
      ))}
    </div>
  )
}

export function AltTitles({ anime }: { anime: AnimeDetail }) {
  const alts = [anime.titleEnglish, ...anime.synonyms, anime.titleNative].filter(
    (t, i, arr): t is string => !!t && t !== anime.title && arr.indexOf(t) === i,
  )
  if (alts.length === 0) return null
  return <div className="mb-2.5 text-[13.5px] leading-[1.6] text-muted">{alts.join(', ')}</div>
}
