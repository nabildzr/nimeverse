import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { accountApi } from '../api/client'
import { useAuth } from '../auth/AuthContext'

/** Embedded players do not tell us how long an episode is, so a typical TV episode length stands in for it. */
export const ASSUMED_EPISODE_SECONDS = 24 * 60
const NATIVE_EVERY_MS = 15_000
const IFRAME_EVERY_MS = 30_000

export type PlayerMode = 'native' | 'iframe' | 'none'

/**
 * Reports watching progress for the signed-in user. A native <video> reports its real position about every 15 s;
 * an embedded player reports elapsed time on the page every 30 s while the tab is visible. The server decides
 * whether the episode counts as finished and pays the XP; this hook only reports and shows the result.
 */
export function useProgress({ slug, episode, mode }: { slug: string; episode: number; mode: PlayerMode }) {
  const { user, announce } = useAuth()
  const client = useQueryClient()
  const signedIn = !!user
  const [completed, setCompleted] = useState(false)
  const lastSent = useRef(0)
  const finished = useRef(false)
  const lastKnown = useRef<{ position: number; duration: number } | null>(null)

  useEffect(() => {
    lastSent.current = 0
    finished.current = false
    lastKnown.current = null
    setCompleted(false)
  }, [slug, episode])

  const send = useCallback(
    async (position: number, duration: number): Promise<boolean> => {
      if (!signedIn || finished.current || duration < 30) return false
      try {
        const r = await accountApi.reportProgress(slug, episode, Math.floor(position), Math.floor(duration))
        if (r.completed) {
          finished.current = true
          setCompleted(true)
          announce(r.outcome)
          for (const key of ['anime-state', 'continue', 'library']) void client.invalidateQueries({ queryKey: [key] })
        }
        return r.completed
      } catch {
        return false
      }
    },
    [signedIn, slug, episode, announce, client],
  )

  /** Called by the native player on every time update. `force` skips the throttle (pause, end). */
  const onTime = useCallback(
    (position: number, duration: number, force = false) => {
      if (!Number.isFinite(duration) || duration < 30) return
      lastKnown.current = { position, duration }
      const now = Date.now()
      if (!force && now - lastSent.current < NATIVE_EVERY_MS) return
      lastSent.current = now
      void send(position, duration)
    },
    [send],
  )

  useEffect(() => {
    if (mode !== 'iframe' || !signedIn) return
    const startedAt = Date.now()
    const beat = () => {
      if (document.visibilityState !== 'visible') return
      const elapsed = (Date.now() - startedAt) / 1000
      void send(Math.min(elapsed, ASSUMED_EPISODE_SECONDS - 1), ASSUMED_EPISODE_SECONDS)
    }
    beat()
    const timer = window.setInterval(beat, IFRAME_EVERY_MS)
    return () => window.clearInterval(timer)
  }, [mode, signedIn, send])

  /** Manual "mark as watched". The server still checks that enough time has passed. */
  const markDone = useCallback(async (): Promise<boolean> => {
    if (mode === 'native') {
      const k = lastKnown.current
      return k ? send(k.duration, k.duration) : false
    }
    return send(ASSUMED_EPISODE_SECONDS, ASSUMED_EPISODE_SECONDS)
  }, [mode, send])

  return { onTime, markDone, completed, enabled: signedIn }
}
