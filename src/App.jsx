import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HeroesCollection from './components/HeroesCollection.jsx'
import ComicsSection from './components/ComicsSection.jsx'
import SeriesSection from './components/SeriesSection.jsx'
import GamesSection from './components/GamesSection.jsx'
import GamingSetup from './components/GamingSetup.jsx'
import TechGear from './components/TechGear.jsx'
import Footer from './components/Footer.jsx'
import KonamiEgg from './components/KonamiEgg.jsx'
import { useSound } from './hooks/useSound.js'

export default function App() {
  const sound = useSound()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [cursor, setCursor] = useState({ x: -200, y: -200, down: false })

  // glow que segue o cursor (desktop)
  useEffect(() => {
    const onMove = (e) => setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // efeito de "corte de espada" ao clicar (toque viral pro tema gamer)
  useEffect(() => {
    const onDown = (e) => {
      if (e.target.closest('input, textarea, select')) return
      const s = document.createElement('span')
      s.className = 'nx-slash'
      s.style.left = `${e.clientX}px`
      s.style.top = `${e.clientY}px`
      document.body.appendChild(s)
      setTimeout(() => s.remove(), 480)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])

  return (
    <div className="relative min-h-screen bg-void">
      {/* barra de progresso de scroll */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-pink"
      />

      {/* fundo fixo: poeira cósmica cinematográfica (sem HUD/grade) */}
      <ParticleBackground />

      {/* glow do cursor (só visível em telas com mouse) */}
      <div
        className="pointer-events-none fixed z-0 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          background: 'radial-gradient(circle, rgba(108,59,255,0.12), transparent 60%)',
        }}
      />

      <Navbar sound={sound} />

      <main className="relative z-10">
        <Hero sound={sound} />
        <HeroesCollection sound={sound} />
        <ComicsSection sound={sound} />
        <SeriesSection sound={sound} />
        <GamesSection sound={sound} />
        <GamingSetup sound={sound} />
        <TechGear sound={sound} />
      </main>

      <Footer sound={sound} />

      <KonamiEgg sound={sound} />
    </div>
  )
}
