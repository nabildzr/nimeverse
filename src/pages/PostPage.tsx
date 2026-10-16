import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EyeOff, Lock, Trash2, Unlock } from 'lucide-react'
import { accountApi, liveUrl } from '../api/client'
import type { LiveEvent, Post } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Avatar, AuthorName, authorFace } from '../components/Avatar'
import { Comments, ReportButton, VoteButtons } from '../components/Comments'
import { MediaImage } from '../components/MediaImage'
import { AuthorPopover } from '../components/ProfileCard'
import { ErrorView, PageLoader } from '../components/States'
import { timeAgo } from '../lib/format'
import { useLive } from '../lib/useLive'
import { useTitle } from '../lib/useTitle'

export default function PostPage() {
  const id = Number(useParams().id)
  const { user } = useAuth()
  const client = useQueryClient()
  const navigate = useNavigate()
  const [revealed, setRevealed] = useState(false)
  const key = ['post', id]
  const { data: post, isLoading, error, refetch } = useQuery({
    queryKey: key,
    queryFn: ({ signal }) => accountApi.post(id, signal),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 30_000,
  })
  useTitle(post && !post.deleted ? post.title : '')

  // Live: score, edits, lock and removal of the post itself (comments are handled by the comment list).
  useLive(
    Number.isInteger(id) && id > 0 ? liveUrl({ post: id }) : null,
    (ev: LiveEvent) => {
      if (ev.type === 'score' && ev.kind === 'post' && ev.score !== undefined) {
        const score = ev.score
        client.setQueryData<Post>(key, (old) => (old ? { ...old, score } : old))
      } else if (ev.type === 'post-update' && ev.post) {
        const incoming = ev.post
        client.setQueryData<Post>(key, (old) => (old ? { ...incoming, mine: old.mine, myVote: old.myVote } : old))
      } else if (ev.type === 'post-delete') {
        void client.invalidateQueries({ queryKey: key })
      }
    },
    () => void client.invalidateQueries({ queryKey: key }),
  )

  const remove = useMutation({
    mutationFn: () => accountApi.deletePost(id),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['posts'] })
      navigate(post ? `/komunitas/${post.community}` : '/komunitas')
    },
  })
  const lock = useMutation({
    mutationFn: (locked: boolean) => accountApi.lockPost(id, locked),
    onSuccess: () => client.invalidateQueries({ queryKey: key }),
  })

  if (isLoading) return <PageLoader />
  if (error || !post) return <ErrorView error={error} retry={refetch} />

  const isStaff = user?.role === 'mod' || user?.role === 'admin'
  const hidden = post.spoiler && !revealed && !post.mine
  return (
    <div className="mx-auto max-w-[820px]">
      <article className="box">
        <div className="flex gap-3 p-[18px]">
          <div className="flex-none">
            <VoteButtons kind="post" id={post.id} score={post.score} myVote={post.myVote} onChange={(score, myVote) => client.setQueryData<Post>(key, { ...post, score, myVote })} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 text-[12.5px] text-muted">
              <Link to={`/komunitas/${post.community}`} className="font-semibold text-heading hover:text-accent">
                {post.communityName}
              </Link>
              {post.author && (
                <AuthorPopover author={post.author}>
                  <Avatar face={authorFace(post.author)} size={20} />
                </AuthorPopover>
              )}
              <AuthorName author={post.author} />
              <span>{timeAgo(post.createdAt)}</span>
              {post.editedAt && <span>(diedit)</span>}
            </div>
            <h1 className="mt-1 text-[20px] font-bold leading-[1.4] text-heading">
              {post.spoiler && <span className="mr-2 rounded-[3px] bg-[#e5484d]/20 px-1.5 align-middle text-[11px] font-medium uppercase text-[#e5484d]">Spoiler</span>}
              {post.deleted ? <span className="italic text-muted">[dihapus]</span> : post.title}
            </h1>
            {post.animeSlug && (
              <Link to={`/series/${post.animeSlug}`} className="mt-1 inline-block text-[12.5px] text-accent hover:underline">
                {post.animeTitle ?? post.animeSlug}
              </Link>
            )}
            {!post.deleted &&
              (hidden ? (
                <button onClick={() => setRevealed(true)} className="mt-3 flex items-center gap-1.5 rounded-[3px] bg-item px-3 py-2 text-[13px] text-muted hover:text-heading">
                  <EyeOff className="h-4 w-4" aria-hidden="true" /> Berisi spoiler. Klik untuk menampilkan.
                </button>
              ) : (
                <>
                  {post.body && <p className="mt-3 whitespace-pre-wrap break-words text-[14.5px] leading-[1.7]">{post.body}</p>}
                  {post.image && <MediaImage image={post.image} />}
                </>
              ))}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {(post.mine || isStaff) && !post.deleted && (
                <button
                  onClick={() => window.confirm('Hapus postingan ini?') && remove.mutate()}
                  className="flex items-center gap-1 text-[12.5px] text-muted hover:text-[#e5484d]"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Hapus
                </button>
              )}
              {isStaff && (
                <button onClick={() => lock.mutate(!post.locked)} className="flex items-center gap-1 text-[12.5px] text-muted hover:text-heading">
                  {post.locked ? <Unlock className="h-3.5 w-3.5" aria-hidden="true" /> : <Lock className="h-3.5 w-3.5" aria-hidden="true" />}
                  {post.locked ? 'Buka kunci' : 'Kunci'}
                </button>
              )}
              {!post.mine && !post.deleted && <ReportButton kind="post" id={post.id} />}
            </div>
          </div>
        </div>
      </article>
      {!post.deleted && <Comments target={{ post: post.id }} title="Komentar" locked={post.locked} />}
    </div>
  )
}
