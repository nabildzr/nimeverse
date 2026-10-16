import type {
  AnimeCard,
  DetailData,
  EpisodeCard,
  Genre,
  HomeData,
  ListParams,
  Paged,
  ScheduleData,
  WatchData,
} from './types'
import type {
  Accessory,
  GachaState,
  MediaRef,
  PullBatch,
  Quest,
  AnimeState,
  Badge,
  Comment,
  CommentTarget,
  Community,
  ContinueItem,
  LeaderRow,
  LibraryItem,
  ListStatus,
  Outcome,
  Post,
  PublicProfile,
  User,
} from './accountTypes'
import { decryptPayload } from './crypto'

const BASE = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function toQuery(params: Record<string, string | number | undefined | null>): string {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    q.set(k, String(v))
  }
  const s = q.toString()
  return s ? `?${s}` : ''
}

interface RequestOptions {
  body?: unknown
  /** A raw payload (for example a picture) sent as is. */
  raw?: Blob
  signal?: AbortSignal
}

/**
 * One path for every call. State-changing requests carry the custom header the server requires, cookies travel
 * with same-origin requests, and encrypted catalogue and account answers are decrypted here.
 */
async function request<T>(method: string, path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (method !== 'GET') headers['X-Nimeverse'] = '1'
  let body: BodyInit | undefined
  if (opts.raw) {
    body = opts.raw
  } else if (opts.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(opts.body)
  }
  const res = await fetch(`${BASE}/api${path}`, { method, headers, body, signal: opts.signal })
  if (!res.ok) {
    let message = res.statusText
    try {
      message = (await res.json()).error ?? message
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, message)
  }
  if (res.status === 204) return undefined as T
  const json = await res.json()
  if (json && typeof json === 'object' && typeof (json as { payload?: unknown }).payload === 'string') {
    return await decryptPayload<T>((json as { payload: string }).payload)
  }
  return json as T
}

const get = <T>(path: string, signal?: AbortSignal) => request<T>('GET', path, { signal })
const send = <T>(method: string, path: string, body?: unknown) => request<T>(method, path, { body })

export interface AuthResult {
  user: User
  outcome?: Outcome
}

export const api = {
  home: (signal?: AbortSignal) => get<HomeData>('/home', signal),
  latest: (page: number, signal?: AbortSignal) => get<Paged<EpisodeCard>>(`/episodes/latest${toQuery({ page })}`, signal),
  list: (params: ListParams, signal?: AbortSignal) =>
    get<Paged<AnimeCard>>(`/anime${toQuery({ ...params })}`, signal),
  suggest: (q: string, signal?: AbortSignal) => get<{ items: AnimeCard[] }>(`/search/suggest${toQuery({ q })}`, signal),
  detail: (slug: string, signal?: AbortSignal) => get<DetailData>(`/anime/${encodeURIComponent(slug)}`, signal),
  watch: (slug: string, number: number, signal?: AbortSignal) =>
    get<WatchData>(`/anime/${encodeURIComponent(slug)}/episodes/${number}`, signal),
  genres: (signal?: AbortSignal) => get<{ items: Genre[] }>('/genres', signal),
  schedule: (from: string, days = 7, signal?: AbortSignal) =>
    get<ScheduleData>(`/schedule${toQuery({ from, days })}`, signal),
}

