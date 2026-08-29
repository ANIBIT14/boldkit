import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

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
  style?: CSSProperties
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

  useCanvasEffect(ref, (ctx, el) => {
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


    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const spd = speedRef.current
      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      balls.forEach(b => {
        b.x += b.vx * spd * frames; b.y += b.vy * spd * frames
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
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
