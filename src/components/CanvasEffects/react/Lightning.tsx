import { useEffect, useRef, type CSSProperties } from 'react'

export interface LightningProps {
  /** Primary bolt color */
  color?: string
  /** Seconds between new bolts */
  boltInterval?: number
  /** Max branch depth per bolt */
  branches?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Lightning — Fractal electric arcs
 *
 * Branching lightning bolts strike between random anchor points with
 * recursive midpoint-displacement subdivision, glow bloom, and
 * progressive fade-out. New bolts spawn at a configurable interval.
 *
 * @example
 * <Lightning color="#7df9ff" boltInterval={1.2} branches={4} speed={1} />
 */
export function Lightning({
  color = '#7df9ff',
  boltInterval = 1.2,
  branches = 4,
  speed = 1,
  className,
  style,
}: LightningProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const colorRef     = useRef(color)
  const intervalRef  = useRef(boltInterval)
  const branchRef    = useRef(branches)
  const speedRef     = useRef(speed)

  useEffect(() => { colorRef.current    = color        }, [color])
  useEffect(() => { intervalRef.current = boltInterval }, [boltInterval])
  useEffect(() => { branchRef.current   = branches     }, [branches])
  useEffect(() => { speedRef.current    = speed        }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      if (el.offsetWidth > 0)  el.width  = el.offsetWidth  * dpr
      if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
    }
    resize()

    // Midpoint displacement — creates jagged bolt path
    function subdivide(
      x1: number, y1: number, x2: number, y2: number,
      depth: number, jitter: number,
    ): Array<{ x: number; y: number }> {
      if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * jitter
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * jitter
      const left  = subdivide(x1, y1, mx, my, depth - 1, jitter * 0.55)
      const right = subdivide(mx, my, x2, y2, depth - 1, jitter * 0.55)
      return [...left, ...right.slice(1)]
    }

    type Bolt = {
      segments: Array<{ x: number; y: number }>[]
      alpha: number
      width: number
      color: string
    }

    let bolts: Bolt[] = []
    let timer = 0

    function spawnBolt() {
      const W = el!.width, H = el!.height
      const col = colorRef.current
      const maxBranch = branchRef.current

      // Main trunk — top to bottom with some horizontal variance
      const x1 = W * (0.2 + Math.random() * 0.6)
      const y1 = H * 0.02
      const x2 = W * (0.15 + Math.random() * 0.7)
      const y2 = H * (0.85 + Math.random() * 0.13)

      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      const trunk = subdivide(x1, y1, x2, y2, 7, dist * 0.18)

      const allSegments: Array<{ x: number; y: number }>[] = [trunk]

      // Branches fork off the main trunk
      const branchCount = 2 + Math.floor(Math.random() * maxBranch)
      for (let b = 0; b < branchCount; b++) {
        const idx = Math.floor(trunk.length * (0.15 + Math.random() * 0.6))
        const origin = trunk[idx]
        const angle = (Math.random() - 0.5) * 1.6 + Math.PI * 0.5
        const len = dist * (0.15 + Math.random() * 0.25)
        const ex = origin.x + Math.cos(angle) * len
        const ey = origin.y + Math.sin(angle) * len
        allSegments.push(subdivide(origin.x, origin.y, ex, ey, 5, len * 0.22))
      }

      bolts.push({ segments: allSegments, alpha: 1.2, width: 2.5, color: col })
    }

    const draw = () => {
      const W = el.width, H = el.height
      const spd = speedRef.current

      // Darken background — fast fade for electric feel
      ctx.fillStyle = 'rgba(5,2,15,0.25)'
      ctx.fillRect(0, 0, W, H)

      // Spawn timer
      timer += 0.016 * spd
      if (timer >= intervalRef.current) {
        spawnBolt()
        timer = 0
      }

      // Draw & age bolts
      bolts = bolts.filter(bolt => {
        bolt.alpha -= 0.018 * spd
        if (bolt.alpha <= 0) return false

        const a = Math.min(1, bolt.alpha)

        bolt.segments.forEach((seg, si) => {
          const isTrunk = si === 0
          const lw = isTrunk ? bolt.width : bolt.width * 0.5

          // Glow layer
          ctx.beginPath()
          seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = bolt.color
          ctx.lineWidth = lw + 6
          ctx.globalAlpha = a * 0.15
          ctx.shadowColor = bolt.color
          ctx.shadowBlur = 25
          ctx.stroke()

          // Core layer
          ctx.beginPath()
          seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = bolt.color
          ctx.lineWidth = lw
          ctx.globalAlpha = a * 0.85
          ctx.shadowBlur = 12
          ctx.stroke()

          // Hot white center for trunk
          if (isTrunk) {
            ctx.beginPath()
            seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = lw * 0.35
            ctx.globalAlpha = a * 0.7
            ctx.shadowBlur = 4
            ctx.stroke()
          }
        })

        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
        return true
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
