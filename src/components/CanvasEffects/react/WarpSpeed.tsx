import { useEffect, useRef, type CSSProperties } from 'react'

export interface WarpSpeedProps {
  /** Number of stars in the field */
  starCount?: number
  /** Animation speed multiplier */
  speed?: number
  /** Starting hue for star trails (0–360) */
  hueStart?: number
  /** Trail length multiplier */
  trailLength?: number
  className?: string
  style?: CSSProperties
}

/**
 * WarpSpeed — Hyperspace star tunnel
 *
 * Stars spawn near the center and accelerate outward with perspective
 * scaling, leaving motion-blur streaks. The result is a classic
 * sci-fi jump-to-lightspeed effect.
 *
 * @example
 * <WarpSpeed starCount={300} speed={1} hueStart={220} trailLength={1} />
 */
export function WarpSpeed({
  starCount = 300,
  speed = 1,
  hueStart = 220,
  trailLength = 1,
  className,
  style,
}: WarpSpeedProps) {
  const ref           = useRef<HTMLCanvasElement>(null)
  const countRef      = useRef(starCount)
  const speedRef      = useRef(speed)
  const hueRef        = useRef(hueStart)
  const trailRef      = useRef(trailLength)

  useEffect(() => { countRef.current = starCount   }, [starCount])
  useEffect(() => { speedRef.current = speed       }, [speed])
  useEffect(() => { hueRef.current   = hueStart    }, [hueStart])
  useEffect(() => { trailRef.current = trailLength }, [trailLength])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext('2d')!
    let raf = 0

    type Star = { x: number; y: number; z: number; pz: number; hue: number }
    let stars: Star[] = []

    const spawn = (): Star => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 1.5 + 0.5,
      pz: 0,
      hue: hueRef.current + Math.random() * 60 - 30,
    })

    const init = () => {
      stars = Array.from({ length: countRef.current }, () => {
        const s = spawn()
        s.pz = s.z
        return s
      })
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      if (el.offsetWidth > 0)  el.width  = el.offsetWidth  * dpr
      if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
      init()
    }
    resize()

    const draw = () => {
      const W = el.width, H = el.height
      const cx = W / 2, cy = H / 2
      const spd = speedRef.current
      const tl = trailRef.current

      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, W, H)

      stars.forEach((s, i) => {
        s.pz = s.z
        s.z -= 0.012 * spd

        if (s.z <= 0.001) {
          stars[i] = spawn()
          stars[i].pz = stars[i].z
          return
        }

        const sx = cx + (s.x / s.z) * (W * 0.5)
        const sy = cy + (s.y / s.z) * (H * 0.5)
        const px = cx + (s.x / s.pz) * (W * 0.5)
        const py = cy + (s.y / s.pz) * (H * 0.5)

        if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) {
          stars[i] = spawn()
          stars[i].pz = stars[i].z
          return
        }

        const depth = 1 - s.z / 2
        const brightness = 40 + depth * 55
        const lw = depth * 2.5 * tl

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `hsl(${s.hue} 70% ${brightness}%)`
        ctx.lineWidth = Math.max(0.3, lw)
        ctx.globalAlpha = depth * 0.9
        ctx.stroke()

        // Bright head
        const headR = depth * 1.8
        ctx.beginPath()
        ctx.arc(sx, sy, headR, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${s.hue} 30% 92%)`
        ctx.globalAlpha = depth
        ctx.fill()
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
