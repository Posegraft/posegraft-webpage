import { useEffect, useRef, useState, type ReactNode } from 'react'
import Reveal from './Reveal'
import { capabilities } from './AudienceSection'

const stagger = (i: number) => ({ animationDelay: `${i * 140}ms` })

function MiniCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-teal" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.15" />
      <path d="M6 10.2l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── one demo per capability (same order as `capabilities`) ─────────────── */

function TerminalDemo() {
  const lines: { kind: 'call' | 'args' | 'ok'; text: string }[] = [
    { kind: 'call', text: '> tool: move_to_pose' },
    { kind: 'args', text: '{ "robot": "FR10", "pose": "pick_A" }' },
    { kind: 'ok', text: '< ok · tcp reached in 1.24s' },
    { kind: 'call', text: '> tool: control_gripper' },
    { kind: 'args', text: '{ "action": "activate", "object": "crate_01" }' },
    { kind: 'ok', text: '< ok · crate_01 attached' },
    { kind: 'call', text: '> tool: reach_analysis' },
    { kind: 'args', text: '{ "surface": "pallet_top" }' },
    { kind: 'ok', text: '< ok · 94% reachable' },
  ]
  const color = { call: 'text-slate-200', args: 'text-indigo-300', ok: 'text-emerald-400' }
  return (
    <div className="overflow-hidden rounded-2xl bg-[#101532] shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-xs text-slate-400">agent session · mcp</p>
        <p className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
          connected
        </p>
      </div>
      <div className="space-y-1 px-4 py-4 font-mono text-xs leading-relaxed md:text-[13px]">
        {lines.map((l, i) => (
          <p key={i} className={`animate-fade-up ${color[l.kind]} ${l.kind === 'args' ? 'pl-3' : ''} ${l.kind === 'ok' ? 'pb-1.5' : ''}`} style={{ animationDelay: `${i * 200}ms` }}>
            {l.text}
          </p>
        ))}
        <p className="animate-pulse-dot text-slate-500" style={{ animationDelay: `${lines.length * 200}ms` }}>▌</p>
      </div>
    </div>
  )
}

function DeploymentDemo() {
  const steps = ['Lay out the cell', 'Place FR10 + conveyor', 'Teach pick & place poses', 'Generate block program', 'Simulate & validate']
  return (
    <div className="space-y-2.5">
      {steps.map((s, i) => (
        <div key={s} className="animate-fade-up flex items-center gap-3 rounded-xl border border-line bg-mist/60 px-4 py-3 text-sm text-ink" style={stagger(i)}>
          <MiniCheck />
          {s}
        </div>
      ))}
      <div className="animate-fade-up rounded-xl bg-teal-soft px-4 py-3 text-center text-sm font-semibold text-teal" style={stagger(steps.length)}>
        Deployment plan ready · no human in the loop
      </div>
    </div>
  )
}

