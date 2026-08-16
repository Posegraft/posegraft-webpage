import { useEffect, useState } from 'react'

const links = [
  { href: '#agents', label: 'For agents' },
  { href: '#tools', label: 'Tools' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#humans', label: 'For humans' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
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

        <a
          href="#get-started"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          Get started
        </a>
      </nav>
    </header>
  )
}
