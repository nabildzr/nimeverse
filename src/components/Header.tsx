import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { api } from '../api/client'
import { seriesPath, statusLabel, thumb } from '../lib/format'
import { useTheme } from '../lib/theme'
import { useDebounced } from '../lib/useDebounced'
import { Logo } from './Logo'

const MENU = [
  { to: '/', label: 'Home', end: true },
  { to: '/anime', label: 'Anime List' },
  { to: '/az-list', label: 'AZ List' },
  { to: '/jadwal', label: 'Jadwal Rilis' },
  { to: '/genres', label: 'Genres' },
]

function LiveSearch({ onDone, autoFocus }: { onDone?: () => void; autoFocus?: boolean }) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const term = useDebounced(value.trim(), 250)
  const wrap = useRef<HTMLFormElement>(null)

  const { data, isFetching } = useQuery({
    queryKey: ['suggest', term],
    queryFn: ({ signal }) => api.suggest(term, signal),
    enabled: term.length >= 2,
    staleTime: 60_000,
  })

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    setOpen(false)
    onDone?.()
    navigate(`/search?s=${encodeURIComponent(value.trim())}`)
  }

  const items = term.length >= 2 ? (data?.items ?? []) : []

  return (
    <form ref={wrap} onSubmit={submit} role="search" className="relative w-full">
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        aria-label="Cari anime"
        className="h-[34px] w-full rounded-[3px] border border-input-border bg-input py-1.5 pl-3 pr-9 text-[14px] font-light text-heading outline-none placeholder:text-text focus:border-accent [&::-webkit-search-cancel-button]:hidden"
      />
      <button type="submit" aria-label="Cari" className="absolute right-0 top-0 flex h-[34px] w-9 items-center justify-center text-heading">
        <Search className="h-4 w-4" strokeWidth={2.6} />
      </button>
      {open && term.length >= 2 && (
        <div className="absolute left-0 right-0 top-[38px] z-50 overflow-hidden rounded-[3px] bg-box shadow-xl ring-1 ring-black/40">
          {items.map((a) => (
            <Link
              key={a.id}
              to={seriesPath(a.slug)}
              onClick={() => {
                setOpen(false)
                setValue('')
                onDone?.()
              }}
              className="flex gap-3 border-b border-line px-3 py-2 hover:bg-item"
            >
              <img src={thumb(a.coverImage)} alt="" loading="lazy" className="h-[58px] w-[42px] flex-none object-cover" />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-heading">{a.title}</div>
                <div className="text-[11.5px] text-muted">
                  {statusLabel(a.status)} · {a.genres.slice(0, 3).map((g) => g.name).join(', ')}
                </div>
              </div>
            </Link>
          ))}
          {!isFetching && items.length === 0 && <div className="px-3 py-3 text-[13px]">Tidak ditemukan.</div>}
          {items.length > 0 && (
            <button type="submit" className="block w-full bg-nav py-2 text-center text-[12.5px] font-medium text-white hover:bg-accent">
              Lihat semua hasil
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export function Header() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header>
      <div className="bg-header">
        <div className="mx-auto flex h-[60px] max-w-[1220px] items-center px-4 md:px-5">
          <button
            className="mr-3 text-heading md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="mr-[30px] flex-none" aria-label="AniVerse beranda">
            <Logo />
          </Link>
          <div className="hidden w-[350px] md:block">
            <LiveSearch />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="text-heading md:hidden" aria-label="Cari" onClick={() => setSearchOpen((v) => !v)}>
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
              className={`relative h-[25px] w-[45px] rounded-full transition-colors ${theme === 'dark' ? 'bg-[#333]' : 'bg-accent'}`}
            >
              <span
                className={`absolute top-[3px] flex h-[19px] w-[19px] items-center justify-center rounded-full bg-white text-[#333] transition-all ${theme === 'dark' ? 'left-[23px]' : 'left-[3px]'}`}
              >
                {theme === 'dark' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
              </span>
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="px-4 pb-3 md:hidden">
            <LiveSearch autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        )}
      </div>
      <nav className={`bg-nav ${menuOpen ? 'block' : 'hidden'} md:block`} aria-label="Menu utama">
        <ul className="mx-auto flex max-w-[1220px] flex-col px-2 md:flex-row md:px-5">
          {MENU.map((m) => (
            <li key={m.to}>
              <NavLink
                to={m.to}
                end={m.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-[10px] text-[14px] font-medium leading-[42px] text-white hover:bg-black/20 ${isActive ? 'bg-black/20' : ''}`
                }
              >
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
