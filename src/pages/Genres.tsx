import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import { Box } from '../components/Box'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

export default function Genres() {
  useTitle('Genres')
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['genres'],
    queryFn: ({ signal }) => api.genres(signal),
    staleTime: 600_000,
  })
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
          <ul className="grid grid-cols-2 gap-2 p-[15px] sm:grid-cols-3 md:grid-cols-4">
            {data?.items.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/genres/${g.slug}`}
                  className="flex items-center justify-between rounded-[3px] border border-nav px-3 py-2 text-[13px] hover:border-accent hover:bg-accent hover:text-white"
                >
                  {g.name}
                  <span className="text-[11.5px] opacity-70">{g.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </TwoColumn>
  )
}
