import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowBigDown, ArrowBigUp, EyeOff, Flag, MessageSquare, Pencil, Trash2 } from 'lucide-react'
import { accountApi, ApiError } from '../api/client'
import type { Comment, CommentTarget } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { timeAgo } from '../lib/format'
import { Avatar, AuthorName, authorFace } from './Avatar'
import { Box } from './Box'

const MAX_LEN = 2000

function errorText(e: unknown): string {
  return e instanceof ApiError ? e.message : 'Terjadi kesalahan. Coba lagi.'
}

/** Up and down arrows with the score between them. Visitors are sent to sign in. */
export function VoteButtons({
  kind,
  id,
  score,
  myVote,
  onChange,
}: {
  kind: 'comment' | 'post'
  id: number
  score: number
  myVote: number
  onChange: (score: number, myVote: number) => void
}) {
  const { user } = useAuth()
  const vote = useMutation({
    mutationFn: (value: -1 | 0 | 1) => accountApi.vote(kind, id, value),
    onSuccess: (r) => onChange(r.score, r.myVote),
  })
  const click = (value: 1 | -1) => {
    if (!user) return
    vote.mutate(myVote === value ? 0 : value)
  }
  const base = 'rounded-[3px] p-0.5 disabled:opacity-40'
  return (
    <div className="flex items-center gap-0.5 text-[12.5px]">
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={myVote === 1}
        disabled={!user || vote.isPending}
        title={user ? undefined : 'Masuk untuk memberi suara'}
        onClick={() => click(1)}
        className={`${base} ${myVote === 1 ? 'text-accent' : 'text-muted hover:text-heading'}`}
      >
        <ArrowBigUp className="h-5 w-5" fill={myVote === 1 ? 'currentColor' : 'none'} />
      </button>
      <span className="min-w-[1.5ch] text-center font-semibold text-heading" aria-label={`Skor ${score}`}>
        {score}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={myVote === -1}
        disabled={!user || vote.isPending}
        title={user ? undefined : 'Masuk untuk memberi suara'}
        onClick={() => click(-1)}
        className={`${base} ${myVote === -1 ? 'text-[#e5484d]' : 'text-muted hover:text-heading'}`}
      >
        <ArrowBigDown className="h-5 w-5" fill={myVote === -1 ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}

export function ReportButton({ kind, id }: { kind: 'comment' | 'post'; id: number }) {
  const { user } = useAuth()
  const [state, setState] = useState<'idle' | 'open' | 'sent'>('idle')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const send = useMutation({
    mutationFn: () => accountApi.report(kind, id, reason.trim()),
    onSuccess: () => setState('sent'),
    onError: (e) => setError(errorText(e)),
  })
  if (!user) return null
  if (state === 'sent') return <span className="text-[12px] text-muted">Laporan terkirim</span>
  if (state === 'idle') {
    return (
      <button type="button" onClick={() => setState('open')} className="flex items-center gap-1 text-[12px] text-muted hover:text-heading">
        <Flag className="h-3.5 w-3.5" aria-hidden="true" /> Laporkan
      </button>
    )
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setError('')
        send.mutate()
      }}
      className="flex w-full flex-wrap items-center gap-2"
    >
      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        maxLength={300}
        required
        autoFocus
        aria-label="Alasan laporan"
        placeholder="Alasan laporan"
        className="h-7 min-w-[160px] flex-1 rounded-[3px] border border-input-border bg-input px-2 text-[12.5px] text-heading outline-none focus:border-accent"
      />
      <button disabled={send.isPending || !reason.trim()} className="h-7 rounded-[3px] bg-nav px-3 text-[12px] text-white hover:bg-accent disabled:opacity-50">
        Kirim
      </button>
      <button type="button" onClick={() => setState('idle')} className="text-[12px] text-muted hover:text-heading">
        Batal
      </button>
      {error && <span className="w-full text-[12px] text-[#e5484d]">{error}</span>}
    </form>
  )
}

