**English** | [Português](README.pt-BR.md)

# NEXUS — Premium Geek Showcase

> **Type:** concept / fan-made — non-commercial portfolio showcase, **not affiliated** with Marvel, DC, The Boys or any other brand mentioned · **Demo:** https://nexus-geek-store.vercel.app

![NEXUS hero with the 3D black hole](docs/screenshots/hero.webp)

A **conceptual, cinematic geek store** focused on **visual impact**. No backend and no real checkout — it is an **interactive showcase** in an *Apple + Cyberpunk + Gaming Store* style. The UI is in Portuguese.

> Theme: comic and TV characters, PC Master Race / gaming setup and tech gear. Prices and products are illustrative; nothing is actually sold.

---

## Visual highlights

- **Cinematic "black hole" hero (React Three Fiber)** — *Interstellar/Gargantua* style: turbulent accretion disk, photon ring, gravitational lensing (custom *postprocessing* effect), a **planet** with atmosphere, instanced **asteroids**, space dust and **HDRI** lighting.
- **Cinematic post-processing** (react-postprocessing): bloom, vignette, chromatic aberration and film grain.
- **Background cosmic dust** with depth parallax.
- **3D tilt cards** (mouse parallax), cursor-following glow and holographic sheen.
- **Card images** for heroes and comic covers (AI-generated), with automatic fallback to vector art.
- **Cinematic scrolling** with GSAP ScrollTrigger, a Theatre.js camera timeline and Framer Motion reveals.
- **Micro-interactions**: glowing/expanding buttons, count-up numbers, pulsing logo.
- **Procedural UI sound** (WebAudio, no audio assets) with an on/off toggle in the navbar.
- **Neon/RGB dark mode**, mobile-first and responsive. A hidden **Konami code easter egg** (the "secret coupon" it shows is just a joke; there is no checkout).

![Super Heroes Collection section](docs/screenshots/heroes-collection.webp)

## Structure

```
src/
├─ App.jsx                  # layout, scroll progress, cursor glow
├─ main.jsx                 # React bootstrap
├─ index.css                # base styles + Tailwind utilities
├─ hooks/useSound.js        # UI beeps via WebAudio
├─ data/products.js         # placeholder catalog
├─ theatre.js               # hero timeline (Theatre.js) + theatre-state.json
└─ components/
   ├─ ParticleBackground.jsx  # cosmic dust (depth parallax)
   ├─ BlackHoleScene.jsx      # R3F hero: black hole + disk + lensing + planet + asteroids + HDRI
   ├─ Navbar.jsx              # fixed nav + mobile menu + sound toggle
   ├─ Hero.jsx                # cinematic landing
   ├─ HeroVisual.jsx          # vector hero art
   ├─ HeroesCollection.jsx    # "Super Heroes Collection"
   ├─ ComicsSection.jsx       # comics section
   ├─ SeriesSection.jsx       # TV series section
   ├─ GamesSection.jsx        # games section (with filters)
   ├─ GamingSetup.jsx         # "Gaming Setup & PC Master Race"
   ├─ TechGear.jsx            # "Tech Gear / Accessories"
   ├─ Section.jsx             # SectionHeading (GSAP) + Marquee
   ├─ ProductCard.jsx         # 3D tilt card + photo (vector fallback)
   ├─ ComicCard.jsx           # cover image (pop-art vector fallback)
   ├─ SeriesCard.jsx          # series card
   ├─ ScrollRow.jsx           # horizontal carousel
   ├─ KonamiEgg.jsx           # Konami easter egg
   └─ Footer.jsx
```

## Running locally

Prerequisites: **Node.js 18+** and **npm**.

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # outputs /dist
npm run preview  # serves the build
```

Stack: **Vite 5 + React 18 · Three.js · React Three Fiber + drei · react-postprocessing · Theatre.js · GSAP (ScrollTrigger) · Framer Motion · Tailwind CSS 3 · GLSL shaders**.

There are no environment variables, automated tests or linter configured; the available check is `npm run build`.

## Catalog

- **Setup & Gear**: products with illustrative Brazilian market models/prices and photos in `public/img/` — mechanical keyboard, mouse, headset, monitor, RGB case, streaming mic, XXL mousepad and gaming chair.
- **Heroes and Comics**: accept an image (`public/heroes/<name>.jpg|png` and `public/comics/<name>.jpg|png`); if the file is missing, the card falls back to **vector art** (no broken image). See the `LEIA-ME.txt` files in those folders for the expected names.

To change a product, edit `src/data/products.js`: adjust `name`, `price`, `spec`, `blurb`, the `accent`/`accent2` colors and the `image`/`cover` path (omit it to use the procedural/vector art).

## Build & deploy

The project is fully static. `npm run build` generates `dist/`, which can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

## Limitations

- No real backend, login, cart or checkout — buttons such as "Entrar" and "Carrinho" are visual only.
- The 3D scene is heavy (~1 MB chunk); performance may drop on weak GPUs.

## Credits and rights

**Fan-made** concept project for portfolio/study purposes, with no real sales and **no affiliation, sponsorship or endorsement** by any trademark owner.

- The catalog (`src/data/products.js`) mentions DC, Marvel and The Boys characters and products from brands such as Logitech, Razer, HyperX, Samsung and Keychron. These names are third-party trademarks and appear only as showcase examples.
- The hero and cover images in `public/heroes` and `public/comics` were created with AI image generators and depict characters whose rights belong to third parties. For any commercial use, replace them with licensed material.
- Product and scenery photos in `public/img/`: origin not documented.
- HDRI lighting in `public/hdri/`: **Poly Haven** (`dikhololo_night`), **CC0** license (public domain).

## Security

See [SECURITY.md](SECURITY.md).

## License

No license has been chosen yet; all rights reserved by the author. Third-party characters, names and trademarks belong to their respective owners.
