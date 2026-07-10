const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'For Agents', href: '#agents' },
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
    ],
  },
  {
    heading: 'For builders',
    links: [
      { label: 'Enhanced MCP', href: '#agents' },
      { label: 'API access', href: '#features' },
      { label: 'SDK', href: '#features' },
      { label: '.pg projects', href: '#features' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl tracking-tight text-ink">
            <span className="font-normal">Pose</span>
            <span className="font-bold">Graft</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-faint">
            The robot simulation studio built for AI agents and the humans who work with them.
            Design your scene. Build robotic logic.
          </p>
        </div>
        <div className="flex gap-16">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-ink">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-ink-faint transition-colors hover:text-accent">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} PoseGraft. Built for agents, designed for humans.
      </div>
    </footer>
  )
}
