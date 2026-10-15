import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import type { ScheduleRow } from '../api/types'
import { Box } from '../components/Box'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, PageLoader } from '../components/States'
import { countdown, formatDay, formatLabel, formatTime, seriesPath, thumb, watchPath } from '../lib/format'
import { useTitle } from '../lib/useTitle'

const DAYS = 7

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Groups rows by the viewer's local calendar day. */
export function groupByDay(rows: ScheduleRow[], from: Date, days: number): { date: Date; rows: ScheduleRow[] }[] {
  const groups = Array.from({ length: days }, (_, i) => {
    const date = new Date(from)
    date.setDate(from.getDate() + i)
    return { date, rows: [] as ScheduleRow[] }
  })
  for (const r of rows) {
    const t = new Date(r.airingAt)
    const idx = groups.findIndex((g) => {
      const end = new Date(g.date)
      end.setDate(end.getDate() + 1)
      return t >= g.date && t < end
    })
    if (idx >= 0) groups[idx].rows.push(r)
  }
  return groups
}

function useNow(intervalMs: number) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}

export default function Schedule() {
  useTitle('Jadwal Rilis Anime')
  const from = useMemo(startOfToday, [])
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['schedule', from.toISOString()],
    queryFn: ({ signal }) => api.schedule(from.toISOString(), DAYS, signal),
    staleTime: 120_000,
  })
  const groups = useMemo(() => (data ? groupByDay(data.items, from, DAYS) : []), [data, from])
  const [active, setActive] = useState(0)
  const now = useNow(30_000)

  return (
    <TwoColumn sidebar={<Sidebar />}>
      <Box title="Jadwal Rilis" as="h1">
        {isLoading ? (
          <PageLoader />
        ) : error ? (
          <ErrorView error={error} retry={refetch} />
        ) : (
          <>
            <div className="scrollbar-thin flex gap-1.5 overflow-x-auto px-[15px] pt-[15px]" role="tablist">
              {groups.map((g, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`flex-none rounded-[3px] px-3 py-1.5 text-[12.5px] font-medium text-white ${active === i ? 'bg-accent' : 'bg-nav hover:bg-accent'}`}
                >
                  {i === 0 ? 'Hari ini' : formatDay(g.date).split(',')[0]}
                  <span className="ml-1 opacity-70">({g.rows.length})</span>
                </button>
              ))}
            </div>
            {groups[active] && (
              <div className="p-[15px]">
                <h2 className="mb-3 text-[14px] font-semibold text-heading">{formatDay(groups[active].date)}</h2>
                {groups[active].rows.length === 0 ? (
                  <Empty>Tidak ada jadwal tayang.</Empty>
                ) : (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {groups[active].rows.map((r) => {
                      const aired = new Date(r.airingAt).getTime() <= now
                      return (
                        <li key={`${r.anime.id}-${r.episode}`} className="flex gap-3 rounded-[3px] bg-item p-2.5">
                          <Link to={seriesPath(r.anime.slug)} className="flex-none">
                            <img src={thumb(r.anime.coverImage)} alt={r.anime.title} loading="lazy" className="h-[84px] w-[60px] object-cover" />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link to={seriesPath(r.anime.slug)} className="line-clamp-2 text-[13.5px] font-semibold leading-[1.4] text-heading hover:text-accent">
                              {r.anime.title}
                            </Link>
                            <div className="mt-1 text-[12px] text-muted">
                              {formatLabel(r.anime.format)} · Episode {r.episode}
                            </div>
                            <div className="mt-1.5 flex items-center gap-2 text-[12px]">
                              <span className="rounded-[3px] bg-nav px-1.5 py-0.5 font-medium text-white">{formatTime(r.airingAt)}</span>
                              {aired ? (
                                <Link to={watchPath(r.anime.slug, r.episode)} className="font-medium text-sub hover:underline">
                                  Sudah tayang
                                </Link>
                              ) : (
                                <span className="text-muted">dalam {countdown(r.airingAt, now)}</span>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
            <p className="px-[15px] pb-[15px] text-[12px] text-muted">
              Waktu ditampilkan dalam zona waktu perangkat Anda ({Intl.DateTimeFormat().resolvedOptions().timeZone}). Jadwal
              mengikuti penayangan di Jepang; rilis subtitle bisa lebih lambat.
            </p>
          </>
        )}
      </Box>
    </TwoColumn>
  )
}
