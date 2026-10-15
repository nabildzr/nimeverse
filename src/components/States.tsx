import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ApiError } from '../api/client'

export function PageLoader() {
  return (
    <div className="flex justify-center py-20" role="status" aria-label="Memuat">
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-control border-t-accent" />
    </div>
  )
}

export function ErrorView({ error, retry }: { error: unknown; retry?: () => void }) {
  const notFound = error instanceof ApiError && error.status === 404
  return (
    <div className="box px-5 py-12 text-center">
      <h1 className="mb-2 text-[19px] font-bold text-heading">{notFound ? '404 - Tidak ditemukan' : 'Gagal memuat data'}</h1>
      <p className="mb-5">
        {notFound
          ? 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.'
          : 'Server tidak dapat dihubungi. Pastikan backend berjalan, lalu coba lagi.'}
      </p>
      <div className="flex justify-center gap-2">
        {retry && !notFound && (
          <button onClick={retry} className="rounded-[3px] bg-accent px-4 py-2 text-[13px] font-medium text-white">
            Coba lagi
          </button>
        )}
        <Link to="/" className="rounded-[3px] bg-nav px-4 py-2 text-[13px] font-medium text-white">
          Ke beranda
        </Link>
      </div>
    </div>
  )
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-10 text-center text-muted">{children}</div>
}

/** Prev/next pager (reference: ".hpage") plus numbered pages when totalPages is known. */
export function Pagination({ page, totalPages, href }: { page: number; totalPages: number; href: (p: number) => string }) {
  if (totalPages <= 1) return null
  const pages: number[] = []
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.push(p)
  const btn = 'flex h-[29px] min-w-[29px] items-center justify-center gap-1 rounded-[2px] px-2.5 text-[13px] text-white'
  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 px-2.5 pb-2.5 pt-[15px]" aria-label="Halaman">
      {page > 1 && (
        <Link to={href(page - 1)} className={`${btn} bg-nav hover:bg-accent`}>
          <ChevronLeft className="h-3.5 w-3.5" /> Prev
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          to={href(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`${btn} ${p === page ? 'bg-accent' : 'bg-nav hover:bg-accent'}`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link to={href(page + 1)} className={`${btn} bg-nav hover:bg-accent`}>
          Next <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </nav>
  )
}
