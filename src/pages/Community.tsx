import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { MessageSquare, Plus } from 'lucide-react'
import { accountApi, ApiError, liveUrl } from '../api/client'
import type { LiveEvent, MediaRef, Post } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { AnimePicker, type PickedAnime } from '../components/AnimePicker'
import { Avatar, authorFace, AuthorName } from '../components/Avatar'
import { Box } from '../components/Box'
import { ImagePicker, MediaImage } from '../components/MediaImage'
import { AuthorPopover } from '../components/ProfileCard'
import { VoteButtons } from '../components/Comments'
import { Empty, ErrorView, PageLoader } from '../components/States'
import { timeAgo } from '../lib/format'
import { useLive } from '../lib/useLive'
import { useTitle } from '../lib/useTitle'

const SORTS = [
  { key: 'hot', label: 'Hangat' },
  { key: 'new', label: 'Terbaru' },
  { key: 'top', label: 'Teratas' },
]

export function PostRow({ post, onVote }: { post: Post; onVote?: (score: number, myVote: number) => void }) {
  const [score, setScore] = useState(post.score)
  const [myVote, setMyVote] = useState(post.myVote)
  // Scores can change under us (live updates, refetch), so follow the server's value.
  useEffect(() => setScore(post.score), [post.score])
  useEffect(() => setMyVote(post.myVote), [post.myVote])
  return (
    <li className="flex gap-3 px-[15px] py-3">
      <VoteButtonsColumn id={post.id} score={score} myVote={myVote} onChange={(s, v) => (setScore(s), setMyVote(v), onVote?.(s, v))} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
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
        </div>
        <Link to={`/komunitas/post/${post.id}`} className="mt-0.5 block text-[15.5px] font-semibold leading-[1.4] text-heading hover:text-accent">
          {post.spoiler && <span className="mr-1.5 rounded-[3px] bg-[#e5484d]/20 px-1.5 text-[11px] font-medium uppercase text-[#e5484d]">Spoiler</span>}
          {post.deleted ? <span className="italic text-muted">[dihapus]</span> : post.title}
        </Link>
        {post.image && !post.spoiler && !post.deleted && <MediaImage image={post.image} />}
        <div className="mt-1 flex flex-wrap items-center gap-x-4 text-[12px] text-muted">
          <Link to={`/komunitas/post/${post.id}`} className="flex items-center gap-1 hover:text-heading">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" /> {post.commentCount} komentar
          </Link>
          {post.animeSlug && (
            <Link to={`/series/${post.animeSlug}`} className="hover:text-heading">
              {post.animeTitle ?? post.animeSlug}
            </Link>
          )}
          {post.locked && <span>Dikunci</span>}
        </div>
      </div>
    </li>
  )
}

// A thin wrapper so the vote controls stack vertically beside a post.
function VoteButtonsColumn(props: { id: number; score: number; myVote: number; onChange: (s: number, v: number) => void }) {
  return (
    <div className="flex-none">
      <VoteButtons kind="post" {...props} />
    </div>
  )
}

function NewPost({ slug }: { slug: string }) {
  const { user, announce } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [spoiler, setSpoiler] = useState(false)
  const [anime, setAnime] = useState<PickedAnime | null>(null)
  const [image, setImage] = useState<MediaRef | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!user) {
    return (
      <p className="m-[15px] rounded-[3px] bg-item px-3 py-2.5 text-[13.5px]">
        <Link to={`/masuk?next=/komunitas/${slug}`} className="font-semibold text-accent hover:underline">
          Masuk
        </Link>{' '}
        untuk membuat postingan.
      </p>
    )
  }
  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="m-[15px] flex h-9 items-center gap-1.5 rounded-[3px] bg-accent px-4 text-[13.5px] font-medium text-white">
        <Plus className="h-4 w-4" aria-hidden="true" /> Postingan baru
      </button>
    )
  }
  const field = 'w-full rounded-[3px] border border-input-border bg-input px-3 text-[14px] text-heading outline-none focus:border-accent'
  return (
    <form
      className="flex flex-col gap-2.5 p-[15px]"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        setError('')
        try {
          const r = await accountApi.createPost(slug, { title: title.trim(), body: body.trim(), spoiler, anime: anime?.slug, image: image?.id })
          announce(r.outcome)
          navigate(`/komunitas/post/${r.post.id}`)
        } catch (err) {
          setError(err instanceof ApiError ? err.message : 'Tidak dapat terhubung ke server.')
        } finally {
          setBusy(false)
        }
      }}
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} placeholder="Judul" aria-label="Judul" className={`${field} h-10`} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} required={!image} maxLength={10000} rows={6} placeholder="Isi postingan" aria-label="Isi postingan" className={`${field} py-2.5`} />
      <AnimePicker value={anime} onChange={setAnime} />
      <div className="flex flex-wrap items-center gap-3">
        <ImagePicker value={image} onChange={setImage} disabled={busy} />
        <label className="flex items-center gap-1.5 text-[13px]">
          <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} /> Spoiler
        </label>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setOpen(false)} className="h-9 px-3 text-[13px] text-muted hover:text-heading">
            Batal
          </button>
          <button disabled={busy || !title.trim() || (!body.trim() && !image)} className="h-9 rounded-[3px] bg-accent px-5 text-[13.5px] font-medium text-white disabled:opacity-50">
            {busy ? 'Mengirim...' : 'Posting'}
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="text-[12.5px] text-[#e5484d]">
          {error}
        </p>
      )}
    </form>
  )
}

