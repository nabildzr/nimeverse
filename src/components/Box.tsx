import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface BoxProps {
  title?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  viewAll?: string
  action?: ReactNode
  className?: string
  bodyClassName?: string
  children: ReactNode
}

/** Dark panel with the blue-grey title strip used throughout the reference layout. */
export function Box({ title, as: Heading = 'h2', viewAll, action, className = '', bodyClassName = '', children }: BoxProps) {
  return (
    <section className={`box ${className}`}>
      {title && (
        <div className="box-head">
          <Heading>{title}</Heading>
          {viewAll && (
            <Link
              to={viewAll}
              className="rounded-[3px] bg-[#222] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-accent"
            >
              View All
            </Link>
          )}
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
