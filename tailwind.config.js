/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        void: '#070B14', // background
        abyss: '#0B1120', // background elevado (footer)
        panel: '#111827', // surface (cards)
        cta: '#FF4D4D', // call-to-action
        ink: '#F5F7FA', // texto
        muted: '#A7B0C0', // texto secundário
        // (nomes mantidos por compatibilidade)
        cyber: {
          cyan: '#00C2FF', // secundária
          blue: '#6C3BFF', // primária (roxo)
          violet: '#6C3BFF', // primária (roxo)
          pink: '#00FFB2', // destaque (menta)
          lime: '#00FFB2', // destaque (menta)
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,194,255,0.6), 0 0 60px rgba(0,194,255,0.25)',
        'neon-violet': '0 0 20px rgba(108,59,255,0.6), 0 0 60px rgba(108,59,255,0.25)',
        'neon-pink': '0 0 20px rgba(0,255,178,0.6), 0 0 60px rgba(0,255,178,0.25)',
        'neon-cta': '0 0 20px rgba(255,77,77,0.6), 0 0 60px rgba(255,77,77,0.25)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' },
          '20%,24%,55%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        scanline: 'scanline 6s linear infinite',
        flicker: 'flicker 4s infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
