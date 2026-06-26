import { SectionHeading } from './Section.jsx'
import ProductCard from './ProductCard.jsx'
import { gear } from '../data/products.js'

export default function TechGear({ sound }) {
  return (
    <section id="gear" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute left-1/4 top-10 h-80 w-80 bg-cyber-violet/20" />
      <div className="container-x relative">
        <SectionHeading
          kicker="Tech Gear / Accessories"
          title="Tech gear &"
          highlight="acessórios"
          accent="#00FFB2"
          desc="Os detalhes que completam o lifestyle nerd-tech: superfícies holográficas, hubs iluminados e ergonomia de outro mundo."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gear.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} sound={sound} />
          ))}
        </div>
      </div>
    </section>
  )
}
