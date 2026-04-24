import { useEffect, useRef } from 'react'

export interface DotBlobProps {
  /** Dot fill color */
  color?: string
  /** Max dot radius in px */
  dotSize?: number
  /** Distance between dot centers in px */
  gap?: number
  /** Animation speed multiplier (1 = normal) */
  speed?: number
  /** Field values below this threshold leave blank space (0–1) */
  threshold?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * DotBlob — Halftone wave field
 *
 * A Gaussian envelope × traveling wave drives halftone dot sizes.
 * Two crossing wave components carve blank spaces in the troughs
 * and bloom into pixels at the crests.
 *
 * @example
 * <DotBlob color="#c9ba4c" dotSize={4} gap={9} speed={1} threshold={0.28} />
 */
export function DotBlob({
  color = '#c9ba4c',
  dotSize = 4,
  gap = 9,
  speed = 1,
  threshold = 0.28,
  className,
  style,
}: DotBlobProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  // Live prop refs — animation reads these; changes take effect without restart
  const colorRef     = useRef(color)
  const dotSizeRef   = useRef(dotSize)
  const gapRef       = useRef(gap)
  const speedRef     = useRef(speed)
  const thresholdRef = useRef(threshold)

  useEffect(() => { colorRef.current     = color     }, [color])
  useEffect(() => { dotSizeRef.current   = dotSize   }, [dotSize])
  useEffect(() => { gapRef.current       = gap       }, [gap])
  useEffect(() => { speedRef.current     = speed     }, [speed])
  useEffect(() => { thresholdRef.current = threshold }, [threshold])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number

    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
    resize()

    const gauss = (px: number, py: number, cx: number, cy: number, rx: number, ry: number) => {
      const dx = (px - cx) / rx, dy = (py - cy) / ry
      return Math.exp(-(dx * dx + dy * dy) * 0.5)
    }

    let t = 0
    const draw = () => {
      const GAP       = gapRef.current
      const MAX_DOT   = dotSizeRef.current
      const THRESHOLD = thresholdRef.current
      const W = el.width, H = el.height
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      const ex = W * (0.42 + 0.08 * Math.sin(t * 0.18))
      const ey = H * (0.60 + 0.06 * Math.sin(t * 0.13))

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * GAP, py = r * GAP
          const env = Math.min(1,
            gauss(px, py, ex,       ey,       W * 0.32, H * 0.26) * 1.0 +
            gauss(px, py, W * 0.10, H * 0.88, W * 0.15, H * 0.13) * 0.55 +
            gauss(px, py, W * 0.78, H * 0.88, W * 0.12, H * 0.10) * 0.40,
          )
          if (env < 0.05) continue
          const wave =
            0.55 * Math.sin(c * 0.38 - t * 2.2 + r * 0.12) +
            0.35 * Math.sin(c * 0.22 + r * 0.35 - t * 1.7) +
            0.10 * Math.sin(c * 0.60 - r * 0.20 + t * 2.8)
          const v = env * (wave + 1) / 2
          if (v < THRESHOLD) continue
          const vAbove = (v - THRESHOLD) / (1 - THRESHOLD)
          const size = Math.sqrt(vAbove) * MAX_DOT + 0.8
          ctx.globalAlpha = 0.25 + vAbove * 0.75
          ctx.fillStyle = colorRef.current
          ctx.fillRect(px - size / 2, py - size / 2, size, size)
        }
      }
      ctx.globalAlpha = 1
      t += 0.032 * speedRef.current
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
