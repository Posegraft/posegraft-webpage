import { useState } from 'react'
import Reveal from './Reveal'
import { BRANDS, CAD_FORMATS } from '../data/specs'

const shipped = [
  { label: 'Robots', items: BRANDS.map((b) => b.name) },
  { label: 'Gripper', items: ['Robotiq 2F-85'] },
  { label: 'Conveyor', items: ['Generic Conveyor'] },
  { label: 'Primitives', items: ['Box', 'Sphere', 'Cylinder', 'Asphalt', 'Assembly'] },
  { label: 'Imports', items: CAD_FORMATS },
]

type Preset = { id: string; label: string; kind: string; video: string }
const presets: Preset[] = [
  { id: 'fixed', label: 'Fixed Base', kind: 'fixed', video: '/videos/fixed.webm' },
  { id: 'slide', label: 'Linear Slide', kind: 'linear', video: '/videos/liner.webm' },
  { id: 'hinge', label: 'Hinge', kind: 'rotary', video: '/videos/Hinge.webm' },
  { id: 'turntable', label: 'Turntable', kind: 'rotary', video: '/videos/rotation.webm' },
]

export default function Mechanisms() {
  const [preset, setPreset] = useState(presets[3])

  return (
    <section
      id="equipment"
      className="mx-auto max-w-page scroll-mt-16 px-5 py-24 md:px-8 lg:px-12"
    >
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Automation equipment, not just robot arms.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Arms, grippers, and conveyors come in the box. Everything else a real cell needs — your
          pedestal, your SMPS enclosure, your custom feeder — you build in the Mechanism Builder.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 flex flex-col gap-3 border-y border-line py-6">
          {shipped.map((g) => (
            <div key={g.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="w-24 shrink-0 text-sm font-semibold text-ink">{g.label}</span>
              <span className="font-mono text-sm text-ink-soft">{g.items.join(' · ')}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-ink">
              Mechanism Builder: import a mesh, give it a joint.
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Any STEP or URDF lands in the scene as geometry. Attach a Relationship — pick a
              preset or define your own axis and limits — and it becomes working equipment. A human
              does it in the Properties panel; an agent does it with{' '}
              <span className="font-mono text-sm">posegraft_mechanism_create</span>. Same
              mechanism, same validation.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              That is how a static pedestal becomes a lift, a cabinet door becomes a test rig, and
              a one-off feeder nobody sells a model for becomes part of your simulation. Conveyors
              work the same way once placed: start and stop the belt, teach named stops, and send
              payloads between them from any program.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Mechanism presets">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={p.id === preset.id}
                  onClick={() => setPreset(p)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    p.id === preset.id
                      ? 'border-accent-surface bg-accent-surface text-white'
                      : 'border-line bg-card text-ink-soft hover:border-accent/40 hover:text-accent'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* the stage: real product footage of the chosen preset in motion */}
          <div className="rounded-xl border border-line bg-mist/60 p-4">
            <video
              key={preset.id}
              src={preset.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-lg border border-line bg-steel/30 object-cover dark:brightness-90"
            />
            <div className="mt-4 border-t border-line pt-4 text-center font-mono text-xs text-ink-soft">
              posegraft_mechanism_create{' '}
              <span className="text-ink-faint">{`{ "kind": "${preset.kind}" }`}</span>
              {preset.id === 'fixed' && <span className="text-ink-faint"> · anchored, by design</span>}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
