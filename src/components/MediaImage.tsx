import { useEffect, useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { accountApi, ApiError, mediaUrl } from '../api/client'
import type { MediaRef } from '../api/accountTypes'

const MAX_UPLOAD = 3 * 1024 * 1024

/** A picture inside a comment or post. Click to see it large. */
export function MediaImage({ image, alt = 'Gambar dari anggota' }: { image: MediaRef; alt?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Perbesar gambar" className="mt-1.5 block max-w-full overflow-hidden rounded-[4px] bg-item">
        <img
          src={mediaUrl(image.id)}
          alt={alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
          className="max-h-[320px] max-w-full object-contain"
        />
      </button>
      {open && (
        <div role="dialog" aria-label="Gambar" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(false)}>
          <button type="button" aria-label="Tutup" className="absolute right-4 top-4 text-white" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
          <img src={mediaUrl(image.id)} alt={alt} className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </>
  )
}

/**
 * Picks a picture and uploads it right away. The returned id goes with the next comment or post; the server drops
 * uploads nobody uses after an hour.
 */
export function ImagePicker({ value, onChange, disabled }: { value: MediaRef | null; onChange: (m: MediaRef | null) => void; disabled?: boolean }) {
  const input = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!value) setPreview('')
  }, [value])
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview)
    },
    [preview],
  )

  const pick = async (file: File | undefined) => {
    if (!file) return
    setError('')
    if (file.size > MAX_UPLOAD) return setError('Ukuran gambar maksimal 3 MB.')
    setBusy(true)
    try {
      const r = await accountApi.uploadImage(file)
      setPreview(URL.createObjectURL(file))
      onChange(r.media)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Gambar gagal diunggah.')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input ref={input} type="file" accept="image/png,image/jpeg,image/gif" className="hidden" aria-label="Pilih gambar" onChange={(e) => void pick(e.target.files?.[0])} />
      {value ? (
        <span className="flex items-center gap-2 rounded-[3px] bg-item p-1 pr-2 text-[12px]">
          {preview && <img src={preview} alt="Pratinjau" className="h-9 w-9 rounded-[2px] object-cover" />}
          <span className="text-muted">Gambar terlampir</span>
          <button type="button" onClick={() => onChange(null)} aria-label="Lepas gambar" className="text-muted hover:text-[#e5484d]">
            <X className="h-4 w-4" />
          </button>
        </span>
      ) : (
        <button
          type="button"
          disabled={busy || disabled}
          onClick={() => input.current?.click()}
          className="flex h-[30px] items-center gap-1.5 rounded-[3px] bg-item px-2.5 text-[12.5px] text-muted hover:text-heading disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4" aria-hidden="true" /> {busy ? 'Mengunggah...' : 'Gambar'}
        </button>
      )}
      {error && (
        <span role="alert" className="text-[12px] text-[#e5484d]">
          {error}
        </span>
      )}
    </div>
  )
}
