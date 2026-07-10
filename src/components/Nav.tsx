import { useEffect, useState } from 'react'

const links = [
  { href: '#agents', label: 'For Agents' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl tracking-tight text-ink">
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

        <a
          href="#get-started"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-md"
        >
          Get Started
        </a>
      </nav>
    </header>
  )
}
