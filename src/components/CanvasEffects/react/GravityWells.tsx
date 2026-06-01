import { useEffect, useRef, type CSSProperties } from 'react'

export interface GravityWellsProps {
  /** Number of gravitational attractors */
  wellCount?: number
  /** Number of orbiting particles */
  particleCount?: number
  /** Palette for particles — cycles through array */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff6b6b', '#51cf66', '#339af0', '#fcc419', '#cc5de8']

/**
 * GravityWells — Orbital particle physics
 *
 * Particles orbit drifting gravitational attractors, leaving fading
 * trails that form accretion-disk spirals. Each particle spawns in a
 * tangential orbit around the nearest well and slowly spirals inward
 * due to light friction, producing layered colored swirls.
 *
 * @example
 * <GravityWells wellCount={3} particleCount={180} speed={1} />
 */
export function GravityWells({
  wellCount = 3,
  particleCount = 180,
  colors = DEFAULT_COLORS,
  speed = 1,
  className,
  style,
}: GravityWellsProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const wellRef      = useRef(wellCount)
  const countRef     = useRef(particleCount)
  const colorsRef    = useRef(colors)
  const speedRef     = useRef(speed)

  useEffect(() => { wellRef.current   = wellCount     }, [wellCount])
  useEffect(() => { countRef.current  = particleCount }, [particleCount])
  useEffect(() => { colorsRef.current = colors        }, [colors])
  useEffect(() => { speedRef.current  = speed         }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let raf = 0

    type Well = { x: number; y: number; vx: number; vy: number; mass: number }
    type Particle = {
      x: number; y: number; px: number; py: number
      vx: number; vy: number; color: string; life: number; maxLife: number
    }
    let wells: Well[] = []
    let particles: Particle[] = []

    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    const initWells = () => {
      const W = el.width, H = el.height
      wells = Array.from({ length: wellRef.current }, () => ({
        x:  W * (0.2 + Math.random() * 0.6),
        y:  H * (0.2 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        mass: 400 + Math.random() * 300,
      }))
    }

    // Spawn particle in tangential orbit around a random well
    const spawnParticle = (): Particle => {
      const cls = colorsRef.current
      const w = wells[Math.floor(Math.random() * wells.length)]
      const orbitR = 60 + Math.random() * 180
      const angle = Math.random() * Math.PI * 2
      const x = w.x + Math.cos(angle) * orbitR
      const y = w.y + Math.sin(angle) * orbitR

      // Tangential velocity for roughly circular orbit
      const tangentSpeed = Math.sqrt(w.mass / orbitR) * (0.7 + Math.random() * 0.6)
      const dir = Math.random() < 0.5 ? 1 : -1 // random orbit direction
      const vx = -Math.sin(angle) * tangentSpeed * dir
      const vy =  Math.cos(angle) * tangentSpeed * dir

      return {
        x, y, px: x, py: y, vx, vy,
        color: cls[Math.floor(Math.random() * cls.length)],
        life: 0,
        maxLife: 400 + Math.random() * 500,
      }
    }

    const init = () => {
      initWells()
      particles = Array.from({ length: countRef.current }, spawnParticle)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      if (el.offsetWidth > 0)  el.width  = el.offsetWidth  * dpr
      if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
      init()
    }
    resize()

    const draw = () => {
      const W = el.width, H = el.height
      const spd = speedRef.current

      if (off.width !== W || off.height !== H) { off.width = W; off.height = H }

      // Fade trail — moderate speed for visible spiral tails
      offCtx.fillStyle = 'rgba(0,0,0,0.035)'
      offCtx.fillRect(0, 0, W, H)

      // Drift wells slowly
      wells.forEach(w => {
        w.x += w.vx * spd
        w.y += w.vy * spd
        if (w.x < W * 0.15 || w.x > W * 0.85) w.vx *= -1
        if (w.y < H * 0.15 || w.y > H * 0.85) w.vy *= -1
      })

      // Update & draw particles
      particles.forEach((p, i) => {
        p.px = p.x
        p.py = p.y

        // Gravitational pull from each well
        wells.forEach(w => {
          const dx = w.x - p.x, dy = w.y - p.y
          const distSq = dx * dx + dy * dy
          const dist = Math.sqrt(distSq) + 50 // softening
          const force = w.mass / (dist * dist)
          p.vx += (dx / dist) * force * 0.08 * spd
          p.vy += (dy / dist) * force * 0.08 * spd
        })

        // Light friction — causes gradual spiral inward
        p.vx *= 0.998
        p.vy *= 0.998

        // Soft velocity cap
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (vel > 6) {
          p.vx *= 6 / vel
          p.vy *= 6 / vel
        }

        p.x += p.vx * spd
        p.y += p.vy * spd
        p.life++

        // Respawn if out of bounds, too old, or collapsed into a well
        const nearWell = wells.some(w => {
          const dx = w.x - p.x, dy = w.y - p.y
          return dx * dx + dy * dy < 100
        })

        if (p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80
          || p.life > p.maxLife || nearWell) {
          particles[i] = spawnParticle()
          return
        }

        // Draw trail segment (line from previous to current position)
        const fadeIn = Math.min(1, p.life / 30)
        const fadeOut = 1 - p.life / p.maxLife
        const a = fadeIn * fadeOut * 0.75

        offCtx.globalAlpha = a
        offCtx.strokeStyle = p.color
        offCtx.lineWidth = 1.6
        offCtx.beginPath()
        offCtx.moveTo(p.px, p.py)
        offCtx.lineTo(p.x, p.y)
        offCtx.stroke()
      })

      // Draw well glow
      wells.forEach(w => {
        const grad = offCtx.createRadialGradient(w.x, w.y, 0, w.x, w.y, 55)
        grad.addColorStop(0, 'rgba(255,255,255,0.12)')
        grad.addColorStop(0.4, 'rgba(255,255,255,0.04)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        offCtx.globalAlpha = 1
        offCtx.fillStyle = grad
        offCtx.beginPath()
        offCtx.arc(w.x, w.y, 55, 0, Math.PI * 2)
        offCtx.fill()
      })

      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      ctx.drawImage(off, 0, 0)
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
