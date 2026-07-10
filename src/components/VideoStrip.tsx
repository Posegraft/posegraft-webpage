import { useState } from 'react'
import Reveal from './Reveal'

const demos = [
  {
    src: '/videos/scene-design.mp4',
    title: 'Scene design in 10 seconds',
    caption: 'Spawn a robot, drop a conveyor, and mate parts into a workcell.',
  },
  {
    src: '/videos/agent-builds-program.mp4',
    title: 'An agent builds a program',
    caption: 'Watch an agent call MCP tools to assemble and run a block program.',
  },
  {
    src: '/videos/reach-analysis.mp4',
    title: 'Reach analysis walkthrough',
    caption: 'Sample a surface, read the heat map, and snap to a reachable pose.',
  },
]

function DemoSlot({ demo, delay }: { demo: (typeof demos)[number]; delay: number }) {
  // ponytail: no video files yet — onError flips to a styled placeholder until mp4s are dropped in public/videos/
  const [missing, setMissing] = useState(false)

  return (
    <Reveal
      delay={delay}
      className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <span className="ml-2 truncate text-xs text-ink-faint">{demo.title}</span>
      </div>

      <div className="relative aspect-video bg-mist">
        {missing ? (
          <div className="blueprint-grid absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-accent shadow-md transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink-faint backdrop-blur">
              10-sec demo coming soon
            </span>
          </div>
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={demo.src}
            controls
            muted
            playsInline
            preload="metadata"
            onError={() => setMissing(true)}
          />
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{demo.title}</h3>
        <p className="mt-1.5 text-sm text-ink-soft">{demo.caption}</p>
      </div>
    </Reveal>
  )
}

export default function VideoStrip() {
  return (
    <section id="demos" className="scroll-mt-20 bg-mist py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">See it move</p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Ten seconds is all it takes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Short, real walkthroughs — no scripted renders, just the simulator doing its job.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {demos.map((d, i) => (
            <DemoSlot key={d.src} demo={d} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
