import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Award, Bookmark, Coins, Crown, Flame, Gift, LogIn, LogOut, Settings, Store, Target, Trophy, User as UserIcon } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { Avatar, userFace, XpBar } from './Avatar'

/** Sign-in link for visitors, a dropdown with level, streak and shortcuts for members. */
export function UserMenu() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  if (loading) return <span className="h-8 w-8" aria-hidden="true" />
  if (!user) {
    return (
      <Link to="/masuk" className="flex h-[30px] items-center gap-1.5 rounded-[3px] bg-accent px-3 text-[13px] font-medium text-white hover:brightness-110">
        <LogIn className="h-4 w-4" aria-hidden="true" /> Masuk
      </Link>
    )
  }

  const item = 'flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-item'
  return (
    <div ref={wrap} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open} aria-label="Menu akun" className="flex items-center gap-2">
        <Avatar face={userFace(user)} size={32} />
        <span className="hidden text-[12px] font-semibold text-heading sm:block">Lv {user.level}</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-[40px] z-50 w-[250px] overflow-hidden rounded-[4px] bg-box shadow-xl ring-1 ring-black/40">
          <div className="border-b border-line p-3">
            <div className="mb-2 flex items-center gap-2">
              <Avatar face={userFace(user)} size={40} />
              <div className="min-w-0">
                <div className="flex items-center gap-1 truncate text-[14px] font-semibold text-heading">
                  {user.displayName} {user.premium && <Crown className="h-3.5 w-3.5 text-sub" aria-label="Premium" role="img" />}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-muted">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-[#ff6b3d]" aria-hidden="true" /> {user.streakCurrent} hari
                  </span>
                  <span className="flex items-center gap-1" title="Koin">
                    <Coins className="h-3.5 w-3.5 text-sub" aria-hidden="true" /> {user.coins.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
            <XpBar user={user} />
          </div>
          <Link role="menuitem" to={`/profil/${encodeURIComponent(user.displayName)}`} onClick={() => setOpen(false)} className={item}>
            <UserIcon className="h-4 w-4" aria-hidden="true" /> Profil saya
          </Link>
          <Link role="menuitem" to="/watchlist" onClick={() => setOpen(false)} className={item}>
            <Bookmark className="h-4 w-4" aria-hidden="true" /> Watchlist
          </Link>
          <Link role="menuitem" to="/misi" onClick={() => setOpen(false)} className={item}>
            <Target className="h-4 w-4" aria-hidden="true" /> Misi harian
          </Link>
          <Link role="menuitem" to="/toko" onClick={() => setOpen(false)} className={item}>
            <Store className="h-4 w-4" aria-hidden="true" /> Toko harian
          </Link>
          <Link role="menuitem" to="/gacha" onClick={() => setOpen(false)} className={item}>
            <Gift className="h-4 w-4" aria-hidden="true" /> Gacha
          </Link>
          <Link role="menuitem" to="/lencana" onClick={() => setOpen(false)} className={item}>
            <Award className="h-4 w-4" aria-hidden="true" /> Lencana
          </Link>
          <Link role="menuitem" to="/peringkat" onClick={() => setOpen(false)} className={item}>
            <Trophy className="h-4 w-4" aria-hidden="true" /> Peringkat
          </Link>
          <Link role="menuitem" to="/premium" onClick={() => setOpen(false)} className={item}>
            <Crown className="h-4 w-4 text-sub" aria-hidden="true" /> Premium
          </Link>
          <Link role="menuitem" to="/pengaturan" onClick={() => setOpen(false)} className={item}>
            <Settings className="h-4 w-4" aria-hidden="true" /> Pengaturan
          </Link>
          <button
            role="menuitem"
            onClick={async () => {
              setOpen(false)
              await logout()
              navigate('/')
            }}
            className={`${item} w-full border-t border-line text-left`}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
          </button>
        </div>
      )}
    </div>
  )
}
