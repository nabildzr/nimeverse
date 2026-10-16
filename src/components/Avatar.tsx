import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Crown, Shield } from 'lucide-react'
import { avatarUrl } from '../api/client'
import type { Author, PublicProfile, User } from '../api/accountTypes'
import { levelProgress, xpToNext } from '../lib/xp'

type Face = { name: string; hasAvatar: boolean; avatarVersion?: number; accentColor?: string }

const FALLBACKS = ['#0d6fde', '#e64980', '#2f9e44', '#f08c00', '#7048e8', '#0c8599', '#d9480f', '#c2255c']

/** Stable colour for people without an accent colour, so the same name always looks the same. */
function colorFor(name: string): string {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)!) >>> 0
  return FALLBACKS[h % FALLBACKS.length]
}

export function Avatar({ face, size = 36, className = '' }: { face: Face; size?: number; className?: string }) {
  const [failed, setFailed] = useState(false)
  const color = face.accentColor || colorFor(face.name)
  const style = { width: size, height: size, borderColor: face.accentColor || undefined }
  if (face.hasAvatar && !failed) {
    return (
      <img
        src={avatarUrl(face.name, face.avatarVersion)}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        style={style}
        className={`flex-none rounded-full border-2 border-transparent bg-control object-cover ${className}`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...style, backgroundColor: color, fontSize: Math.round(size * 0.42) }}
      className={`flex flex-none items-center justify-center rounded-full border-2 border-transparent font-semibold text-white ${className}`}
    >
      {face.name.slice(0, 1).toUpperCase()}
    </span>
  )
}

export function authorFace(a: Author): Face {
  return { name: a.name, hasAvatar: a.hasAvatar, avatarVersion: a.avatarVersion, accentColor: a.accentColor }
}

export function userFace(u: User | PublicProfile): Face {
  return {
    name: 'displayName' in u ? u.displayName : u.name,
    hasAvatar: u.hasAvatar,
    avatarVersion: u.avatarVersion,
    accentColor: u.accentColor,
  }
}

export function RoleMark({ role, premium }: { role?: string; premium?: boolean }) {
  return (
    <>
      {premium && <Crown className="h-3.5 w-3.5 flex-none text-sub" aria-label="Premium" role="img" />}
      {(role === 'mod' || role === 'admin') && (
        <span title={role === 'admin' ? 'Admin' : 'Moderator'} className="flex flex-none items-center gap-0.5 rounded-[3px] bg-accent/20 px-1 text-[10px] font-semibold uppercase text-accent">
          <Shield className="h-3 w-3" aria-hidden="true" /> {role === 'admin' ? 'Admin' : 'Mod'}
        </span>
      )}
    </>
  )
}

/** Author name that links to the public profile, with level and status marks. A removed author shows as such. */
export function AuthorName({ author }: { author?: Author }) {
  if (!author) return <span className="italic text-muted">[dihapus]</span>
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Link to={`/profil/${encodeURIComponent(author.name)}`} className="truncate font-semibold text-heading hover:text-accent" style={author.accentColor ? { color: author.accentColor } : undefined}>
        {author.name}
      </Link>
      <RoleMark role={author.role} premium={author.premium} />
      <span className="flex-none rounded-[3px] bg-item px-1 text-[10.5px] text-muted">Lv {author.level}</span>
    </span>
  )
}

export function XpBar({ user, compact = false }: { user: Pick<User, 'xp' | 'levelXp' | 'nextLevelXp' | 'level'>; compact?: boolean }) {
  const pct = Math.round(levelProgress(user) * 100)
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-control" role="progressbar" aria-label="Progres level" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${pct}%` }} />
      </div>
      {!compact && (
        <div className="mt-1 flex justify-between text-[11.5px] text-muted">
          <span>{user.xp.toLocaleString('id-ID')} XP</span>
          <span>{xpToNext(user).toLocaleString('id-ID')} XP lagi ke level {user.level + 1}</span>
        </div>
      )}
    </div>
  )
}
