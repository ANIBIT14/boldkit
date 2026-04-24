import { useEffect, useRef } from 'react'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface MetaballsProps {
  /** Colors for each blob — array length sets the blob count */
  colors?: string[]
  /** Average blob radius in px */
  blobRadius?: number
  /** Movement speed multiplier */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_COLORS = ['#ff5050', '#3cb9ff', '#ffc32d', '#aa4bff', '#37ff96']

/**
 * Metaballs — Organic blob merging
 *
 * Colored blobs move around the canvas and merge smoothly when close,
 * using the classic `r²/d²` scalar field threshold. Rendered at 1/3
 * resolution and scaled up for performance.
 *
 * @example
 * <Metaballs colors={['#ff5050', '#3cb9ff', '#ffc32d']} blobRadius={70} speed={1} />
 */
export function Metaballs({
  colors = DEFAULT_COLORS,
  blobRadius = 70,
  speed = 1,
  className,
  style,
}: MetaballsProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const radiusRef  = useRef(blobRadius)
  const speedRef   = useRef(speed)

  useEffect(() => { colorsRef.current = colors     }, [colors])
  useEffect(() => { radiusRef.current = blobRadius }, [blobRadius])
  useEffect(() => { speedRef.current  = speed      }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number

    const SCALE = 3
    type Ball = { x: number; y: number; vx: number; vy: number; r: number; rgb: [number, number, number] }
    let balls: Ball[] = []

    const init = () => {
      const rgbs = colorsRef.current.map(hexToRgb)
      balls = rgbs.map(rgb => ({
        x:  el.width  * (0.2 + Math.random() * 0.6),
        y:  el.height * (0.2 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 1.3,
        vy: (Math.random() - 0.5) * 1.3,
        r:  radiusRef.current * (0.8 + Math.random() * 0.4),
        rgb,
      }))
    }

    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; init() }
    resize()

    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')!

    const draw = () => {
      const W = el.width, H = el.height
      const spd = speedRef.current
      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      balls.forEach(b => {
        b.x += b.vx * spd; b.y += b.vy * spd
        if (b.x < 0 || b.x > W) b.vx *= -1
        if (b.y < 0 || b.y > H) b.vy *= -1
      })

      const img = offCtx.createImageData(iw, ih)
      const d = img.data

      for (let py = 0; py < ih; py++) {
        for (let px = 0; px < iw; px++) {
          const wx = px * SCALE, wy = py * SCALE
          let total = 0, wr = 0, wg = 0, wb = 0
          balls.forEach(b => {
            const dx = wx - b.x, dy = wy - b.y
            const v = b.r * b.r / (dx * dx + dy * dy + 1)
            total += v; wr += b.rgb[0] * v; wg += b.rgb[1] * v; wb += b.rgb[2] * v
          })
          if (total > 0.25) {
            const i = (py * iw + px) * 4
            const tt = total + 0.001
            d[i]   = wr / tt
            d[i+1] = wg / tt
            d[i+2] = wb / tt
            d[i+3] = Math.min(255, Math.round(((total - 0.25) / 0.75) * 245))
          }
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)
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
