import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bookmark, BookmarkCheck, Heart } from 'lucide-react'
import { accountApi } from '../api/client'
import type { AnimeState, ListStatus } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { getBookmarks, toggleBookmark } from '../lib/history'

const STATUSES: { value: ListStatus; label: string }[] = [
  { value: 'plan', label: 'Rencana' },
  { value: 'watching', label: 'Sedang ditonton' },
  { value: 'completed', label: 'Selesai' },
  { value: 'on_hold', label: 'Ditunda' },
  { value: 'dropped', label: 'Ditinggalkan' },
]
const REMOVE = '__remove'

/** Visitors keep a simple bookmark in the browser. Members get a status list and favorites on their account. */
export function ListButton({ slug }: { slug: string }) {
  const { user, announce } = useAuth()
  const client = useQueryClient()
  const [bookmarked, setBookmarked] = useState(() => getBookmarks().includes(slug))
  const key = ['anime-state', slug]
  const { data } = useQuery({ queryKey: key, queryFn: ({ signal }) => accountApi.animeState(slug, signal), enabled: !!user, staleTime: 30_000 })

  const save = useMutation({
    mutationFn: (patch: { status?: ListStatus; favorite?: boolean }) => accountApi.setListEntry(slug, patch),
    onSuccess: (r) => {
      client.setQueryData<AnimeState>(key, (old) => ({ ...(old ?? { progress: {} }), ...r.state }))
      void client.invalidateQueries({ queryKey: ['library'] })
      announce(r.outcome)
    },
  })
  const remove = useMutation({
    mutationFn: () => accountApi.removeListEntry(slug),
    onSuccess: () => {
      client.setQueryData<AnimeState>(key, (old) => ({ progress: old?.progress ?? {}, inList: false, favorite: false }))
      void client.invalidateQueries({ queryKey: ['library'] })
    },
  })

  const button = 'flex h-[35px] items-center justify-center gap-1.5 rounded-[5px] bg-nav text-[13px] text-white hover:bg-accent'

  if (!user) {
    return (
      <button onClick={() => setBookmarked(toggleBookmark(slug))} className={button}>
        {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {bookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>
    )
  }

  const busy = save.isPending || remove.isPending
  const status = data?.inList ? (data.listStatus ?? 'plan') : ''
  return (
    <div className="flex flex-col gap-1.5">
      <select
        aria-label="Status daftar tontonan"
        value={status}
        disabled={busy}
        onChange={(e) => {
          if (e.target.value === REMOVE) remove.mutate()
          else if (e.target.value) save.mutate({ status: e.target.value as ListStatus })
        }}
        className="h-[35px] rounded-[5px] border border-control bg-control px-2 text-[13px] text-heading"
      >
        {!status && <option value="">+ Tambah ke daftar</option>}
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
        {status && <option value={REMOVE}>Hapus dari daftar</option>}
      </select>
      <button onClick={() => save.mutate({ favorite: !data?.favorite })} disabled={busy} aria-pressed={!!data?.favorite} className={`${button} disabled:opacity-60`}>
        <Heart className={`h-4 w-4 ${data?.favorite ? 'text-[#e5484d]' : ''}`} fill={data?.favorite ? 'currentColor' : 'none'} />
        {data?.favorite ? 'Favorit' : 'Tambah favorit'}
      </button>
    </div>
  )
}
