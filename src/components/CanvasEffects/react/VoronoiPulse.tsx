import { useEffect, useRef, type CSSProperties } from 'react'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface VoronoiPulseProps {
  /** Number of Voronoi seed points */
  cellCount?: number
  /** Color palette — each cell gets a color from this array */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** Border line width */
  borderWidth?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#85c1e9']

/**
 * VoronoiPulse — Animated Voronoi tessellation
 *
 * Drifting seed points generate a Voronoi diagram via brute-force
 * nearest-neighbor. Cell fills pulse with color waves that ripple
 * outward from random centers. Rendered at ⅓ resolution for performance.
 *
 * @example
 * <VoronoiPulse cellCount={24} colors={['#ff6b6b','#4ecdc4','#45b7d1']} speed={1} />
 */
export function VoronoiPulse({
  cellCount = 24,
  colors = DEFAULT_COLORS,
  speed = 1,
  borderWidth = 1.5,
  className,
  style,
}: VoronoiPulseProps) {
  const ref         = useRef<HTMLCanvasElement>(null)
  const countRef    = useRef(cellCount)
  const colorsRef   = useRef(colors)
  const speedRef    = useRef(speed)
  const borderRef   = useRef(borderWidth)

  useEffect(() => { countRef.current  = cellCount   }, [cellCount])
  useEffect(() => { colorsRef.current = colors      }, [colors])
  useEffect(() => { speedRef.current  = speed       }, [speed])
  useEffect(() => { borderRef.current = borderWidth }, [borderWidth])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let raf = 0

    type Seed = { x: number; y: number; vx: number; vy: number; rgb: [number, number, number]; phase: number }
    let seeds: Seed[] = []

    const SCALE = 3
    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    const init = () => {
      const cls = colorsRef.current.map(hexToRgb)
      seeds = Array.from({ length: countRef.current }, (_, i) => ({
        x:  Math.random(),
        y:  Math.random(),
        vx: (Math.random() - 0.5) * 0.0012,
        vy: (Math.random() - 0.5) * 0.0012,
        rgb: cls[i % cls.length],
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      if (el.offsetWidth > 0)  el.width  = el.offsetWidth  * dpr
      if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
      init()
    }
    resize()

    let t = 0

    const draw = () => {
      const W = el.width, H = el.height
      if (!W || !H) { raf = requestAnimationFrame(draw); return }
      const spd = speedRef.current

      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      // Move seeds
      seeds.forEach(s => {
        s.x += s.vx * spd
        s.y += s.vy * spd
        if (s.x < 0 || s.x > 1) s.vx *= -1
        if (s.y < 0 || s.y > 1) s.vy *= -1
      })

      const img = offCtx.createImageData(iw, ih)
      const d = img.data

      for (let py = 0; py < ih; py++) {
        for (let px = 0; px < iw; px++) {
          const wx = px / iw, wy = py / ih
          let minDist = Infinity, minIdx = 0
          let secondDist = Infinity

          // Find nearest and second-nearest seed
          for (let i = 0; i < seeds.length; i++) {
            const dx = (wx - seeds[i].x) * (W / H) // aspect correction
            const dy = wy - seeds[i].y
            const dist = dx * dx + dy * dy
            if (dist < minDist) {
              secondDist = minDist
              minDist = dist
              minIdx = i
            } else if (dist < secondDist) {
              secondDist = dist
            }
          }

          const seed = seeds[minIdx]
          const [r, g, b] = seed.rgb

          // Pulse: brightness oscillates per-cell
          const pulse = 0.5 + 0.35 * Math.sin(t * 2.5 + seed.phase)

          // Edge detection: where second-nearest is close to nearest
          const edgeFactor = Math.sqrt(secondDist) - Math.sqrt(minDist)
          const isEdge = edgeFactor < 0.012

          const i = (py * iw + px) * 4
          if (isEdge) {
            // Bright border
            d[i]     = Math.min(255, r + 120)
            d[i + 1] = Math.min(255, g + 120)
            d[i + 2] = Math.min(255, b + 120)
            d[i + 3] = 220
          } else {
            // Cell fill with pulse
            const dark = 0.08 + pulse * 0.18
            d[i]     = r * dark
            d[i + 1] = g * dark
            d[i + 2] = b * dark
            d[i + 3] = 255
          }
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)

      t += 0.016 * spd
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
