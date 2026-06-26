import { SectionHeading } from './Section.jsx'
import ProductCard from './ProductCard.jsx'
import ScrollRow from './ScrollRow.jsx'
import { heroes } from '../data/products.js'

export default function HeroesCollection({ sound }) {
  return (
    <section id="heroes" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute -left-20 top-40 h-80 w-80 bg-cyber-cyan/20" />
      <div className="container-x relative">
        <SectionHeading
          kicker="Super Heroes Collection"
          title="Heróis"
          highlight="lendários"
          accent="#00C2FF"
          desc="Estátuas e action figures dos maiores heróis e vilões das HQs e do cinema — emblema icônico, silhueta de colecionável e base iluminada. Arraste para explorar."
        />

        <ScrollRow sound={sound} accent="#00C2FF">
          {heroes.map((item, i) => (
            <div key={item.id} className="w-[72vw] shrink-0 snap-start xs:w-64 sm:w-72">
              <ProductCard item={item} index={i} sound={sound} />
            </div>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
