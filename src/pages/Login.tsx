import { useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { accountApi, ApiError } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { useTitle } from '../lib/useTitle'

const GOOGLE_ERRORS: Record<string, string> = {
  dibatalkan: 'Login dengan Google dibatalkan.',
  email: 'Email ini sudah terdaftar dengan password. Masuk dengan password.',
  ditangguhkan: 'Akun ini ditangguhkan.',
  google: 'Login dengan Google gagal. Coba lagi.',
}

/** Only same-site paths are followed after sign-in; anything else goes home. */
function safeNext(value: string | null): string {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/'
}

export default function Login() {
  useTitle('Masuk')
  const { user, login, register } = useAuth()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const [mode, setMode] = useState<'login' | 'register'>(params.get('daftar') ? 'register' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  // Where to go once the session exists. Signing up lands on the profile setup page.
  const after = useRef<string | null>(null)
  const [error, setError] = useState(GOOGLE_ERRORS[params.get('error') ?? ''] ?? '')
  const providers = useQuery({ queryKey: ['auth', 'providers'], queryFn: () => accountApi.providers(), staleTime: Infinity })

  if (user) return <Navigate to={after.current ?? next} replace />

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (mode === 'login') await login(email.trim(), password)
      else {
        after.current = '/pengaturan?baru=1'
        await register(email.trim(), password, name.trim())
      }
    } catch (err) {
      after.current = null
      setError(err instanceof ApiError ? err.message : 'Tidak dapat terhubung ke server.')
    } finally {
      setBusy(false)
    }
  }

  const field = 'h-10 w-full rounded-[3px] border border-input-border bg-input px-3 text-[14px] text-heading outline-none focus:border-accent'
  return (
    <div className="mx-auto max-w-[420px]">
      <Box title={mode === 'login' ? 'Masuk ke AniVerse' : 'Buat akun AniVerse'} as="h1">
        <div className="p-[18px]">
          <div className="mb-4 grid grid-cols-2 rounded-[4px] bg-item p-1 text-[13.5px]" role="tablist">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m)
                  setError('')
                }}
                className={`rounded-[3px] py-1.5 font-medium ${mode === m ? 'bg-accent text-white' : 'text-muted hover:text-heading'}`}
              >
                {m === 'login' ? 'Masuk' : 'Daftar'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'register' && (
              <label className="block text-[13px]">
                Nama tampilan
                <input value={name} onChange={(e) => setName(e.target.value)} required minLength={3} maxLength={24} autoComplete="nickname" className={`${field} mt-1`} />
                <span className="mt-1 block text-[11.5px] text-muted">3-24 karakter: huruf, angka, titik, strip, garis bawah. Dilihat publik.</span>
              </label>
            )}
            <label className="block text-[13px]">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={`${field} mt-1`} />
            </label>
            <label className="block text-[13px]">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === 'register' ? 8 : undefined}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className={`${field} mt-1`}
              />
              {mode === 'register' && <span className="mt-1 block text-[11.5px] text-muted">Minimal 8 karakter.</span>}
            </label>
            {error && (
              <p role="alert" className="rounded-[3px] bg-[#e5484d]/15 px-3 py-2 text-[13px] text-[#e5484d]">
                {error}
              </p>
            )}
            <button disabled={busy} className="h-10 rounded-[3px] bg-accent text-[14px] font-semibold text-white hover:brightness-110 disabled:opacity-60">
              {busy ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          </form>

          {providers.data?.google && (
            <>
              <div className="my-4 flex items-center gap-3 text-[12px] text-muted">
                <span className="h-px flex-1 bg-line" /> atau <span className="h-px flex-1 bg-line" />
              </div>
              {/* A full navigation: the OAuth flow leaves the site and returns through the callback. */}
              <a
                href="/api/auth/google/start"
                className="flex h-10 items-center justify-center gap-2 rounded-[3px] border border-line bg-item text-[14px] font-medium text-heading hover:border-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.8-2.1-6.8-5H1.2v3.1A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.2 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4-3.1z" />
                  <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.7 1.8l3.5-3.5A12 12 0 0 0 1.2 6.6l4 3.1c1-2.9 3.6-4.9 6.8-4.9z" />
                </svg>
                Lanjut dengan Google
              </a>
            </>
          )}

          <p className="mt-4 text-[12px] leading-5 text-muted">
            Dengan mendaftar, kamu mendapat XP, streak, lencana, watchlist, dan bisa ikut komunitas.{' '}
            <Link to="/" className="text-accent hover:underline">
              Kembali ke beranda
            </Link>
          </p>
        </div>
      </Box>
    </div>
  )
}
