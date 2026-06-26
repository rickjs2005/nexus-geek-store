import { useState } from 'react'
import { SectionHeading, Marquee } from './Section.jsx'
import SeriesCard from './SeriesCard.jsx'
import ScrollRow from './ScrollRow.jsx'
import { games } from '../data/products.js'

const FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'acao', label: 'Ação' },
  { key: 'rpg', label: 'RPG' },
  { key: 'mundo', label: 'Mundo Aberto' },
  { key: 'terror', label: 'Terror' },
]

export default function GamesSection({ sound }) {
  const [filter, setFilter] = useState('todos')
  const list = filter === 'todos' ? games : games.filter((g) => g.cat === filter)

  return (
    <section id="games" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="glow-blob absolute right-0 top-24 h-96 w-96 bg-cyber-blue/20" />

      <div className="mb-16">
        <Marquee text="GAME ON · PLAY HARD · NEXUS GAMES" accent="#FF4D4D" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          kicker="Games & Franquias"
          title="Jogos"
          highlight="lendários"
          accent="#00C2FF"
          desc="As franquias que definiram gerações — mundo aberto, souls-like, survival horror e muito mais. Da Gotham sombria às Terras Intermédias."
        />

        {/* abas de filtro */}
        <div className="mb-9 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key)
                  sound?.click()
                }}
                onMouseEnter={sound?.hover}
                className={`rounded-full border px-5 py-2 font-tech text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? 'border-cyber-cyan bg-cyber-cyan/15 text-white shadow-neon-cyan'
                    : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* a key força re-entrada animada ao trocar de filtro */}
        <ScrollRow key={filter} sound={sound} accent="#00C2FF">
          {list.map((item, i) => (
            <div key={item.id} className="w-[64vw] shrink-0 snap-start xs:w-56 sm:w-64">
              <SeriesCard item={item} index={i} sound={sound} ctaLabel="Jogar" brand="Nexus Games" />
            </div>
          ))}
        </ScrollRow>
      </div>
    </section>
  )
}