function Editor({
  initial = '',
  initialSpoiler = false,
  submitLabel,
  placeholder,
  autoFocus,
  onSubmit,
  onCancel,
}: {
  initial?: string
  initialSpoiler?: boolean
  submitLabel: string
  placeholder?: string
  autoFocus?: boolean
  onSubmit: (body: string, spoiler: boolean) => Promise<void>
  onCancel?: () => void
}) {
  const [body, setBody] = useState(initial)
  const [spoiler, setSpoiler] = useState(initialSpoiler)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const trimmed = body.trim()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!trimmed || busy) return
        setBusy(true)
        setError('')
        try {
          await onSubmit(trimmed, spoiler)
          setBody('')
          setSpoiler(false)
        } catch (err) {
          setError(errorText(err))
        } finally {
          setBusy(false)
        }
      }}
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={MAX_LEN}
        rows={3}
        autoFocus={autoFocus}
        placeholder={placeholder ?? 'Tulis komentar...'}
        aria-label={placeholder ?? 'Tulis komentar'}
        className="w-full resize-y rounded-[3px] border border-input-border bg-input p-2.5 text-[14px] text-heading outline-none focus:border-accent"
      />
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-1.5 text-[12.5px]">
          <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} /> Spoiler
        </label>
        <span className="text-[12px] text-muted">
          {body.length}/{MAX_LEN}
        </span>
        <div className="ml-auto flex gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="h-[30px] rounded-[3px] px-3 text-[13px] text-muted hover:text-heading">
              Batal
            </button>
          )}
          <button disabled={!trimmed || busy} className="h-[30px] rounded-[3px] bg-accent px-4 text-[13px] font-medium text-white disabled:opacity-50">
            {busy ? 'Mengirim...' : submitLabel}
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-[12.5px] text-[#e5484d]">
          {error}
        </p>
      )}
    </form>
  )
}

interface Handlers {
  reply: (parentId: number, body: string, spoiler: boolean) => Promise<void>
  edit: (id: number, body: string, spoiler: boolean) => Promise<void>
  remove: (id: number) => Promise<void>
  patchVote: (id: number, score: number, myVote: number) => void
  locked: boolean
}

