# Prompts — imagens faltantes dos cards (NEXUS)

Gerados para Midjourney / DALL-E / Flux / Ideogram. Os prompts estão em inglês
(geradores respondem melhor), com o nome do arquivo de destino em cada bloco.

- **Heróis** → salvar em `public/heroes/` · proporção **4:5** (ex.: 800x1000)
- **Quadrinhos** → salvar em `public/comics/` · proporção **3:4** (ex.: 600x800)
- Midjourney: acrescente `--ar 4:5 --style raw` (heróis) ou `--ar 3:4` (capas).
- Se o gerador bloquear o nome do personagem, use a variante genérica indicada
  em *(fallback)* — ela descreve o visual sem citar a marca.

## Template base — HERÓIS (estátua colecionável)

Todos os prompts de herói seguem esta fórmula, que combina com o clima do site
(fundo escuro, glow neon, produto premium):

> premium 1/6 scale collectible statue of [PERSONAGEM], museum-grade product
> photography, dramatic studio lighting with [COR1] and [COR2] rim light, dark
> void background with subtle neon glow, glossy illuminated display base,
> hyper-detailed sculpt, 8k, sharp focus, no text, no watermark

---

## Heróis (12)

### 1. `batman.jpg` — Batman
> premium 1/6 scale collectible statue of Batman, flowing real-fabric black cape, standing on an illuminated Gotham rooftop display base with glowing bat-signal, museum-grade product photography, dramatic studio lighting, golden yellow and steel gray rim light, dark void background with subtle neon glow, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a dark knight vigilante in black bat-themed armor and cowl")*

### 2. `superman.jpg` — Superman
> premium collectible figure of Superman in dynamic flying pose, cape frozen mid-motion, glowing heat-vision eyes, museum-grade product photography, dramatic studio lighting, royal blue and crimson red rim light, dark void background with subtle neon glow, illuminated display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a caped super-powered hero in blue suit with red cape, flying pose")*

### 3. `ironman.jpg` — Homem de Ferro
> premium die-cast collectible action figure of Iron Man, red and gold armor with glowing arc reactor and repulsor hands lit up, museum-grade product photography, dramatic studio lighting, amber gold and red rim light, dark void background with subtle neon glow, illuminated tech display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a futuristic armored hero in red and gold high-tech suit with glowing chest reactor")*

### 4. `captain-america.jpg` — Capitão América
> premium 1/6 scale collectible figure of Captain America holding his vibranium shield, heroic stance, museum-grade product photography, dramatic studio lighting, navy blue and red rim light, dark void background with subtle neon glow, illuminated display base with stars-and-stripes motif, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a patriotic super-soldier hero with round star-emblem shield")*

### 5. `spiderman.jpg` — Homem-Aranha
> premium collectible figure of Spider-Man in acrobatic web-swinging pose, translucent web lines, urban rooftop diorama base, museum-grade product photography, dramatic studio lighting, scarlet red and electric blue rim light, dark void background with subtle neon glow, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "an agile masked hero in red and blue web-patterned suit, acrobatic pose")*

### 6. `thor.jpg` — Thor
> premium 1/6 scale collectible statue of Thor wielding Mjolnir hammer, flowing cape, crackling lightning effect in translucent acrylic, museum-grade product photography, dramatic studio lighting, ice blue and silver rim light, dark void background with subtle neon glow, illuminated asgardian display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a norse thunder god warrior with war hammer and lightning effects")*

### 7. `hulk.jpg` — Hulk
> premium collectible statue of the Hulk, colossal muscular sculpt mid-rage, standing on a rubble destruction display base, museum-grade product photography, dramatic studio lighting, emerald green rim light, dark void background with subtle neon glow, hyper-detailed skin texture, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a colossal green-skinned giant hero, muscular, smashing pose")*

### 8. `flash.jpg` — Flash
> premium collectible figure of The Flash in full sprint running pose, translucent acrylic lightning speed-effect trail, museum-grade product photography, dramatic studio lighting, crimson red and golden yellow rim light, dark void background with subtle neon glow, illuminated speed-force display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a scarlet speedster hero with lightning bolt emblem, running at super speed")*

