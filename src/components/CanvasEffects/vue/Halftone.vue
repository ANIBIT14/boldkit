<script setup lang="ts">
/**
 * Halftone — print-style dot field
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Halftone color="#111111" bg-color="#facc15" :gap="18" :max-scale="0.75" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  gap?: number
  maxScale?: number
  speed?: number
}>(), { color: '#111111', bgColor: '#facc15', gap: 18, maxScale: 0.75, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null
let cleanupMouse: (() => void) | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  let dpr = 1

  const mouse = { x: -1e4, y: -1e4 }
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    mouse.x = (e.clientX - rect.left) * dpr
    mouse.y = (e.clientY - rect.top) * dpr
  }
  const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4 }

  const resize = () => { if (!el.offsetWidth || !el.offsetHeight) return; dpr = window.devicePixelRatio || 1; el.width = el.offsetWidth * dpr; el.height = el.offsetHeight * dpr }
  resize()

  let t = 0
  const draw = () => {
    const W = el.width, H = el.height
    const GAP = Math.max(6, props.gap * dpr)
    const maxR = (GAP / 2) * props.maxScale
    const reach = GAP * 5
    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = props.color
    const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
    for (let c = 0; c < cols; c++) {
      const cx = c * GAP + GAP / 2
      for (let r = 0; r < rows; r++) {
        const cy = r * GAP + GAP / 2
        let v = (Math.sin(cx * 0.01 + t) +
                 Math.sin(cy * 0.013 - t * 0.8) +
                 Math.sin((cx + cy) * 0.008 + t * 1.3)) / 6 + 0.5
        const d = Math.hypot(cx - mouse.x, cy - mouse.y)
        if (d < reach) v += (1 - d / reach) * 0.9
        const rad = Math.max(0, Math.min(1, v)) * maxR
        if (rad < 0.4) continue
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    t += 0.02 * props.speed
    raf = requestAnimationFrame(draw)
  }

  draw()
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  cleanupMouse = () => {
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
  }
  ro = new ResizeObserver(resize)
  ro.observe(el)
})

onUnmounted(() => { cancelAnimationFrame(raf); ro?.disconnect(); cleanupMouse?.() })
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
