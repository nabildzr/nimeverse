import { useEffect, useRef } from 'react'
import type { AnimationItem } from 'lottie-web'
import type { AccessorySlot } from '../api/accountTypes'
import { Avatar } from './Avatar'
import { CharacterRingEffect } from './CharacterRingEffect'

type Face = Parameters<typeof Avatar>[0]['face']

const STORAGE_BASE = import.meta.env.VITE_STORAGE_URL ? import.meta.env.VITE_STORAGE_URL.replace(/\/$/, '') : ''

// Each animation is its own small chunk, loaded only when somebody wears or previews it.
const LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  'frame:neon': () => import('../assets/lottie/frame-neon.json'),
  'frame:stars': () => import('../assets/lottie/frame-stars.json'),
  'frame:sakura': () => import('../assets/lottie/frame-sakura.json'),
  'frame:flame': () => import('../assets/lottie/frame-flame.json'),
  'frame:halo': () => import('../assets/lottie/frame-halo.json'),
  'frame:rainbow': () => import('../assets/lottie/frame-rainbow.json'),
  'effect:petals': () => import('../assets/lottie/effect-petals.json'),
  'effect:twinkle': () => import('../assets/lottie/effect-twinkle.json'),
  'effect:embers': () => import('../assets/lottie/effect-embers.json'),
  'effect:aurora': () => import('../assets/lottie/effect-aurora.json'),
  'frame:pulse': () => import('../assets/lottie/frame-pulse.json'),
  'frame:lightning': () => import('../assets/lottie/frame-lightning.json'),
  'frame:galaxy': () => import('../assets/lottie/frame-galaxy.json'),
  'effect:snow': () => import('../assets/lottie/effect-snow.json'),
  'effect:fireflies': () => import('../assets/lottie/effect-fireflies.json'),
  'effect:meteor': () => import('../assets/lottie/effect-meteor.json'),
  'skin:holo': () => import('../assets/lottie/skin-holo.json'),
  'skin:waves': () => import('../assets/lottie/skin-waves.json'),
  'skin:cyber': () => import('../assets/lottie/skin-cyber.json'),
  'skin:nebula': () => import('../assets/lottie/skin-nebula.json'),
}

const prefersReducedMotion = () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Plays one accessory animation. It only runs while on screen, and holds a still frame when the visitor asks the
 * system for reduced motion. Unknown codes render nothing, so a newer server never breaks an older page.
 */
export function AccessoryArt({ slot, code, className = '', cover = false }: { slot: AccessorySlot; code?: string; className?: string; cover?: boolean }) {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = code ? LOADERS[`${slot}:${code}`] : undefined
    const el = box.current
    if (!load || !el) return
    let anim: AnimationItem | undefined
    let observer: IntersectionObserver | undefined
    let cancelled = false
    const reduced = prefersReducedMotion()

    Promise.all([import('lottie-web/build/player/lottie_light'), load()])
      .then(([lottie, data]) => {
        if (cancelled) return
        anim = lottie.default.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData: structuredClone((data as { default: object }).default),
          rendererSettings: { preserveAspectRatio: cover ? 'xMidYMid slice' : 'xMidYMid meet', progressiveLoad: true },
        })
        if (reduced) {
          anim.goToAndStop(20, true)
          return
        }
        if (typeof IntersectionObserver === 'undefined') {
          anim.play()
          return
        }
        observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? anim?.play() : anim?.pause()))
        observer.observe(el)
      })
      .catch(() => {
        /* decoration only: a failed chunk just means no animation */
      })

    return () => {
      cancelled = true
      observer?.disconnect()
      anim?.destroy()
    }
  }, [slot, code, cover])

  if (!code) return null
  if (slot === 'frame' && code === 'chibi') {
    return (
      <div aria-hidden="true" className={`pointer-events-none ${className}`}>
        <img
          src={`${STORAGE_BASE}/frames/frame-chibi.png`}
          alt=""
          className="h-full w-full object-contain animate-chibi-bounce"
        />
      </div>
    )
  }
  if (slot === 'frame' && code.startsWith('frame-')) {
    return (
      <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CharacterRingEffect code={code} />
        </div>
        <img
          src={`${STORAGE_BASE}/frames/${code}.png?v=5`}
          alt=""
          className="relative z-10 h-full w-full object-contain animate-chibi-bounce"
        />
      </div>
    )
  }
  return <div ref={box} aria-hidden="true" className={`pointer-events-none ${className}`} />
}

/** The avatar with its animated frame. The frame overflows the avatar box by design (it is drawn around it). */
export function FramedAvatar({ face, frame, size }: { face: Face; frame?: string; size: number }) {
  const spread = size * 0.28125 // frame art is 200px wide with the avatar taking the middle 128px
  return (
    <span className="relative inline-block flex-none" style={{ width: size, height: size }}>
      <Avatar face={face} size={size} />
      {frame && (
        <span aria-hidden="true" className="pointer-events-none absolute" style={{ left: -spread, top: -spread, width: size + spread * 2, height: size + spread * 2 }}>
          <AccessoryArt slot="frame" code={frame} className="h-full w-full" />
        </span>
      )}
    </span>
  )
}
