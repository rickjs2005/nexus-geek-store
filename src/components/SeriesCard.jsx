import { motion } from 'framer-motion'

// Pôster de série estilo streaming: foto real de cenário + overlay neon, nota,
// temporadas, gênero e botão assistir. Sem animes.
export default function SeriesCard({ item, index, sound, ctaLabel = 'Assistir', brand = 'Nexus Originals' }) {
  const meta = item.seasons || item.platform
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group"
    >
      <div
        onMouseEnter={sound?.hover}
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-white/30"
        style={{ boxShadow: 'none' }}
        onMouseOver={(e) => (e.currentTarget.style.boxShadow = `0 0 30px ${item.accent}44`)}
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
          <div
            className="absolute inset-0 opacity-50 mix-blend-overlay"
            style={{ background: `linear-gradient(160deg, ${item.accent}33, transparent 60%)` }}
          />
          <div className="scanlines absolute inset-0" />

          {/* topo: nota + temporadas */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <span className="flex items-center gap-1 rounded-md border border-white/20 bg-black/50 px-2 py-1 font-tech text-xs font-bold text-white backdrop-blur">
              <Star /> {item.rating}
            </span>
            <span className="rounded-md border border-white/20 bg-black/50 px-2 py-1 font-tech text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
              {meta}
            </span>
          </div>

          {/* selo originals */}
          <div className="absolute left-3 top-12">
            <span
              className="font-display text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: item.accent, textShadow: `0 0 10px ${item.accent}` }}
            >
              ◆ {brand}
            </span>
          </div>

          {/* base: info */}
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
            <div
              className="font-tech text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: item.accent }}
            >
              {item.genre}
            </div>
            <h3 className="font-display text-xl font-black uppercase leading-none text-white">
              {item.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-white/55">{item.blurb}</p>

            <button
              onClick={sound?.click}
              onMouseEnter={sound?.hover}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-cta/60 bg-cta/15 py-2.5 font-tech text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-cta hover:bg-cta/25 hover:shadow-neon-cta"
            >
              <Play /> {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffd400" stroke="#ffd400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
function Play() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
