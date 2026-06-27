// Catálogo NEXUS.
//
// • Setup & Gear: produtos REAIS (modelos/preços de mercado BR, ilustrativos) com fotos reais.
// • Heróis: personagens reconhecíveis (Marvel/DC/The Boys) em arte vetorial de "estátua"
//   (emblema icônico + silhueta). Uso conceitual para vitrine/vídeo — venda comercial
//   exigiria licença das marcas.
// • Quadrinhos: capas pop-art vetoriais. • Séries: pôsteres com cenários reais (sem animes).

export const heroes = [
  { id: 'h1', name: 'Batman', tag: 'DARK KNIGHT', price: 'R$ 1.299', rarity: 'Estátua 1/6', emblem: 'bat', image: '/heroes/batman.jpg', cape: true, accent: '#ffd400', accent2: '#6b6b6b', blurb: 'Estátua do Cavaleiro das Trevas com manto em tecido real e base Gotham iluminada.' },
  { id: 'h2', name: 'Superman', tag: 'MAN OF STEEL', price: 'R$ 1.149', rarity: 'Premium', emblem: 'superman', image: '/heroes/superman.jpg', cape: true, accent: '#2b6bff', accent2: '#ff2b2b', blurb: 'Figure do Homem de Aço em pose de voo, capa dinâmica e olhos com efeito de calor.' },
  { id: 'h3', name: 'Homem de Ferro', tag: 'VINGADOR', price: 'R$ 1.899', rarity: 'Limitada', emblem: 'ironman', image: '/heroes/ironman.jpg', cape: false, accent: '#ffb000', accent2: '#e62b2b', blurb: 'Action figure die-cast da armadura Mark, reator Arc em LED e repulsores luminosos.' },
  { id: 'h4', name: 'Capitão América', tag: '1º VINGADOR', price: 'R$ 999', rarity: 'Figure 1/6', emblem: 'cap', image: '/heroes/captain-america.jpg', cape: false, accent: '#2b6bff', accent2: '#ff2b2b', blurb: 'Figura articulada do Sentinela da Liberdade com escudo de vibranium magnético.' },
  { id: 'h5', name: 'Homem-Aranha', tag: 'AMIGÃO', price: 'R$ 899', rarity: 'Premium', emblem: 'spider', image: '/heroes/spiderman.jpg', cape: false, accent: '#ff2b3b', accent2: '#2b6bff', blurb: 'Colecionável do Aranha em pose acrobática, teias em fio transparente e diorama urbano.' },
  { id: 'h6', name: 'Thor', tag: 'DEUS DO TROVÃO', price: 'R$ 1.499', rarity: 'Estátua 1/6', emblem: 'thor', image: '/heroes/thor.jpg', cape: true, accent: '#7fd4ff', accent2: '#b0b8c8', blurb: 'Estátua do Deus do Trovão com Mjolnir, capa esvoaçante e base com relâmpago RGB.' },
  { id: 'h7', name: 'Hulk', tag: 'O GIGANTE', price: 'R$ 1.699', rarity: 'Limitada', emblem: 'hulk', image: '/heroes/hulk.jpg', cape: false, accent: '#4cd137', accent2: '#2e9b1f', blurb: 'Figure colossal do Gigante Esmeralda com músculos esculpidos e base de destroços.' },
  { id: 'h8', name: 'Flash', tag: 'VELOCISTA', price: 'R$ 949', rarity: 'Premium', emblem: 'flash', image: '/heroes/flash.jpg', cape: false, accent: '#ff2b2b', accent2: '#ffd400', blurb: 'Colecionável do Velocista Escarlate com efeito de raio em acrílico e pose de corrida.' },
  { id: 'h9', name: 'Mulher-Maravilha', tag: 'AMAZONA', price: 'R$ 1.249', rarity: 'Estátua 1/6', emblem: 'wonderwoman', image: '/heroes/wonder-woman.jpg', cape: false, accent: '#ffb000', accent2: '#e62b2b', blurb: 'Estátua da Princesa de Themyscira com Laço da Verdade luminoso e tiara metálica.' },
  { id: 'h10', name: 'Pantera Negra', tag: 'REI DE WAKANDA', price: 'R$ 1.399', rarity: 'Limitada', emblem: 'panther', image: '/heroes/black-panther.jpg', cape: true, accent: '#b026ff', accent2: '#7a3bff', blurb: 'Action figure do Rei de Wakanda com traje vibranium e efeito de energia cinética.' },
  { id: 'h11', name: 'Coringa', tag: 'PRÍNCIPE DO CRIME', price: 'R$ 1.099', rarity: 'Premium', emblem: 'joker', image: '/heroes/joker.jpg', cape: false, accent: '#2fae4e', accent2: '#9b59b6', blurb: 'Estátua do Príncipe Palhaço do Crime com cartas, sorriso icônico e base de Arkham.' },
  { id: 'h12', name: 'Capitão Pátria', tag: 'O SUPREMO', price: 'R$ 1.599', rarity: 'Limitada', emblem: 'homelander', image: '/heroes/homelander.jpg', cape: true, accent: '#2b6bff', accent2: '#c8203a', blurb: 'Figure do herói mais poderoso (e perturbador) com capa em bandeira e visão laser RGB.' },
]