export const accountApi = {
  providers: () => get<{ google: boolean; palette: string[] }>('/auth/providers'),
  whoAmI: (signal?: AbortSignal) => get<{ user: User | null }>('/auth/me', signal),
  register: (email: string, password: string, displayName: string) =>
    send<AuthResult>('POST', '/auth/register', { email, password, displayName }),
  login: (email: string, password: string) => send<AuthResult>('POST', '/auth/login', { email, password }),
  logout: () => send<void>('POST', '/auth/logout'),
  changePassword: (current: string, next: string) => send<void>('POST', '/auth/password', { current, new: next }),

  me: () => get<{ user: User; badges: Badge[]; palette: string[] }>('/me'),
  updateMe: (patch: Partial<Pick<User, 'displayName' | 'bio' | 'profilePublic' | 'favoritesPublic' | 'accentColor'>>) =>
    send<{ user: User }>('PATCH', '/me', patch),
  uploadAvatar: (file: Blob) => request<{ user: User }>('PUT', '/me/avatar', { raw: file }),
  removeAvatar: () => send<void>('DELETE', '/me/avatar'),
  uploadBanner: (file: Blob) => request<{ user: User }>('PUT', '/me/banner', { raw: file }),
  removeBanner: () => send<void>('DELETE', '/me/banner'),
  accessories: (signal?: AbortSignal) => get<{ items: Accessory[] }>('/accessories', signal),
  equip: (slots: { frame?: string; effect?: string; skin?: string; title?: string }) => send<{ user: User }>('PUT', '/me/accessories', slots),
  uploadImage: (file: Blob) => request<{ media: MediaRef }>('POST', '/pics', { raw: file }),
  gacha: () => get<GachaState>('/gacha'),
  pull: (count: 1 | 10) => send<PullBatch>('POST', '/gacha/pull', { count }),
  quests: () => get<{ items: Quest[]; resetsAt: string }>('/quests'),
  claimQuest: (code: string) => send<{ outcome: Outcome; reward: number }>('POST', '/quests/claim', { code }),
  checkIn: () => send<{ outcome: Outcome }>('POST', '/me/checkin'),

  watchlist: (status: string, favorite: boolean, page = 1) =>
    get<{ items: LibraryItem[]; total: number; page: number; pageSize: number }>(
      `/me/watchlist${toQuery({ status, favorite: favorite ? 1 : undefined, page })}`,
    ),
  animeState: (slug: string, signal?: AbortSignal) => get<AnimeState>(`/me/anime/${encodeURIComponent(slug)}`, signal),
  setListEntry: (slug: string, patch: { status?: ListStatus; favorite?: boolean }) =>
    send<{ state: AnimeState; outcome: Outcome }>('PUT', `/me/watchlist/${encodeURIComponent(slug)}`, patch),
  removeListEntry: (slug: string) => send<void>('DELETE', `/me/watchlist/${encodeURIComponent(slug)}`),
  reportProgress: (slug: string, episode: number, position: number, duration: number) =>
    send<{ completed: boolean; outcome?: Outcome }>('POST', '/me/progress', { slug, episode, position, duration }),
  continueWatching: (signal?: AbortSignal) => get<{ items: ContinueItem[] }>('/me/continue?limit=12', signal),

  profile: (name: string, signal?: AbortSignal) => get<PublicProfile>(`/users/${encodeURIComponent(name)}`, signal),
  badges: (signal?: AbortSignal) => get<{ items: Badge[] }>('/badges', signal),
  leaderboard: (period: 'week' | 'all', signal?: AbortSignal) =>
    get<{ period: string; items: LeaderRow[]; me: LeaderRow | null }>(`/leaderboard${toQuery({ period })}`, signal),

  comments: (target: CommentTarget, signal?: AbortSignal) =>
    get<{ items: Comment[] }>(`/comments${toQuery({ anime: target.anime, episode: target.episode, post: target.post })}`, signal),
  addComment: (target: CommentTarget, body: string, spoiler: boolean, parentId?: number, image?: string) =>
    send<{ comment: Comment; outcome: Outcome }>('POST', '/comments', { ...target, body, spoiler, parentId, image }),
  editComment: (id: number, body: string, spoiler?: boolean) =>
    send<{ comment: Comment }>('PATCH', `/comments/${id}`, { body, spoiler }),
  deleteComment: (id: number) => send<void>('DELETE', `/comments/${id}`),
  vote: (kind: 'comment' | 'post', id: number, value: -1 | 0 | 1) =>
    send<{ score: number; myVote: number }>('POST', '/votes', { kind, id, value }),
  report: (kind: 'comment' | 'post', id: number, reason: string) => send<void>('POST', '/reports', { kind, id, reason }),

  communities: (signal?: AbortSignal) => get<{ items: Community[] }>('/communities', signal),
  community: (slug: string, signal?: AbortSignal) => get<Community>(`/communities/${encodeURIComponent(slug)}`, signal),
  posts: (slug: string, sort: string, page: number, signal?: AbortSignal) =>
    get<{ items: Post[]; more: boolean }>(`/communities/${encodeURIComponent(slug)}/posts${toQuery({ sort, page })}`, signal),
  createPost: (slug: string, post: { title: string; body: string; spoiler: boolean; anime?: string; image?: string }) =>
    send<{ post: Post; outcome: Outcome }>('POST', `/communities/${encodeURIComponent(slug)}/posts`, post),
  post: (id: number, signal?: AbortSignal) => get<Post>(`/posts/${id}`, signal),
  editPost: (id: number, post: { title: string; body: string; spoiler?: boolean }) =>
    send<{ post: Post }>('PATCH', `/posts/${id}`, post),
  deletePost: (id: number) => send<void>('DELETE', `/posts/${id}`),
  lockPost: (id: number, locked: boolean) => send<void>('POST', `/posts/${id}/lock`, { locked }),

  staffReports: () =>
    get<{
      items: { id: number; kind: string; targetId: number; reason: string; reporter: string; excerpt: string; author: string; createdAt: string; targetGone: boolean }[]
    }>('/staff/reports'),
  resolveReport: (id: number, remove: boolean) => send<void>('POST', `/staff/reports/${id}/resolve`, { remove }),
}

/** URL of a user's picture. The version changes whenever they upload a new one, so browsers refetch it. */
export function avatarUrl(name: string, version?: number): string {
  return `${BASE}/api/users/${encodeURIComponent(name)}/avatar${version ? `?v=${version}` : ''}`
}

/** URL of a user's profile banner, versioned like the avatar. */
export function bannerUrl(name: string, version?: number): string {
  return `${BASE}/api/users/${encodeURIComponent(name)}/banner${version ? `?v=${version}` : ''}`
}

/** URL of a picture attached to a comment or post. Pictures never change, so browsers cache them for good. */
export function mediaUrl(id: string): string {
  return `${BASE}/api/pics/${encodeURIComponent(id)}`
}

/** Address of the live event stream for a page: an anime or episode, a post, or a community board. */
export function liveUrl(target: { anime?: string; episode?: number; post?: number; board?: string }): string {
  return `${BASE}/api/live${toQuery({ anime: target.anime, episode: target.episode, post: target.post, board: target.board })}`
}
