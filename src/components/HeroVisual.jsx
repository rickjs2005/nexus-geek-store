// Card de colecionável de herói: silhueta de "estátua" tingida + emblema icônico
// em SVG sobreposto + base de figure + glow neon. 100% vetorial (carrega na hora).
// `emblem` define o símbolo; `cape` adiciona a capa na silhueta.

export default function HeroVisual({ item }) {
  return (
    <div className="absolute inset-0">
      {/* fundo temático nas cores do herói */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 16%, ${item.accent2}33, transparent 55%), radial-gradient(100% 80% at 50% 118%, ${item.accent}44, #05070f 72%)`,
        }}
      />
      <div className="grid-overlay absolute inset-0 opacity-40" />

      {/* raios de energia girando ao fundo */}
      <svg viewBox="0 0 200 200" className="absolute left-1/2 top-[44%] h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-25">
        <g stroke={item.accent} strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1="100" y1="100" x2="100" y2="0" transform={`rotate(${i * 22.5} 100 100)`}>
              <animate attributeName="opacity" values="0.05;0.8;0.05" dur={`${2 + (i % 5)}s`} repeatCount="indefinite" />
            </line>
          ))}
        </g>
      </svg>

      {/* glow central */}
      <div
        className="glow-blob absolute left-1/2 top-[40%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ background: item.accent, opacity: 0.5 }}
      />

      {/* SILHUETA da estátua (atrás, tingida e translúcida) */}
      <div className="absolute inset-x-0 bottom-0 top-[8%] flex items-end justify-center">
        <HeroSilhouette accent={item.accent} accent2={item.accent2} cape={item.cape} />
      </div>

      {/* EMBLEMA em destaque, com glow */}
      <div
        className="absolute left-1/2 top-[40%] h-[40%] w-[62%] -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ filter: `drop-shadow(0 0 16px ${item.accent}) drop-shadow(0 0 38px ${item.accent}aa)` }}
      >
        <Emblem id={item.emblem} accent={item.accent} accent2={item.accent2} />
      </div>

      {/* base / pedestal de colecionável */}
      <svg viewBox="0 0 200 60" className="absolute inset-x-0 bottom-2 mx-auto h-14 w-[82%]">
        <defs>
          <linearGradient id={`base-${item.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={item.accent} stopOpacity="0" />
            <stop offset="0.5" stopColor={item.accent} />
            <stop offset="1" stopColor={item.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="34" rx="80" ry="13" fill={item.accent} opacity="0.14" />
        <ellipse cx="100" cy="34" rx="80" ry="13" fill="none" stroke={`url(#base-${item.id})`} strokeWidth="1.4" />
        <ellipse cx="100" cy="30" rx="55" ry="8" fill="none" stroke={item.accent} strokeWidth="0.8" opacity="0.4" />
      </svg>

      <div className="scanlines absolute inset-0" />
    </div>
  )
}

