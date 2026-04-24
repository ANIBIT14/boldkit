import { useEffect, useRef } from 'react'

export interface ParticleWebProps {
  /** Number of floating particles */
  count?: number
  /** Particle dot color */
  particleColor?: string
  /** Connection line color */
  lineColor?: string
  /** Max distance (px) for drawing a connection */
  maxDistance?: number
  /** Particle movement speed multiplier */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * ParticleWeb — Proximity particle graph
 *
 * Particles float around the canvas; any two within `maxDistance`
 * are connected by a line whose opacity fades with distance.
 *
 * @example
 * <ParticleWeb count={60} particleColor="#818cf8" lineColor="#6366f1" maxDistance={110} speed={1} />
 */
export function ParticleWeb({
  count = 60,
  particleColor = '#818cf8',
  lineColor = '#6366f1',
  maxDistance = 110,
  speed = 1,
  className,
  style,
}: ParticleWebProps) {
  const ref              = useRef<HTMLCanvasElement>(null)
  const countRef         = useRef(count)
  const particleColorRef = useRef(particleColor)
  const lineColorRef     = useRef(lineColor)
  const maxDistRef       = useRef(maxDistance)
  const speedRef         = useRef(speed)

  useEffect(() => { countRef.current         = count         }, [count])
  useEffect(() => { particleColorRef.current = particleColor }, [particleColor])
  useEffect(() => { lineColorRef.current     = lineColor     }, [lineColor])
  useEffect(() => { maxDistRef.current       = maxDistance   }, [maxDistance])
  useEffect(() => { speedRef.current         = speed         }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number

    type P = { x: number; y: number; vx: number; vy: number }
    let pts: P[] = []

    const init = () => {
      const n = countRef.current
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * el.width, y: Math.random() * el.height,
        vx: (Math.random() - 0.5) * 0.9, vy: (Math.random() - 0.5) * 0.9,
      }))
    }

    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; init() }
    resize()

    const draw = () => {
      const W = el.width, H = el.height
      const spd = speedRef.current, MD = maxDistRef.current
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        p.x += p.vx * spd; p.y += p.vy * spd
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MD) {
            const a = 1 - d / MD
            ctx.globalAlpha = a * 0.55
            ctx.strokeStyle = lineColorRef.current
            ctx.lineWidth = a * 1.5
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      pts.forEach(p => {
        ctx.fillStyle = particleColorRef.current
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6)
      })

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