function TutorDemo() {
  const chat: { who: 'bot' | 'you'; text: string }[] = [
    { who: 'bot', text: 'Lesson 1: pick and place. Drag a Start block onto the canvas.' },
    { who: 'you', text: 'Done. What next?' },
    { who: 'bot', text: 'Connect Move to Pose → pick_A. Press Play — I’ll watch your run.' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {chat.map((m, i) => (
        <div
          key={i}
          className={`animate-fade-up max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            m.who === 'you' ? 'self-end bg-accent text-white' : 'self-start bg-mist text-ink-soft'
          }`}
          style={stagger(i)}
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}

function GenerativeDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <p className="animate-fade-up rounded-full bg-mist px-4 py-1.5 font-mono text-xs text-ink-soft">
        generate_model("mounting bracket, 4 holes")
      </p>
      <svg viewBox="0 0 200 150" className="h-40 w-56 text-accent" fill="none" aria-hidden="true">
        {/* isometric box, drawn on with a dash sweep */}
        <path
          d="M40 60 L100 30 L160 60 L100 90 Z M40 60 L40 110 L100 140 L100 90 M160 60 L160 110 L100 140"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="animate-draw"
          style={{ strokeDasharray: 700, strokeDashoffset: 700 }}
        />
        <circle cx="85" cy="58" r="4" fill="currentColor" className="animate-pop" style={{ animationDelay: '1.1s' }} />
        <circle cx="115" cy="58" r="4" fill="currentColor" className="animate-pop" style={{ animationDelay: '1.25s' }} />
      </svg>
      <p className="animate-fade-up text-center text-sm text-ink-faint" style={{ animationDelay: '1.4s' }}>
        Mesh generated · dropped into the scene · ready to grasp
      </p>
    </div>
  )
}

function SyntheticDemo() {
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
            <span className="animate-pop rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent" style={stagger(i)}>
              {f}
            </span>
            {i < flow.length - 1 && <span className="text-ink-faint">→</span>}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={r.file} className="animate-fade-up flex items-center justify-between rounded-lg border border-line bg-mist/50 px-3 py-2 font-mono text-xs text-ink-soft" style={stagger(flow.length + i)}>
            <span>{r.file} · {r.note}</span>
            <span className="font-sans font-semibold text-teal">saved</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ToolCloudDemo() {
  const tools = [
    { name: 'move_to_pose', hot: true },
    { name: 'save_pose', hot: false },
    { name: 'control_gripper', hot: false },
    { name: 'spawn_conveyor', hot: true },
    { name: 'face_mate', hot: false },
    { name: 'reach_analysis', hot: false },
    { name: 'generate_world', hot: true },
    { name: 'get_tcp', hot: false },
    { name: 'attach_object', hot: false },
    { name: 'run_program', hot: true },
    { name: 'teach_target', hot: false },
    { name: 'hide_show', hot: false },
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {tools.map((t, i) => (
        <span
          key={t.name}
          className={`animate-pop rounded-full px-3 py-1.5 font-mono text-xs ${
            t.hot ? 'bg-accent-soft font-semibold text-accent' : 'border border-line bg-white text-ink-soft'
          }`}
          style={stagger(i)}
        >
          {t.name}
        </span>
      ))}
    </div>
  )
}

/** Body copy + demo renderer per capability, same order as `capabilities`. */
const demos: { body: string; render: () => ReactNode }[] = [
  { body: 'Every feature is a tool. Agents get very low-level access — they can do anything in this simulator.', render: () => <TerminalDemo /> },
  { body: 'Hand the agent a goal. It lays out the cell, places robots, and programs the motion end to end.', render: () => <DeploymentDemo /> },
  { body: 'Learn automation by building it — the agent guides you step by step, like a lab instructor.', render: () => <TutorDemo /> },
  { body: 'Missing a part? Agents generate 3D models from scratch and use them in simulation.', render: () => <GenerativeDemo /> },
  { body: 'Agents build a world, deploy robots, and generate their own training data. No pipelines.', render: () => <SyntheticDemo /> },
  { body: 'If you can click it, an agent can call it — every button, block, and setting in the app.', render: () => <ToolCloudDemo /> },
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

  // Advance to the next feature after its animation has had time to play.
  // Depending on `active` means a hover/click resets the timer and the loop
  // simply continues from whichever feature the visitor landed on.
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setActive((a) => (a + 1) % capabilities.length), 5000)
    return () => clearTimeout(t)
  }, [active, inView])

  return (
    <section ref={sectionRef} id="superpowers" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <Reveal className="text-center">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">Agentic superpowers</p>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
          What agents do when the simulator is on their side
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          Most software tolerates agents. PoseGraft was built around them.
        </p>
      </Reveal>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {/* pointer accordion */}
        <div className="flex flex-col gap-3" role="tablist" aria-label="Agent capabilities">
          {capabilities.map((c, i) => {
            const open = i === active
            return (
              <Reveal key={c.title} delay={i * 80}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={open}
                  aria-controls="superpowers-demo"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left transition-all duration-300 ${
                    open ? 'border-accent/40 shadow-lg' : 'border-line shadow-sm hover:border-accent/25 hover:shadow-md'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${c.tint} ${open ? 'scale-110' : ''}`}>
                      {c.icon}
                    </span>
                    <span className="text-sm font-semibold text-ink">{c.title}</span>
                  </span>
                  {/* grid-rows trick: animates open/close without measuring height */}
                  <span className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <span className="overflow-hidden">
                      <span className={`block pt-2 pl-11 text-sm leading-relaxed text-ink-soft transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                        {demos[i].body}
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>

        {/* demo panel — remounts on `active` change so each animation replays */}
        <Reveal delay={200} className="h-full">
          <div id="superpowers-demo" role="tabpanel" className="flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-sm md:p-8">
            <div key={active} className="flex min-h-72 flex-1 flex-col justify-center">
              {demos[active].render()}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
