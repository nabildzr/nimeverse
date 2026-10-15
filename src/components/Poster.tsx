import { useState } from 'react'

interface PosterProps {
  src: string
  alt: string
  color?: string | null
  className?: string
  eager?: boolean
}

/** Lazy poster image with a colored placeholder and graceful failure. */
export function Poster({ src, alt, color, className = '', eager = false }: PosterProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-control ${className}`} style={color ? { backgroundColor: color } : undefined}>
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
