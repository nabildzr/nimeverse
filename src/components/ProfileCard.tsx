import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import { accountApi } from '../api/client'
import type { Author, PublicProfile } from '../api/accountTypes'
import { titleName } from '../lib/titles'
import { authorFace, Avatar, RoleMark, userFace, XpBar } from './Avatar'
import { BadgeIcon } from './BadgeGrid'
import { AccessoryArt, FramedAvatar } from './Decor'

const CARD_W = 300

/** The profile as a card: skin behind, banner with its effect, framed avatar, title, level, a few badges. */
export function ProfileCardView({ profile }: { profile: PublicProfile }) {
  const earned = profile.badges.filter((b) => b.earned).slice(0, 6)
  const title = titleName(profile.title)
  return (
    <div className="relative overflow-hidden rounded-[8px] bg-box shadow-2xl ring-1 ring-black/40">
      <AccessoryArt slot="skin" code={profile.skin} cover className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <div className="relative h-[84px] w-full bg-gradient-to-br from-nav to-item" style={profile.accentColor ? { backgroundImage: `linear-gradient(135deg, ${profile.accentColor}66, transparent)` } : undefined}>
          {profile.hasBanner && <img src={`/api/users/${encodeURIComponent(profile.name)}/banner${profile.bannerVersion ? `?v=${profile.bannerVersion}` : ''}`} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <AccessoryArt slot="effect" code={profile.effect} cover className="absolute inset-0 h-full w-full" />
        </div>
        <div className="px-4 pb-4">
          <div className="-mt-9 mb-2 inline-block rounded-full bg-box p-1" style={{ marginBottom: profile.frame ? 12 : 8 }}>
            <FramedAvatar face={userFace(profile)} frame={profile.frame} size={64} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[17px] font-bold text-heading" style={profile.accentColor ? { color: profile.accentColor } : undefined}>
              {profile.name}
            </span>
            <RoleMark role={profile.role} premium={profile.premium} />
          </div>
          {title && <div className="text-[12px] font-medium text-sub">{title}</div>}
          {profile.bio && <p className="mt-2 line-clamp-3 whitespace-pre-wrap break-words text-[12.5px] leading-[1.5]">{profile.bio}</p>}
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[12px]">
              <span className="font-semibold text-heading">Level {profile.level}</span>
              <span className="flex items-center gap-1 text-muted">
                <Flame className="h-3.5 w-3.5 text-[#ff6b3d]" aria-hidden="true" /> {profile.streakCurrent} hari
              </span>
            </div>
            <XpBar user={profile} compact />
          </div>
          {earned.length > 0 && (
            <div className="mt-3 flex gap-1.5" aria-label="Lencana">
              {earned.map((b) => (
                <span key={b.code} title={b.name}>
                  <BadgeIcon badge={b} size={28} />
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[11px] text-muted">
            <span className="rounded-[3px] bg-item/80 py-1">
              <b className="block text-[13px] text-heading">{profile.stats.episodes}</b>Episode
            </span>
            <span className="rounded-[3px] bg-item/80 py-1">
              <b className="block text-[13px] text-heading">{profile.stats.comments}</b>Komentar
            </span>
            <span className="rounded-[3px] bg-item/80 py-1">
              <b className="block text-[13px] text-heading">{profile.stats.upvotes}</b>Upvote
            </span>
          </div>
          <Link to={`/profil/${encodeURIComponent(profile.name)}`} className="mt-3 block rounded-[3px] bg-accent py-1.5 text-center text-[13px] font-medium text-white hover:brightness-110">
            Lihat profil
          </Link>
        </div>
      </div>
    </div>
  )
}

/** Shown when the profile cannot be read (private or removed): only what the comment already revealed. */
function PrivateCard({ author }: { author: Author }) {
  return (
    <div className="rounded-[8px] bg-box p-4 shadow-2xl ring-1 ring-black/40">
      <div className="flex items-center gap-3">
        <Avatar face={authorFace(author)} size={48} />
        <div>
          <div className="font-bold text-heading">{author.name}</div>
          <div className="text-[12px] text-muted">Level {author.level}</div>
        </div>
      </div>
      <p className="mt-3 text-[12.5px] text-muted">Profil ini privat.</p>
    </div>
  )
}

function CardContent({ author }: { author: Author }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', author.name],
    queryFn: ({ signal }) => accountApi.profile(author.name, signal),
    staleTime: 60_000,
    retry: false,
  })
  if (data) return <ProfileCardView profile={data} />
  if (isLoading) {
    return (
      <div className="rounded-[8px] bg-box p-6 text-center text-[13px] text-muted shadow-2xl ring-1 ring-black/40" role="status">
        Memuat profil...
      </div>
    )
  }
  return isError ? <PrivateCard author={author} /> : null
}

/**
 * Wraps an avatar so a click opens the person's profile card next to it. The card is drawn in a portal and placed
 * from the avatar's position, so scrolling containers cannot clip it. Escape, a click outside or scrolling closes it.
 */
export function AuthorPopover({ author, children }: { author?: Author; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  const anchor = useRef<HTMLButtonElement>(null)
  const card = useRef<HTMLDivElement>(null)

  const place = useCallback(() => {
    const a = anchor.current?.getBoundingClientRect()
    if (!a) return
    const height = card.current?.offsetHeight ?? 380
    const left = Math.min(Math.max(8, a.left), window.innerWidth - CARD_W - 8)
    const below = a.bottom + 8
    let top = below
    if (below + height > window.innerHeight) {
      // Prefer opening upwards; when neither side has room, slide the card up so it is fully on screen.
      top = a.top - height - 8 >= 8 ? a.top - height - 8 : Math.max(8, window.innerHeight - height - 8)
    }
    setPos({ left, top })
  }, [])

  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const outside = (e: MouseEvent) => {
      const t = e.target as Node
      if (!card.current?.contains(t) && !anchor.current?.contains(t)) close()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('mousedown', outside)
    document.addEventListener('keydown', esc)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('mousedown', outside)
      document.removeEventListener('keydown', esc)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [open])

  // Re-measure once the card has its real height (profile loaded).
  useEffect(() => {
    if (!open || !card.current || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(place)
    ro.observe(card.current)
    return () => ro.disconnect()
  }, [open, place, pos === null])

  if (!author) return <>{children}</>
  return (
    <>
      <button ref={anchor} type="button" onClick={() => setOpen((v) => !v)} aria-haspopup="dialog" aria-expanded={open} aria-label={`Profil ${author.name}`} className="flex-none self-start rounded-full">
        {children}
      </button>
      {open &&
        createPortal(
          <div
            ref={card}
            role="dialog"
            aria-label={`Profil ${author.name}`}
            style={{ position: 'fixed', zIndex: 65, width: CARD_W, left: pos?.left ?? -9999, top: pos?.top ?? 0 }}
          >
            <CardContent author={author} />
          </div>,
          document.body,
        )}
    </>
  )
}
