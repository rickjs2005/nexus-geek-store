import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Emblem } from './HeroVisual.jsx'

// Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A  → "GOD MODE" com chuva de emblemas.
const SEQ = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

const EMS = [
  { e: 'bat', c: '#ffd400' },
  { e: 'superman', c: '#2b6bff' },
  { e: 'ironman', c: '#ffb000' },
  { e: 'spider', c: '#ff2b3b' },
  { e: 'cap', c: '#2b6bff' },
  { e: 'flash', c: '#ff2b2b' },
  { e: 'hulk', c: '#4cd137' },
  { e: 'thor', c: '#7fd4ff' },
  { e: 'wonderwoman', c: '#ffb000' },
  { e: 'panther', c: '#b026ff' },
  { e: 'joker', c: '#2fae4e' },
  { e: 'homelander', c: '#2b6bff' },
]

// pseudo-random determinístico por índice/seed (evita travar com Math.random só p/ layout)
function rng(seed) {
  const x = Math.sin(seed * 99.13) * 43758.5453
  return x - Math.floor(x)
}

export default function KonamiEgg({ sound }) {
  const [run, setRun] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let pos = 0
    let timer
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase()
      if (k === SEQ[pos]) {
        pos++
        if (pos === SEQ.length) {
          pos = 0
          setRun((r) => r + 1)
          setActive(true)
          sound?.click?.()
          window.clearTimeout(timer)
          timer = window.setTimeout(() => setActive(false), 5400)
        }
      } else {
        pos = k === SEQ[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [sound])

  const drops = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const em = EMS[i % EMS.length]
        const s = run * 100 + i
        return {
          ...em,
          x: rng(s) * 100,
          size: 42 + rng(s + 1) * 72,
          delay: rng(s + 2) * 1.8,
          dur: 2.3 + rng(s + 3) * 2.2,
          rot: (rng(s + 4) * 2 - 1) * 360,
        }
      }),
    [run],
  )

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        >
          {/* flash inicial */}
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-white"
          />
          <div className="absolute inset-0 bg-void/75 backdrop-blur-sm" />

          {/* chuva de emblemas */}
          {drops.map((d, i) => (
            <motion.div
              key={i}
              initial={{ y: '-18vh', opacity: 0, rotate: 0 }}
              animate={{ y: '118vh', opacity: [0, 1, 1, 0.7], rotate: d.rot }}
              transition={{ duration: d.dur, delay: d.delay, ease: 'linear', repeat: Infinity }}
              style={{
                position: 'absolute',
                left: `${d.x}%`,
                width: d.size,
                height: d.size,
                filter: `drop-shadow(0 0 10px ${d.c})`,
              }}
            >
              <Emblem id={d.e} accent={d.c} />
            </motion.div>
          ))}

          {/* texto central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.5em' }}
              transition={{ duration: 0.6 }}
              className="neon-text font-tech text-sm font-bold uppercase text-cyber-cyan sm:text-lg"
            >
              ⚔ Konami Code ⚔
            </motion.div>
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', damping: 9, stiffness: 120 }}
              className="mt-4 font-display text-5xl font-black text-white sm:text-8xl"
              style={{ textShadow: '0 0 40px #6C3BFF' }}
            >
              GOD MODE
              <br />
              <span className="text-gradient">ATIVADO</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-6 font-display text-2xl font-black sm:text-3xl"
              style={{ color: '#FF4D4D', textShadow: '0 0 20px rgba(255,77,77,0.7)' }}
            >
              +30 ⚔️ VIDAS · CUPOM SECRETO: KONAMI99
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
