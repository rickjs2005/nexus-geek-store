import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Conta de 0 até o número (preservando o sufixo: "240+", "4K"...). Valores sem
// número (ex.: "∞") aparecem direto.
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const m = String(value).match(/^(\d+)(.*)$/)
    if (!inView || !m) return
    const target = parseInt(m[1], 10)
    const suffix = m[2]
    let raf
    const start = performance.now()
    const dur = 1300
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * target) + suffix)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}

// Carrega o WebGL só quando precisa (evita travar o primeiro paint).
const BlackHoleScene = lazy(() => import('./BlackHoleScene.jsx'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ sound }) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* buraco negro cinematográfico ao fundo */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <BlackHoleScene />
        </Suspense>
      </div>

      {/* vinheta para legibilidade */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-void/40 via-transparent to-void" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 flex min-h-[100svh] flex-col items-center justify-center pt-20 text-center"
      >
        <motion.div variants={item} className="hud-pill animate-flicker mb-7">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-neon-cyan" />
          Sistema online · Coleção 2099
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          ENTRE NO
          <br />
          <span className="text-gradient neon-text">UNIVERSO GEEK</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Heróis, tecnologia e cultura geek num só lugar — com um design digno de um{' '}
          <span className="text-white">blockbuster</span>. Coleções, setup gamer e tech gear
          numa experiência visual cinematográfica.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#heroes" onMouseEnter={sound.hover} onClick={sound.click} className="btn-cta">
            Explorar coleção
            <Arrow />
          </a>
          <a href="#setup" onMouseEnter={sound.hover} onClick={sound.click} className="btn-ghost">
            Ver setup gamer
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-tech"
        >
          {[
            ['240+', 'Itens raros'],
            ['4K', 'Render premium'],
            ['∞', 'RGB lifestyle'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl font-black text-white">
                <CountUp value={n} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/45">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-cyber-cyan"
          />
        </div>
      </motion.div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
