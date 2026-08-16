import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

type Event = {
  who: 'human' | 'agent'
  action: string
  via: string
  rev: number
  conflict?: boolean
}

const START_REV = 41
const events: Event[] = [
  { who: 'human', action: 'Drags FR10 into position', via: 'viewport · interactive marker', rev: 41 },
  { who: 'agent', action: 'Imports the pallet CAD', via: 'posegraft_asset_import_file', rev: 42 },
  { who: 'agent', action: 'Places 12 crates', via: 'posegraft_scene_transform × 12', rev: 54 },
  { who: 'human', action: 'Mates a crate flush to the belt', via: 'Face Mate · two clicks', rev: 55 },
  { who: 'agent', action: 'Adds a turntable at rev 54', via: 'posegraft_mechanism_create', rev: 55, conflict: true },
  { who: 'agent', action: 'Re-reads the revision, retries', via: 'posegraft://scene/revision', rev: 56 },
  { who: 'human', action: 'Presses Play', via: 'both watch the same run', rev: 56 },
]

/* 7 events × 430ms ≈ 3s to fill the timeline, then hold so it stays readable. */
const STEP_MS = 430
const HOLD_MS = 3200

export default function TwoOperators() {
  const [shown, setShown] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(events.length)
      return
    }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Advance one event at a time; hold on the finished timeline, then replay.
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(
      () => setShown((s) => (s >= events.length ? 0 : s + 1)),
      shown === events.length ? HOLD_MS : STEP_MS,
    )
    return () => clearTimeout(t)
  }, [shown, inView])

  const rev = shown > 0 ? events[Math.min(shown, events.length) - 1].rev : START_REV

  return (
    <section ref={sectionRef} id="together" className="scroll-mt-16 border-y border-line bg-mist/50 py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Two operators. One scene.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            You bring the judgement — is this layout sane, is that reach safe, click the face. The
            agent brings the patience for two hundred tedious transforms. Neither waits for the
            other.
          </p>
        </Reveal>

        <Reveal delay={150}>
          {/* revision readout */}
          <div className="mx-auto mt-12 flex w-fit items-baseline gap-3 rounded-lg border border-line bg-card px-5 py-3">
            <span className="font-mono text-xs text-ink-faint">scene revision</span>
            <span className="font-mono text-3xl font-bold text-accent tabular-nums">{rev}</span>
          </div>

          {/* column labels */}
          <div className="mt-10 hidden grid-cols-[1fr_3rem_1fr] md:grid">
            <p className="pr-8 text-right text-sm font-semibold text-ink">Human · viewport</p>
            <span />
            <p className="pl-8 text-sm font-semibold text-ink">Agent · MCP</p>
          </div>

          {/* interleaved timeline */}
          <div className="relative mt-4">
            <div className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2" aria-hidden="true" />
            <ul className="space-y-4">
              {events.map((e, i) => {
                const visible = i < shown
                const card = (
                  <div
                    className={`inline-block max-w-md rounded-lg border bg-card px-4 py-3 text-left ${
                      e.conflict ? 'border-alert/40' : 'border-line'
                    }`}
                  >
                    <p className="text-sm font-medium text-ink">{e.action}</p>
                    <p className={`mt-1 font-mono text-xs ${e.conflict ? 'text-alert' : 'text-ink-faint'}`}>
                      {e.conflict ? 'revision_conflict → ' : ''}
                      {e.via}
                    </p>
                  </div>
                )
                return (
                  <li
                    key={i}
                    className={`relative grid grid-cols-[2rem_1fr] items-start transition-all duration-300 md:grid-cols-[1fr_3rem_1fr] ${
                      visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                    }`}
                  >
                    {/* spine dot */}
                    <span
                      className={`absolute top-4 left-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full md:left-1/2 ${
                        e.conflict ? 'bg-alert' : e.who === 'human' ? 'bg-ink' : 'bg-accent'
                      }`}
                      aria-hidden="true"
                    />
                    {/* mobile: single column right of spine; desktop: side by side */}
                    <span className="hidden md:block md:pr-8 md:text-right">
                      {e.who === 'human' && card}
                    </span>
                    <span className="hidden md:block" />
                    <span className="hidden md:block md:pl-8">{e.who === 'agent' && card}</span>
                    <span className="md:hidden" />
                    <span className="pl-4 md:hidden">
                      <span className="mb-1 block font-mono text-xs tracking-wide text-ink-faint uppercase">
                        {e.who}
                      </span>
                      {card}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink-soft">
            Every mutation carries an <span className="font-mono text-xs">expected_revision</span>.
            Stale writes get a typed conflict, not a corrupted scene — the agent re-reads and
            retries while your viewport updates live.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
