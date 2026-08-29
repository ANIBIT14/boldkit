import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface TruchetProps {
  /** Arc / line color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Tile size in px */
  tileSize?: number
  /** Line thickness in px */
  lineWidth?: number
  /** Animation speed multiplier (flow + flip rate) */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Truchet — flowing arc-tile maze
 *
 * A grid of square tiles, each holding two quarter-arcs in one of two
 * orientations, joins into endless looping curves. A travelling dash makes the
 * paths flow while tiles occasionally flip to re-route the maze.
 *
 * @example
 * <Truchet color="#111111" bgColor="#f5f5f5" tileSize={48} lineWidth={6} speed={1} />
 */
export function Truchet({
  color = '#111111',
  bgColor = '#f5f5f5',
  tileSize = 48,
  lineWidth = 6,
  speed = 1,
  className,
  style,
}: TruchetProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const tileRef = useRef(tileSize)
  const lwRef = useRef(lineWidth)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { tileRef.current = tileSize }, [tileSize])
  useEffect(() => { lwRef.current = lineWidth }, [lineWidth])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    // Backing-store pixels per CSS pixel (reflects the maxPixelCount clamp).
    const scale = () => (el.offsetWidth ? el.width / el.offsetWidth : 1)

    let grid: Uint8Array = new Uint8Array(0)
    let cols = 0, rows = 0

    const build = () => {
      const TS = Math.max(16, tileRef.current * scale())
      cols = Math.ceil(el.width / TS) + 1
      rows = Math.ceil(el.height / TS) + 1
      grid = new Uint8Array(cols * rows)
      for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.5 ? 1 : 0
    }


    let t = 0
    let flipAcc = 0
    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        build()
      }
      const W = el.width, H = el.height
      const TS = Math.max(16, tileRef.current * scale())
      const R = TS / 2

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = colorRef.current
      ctx.lineWidth = Math.max(1, lwRef.current * scale())
      ctx.lineCap = 'round'
      ctx.setLineDash([TS * 0.5, TS * 0.32])
      ctx.lineDashOffset = -t * 80 * speedRef.current

      for (let c = 0; c < cols; c++) {
        const x = c * TS
        for (let r = 0; r < rows; r++) {
          const y = r * TS
          if (grid[c * rows + r]) {
            // ◜ top-left + ◞ bottom-right arcs
            ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI / 2); ctx.stroke()
            ctx.beginPath(); ctx.arc(x + TS, y + TS, R, Math.PI, Math.PI * 1.5); ctx.stroke()
          } else {
            // ◝ top-right + ◟ bottom-left arcs
            ctx.beginPath(); ctx.arc(x + TS, y, R, Math.PI / 2, Math.PI); ctx.stroke()
            ctx.beginPath(); ctx.arc(x, y + TS, R, Math.PI * 1.5, Math.PI * 2); ctx.stroke()
          }
        }
      }
      ctx.setLineDash([])

      // Periodically flip a handful of tiles to re-route the maze.
      flipAcc += speedRef.current * frames
      if (flipAcc >= 6 && grid.length) {
        flipAcc = 0
        for (let n = 0; n < 3; n++) {
          const i = (Math.random() * grid.length) | 0
          grid[i] ^= 1
        }
      }

      t += 0.016 * frames
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
