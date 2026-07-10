import { useState, type CSSProperties } from 'react'
import Reveal from './Reveal'
import HumanRobotHead, { type Side } from './HumanRobotHead'

const humanPoints = [
  'Sim Studio viewport — a clean 3D workcell inspired by Gazebo and Isaac Sim',
  'Flow Builder — program robots by connecting visual blocks, then press Play',
  'Drag the interactive marker and watch real-time IK follow your hand',
  'Reach analysis, face mating, and measuring tools built into the scene',
]

const agentPoints = [
  'Enhanced MCP server with very low-level access — agents can do anything a human can',
  'gRPC RobotControlService: MoveToPose, ControlGripper, SavePose, GetTcp and more',
  'WebSocket SDK for motion simulation, pose stores, and scene actions',
  'Every block, pose, and scene option exposed as a callable tool',
]

const iconStroke = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const

const capabilities = [
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

/**
 * One pointer = one card. When its side is hovered the cards "pop up" with a
 * staggered lift; when the other side is hovered they dim back. Below lg there
 * is no hover, so cards just sit in their resting state (ponytail: hover is a
 * desktop enhancement, tap still sets the side on touch via pointerdown).
 */
function PointCard({
  text,
  mine,
  side,
  index,
  accent,
}: {
  text: string
  mine: Exclude<Side, null>
  side: Side
  index: number
  accent: string
}) {
  const active = side === mine
  const dim = side !== null && side !== mine
  const style: CSSProperties = {
    transitionDelay: `${index * 70}ms`,
    transform: active ? 'translateY(-6px) scale(1.03)' : dim ? 'scale(0.97)' : undefined,
    opacity: dim ? 0.4 : 1,
  }
  return (
    <div
      style={style}
      className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-500 ${
        active ? 'border-accent/40 shadow-xl' : 'border-line'
      }`}
    >
      <Check className={accent} />
      <span className="text-sm leading-relaxed text-ink-soft">{text}</span>
    </div>
  )
}

function ColumnHeader({
  side,
  mine,
  tint,
  icon,
  title,
  blurb,
  align,
}: {
  side: Side
  mine: Exclude<Side, null>
  tint: string
  icon: React.ReactNode
  title: string
  blurb: string
  align?: 'right'
}) {
  const dim = side !== null && side !== mine
  return (
    <div
      className={`transition-all duration-500 ${dim ? 'opacity-40' : 'opacity-100'} ${align === 'right' ? 'lg:text-right' : ''}`}
    >
      <div className={`flex items-center gap-3 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-ink-soft">{blurb}</p>
    </div>
  )
}

export default function AudienceSection() {
  const [side, setSide] = useState<Side>(null)

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
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,3.6fr)_minmax(0,3.2fr)]">
          {/* human column */}
          <div data-side="human" data-active={side === 'human'} className="order-2 flex flex-col gap-3 lg:order-1">
            <ColumnHeader
              side={side}
              mine="human"
              tint="bg-warm-soft text-warm"
              title="For humans"
              blurb="A friendly desktop studio where designing a workcell feels like sketching, not scripting."
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              }
            />
            {humanPoints.map((p, i) => (
              <PointCard key={p} text={p} mine="human" side={side} index={i} accent="text-warm" />
            ))}
          </div>

          {/* 3D head */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="aspect-square w-full">
              <HumanRobotHead onSide={setSide} />
            </div>
            <p className="mt-2 hidden text-center text-sm text-ink-faint lg:block">
              Hover a side — the head follows your cursor
            </p>
          </div>

          {/* agent column */}
          <div data-side="robot" data-active={side === 'robot'} className="order-3 flex flex-col gap-3">
            <ColumnHeader
              side={side}
              mine="robot"
              align="right"
              tint="bg-accent-soft text-accent"
              title="For agents"
              blurb="Not an afterthought API — the entire simulator is a first-class tool surface for AI agents."
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <rect x="5" y="7" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7V4M9 4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="9.5" cy="12" r="1.3" fill="currentColor" />
                  <circle cx="14.5" cy="12" r="1.3" fill="currentColor" />
                  <path d="M9.5 15.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              }
            />
            {agentPoints.map((p, i) => (
              <PointCard key={p} text={p} mine="robot" side={side} index={i} accent="text-accent" />
            ))}
            <div
              className={`mt-1 flex flex-wrap gap-2 transition-all duration-500 lg:justify-end ${
                side === 'human' ? 'opacity-40' : 'opacity-100'
              }`}
            >
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
          </div>
        </div>
      </Reveal>
    </section>
  )
}
