import { Link, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Coins } from 'lucide-react'
import { accountApi, ApiError } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { PageLoader } from '../components/States'
import { useToasts } from '../components/Toasts'
import { useTitle } from '../lib/useTitle'

export default function Quests() {
  useTitle('Misi harian')
  const { user, loading, announce } = useAuth()
  const client = useQueryClient()
  const toasts = useToasts()
  const { data, isLoading } = useQuery({ queryKey: ['quests'], queryFn: () => accountApi.quests(), enabled: !!user, staleTime: 15_000, refetchOnWindowFocus: true })

  const claim = useMutation({
    mutationFn: (code: string) => accountApi.claimQuest(code),
    onSuccess: (r) => {
      announce(r.outcome)
      void client.invalidateQueries({ queryKey: ['quests'] })
    },
    onError: (e) => toasts.push({ tone: 'xp', title: 'Tidak bisa diklaim', text: e instanceof ApiError ? e.message : 'Coba lagi.' }),
  })

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/misi" replace />

  const done = data?.items.filter((q) => q.claimed).length ?? 0
  const reset = data ? new Date(data.resetsAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <div className="mx-auto max-w-[720px]">
      <Box title="Misi harian" as="h1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-[18px] pt-3 text-[13px]">
          <span className="flex items-center gap-1.5 font-semibold text-heading">
            <Coins className="h-4 w-4 text-sub" aria-hidden="true" /> {user.coins.toLocaleString('id-ID')} koin
          </span>
          {data && (
            <span className="text-muted">
              {done}/{data.items.length} diklaim · reset {reset}
            </span>
          )}
          <Link to="/gacha" className="ml-auto text-accent hover:underline">
            Tukar di Gacha
          </Link>
        </div>
        {isLoading || !data ? (
          <PageLoader />
        ) : (
          <ul className="flex flex-col gap-2.5 p-[15px]">
            {data.items.map((q) => {
              const pct = Math.round((q.progress / q.goal) * 100)
              return (
                <li key={q.code} className={`flex items-center gap-3 rounded-[4px] bg-item p-3 ${q.claimed ? 'opacity-60' : ''}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[14px] font-semibold text-heading">
                      {q.name}
                      <span className="flex items-center gap-1 rounded-[3px] bg-sub/15 px-1.5 text-[11.5px] font-medium text-sub">
                        <Coins className="h-3 w-3" aria-hidden="true" /> {q.reward}
                      </span>
                    </div>
                    <div className="text-[12.5px] text-muted">{q.description}</div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-control" role="progressbar" aria-label={`Progres ${q.name}`} aria-valuemin={0} aria-valuemax={q.goal} aria-valuenow={q.progress}>
                        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11.5px] text-muted">
                        {q.progress}/{q.goal}
                      </span>
                    </div>
                  </div>
                  {q.claimed ? (
                    <span className="flex items-center gap-1 text-[12.5px] text-[#2ecc71]">
                      <Check className="h-4 w-4" aria-hidden="true" /> Diklaim
                    </span>
                  ) : (
                    <button
                      disabled={!q.claimable || claim.isPending}
                      onClick={() => claim.mutate(q.code)}
                      className="h-9 rounded-[3px] bg-accent px-4 text-[13px] font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:bg-control disabled:text-muted"
                    >
                      Klaim
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Box>
    </div>
  )
}
