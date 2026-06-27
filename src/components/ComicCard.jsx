import { useState } from 'react'
import { motion } from 'framer-motion'
import { Emblem } from './HeroVisual.jsx'

// Capa de quadrinho estilo pop-art: halftone, starburst, emblema do herói,
// faixa de título e selo de edição. 100% vetorial.
export default function ComicCard({ item, index, sound }) {
  const [coverOk, setCoverOk] = useState(true)
  const [coverSrc, setCoverSrc] = useState(item.cover)
  // tenta .jpg e cai pro .png antes de desistir (e voltar pro pop-art vetorial)
  const handleCoverError = () => {
    if (coverSrc && coverSrc.endsWith('.jpg')) setCoverSrc(coverSrc.replace(/\.jpg$/, '.png'))
    else setCoverOk(false)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group [perspective:1000px]"
    >
      <div
        onMouseEnter={sound?.hover}
        className="relative cursor-pointer rounded-xl transition-transform duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.03)]"
      >
        {/* borda gradiente */}
        <div
          className="absolute -inset-px rounded-xl opacity-70 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(140deg, ${item.accent}, ${item.accent2})` }}
        />

        <div className="relative overflow-hidden rounded-xl bg-panel">
          <div className="relative aspect-[3/4] overflow-hidden">
            {/* fundo da capa */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 80% at 50% 30%, ${item.accent}55, transparent 60%), linear-gradient(160deg, ${item.accent2}aa, #05070f 80%)`,
              }}
            />
            {/* halftone */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1.6px)',
                backgroundSize: '9px 9px',
              }}
            />

            {/* starburst atrás do emblema */}
            <svg viewBox="0 0 200 200" className="absolute left-1/2 top-[42%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-80">
              <g fill={item.accent} opacity="0.22">
                {Array.from({ length: 24 }).map((_, i) => (
                  <polygon key={i} points="100,100 96,0 104,0" transform={`rotate(${i * 15} 100 100)`} />
                ))}
              </g>
            </svg>

            {/* topo: selo da editora + preço */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2.5">
              <span className="font-display text-[10px] font-black tracking-[0.2em] text-white/90 drop-shadow">
                NEXUS<span style={{ color: item.accent }}>COMICS</span>
              </span>
              <span className="rounded border border-white/30 bg-black/40 px-2 py-0.5 font-tech text-[10px] font-bold text-white backdrop-blur">
                {item.price}
              </span>
            </div>

            {/* emblema (fallback procedural) */}
            <div
              className="absolute left-1/2 top-[40%] h-[46%] w-[64%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110"
              style={{ filter: `drop-shadow(0 0 14px ${item.accent}cc)`, transform: 'translateZ(40px)' }}
            >
              <Emblem id={item.emblem} accent={item.accent} />
            </div>

            {/* capa real (se houver) — cai no procedural acima se faltar/erro */}
            {item.cover && coverOk && (
              <img
                src={coverSrc}
                alt={item.title}
                loading="lazy"
                onError={handleCoverError}
                className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {/* selo de edição */}
            <div className="absolute left-3 top-12 z-10 grid h-12 w-12 place-items-center rounded-full border-2 border-white/70 bg-black/50 backdrop-blur">
              <div className="text-center leading-none">
                <div className="font-tech text-[8px] uppercase tracking-widest text-white/60">Issue</div>
                <div className="font-display text-sm font-black text-white">#{item.issue}</div>
              </div>
            </div>

            {/* faixa de título */}
            <div className="absolute inset-x-0 bottom-0 z-10">
              <div className="-skew-y-2 border-t-2 bg-gradient-to-t from-black/95 to-black/60 px-4 pb-5 pt-4" style={{ borderColor: item.accent }}>
                <div className="skew-y-2">
                  <h3 className="font-display text-base font-black uppercase leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-tech text-[11px] italic text-white/60">{item.tagline}</p>
                </div>
              </div>
            </div>

            <div className="scanlines absolute inset-0" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
