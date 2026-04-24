import { useEffect, useRef } from 'react'

// Smooth value noise — used to build the angle field
function vNoise(x: number, y: number): number {
  const f  = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lp = (a: number, b: number, t: number) => a + (b - a) * t
  const h  = (nx: number, ny: number) => {
    const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453
    return n - Math.floor(n)
  }
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  return lp(lp(h(ix, iy), h(ix + 1, iy), f(fx)), lp(h(ix, iy + 1), h(ix + 1, iy + 1), f(fx)), f(fy))
}

export interface FlowFieldProps {
  /** Number of particles */
  count?: number
  /** Starting hue for particle color range (0–360) */
  hueStart?: number
  /** Hue range spread in degrees */
  hueRange?: number
  /** Particle movement speed multiplier */
  speed?: number
  /** How fast trails fade (higher = shorter trails, 0.01–0.10) */
  decay?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * FlowField — Noise-driven particle trails
 *
 * Particles follow a smooth value-noise angle field, leaving
 * colored trails that slowly decay. The field itself drifts over
 * time, producing organic, ever-changing stream patterns.
 *
 * @example
 * <FlowField count={200} hueStart={170} hueRange={120} speed={1} decay={0.028} />
 */
export function FlowField({
  count = 200,
  hueStart = 170,
  hueRange = 120,
  speed = 1,
  decay = 0.028,
  className,
  style,
}: FlowFieldProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const countRef     = useRef(count)
  const hueStartRef  = useRef(hueStart)
  const hueRangeRef  = useRef(hueRange)
  const speedRef     = useRef(speed)
  const decayRef     = useRef(decay)

  useEffect(() => { countRef.current    = count    }, [count])
  useEffect(() => { hueStartRef.current = hueStart }, [hueStart])
  useEffect(() => { hueRangeRef.current = hueRange }, [hueRange])
  useEffect(() => { speedRef.current    = speed    }, [speed])
  useEffect(() => { decayRef.current    = decay    }, [decay])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number

    type P = { x: number; y: number; life: number; maxLife: number; hue: number }
    let particles: P[] = []

    const spawn = (): P => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      life: 0,
      maxLife: 60 + Math.random() * 100,
      hue: hueStartRef.current + Math.random() * hueRangeRef.current,
    })

    const init = () => { particles = Array.from({ length: countRef.current }, spawn) }

    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')!

    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; init() }
    resize()

    let t = 0
    const draw = () => {
      const W = el.width, H = el.height
      const spd = speedRef.current

      if (off.width !== W || off.height !== H) { off.width = W; off.height = H }

      offCtx.fillStyle = `rgba(0,0,0,${decayRef.current})`
      offCtx.fillRect(0, 0, W, H)

      particles.forEach((p, i) => {
        const nx = p.x * 0.006 + t * 0.12
        const ny = p.y * 0.006 + t * 0.08
        const angle = (vNoise(nx, ny) + vNoise(nx + 5.2, ny + 1.3)) * Math.PI * 3
        const px = p.x, py = p.y
        p.x += Math.cos(angle) * 1.4 * spd
        p.y += Math.sin(angle) * 1.4 * spd
        p.life++

        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          particles[i] = spawn(); return
        }

        const a = Math.min(1, p.life / 25) * (1 - p.life / p.maxLife)
        offCtx.globalAlpha = a * 0.65
        offCtx.strokeStyle = `hsl(${p.hue} 75% 60%)`
        offCtx.lineWidth = 1
        offCtx.beginPath(); offCtx.moveTo(px, py); offCtx.lineTo(p.x, p.y); offCtx.stroke()
      })

      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      ctx.drawImage(off, 0, 0)
      t += 0.006 * spd
      raf = requestAnimationFrame(draw)
    }

    draw()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
