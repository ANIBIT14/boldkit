import { useEffect, useRef, type CSSProperties } from 'react'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Value noise with quintic interpolation
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

// Fractal noise — 3 octaves for organic terrain feel
function fbm(x: number, y: number): number {
  return vNoise(x, y) * 0.5
    + vNoise(x * 2.1 + 5.3, y * 2.1 + 1.7) * 0.3
    + vNoise(x * 4.3 + 9.1, y * 4.3 + 3.9) * 0.2
}

export interface TopographyProps {
  /** Stroke color for contour lines */
  lineColor?: string
  /** Number of contour levels */
  levels?: number
  /** Animation speed multiplier */
  speed?: number
  /** Color palette for elevation tinting (low → high) */
  palette?: string[]
  className?: string
  style?: CSSProperties
}

const DEFAULT_PALETTE = ['#0d2137', '#134e5e', '#1a7a5c', '#5da84e', '#c4b44a', '#e07e3a', '#b84232']

/**
 * Topography — Animated contour map
 *
 * Perlin-noise-driven elevation field with marching-squares contour
 * lines that morph over time. Contours are tinted by elevation for
 * a beautiful cartographic aesthetic.
 *
 * @example
 * <Topography lineColor="#8ecae6" levels={12} speed={1} />
 */
export function Topography({
  lineColor = '#8ecae6',
  levels = 12,
  speed = 1,
  palette = DEFAULT_PALETTE,
  className,
  style,
}: TopographyProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorRef   = useRef(lineColor)
  const levelsRef  = useRef(levels)
  const speedRef   = useRef(speed)
  const paletteRef = useRef(palette)

  useEffect(() => { colorRef.current   = lineColor }, [lineColor])
  useEffect(() => { levelsRef.current  = levels    }, [levels])
  useEffect(() => { speedRef.current   = speed     }, [speed])
  useEffect(() => { paletteRef.current = palette   }, [palette])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf = 0

    const CELL = 6 // grid cell size in px

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      if (el.offsetWidth > 0)  el.width  = el.offsetWidth  * dpr
      if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
    }
    resize()

    let t = 0

    const draw = () => {
      const W = el.width, H = el.height
      if (!W || !H) { raf = requestAnimationFrame(draw); return }
      const spd = speedRef.current
      const lvl = levelsRef.current
      const pal = paletteRef.current.map(hexToRgb)
      const base = hexToRgb(colorRef.current)

      ctx.fillStyle = '#0a0e17'
      ctx.fillRect(0, 0, W, H)

      const cols = Math.ceil(W / CELL) + 1
      const rows = Math.ceil(H / CELL) + 1
      const noiseScale = 0.008

      // Build elevation grid
      const grid: number[][] = []
      for (let r = 0; r < rows; r++) {
        grid[r] = []
        for (let c = 0; c < cols; c++) {
          grid[r][c] = fbm(c * CELL * noiseScale + t * 0.3, r * CELL * noiseScale + t * 0.2)
        }
      }

      // Draw contour lines using marching squares (simplified edge interpolation)
      for (let lv = 0; lv < lvl; lv++) {
        const threshold = (lv + 1) / (lvl + 1)
        const frac = lv / (lvl - 1 || 1)

        // Color interpolation from palette
        let cr: number, cg: number, cb: number
        if (pal.length > 1) {
          const s = pal.length - 1
          const idx = Math.min(s - 1, Math.floor(frac * s))
          const f = frac * s - idx
          const a = pal[idx], b = pal[idx + 1]
          cr = a[0] + (b[0] - a[0]) * f
          cg = a[1] + (b[1] - a[1]) * f
          cb = a[2] + (b[2] - a[2]) * f
        } else {
          ;[cr, cg, cb] = base
        }

        const alpha = 0.3 + frac * 0.5

        ctx.beginPath()

        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const tl = grid[r][c], tr = grid[r][c + 1]
            const bl = grid[r + 1][c], br = grid[r + 1][c + 1]

            const config =
              (tl >= threshold ? 8 : 0) |
              (tr >= threshold ? 4 : 0) |
              (br >= threshold ? 2 : 0) |
              (bl >= threshold ? 1 : 0)

            if (config === 0 || config === 15) continue

            const x0 = c * CELL, y0 = r * CELL

            // Linear interpolation for edge crossing positions
            const lerp = (a: number, b: number) => {
              const d = b - a
              return d === 0 ? 0.5 : (threshold - a) / d
            }

            const top    = { x: x0 + lerp(tl, tr) * CELL, y: y0 }
            const right  = { x: x0 + CELL, y: y0 + lerp(tr, br) * CELL }
            const bottom = { x: x0 + lerp(bl, br) * CELL, y: y0 + CELL }
            const left   = { x: x0, y: y0 + lerp(tl, bl) * CELL }

            const line = (a: { x: number; y: number }, b: { x: number; y: number }) => {
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            }

            switch (config) {
              case 1: case 14: line(left, bottom); break
              case 2: case 13: line(bottom, right); break
              case 3: case 12: line(left, right); break
              case 4: case 11: line(top, right); break
              case 5:          line(left, top); line(bottom, right); break
              case 6: case 9:  line(top, bottom); break
              case 7: case 8:  line(left, top); break
              case 10:         line(left, bottom); line(top, right); break
            }
          }
        }

        ctx.strokeStyle = `rgba(${cr|0},${cg|0},${cb|0},${alpha})`
        ctx.lineWidth = lv === 0 || lv === lvl - 1 ? 1.4 : 0.8
        ctx.stroke()
      }

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
