export default function Footer({ sound }) {
  return (
    <footer className="relative border-t border-white/10 bg-abyss/60 py-14">
      <div className="glow-blob absolute bottom-0 left-1/2 h-60 w-96 -translate-x-1/2 bg-cyber-violet/20" />
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/10 font-display text-lg font-black text-cyber-cyan shadow-neon-cyan">
                N
              </span>
              <span className="font-display text-xl font-black tracking-widest text-white">
                NE<span className="text-gradient">XUS</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              A loja geek do futuro. Super-heróis, PC Master Race e tech gear numa vitrine
              cinematográfica. Vitrine conceitual — sem marcas registradas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {[
              ['Coleções', ['Heróis', 'Setup', 'Tech Gear', 'Edições limitadas']],
              ['Universo', ['Lançamentos', 'Comunidade', 'Streamers', 'Edições limitadas']],
              ['Suporte', ['Entrega', 'Trocas', 'FAQ', 'Contato']],
            ].map(([title, links]) => (
              <div key={title}>
                <div className="mb-3 font-tech text-xs font-bold uppercase tracking-[0.25em] text-cyber-cyan">
                  {title}
                </div>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        onMouseEnter={sound?.hover}
                        onClick={sound?.click}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-tech text-xs uppercase tracking-[0.25em] text-white/35">
            © 2099 NEXUS · Enter the Geek Universe
          </p>
          <div className="flex gap-3">
            {['IG', 'TT', 'YT', 'X'].map((s) => (
              <a
                key={s}
                href="#top"
                onMouseEnter={sound?.hover}
                onClick={sound?.click}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 font-tech text-xs font-bold text-white/60 transition-all hover:border-cyber-cyan/50 hover:text-cyber-cyan"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
