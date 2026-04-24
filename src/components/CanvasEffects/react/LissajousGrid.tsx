import { useEffect, useRef } from 'react'

export interface LissajousGridProps {
  /** Number of columns (x-frequency range 1..cols) */
  cols?: number
  /** Number of rows (y-frequency range 1..rows) */
  rows?: number
  /** Phase drift speed multiplier */
  speed?: number
  /** Starting hue for the color gradient (0–360) */
  hueStart?: number
  /** Line opacity (0–1) */
  opacity?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * LissajousGrid — Parametric curve table
 *
 * A grid of Lissajous figures where column index sets the x-frequency
 * and row index sets the y-frequency. A slowly drifting phase makes all
 * curves morph together, creating a mesmerising synchronised animation.
 *
 * @example
 * <LissajousGrid cols={4} rows={3} speed={1} hueStart={30} opacity={0.72} />
 */
export function LissajousGrid({
  cols = 4,
  rows = 3,
  speed = 1,
  hueStart = 30,
  opacity = 0.72,
  className,
  style,
}: LissajousGridProps) {
  const ref         = useRef<HTMLCanvasElement>(null)
  const colsRef     = useRef(cols)
  const rowsRef     = useRef(rows)
  const speedRef    = useRef(speed)
  const hueRef      = useRef(hueStart)
  const opacityRef  = useRef(opacity)

  useEffect(() => { colsRef.current    = cols      }, [cols])
  useEffect(() => { rowsRef.current    = rows      }, [rows])
  useEffect(() => { speedRef.current   = speed     }, [speed])
  useEffect(() => { hueRef.current     = hueStart  }, [hueStart])
  useEffect(() => { opacityRef.current = opacity   }, [opacity])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number
    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
    resize()

    const STEPS = 700
    let phase = 0

    const draw = () => {
      const W = el.width, H = el.height
      const C = colsRef.current, R = rowsRef.current
      ctx.clearRect(0, 0, W, H)
      const cw = W / C, ch = H / R

      for (let row = 0; row < R; row++) {
        for (let col = 0; col < C; col++) {
          const fx = col + 1, fy = row + 1
          const cx = (col + 0.5) * cw, cy = (row + 0.5) * ch
          const rx = cw / 2 - 10, ry = ch / 2 - 10
          const period = Math.PI * 2 * fx * fy

          ctx.beginPath()
          for (let i = 0; i <= STEPS; i++) {
            const t = (i / STEPS) * period
            const x = cx + rx * Math.sin(fx * t + phase)
            const y = cy + ry * Math.sin(fy * t)
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          const hue = hueRef.current + ((col * R + row) / (C * R)) * 280
          ctx.strokeStyle = `hsla(${hue % 360}, 85%, 62%, ${opacityRef.current})`
          ctx.lineWidth = 1.1
          ctx.stroke()

          ctx.strokeStyle = 'rgba(255,255,255,0.04)'
          ctx.lineWidth = 0.5
          ctx.strokeRect(col * cw + 0.5, row * ch + 0.5, cw - 1, ch - 1)
        }
      }

      phase += 0.007 * speedRef.current
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
