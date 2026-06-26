import { SectionHeading } from './Section.jsx'
import SeriesCard from './SeriesCard.jsx'
import ScrollRow from './ScrollRow.jsx'
import { series } from '../data/products.js'

export default function SeriesSection({ sound }) {
  return (
    <section id="series" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute left-0 top-40 h-96 w-96 bg-cyber-cyan/15" />
      <div className="container-x relative">
        <SectionHeading
          kicker="Sci-Fi & Fantasy Series"
          title="Séries para"
          highlight="maratonar"
          accent="#00C2FF"
          desc="Universos de ficção científica e fantasia que viraram febre. Pôsteres cinematográficos das Nexus Originals — sem animes, só épico puro."
        />

        <ScrollRow sound={sound} accent="#00C2FF">
          {series.map((item, i) => (
            <div key={item.id} className="w-[64vw] shrink-0 snap-start xs:w-56 sm:w-64">
              <SeriesCard item={item} index={i} sound={sound} />
            </div>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
