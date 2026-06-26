import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Cabeçalho de seção com reveal cinematográfico via GSAP ScrollTrigger.
export function SectionHeading({ kicker, title, highlight, desc, align = 'left', accent = '#00C2FF' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('[data-reveal]')
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 82%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <div
        data-reveal
        className={`hud-pill mb-5 ${align === 'center' ? 'mx-auto' : ''}`}
        style={{ color: accent, borderColor: `${accent}55`, background: `${accent}10` }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        {kicker}
      </div>
      <h2 data-reveal className="section-title text-white">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {desc && (
        <p data-reveal className="mt-5 text-base text-white/55 sm:text-lg">
          {desc}
        </p>
      )}
    </div>
  )
}

// Faixa marquee de texto (estética de painel HUD).
export function Marquee({ text, accent = '#00C2FF' }) {
  const items = Array.from({ length: 8 })
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
      <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-8">
        {items.concat(items).map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight text-white/15"
          >
            {text}
            <span className="text-xl" style={{ color: accent }}>
              ◆
            </span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
