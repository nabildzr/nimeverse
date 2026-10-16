import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import { accountApi } from '../api/client'
import type { LeaderRow } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Avatar, authorFace, RoleMark } from '../components/Avatar'
import { Box } from '../components/Box'
import { Empty, ErrorView, PageLoader } from '../components/States'
import { useTitle } from '../lib/useTitle'

const MEDAL = ['#ffc107', '#b0bec5', '#cd7f32']

function Row({ row }: { row: LeaderRow }) {
  return (
    <li className={`flex items-center gap-3 px-[15px] py-2 ${row.me ? 'bg-accent/10' : ''}`}>
      <span className="w-7 text-center text-[14px] font-bold" style={{ color: MEDAL[row.rank - 1] ?? 'var(--muted)' }}>
        {row.rank}
      </span>
      <Avatar face={authorFace(row.user)} size={34} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Link to={`/profil/${encodeURIComponent(row.user.name)}`} className="truncate text-[14px] font-semibold text-heading hover:text-accent" style={row.user.accentColor ? { color: row.user.accentColor } : undefined}>
            {row.user.name}
          </Link>
          <RoleMark role={row.user.role} premium={row.user.premium} />
        </div>
        <div className="text-[11.5px] text-muted">Level {row.user.level}</div>
      </div>
      {row.streak > 0 && (
        <span className="hidden items-center gap-1 text-[12.5px] text-muted sm:flex">
          <Flame className="h-3.5 w-3.5 text-[#ff6b3d]" aria-hidden="true" /> {row.streak}
        </span>
      )}
      <span className="w-[84px] text-right text-[14px] font-semibold text-heading">{row.xp.toLocaleString('id-ID')} XP</span>
    </li>
  )
}

export default function Leaderboard() {
  useTitle('Papan peringkat')
  const { user } = useAuth()
  const [period, setPeriod] = useState<'week' | 'all'>('week')
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['leaderboard', period, user?.displayName ?? ''],
    queryFn: ({ signal }) => accountApi.leaderboard(period, signal),
    staleTime: 30_000,
  })

  return (
    <div className="mx-auto max-w-[720px]">
      <Box
        title="Papan peringkat"
        as="h1"
        action={
          <div className="flex gap-1 text-[12px]" role="tablist">
            {(['week', 'all'] as const).map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={period === p}
                onClick={() => setPeriod(p)}
                className={`rounded-[3px] px-2.5 py-0.5 font-medium text-white ${period === p ? 'bg-accent' : 'bg-[#222] hover:bg-accent/70'}`}
              >
                {p === 'week' ? 'Minggu ini' : 'Sepanjang masa'}
              </button>
            ))}
          </div>
        }
      >
        {isLoading ? (
          <PageLoader />
        ) : error || !data ? (
          <ErrorView error={error} retry={refetch} />
        ) : data.items.length === 0 ? (
          <Empty>Belum ada yang masuk peringkat periode ini. Tonton episode atau ikut diskusi untuk mengumpulkan XP.</Empty>
        ) : (
          <>
            <ol className="divide-y divide-line">
              {data.items.map((r) => (
                <Row key={r.rank} row={r} />
              ))}
            </ol>
            {data.me && !data.items.some((r) => r.me) && (
              <ol className="border-t-2 border-line">
                <Row row={data.me} />
              </ol>
            )}
          </>
        )}
        <p className="px-[15px] py-3 text-[12px] text-muted">
          Hanya akun dengan profil publik yang ditampilkan.{' '}
          {user ? (
            <Link to="/pengaturan" className="text-accent hover:underline">
              Atur privasi
            </Link>
          ) : (
            <Link to="/masuk?daftar=1" className="text-accent hover:underline">
              Daftar untuk ikut
            </Link>
          )}
        </p>
      </Box>
    </div>
  )
}
