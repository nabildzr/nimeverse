import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import { Box } from '../components/Box'
import { AnimeCardItem, CardGrid, CardSkeletons, EpisodeCardItem } from '../components/Cards'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, Pagination } from '../components/States'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  const page = Math.max(1, Number(useParams().page ?? 1) || 1)
  useTitle(page > 1 ? `Latest Release - Page ${page}` : '')

  const home = useQuery({ queryKey: ['home'], queryFn: ({ signal }) => api.home(signal), staleTime: 60_000 })
  const paged = useQuery({
    queryKey: ['latest', page],
    queryFn: ({ signal }) => api.latest(page, signal),
    enabled: page > 1,
    staleTime: 60_000,
  })

  const latest = page > 1 ? paged.data : home.data?.latest
  const loading = page > 1 ? paged.isLoading : home.isLoading
  const error = page > 1 ? paged.error : home.error

  return (
    <TwoColumn sidebar={<Sidebar popular={home.data?.popular} />}>
      {error ? (
        <ErrorView error={error} retry={() => (page > 1 ? paged.refetch() : home.refetch())} />
      ) : (
        <>
          <Box title="Latest Release" viewAll="/page/2">
            {!loading && latest?.items.length === 0 ? (
              <Empty>Belum ada episode. Worker sedang mengambil data dari AniList, muat ulang beberapa saat lagi.</Empty>
            ) : (
              <CardGrid>
                {loading ? (
                  <CardSkeletons count={15} />
                ) : (
                  latest?.items.map((e, i) => <EpisodeCardItem key={`${e.animeSlug}-${e.number}`} item={e} eager={i < 5} />)
                )}
              </CardGrid>
            )}
            {latest && (
              <Pagination page={page} totalPages={latest.totalPages} href={(p) => (p === 1 ? '/' : `/page/${p}`)} />
            )}
          </Box>

          {page === 1 && (home.data?.recommended.length ?? 0) > 0 && (
            <Box title="Recommendation" viewAll="/anime?order=score">
              <CardGrid>
                {home.data!.recommended.map((a) => (
                  <AnimeCardItem key={a.id} item={a} />
                ))}
              </CardGrid>
            </Box>
          )}
        </>
      )}
    </TwoColumn>
  )
}
