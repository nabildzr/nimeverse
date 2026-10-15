const FORMAT_LABELS: Record<string, string> = {
  TV: 'TV',
  TV_SHORT: 'TV Short',
  MOVIE: 'Movie',
  SPECIAL: 'Special',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'Music',
}

const STATUS_LABELS: Record<string, string> = {
  RELEASING: 'Ongoing',
  FINISHED: 'Completed',
  NOT_YET_RELEASED: 'Upcoming',
  CANCELLED: 'Cancelled',
  HIATUS: 'Hiatus',
}

const SEASON_LABELS: Record<string, string> = {
  WINTER: 'Winter',
  SPRING: 'Spring',
  SUMMER: 'Summer',
  FALL: 'Fall',
}

export const formatLabel = (f?: string | null) => (f ? (FORMAT_LABELS[f] ?? f) : 'Anime')
export const statusLabel = (s?: string | null) => (s ? (STATUS_LABELS[s] ?? s) : '-')
export const seasonLabel = (s?: string | null, y?: number | null) =>
  s ? `${SEASON_LABELS[s] ?? s}${y ? ` ${y}` : ''}` : y ? String(y) : '-'

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }))
export const FORMAT_OPTIONS = Object.entries(FORMAT_LABELS).map(([value, label]) => ({ value, label }))
export const ORDER_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'title', label: 'A-Z' },
  { value: 'titlereverse', label: 'Z-A' },
  { value: 'update', label: 'Latest Update' },
  { value: 'latest', label: 'Latest Added' },
  { value: 'popular', label: 'Popular' },
  { value: 'score', label: 'Rating' },
]

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' })
const dayFmt = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })

export const formatDate = (iso?: string | null) => (iso ? dateFmt.format(new Date(iso)) : '-')
export const formatTime = (iso: string) => timeFmt.format(new Date(iso))
export const formatDay = (d: Date) => dayFmt.format(d)

/** Indonesian relative time, e.g. "3 jam lalu" or "dalam 2 hari". */
export function timeAgo(iso: string | null | undefined, now = Date.now()): string {
  if (!iso) return ''
  const diff = Math.round((now - new Date(iso).getTime()) / 1000)
  const abs = Math.abs(diff)
  const units: [number, string][] = [
    [60 * 60 * 24 * 365, 'tahun'],
    [60 * 60 * 24 * 30, 'bulan'],
    [60 * 60 * 24 * 7, 'minggu'],
    [60 * 60 * 24, 'hari'],
    [60 * 60, 'jam'],
    [60, 'menit'],
  ]
  for (const [secs, label] of units) {
    if (abs >= secs) {
      const n = Math.floor(abs / secs)
      return diff >= 0 ? `${n} ${label} lalu` : `dalam ${n} ${label}`
    }
  }
  return diff >= 0 ? 'baru saja' : 'sebentar lagi'
}

/** Countdown text like "2h 05j 13m" for upcoming airings. */
export function countdown(iso: string, now = Date.now()): string {
  let s = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000))
  const d = Math.floor(s / 86400)
  s -= d * 86400
  const h = Math.floor(s / 3600)
  s -= h * 3600
  const m = Math.floor(s / 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return d > 0 ? `${d}h ${pad(h)}j ${pad(m)}m` : `${pad(h)}j ${pad(m)}m`
}

/** Watch page URLs mirror the reference pattern: /{slug}-episode-{n}. */
export const watchPath = (slug: string, n: number) => `/${slug}-episode-${n}`
export const seriesPath = (slug: string) => `/series/${slug}`

export function parseWatchSlug(value: string | undefined): { slug: string; number: number } | null {
  const m = value?.match(/^(.+)-episode-(\d+)$/)
  if (!m) return null
  return { slug: m[1], number: Number(m[2]) }
}

export function toListQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '' && v !== 1) q.set(k, String(v))
  const s = q.toString()
  return s ? `?${s}` : ''
}

export const LETTERS = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

/** Smaller AniList cover variant (230px wide) for grids and lists; detail pages keep the large one. */
export const thumb = (url: string) => url.replace('/cover/large/', '/cover/medium/')
