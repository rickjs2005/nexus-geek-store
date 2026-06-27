import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Heróis', href: '#heroes' },
  { label: 'Quadrinhos', href: '#comics' },
  { label: 'Séries', href: '#series' },
  { label: 'Games', href: '#games' },
  { label: 'Setup', href: '#setup' },
  { label: 'Gear', href: '#gear' },
]

export default function Navbar({ sound }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-void/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <a
          href="#top"
          onMouseEnter={sound.hover}
          onClick={sound.click}
          className="group flex items-center gap-2.5"
        >
          <motion.span
            animate={{
              scale: [1, 1.12, 1],
              boxShadow: [
                '0 0 0px rgba(0,194,255,0.0)',
                '0 0 18px 2px rgba(0,194,255,0.85)',
                '0 0 0px rgba(0,194,255,0.0)',
              ],
            }}
            transition={{ duration: 6, times: [0, 0.06, 0.16], repeat: Infinity, ease: 'easeOut' }}
            className="grid h-9 w-9 place-items-center rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/10 font-display text-lg font-black text-cyber-cyan shadow-neon-cyan"
          >
            N
          </motion.span>
          <span className="font-display text-xl font-black tracking-widest text-white">
            NE<span className="text-gradient">XUS</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={sound.hover}
              onClick={sound.click}
              className="relative rounded-lg px-4 py-2 font-tech text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-cyber-cyan"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              sound.setEnabled(!sound.enabled)
              sound.click()
            }}
            onMouseEnter={sound.hover}
            className="ml-2 grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-cyber-cyan/50 hover:text-cyber-cyan"
            aria-label="Alternar som da interface"
            title={sound.enabled ? 'Som UI: ligado' : 'Som UI: desligado'}
          >
            {sound.enabled ? <SoundOn /> : <SoundOff />}
          </button>
          <a
            href="#heroes"
            onMouseEnter={sound.hover}
            onClick={sound.click}
            className="btn-cta ml-2 !px-5 !py-2"
          >
            Entrar
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white lg:hidden"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => {
                    setOpen(false)
                    sound.click()
                  }}
                  className="rounded-lg px-4 py-3 font-tech text-base font-semibold uppercase tracking-widest text-white/80 hover:bg-white/5 hover:text-cyber-cyan"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => sound.setEnabled(!sound.enabled)}
                className="mt-1 flex items-center gap-2 rounded-lg px-4 py-3 text-left font-tech text-base font-semibold uppercase tracking-widest text-white/80 hover:bg-white/5"
              >
                {sound.enabled ? <SoundOn /> : <SoundOff />}
                Som UI: {sound.enabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function SoundOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}
function SoundOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="m22 9-6 6M16 9l6 6" />
    </svg>
  )
}
