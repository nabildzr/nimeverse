import type { Outcome, User } from '../api/accountTypes'

export const GAIN_LABELS: Record<string, string> = {
  watch: 'Menyelesaikan episode',
  first_episode: 'Mulai serial baru',
  checkin: 'Check-in harian',
  streak_bonus: 'Bonus streak',
  comment: 'Komentar',
  post: 'Postingan',
  upvote: 'Upvote diterima',
  badge: 'Lencana baru',
}

export interface ToastSpec {
  tone: 'xp' | 'level' | 'badge' | 'streak'
  title: string
  text?: string
}

/** Turns what an action earned into the toasts shown to the user. Several gains collapse into one XP toast. */
export function describeOutcome(outcome: Outcome | undefined | null): ToastSpec[] {
  if (!outcome) return []
  const specs: ToastSpec[] = []
  const gains = (outcome.gains ?? []).filter((g) => g.xp > 0)
  const total = gains.reduce((sum, g) => sum + g.xp, 0)
  if (total > 0) {
    // The badge bonus is announced by the badge toast, so it is left out of the list but kept in the total.
    const parts = gains.filter((g) => g.kind !== 'badge').map((g) => `${GAIN_LABELS[g.kind] ?? g.kind} +${g.xp}`)
    specs.push({ tone: 'xp', title: `+${total} XP`, text: parts.join(' · ') || undefined })
  }
  if (outcome.coins > 0 && total > 0) specs[0].text = [specs[0].text, `+${outcome.coins} Koin`].filter(Boolean).join(' · ')
  if (outcome.streakIncreased && outcome.streak > 1) {
    specs.push({
      tone: 'streak',
      title: `Streak ${outcome.streak} hari`,
      text: outcome.streakFreezeUsed ? 'Satu perlindungan streak terpakai untuk hari yang terlewat.' : undefined,
    })
  }
  if (outcome.levelUp) specs.push({ tone: 'level', title: `Naik ke level ${outcome.level}!` })
  for (const badge of outcome.newBadges ?? []) specs.push({ tone: 'badge', title: `Lencana: ${badge.name}` })
  return specs
}

/** Share of the way from this level to the next, from 0 to 1. */
export function levelProgress(user: Pick<User, 'xp' | 'levelXp' | 'nextLevelXp'>): number {
  const span = user.nextLevelXp - user.levelXp
  if (span <= 0) return 0
  return Math.min(1, Math.max(0, (user.xp - user.levelXp) / span))
}

/** XP still needed for the next level. */
export function xpToNext(user: Pick<User, 'xp' | 'nextLevelXp'>): number {
  return Math.max(0, user.nextLevelXp - user.xp)
}
