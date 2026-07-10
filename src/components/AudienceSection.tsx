import Reveal from './Reveal'

const humanPoints = [
  'A clean 3D workcell where you build and test your robot cell before it exists',
  'Program robots by connecting visual blocks, then press Play — no code needed',
  'Drag a marker and the robot arm follows your hand in real time',
  'Check reach, snap parts together, and measure — right inside the scene',
]

const agentPoints = [
  'Agents get the same low-level access a human has — they can do anything you can',
  'Move the robot, drive grippers, save poses, and read the scene directly',
  'Simulate motion and rehearse full tasks without touching real hardware',
  'Every block, pose, and scene option exposed as a callable tool',
]

const iconStroke = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const

export const capabilities = [
  {
    title: 'Enhanced MCP, all the way down',
    tint: 'bg-accent-soft text-accent',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" {...iconStroke} />
        <circle cx="12" cy="12" r="3.5" {...iconStroke} />
      </svg>
    ),
  },
  {
    title: 'Deployment plans in minutes',
    tint: 'bg-teal-soft text-teal',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z" {...iconStroke} />
      </svg>
    ),
  },
  {
    title: 'Your personal lab teacher',
    tint: 'bg-warm-soft text-warm',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M3 8l9-4 9 4-9 4-9-4z" {...iconStroke} />
        <path d="M7 10.5V15c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" {...iconStroke} />
      </svg>
    ),
  },
  {
    title: 'Generative 3D, no human needed',
    tint: 'bg-accent-soft text-accent',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" {...iconStroke} />
        <path d="M12 3v8m0 0l7-4m-7 4l-7-4" {...iconStroke} strokeOpacity={0.5} />
      </svg>
    ),
  },
  {
    title: 'Self-serve synthetic data',
    tint: 'bg-teal-soft text-teal',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" {...iconStroke} />
        <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" {...iconStroke} />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" {...iconStroke} />
      </svg>
    ),
  },
  {
    title: 'Everything is a tool',
    tint: 'bg-warm-soft text-warm',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M14.5 6.5a4 4 0 015.6 5L13 18.6a2 2 0 01-2.8 0l-4.8-4.8a2 2 0 010-2.8L12.5 4a4 4 0 012 2.5z" {...iconStroke} />
      </svg>
    ),
  },
]

function Check({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AudienceCard({
  tint,
  icon,
  title,
  blurb,
  points,
  accent,
  children,
}: {
  tint: string
  icon: React.ReactNode
  title: string
  blurb: string
  points: string[]
  accent: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      </div>
      <p className="text-ink-soft">{blurb}</p>
      <ul className="flex flex-col gap-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <Check className={accent} />
            <span className="text-sm leading-relaxed text-ink-soft">{p}</span>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default function AudienceSection() {
  return (
    <section id="agents" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24">
      <Reveal className="text-center">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">One simulator, two audiences</p>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Built for Agents. Loved by Humans.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          PoseGraft hits the sweet spot: a frontend optimized for people, a backend engineered for
          AI agents. Both work in the same scene, at the same time — and both stay happy.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-14">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <AudienceCard
            tint="bg-warm-soft text-warm"
            title="For humans"
            blurb="A friendly desktop studio where designing a workcell feels like sketching, not scripting."
            points={humanPoints}
            accent="text-warm"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          >
            <img
              src="/studio.png"
              alt="PoseGraft studio — 3D workcell viewport beside the visual Flow Builder"
              loading="lazy"
              className="mt-1 w-full rounded-2xl border border-line shadow-sm"
            />
          </AudienceCard>

          <AudienceCard
            tint="bg-accent-soft text-accent"
            title="For agents"
            blurb="Not an afterthought API — the entire simulator is a first-class tool surface for AI agents."
            points={agentPoints}
            accent="text-accent"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <rect x="5" y="7" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7V4M9 4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="9.5" cy="12" r="1.3" fill="currentColor" />
                <circle cx="14.5" cy="12" r="1.3" fill="currentColor" />
                <path d="M9.5 15.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          >
            <div className="mt-1 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <span
                  key={c.title}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${c.tint}`}
                >
                  {c.icon}
                  {c.title}
                </span>
              ))}
            </div>
          </AudienceCard>
        </div>
      </Reveal>
    </section>
  )
}
