<script setup lang="ts">
/**
 * Metaballs — Organic blob merging
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Metaballs :colors="['#ff5050', '#3cb9ff', '#ffc32d']" :blob-radius="70" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  colors?: string[]
  blobRadius?: number
  speed?: number
}>(), {
  colors: () => ['#ff5050', '#3cb9ff', '#ffc32d', '#aa4bff', '#37ff96'],
  blobRadius: 70,
  speed: 1,
})

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!
  const SCALE = 3

  type Ball = { x: number; y: number; vx: number; vy: number; r: number; rgb: [number, number, number] }
  let balls: Ball[] = []

  const init = () => {
    balls = props.colors.map(c => ({
      x:  el.width  * (0.2 + Math.random() * 0.6),
      y:  el.height * (0.2 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 1.3,
      vy: (Math.random() - 0.5) * 1.3,
      r:  props.blobRadius * (0.8 + Math.random() * 0.4),
      rgb: hexToRgb(c),
    }))
  }

  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')!

  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight; init() }
  resize()

  const draw = () => {
    const W = el.width, H = el.height, spd = props.speed
    const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
    if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

    balls.forEach(b => {
      b.x += b.vx * spd; b.y += b.vy * spd
      if (b.x < 0 || b.x > W) b.vx *= -1
      if (b.y < 0 || b.y > H) b.vy *= -1
    })

    const img = offCtx.createImageData(iw, ih)
    const d = img.data
    for (let py = 0; py < ih; py++) {
      for (let px = 0; px < iw; px++) {
        const wx = px * SCALE, wy = py * SCALE
        let total = 0, wr = 0, wg = 0, wb = 0
        balls.forEach(b => {
          const dx = wx - b.x, dy = wy - b.y
          const v = b.r * b.r / (dx * dx + dy * dy + 1)
          total += v; wr += b.rgb[0] * v; wg += b.rgb[1] * v; wb += b.rgb[2] * v
        })
        if (total > 0.25) {
          const i = (py * iw + px) * 4, tt = total + 0.001
          d[i] = wr / tt; d[i+1] = wg / tt; d[i+2] = wb / tt
          d[i+3] = Math.min(255, Math.round(((total - 0.25) / 0.75) * 245))
        }
      }
    }
    offCtx.putImageData(img, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(off, 0, 0, W, H)
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
