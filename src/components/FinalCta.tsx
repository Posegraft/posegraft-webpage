import Reveal from './Reveal'
import ComingSoonButton from './ComingSoonButton'

export default function FinalCta() {
  return (
    <section id="get-started" className="scroll-mt-20 px-5 pb-24">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-accent px-6 py-20 text-center md:px-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            Give your agents a simulator they can actually use
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-indigo-100">
            Open a scene, connect an agent, and watch robotics work happen — for humans, for
            agents, and for both at once.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ComingSoonButton className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-accent shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Download for Linux
            </ComingSoonButton>
            <a
              href="#agents"
              className="rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore the agent API
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
