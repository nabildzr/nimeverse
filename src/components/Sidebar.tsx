import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { api } from '../api/client'
import type { AnimeCard } from '../api/types'
import { FORMAT_OPTIONS, ORDER_OPTIONS, STATUS_OPTIONS, seriesPath, thumb, toListQuery } from '../lib/format'
import { Box } from './Box'

const selectCls =
  'h-[26px] w-full cursor-pointer appearance-none rounded-[2px] border border-control bg-control px-1.5 text-center text-[12px] text-text outline-none focus:border-accent'

/** Genre / status / type / order filter box (reference: ".quickfilter"). */
export function QuickFilter() {
  const navigate = useNavigate()
  const { data } = useQuery({ queryKey: ['genres'], queryFn: ({ signal }) => api.genres(signal), staleTime: 600_000 })
  const [f, setF] = useState({ genre: '', status: '', type: '', order: '' })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  return (
    <form
      className="box p-[9px]"
      onSubmit={(e) => {
        e.preventDefault()
        navigate(`/anime${toListQuery(f)}`)
      }}
    >
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-3 p-[5px]">
        <select aria-label="Genre" className={selectCls} value={f.genre} onChange={set('genre')}>
          <option value="">Genre All</option>
          {data?.items.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select aria-label="Status" className={selectCls} value={f.status} onChange={set('status')}>
          <option value="">Status All</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select aria-label="Type" className={selectCls} value={f.type} onChange={set('type')}>
          <option value="">Type All</option>
          {FORMAT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select aria-label="Order" className={selectCls} value={f.order} onChange={set('order')}>
          {ORDER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value ? o.label : 'Order by Default'}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mx-[5px] mt-1.5 flex h-[26px] w-[calc(100%-10px)] items-center justify-center gap-1 rounded-[2px] bg-control text-[12px] font-medium text-heading hover:bg-accent hover:text-white"
      >
        <Search className="h-3 w-3" strokeWidth={3} /> Search
      </button>
    </form>
  )
}

/** Series list with small poster, title and genres (reference: ".serieslist"). */
export function SeriesList({ items }: { items: AnimeCard[] }) {
  return (
    <ul>
      {items.map((a) => (
        <li key={a.id} className="flex gap-3 border-b border-line px-[15px] py-3 last:border-0">
          <Link to={seriesPath(a.slug)} className="flex-none">
            <img src={thumb(a.coverImage)} alt={a.title} loading="lazy" className="h-[63px] w-[45px] object-cover" />
          </Link>
          <div className="min-w-0">
            <h4 className="m-0 text-[14px] font-semibold leading-[1.4] text-heading">
              <Link to={seriesPath(a.slug)} className="line-clamp-2 hover:text-accent">
                {a.title}
              </Link>
            </h4>
            <div className="mt-1 text-[12.5px] leading-[1.6]">
              <b className="font-normal text-muted">Genres</b>:{' '}
              {a.genres.map((g, i) => (
                <span key={g.slug}>
                  <Link to={`/genres/${g.slug}`} className="text-heading hover:text-accent">
                    {g.name}
                  </Link>
                  {i < a.genres.length - 1 && ', '}
                </span>
              ))}
            </div>
            {a.studio && <div className="mt-1 text-[12.5px] text-muted">{a.studio}</div>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Sidebar({ popular }: { popular?: AnimeCard[] }) {
  const { data } = useQuery({
    queryKey: ['home'],
    queryFn: ({ signal }) => api.home(signal),
    enabled: !popular,
    staleTime: 60_000,
  })
  const items = popular ?? data?.popular ?? []
  return (
    <aside className="w-full desk:w-[290px] desk:flex-none desk:pl-[15px]">
      <QuickFilter />
      {items.length > 0 && (
        <Box title="Ongoing Populer" as="h3">
          <SeriesList items={items} />
        </Box>
      )}
    </aside>
  )
}
