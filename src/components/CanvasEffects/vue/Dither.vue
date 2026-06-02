<script setup lang="ts">
/**
 * Dither — 1-bit Bayer ordered dithering
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Dither bg-color="#0a0a0a" color="#84ff3c" :pixel-size="4" :scale="1" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  bgColor?: string
  color?: string
  pixelSize?: number
  scale?: number
  speed?: number
}>(), { bgColor: '#0a0a0a', color: '#84ff3c', pixelSize: 4, scale: 1, speed: 1 })

// 4×4 Bayer ordered-dithering threshold matrix, normalised to (0,1).
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map(row => row.map(v => (v + 0.5) / 16))

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  const resize = () => { if (!el.offsetWidth || !el.offsetHeight) return; const dpr = window.devicePixelRatio || 1; el.width = el.offsetWidth * dpr; el.height = el.offsetHeight * dpr }
  resize()

  let t = 0
  const draw = () => {
    const W = el.width, H = el.height
    const px = Math.max(2, props.pixelSize)
    const k = 0.012 * props.scale
    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = props.color
    const cols = Math.ceil(W / px), rows = Math.ceil(H / px)
    for (let c = 0; c < cols; c++) {
      const x = c * px
      for (let r = 0; r < rows; r++) {
        const y = r * px
        const v = (Math.sin(x * k + t) +
                   Math.sin(y * k * 1.3 - t * 0.8) +
                   Math.sin((x + y) * k * 0.7 + t * 1.2) +
                   Math.sin(Math.hypot(x - W / 2, y - H / 2) * k * 0.9 - t)) / 8 + 0.5
        if (v > BAYER[r & 3][c & 3]) ctx.fillRect(x, y, px, px)
      }
    }
    t += 0.02 * props.speed
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
