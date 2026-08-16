import { useEffect, useState } from 'react'
import { useTheme, setTheme } from '../theme'

const links = [
  { href: '#agents', label: 'For agents' },
  { href: '#tools', label: 'Tools' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#humans', label: 'For humans' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-5 md:px-8 lg:px-12">
        <a href="#top" className="text-xl tracking-tight text-ink">
          <span className="font-normal">Pose</span>
          <span className="font-bold">Graft</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-mist hover:text-ink"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
              </svg>
            )}
          </button>
          <a
            href="#get-started"
            className="rounded-lg bg-accent-surface px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  )
}
