import { useCallback, useRef, useState, useEffect } from 'react'

// Sons de UI gerados proceduralmente via WebAudio — nenhum asset externo.
// Toca um "bip" futurista leve em hover/click. Pode ser mutado.
export function useSound() {
  const ctxRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  // Cria o AudioContext sob demanda (precisa de gesto do usuário).
  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (AC) ctxRef.current = new AC()
    }
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const blip = useCallback(
    (freq = 660, dur = 0.06, type = 'sine', gain = 0.04) => {
      if (!enabled) return
      const ctx = ensureCtx()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + dur)
    },
    [enabled, ensureCtx],
  )

  const hover = useCallback(() => blip(880, 0.05, 'sine', 0.025), [blip])
  const click = useCallback(() => {
    blip(520, 0.05, 'triangle', 0.05)
    setTimeout(() => blip(780, 0.07, 'sine', 0.04), 35)
  }, [blip])

  useEffect(() => {
    return () => {
      if (ctxRef.current) ctxRef.current.close().catch(() => {})
    }
  }, [])

  return { enabled, setEnabled, hover, click }
}
