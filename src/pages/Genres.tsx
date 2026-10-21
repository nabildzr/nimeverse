import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { api } from '../api/client'
import type { Genre } from '../api/types'
import { Box } from '../components/Box'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

function GenreGrid({ items }: { items: Genre[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 p-[15px] sm:grid-cols-3 md:grid-cols-4">
      {items.map((g) => (
        <li key={g.slug}>
          <Link
            to={`/genres/${g.slug}`}
            className="flex items-center justify-between gap-2 rounded-[3px] border border-nav px-3 py-2 text-[13px] hover:border-accent hover:bg-accent hover:text-white"
          >
            <span className="min-w-0 truncate">{g.name}</span>
            <span className="flex-none text-[11.5px] opacity-70">{g.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Genres() {
  useTitle('Genres')
  const [q, setQ] = useState('')
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['genres'],
    queryFn: ({ signal }) => api.genres(signal),
    staleTime: 600_000,
  })

  const { genres, tags } = useMemo(() => {
    const term = q.trim().toLowerCase()
    const match = (g: Genre) => !term || g.name.toLowerCase().includes(term)
    const items = (data?.items ?? []).filter(match)
    return {
      genres: items.filter((g) => g.kind !== 'tag'),
      // Tags are many, so the most used come first.
      tags: items.filter((g) => g.kind === 'tag' && (g.count ?? 0) > 0).sort((a, b) => (b.count ?? 0) - (a.count ?? 0) || a.name.localeCompare(b.name)),
    }
  }, [data, q])

  return (
    <TwoColumn sidebar={<Sidebar />}>
      <Box title="Genres" as="h1">
        {isLoading ? (
          <PageLoader />
        ) : error ? (
          <ErrorView error={error} retry={refetch} />
        ) : data?.items.length === 0 ? (
          <Empty>Belum ada genre.</Empty>
        ) : (
          <>
            <div className="relative px-[15px] pt-[15px]">
              <Search className="pointer-events-none absolute left-[27px] top-1/2 mt-[7px] h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari genre atau tema (mis. isekai, school, harem)"
                aria-label="Cari genre atau tema"
                className="h-10 w-full rounded-[3px] border border-input-border bg-input pl-9 pr-3 text-[14px] text-heading outline-none focus:border-accent"
              />
            </div>
            {genres.length > 0 && (
              <>
                <h2 className="px-[15px] pt-4 text-[14px] font-semibold text-heading">Genre ({genres.length})</h2>
                <GenreGrid items={genres} />
              </>
            )}
            {tags.length > 0 && (
              <>
                <h2 className="px-[15px] pt-2 text-[14px] font-semibold text-heading">Tema dan tag ({tags.length})</h2>
                <GenreGrid items={tags} />
              </>
            )}
            {genres.length === 0 && tags.length === 0 && <Empty>Tidak ada yang cocok dengan "{q}".</Empty>}
          </>
        )}
      </Box>
    </TwoColumn>
  )
}