### 9. `wonder-woman.jpg` — Mulher-Maravilha
> premium 1/6 scale collectible statue of Wonder Woman with glowing golden Lasso of Truth and metallic tiara, warrior stance, museum-grade product photography, dramatic studio lighting, amber gold and red rim light, dark void background with subtle neon glow, illuminated greek-temple display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "an amazon warrior princess with golden glowing lasso and armor")*

### 10. `black-panther.jpg` — Pantera Negra
> premium collectible action figure of Black Panther in vibranium suit with glowing purple kinetic energy veins, crouched feline attack pose, museum-grade product photography, dramatic studio lighting, violet purple rim light, dark void background with subtle neon glow, illuminated wakandan display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a panther-themed warrior king in black high-tech suit with glowing purple energy")*

### 11. `joker.jpg` — Coringa
> premium collectible statue of the Joker with iconic grin, holding playing cards mid-throw, Arkham asylum themed display base, museum-grade product photography, dramatic studio lighting, toxic green and purple rim light, dark void background with subtle neon glow, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a maniacal clown crime lord in purple suit with green hair, holding playing cards")*

### 12. `homelander.jpg` — Capitão Pátria
> premium collectible figure of Homelander from The Boys, flag-like cape, unsettling smile, glowing red laser eyes, museum-grade product photography, dramatic studio lighting, patriot blue and deep red rim light, dark void background with subtle neon glow, illuminated display base, hyper-detailed sculpt, 8k, sharp focus, no text, no watermark
>
> *(fallback: "a menacing superman-like antihero in patriotic suit with cape, glowing red eyes, sinister smile")*

---

## Template base — QUADRINHOS (capa pop-art)

> comic book cover art, bold pop-art style with halftone dots and dramatic
> ink shadows, [CENA], [COR1] and [COR2] color scheme, dynamic composition,
> vintage print texture, no text, no lettering, no logo

Sem texto de propósito: geradores embaralham letras, e o card já exibe
título/edição por cima.

### 1. `batman.jpg` — Batman: Noite Eterna
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, dark knight vigilante crouched on a gothic gargoyle overlooking a rain-soaked city at night, bat-signal in stormy sky, golden yellow and charcoal gray color scheme, dynamic composition, vintage print texture, no text, no lettering, no logo

### 2. `spiderman.jpg` — Aranha: Multiverso
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, web-slinging hero falling through a shattered multiverse portal with mirrored versions of himself, scarlet red and electric blue color scheme, dynamic composition, vintage print texture, no text, no lettering, no logo

### 3. `liga-cosmica.jpg` — Liga Cósmica
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, team of silhouetted superheroes standing united against a cosmic void with swirling galaxies, royal blue and crimson red color scheme, epic low-angle composition, vintage print texture, no text, no lettering, no logo

### 4. `vingadores.jpg` — Guerra dos Vingadores
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, armored hero with glowing chest reactor rising over a battlefield of defeated robots, explosive energy, amber gold and red color scheme, dynamic composition, vintage print texture, no text, no lettering, no logo

### 5. `coringa.jpg` — Coringa: Riso Mortal
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, maniacal clown face laughing surrounded by floating playing cards and smoke, toxic green and violet purple color scheme, unsettling close-up composition, vintage print texture, no text, no lettering, no logo

### 6. `thor.jpg` — Thor: Trovão Eterno
> comic book cover art, bold pop-art style with halftone dots and dramatic ink shadows, norse thunder god raising his hammer to a storm sky split by a colossal lightning bolt, ice blue and silver color scheme, epic composition, vintage print texture, no text, no lettering, no logo

---

## Dicas rápidas

- Gere 2–4 variações por prompt e escolha a mais consistente com as demais.
- Mantenha o mesmo gerador/estilo para o conjunto inteiro ficar coeso.
- Depois é só salvar com os nomes exatos acima — os cards detectam sozinhos
  (`.jpg` ou `.png`, sem mexer em código).
- Observação: são personagens de marca registrada — ok para vitrine
  conceitual/portfólio (como o próprio catálogo do site anota), mas venda
  comercial exigiria licença.
