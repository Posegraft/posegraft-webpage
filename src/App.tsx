import Nav from './components/Nav'
import Hero from './components/Hero'
import AudienceSection from './components/AudienceSection'
import AgentSuperpowers from './components/AgentSuperpowers'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AudienceSection />
        <AgentSuperpowers />
        <Features />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
