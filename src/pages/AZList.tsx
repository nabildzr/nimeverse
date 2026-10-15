import { Link, useSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import { Box } from '../components/Box'
import { AnimeCardItem, CardGrid, CardSkeletons } from '../components/Cards'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, Pagination } from '../components/States'
import { LETTERS, toListQuery } from '../lib/format'
import { useTitle } from '../lib/useTitle'

export default function AZList() {
  const [sp] = useSearchParams()
  const letter = sp.get('show') ?? ''
  const page = Math.max(1, Number(sp.get('page')) || 1)
  useTitle(letter ? `AZ List - ${letter}` : 'AZ List')

  const params = { letter, order: 'title', page, perPage: 30 }
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['list', params],
    queryFn: ({ signal }) => api.list(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  })

  return (
    <TwoColumn sidebar={<Sidebar />}>
      <Box title="AZ List" as="h1">
        <ul className="flex flex-wrap justify-center gap-[7px] px-[15px] pt-[15px]">
          {[{ v: '', l: 'All' }, ...LETTERS.map((l) => ({ v: l, l }))].map(({ v, l }) => (
            <li key={l}>
              <Link
                to={`/az-list${toListQuery({ show: v })}`}
                aria-current={letter === v ? 'page' : undefined}
                className={`block min-w-[32px] rounded-[3px] px-2 py-1.5 text-center text-[12.5px] font-medium text-white ${letter === v ? 'bg-accent' : 'bg-nav hover:bg-accent'}`}
              >
                {l}
              </Link>
            </li>
          ))}
        </ul>
        {error ? (
          <ErrorView error={error} retry={refetch} />
        ) : !isLoading && data?.items.length === 0 ? (
          <Empty>Tidak ada anime dengan awalan "{letter}".</Empty>
        ) : (
          <CardGrid>{isLoading ? <CardSkeletons count={15} /> : data?.items.map((a) => <AnimeCardItem key={a.id} item={a} />)}</CardGrid>
        )}
        {data && (
          <Pagination page={page} totalPages={data.totalPages} href={(p) => `/az-list${toListQuery({ show: letter, page: p })}`} />
        )}
      </Box>
    </TwoColumn>
  )
}