export const comics = [
  { id: 'c1', title: 'Batman: Noite Eterna', issue: '001', emblem: 'bat', cover: '/comics/batman.jpg', price: 'R$ 49,90', accent: '#ffd400', accent2: '#6b6b6b', tagline: 'A escuridão tem um guardião.' },
  { id: 'c2', title: 'Aranha: Multiverso', issue: '042', emblem: 'spider', cover: '/comics/spiderman.jpg', price: 'R$ 39,90', accent: '#ff2b3b', accent2: '#2b6bff', tagline: 'Infinitas teias. Um destino.' },
  { id: 'c3', title: 'Liga Cósmica', issue: '007', emblem: 'superman', cover: '/comics/liga-cosmica.jpg', price: 'R$ 54,90', accent: '#2b6bff', accent2: '#ff2b2b', tagline: 'Heróis unidos contra o vazio.' },
  { id: 'c4', title: 'Guerra dos Vingadores', issue: '015', emblem: 'ironman', cover: '/comics/vingadores.jpg', price: 'R$ 59,90', accent: '#ffb000', accent2: '#e62b2b', tagline: 'A armadura final desperta.' },
  { id: 'c5', title: 'Coringa: Riso Mortal', issue: '003', emblem: 'joker', cover: '/comics/coringa.jpg', price: 'R$ 44,90', accent: '#2fae4e', accent2: '#9b59b6', tagline: 'O caos nunca foi tão divertido.' },
  { id: 'c6', title: 'Thor: Trovão Eterno', issue: '028', emblem: 'thor', cover: '/comics/thor.jpg', price: 'R$ 47,90', accent: '#7fd4ff', accent2: '#b0b8c8', tagline: 'O martelo decide quem é digno.' },
]

