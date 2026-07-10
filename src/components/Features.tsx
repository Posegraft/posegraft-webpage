import type { ReactNode } from 'react'
import Reveal from './Reveal'

const robots = ['CS66', 'EC612', 'EC63', 'EC64', 'TRC10', 'FR10', 'OWL Robot', 'Robotiq 2F-85']
const formats = ['STEP', 'STL', 'URDF', 'SDF', 'OBJ', 'GLTF', 'DAE', 'WRL', 'IGES']

function Tile({
  title,
  line,
  span,
  delay,
  children,
}: {
  title: string
  line: string
  span: string
  delay: number
  children: ReactNode
}) {
  return (
    <Reveal
      delay={delay}
      className={`group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg ${span}`}
    >
      <div className="min-h-24 flex-1">{children}</div>
      <div className="mt-5">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{line}</p>
      </div>
    </Reveal>
  )
}

export default function Features() {
  const marqueeItems = [...robots.map((r) => ({ label: r, kind: 'robot' })), ...formats.map((f) => ({ label: f, kind: 'format' }))]

  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">The workstation itself</p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
            A serious robotics studio under the hood
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Local-first, RoboDK-class, native C++ kinematics — no ROS stack required.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          <Tile title="Flow Builder" line="Snap blocks. Press Play. Robots move." span="md:col-span-4" delay={0}>
            <div className="flex h-full items-center">
              <div className="flex w-full items-center gap-0">
                {['Start', 'Move to Pose', 'Gripper', 'Delay', 'Move Home'].map((b, i, arr) => (
                  <div key={b} className="flex flex-1 items-center">
                    <span
                      className={`w-full rounded-xl border px-2 py-3 text-center text-xs font-semibold whitespace-nowrap transition-transform group-hover:-translate-y-1 ${
                        i === 1
                          ? 'border-accent bg-accent text-white shadow-md shadow-accent/25'
                          : 'border-line bg-mist text-ink-soft'
                      }`}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {b}
                    </span>
                    {i < arr.length - 1 && <span className="h-0.5 w-3 shrink-0 bg-line" />}
                  </div>
                ))}
              </div>
            </div>
          </Tile>

          <Tile title="Real-time TRAC-IK" line="Drag the marker, the arm follows at 60 Hz." span="md:col-span-2" delay={80}>
            <div className="flex h-full flex-col items-center justify-center">
              <p className="font-display text-6xl font-bold tracking-tight text-accent">
                200<span className="text-2xl text-ink-faint">/s</span>
              </p>
              <p className="mt-1 text-xs font-medium tracking-wide text-ink-faint uppercase">native C++ IK solves</p>
            </div>
          </Tile>

          <Tile title="Reach analysis" line="Heat maps of what the robot can reach." span="md:col-span-2" delay={0}>
            <div className="flex h-full items-center justify-center">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 24 }, (_, i) => {
                  const col = i % 6
                  const row = Math.floor(i / 6)
                  const d = Math.hypot(col - 1.5, row - 1.5)
                  const color = d < 1.2 ? 'bg-teal' : d < 2.3 ? 'bg-warm' : 'bg-red-300'
                  return (
                    <span
                      key={i}
                      className={`h-3.5 w-3.5 rounded-full ${color} opacity-80 transition-transform group-hover:scale-110`}
                      style={{ transitionDelay: `${d * 60}ms` }}
                    />
                  )
                })}
              </div>
            </div>
          </Tile>

          <Tile title="Face Mate" line="Two clicks, faces flush." span="md:col-span-2" delay={80}>
            <div className="flex h-full items-center justify-center gap-1">
              <div className="h-16 w-14 rounded-lg rounded-r-none border-2 border-accent/40 bg-accent-soft transition-transform duration-300 group-hover:translate-x-1" />
              <div className="h-16 w-14 rounded-lg rounded-l-none border-2 border-warm/40 bg-warm-soft transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
          </Tile>

          <Tile title="Conveyors & palletizing" line="Belts, stops, and repeatable pattern moves." span="md:col-span-2" delay={160}>
            <div className="flex h-full flex-col justify-center gap-2">
              <div className="flex gap-2 transition-transform duration-500 group-hover:translate-x-3">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-8 w-10 rounded-md border border-warm/40 bg-warm-soft" />
                ))}
              </div>
              <div className="flex h-3 items-center justify-around rounded-full bg-mist px-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink-faint/40" />
                ))}
              </div>
            </div>
          </Tile>

          <Tile title="AI Operator" line="Describe the job, get a runnable program." span="md:col-span-2" delay={0}>
            <div className="flex h-full flex-col justify-center gap-3">
              <p className="rounded-full bg-mist px-4 py-2 font-mono text-xs text-ink-soft">"palletize 12 crates"</p>
              <div className="flex items-center gap-1.5 pl-3">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-warm" fill="currentColor" aria-hidden="true">
                  <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
                </svg>
                <span className="text-xs text-ink-faint">drafts</span>
                {['loop', 'pick', 'place'].map((b) => (
                  <span key={b} className="rounded-md bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          <Tile title="CAD in, replay out" line="Import anything, export shareable HTML replays." span="md:col-span-2" delay={80}>
            <div className="flex h-full flex-wrap content-center gap-1.5">
              {formats.slice(0, 7).map((f) => (
                <span key={f} className="rounded-md border border-line bg-mist px-2 py-1 font-mono text-[11px] text-ink-soft">
                  .{f.toLowerCase()}
                </span>
              ))}
              <span className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[11px] font-semibold text-accent">+ more</span>
            </div>
          </Tile>

          <Tile title="Open to everything" line="gRPC, SDK, and portable .pg projects." span="md:col-span-2" delay={160}>
            <div className="flex h-full flex-col justify-center gap-2 font-mono text-xs">
              <p className="rounded-lg bg-[#101532] px-3 py-2 text-slate-300">
                <span className="text-indigo-300">client</span>.MoveToPose(<span className="text-emerald-400">"pick_A"</span>)
              </p>
              <p className="rounded-lg border border-line bg-mist px-3 py-2 text-ink-soft">my_workcell.pg · scene + logic + meshes</p>
            </div>
          </Tile>
        </div>
      </div>

      {/* robots + formats marquee */}
      <Reveal className="mt-16">
        <p className="text-center text-sm font-medium text-ink-faint">
          Bundled robot library &amp; supported formats
        </p>
        <div className="relative mt-5 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap ${
                  item.kind === 'robot'
                    ? 'border-accent/20 bg-accent-soft text-accent'
                    : 'border-line bg-white text-ink-soft'
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
