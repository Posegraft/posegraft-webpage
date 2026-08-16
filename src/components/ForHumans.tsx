import Reveal from './Reveal'
import { SPEC_ROWS, PLUGINS, MANY_MORE } from '../data/specs'

/** paints the trailing "And many more..." teaser accent blue when present */
function SpecValue({ value }: { value: string }) {
  if (!value.endsWith(MANY_MORE)) return value
  return (
    <>
      {value.slice(0, -MANY_MORE.length)}
      <span className="text-accent">{MANY_MORE}</span>
    </>
  )
}

/** The engineer's act: the studio on its own merits, then the datasheet. */
export default function ForHumans() {
  return (
    <section id="humans" className="scroll-mt-16 border-t border-line bg-mist/40 py-24">
      <div className="mx-auto max-w-page px-5 md:px-8 lg:px-12">
        {/* beat 1 — the studio */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="max-w-md text-3xl font-bold tracking-tight text-ink md:text-4xl">
              For the people who ship cells.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              No agent required. Design the workcell in the 3D viewport, snap blocks together in
              Flow Builder, press Play — first simulation in minutes, not a training course.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              And when you do connect an agent, it becomes your lab partner: every step it takes
              lands in your viewport and your undo history, so you can watch a cell get built — and
              learn how it’s done.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-xl border border-line bg-mist/60 p-4">
              <video
                src="/videos/programming.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Snapping program blocks together in Flow Builder and pressing Play"
                className="aspect-video w-full rounded-lg border border-line bg-steel/30 object-cover dark:brightness-90"
              />
              <div className="mt-4 border-t border-line pt-4 text-center font-mono text-xs text-ink-soft">
                design → program → run · all on your machine
              </div>
            </div>
          </Reveal>
        </div>

        {/* beat 2 — the spec ledger */}
        <Reveal delay={100} className="mt-16">
          <p className="font-mono text-xs tracking-widest text-ink-faint uppercase">Datasheet</p>
          <div className="mt-4 divide-y divide-line border-y border-line bg-card/60">
            {SPEC_ROWS.map((r) => (
              <div
                key={r.label}
                className="grid gap-1 px-4 py-3.5 md:grid-cols-[180px_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="text-sm font-semibold text-ink">{r.label}</span>
                <span className="font-mono text-sm text-ink-soft">
                  <SpecValue value={r.value} />
                </span>
                {r.note && <span className="text-xs text-ink-faint md:text-right">{r.note}</span>}
              </div>
            ))}
          </div>
        </Reveal>

        {/* beat 3 — specialized plugins */}
        <Reveal delay={150} className="mt-16">
          <h3 className="text-xl font-semibold text-ink">Specialized plugins</h3>
          <p className="mt-2 max-w-2xl text-ink-soft">
            The jobs integrators actually get paid for, as first-class workflows — not exercises
            left to the reader.
          </p>
          <div className="mt-6 grid gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLUGINS.map((p) => (
              <div key={p.name}>
                <p className="font-semibold text-ink">{p.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.line}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
