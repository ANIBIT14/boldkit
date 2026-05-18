<script setup lang="ts">
/**
 * WarpSpeed — Hyperspace star tunnel
 *
 * Stars spawn near the center and accelerate outward with perspective
 * scaling, leaving motion-blur streaks.
 *
 * @example
 * <WarpSpeed :star-count="300" :speed="1" :hue-start="220" :trail-length="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Number of stars in the field */
  starCount?: number
  /** Animation speed multiplier */
  speed?: number
  /** Starting hue for star trails (0–360) */
  hueStart?: number
  /** Trail length multiplier */
  trailLength?: number
}>(), {
  starCount: 300,
  speed: 1,
  hueStart: 220,
  trailLength: 1,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  type Star = { x: number; y: number; z: number; pz: number; hue: number }
  let stars: Star[] = []

  const spawn = (): Star => ({
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: Math.random() * 1.5 + 0.5,
    pz: 0,
    hue: props.hueStart + Math.random() * 60 - 30,
  })

  const init = () => { stars = Array.from({ length: props.starCount }, () => { const s = spawn(); s.pz = s.z; return s }) }

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
    const spd = props.speed, tl = props.trailLength

    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.fillRect(0, 0, W, H)

    stars.forEach((s, i) => {
      s.pz = s.z
      s.z -= 0.012 * spd

      if (s.z <= 0.001) { stars[i] = spawn(); stars[i].pz = stars[i].z; return }

      const sx = cx + (s.x / s.z) * (W * 0.5)
      const sy = cy + (s.y / s.z) * (H * 0.5)
      const px = cx + (s.x / s.pz) * (W * 0.5)
      const py = cy + (s.y / s.pz) * (H * 0.5)

      if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) { stars[i] = spawn(); stars[i].pz = stars[i].z; return }

      const depth = 1 - s.z / 2
      const brightness = 40 + depth * 55
      const lw = depth * 2.5 * tl

      ctx.beginPath()
      ctx.moveTo(px, py); ctx.lineTo(sx, sy)
      ctx.strokeStyle = `hsl(${s.hue} 70% ${brightness}%)`
      ctx.lineWidth = Math.max(0.3, lw)
      ctx.globalAlpha = depth * 0.9
      ctx.stroke()

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
  ro = new ResizeObserver(resize)
  ro.observe(el)
})

onUnmounted(() => { cancelAnimationFrame(raf); ro?.disconnect() })
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
