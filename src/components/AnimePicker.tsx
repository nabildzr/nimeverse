import { useEffect, useId, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { api } from '../api/client'
import { thumb } from '../lib/format'
import { useDebounced } from '../lib/useDebounced'

export interface PickedAnime {
  slug: string
  title: string
}

/**
 * Search box with a dropdown of matching anime. Choosing one fills a chip, so nobody has to know a slug.
 * Keyboard: arrows move through the results, Enter picks, Escape closes.
 */
export function AnimePicker({ value, onChange }: { value: PickedAnime | null; onChange: (a: PickedAnime | null) => void }) {
  const listId = useId()
  const wrap = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const term = useDebounced(text.trim(), 250)

  const { data, isFetching } = useQuery({
    queryKey: ['suggest', term],
    queryFn: ({ signal }) => api.suggest(term, signal),
    enabled: term.length >= 2 && !value,
    staleTime: 60_000,
  })
  const items = term.length >= 2 ? (data?.items ?? []) : []

  useEffect(() => setActive(0), [term])
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const choose = (slug: string, title: string) => {
    onChange({ slug, title })
    setText('')
    setOpen(false)
  }

  if (value) {
    return (
      <div className="flex items-center gap-2 rounded-[3px] border border-input-border bg-input px-3 py-1.5 text-[13px]">
        <span className="text-muted">Anime:</span>
        <span className="min-w-0 flex-1 truncate font-medium text-heading">{value.title}</span>
        <button type="button" onClick={() => onChange(null)} aria-label="Lepas anime" className="text-muted hover:text-[#e5484d]">
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div ref={wrap} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          role="combobox"
          aria-expanded={open && term.length >= 2}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Cari anime terkait"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((i) => Math.min(i + 1, items.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((i) => Math.max(i - 1, 0))
            } else if (e.key === 'Enter' && open && items[active]) {
              e.preventDefault()
              choose(items[active].slug, items[active].title)
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
          placeholder="Cari anime terkait (opsional)"
          className="h-9 w-full rounded-[3px] border border-input-border bg-input pl-9 pr-3 text-[13px] text-heading outline-none focus:border-accent"
        />
      </div>
      {open && term.length >= 2 && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-[40px] z-30 max-h-[300px] overflow-y-auto rounded-[3px] bg-box shadow-xl ring-1 ring-black/40">
          {items.map((a, i) => (
            <li key={a.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(a.slug, a.title)}
                className={`flex w-full gap-3 border-b border-line px-3 py-2 text-left ${i === active ? 'bg-item' : ''}`}
              >
                <img src={thumb(a.coverImage)} alt="" loading="lazy" className="h-[48px] w-[34px] flex-none object-cover" />
                <span className="min-w-0 truncate text-[13px] font-medium text-heading">{a.title}</span>
              </button>
            </li>
          ))}
          {!isFetching && items.length === 0 && <li className="px-3 py-3 text-[13px] text-muted">Tidak ditemukan.</li>}
          {isFetching && items.length === 0 && <li className="px-3 py-3 text-[13px] text-muted">Mencari...</li>}
        </ul>
      )}
    </div>
  )
}
