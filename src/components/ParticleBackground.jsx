import { useEffect, useRef } from 'react'

// Campo de partículas + linhas de conexão estilo "rede neural / energia".
// Canvas 2D puro: leve, sem dependências, roda em mobile.
export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, dpr
    let particles = []

    const COLORS = ['#6C3BFF', '#00C2FF', '#00FFB2', '#8b5cff']

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      const count = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }))
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const linkDist = 130 * dpr
      const mx = mouse.current.x * dpr
      const my = mouse.current.y * dpr

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // leve atração ao cursor
        const ddx = mx - p.x
        const ddy = my - p.y
        const md = Math.hypot(ddx, ddy)
        if (md < 180 * dpr) {
          p.x += (ddx / md) * 0.4
          p.y += (ddy / md) * 0.4
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.shadowBlur = 8 * dpr
        ctx.shadowColor = p.c
        ctx.fill()
        ctx.shadowBlur = 0

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = p.c
            ctx.globalAlpha = (1 - dist / linkDist) * 0.18
            ctx.lineWidth = 0.6 * dpr
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  )
}
