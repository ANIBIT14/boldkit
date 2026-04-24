<script setup lang="ts">
/**
 * Plasma — Circular wave interference
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Plasma :palette="['#0a1450', '#00d2dc', '#ffc832', '#ff4b82']" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  palette?: string[]
  speed?: number
}>(), {
  palette: () => ['#0a1450', '#1e64c8', '#00d2dc', '#5affa6', '#ffc832', '#ff4b82', '#a01ec8'],
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
  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
  resize()

  type Src = { x: number; y: number; vx: number; vy: number; freq: number; spd: number }
  const sources: Src[] = [
    { x: 0.30, y: 0.30, vx:  0.0009, vy:  0.0006, freq: 0.11, spd:  1.8 },
    { x: 0.70, y: 0.30, vx: -0.0006, vy:  0.0009, freq: 0.09, spd: -2.2 },
    { x: 0.50, y: 0.72, vx:  0.0010, vy: -0.0007, freq: 0.13, spd:  1.5 },
    { x: 0.20, y: 0.65, vx: -0.0008, vy:  0.0011, freq: 0.08, spd: -1.9 },
  ]

  const SCALE = 3
  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')!
  let t = 0

  const draw = () => {
    const W = el.width, H = el.height, spd = props.speed
    const pal = props.palette.map(hexToRgb)

    const colorAt = (n: number): [number, number, number] => {
      const s = pal.length - 1
      const i = Math.min(s - 1, Math.floor(n * s))
      const f = n * s - i
      const a = pal[i], b = pal[i + 1]
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
    }

    const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
    if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

    sources.forEach(s => {
      s.x += s.vx * spd; s.y += s.vy * spd
      if (s.x < 0 || s.x > 1) s.vx *= -1
      if (s.y < 0 || s.y > 1) s.vy *= -1
    })

    const img = offCtx.createImageData(iw, ih)
    const dd = img.data
    for (let py = 0; py < ih; py++) {
      for (let px = 0; px < iw; px++) {
        const wx = px / iw, wy = py / ih
        let v = 0
        sources.forEach(s => {
          const dx = (wx - s.x) * W, dy = (wy - s.y) * H
          v += Math.sin(Math.sqrt(dx * dx + dy * dy) * s.freq + t * s.spd)
        })
        const n = Math.max(0, Math.min(1, (v + 4) / 8))
        const [r, g, b] = colorAt(n)
        const i = (py * iw + px) * 4
        dd[i] = r; dd[i+1] = g; dd[i+2] = b; dd[i+3] = 255
      }
    }
    offCtx.putImageData(img, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(off, 0, 0, W, H)
    t += 0.045 * spd
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
