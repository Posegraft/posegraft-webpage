import { useRef, useState, type ReactNode } from 'react'

/** A button that flashes a transient "Coming soon" bubble instead of navigating. */
export default function ComingSoonButton({ className, children }: { className: string; children: ReactNode }) {
  const [show, setShow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const ping = () => {
    setShow(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setShow(false), 1800)
  }

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={ping} className={className}>
        {children}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-paper shadow-lg transition-all duration-300 ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        Coming soon
      </span>
    </span>
  )
}
