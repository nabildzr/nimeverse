/** Original wordmark for this project (not the reference site's logo). */
export function Logo() {
  return (
    <span className="flex select-none items-center gap-1.5">
      <svg viewBox="0 0 32 32" className="h-[30px] w-[30px]" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0d6fde" />
        <path d="M9 23 16 8l7 15h-4l-3-7-3 7z" fill="#fff" />
      </svg>
      <span className="text-[24px] font-bold uppercase leading-none tracking-wide text-heading">
        Ani<span className="text-accent">verse</span>
      </span>
    </span>
  )
}
