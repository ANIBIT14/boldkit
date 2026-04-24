import { useEffect, useRef } from 'react'

export interface MatrixRainProps {
  /** Color of the bright head square */
  headColor?: string
  /** Base hue (0–360) for the falling trail (uses HSL) */
  trailHue?: number
  /** Column width in px */
  gap?: number
  /** Fall speed multiplier */
  speed?: number
  /** Number of squares in each column's tail */
  tailLength?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * MatrixRain — Falling column simulation
 *
 * Each column has a bright head and a fading tail. Head color, trail
 * hue, column width, speed, and tail length are all configurable.
 *
 * @example
 * <MatrixRain headColor="#ffffff" trailHue={120} gap={16} speed={1} tailLength={10} />
 */
export function MatrixRain({
  headColor = '#ffffff',
  trailHue = 120,
  gap = 16,
  speed = 1,
  tailLength = 10,
  className,
  style,
}: MatrixRainProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const headColorRef = useRef(headColor)
  const trailHueRef  = useRef(trailHue)
  const gapRef       = useRef(gap)
  const speedRef     = useRef(speed)
  const tailRef      = useRef(tailLength)

  useEffect(() => { headColorRef.current = headColor  }, [headColor])
  useEffect(() => { trailHueRef.current  = trailHue   }, [trailHue])
  useEffect(() => { gapRef.current       = gap        }, [gap])
  useEffect(() => { speedRef.current     = speed      }, [speed])
  useEffect(() => { tailRef.current      = tailLength }, [tailLength])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number

    let cols: number[] = []
    const resize = () => {
      el.width = el.offsetWidth; el.height = el.offsetHeight
      const TAIL = tailRef.current
      cols = Array.from({ length: Math.ceil(el.width / gapRef.current) }, () =>
        -Math.floor(Math.random() * (el.height / gapRef.current + TAIL))
      )
    }
    resize()

    const draw = () => {
      const GAP  = gapRef.current
      const TAIL = tailRef.current
      const W = el.width, H = el.height
      ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 0, W, H)
      const rows = Math.ceil(H / GAP), size = GAP - 3

      // Adjust column array width if needed
      const needed = Math.ceil(W / GAP)
      while (cols.length < needed) cols.push(-Math.floor(Math.random() * 12))
      if (cols.length > needed) cols.length = needed

      cols.forEach((head, c) => {
        for (let i = 0; i < TAIL; i++) {
          const row = Math.floor(head) - i
          if (row < 0 || row > rows) continue
          const bright = 1 - i / TAIL
          ctx.globalAlpha = bright
          ctx.fillStyle = i === 0
            ? headColorRef.current
            : `hsl(${trailHueRef.current} 100% ${28 + bright * 28}%)`
          ctx.fillRect(c * GAP + 1, row * GAP + 1, size, size)
        }
        cols[c] = head >= rows + TAIL ? -Math.floor(Math.random() * 12) : head + 0.28 * speedRef.current
      })

      ctx.globalAlpha = 1
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
