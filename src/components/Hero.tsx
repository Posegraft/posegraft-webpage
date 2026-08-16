import Reveal from './Reveal'
import ComingSoonButton from './ComingSoonButton'
import { TOOL_COUNT } from '../data/tools'

const handshake = ['Ready', 'IK Bridge', 'Online']

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-line pt-16">
      <div className="grid-bg hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-page px-5 pt-20 pb-16 md:px-8 md:pt-28 lg:px-12">
        {/* min-h, not font size, is what puts the screenshot below the fold —
            type big enough to do it alone would be absurd on a short laptop.
            11rem = nav (4) + this container's md:pt-28 (7). */}
        <Reveal className="flex min-h-[calc(100svh-11rem)] flex-col justify-center">
          {/* fluid so it scales with the wide container instead of stepping at
              one breakpoint: ~48px on phones, up to 136px on a 2k monitor */}
          <h1 className="max-w-5xl text-[clamp(3rem,8vw,8.5rem)] leading-[1.02] font-bold tracking-tight text-ink">
            The simulator that hands your agent the keys.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            PoseGraft is a robot simulation studio designed for humans — and built so an AI agent
            can reach every part of it. Same scene, same tools, same undo history. Nobody is
            bolted on.
          </p>
          <p className="mt-5 font-mono text-sm text-ink-faint">
            {TOOL_COUNT} tools · one scene · two operators
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ComingSoonButton className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-deep">
              Download for Linux
            </ComingSoonButton>
            {/* ponytail: no scheduling tool yet — calendly is the stand-in until one exists */}
            <a
              href="https://calendly.com/posegraft/30min"
              className="rounded-lg border border-line bg-white px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Book a demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mt-14">
          <img
            src="/studio.png"
            alt="PoseGraft studio — 3D workcell viewport beside the visual Flow Builder"
            className="w-full rounded-xl border border-line"
          />
          {/* The status strip from the app's own corner, pulled out: this is the handshake. */}
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-2.5">
            <span className="flex items-center gap-2.5">
              {handshake.map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-xs font-medium text-ink">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
                  {s}
                </span>
              ))}
            </span>
            <span className="border-l border-line pl-3 font-mono text-xs text-ink-faint">
              the agent handshake
            </span>
          </div>
        </Reveal>
        <p className="mt-10 max-w-xl text-sm text-ink-faint">
          When those three dots are green, the local services are up — and anything connected over
          MCP can see and operate the same workcell you do.
        </p>
      </div>
    </section>
  )
}
