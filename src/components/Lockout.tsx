import Reveal from './Reveal'

const elsewhere = [
  { line: 'A screenshot, if it’s lucky.', detail: 'pixels in, guesses out' },
  { line: 'A REST endpoint with six verbs.', detail: 'move, stop, pray' },
  { line: 'No way to know if the move landed.', detail: 'fire and forget' },
  { line: 'No selection. No scene graph. No undo.', detail: 'one mistake, start over' },
]

const here = [
  {
    id: 'posegraft://scene/revision',
    line: 'Reads the scene, addressably — every node, every pose, versioned.',
  },
  {
    id: 'posegraft_scene_validate',
    line: 'Checks hierarchy, relations, mechanisms, and geometry before acting.',
  },
  {
    id: 'posegraft_scene_undo',
    line: 'Steps back one committed transaction. Like a human would.',
  },
  {
    id: 'revision_conflict',
    line: 'Gets a typed error when it races you — never a corrupted scene.',
  },
]

/** The tension act: what an agent gets everywhere else vs. here. Dark band on purpose. */
export default function Lockout() {
  return (
    <section id="agents" className="scroll-mt-16 bg-terminal py-24 text-white">
      <div className="mx-auto max-w-page px-5 md:px-8 lg:px-12">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Agents have been locked out of every simulator.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Simulation was built for people at desks. When agents arrived, they got a keyhole to
            look through. This is what the difference looks like.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:border-r md:border-white/10 md:pr-12">
              <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                Anywhere else
              </p>
              <ul className="mt-6 space-y-6">
                {elsewhere.map((e) => (
                  <li key={e.line} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-base text-slate-400" aria-hidden="true">
                      ✕
                    </span>
                    <div>
                      <p className="text-slate-300">{e.line}</p>
                      <p className="mt-1 font-mono text-xs text-slate-400">{e.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:pl-12">
              <p className="font-mono text-xs tracking-widest text-live-lit uppercase">
                In PoseGraft
              </p>
              <ul className="mt-6 space-y-6">
                {here.map((h) => (
                  <li key={h.id} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-base text-live-lit" aria-hidden="true">
                      ✓
                    </span>
                    <div>
                      <p className="font-mono text-sm text-white">{h.id}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">{h.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <p className="mt-14 max-w-2xl text-slate-300">
            The keyhole is gone. What replaced it is below —{' '}
            <a href="#tools" className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
              the server’s actual tool list
            </a>
            , not a curated demo API.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
