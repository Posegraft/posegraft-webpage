const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'For agents', href: '#agents' },
      { label: 'All tools', href: '#tools' },
      { label: 'Two operators', href: '#together' },
      { label: 'Equipment', href: '#equipment' },
      { label: 'For humans', href: '#humans' },
    ],
  },
  {
    heading: 'Interfaces',
    links: [
      { label: 'MCP server', href: '#tools' },
      { label: 'gRPC API', href: '#tools' },
      { label: 'C++ SDK', href: '#tools' },
      { label: '.pg projects', href: '#equipment' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto flex max-w-page flex-col gap-10 px-5 py-14 md:flex-row md:justify-between md:px-8 lg:px-12">
        <div className="max-w-sm">
          <p className="text-xl tracking-tight text-ink">
            <span className="font-normal">Pose</span>
            <span className="font-bold">Graft</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-faint">
            The simulation studio your agent can actually operate. Designed for humans, built so
            agents can reach every part of it.
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
        © {new Date().getFullYear()} PoseGraft. One scene, two operators.
      </div>
    </footer>
  )
}
