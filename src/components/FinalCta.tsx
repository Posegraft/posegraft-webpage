import Reveal from './Reveal'
import ComingSoonButton from './ComingSoonButton'
import { TOOL_COUNT } from '../data/tools'

export default function FinalCta() {
  return (
    <section id="get-started" className="scroll-mt-16 border-t border-line py-24">
      <Reveal className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Hand over the keys.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Open a scene. Connect an agent. Watch the revision counter climb.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ComingSoonButton className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-deep">
            Download for Linux
          </ComingSoonButton>
          <a
            href="https://calendly.com/posegraft/30min"
            className="rounded-lg border border-line bg-white px-6 py-3 text-center text-base font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Book a demo
          </a>
          <a
            href="#tools"
            className="px-2 py-3 text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            or read all {TOOL_COUNT} tools first
          </a>
        </div>
      </Reveal>
    </section>
  )
}
