import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface SwirlProps {
  /** Colours cycled around the spiral */
  colors?: string[]
  /** Number of hard colour bands per revolution */
  bands?: number
  /** How sharply bands twist with radius — 0 gives straight pie slices */
  twist?: number
  /** Animation speed multiplier */
  speed?: number
  /** Softness of the band edges, 0 = razor sharp, 1 = fully blended */
  softness?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#0a1450', '#00d2dc', '#ffc832', '#ff4b82']

/**
 * Swirl — twisting radial bands
 *
 * Colour bands are indexed by angle plus a radius-dependent twist, so they
 * wind into a spiral. `softness` controls the edge: at 0 the bands are hard
 * blocks, which is the neubrutalist reading of the effect.
 *
 * @example
 * <Swirl colors={['#00d2dc', '#ffc832', '#ff4b82']} bands={7} twist={2.4} />
 */
export function Swirl({
  colors = DEFAULT_COLORS,
  bands = 6,
  twist = 2.2,
  speed = 1,
  softness = 0,
  className,
  style,
}: SwirlProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const bandsRef   = useRef(bands)
  const twistRef   = useRef(twist)
  const speedRef   = useRef(speed)
  const softRef    = useRef(softness)

  useEffect(() => { colorsRef.current = colors   }, [colors])
  useEffect(() => { bandsRef.current  = bands    }, [bands])
  useEffect(() => { twistRef.current  = twist    }, [twist])
  useEffect(() => { speedRef.current  = speed    }, [speed])
  useEffect(() => { softRef.current   = softness }, [softness])

  useCanvasEffect(ref, (ctx, el) => {
    const SCALE = 3
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return

      const pal = colorsRef.current.map(hexToRgb)
      if (!pal.length) return
      const nb = Math.max(1, Math.round(bandsRef.current))
      const tw = twistRef.current
      const soft = Math.max(0, Math.min(1, softRef.current))

      const iw = Math.max(1, Math.ceil(W / SCALE))
      const ih = Math.max(1, Math.ceil(H / SCALE))
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      const img = offCtx.createImageData(iw, ih)
      const d = img.data
      const cx = iw / 2, cy = ih / 2
      const maxR = Math.hypot(cx, cy)

      for (let py = 0; py < ih; py++) {
        const dy = py - cy
        for (let px = 0; px < iw; px++) {
          const dx = px - cx
          const r = Math.hypot(dx, dy) / maxR
          const a = Math.atan2(dy, dx)

          // Band coordinate: angle, wound by radius, drifting over time.
          const s = (a / (Math.PI * 2)) * nb + r * tw * nb * 0.25 + t
          const idx = Math.floor(s)
          const frac = s - idx

          const c0 = pal[((idx % pal.length) + pal.length) % pal.length]
          const c1 = pal[(((idx + 1) % pal.length) + pal.length) % pal.length]

          // soft = 0 → step; soft = 1 → linear crossfade across the whole band.
          let mix: number
          if (soft <= 0) {
            mix = 0
          } else {
            const edge = 1 - soft
            mix = frac <= edge ? 0 : (frac - edge) / Math.max(1e-4, soft)
          }

          const i = (py * iw + px) * 4
          d[i]     = c0[0] + (c1[0] - c0[0]) * mix
          d[i + 1] = c0[1] + (c1[1] - c0[1]) * mix
          d[i + 2] = c0[2] + (c1[2] - c0[2]) * mix
          d[i + 3] = 255
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = soft > 0
      ctx.drawImage(off, 0, 0, W, H)

      t += 0.006 * speedRef.current * frames
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
