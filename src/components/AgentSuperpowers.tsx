import { useEffect, useRef, useState, type ReactNode } from 'react'
import Reveal from './Reveal'

const stagger = (i: number) => ({ animationDelay: `${i * 140}ms` })

const iconStroke = {
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
} as const

function MiniCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-live" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 10.2l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── shared terminal demo ────────────────────────────────────────────────── */

type TermLine = { kind: 'call' | 'args' | 'ok' | 'err'; text: string }

function Terminal({ lines }: { lines: TermLine[] }) {
  const color = {
    call: 'text-slate-200',
    args: 'text-sky-300',
    ok: 'text-emerald-400',
    err: 'text-red-400',
  }
  return (
    <div className="overflow-hidden rounded-xl bg-terminal">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-xs text-slate-300">agent session · mcp</p>
        <p className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
          connected
        </p>
      </div>
      <div className="space-y-1 px-4 py-4 font-mono text-xs leading-relaxed md:text-[13px]">
        {lines.map((l, i) => (
          <p
            key={i}
            className={`animate-fade-up ${color[l.kind]} ${l.kind === 'args' ? 'pl-3' : ''} ${
              l.kind === 'ok' || l.kind === 'err' ? 'pb-1.5' : ''
            }`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {l.text}
          </p>
        ))}
        <p className="animate-pulse-dot text-slate-400" style={{ animationDelay: `${lines.length * 200}ms` }}>
          ▌
        </p>
      </div>
    </div>
  )
}

/* ── one demo per beat ───────────────────────────────────────────────────── */

function BuildDemo() {
  return (
    <Terminal
      lines={[
        { kind: 'call', text: '> posegraft_asset_import_file' },
        { kind: 'args', text: '{ "path": "cell/pallet_frame.step" }' },
        { kind: 'ok', text: '< ok · asset ready' },
        { kind: 'call', text: '> posegraft_asset_instantiate' },
        { kind: 'args', text: '{ "id": "fr10" }' },
        { kind: 'ok', text: '< ok · node "FR10" · rev 7' },
        { kind: 'call', text: '> posegraft_scene_combine' },
        { kind: 'args', text: '{ "name": "Pick cell" }' },
        { kind: 'ok', text: '< ok · assembly created · rev 8' },
      ]}
    />
  )
}

function RigDemo() {
  const steps = [
    { call: 'posegraft_mechanism_create', note: 'Linear Slide on pallet_frame' },
    { call: 'posegraft_mechanism_validate', note: 'axis, limits, parent — ok' },
    { call: 'posegraft_mechanism_set_progress', note: '0 → 1, watched live' },
    { call: 'posegraft_simulation_conveyor_set_running', note: 'belt on' },
  ]
  return (
    <div className="space-y-2.5">
      {steps.map((s, i) => (
        <div
          key={s.call}
          className="animate-fade-up flex items-center gap-3 rounded-lg border border-line bg-mist/60 px-4 py-3"
          style={stagger(i)}
        >
          <MiniCheck />
          <div className="min-w-0">
            <p className="truncate font-mono text-xs text-ink">{s.call}</p>
            <p className="text-xs text-ink-faint">{s.note}</p>
          </div>
        </div>
      ))}
      <div className="animate-fade-up rounded-lg bg-live-soft px-4 py-3 text-center text-sm font-semibold text-live" style={stagger(steps.length)}>
        Inert CAD is now moving equipment
      </div>
    </div>
  )
}

function ProgramDemo() {
  const blocks = ['moveToPose', 'controlGripper', 'moveToPatternPose', 'delay', 'moveToJoint']
  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <p className="animate-fade-up font-mono text-xs text-ink-faint">
        posegraft_program_flow_create · posegraft_program_block_add × {blocks.length}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {blocks.map((b, i) => (
          <span
            key={b}
            className="animate-pop rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 font-mono text-xs font-semibold text-accent"
            style={stagger(i)}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="animate-fade-up flex items-center gap-2 text-sm text-ink-soft" style={stagger(blocks.length + 1)}>
        <MiniCheck />
        <span>
          <span className="font-mono text-xs">posegraft_program_validate</span> · ready to run
        </span>
      </div>
    </div>
  )
}

function RunDemo() {
  return (
    <Terminal
      lines={[
        { kind: 'call', text: '> posegraft_program_run' },
        { kind: 'ok', text: '< ok · flows running in parallel' },
        { kind: 'call', text: '> posegraft_viewport_screenshot' },
        { kind: 'ok', text: '< png · the same viewport you see' },
        { kind: 'call', text: '> posegraft_spatial_measure_distance' },
        { kind: 'args', text: '{ "from": "tcp", "to": "crate_01" }' },
        { kind: 'ok', text: '< 0.412 m' },
        { kind: 'call', text: '> posegraft_replay_export' },
        { kind: 'ok', text: '< ok · replay package, shareable' },
      ]}
    />
  )
}

function RecoverDemo() {
  return (
    <Terminal
      lines={[
        { kind: 'call', text: '> posegraft_scene_transform' },
        { kind: 'args', text: '{ "node": "crate_04", "expected_revision": 41 }' },
        { kind: 'err', text: '< error · revision_conflict — scene is at rev 53' },
        { kind: 'call', text: '> read posegraft://scene/revision' },
        { kind: 'ok', text: '< 53 · a human mated a face while I worked' },
        { kind: 'call', text: '> posegraft_scene_transform' },
        { kind: 'args', text: '{ "node": "crate_04", "expected_revision": 53 }' },
        { kind: 'ok', text: '< ok · rev 54 · nobody’s work lost' },
      ]}
    />
  )
}

function GenerateDemo() {
  const flow = ['Generate world', 'Deploy robots', 'Harvest data']
  const rows = [
    { file: 'episode_0141.json', note: 'grasp ok' },
    { file: 'episode_0142.json', note: 'grasp ok' },
    { file: 'episode_0143.json', note: 'retry logged' },
  ]
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {flow.map((f, i) => (
          <span key={f} className="flex items-center gap-2">
            <span className="animate-pop rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent" style={stagger(i)}>
              {f}
            </span>
            {i < flow.length - 1 && <span className="text-ink-faint">→</span>}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.file}
            className="animate-fade-up flex items-center justify-between rounded-lg border border-line bg-mist/50 px-3 py-2 font-mono text-xs text-ink-soft"
            style={stagger(flow.length + i)}
          >
            <span>
              {r.file} · {r.note}
            </span>
            <span className="font-sans font-semibold text-live">saved</span>
          </div>
        ))}
      </div>
      <p className="animate-fade-up text-center text-xs text-ink-faint" style={stagger(flow.length + rows.length)}>
        Where this is headed: worlds and training data with no human in the loop.
      </p>
    </div>
  )
}

/* ── the six beats ───────────────────────────────────────────────────────── */

const beats: { title: string; body: string; icon: ReactNode; render: () => ReactNode }[] = [
  {
    title: 'Builds the cell',
    body: 'Imports your CAD, instantiates robots from the library, transforms and groups nodes into a workcell — the same scene graph you see.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" {...iconStroke} />
        <path d="M12 3v8m0 0l7-4m-7 4l-7-4" {...iconStroke} strokeOpacity={0.5} />
      </svg>
    ),
    render: () => <BuildDemo />,
  },
  {
    title: 'Rigs the motion',
    body: 'Attaches mechanisms to inert meshes — slides, hinges, turntables — validates them, and drives them to check the throw.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z" {...iconStroke} />
      </svg>
    ),
    render: () => <RigDemo />,
  },
  {
    title: 'Writes the program',
    body: 'Authors block programs a human can open, read, and edit in Flow Builder — then validates them before anything moves.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <rect x="4" y="5" width="7" height="6" rx="1.5" {...iconStroke} />
        <rect x="13" y="13" width="7" height="6" rx="1.5" {...iconStroke} />
        <path d="M11 8h4v5" {...iconStroke} />
      </svg>
    ),
    render: () => <ProgramDemo />,
  },
  {
    title: 'Runs and watches',
    body: 'Presses Play, then verifies its own work: screenshots the viewport, measures distances, exports a replay you can share.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" {...iconStroke} />
        <path d="M10.2 9l5 3-5 3V9z" {...iconStroke} />
      </svg>
    ),
    render: () => <RunDemo />,
  },
  {
    title: 'Recovers like a colleague',
    body: 'Every mutation carries an expected revision. When the agent races you, it gets a typed conflict, re-reads, and retries — never a corrupted scene.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M4 12a8 8 0 0113.7-5.7M20 12a8 8 0 01-13.7 5.7" {...iconStroke} />
        <path d="M17 3v4h-4M7 21v-4h4" {...iconStroke} />
      </svg>
    ),
    render: () => <RecoverDemo />,
  },
  {
    title: 'Generates worlds and data',
    body: 'The trajectory: agents composing scenes and harvesting their own training episodes, end to end. The tool surface is built for it.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" {...iconStroke} />
        <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" {...iconStroke} />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" {...iconStroke} />
      </svg>
    ),
    render: () => <GenerateDemo />,
  },
]

