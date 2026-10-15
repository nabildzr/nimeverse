import { describe, expect, it } from 'vitest'
import type { ScheduleRow } from '../api/types'
import { groupByDay } from './Schedule'

const row = (airingAt: string, episode = 1): ScheduleRow => ({
  episode,
  airingAt,
  anime: {
    id: episode,
    slug: `a-${episode}`,
    title: 'A',
    coverImage: '',
    coverColor: null,
    format: 'TV',
    status: 'RELEASING',
    score: null,
    studio: null,
    latestEpisode: null,
    genres: [],
    seasonYear: 2026,
    updatedAt: airingAt,
  },
})

describe('groupByDay', () => {
  it('buckets rows into consecutive local days and ignores out-of-range rows', () => {
    const from = new Date(2026, 9, 15) // local midnight
    const at = (d: number, h: number) => new Date(2026, 9, d, h).toISOString()
    const groups = groupByDay([row(at(15, 1), 1), row(at(15, 23), 2), row(at(16, 0), 3), row(at(25, 1), 4)], from, 3)

    expect(groups).toHaveLength(3)
    expect(groups[0].rows.map((r) => r.episode)).toEqual([1, 2])
    expect(groups[1].rows.map((r) => r.episode)).toEqual([3])
    expect(groups[2].rows).toEqual([])
  })
})
