import Nav from './components/Nav'
import Hero from './components/Hero'
import AudienceSection from './components/AudienceSection'
import Features from './components/Features'
import VideoStrip from './components/VideoStrip'
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
        <Features />
        <VideoStrip />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
