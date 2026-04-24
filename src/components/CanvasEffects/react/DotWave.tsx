import { useEffect, useRef } from 'react'

export interface DotWaveProps {
  /** Dot fill color */
  color?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * DotWave — Sine-field dot grid
 *
 * Two crossing sine waves modulate each dot's size and opacity,
 * creating a rippling fabric of colored squares.
 *
 * @example
 * <DotWave color="#ef4444" gap={22} speed={1} />
 */
export function DotWave({
  color = '#ef4444',
  gap = 22,
  speed = 1,
  className,
  style,
}: DotWaveProps) {
  const ref      = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const gapRef   = useRef(gap)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { gapRef.current   = gap   }, [gap])
  useEffect(() => { speedRef.current = speed }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number
    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
    resize()

    let t = 0
    const draw = () => {
      const GAP = gapRef.current
      const W = el.width, H = el.height
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = (Math.sin(c * 0.45 + r * 0.3 - t * 1.2) +
                     Math.sin(c * 0.2 - r * 0.4 + t * 0.8) + 2) / 4
          const size = 2 + v * 8
          ctx.globalAlpha = 0.15 + v * 0.85
          ctx.fillStyle = colorRef.current
          ctx.fillRect(c * GAP + GAP / 2 - size / 2, r * GAP + GAP / 2 - size / 2, size, size)
        }
      }
      ctx.globalAlpha = 1
      t += 0.035 * speedRef.current
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
