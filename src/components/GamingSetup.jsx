import { SectionHeading, Marquee } from './Section.jsx'
import ProductCard from './ProductCard.jsx'
import { setup } from '../data/products.js'

export default function GamingSetup({ sound }) {
  return (
    <section id="setup" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute right-0 top-20 h-96 w-96 bg-cyber-pink/20" />

      <div className="mb-16">
        <Marquee text="PC MASTER RACE" accent="#6C3BFF" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          kicker="Gaming Setup & PC Master Race"
          title="Setup"
          highlight="definitivo"
          accent="#6C3BFF"
          desc="Periféricos de elite com per-key RGB, sensores flagship e materiais premium. Monte a estação de batalha que vira capa de feed."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {setup.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} sound={sound} />
          ))}
        </div>
      </div>
    </section>
  )
}
