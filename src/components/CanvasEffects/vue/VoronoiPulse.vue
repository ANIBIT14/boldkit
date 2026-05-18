<script setup lang="ts">
/**
 * VoronoiPulse — Animated Voronoi tessellation
 *
 * Drifting seed points generate a Voronoi diagram. Cell fills pulse
 * with color waves. Rendered at ⅓ resolution for performance.
 *
 * @example
 * <VoronoiPulse :cell-count="24" :speed="1" :border-width="1.5" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Number of Voronoi seed points */
  cellCount?: number
  /** Color palette — each cell gets a color from this array */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** Border line width */
  borderWidth?: number
}>(), {
  cellCount: 24,
  colors: () => ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#85c1e9'],
  speed: 1,
  borderWidth: 1.5,
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

  type Seed = { x: number; y: number; vx: number; vy: number; rgb: [number, number, number]; phase: number }
  let seeds: Seed[] = []

  const SCALE = 3
  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')!

  const init = () => {
    const cls = props.colors.map(hexToRgb)
    seeds = Array.from({ length: props.cellCount }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012, vy: (Math.random() - 0.5) * 0.0012,
      rgb: cls[i % cls.length],
      phase: Math.random() * Math.PI * 2,
    }))
  }

  const resize = () => {
    const dpr = window.devicePixelRatio || 1
    if (el.offsetWidth > 0) el.width = el.offsetWidth * dpr
    if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
    init()
  }
  resize()

  let t = 0

  const draw = () => {
    const W = el.width, H = el.height
    if (!W || !H) { raf = requestAnimationFrame(draw); return }
    const spd = props.speed

    const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
    if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

    seeds.forEach(s => {
      s.x += s.vx * spd; s.y += s.vy * spd
      if (s.x < 0 || s.x > 1) s.vx *= -1
      if (s.y < 0 || s.y > 1) s.vy *= -1
    })

    const img = offCtx.createImageData(iw, ih)
    const d = img.data

    for (let py = 0; py < ih; py++) {
      for (let px = 0; px < iw; px++) {
        const wx = px / iw, wy = py / ih
        let minDist = Infinity, minIdx = 0, secondDist = Infinity

        for (let i = 0; i < seeds.length; i++) {
          const dx = (wx - seeds[i].x) * (W / H), dy = wy - seeds[i].y
          const dist = dx * dx + dy * dy
          if (dist < minDist) { secondDist = minDist; minDist = dist; minIdx = i }
          else if (dist < secondDist) { secondDist = dist }
        }

        const seed = seeds[minIdx]
        const [r, g, b] = seed.rgb
        const pulse = 0.5 + 0.35 * Math.sin(t * 2.5 + seed.phase)
        const edgeFactor = Math.sqrt(secondDist) - Math.sqrt(minDist)
        const isEdge = edgeFactor < 0.012

        const i = (py * iw + px) * 4
        if (isEdge) {
          d[i] = Math.min(255, r + 120); d[i+1] = Math.min(255, g + 120)
          d[i+2] = Math.min(255, b + 120); d[i+3] = 220
        } else {
          const dark = 0.08 + pulse * 0.18
          d[i] = r * dark; d[i+1] = g * dark; d[i+2] = b * dark; d[i+3] = 255
        }
      }
    }

    offCtx.putImageData(img, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(off, 0, 0, W, H)

    t += 0.016 * spd
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
