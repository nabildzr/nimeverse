import { describe, expect, it } from 'vitest'
import type { Outcome } from '../api/accountTypes'
import { describeOutcome, levelProgress, xpToNext } from './xp'

const base: Outcome = { gains: [], xp: 0, level: 1, levelUp: false, newBadges: [], streak: 0, streakIncreased: false, streakFreezeUsed: false, coins: 0 }

describe('describeOutcome', () => {
  it('says nothing when nothing was earned', () => {
    expect(describeOutcome(base)).toEqual([])
    expect(describeOutcome(null)).toEqual([])
  })

  it('folds several gains into one XP toast and keeps the badge bonus out of the list', () => {
    const specs = describeOutcome({
      ...base,
      gains: [
        { kind: 'watch', xp: 20 },
        { kind: 'first_episode', xp: 10 },
        { kind: 'badge', xp: 25 },
      ],
    })
    expect(specs).toHaveLength(1)
    expect(specs[0].title).toBe('+55 XP')
    expect(specs[0].text).toContain('Menyelesaikan episode +20')
    expect(specs[0].text).not.toContain('Lencana')
  })

  it('announces streaks above one day, level-ups and badges', () => {
    const specs = describeOutcome({
      ...base,
      level: 3,
      levelUp: true,
      streak: 4,
      streakIncreased: true,
      newBadges: [{ code: 'streak_3', name: 'Mulai Rutin', icon: 'flame', tier: 'bronze' }],
    })
    expect(specs.map((s) => s.tone)).toEqual(['streak', 'level', 'badge'])
    expect(specs[0].title).toBe('Streak 4 hari')
    expect(specs[1].title).toBe('Naik ke level 3!')
  })

  it('adds the coins earned to the XP toast', () => {
    const specs = describeOutcome({ ...base, gains: [{ kind: 'watch', xp: 20 }], coins: 20 })
    expect(specs[0].text).toContain('+20 Koin')
  })

  it('does not announce a streak of one day', () => {
    expect(describeOutcome({ ...base, streak: 1, streakIncreased: true })).toEqual([])
  })
})

describe('level progress', () => {
  const user = { xp: 150, levelXp: 100, nextLevelXp: 200 }
  it('is the share between this level and the next', () => {
    expect(levelProgress(user)).toBe(0.5)
    expect(xpToNext(user)).toBe(50)
  })
  it('stays within 0 and 1 and survives an empty span', () => {
    expect(levelProgress({ xp: 500, levelXp: 100, nextLevelXp: 200 })).toBe(1)
    expect(levelProgress({ xp: 0, levelXp: 100, nextLevelXp: 200 })).toBe(0)
    expect(levelProgress({ xp: 5, levelXp: 5, nextLevelXp: 5 })).toBe(0)
  })
})
