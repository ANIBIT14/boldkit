<script setup lang="ts">
/**
 * DotWave — Sine-field dot grid
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <DotWave color="#ef4444" :gap="22" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  gap?: number
  speed?: number
}>(), { color: '#ef4444', gap: 22, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!
  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
  resize()

  let t = 0
  const draw = () => {
    const GAP = props.gap, W = el.width, H = el.height
    ctx.clearRect(0, 0, W, H)
    const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = (Math.sin(c * 0.45 + r * 0.3 - t * 1.2) +
                   Math.sin(c * 0.2 - r * 0.4 + t * 0.8) + 2) / 4
        const size = 2 + v * 8
        ctx.globalAlpha = 0.15 + v * 0.85
        ctx.fillStyle = props.color
        ctx.fillRect(c * GAP + GAP / 2 - size / 2, r * GAP + GAP / 2 - size / 2, size, size)
      }
    }
    ctx.globalAlpha = 1
    t += 0.035 * props.speed
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
