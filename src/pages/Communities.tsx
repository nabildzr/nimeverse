import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MessagesSquare } from 'lucide-react'
import { accountApi } from '../api/client'
import { Box } from '../components/Box'
import { ErrorView, PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

export default function Communities() {
  useTitle('Komunitas')
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['posts', 'boards'], queryFn: ({ signal }) => accountApi.communities(signal), staleTime: 60_000 })

  if (isLoading) return <PageLoader />
  if (error || !data) return <ErrorView error={error} retry={refetch} />

  return (
    <div className="mx-auto max-w-[760px]">
      <Box title="Komunitas AniVerse" as="h1">
        <p className="px-[15px] pt-[15px] text-[13.5px] leading-[1.7]">
          Tempat ngobrol sesama penonton: diskusi episode, rekomendasi, dan apa saja soal anime. Spoiler wajib diberi tanda.
        </p>
        <ul className="grid gap-2.5 p-[15px] sm:grid-cols-2">
          {data.items.map((c) => (
            <li key={c.slug}>
              <Link to={`/komunitas/${c.slug}`} className="flex h-full gap-3 rounded-[4px] bg-item p-3.5 hover:bg-item-active">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent/20 text-accent">
                  <MessagesSquare className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-heading">{c.name}</span>
                  <span className="block text-[12.5px] text-muted">{c.description}</span>
                  <span className="mt-1 block text-[11.5px] text-muted">{c.postCount.toLocaleString('id-ID')} postingan</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}
