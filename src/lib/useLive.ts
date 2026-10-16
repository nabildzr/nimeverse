import { useEffect, useRef } from 'react'
import type { LiveEvent } from '../api/accountTypes'

/**
 * Follows the server's live stream for a page. Events arrive as they happen; when the connection comes back after
 * a gap (network drop, sleeping tab) `onResync` runs so the page can refetch what it missed. The stream is closed
 * while the tab is hidden, so background tabs cost the server nothing.
 */
export function useLive(url: string | null, onEvent: (ev: LiveEvent) => void, onResync?: () => void) {
  const handler = useRef(onEvent)
  const resync = useRef(onResync)
  handler.current = onEvent
  resync.current = onResync

  useEffect(() => {
    if (!url || typeof EventSource === 'undefined') return
    let source: EventSource | null = null
    let opened = false
    let dead = false

    const open = () => {
      if (dead || source) return
      source = new EventSource(url, { withCredentials: true })
      source.onopen = () => {
        if (opened) resync.current?.()
        opened = true
      }
      source.onmessage = (e) => {
        try {
          handler.current(JSON.parse(e.data) as LiveEvent)
        } catch {
          /* a malformed frame is ignored */
        }
      }
      // EventSource reconnects by itself after errors; nothing to do here.
    }
    const close = () => {
      source?.close()
      source = null
    }
    const visibility = () => (document.hidden ? close() : open())

    open()
    document.addEventListener('visibilitychange', visibility)
    return () => {
      dead = true
      document.removeEventListener('visibilitychange', visibility)
      close()
    }
  }, [url])
}