export const series = [
  { id: 'se1', title: 'Game of Thrones', genre: 'Fantasia · Drama', seasons: 'T1–T8', rating: '9.2', image: '/img/bg-snow.jpg', accent: '#d4af37', blurb: 'Famílias nobres travam uma guerra brutal pelo Trono de Ferro enquanto uma ameaça gelada desperta no Norte.' },
  { id: 'se2', title: 'The Boys', genre: 'Anti-heróis · Sátira', seasons: 'T1–T4', rating: '8.7', image: '/img/series-cyber2.jpg', accent: '#e23636', blurb: 'Um grupo sem poderes expõe a corrupção por trás dos super-heróis mais amados (e perigosos) do mundo.' },
  { id: 'se3', title: 'Senhor dos Anéis', genre: 'Fantasia Épica', seasons: 'Trilogia', rating: '8.9', image: '/img/series-forest.jpg', accent: '#c9a227', blurb: 'Uma sociedade improvável parte numa jornada para destruir um anel e salvar a Terra-média.' },
  { id: 'se4', title: 'Star Wars', genre: 'Space Opera', seasons: 'Saga', rating: '8.6', image: '/img/series-space.jpg', accent: '#ffd400', blurb: 'Cavaleiros de uma ordem mística enfrentam um império galáctico numa guerra entre a luz e as trevas.' },
  { id: 'se5', title: 'Harry Potter', genre: 'Fantasia · Magia', seasons: '8 Filmes', rating: '7.9', image: '/img/bg-castle.jpg', accent: '#caa64a', blurb: 'Um jovem bruxo descobre seu destino numa escola de magia cheia de mistérios, amigos e perigos.' },
  { id: 'se6', title: 'Breaking Bad', genre: 'Crime · Drama', seasons: 'T1–T5', rating: '9.5', image: '/img/bg-desert.jpg', accent: '#3fae3a', blurb: 'Um professor de química vira um dos maiores chefões do tráfico para garantir o futuro da família.' },
  { id: 'se7', title: 'The Witcher', genre: 'Fantasia · Ação', seasons: 'T1–T3', rating: '8.0', image: '/img/bg-forest2.jpg', accent: '#cfd6e0', blurb: 'Um caçador de monstros mutante cruza um continente sombrio guiado pelo destino e pela espada.' },
  { id: 'se8', title: 'Stranger Things', genre: 'Sci-Fi · Terror 80s', seasons: 'T1–T5', rating: '8.7', image: '/img/bg-forest3.jpg', accent: '#e23636', blurb: 'Crianças de uma cidade pequena enfrentam forças sobrenaturais vindas de uma dimensão paralela.' },
]

export const games = [
  { id: 'gm1', title: 'GTA VI', cat: 'mundo', platform: 'PS5 · XBOX · PC', genre: 'Mundo Aberto · Ação', rating: '9.6', image: '/img/series-cyber2.jpg', accent: '#00C2FF', blurb: 'Crime, caos e liberdade total numa metrópole viva que nunca dorme.' },
  { id: 'gm2', title: 'Cyberpunk 2077', cat: 'rpg', platform: 'PC · PS5', genre: 'RPG · Sci-Fi', rating: '9.0', image: '/img/series-cyber.jpg', accent: '#6C3BFF', blurb: 'Night City: implantes, gangues e uma lenda em construção.' },
  { id: 'gm3', title: 'Batman: Arkham', cat: 'acao', platform: 'PS · XBOX · PC', genre: 'Ação · Stealth', rating: '9.3', image: '/img/bg-castle.jpg', accent: '#FFD400', blurb: 'Seja o Cavaleiro das Trevas e limpe Gotham das sombras.' },
  { id: 'gm4', title: 'Dark Souls', cat: 'rpg', platform: 'PC · PS · XBOX', genre: 'Souls-like · RPG', rating: '9.4', image: '/img/bg-castle2.jpg', accent: '#FF4D4D', blurb: 'Prepare-se para morrer. E morrer. E, enfim, vencer.' },
  { id: 'gm5', title: 'Elden Ring', cat: 'mundo', platform: 'PC · PS5 · XBOX', genre: 'RPG · Mundo Aberto', rating: '9.7', image: '/img/series-forest.jpg', accent: '#00FFB2', blurb: 'Torne-se Lorde Prístino nas vastas Terras Intermédias.' },
  { id: 'gm6', title: 'God of War', cat: 'acao', platform: 'PS5 · PC', genre: 'Ação · Aventura', rating: '9.5', image: '/img/bg-snow.jpg', accent: '#00C2FF', blurb: 'Kratos e Atreus enfrentam os deuses nórdicos numa jornada brutal.' },
  { id: 'gm7', title: 'Red Dead Redemption 2', cat: 'mundo', platform: 'PS · XBOX · PC', genre: 'Faroeste · Mundo Aberto', rating: '9.6', image: '/img/bg-desert.jpg', accent: '#6C3BFF', blurb: 'O fim da era dos fora-da-lei no velho oeste americano.' },
  { id: 'gm8', title: 'The Last of Us', cat: 'acao', platform: 'PS5 · PC', genre: 'Survival · Drama', rating: '9.4', image: '/img/bg-forest3.jpg', accent: '#00FFB2', blurb: 'Numa América pós-apocalíptica, sobreviver é só o começo.' },
  { id: 'gm9', title: 'Outlast', cat: 'terror', platform: 'PC · PS · XBOX', genre: 'Survival Horror', rating: '8.6', image: '/img/game-horror1.jpg', accent: '#FF4D4D', blurb: 'Sem armas. Só uma câmera e o terror de um asilo abandonado.' },
  { id: 'gm10', title: 'Resident Evil', cat: 'terror', platform: 'PS5 · XBOX · PC', genre: 'Survival Horror', rating: '9.0', image: '/img/game-horror2.jpg', accent: '#FF4D4D', blurb: 'Vírus, mansões e o horror que definiu um gênero inteiro.' },
  { id: 'gm11', title: 'Silent Hill', cat: 'terror', platform: 'PS5 · PC', genre: 'Terror Psicológico', rating: '8.8', image: '/img/game-horror3.jpg', accent: '#FF4D4D', blurb: 'A névoa esconde seus piores medos. Bem-vindo a Silent Hill.' },
]

