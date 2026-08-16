import Reveal from './Reveal'
import ComingSoonButton from './ComingSoonButton'

export default function FinalCta() {
  return (
    <section id="get-started" className="scroll-mt-16 pb-24">
      <Reveal className="mx-auto max-w-page px-5 md:px-8 lg:px-12">
        <div className="relative isolate overflow-hidden rounded-3xl bg-accent px-6 py-16 text-center md:px-12 md:py-20">
          {/* same viewport grid as the hero, re-tinted for the blue surface */}
          <div
            className="grid-bg pointer-events-none absolute inset-0 -z-10"
            style={{ '--grid-line': 'rgb(255 255 255 / 0.13)' } as React.CSSProperties}
            aria-hidden="true"
          />
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.12] font-bold tracking-tight text-white md:text-5xl">
            Give your agents a simulator they can actually use
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Open a scene, connect an agent, and watch robotics work happen — for humans, for agents,
            and for both at once.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ComingSoonButton className="rounded-full bg-white px-7 py-3 text-base font-semibold text-accent transition-colors hover:bg-white/90">
              Download for Linux
            </ComingSoonButton>
            <a
              href="https://calendly.com/posegraft/30min"
              className="rounded-full border border-white/50 px-7 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Book a demo
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
