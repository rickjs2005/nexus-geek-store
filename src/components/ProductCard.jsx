import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroVisual from './HeroVisual.jsx'

// Card com tilt 3D real (parallax por mouse), glow dinâmico que segue o cursor,
// brilho holográfico e visual de produto gerado por gradiente/SVG (placeholder premium).
export default function ProductCard({ item, index, sound }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({
      rx: (0.5 - py) * 16, // rotateX
      ry: (px - 0.5) * 16, // rotateY
      gx: px * 100,
      gy: py * 100,
      active: true,
    })
  }

  const reset = () => setStyle((s) => ({ ...s, rx: 0, ry: 0, gx: 50, gy: 50, active: false }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="[perspective:1200px]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onMouseEnter={sound?.hover}
        className="tilt-card group relative cursor-pointer rounded-2xl"
        style={{
          transform: `rotateX(${style.rx}deg) rotateY(${style.ry}deg) scale(${style.active ? 1.02 : 1})`,
        }}
      >
        {/* borda gradiente */}
        <div
          className="absolute -inset-px rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${item.accent}, ${item.accent2})`,
          }}
        />

        <div className="relative overflow-hidden rounded-2xl bg-panel">
          {/* visual do produto */}
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ transform: 'translateZ(40px)' }}
          >
            {item.image ? (
              <ProductPhoto item={item} />
            ) : item.emblem ? (
              <HeroVisual item={item} />
            ) : (
              <ProductVisual item={item} />
            )}

            {/* glow que segue o cursor */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: style.active ? 0.9 : 0,
                background: `radial-gradient(420px circle at ${style.gx}% ${style.gy}%, ${item.accent}40, transparent 45%)`,
              }}
            />

            {/* faixa holográfica */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(115deg, transparent 30%, ${item.accent}22 48%, transparent 60%)`,
              }}
            />

            {/* badge raridade / spec */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              <span
                className="rounded-md px-2.5 py-1 font-tech text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md"
                style={{ color: item.accent, background: `${item.accent}1a`, border: `1px solid ${item.accent}55` }}
              >
                {item.tag}
              </span>
            </div>
            {(item.rarity || item.spec) && (
              <div className="absolute right-3 top-3">
                <span className="rounded-md border border-white/15 bg-black/40 px-2.5 py-1 font-tech text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
                  {item.rarity || item.spec}
                </span>
              </div>
            )}
          </div>

          {/* infos */}
          <div className="relative space-y-3 p-5" style={{ transform: 'translateZ(24px)' }}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-bold leading-tight text-white">{item.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/55">{item.blurb}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="font-display text-xl font-black" style={{ color: item.accent }}>
                {item.price}
              </span>
              <button
                onClick={sound?.click}
                onMouseEnter={sound?.hover}
                className="flex items-center gap-1.5 rounded-lg border border-cta/60 bg-cta/15 px-3.5 py-2 font-tech text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-cta hover:bg-cta/25 hover:shadow-neon-cta"
              >
                + Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Foto real do produto com tratamento neon (tint do accent, gradiente inferior,
// zoom no hover e scanlines) para integrar à estética cyberpunk.
function ProductPhoto({ item }) {
  return (
    <div className="absolute inset-0 bg-panel">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      {/* tint + gradiente para casar com o tema e dar contraste ao texto */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, #060a18 4%, rgba(6,10,24,0.1) 45%, transparent 70%), radial-gradient(130% 80% at 50% 0%, ${item.accent}22, transparent 60%)`,
        }}
      />
      {/* leve flash de cor no hover */}
      <div
        className="absolute inset-0 opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: item.accent }}
      />
      <div className="scanlines absolute inset-0" />
    </div>
  )
}

// Visual procedural: silhueta + grade + núcleo brilhante. Sem imagens externas.
function ProductVisual({ item }) {
  return (
    <div className="absolute inset-0">
      {/* fundo gradiente radial */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 20%, ${item.accent2}33, transparent 55%), radial-gradient(100% 80% at 50% 110%, ${item.accent}40, #060a18 70%)`,
        }}
      />
      {/* grade HUD */}
      <div className="grid-overlay absolute inset-0 opacity-40" />

      {/* glow central pulsante */}
      <div
        className="glow-blob absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ background: item.accent, opacity: 0.5 }}
      />

      {/* forma central */}
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={item.accent} />
            <stop offset="1" stopColor={item.accent2} />
          </linearGradient>
          <filter id={`blur-${item.id}`}>
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* hexágono / cristal central */}
        <g
          fill="none"
          stroke={`url(#grad-${item.id})`}
          strokeWidth="1.5"
          filter={`url(#blur-${item.id})`}
          opacity="0.95"
        >
          <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" />
          <polygon points="100,70 128,86 128,118 100,134 72,118 72,86" />
          <line x1="100" y1="40" x2="100" y2="70" />
          <line x1="150" y1="70" x2="128" y2="86" />
          <line x1="50" y1="70" x2="72" y2="86" />
          <line x1="100" y1="160" x2="100" y2="134" />
        </g>

        {/* núcleo */}
        <circle cx="100" cy="100" r="14" fill={`url(#grad-${item.id})`} />
        <circle cx="100" cy="100" r="22" fill="none" stroke={item.accent} strokeWidth="0.6" opacity="0.6" />

        {/* base/pedestal */}
        <ellipse cx="100" cy="205" rx="60" ry="12" fill={`url(#grad-${item.id})`} opacity="0.18" />
        <ellipse cx="100" cy="205" rx="60" ry="12" fill="none" stroke={item.accent} strokeWidth="0.8" opacity="0.5" />

        {/* partículas */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={50 + i * 20}
            cy={180 - (i % 3) * 30}
            r={1.4}
            fill={item.accent}
            opacity="0.8"
          />
        ))}
      </svg>

      {/* scanline sutil */}
      <div className="scanlines absolute inset-0" />
    </div>
  )
}
