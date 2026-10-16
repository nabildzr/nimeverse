import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Author, Comment, LiveEvent, PublicProfile, User } from '../api/accountTypes'

const state = vi.hoisted(() => ({ user: null as User | null, live: null as null | ((ev: LiveEvent) => void) }))
const api = vi.hoisted(() => ({
  comments: vi.fn(),
  addComment: vi.fn(),
  vote: vi.fn(),
  report: vi.fn(),
  editComment: vi.fn(),
  deleteComment: vi.fn(),
  profile: vi.fn(),
  uploadImage: vi.fn(),
}))

vi.mock('../api/client', () => ({
  accountApi: api,
  ApiError: class extends Error {},
  avatarUrl: () => '/avatar',
  mediaUrl: (id: string) => `/pics/${id}`,
  liveUrl: () => '/live',
}))
vi.mock('../lib/useLive', () => ({
  useLive: (_url: string, handler: (ev: LiveEvent) => void) => {
    state.live = handler
  },
}))
vi.mock('../auth/AuthContext', () => ({
  useAuth: () => ({ user: state.user, announce: vi.fn() }),
}))

import { Comments } from './Comments'

const author = (name: string): Author => ({ name, level: 2, premium: false, hasAvatar: false })
const comment = (over: Partial<Comment>): Comment => ({
  id: 1,
  depth: 0,
  author: author('rina'),
  body: 'episode ini bagus',
  spoiler: false,
  score: 3,
  myVote: 0,
  createdAt: new Date().toISOString(),
  deleted: false,
  mine: false,
  ...over,
})

function renderComments() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Comments target={{ anime: 'one-piece', episode: 1 }} />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('Comments', () => {
  afterEach(cleanup)

  beforeEach(() => {
    vi.clearAllMocks()
    state.user = null
    state.live = null
  })

  it('nests replies under their parent and hides spoilers until revealed', async () => {
    api.comments.mockResolvedValue({
      items: [
        comment({ id: 1 }),
        comment({ id: 2, parentId: 1, depth: 1, author: author('budi'), body: 'setuju banget' }),
        comment({ id: 3, author: author('sari'), body: 'rahasia cerita', spoiler: true }),
      ],
    })
    renderComments()
    expect(await screen.findByText('episode ini bagus')).toBeInTheDocument()
    expect(screen.getByText('setuju banget')).toBeInTheDocument()
    expect(screen.queryByText('rahasia cerita')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /berisi spoiler/i }))
    expect(screen.getByText('rahasia cerita')).toBeInTheDocument()
  })

  it('asks visitors to sign in and disables voting', async () => {
    api.comments.mockResolvedValue({ items: [comment({})] })
    renderComments()
    await screen.findByText('episode ini bagus')
    expect(screen.getByRole('link', { name: 'Masuk' })).toHaveAttribute('href', '/masuk')
    expect(screen.getByRole('button', { name: 'Upvote' })).toBeDisabled()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('lets a member post a comment and shows it', async () => {
    state.user = { displayName: 'aku', role: 'user' } as User
    api.comments.mockResolvedValue({ items: [] })
    api.addComment.mockResolvedValue({
      comment: comment({ id: 9, author: author('aku'), body: 'halo semua', mine: true }),
      outcome: { gains: [] },
    })
    renderComments()
    await screen.findByText(/belum ada komentar/i)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'halo semua' } })
    fireEvent.click(screen.getByRole('button', { name: 'Kirim' }))
    await waitFor(() => expect(screen.getByText('halo semua')).toBeInTheDocument())
    expect(api.addComment).toHaveBeenCalledWith({ anime: 'one-piece', episode: 1 }, 'halo semua', false, undefined, undefined)
  })

  it('shows a picture and adds comments other people post while the page is open', async () => {
    api.comments.mockResolvedValue({
      items: [comment({ id: 1, image: { id: 'abc123', width: 200, height: 100, animated: false } })],
    })
    renderComments()
    await screen.findByText('episode ini bagus')
    expect(screen.getByAltText('Gambar dari anggota')).toHaveAttribute('src', '/pics/abc123')

    act(() => state.live?.({ type: 'comment', comment: comment({ id: 2, author: author('baru'), body: 'komentar langsung' }) }))
    expect(await screen.findByText('komentar langsung')).toBeInTheDocument()

    // The same event twice (own comment echoed back) does not duplicate it.
    act(() => state.live?.({ type: 'comment', comment: comment({ id: 2, author: author('baru'), body: 'komentar langsung' }) }))
    expect(screen.getAllByText('komentar langsung')).toHaveLength(1)

    act(() => state.live?.({ type: 'score', kind: 'comment', id: 1, score: 9 }))
    expect(await screen.findByLabelText('Skor 9')).toBeInTheDocument()
  })

  it('does not duplicate my own comment when the live event arrives before the response', async () => {
    state.user = { displayName: 'aku', role: 'user' } as User
    api.comments.mockResolvedValue({ items: [] })
    let release: () => void = () => {}
    api.addComment.mockImplementation(
      () =>
        new Promise((resolve) => {
          release = () => resolve({ comment: comment({ id: 7, author: author('aku'), body: 'cepat sekali', mine: true }), outcome: { gains: [] } })
        }),
    )
    renderComments()
    await screen.findByText(/belum ada komentar/i)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cepat sekali' } })
    fireEvent.click(screen.getByRole('button', { name: 'Kirim' }))
    act(() => state.live?.({ type: 'comment', comment: comment({ id: 7, author: author('aku'), body: 'cepat sekali' }) }))
    await act(async () => release())
    await waitFor(() => expect(screen.getAllByText('cepat sekali')).toHaveLength(1))
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument() // the response marked it as mine
  })

  it('opens the author profile card when the avatar is clicked', async () => {
    api.comments.mockResolvedValue({ items: [comment({})] })
    const profile = {
      name: 'rina', bio: 'suka anime aksi', level: 7, xp: 2000, levelXp: 1800, nextLevelXp: 2450, premium: true, hasAvatar: false, hasBanner: false,
      title: 't-legend', streakCurrent: 3, streakBest: 5, joinedAt: new Date().toISOString(), self: false,
      stats: { episodes: 12, series: 4, comments: 30, posts: 2, upvotes: 15 }, badges: [], favorites: [],
    } as unknown as PublicProfile
    api.profile.mockResolvedValue(profile)
    renderComments()
    await screen.findByText('episode ini bagus')
    fireEvent.click(screen.getByRole('button', { name: 'Profil rina' }))
    expect(await screen.findByText('suka anime aksi')).toBeInTheDocument()
    expect(screen.getByText('Sang Legenda')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lihat profil' })).toHaveAttribute('href', '/profil/rina')
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByText('suka anime aksi')).not.toBeInTheDocument())
  })
})
