import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { accountApi } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { BadgeGrid } from '../components/BadgeGrid'
import { Box } from '../components/Box'
import { ErrorView, PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

const CATEGORY_ORDER = ['Menonton', 'Streak', 'Level', 'Komunitas', 'Koleksi']

export default function Badges() {
  useTitle('Lencana')
  const { user } = useAuth()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['badges', user?.displayName ?? ''],
    queryFn: ({ signal }) => accountApi.badges(signal),
    staleTime: 30_000,
  })

  if (isLoading) return <PageLoader />
  if (error || !data) return <ErrorView error={error} retry={refetch} />

  const categories = [...new Set([...CATEGORY_ORDER, ...data.items.map((b) => b.category)])].filter((c) => data.items.some((b) => b.category === c))
  const earned = data.items.filter((b) => b.earned).length

  return (
    <div className="mx-auto max-w-[860px]">
      <div className="box mb-[18px] px-[18px] py-3 text-[13.5px]">
        {user ? (
          <>
            Kamu sudah mendapat <b className="text-heading">{earned}</b> dari {data.items.length} lencana.
          </>
        ) : (
          <>
            <Link to="/masuk" className="font-semibold text-accent hover:underline">
              Masuk
            </Link>{' '}
            untuk mulai mengumpulkan {data.items.length} lencana.
          </>
        )}
      </div>
      {categories.map((c) => (
        <Box key={c} title={c} as="h2">
          <BadgeGrid badges={data.items.filter((b) => b.category === c)} showProgress={!!user} />
        </Box>
      ))}
    </div>
  )
}