export const setup = [
  { id: 's1', name: 'Keychron K8 Pro', tag: 'TECLADO', price: 'R$ 899', spec: 'Hot-swap · RGB', image: '/img/kb.jpg', accent: '#6C3BFF', accent2: '#00C2FF', blurb: 'Mecânico sem fio, switches hot-swap, keycaps PBT e per-key RGB. Gasket mount premium.' },
  { id: 's2', name: 'Logitech G Pro X Superlight 2', tag: 'MOUSE', price: 'R$ 799', spec: '32K DPI · 60g', image: '/img/mouse.jpg', accent: '#00C2FF', accent2: '#6C3BFF', blurb: 'Sensor HERO 2 de 32.000 DPI, 60g e bateria de 95h. O favorito dos pros de FPS.' },
  { id: 's3', name: 'HyperX Cloud III', tag: 'HEADSET', price: 'R$ 649', spec: 'Surround 7.1', image: '/img/headset.jpg', accent: '#6C3BFF', accent2: '#00FFB2', blurb: 'Drivers angulados de 53mm, áudio espacial 7.1 e microfone com cancelamento de ruído.' },
  { id: 's4', name: 'Samsung Odyssey G5 27"', tag: 'MONITOR', price: 'R$ 1.699', spec: '2K · 165Hz · 1ms', image: '/img/deskmat-a.jpg', accent: '#00FFB2', accent2: '#00C2FF', blurb: 'Painel curvo QHD 1000R, 165Hz, HDR10 e FreeSync. Imersão total na estação de batalha.' },
]

export const gear = [
  { id: 'g1', name: 'PC Master Race RTX Build', tag: 'POWER', price: 'R$ 9.499', spec: 'RGB · Water Cooler', image: '/img/pccase-a.jpg', accent: '#00C2FF', accent2: '#6C3BFF', blurb: 'Gabinete em vidro temperado, fans ARGB, water cooler e iluminação sincronizada.' },
  { id: 'g2', name: 'HyperX QuadCast S', tag: 'STREAM', price: 'R$ 1.099', spec: 'USB · ARGB', image: '/img/mic-a.jpg', accent: '#6C3BFF', accent2: '#00C2FF', blurb: 'Microfone condensador com 4 padrões, anti-vibração e iluminação RGB dinâmica.' },
  { id: 'g3', name: 'Razer Goliathus Extended', tag: 'DESK', price: 'R$ 399', spec: '920 × 294 mm', image: '/img/deskmat-b.jpg', accent: '#00FFB2', accent2: '#6C3BFF', blurb: 'Mousepad XXL com borda Chroma RGB, superfície de micro-tecido e base antiderrapante.' },
  { id: 'g4', name: 'ThunderX3 EC3 Pro', tag: 'COMFORT', price: 'R$ 1.299', spec: 'Ergonomia 4D', image: '/img/chair.jpg', accent: '#6C3BFF', accent2: '#00FFB2', blurb: 'Cadeira gamer com apoios 4D, reclínio 180°, couro técnico e almofadas lombares.' },
]
