import Reveal from './Reveal'

const steps = [
  {
    n: '01',
    title: 'Design',
    body: 'Spawn robots from the bundled library or import your own CAD. Place conveyors, mate faces, teach targets, and record poses in the 3D viewport.',
  },
  {
    n: '02',
    title: 'Program',
    body: 'Snap blocks together in Flow Builder — or describe the job and let the AI Operator or your own agent draft the program for you.',
  },
  {
    n: '03',
    title: 'Run & integrate',
    body: 'Press Play and watch the simulated motion. Then drive the same cell from outside — MCP tools for agents, API and SDK for everything else.',
  },
]

const archItems = [
  { label: 'Design in 3D', detail: 'build your workcell visually', tint: 'border-warm/30 bg-warm-soft text-warm' },
  { label: 'Simulate instantly', detail: 'real-time, accurate robot motion', tint: 'border-accent/30 bg-accent-soft text-accent' },
  { label: 'Hand it to agents', detail: 'every feature callable by AI', tint: 'border-teal/30 bg-teal-soft text-teal' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <Reveal className="text-center">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">How it works</p>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Design. Program. Run.
        </h2>
      </Reveal>

      <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
        <div className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-line md:block" aria-hidden="true" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 120} className="relative text-center">
            <span className="font-display relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/20 bg-white text-lg font-bold text-accent shadow-sm">
              {s.n}
            </span>
            <h3 className="font-display mt-5 text-2xl font-semibold text-ink">{s.title}</h3>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-soft">{s.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-16">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
          <p className="text-center text-sm font-medium text-ink-faint">
            Runs entirely on your machine — no cloud, no complex setup
          </p>
          <div className="mt-5 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {archItems.map((item, i) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-3 md:flex-row">
                <div className={`w-full rounded-2xl border px-5 py-4 text-center ${item.tint}`}>
                  <p className="font-display font-semibold">{item.label}</p>
                  <p className="mt-0.5 text-xs opacity-80">{item.detail}</p>
                </div>
                {i < archItems.length - 1 && (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 rotate-90 text-ink-faint md:rotate-0" aria-hidden="true">
                    <path d="M4 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
