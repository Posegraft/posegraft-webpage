import DotField from './components/DotField'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Lockout from './components/Lockout'
import ToolIndex from './components/ToolIndex'
import AgentSuperpowers from './components/AgentSuperpowers'
import TwoOperators from './components/TwoOperators'
import Mechanisms from './components/Mechanisms'
import ForHumans from './components/ForHumans'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <DotField />
      <Nav />
      <main>
        <Hero />
        <Lockout />
        <ToolIndex />
        <AgentSuperpowers />
        <TwoOperators />
        <Mechanisms />
        <ForHumans />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
