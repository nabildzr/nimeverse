// Per-browser watch history and bookmarks (convenience only, never required to render).

export interface HistoryEntry {
  slug: string
  title: string
  coverImage: string
  episode: number
  at: number
}

const HISTORY_KEY = 'watch-history'
const BOOKMARK_KEY = 'bookmarks'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

export function getHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(HISTORY_KEY, [])
}

export function pushHistory(entry: Omit<HistoryEntry, 'at'>) {
  const list = getHistory().filter((h) => h.slug !== entry.slug)
  list.unshift({ ...entry, at: Date.now() })
  write(HISTORY_KEY, list.slice(0, 30))
}

export function lastWatched(slug: string): HistoryEntry | undefined {
  return getHistory().find((h) => h.slug === slug)
}

export function getBookmarks(): string[] {
  return read<string[]>(BOOKMARK_KEY, [])
}

export function toggleBookmark(slug: string): boolean {
  const list = getBookmarks()
  const has = list.includes(slug)
  write(BOOKMARK_KEY, has ? list.filter((s) => s !== slug) : [slug, ...list])
  return !has
}

export function clearBookmarks() {
  write(BOOKMARK_KEY, [])
}
