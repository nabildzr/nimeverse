import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Author, Comment, User } from '../api/accountTypes'

const state = vi.hoisted(() => ({ user: null as User | null }))
const api = vi.hoisted(() => ({
  comments: vi.fn(),
  addComment: vi.fn(),
  vote: vi.fn(),
  report: vi.fn(),
  editComment: vi.fn(),
  deleteComment: vi.fn(),
}))

vi.mock('../api/client', () => ({
  accountApi: api,
  ApiError: class extends Error {},
  avatarUrl: () => '/avatar',
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
    expect(api.addComment).toHaveBeenCalledWith({ anime: 'one-piece', episode: 1 }, 'halo semua', false)
  })
})
