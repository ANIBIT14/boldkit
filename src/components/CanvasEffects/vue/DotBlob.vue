<script setup lang="ts">
/**
 * DotBlob — Halftone wave field
 *
 * A Gaussian envelope × traveling wave drives halftone dot sizes.
 * Compatible with Vue 3 and Nuxt 3 (canvas runs in onMounted).
 *
 * @example
 * <DotBlob color="#c9ba4c" :dot-size="4" :gap="9" :speed="1" :threshold="0.28" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Dot fill color */
  color?: string
  /** Max dot radius in px */
  dotSize?: number
  /** Distance between dot centers in px */
  gap?: number
  /** Animation speed multiplier */
  speed?: number
  /** Field values below this threshold leave blank space (0–1) */
  threshold?: number
}>(), {
  color: '#c9ba4c',
  dotSize: 4,
  gap: 9,
  speed: 1,
  threshold: 0.28,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
  resize()

  const gauss = (px: number, py: number, cx: number, cy: number, rx: number, ry: number) => {
    const dx = (px - cx) / rx, dy = (py - cy) / ry
    return Math.exp(-(dx * dx + dy * dy) * 0.5)
  }

  let t = 0
  const draw = () => {
    const GAP = props.gap, MAX_DOT = props.dotSize, THRESHOLD = props.threshold
    const W = el.width, H = el.height
    ctx.clearRect(0, 0, W, H)
    const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
    const ex = W * (0.42 + 0.08 * Math.sin(t * 0.18))
    const ey = H * (0.60 + 0.06 * Math.sin(t * 0.13))

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = c * GAP, py = r * GAP
        const env = Math.min(1,
          gauss(px, py, ex,       ey,       W * 0.32, H * 0.26) * 1.0 +
          gauss(px, py, W * 0.10, H * 0.88, W * 0.15, H * 0.13) * 0.55 +
          gauss(px, py, W * 0.78, H * 0.88, W * 0.12, H * 0.10) * 0.40,
        )
        if (env < 0.05) continue
        const wave =
          0.55 * Math.sin(c * 0.38 - t * 2.2 + r * 0.12) +
          0.35 * Math.sin(c * 0.22 + r * 0.35 - t * 1.7) +
          0.10 * Math.sin(c * 0.60 - r * 0.20 + t * 2.8)
        const v = env * (wave + 1) / 2
        if (v < THRESHOLD) continue
        const vAbove = (v - THRESHOLD) / (1 - THRESHOLD)
        const size = Math.sqrt(vAbove) * MAX_DOT + 0.8
        ctx.globalAlpha = 0.25 + vAbove * 0.75
        ctx.fillStyle = props.color
        ctx.fillRect(px - size / 2, py - size / 2, size, size)
      }
    }
    ctx.globalAlpha = 1
    t += 0.032 * props.speed
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