export default function Community() {
  const { slug = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const sort = SORTS.some((s) => s.key === params.get('urut')) ? params.get('urut')! : 'hot'

  const board = useQuery({ queryKey: ['posts', 'board', slug], queryFn: ({ signal }) => accountApi.community(slug, signal), staleTime: 60_000 })
  const posts = useInfiniteQuery({
    queryKey: ['posts', 'list', slug, sort],
    queryFn: ({ pageParam, signal }) => accountApi.posts(slug, sort, pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (last, all) => (last.more ? all.length + 1 : undefined),
  })
  useTitle(board.data ? `${board.data.name} - Komunitas` : '')

  // Live: scores and edits update rows in place; new posts wait behind a button so the list does not jump.
  const client = useQueryClient()
  const [fresh, setFresh] = useState(0)
  useEffect(() => setFresh(0), [slug, sort])
  const mapPosts = (fn: (p: Post) => Post) =>
    client.setQueriesData<InfiniteData<{ items: Post[]; more: boolean }>>({ queryKey: ['posts', 'list', slug] }, (old) =>
      old ? { ...old, pages: old.pages.map((pg) => ({ ...pg, items: pg.items.map(fn) })) } : old,
    )
  const reload = () => {
    setFresh(0)
    void client.invalidateQueries({ queryKey: ['posts', 'list', slug] })
  }
  useLive(
    liveUrl({ board: slug }),
    (ev: LiveEvent) => {
      if (ev.type === 'post') setFresh((n) => n + 1)
      else if (ev.type === 'score' && ev.kind === 'post' && ev.id && ev.score !== undefined) {
        const { id, score } = ev
        mapPosts((p) => (p.id === id ? { ...p, score } : p))
      } else if (ev.type === 'post-update' && ev.post) {
        const incoming = ev.post
        mapPosts((p) => (p.id === incoming.id ? { ...incoming, mine: p.mine, myVote: p.myVote } : p))
      } else if (ev.type === 'post-delete') reload()
    },
    reload,
  )

  if (board.isLoading) return <PageLoader />
  if (board.error || !board.data) return <ErrorView error={board.error} retry={board.refetch} />

  const items = posts.data?.pages.flatMap((p) => p.items) ?? []
  return (
    <div className="mx-auto max-w-[820px]">
      <Box
        title={board.data.name}
        as="h1"
        action={
          <div className="flex gap-1 text-[12px]" role="tablist">
            {SORTS.map((s) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={sort === s.key}
                onClick={() => setParams(s.key === 'hot' ? {} : { urut: s.key })}
                className={`rounded-[3px] px-2.5 py-0.5 font-medium text-white ${sort === s.key ? 'bg-accent' : 'bg-[#222] hover:bg-accent/70'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        }
      >
        <p className="px-[15px] pt-3 text-[13px] text-muted">{board.data.description}</p>
        <NewPost slug={slug} />
        {fresh > 0 && (
          <button onClick={reload} className="mx-[15px] mb-3 w-[calc(100%-30px)] rounded-[3px] bg-accent/15 py-2 text-[13px] font-medium text-accent hover:bg-accent/25" role="status">
            {fresh} postingan baru. Tampilkan
          </button>
        )}
        {posts.isLoading ? (
          <PageLoader />
        ) : posts.error ? (
          <ErrorView error={posts.error} retry={posts.refetch} />
        ) : items.length === 0 ? (
          <Empty>Belum ada postingan. Mulai diskusi pertama.</Empty>
        ) : (
          <ul className="divide-y divide-line border-t border-line">
            {items.map((p) => (
              <PostRow key={p.id} post={p} />
            ))}
          </ul>
        )}
        {posts.hasNextPage && (
          <div className="p-[15px] text-center">
            <button disabled={posts.isFetchingNextPage} onClick={() => posts.fetchNextPage()} className="h-9 rounded-[3px] bg-nav px-6 text-[13px] text-white hover:bg-accent disabled:opacity-60">
              {posts.isFetchingNextPage ? 'Memuat...' : 'Muat lagi'}
            </button>
          </div>
        )}
      </Box>
      <p className="text-center text-[12.5px]">
        <Link to="/komunitas" className="text-accent hover:underline">
          Semua komunitas
        </Link>
      </p>
    </div>
  )
}
