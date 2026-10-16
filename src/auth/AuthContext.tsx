import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { accountApi } from '../api/client'
import type { Outcome, User } from '../api/accountTypes'
import { useToasts } from '../components/Toasts'
import { getBookmarks, clearBookmarks } from '../lib/history'
import { describeOutcome } from '../lib/xp'

interface AuthValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  /** Re-reads the signed-in user (after XP, avatar or settings changed). */
  refresh: () => Promise<void>
  /** Shows what an action earned and refreshes the XP bar. */
  announce: (outcome: Outcome | undefined | null) => void
}

const AuthContext = createContext<AuthValue | null>(null)

export const ME_KEY = ['auth', 'me'] as const

/** Anything cached for one user must go when they sign out or in as somebody else. */
const USER_KEYS = ['library', 'anime-state', 'continue', 'comments', 'badges', 'profile', 'leaderboard', 'posts', 'post', 'gacha', 'quests']

function checkinDay(): string {
  return new Date().toLocaleDateString('en-CA')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const client = useQueryClient()
  const toasts = useToasts()
  const { data, isLoading } = useQuery({
    queryKey: ME_KEY,
    queryFn: ({ signal }) => accountApi.whoAmI(signal),
    staleTime: 5 * 60_000,
    retry: false,
  })
  const user = data?.user ?? null

  const clearUserData = useCallback(() => {
    for (const key of USER_KEYS) client.removeQueries({ queryKey: [key] })
  }, [client])

  const refresh = useCallback(async () => {
    await client.invalidateQueries({ queryKey: ME_KEY })
  }, [client])

  const announce = useCallback(
    (outcome: Outcome | undefined | null) => {
      const specs = describeOutcome(outcome)
      if (specs.length > 0) toasts.push(specs)
      if (outcome && (outcome.gains.length > 0 || outcome.levelUp)) void client.invalidateQueries({ queryKey: ME_KEY })
    },
    [client, toasts],
  )

  // Bookmarks kept in the browser before signing in move into the account once, then the local copy is cleared.
  const syncBookmarks = useCallback(async () => {
    const slugs = getBookmarks()
    if (slugs.length === 0) return
    await Promise.allSettled(slugs.slice(0, 50).map((slug) => accountApi.setListEntry(slug, {})))
    clearBookmarks()
  }, [])

  const signedIn = useCallback(
    async (result: { user: User; outcome?: Outcome }) => {
      clearUserData()
      client.setQueryData(ME_KEY, { user: result.user })
      announce(result.outcome)
      void syncBookmarks()
    },
    [announce, clearUserData, client, syncBookmarks],
  )

  const login = useCallback(async (email: string, password: string) => signedIn(await accountApi.login(email, password)), [signedIn])
  const register = useCallback(
    async (email: string, password: string, displayName: string) => signedIn(await accountApi.register(email, password, displayName)),
    [signedIn],
  )
  const logout = useCallback(async () => {
    try {
      await accountApi.logout()
    } finally {
      client.setQueryData(ME_KEY, { user: null })
      clearUserData()
    }
  }, [client, clearUserData])

  // Opening the site counts as today's activity (streak and daily XP), once per day per browser.
  const checked = useRef<string | null>(null)
  useEffect(() => {
    if (!user) return
    const day = checkinDay()
    let stored: string | null = null
    try {
      stored = localStorage.getItem('nv-checkin')
    } catch {
      /* storage unavailable */
    }
    if (checked.current === day || stored === `${user.displayName}:${day}`) return
    checked.current = day
    accountApi
      .checkIn()
      .then(({ outcome }) => {
        announce(outcome)
        try {
          localStorage.setItem('nv-checkin', `${user.displayName}:${day}`)
        } catch {
          /* storage unavailable */
        }
      })
      .catch(() => {
        checked.current = null
      })
  }, [user, announce])

  const value = useMemo<AuthValue>(
    () => ({ user, loading: isLoading, login, register, logout, refresh, announce }),
    [user, isLoading, login, register, logout, refresh, announce],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