export default function AgentSuperpowers() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Only run the loop while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Advance after each demo has had time to play; hover/click resets the timer.
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive((a) => (a + 1) % beats.length), 5000)
    return () => clearTimeout(t)
  }, [active, inView])

  return (
    <section
      ref={sectionRef}
      id="superpowers"
      className="mx-auto max-w-page scroll-mt-16 px-5 py-24 md:px-8 lg:px-12"
    >
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
          What an agent does with the keys
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Not a chatbot bolted to a viewport. An operator that builds, rigs, programs, verifies —
          and cleans up after itself.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="flex flex-col gap-2.5" role="tablist" aria-label="Agent capabilities">
            {beats.map((b, i) => {
              const open = i === active
              return (
                <button
                  key={b.title}
                  type="button"
                  role="tab"
                  aria-selected={open}
                  aria-controls="superpowers-demo"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full rounded-xl border bg-card p-4 text-left transition-colors duration-300 ${
                    open ? 'border-accent/50' : 'border-line hover:border-accent/25'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                        open ? 'bg-accent-soft text-accent' : 'bg-mist text-ink-faint'
                      }`}
                    >
                      {b.icon}
                    </span>
                    <span className="text-sm font-semibold text-ink">{b.title}</span>
                  </span>
                  {/* grid-rows trick: animates open/close without measuring height */}
                  <span className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <span className="overflow-hidden">
                      <span className={`block pt-2 pl-11 text-sm leading-relaxed text-ink-soft transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                        {b.body}
                      </span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* demo panel — remounts on `active` change so each animation replays */}
          <div id="superpowers-demo" role="tabpanel" className="flex h-full flex-col rounded-xl border border-line bg-card p-5 md:p-8">
            <div key={active} className="flex min-h-72 flex-1 flex-col justify-center">
              {beats[active].render()}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