// Figura heróica genérica (de costas para o emblema) — funciona como "estátua".
function HeroSilhouette({ accent, accent2, cape }) {
  return (
    <svg viewBox="0 0 200 300" className="h-[94%] w-auto" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`body-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.5" />
          <stop offset="1" stopColor={accent2} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {cape && (
        <path
          d="M62 84 L34 280 Q100 262 100 262 Q100 262 166 280 L138 84 Q100 96 62 84 Z"
          fill={accent}
          opacity="0.16"
        />
      )}

      <g fill={`url(#body-${accent})`} stroke={accent} strokeWidth="1" strokeOpacity="0.4">
        {/* cabeça */}
        <circle cx="100" cy="44" r="22" />
        {/* pescoço/ombros + tronco em V */}
        <path d="M74 70 Q100 60 126 70 L140 120 L130 196 Q100 206 70 196 L60 120 Z" />
        {/* braços (pose de poder, mãos na cintura) */}
        <path d="M74 78 L44 120 L40 168 L54 170 L66 124 L82 96 Z" />
        <path d="M126 78 L156 120 L160 168 L146 170 L134 124 L118 96 Z" />
        {/* pernas */}
        <path d="M82 196 L74 290 L96 290 L100 206 Z" />
        <path d="M118 196 L126 290 L104 290 L100 206 Z" />
      </g>
    </svg>
  )
}

export function Emblem({ id, accent }) {
  switch (id) {
    case 'bat':
      return (
        <svg viewBox="0 0 200 150" className="mx-auto h-full">
          <ellipse cx="100" cy="75" rx="94" ry="48" fill="#ffd400" />
          <ellipse cx="100" cy="75" rx="94" ry="48" fill="none" stroke="#0a0a0a" strokeWidth="3" />
          <path
            fill="#0a0a0a"
            d="M100 52 L110 70 C124 60 140 60 150 70 C147 60 151 50 160 50 C157 60 162 68 172 71
               C159 74 147 80 140 94 C130 86 117 86 108 95 C104 100 100 110 100 110
               C100 110 96 100 92 95 C83 86 70 86 60 94 C53 80 41 74 28 71
               C38 68 43 60 40 50 C49 50 53 60 50 70 C60 60 76 60 90 70 Z"
          />
        </svg>
      )
    case 'superman':
      return (
        <svg viewBox="0 0 160 180" className="mx-auto h-full">
          <path d="M80 8 L150 44 L112 158 L80 174 L48 158 L10 44 Z" fill="#e62b2b" stroke="#1b3fa0" strokeWidth="4" />
          <path d="M80 24 L134 52 L104 146 L80 158 L56 146 L26 52 Z" fill="#ffd400" />
          <text x="80" y="120" textAnchor="middle" fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="96" fill="#e62b2b" style={{ fontStyle: 'italic' }}>S</text>
        </svg>
      )
    case 'ironman':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <defs>
            <linearGradient id="ironGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd86b" />
              <stop offset="1" stopColor="#e8920e" />
            </linearGradient>
          </defs>
          <path fill="url(#ironGold)" stroke="#7a3b00" strokeWidth="2" d="M68 34 C46 40 38 64 40 96 C41 120 50 146 72 168 L128 168 C150 146 159 120 160 96 C162 64 154 40 132 34 C110 28 90 28 68 34 Z" />
          <path fill="#c2740a" d="M86 96 L114 96 L108 168 L92 168 Z" opacity="0.5" />
          <polygon points="58,84 94,74 92,94 60,98" fill="#bff7ff" />
          <polygon points="142,84 106,74 108,94 140,98" fill="#bff7ff" />
          <g stroke="#7a3b00" strokeWidth="3">
            <line x1="86" y1="120" x2="86" y2="138" />
            <line x1="100" y1="122" x2="100" y2="140" />
            <line x1="114" y1="120" x2="114" y2="138" />
          </g>
        </svg>
      )
    case 'cap':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <circle cx="100" cy="100" r="92" fill="#e62b2b" />
          <circle cx="100" cy="100" r="72" fill="#f4f4f4" />
          <circle cx="100" cy="100" r="52" fill="#e62b2b" />
          <circle cx="100" cy="100" r="34" fill="#1b4fd1" />
          <path fill="#f4f4f4" d="M100 70 L108.8 92.8 L133 92.8 L113.6 107.4 L121.2 130.6 L100 116 L78.8 130.6 L86.4 107.4 L67 92.8 L91.2 92.8 Z" />
        </svg>
      )
    case 'spider':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <circle cx="100" cy="100" r="92" fill="#d61f2b" />
          <g stroke="#5e0a10" strokeWidth="1.4" fill="none" opacity="0.85">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="100" y1="100" x2="100" y2="8" transform={`rotate(${i * 30} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="26" />
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="74" />
          </g>
          <g fill="#1a1a1a">
            <ellipse cx="100" cy="96" rx="9" ry="6" />
            <ellipse cx="100" cy="110" rx="7" ry="11" />
          </g>
          <g stroke="#1a1a1a" strokeWidth="3.2" fill="none" strokeLinecap="round">
            <path d="M97 98 C80 92 72 80 66 70" />
            <path d="M97 102 C78 100 66 96 56 90" />
            <path d="M98 108 C80 110 68 116 58 124" />
            <path d="M99 114 C84 122 76 132 70 144" />
            <path d="M103 98 C120 92 128 80 134 70" />
            <path d="M103 102 C122 100 134 96 144 90" />
            <path d="M102 108 C120 110 132 116 142 124" />
            <path d="M101 114 C116 122 124 132 130 144" />
          </g>
        </svg>
      )
    case 'thor':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <defs>
            <linearGradient id="thorSteel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eef2f8" />
              <stop offset="1" stopColor="#9aa6bd" />
            </linearGradient>
          </defs>
          <g fill={accent} opacity="0.9">
            <path d="M44 30 L36 92 L52 86 L40 150 L78 78 L60 84 L70 36 Z" />
            <path d="M156 30 L164 92 L148 86 L160 150 L122 78 L140 84 L130 36 Z" opacity="0.6" />
          </g>
          <rect x="92" y="96" width="16" height="74" rx="5" fill="#6b4a2a" />
          <g stroke="#3e2a16" strokeWidth="2">
            <line x1="92" y1="108" x2="108" y2="112" />
            <line x1="92" y1="120" x2="108" y2="124" />
            <line x1="92" y1="132" x2="108" y2="136" />
          </g>
          <circle cx="100" cy="172" r="9" fill="#caa04a" />
          <rect x="58" y="56" width="84" height="48" rx="9" fill="url(#thorSteel)" stroke="#6f7a90" strokeWidth="2.5" />
          <rect x="68" y="64" width="64" height="32" rx="5" fill="none" stroke="#7f8aa0" strokeWidth="2" opacity="0.7" />
          <circle cx="76" cy="80" r="3" fill="#6f7a90" />
          <circle cx="124" cy="80" r="3" fill="#6f7a90" />
        </svg>
      )
    case 'hulk':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <defs>
            <linearGradient id="hulkG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8aff5a" />
              <stop offset="1" stopColor="#2e9b1f" />
            </linearGradient>
          </defs>
          {/* punho cerrado */}
          <g fill="url(#hulkG)" stroke="#176b0d" strokeWidth="3">
            <rect x="52" y="86" width="96" height="74" rx="18" />
            {/* nós dos dedos */}
            <rect x="56" y="70" width="22" height="34" rx="11" />
            <rect x="80" y="64" width="22" height="40" rx="11" />
            <rect x="104" y="64" width="22" height="40" rx="11" />
            <rect x="128" y="70" width="20" height="34" rx="10" />
            {/* polegar */}
            <path d="M52 110 C36 110 32 128 44 140 C52 148 60 146 62 136 Z" />
          </g>
          {/* divisões dos dedos */}
          <g stroke="#176b0d" strokeWidth="3" opacity="0.8">
            <line x1="78" y1="92" x2="78" y2="150" />
            <line x1="102" y1="90" x2="102" y2="152" />
            <line x1="126" y1="92" x2="126" y2="150" />
          </g>
        </svg>
      )
    case 'flash':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <circle cx="100" cy="100" r="90" fill="#d61f2b" />
          <circle cx="100" cy="100" r="72" fill="#f6f6f6" />
          <path fill="#ffd400" stroke="#caa400" strokeWidth="2" d="M112 36 L66 108 L94 108 L82 164 L140 84 L108 84 Z" />
        </svg>
      )
    case 'wonderwoman':
      return (
        <svg viewBox="0 0 200 160" className="mx-auto h-full">
          <defs>
            <linearGradient id="wwGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe27a" />
              <stop offset="1" stopColor="#e0a400" />
            </linearGradient>
          </defs>
          {/* asas da águia */}
          <path fill="url(#wwGold)" d="M100 44 C70 30 44 30 18 46 C46 52 64 60 84 76 C72 60 78 52 100 56 Z" />
          <path fill="url(#wwGold)" d="M100 44 C130 30 156 30 182 46 C154 52 136 60 116 76 C128 60 122 52 100 56 Z" />
          {/* corpo central / W */}
          <path fill="url(#wwGold)" d="M100 52 L114 70 L100 150 L86 70 Z" />
          <path fill="url(#wwGold)" d="M76 78 L100 150 L72 104 Z" opacity="0.95" />
          <path fill="url(#wwGold)" d="M124 78 L100 150 L128 104 Z" opacity="0.95" />
        </svg>
      )
    case 'panther':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <circle cx="100" cy="100" r="92" fill="#15121f" stroke={accent} strokeWidth="2" />
          {/* orelhas */}
          <path fill="#0a0810" d="M58 60 L48 28 L82 52 Z" />
          <path fill="#0a0810" d="M142 60 L152 28 L118 52 Z" />
          {/* cabeça da pantera */}
          <path fill="#0a0810" d="M100 44 C72 46 58 72 58 100 C58 132 78 156 100 156 C122 156 142 132 142 100 C142 72 128 46 100 44 Z" />
          {/* olhos */}
          <path fill={accent} d="M70 96 L92 88 L88 104 L72 106 Z" />
          <path fill={accent} d="M130 96 L108 88 L112 104 L128 106 Z" />
          {/* focinho */}
          <path fill="#2a2438" d="M92 118 L108 118 L100 132 Z" />
          <line x1="100" y1="132" x2="100" y2="144" stroke="#2a2438" strokeWidth="3" />
        </svg>
      )
    case 'joker':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          {/* cabelo verde */}
          <path fill="#2fae4e" d="M48 96 C40 50 70 24 100 24 C130 24 160 50 152 96 C140 78 128 84 124 96 C120 80 108 78 100 92 C92 78 80 80 76 96 C72 84 60 78 48 96 Z" />
          {/* rosto pálido */}
          <ellipse cx="100" cy="104" rx="50" ry="56" fill="#e9eef0" />
          {/* olhos */}
          <ellipse cx="82" cy="92" rx="6" ry="9" fill="#1a1a1a" />
          <ellipse cx="118" cy="92" rx="6" ry="9" fill="#1a1a1a" />
          {/* sorriso */}
          <path d="M62 116 Q100 168 138 116 Q100 138 62 116 Z" fill="#c1121f" />
          <path d="M62 116 Q100 138 138 116" fill="none" stroke="#7a0a14" strokeWidth="2" />
          {/* dentes */}
          <g stroke="#c1121f" strokeWidth="2">
            <line x1="80" y1="122" x2="82" y2="132" />
            <line x1="92" y1="126" x2="93" y2="138" />
            <line x1="108" y1="126" x2="107" y2="138" />
            <line x1="120" y1="122" x2="118" y2="132" />
          </g>
        </svg>
      )
    case 'homelander':
      return (
        <svg viewBox="0 0 200 200" className="mx-auto h-full">
          <circle cx="100" cy="100" r="92" fill="#0e2a6b" stroke="#e2e8f5" strokeWidth="2" />
          {/* listras */}
          <g fill="#c8203a" opacity="0.9">
            <path d="M14 120 H186 V134 H10 Z" />
            <path d="M22 146 H178 V160 H18 Z" />
          </g>
          {/* águia */}
          <path fill="#e9eef6" d="M100 50 C76 40 52 42 32 56 C58 62 76 70 96 86 C82 70 86 62 100 64 Z" />
          <path fill="#e9eef6" d="M100 50 C124 40 148 42 168 56 C142 62 124 70 104 86 C118 70 114 62 100 64 Z" />
          <path fill="#e9eef6" d="M100 54 L110 74 L100 110 L90 74 Z" />
          {/* estrela */}
          <path fill="#ffd400" d="M100 26 L104.5 38 L117 38 L107 46 L111 58 L100 50.5 L89 58 L93 46 L83 38 L95.5 38 Z" />
        </svg>
      )
    default:
      return null
  }
}
