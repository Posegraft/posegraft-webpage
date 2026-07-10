import HeroCanvas from './HeroCanvas'
import Reveal from './Reveal'

const stats = [
  { value: '~200/s', label: 'real-time IK solves per robot' },
  { value: '8+', label: 'industrial robots bundled' },
  { value: '10+', label: 'CAD formats imported' },
  { value: '100%', label: 'of features agent-callable' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 animate-drift rounded-full bg-accent-soft blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-warm-soft blur-3xl" />
      </div>
      <HeroCanvas />

      <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-accent shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-warm" />
            The first robot simulator built for AI agents
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display mx-auto mt-8 max-w-5xl text-5xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
            Simulation built <span className="text-accent">for agents</span>.
            <br />
            Designed <span className="text-warm">for humans</span>.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Design your scene. Build robotic logic. Let agents do the rest. PoseGraft pairs a
            human-optimized 3D workcell studio with an agent-native backend — Enhanced MCP, gRPC,
            and SDK access to every single feature.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#get-started"
              className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-xl hover:shadow-accent/30"
            >
              Download for Linux
            </a>
            <a
              href="#demos"
              className="rounded-full border border-line bg-white/80 px-8 py-3.5 text-base font-semibold text-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              Watch the demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-ink">{s.value}</dd>
                <dd className="mt-1 text-sm text-ink-faint">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
