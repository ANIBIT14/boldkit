import { useEffect, useRef } from 'react'

export interface MouseRippleProps {
  /** Dot fill color */
  color?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Radius of the ripple influence zone in px */
  rippleRadius?: number
  /** Ripple wave speed multiplier */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * MouseRipple — Interactive dot-grid ripple
 *
 * Move the mouse over the canvas to send a sine ripple through
 * the dot grid. Dots outside the cursor zone stay at rest.
 *
 * @example
 * <MouseRipple color="#f59e0b" gap={24} rippleRadius={130} speed={1} />
 */
export function MouseRipple({
  color = '#f59e0b',
  gap = 24,
  rippleRadius = 130,
  speed = 1,
  className,
  style,
}: MouseRippleProps) {
  const ref           = useRef<HTMLCanvasElement>(null)
  const mouse         = useRef({ x: -999, y: -999 })
  const colorRef      = useRef(color)
  const gapRef        = useRef(gap)
  const radiusRef     = useRef(rippleRadius)
  const speedRef      = useRef(speed)

  useEffect(() => { colorRef.current  = color        }, [color])
  useEffect(() => { gapRef.current    = gap          }, [gap])
  useEffect(() => { radiusRef.current = rippleRadius }, [rippleRadius])
  useEffect(() => { speedRef.current  = speed        }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf: number
    const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
    resize()

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    el.addEventListener('mousemove', onMove)

    let t = 0
    const draw = () => {
      const GAP = gapRef.current
      const W = el.width, H = el.height
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
      const { x: mx, y: my } = mouse.current
      const RAD = radiusRef.current

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * GAP + GAP / 2, cy = r * GAP + GAP / 2
          const dx = cx - mx, dy = cy - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ripple = Math.max(0, 1 - dist / RAD) * Math.sin(dist * 0.14 - t * 3.2)
          const size = 3 + ripple * 9
          ctx.globalAlpha = Math.max(0.1, Math.min(1, 0.25 + Math.abs(ripple) * 0.75))
          ctx.fillStyle = colorRef.current
          ctx.fillRect(cx - size / 2, cy - size / 2, size, size)
        }
      }

      ctx.globalAlpha = 1
      t += 0.06 * speedRef.current
      raf = requestAnimationFrame(draw)
    }

    draw()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair', ...style }}
    />
  )
}
