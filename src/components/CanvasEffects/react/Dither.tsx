import { useEffect, useRef, type CSSProperties } from 'react'

export interface DitherProps {
  /** Background / "off" color */
  bgColor?: string
  /** Foreground / "on" color */
  color?: string
  /** Size of each dithered pixel block in px */
  pixelSize?: number
  /** Spatial scale of the underlying plasma field */
  scale?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

// 4×4 Bayer ordered-dithering threshold matrix, normalised to (0,1).
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map(row => row.map(v => (v + 0.5) / 16))

/**
 * Dither — 1-bit Bayer ordered dithering
 *
 * A drifting plasma field is quantised to two colors through a 4×4 Bayer
 * threshold matrix and rendered as chunky pixels — the classic 1-bit /
 * Game Boy aesthetic, rebuilt for the neubrutalism era.
 *
 * @example
 * <Dither bgColor="#0a0a0a" color="#84ff3c" pixelSize={4} scale={1} speed={1} />
 */
export function Dither({
  bgColor = '#0a0a0a',
  color = '#84ff3c',
  pixelSize = 4,
  scale = 1,
  speed = 1,
  className,
  style,
}: DitherProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef(bgColor)
  const fgRef = useRef(color)
  const pxRef = useRef(pixelSize)
  const scaleRef = useRef(scale)
  const speedRef = useRef(speed)

  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { fgRef.current = color }, [color])
  useEffect(() => { pxRef.current = pixelSize }, [pixelSize])
  useEffect(() => { scaleRef.current = scale }, [scale])
  useEffect(() => { speedRef.current = speed }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let raf = 0

    const resize = () => {
      if (!el.offsetWidth || !el.offsetHeight) return
      const dpr = window.devicePixelRatio || 1
      el.width = el.offsetWidth * dpr
      el.height = el.offsetHeight * dpr
    }
    resize()

    let t = 0
    const draw = () => {
      const W = el.width, H = el.height
      const px = Math.max(2, pxRef.current)
      const k = 0.012 * scaleRef.current
      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = fgRef.current

      const cols = Math.ceil(W / px)
      const rows = Math.ceil(H / px)
      for (let c = 0; c < cols; c++) {
        const x = c * px
        for (let r = 0; r < rows; r++) {
          const y = r * px
          // Cheap layered-sine plasma in [0,1].
          const v =
            (Math.sin(x * k + t) +
              Math.sin(y * k * 1.3 - t * 0.8) +
              Math.sin((x + y) * k * 0.7 + t * 1.2) +
              Math.sin(Math.hypot(x - W / 2, y - H / 2) * k * 0.9 - t)) /
              8 +
            0.5
          if (v > BAYER[r & 3][c & 3]) ctx.fillRect(x, y, px, px)
        }
      }

      t += 0.02 * speedRef.current
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
