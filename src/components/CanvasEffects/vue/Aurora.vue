<script setup lang="ts">
/**
 * Aurora — Borealis curtain simulation
 *
 * Five layered light curtains drift across a star-filled sky.
 * Compatible with Vue 3 and Nuxt 3 (canvas runs in onMounted).
 *
 * Nuxt tip: wrap in <ClientOnly> if you see hydration warnings.
 *
 * @example
 * <Aurora :colors="['#00ffaa', '#00beff', '#78ff64']" :star-count="160" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Colors for each aurora curtain (up to 5) */
  colors?: string[]
  /** Number of background stars */
  starCount?: number
  /** Animation speed multiplier */
  speed?: number
}>(), {
  colors: () => ['#00ffaa', '#00beff', '#78ff64', '#be50ff', '#00dceb'],
  starCount: 160,
  speed: 1,
})

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const BAND_CONFIGS = [
  { y: 0.30, A: 0.055, fq: 1.8, sp: 0.28 },
  { y: 0.40, A: 0.070, fq: 2.4, sp: 0.38 },
  { y: 0.22, A: 0.040, fq: 1.3, sp: 0.21 },
  { y: 0.47, A: 0.060, fq: 2.9, sp: 0.47 },
  { y: 0.16, A: 0.030, fq: 1.0, sp: 0.14 },
]

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  type Star = { x: number; y: number; r: number; p: number; s: number }
  let stars: Star[] = []
  const initStars = () => {
    stars = Array.from({ length: props.starCount }, () => ({
      x: Math.random(), y: Math.random() * 0.9,
      r: Math.random() * 1.1 + 0.15,
      p: Math.random() * Math.PI * 2,
      s: 0.5 + Math.random() * 2.5,
    }))
  }

  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; initStars() }
  resize()

  let t = 0
  const draw = () => {
    const W = el.width, H = el.height, spd = props.speed
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#010810'); bg.addColorStop(0.6, '#020c1a'); bg.addColorStop(1, '#04080f')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    stars.forEach(s => {
      ctx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.s + s.p))
      ctx.fillStyle = '#dce8ff'
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill()
    })

    BAND_CONFIGS.slice(0, props.colors.length).forEach((b, idx) => {
      const [r, g, bv] = hexToRgb(props.colors[idx])
      const baseY = H * b.y, bh = H * 0.09
      const pts = Array.from({ length: 121 }, (_, i) => {
        const x = (i / 120) * W
        const y = baseY
          + H * b.A * Math.sin(x * b.fq * 0.01 + t * b.sp * spd)
          + H * b.A * 0.4 * Math.sin(x * b.fq * 0.024 - t * b.sp * 1.3 * spd + 1.2)
        return { x, y }
      })

      ctx.beginPath()
      ctx.moveTo(0, H); pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.lineTo(W, H); ctx.closePath()
      const gd = ctx.createLinearGradient(0, baseY - bh, 0, baseY + bh * 4)
      gd.addColorStop(0, `rgba(${r},${g},${bv},0)`)
      gd.addColorStop(0.15, `rgba(${r},${g},${bv},0.45)`)
      gd.addColorStop(0.55, `rgba(${r},${g},${bv},0.12)`)
      gd.addColorStop(1, `rgba(${r},${g},${bv},0)`)
      ctx.globalAlpha = 1; ctx.fillStyle = gd; ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, 0); ctx.lineTo(W, 0)
      pts.slice().reverse().forEach(p => ctx.lineTo(p.x, p.y)); ctx.closePath()
      const gu = ctx.createLinearGradient(0, baseY, 0, 0)
      gu.addColorStop(0, `rgba(${r},${g},${bv},0.22)`)
      gu.addColorStop(0.5, `rgba(${r},${g},${bv},0.06)`)
      gu.addColorStop(1, `rgba(${r},${g},${bv},0)`)
      ctx.fillStyle = gu; ctx.fill()

      ctx.beginPath()
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
      ctx.strokeStyle = `rgba(${r},${g},${bv},0.85)`
      ctx.lineWidth = 1.5; ctx.shadowColor = `rgb(${r},${g},${bv})`
      ctx.shadowBlur = 10; ctx.globalAlpha = 0.65; ctx.stroke(); ctx.shadowBlur = 0
    })

    ctx.globalAlpha = 1
    t += 0.007 * spd
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
