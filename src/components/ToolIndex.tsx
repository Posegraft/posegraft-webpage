import { useState } from 'react'
import Reveal from './Reveal'
import { TOOL_GROUPS, TOOL_COUNT } from '../data/tools'

function ToolName({ name }: { name: string }) {
  const short = name.replace(/^posegraft_/, '')
  return (
    <span className="font-mono text-[13px] leading-relaxed whitespace-nowrap">
      <span className="text-ink-faint">posegraft_</span>
      <span className="text-ink">{short}</span>
    </span>
  )
}

export default function ToolIndex() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="tools" className="scroll-mt-16 border-b border-line bg-mist/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Full access, itemised.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            {TOOL_COUNT} MCP tools, named exactly as the server exposes them. If you can do it in
            the studio’s core loop — scene, assets, mechanisms, motion, programs, measurement — an
            agent can call it.
          </p>
        </Reveal>

        <Reveal delay={150}>
          {/* minimized by default: category counts as the teaser, full index on demand */}
          <p className="mt-8 font-mono text-sm text-ink-soft">
            {TOOL_GROUPS.map((g) => `${g.name} ${g.tools.length}`).join(' · ')}
          </p>

          {expanded && (
            <div className="mt-6 divide-y divide-line border-y border-line">
              {TOOL_GROUPS.map((g) => (
                <div key={g.name} className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <div>
                    <p className="font-semibold text-ink">
                      {g.name}{' '}
                      <span className="ml-1 font-mono text-sm font-normal text-ink-faint">
                        {g.tools.length}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{g.blurb}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                    {g.tools.map((t) => (
                      <ToolName key={t} name={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
            className="mt-6 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {expanded ? 'Collapse the list' : `Show all ${TOOL_COUNT} tools`}
          </button>

          <p className="mt-8 font-mono text-sm text-ink-faint">
            MCP over stdio · plus a gRPC RobotControl API and a C++ SDK for everything that isn’t
            an agent.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