function CommentNode({ comment, children, handlers }: { comment: Comment; children: Map<number, Comment[]>; handlers: Handlers }) {
  const { user } = useAuth()
  const [mode, setMode] = useState<'view' | 'reply' | 'edit'>('view')
  const [revealed, setRevealed] = useState(false)
  const kids = children.get(comment.id) ?? []
  const hidden = comment.spoiler && !revealed && !comment.mine
  const canReply = !!user && !handlers.locked && comment.depth < 4 && !comment.deleted
  const isStaff = user?.role === 'mod' || user?.role === 'admin'

  return (
    <li className="mt-3">
      <div className="flex gap-2.5">
        {comment.author ? <Avatar face={authorFace(comment.author)} size={comment.depth > 0 ? 28 : 34} /> : <span className="h-8 w-8 flex-none rounded-full bg-control" />}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 text-[12.5px]">
            <AuthorName author={comment.author} />
            <span className="text-muted">{timeAgo(comment.createdAt)}</span>
            {comment.editedAt && <span className="text-muted">(diedit)</span>}
          </div>
          {mode === 'edit' ? (
            <div className="mt-1.5">
              <Editor
                initial={comment.body}
                initialSpoiler={comment.spoiler}
                submitLabel="Simpan"
                autoFocus
                onSubmit={async (b, s) => {
                  await handlers.edit(comment.id, b, s)
                  setMode('view')
                }}
                onCancel={() => setMode('view')}
              />
            </div>
          ) : comment.deleted ? (
            <p className="mt-0.5 text-[13.5px] italic text-muted">Komentar dihapus.</p>
          ) : hidden ? (
            <button type="button" onClick={() => setRevealed(true)} className="mt-1 flex items-center gap-1.5 rounded-[3px] bg-item px-3 py-1.5 text-[13px] text-muted hover:text-heading">
              <EyeOff className="h-4 w-4" aria-hidden="true" /> Berisi spoiler. Klik untuk menampilkan.
            </button>
          ) : (
            <p className="mt-0.5 whitespace-pre-wrap break-words text-[14px] leading-[1.6] text-text">{comment.body}</p>
          )}
          {!comment.deleted && mode !== 'edit' && (
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
              <VoteButtons kind="comment" id={comment.id} score={comment.score} myVote={comment.myVote} onChange={(s, v) => handlers.patchVote(comment.id, s, v)} />
              {canReply && (
                <button type="button" onClick={() => setMode(mode === 'reply' ? 'view' : 'reply')} className="flex items-center gap-1 text-[12px] text-muted hover:text-heading">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" /> Balas
                </button>
              )}
              {comment.mine && (
                <button type="button" onClick={() => setMode('edit')} className="flex items-center gap-1 text-[12px] text-muted hover:text-heading">
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                </button>
              )}
              {(comment.mine || isStaff) && (
                <button
                  type="button"
                  onClick={() => window.confirm('Hapus komentar ini?') && void handlers.remove(comment.id)}
                  className="flex items-center gap-1 text-[12px] text-muted hover:text-[#e5484d]"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Hapus
                </button>
              )}
              {!comment.mine && <ReportButton kind="comment" id={comment.id} />}
            </div>
          )}
          {mode === 'reply' && (
            <div className="mt-2">
              <Editor
                submitLabel="Balas"
                placeholder={`Balas ${comment.author?.name ?? ''}`.trim()}
                autoFocus
                onSubmit={async (b, s) => {
                  await handlers.reply(comment.id, b, s)
                  setMode('view')
                }}
                onCancel={() => setMode('view')}
              />
            </div>
          )}
        </div>
      </div>
      {kids.length > 0 && (
        <ul className="ml-4 border-l border-line pl-3 sm:ml-[17px] sm:pl-4">
          {kids.map((k) => (
            <CommentNode key={k.id} comment={k} children={children} handlers={handlers} />
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * Threaded discussion for an anime page, an episode or a community post. Server returns a flat list;
 * the tree is built here.
 */
export function Comments({ target, title = 'Komentar', locked = false }: { target: CommentTarget; title?: string; locked?: boolean }) {
  const { user, announce } = useAuth()
  const client = useQueryClient()
  const key = useMemo(() => ['comments', target.anime ?? '', target.episode ?? 0, target.post ?? 0], [target])
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: key,
    queryFn: ({ signal }) => accountApi.comments(target, signal),
    staleTime: 30_000,
  })

  const { roots, children } = useMemo(() => {
    const kids = new Map<number, Comment[]>()
    const top: Comment[] = []
    for (const c of data?.items ?? []) {
      if (c.parentId) kids.set(c.parentId, [...(kids.get(c.parentId) ?? []), c])
      else top.push(c)
    }
    return { roots: top, children: kids }
  }, [data])

  const patch = (fn: (items: Comment[]) => Comment[]) =>
    client.setQueryData<{ items: Comment[] }>(key, (old) => (old ? { items: fn(old.items) } : old))

  const handlers: Handlers = {
    locked,
    reply: async (parentId, body, spoiler) => {
      const r = await accountApi.addComment(target, body, spoiler, parentId)
      patch((items) => [...items, r.comment])
      announce(r.outcome)
    },
    edit: async (id, body, spoiler) => {
      const r = await accountApi.editComment(id, body, spoiler)
      patch((items) => items.map((c) => (c.id === id ? r.comment : c)))
    },
    remove: async (id) => {
      await accountApi.deleteComment(id)
      void client.invalidateQueries({ queryKey: key })
    },
    patchVote: (id, score, myVote) => patch((items) => items.map((c) => (c.id === id ? { ...c, score, myVote } : c))),
  }

  const count = data?.items.filter((c) => !c.deleted).length ?? 0

  return (
    <Box title={`${title}${data ? ` (${count})` : ''}`} as="h2">
      <div className="p-[15px]">
        {locked ? (
          <p className="mb-2 text-[13px] text-muted">Diskusi ini dikunci.</p>
        ) : user ? (
          <Editor
            submitLabel="Kirim"
            onSubmit={async (body, spoiler) => {
              const r = await accountApi.addComment(target, body, spoiler)
              patch((items) => [...items, r.comment])
              announce(r.outcome)
            }}
          />
        ) : (
          <p className="rounded-[3px] bg-item px-3 py-2.5 text-[13.5px]">
            <Link to="/masuk" className="font-semibold text-accent hover:underline">
              Masuk
            </Link>{' '}
            untuk ikut berkomentar dan mendapat XP.
          </p>
        )}
        {isLoading && <p className="mt-4 text-[13px] text-muted">Memuat komentar...</p>}
        {error && (
          <p className="mt-4 text-[13px]">
            Komentar gagal dimuat.{' '}
            <button type="button" onClick={() => refetch()} className="text-accent hover:underline">
              Coba lagi
            </button>
          </p>
        )}
        {!isLoading && !error && roots.length === 0 && <p className="mt-4 text-[13px] text-muted">Belum ada komentar. Jadilah yang pertama.</p>}
        {roots.length > 0 && (
          <ul>
            {roots.map((c) => (
              <CommentNode key={c.id} comment={c} children={children} handlers={handlers} />
            ))}
          </ul>
        )}
      </div>
    </Box>
  )
}
