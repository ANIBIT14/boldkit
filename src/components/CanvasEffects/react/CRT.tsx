import { useEffect, useRef, type CSSProperties } from 'react'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface CRTProps {
  /** Phosphor tint color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Gap between scanlines in px */
  scanGap?: number
  /** Flicker intensity (0–1) */
  flicker?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * CRT — retro cathode-ray tube screen
 *
 * Layered phosphor scanlines, a rolling brightness band, edge vignette and
 * subtle flicker recreate the look of an old monitor. Drop it behind content
 * for an instant terminal / arcade-cabinet vibe.
 *
 * @example
 * <CRT color="#43ff7a" bgColor="#04140a" scanGap={3} flicker={0.6} speed={1} />
 */
export function CRT({
  color = '#43ff7a',
  bgColor = '#04140a',
  scanGap = 3,
  flicker = 0.6,
  speed = 1,
  className,
  style,
}: CRTProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const gapRef = useRef(scanGap)
  const flickerRef = useRef(flicker)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { gapRef.current = scanGap }, [scanGap])
  useEffect(() => { flickerRef.current = flicker }, [flicker])
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
      const [r, g, b] = hexToRgb(colorRef.current)
      const gap = Math.max(2, gapRef.current * (window.devicePixelRatio || 1))

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)

      // Faint phosphor wash.
      ctx.globalAlpha = 0.05
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(0, 0, W, H)

      // Horizontal scanlines.
      ctx.globalAlpha = 0.18
      ctx.fillStyle = '#000'
      for (let y = 0; y < H; y += gap) ctx.fillRect(0, y, W, gap / 2)

      // Rolling brightness band sweeping top→bottom.
      const bandY = ((t * 60 * speedRef.current) % (H + 200)) - 100
      const grad = ctx.createLinearGradient(0, bandY - 80, 0, bandY + 80)
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.12)`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.globalAlpha = 1
      ctx.fillStyle = grad
      ctx.fillRect(0, bandY - 80, W, 160)

      // Vignette.
      const vig = ctx.createRadialGradient(
        W / 2, H / 2, Math.min(W, H) * 0.3,
        W / 2, H / 2, Math.max(W, H) * 0.72,
      )
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      // Whole-screen flicker.
      const fl = flickerRef.current
      if (fl > 0) {
        ctx.globalAlpha = fl * 0.06 * (0.5 + 0.5 * Math.sin(t * 40))
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, W, H)
        ctx.globalAlpha = 1
      }

      t += 0.016 * speedRef.current
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
