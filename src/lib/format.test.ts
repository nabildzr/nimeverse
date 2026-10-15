import { describe, expect, it } from 'vitest'
import { countdown, formatLabel, parseWatchSlug, statusLabel, timeAgo, toListQuery, watchPath } from './format'

describe('watch slugs', () => {
  it('round-trips slug and episode number', () => {
    const path = watchPath('sousou-no-frieren', 12)
    expect(path).toBe('/sousou-no-frieren-episode-12')
    expect(parseWatchSlug(path.slice(1))).toEqual({ slug: 'sousou-no-frieren', number: 12 })
  })

  it('keeps "episode" inside the title slug', () => {
    expect(parseWatchSlug('the-episode-zero-episode-3')).toEqual({ slug: 'the-episode-zero', number: 3 })
  })

  it('rejects paths without an episode suffix', () => {
    expect(parseWatchSlug('random-page')).toBeNull()
    expect(parseWatchSlug(undefined)).toBeNull()
  })
})

describe('timeAgo', () => {
  const now = Date.parse('2026-10-15T12:00:00Z')
  it('formats past and future times in Indonesian', () => {
    expect(timeAgo('2026-10-15T09:00:00Z', now)).toBe('3 jam lalu')
    expect(timeAgo('2026-10-17T12:00:00Z', now)).toBe('dalam 2 hari')
    expect(timeAgo('2026-10-15T11:59:50Z', now)).toBe('baru saja')
    expect(timeAgo(null, now)).toBe('')
  })
})

describe('countdown', () => {
  const now = Date.parse('2026-10-15T12:00:00Z')
  it('shows days, hours and minutes', () => {
    expect(countdown('2026-10-17T15:05:00Z', now)).toBe('2h 03j 05m')
    expect(countdown('2026-10-15T13:30:00Z', now)).toBe('01j 30m')
    expect(countdown('2026-10-14T00:00:00Z', now)).toBe('00j 00m')
  })
})

describe('labels and queries', () => {
  it('maps provider enums to display labels', () => {
    expect(statusLabel('RELEASING')).toBe('Ongoing')
    expect(statusLabel(null)).toBe('-')
    expect(formatLabel('TV_SHORT')).toBe('TV Short')
    expect(formatLabel(null)).toBe('Anime')
  })

  it('drops empty values and page 1 from list queries', () => {
    expect(toListQuery({ genre: 'action', status: '', page: 1 })).toBe('?genre=action')
    expect(toListQuery({ page: 3 })).toBe('?page=3')
    expect(toListQuery({})).toBe('')
  })
})
