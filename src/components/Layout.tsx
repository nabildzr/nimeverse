import { Suspense, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LETTERS } from '../lib/format'
import { Header } from './Header'
import { PageLoader } from './States'

function Footer() {
  return (
    <footer className="mt-[30px] bg-box text-[13px] leading-5">
      <div className="mx-auto max-w-[1220px] px-5 py-6 text-center">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className="font-semibold text-heading">A-Z LIST</span>
          <span className="text-muted">Searching order by alphabet name A to Z.</span>
        </div>
        <ul className="mb-5 flex flex-wrap justify-center gap-1.5">
          {LETTERS.map((l) => (
            <li key={l}>
              <Link
                to={`/az-list?show=${l}`}
                className="block min-w-[30px] rounded-[3px] bg-nav px-2 py-1 text-[12px] font-medium text-white hover:bg-accent"
              >
                {l === '0-9' ? '#' : l}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-2xl text-muted">
          Metadata, poster, dan jadwal tayang bersumber dari AniList. Situs ini tidak menyimpan file video di servernya; pemutar
          hanya menampilkan sumber yang didaftarkan admin atau tautan streaming resmi.
        </p>
        <p className="mt-2 text-muted">© {new Date().getFullYear()} AniVerse</p>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="mx-auto w-full max-w-[1220px] flex-1 px-3 pt-[15px] md:px-5">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

/** Main column + sidebar arrangement used by most pages. */
export function TwoColumn({ children, sidebar }: { children: React.ReactNode; sidebar: React.ReactNode }) {
  return (
    <div className="flex flex-col desk:flex-row">
      <div className="min-w-0 flex-1">{children}</div>
      {sidebar}
    </div>
  )
}
