import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Episode } from '../api/types'
import { formatDate, watchPath } from '../lib/format'

/** Table-like list "Ep | Title | Release Date" (reference: ".eplister"). */
export function EpisodeList({ slug, title, episodes }: { slug: string; title: string; episodes: Episode[] }) {
  const [filter, setFilter] = useState('')
  const shown = useMemo(
    () => (filter ? episodes.filter((e) => String(e.number).includes(filter.trim())) : episodes),
    [episodes, filter],
  )

  return (
    <div className="m-[15px]">
      {episodes.length > 12 && (
        <input
          type="search"
          inputMode="numeric"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cari nomor episode..."
          aria-label="Cari nomor episode"
          className="mb-2 h-8 w-full rounded-[3px] border border-input-border bg-input px-3 text-[13px] text-heading outline-none focus:border-accent sm:w-60"
        />
      )}
      <div className="flex bg-nav px-[15px] py-2 text-[13px] font-semibold text-white">
        <div className="w-[60px] sm:w-[103px]">Ep</div>
        <div className="flex-1 px-[15px]">Title</div>
        <div className="hidden w-[154px] sm:block">Release Date</div>
      </div>
      <ul className="scrollbar-thin max-h-[420px] overflow-y-auto">
        {shown.map((e) => (
          <li key={e.id} className="border-b border-line bg-item last:border-0">
            <Link to={watchPath(slug, e.number)} className="flex items-center px-[15px] py-[10px] text-heading hover:bg-accent hover:text-white">
              <div className="w-[60px] text-[14px] font-medium sm:w-[103px]">{e.number}</div>
              <div className="min-w-0 flex-1 px-[15px] text-[14px]">
                <div className="truncate">
                  {title} Episode {e.number}
                </div>
                {e.title && <div className="truncate text-[12px] opacity-70">{e.title}</div>}
                <div className="text-[12px] opacity-70 sm:hidden">{formatDate(e.airedAt)}</div>
              </div>
              <div className="hidden w-[154px] text-[14px] sm:block">{formatDate(e.airedAt)}</div>
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="bg-item px-4 py-6 text-center text-muted">Belum ada episode streaming yang tersedia.</li>}
      </ul>
    </div>
  )
}
