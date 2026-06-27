import { useEffect, useRef } from 'react'

// Poeira cósmica cinematográfica: milhares de partículas minúsculas em várias
// profundidades (parallax), deriva lenta e cintilação sutil. SEM linhas de
// conexão, SEM grade — inspirado em fotografia espacial (Interestelar / Dune),
// não em HUD futurista.
export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf, w, h, dpr, particles = [], t = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      const count = Math.min(460, Math.floor((window.innerWidth * window.innerHeight) / 4200))
      particles = Array.from({ length: count }, () => {
        const depth = Math.random() // 0 = longe, 1 = perto da câmera
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z: depth,
          r: (0.3 + depth * 1.3) * dpr,        // mais perto = maior
          base: 0.05 + depth * 0.18,           // opacidade 5%–23%
          drift: (0.015 + depth * 0.05) * dpr, // mais perto = deriva mais rápida
          tw: Math.random() * Math.PI * 2,
          twS: 0.4 + Math.random() * 1.2,
          warm: Math.random() < 0.14,          // poucas estrelas quentes
        }
      })
    }

    const tick = () => {
      t += reduce ? 0.003 : 0.016
      ctx.clearRect(0, 0, w, h)
      const px = mouse.current.x - 0.5
      const py = mouse.current.y - 0.5
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y += p.drift
        if (p.y > h + 4) p.y = -4
        // parallax: camadas mais próximas deslocam mais com o mouse
        const ox = px * p.z * 42 * dpr
        const oy = py * p.z * 26 * dpr
        const tw = 0.55 + 0.45 * Math.sin(t * p.twS + p.tw)
        ctx.globalAlpha = p.base * tw
        ctx.fillStyle = p.warm ? 'rgba(255,224,188,1)' : 'rgba(214,230,255,1)'
        ctx.beginPath()
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
