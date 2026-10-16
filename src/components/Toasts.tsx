import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { Award, Flame, Sparkles, Star, X } from 'lucide-react'
import type { ToastSpec } from '../lib/xp'

interface Toast extends ToastSpec {
  id: number
}

interface ToastApi {
  push: (specs: ToastSpec | ToastSpec[]) => void
}

const ToastContext = createContext<ToastApi>({ push: () => {} })

export const useToasts = () => useContext(ToastContext)

const ICONS = { xp: Sparkles, level: Star, badge: Award, streak: Flame } as const
const COLORS = { xp: 'text-accent', level: 'text-sub', badge: 'text-[#2ecc71]', streak: 'text-[#ff6b3d]' } as const

/** Short-lived messages for XP, level-ups, badges and streaks. They never steal focus and read out politely. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const next = useRef(1)

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const push = useCallback(
    (input: ToastSpec | ToastSpec[]) => {
      const specs = Array.isArray(input) ? input : [input]
      if (specs.length === 0) return
      const added = specs.map((s) => ({ ...s, id: next.current++ }))
      setToasts((list) => [...list, ...added].slice(-5))
      for (const t of added) window.setTimeout(() => dismiss(t.id), t.tone === 'xp' ? 4000 : 6000)
    },
    [dismiss],
  )

  const api = useMemo(() => ({ push }), [push])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed right-3 bottom-3 z-[60] flex w-[min(92vw,340px)] flex-col gap-2" role="status" aria-live="polite">
        {toasts.map((t) => {
          const Icon = ICONS[t.tone]
          return (
            <div key={t.id} className="pointer-events-auto flex gap-3 rounded-[5px] border border-line bg-box p-3 shadow-lg">
              <Icon className={`mt-0.5 h-5 w-5 flex-none ${COLORS[t.tone]}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-heading">{t.title}</div>
                {t.text && <div className="text-[12.5px] text-muted">{t.text}</div>}
              </div>
              <button onClick={() => dismiss(t.id)} aria-label="Tutup" className="flex-none text-muted hover:text-heading">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
