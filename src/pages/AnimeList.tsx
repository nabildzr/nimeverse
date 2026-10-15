import { useParams, useSearchParams } from 'react-router-dom'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import type { ListParams } from '../api/types'
import { Box } from '../components/Box'
import { AnimeCardItem, CardGrid, CardSkeletons } from '../components/Cards'
import { TwoColumn } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Empty, ErrorView, Pagination } from '../components/States'
import { FORMAT_OPTIONS, ORDER_OPTIONS, STATUS_OPTIONS, toListQuery } from '../lib/format'
import { useTitle } from '../lib/useTitle'

type Mode = 'list' | 'search' | 'genre'

/** Shared grid page for the filter list, search results and genre pages. */
export default function AnimeList({ mode }: { mode: Mode }) {
  const [sp] = useSearchParams()
  const { slug } = useParams()
  const page = Math.max(1, Number(sp.get('page')) || 1)

  const params: ListParams = {
    q: mode === 'search' ? (sp.get('s') ?? '') : undefined,
    genre: mode === 'genre' ? slug : (sp.get('genre') ?? undefined),
    status: sp.get('status') ?? undefined,
    type: sp.get('type') ?? undefined,
    order: sp.get('order') ?? (mode === 'search' ? '' : undefined),
    page,
    perPage: 30,
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['list', params],
    queryFn: ({ signal }) => api.list(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    enabled: mode !== 'search' || !!params.q,
  })
  const genres = useQuery({ queryKey: ['genres'], queryFn: ({ signal }) => api.genres(signal), staleTime: 600_000 })

  const genreName = genres.data?.items.find((g) => g.slug === params.genre)?.name ?? params.genre
  const label = (opts: { value: string; label: string }[], v?: string) => opts.find((o) => o.value === v)?.label
  const parts = [
    genreName,
    label(STATUS_OPTIONS, params.status),
    label(FORMAT_OPTIONS, params.type),
    params.order ? `Order: ${label(ORDER_OPTIONS, params.order)}` : '',
  ].filter(Boolean)

  const title =
    mode === 'search'
      ? `Search '${params.q ?? ''}'`
      : mode === 'genre'
        ? `Genre: ${genreName ?? ''}`
        : parts.length
          ? `Anime List - ${parts.join(' · ')}`
          : 'Anime List'
  useTitle(title)

  const href = (p: number) => {
    const base = mode === 'genre' ? `/genres/${slug}` : mode === 'search' ? '/search' : '/anime'
    return `${base}${toListQuery({ s: params.q, genre: mode === 'list' ? params.genre : undefined, status: params.status, type: params.type, order: params.order, page: p })}`
  }

  return (
    <TwoColumn sidebar={<Sidebar />}>
      {error ? (
        <ErrorView error={error} retry={refetch} />
      ) : (
        <Box title={title} as="h1">
          {data && (
            <div className="px-[15px] pt-2.5 text-[12.5px] text-muted">{data.total.toLocaleString('id-ID')} anime ditemukan</div>
          )}
          {mode === 'search' && !params.q ? (
            <Empty>Ketik judul anime pada kolom pencarian.</Empty>
          ) : !isLoading && data?.items.length === 0 ? (
            <Empty>Tidak ada anime yang cocok.</Empty>
          ) : (
            <CardGrid>
              {isLoading ? <CardSkeletons count={15} /> : data?.items.map((a, i) => <AnimeCardItem key={a.id} item={a} eager={i < 5} />)}
            </CardGrid>
          )}
          {data && <Pagination page={page} totalPages={data.totalPages} href={href} />}
        </Box>
      )}
    </TwoColumn>
  )
}
