import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface HalftoneProps {
  /** Dot color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Maximum dot radius as a fraction of gap (0–1) */
  maxScale?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Halftone — print-style dot field
 *
 * A grid of dots whose radii track a drifting brightness field, recreating
 * the newspaper / comic-book halftone look. The cursor brightens nearby dots,
 * pushing the pattern outward like a spotlight.
 *
 * @example
 * <Halftone color="#111111" bgColor="#facc15" gap={18} maxScale={0.75} speed={1} />
 */
export function Halftone({
  color = '#111111',
  bgColor = '#facc15',
  gap = 18,
  maxScale = 0.75,
  speed = 1,
  className,
  style,
}: HalftoneProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const gapRef = useRef(gap)
  const scaleRef = useRef(maxScale)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { gapRef.current = gap }, [gap])
  useEffect(() => { scaleRef.current = maxScale }, [maxScale])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el, signal) => {
    // Backing-store pixels per CSS pixel (reflects the maxPixelCount clamp).
    const scale = () => (el.offsetWidth ? el.width / el.offsetWidth : 1)

    // Cursor in device pixels; off-screen until the pointer moves.
    const mouse = { x: -1e4, y: -1e4 }
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * scale()
      mouse.y = (e.clientY - rect.top) * scale()
    }
    const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4 }
    el.addEventListener('pointermove', onMove, { signal })
    el.addEventListener('pointerleave', onLeave, { signal })


    let t = 0
    return (_dt, frames) => {
      const W = el.width, H = el.height
      const GAP = Math.max(6, gapRef.current * scale())
      const maxR = (GAP / 2) * scaleRef.current
      const reach = GAP * 5
      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = colorRef.current

      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      for (let c = 0; c < cols; c++) {
        const cx = c * GAP + GAP / 2
        for (let r = 0; r < rows; r++) {
          const cy = r * GAP + GAP / 2
          let v =
            (Math.sin(cx * 0.01 + t) +
              Math.sin(cy * 0.013 - t * 0.8) +
              Math.sin((cx + cy) * 0.008 + t * 1.3)) /
              6 +
            0.5
          const d = Math.hypot(cx - mouse.x, cy - mouse.y)
          if (d < reach) v += (1 - d / reach) * 0.9
          const rad = Math.max(0, Math.min(1, v)) * maxR
          if (rad < 0.4) continue
          ctx.beginPath()
          ctx.arc(cx, cy, rad, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      t += 0.02 * speedRef.current * frames
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
