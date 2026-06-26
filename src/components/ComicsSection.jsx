import { SectionHeading, Marquee } from './Section.jsx'
import ComicCard from './ComicCard.jsx'
import ScrollRow from './ScrollRow.jsx'
import { comics } from '../data/products.js'

export default function ComicsSection({ sound }) {
  return (
    <section id="comics" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute right-0 top-32 h-80 w-80 bg-cyber-violet/20" />

      <div className="mb-16">
        <Marquee text="VARIANT COVERS · EDIÇÕES RARAS" accent="#6C3BFF" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          kicker="Comics & Graphic Novels"
          title="Quadrinhos"
          highlight="de colecionador"
          accent="#6C3BFF"
          desc="Capas variantes, edições limitadas e graphic novels dos seus heróis e vilões favoritos. Pop-art, halftone e muita atitude."
        />

        <ScrollRow sound={sound} accent="#6C3BFF">
          {comics.map((item, i) => (
            <div key={item.id} className="w-[58vw] shrink-0 snap-start xs:w-52 sm:w-60">
              <ComicCard item={item} index={i} sound={sound} />
            </div>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
