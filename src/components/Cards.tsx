import { Link } from 'react-router-dom'
import { PlayCircle } from 'lucide-react'
import type { AnimeCard, EpisodeCard } from '../api/types'
import { formatLabel, seriesPath, statusLabel, thumb, watchPath } from '../lib/format'
import { Poster } from './Poster'

/** Responsive grid matching the reference: 5 columns beside the sidebar on desktop. */
export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 p-2.5 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 desk:grid-cols-4 wide:grid-cols-5 lg:gap-x-3.5">
      {children}
    </div>
  )
}

function TypeBadge({ format }: { format: string | null }) {
  return (
    <span className="absolute right-1.5 top-1.5 z-10 rounded-[3px] bg-accent px-[5px] py-[2px] text-[11px] font-medium leading-none text-white">
      {formatLabel(format) === 'TV' ? 'Anime' : formatLabel(format)}
    </span>
  )
}

function CardShell({
  to,
  title,
  cover,
  color,
  format,
  bottomLeft,
  bottomRight,
  eager,
}: {
  to: string
  title: string
  cover: string
  color?: string | null
  format: string | null
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  eager?: boolean
}) {
  return (
    <article>
      <Link to={to} title={title} className="group block">
        <div className="relative aspect-[225/317] overflow-hidden">
          <Poster src={cover} alt={title} color={color} eager={eager} className="h-full w-full" />
          <TypeBadge format={format} />
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <PlayCircle className="h-11 w-11 text-white" strokeWidth={1.4} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-1.5 pb-1.5 pt-6">
            <span className="pl-1 text-[11.5px] font-medium text-white">{bottomLeft}</span>
            {bottomRight}
          </div>
        </div>
        <div className="line-clamp-2 mt-2 text-center text-[13px] font-medium leading-[19.5px] text-heading group-hover:text-accent">
          {title}
        </div>
      </Link>
    </article>
  )
}

const SubBadge = () => (
  <span className="rounded-[3px] bg-sub px-[5px] py-[2px] text-[11px] font-medium leading-none text-[#111]">Sub</span>
)

export function EpisodeCardItem({ item, eager }: { item: EpisodeCard; eager?: boolean }) {
  return (
    <CardShell
      to={watchPath(item.animeSlug, item.number)}
      title={item.animeTitle}
      cover={thumb(item.coverImage)}
      format={item.format}
      bottomLeft={`Ep ${item.number}`}
      bottomRight={<SubBadge />}
      eager={eager}
    />
  )
}

export function AnimeCardItem({ item, eager }: { item: AnimeCard; eager?: boolean }) {
  return (
    <CardShell
      to={seriesPath(item.slug)}
      title={item.title}
      cover={thumb(item.coverImage)}
      color={item.coverColor}
      format={item.format}
      bottomLeft={statusLabel(item.status)}
      bottomRight={<SubBadge />}
      eager={eager}
    />
  )
}

export function CardSkeletons({ count = 10 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="skeleton aspect-[225/317]" />
          <div className="skeleton mx-auto mt-2 h-3.5 w-4/5 rounded" />
        </div>
      ))}
    </>
  )
}
