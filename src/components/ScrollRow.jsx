import { useRef } from 'react'

// Trilha de rolagem horizontal com snap + botões de seta (desktop) e fades nas bordas.
// Os filhos já devem vir com largura fixa (shrink-0 w-...).
export default function ScrollRow({ children, sound, accent = '#00C2FF' }) {
  const ref = useRef(null)

  const scrollByDir = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent sm:w-16" />

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-5 pt-2"
      >
        {children}
      </div>

      {/* setas (desktop) */}
      <button
        onClick={() => {
          scrollByDir(-1)
          sound?.click()
        }}
        onMouseEnter={sound?.hover}
        aria-label="Anterior"
        className="absolute -left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-void/80 text-white backdrop-blur transition-all hover:scale-110 md:grid"
        style={{ boxShadow: `0 0 18px ${accent}33` }}
      >
        <Chevron dir="left" />
      </button>
      <button
        onClick={() => {
          scrollByDir(1)
          sound?.click()
        }}
        onMouseEnter={sound?.hover}
        aria-label="Próximo"
        className="absolute -right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-void/80 text-white backdrop-blur transition-all hover:scale-110 md:grid"
        style={{ boxShadow: `0 0 18px ${accent}33` }}
      >
        <Chevron dir="right" />
      </button>
    </div>
  )
}

function Chevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  )
}
