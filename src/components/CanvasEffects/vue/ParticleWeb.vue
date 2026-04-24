<script setup lang="ts">
/**
 * ParticleWeb — Proximity particle graph
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <ParticleWeb :count="60" particle-color="#818cf8" line-color="#6366f1" :max-distance="110" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  count?: number
  particleColor?: string
  lineColor?: string
  maxDistance?: number
  speed?: number
}>(), { count: 60, particleColor: '#818cf8', lineColor: '#6366f1', maxDistance: 110, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  type P = { x: number; y: number; vx: number; vy: number }
  let pts: P[] = []
  const init = () => {
    pts = Array.from({ length: props.count }, () => ({
      x: Math.random() * el.width, y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 0.9, vy: (Math.random() - 0.5) * 0.9,
    }))
  }

  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; init() }
  resize()

  const draw = () => {
    const W = el.width, H = el.height, MD = props.maxDistance
    ctx.clearRect(0, 0, W, H)
    pts.forEach(p => {
      p.x += p.vx * props.speed; p.y += p.vy * props.speed
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    })
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < MD) {
          const a = 1 - d / MD
          ctx.globalAlpha = a * 0.55; ctx.strokeStyle = props.lineColor; ctx.lineWidth = a * 1.5
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
        }
      }
    }
    ctx.globalAlpha = 1
    pts.forEach(p => { ctx.fillStyle = props.particleColor; ctx.fillRect(p.x - 3, p.y - 3, 6, 6) })
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
