import { Award, Bookmark, CheckCircle, Clock, Compass, Crown, Flame, Heart, Layers, MessageCircle, MessagesSquare, PenLine, Play, Star, ThumbsUp, Trophy, Tv, Zap, type LucideIcon } from 'lucide-react'
import type { Badge } from '../api/accountTypes'

// Names match the icon field of the backend badge catalogue.
const ICONS: Record<string, LucideIcon> = {
  play: Play,
  tv: Tv,
  trophy: Trophy,
  zap: Zap,
  compass: Compass,
  layers: Layers,
  clock: Clock,
  flame: Flame,
  crown: Crown,
  star: Star,
  'message-circle': MessageCircle,
  'messages-square': MessagesSquare,
  'pen-line': PenLine,
  'thumbs-up': ThumbsUp,
  heart: Heart,
  bookmark: Bookmark,
  'check-circle': CheckCircle,
}

const TIER: Record<Badge['tier'], string> = {
  bronze: '#cd7f32',
  silver: '#b0bec5',
  gold: '#ffc107',
  special: '#b388ff',
}

export function BadgeIcon({ badge, size = 40 }: { badge: Pick<Badge, 'icon' | 'tier'>; size?: number }) {
  const Icon = ICONS[badge.icon] ?? Award
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, color: TIER[badge.tier], borderColor: TIER[badge.tier] }}
      className="flex flex-none items-center justify-center rounded-full border-2 bg-item"
    >
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  )
}

/** Earned badges are bright; locked ones are dimmed and show how far along the member is. */
export function BadgeGrid({ badges, showProgress = true }: { badges: Badge[]; showProgress?: boolean }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 p-[15px] sm:grid-cols-2">
      {badges.map((b) => {
        const pct = b.goal > 0 ? Math.min(100, Math.round((b.progress / b.goal) * 100)) : 0
        return (
          <li key={b.code} className={`flex gap-3 rounded-[4px] bg-item p-3 ${b.earned ? '' : 'opacity-60'}`}>
            <BadgeIcon badge={b} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-heading">
                {b.name}
                {b.earned && <span className="rounded-[3px] bg-[#2ecc71]/20 px-1.5 text-[10.5px] font-medium text-[#2ecc71]">Didapat</span>}
              </div>
              <div className="text-[12.5px] text-muted">{b.description}</div>
              {showProgress && !b.earned && b.goal > 1 && (
                <div className="mt-1.5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-control" role="progressbar" aria-label={`Progres ${b.name}`} aria-valuemin={0} aria-valuemax={b.goal} aria-valuenow={Math.min(b.progress, b.goal)}>
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">
                    {Math.min(b.progress, b.goal)} / {b.goal}
                  </div>
                </div>
              )}
              {b.earned && b.earnedAt && <div className="mt-0.5 text-[11px] text-muted">{new Date(b.earnedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
