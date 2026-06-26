# NEXUS — Vitrine Geek Premium 🦾

Loja geek **conceitual e cinematográfica** focada em **impacto visual**. Sem backend, sem checkout real — é uma **vitrine interativa** estilo *Apple + Cyberpunk + Gaming Store*.

> Tema: super-heróis genéricos (sem marcas registradas), PC Master Race / setup gamer e tech gear.

---

## ✨ Destaques visuais

- **Núcleo de energia 3D** (Three.js + bloom/postprocessing) reativo ao mouse no hero.
- **Background animado**: campo de partículas com linhas de conexão (canvas) + grade HUD + glow do cursor.
- **Cards 3D com tilt real** (parallax por mouse), glow dinâmico que segue o cursor e brilho holográfico.
- **Scroll cinematográfico** com GSAP ScrollTrigger + reveals com Framer Motion.
- **Som de UI procedural** (WebAudio, sem assets) — botão liga/desliga na navbar.
- **Dark mode neon/RGB**, mobile-first e responsivo.
- **Easter egg Konami** escondido na página.

## 🧱 Estrutura

```
src/
├─ App.jsx                  # layout, scroll progress, cursor glow
├─ main.jsx                 # bootstrap do React
├─ index.css                # estilos base + utilitários Tailwind
├─ hooks/useSound.js        # bips de UI via WebAudio
├─ data/products.js         # catálogo placeholder
└─ components/
   ├─ ParticleBackground.jsx  # canvas de partículas + links
   ├─ EnergyCore3D.jsx        # Three.js: núcleo de energia + bloom
   ├─ Navbar.jsx              # nav fixa + menu mobile + toggle som
   ├─ Hero.jsx                # landing cinematográfica
   ├─ HeroVisual.jsx          # arte vetorial dos heróis no hero
   ├─ HeroesCollection.jsx    # "Super Heroes Collection"
   ├─ ComicsSection.jsx       # seção de quadrinhos
   ├─ SeriesSection.jsx       # seção de séries
   ├─ GamesSection.jsx        # seção de games (com filtros)
   ├─ GamingSetup.jsx         # "Gaming Setup & PC Master Race"
   ├─ TechGear.jsx            # "Tech Gear / Accessories"
   ├─ Section.jsx             # SectionHeading (GSAP) + Marquee
   ├─ ProductCard.jsx         # card tilt 3D + visual procedural
   ├─ ComicCard.jsx           # card de quadrinho
   ├─ SeriesCard.jsx          # card de série
   ├─ ScrollRow.jsx           # carrossel horizontal
   ├─ KonamiEgg.jsx           # easter egg Konami
   └─ Footer.jsx
```

## 🚀 Rodando localmente

Pré-requisitos: **Node.js 18+** e **npm**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # serve o build
```

Stack: **Vite + React 18 · Three.js · GSAP (ScrollTrigger) · Framer Motion · Tailwind CSS**.

## 🛒 Catálogo

- **Setup & Gear**: produtos com modelos e preços de mercado BR (ilustrativos) e **fotos reais** em `public/img/` — teclado mecânico, mouse, headset, monitor, gabinete RGB, microfone de stream, mousepad XXL e cadeira gamer.
- **Heróis**: personagens com arte vetorial, mantidos como vitrine conceitual.

Para trocar um produto, edite `src/data/products.js`: ajuste `name`, `price`, `spec`, `blurb`, as cores `accent`/`accent2` e o caminho `image` (omita `image` para usar a arte procedural).

## 📦 Build & deploy

O projeto é 100% estático. `npm run build` gera a pasta `dist/`, que pode ser publicada em qualquer host estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

## 📄 Licença

Projeto conceitual para fins de portfólio/estudo. Sem marcas registradas — todo o conteúdo é genérico/placeholder.
