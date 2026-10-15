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

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) {
    let message = res.statusText
    try {
      message = (await res.json()).error ?? message
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, message)
  }
  return res.json() as Promise<T>
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
