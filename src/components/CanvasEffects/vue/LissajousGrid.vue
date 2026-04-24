<script setup lang="ts">
/**
 * LissajousGrid — Parametric curve table
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <LissajousGrid :cols="4" :rows="3" :speed="1" :hue-start="30" :opacity="0.72" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  cols?: number
  rows?: number
  speed?: number
  hueStart?: number
  opacity?: number
}>(), { cols: 4, rows: 3, speed: 1, hueStart: 30, opacity: 0.72 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!
  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
  resize()

  const STEPS = 700
  let phase = 0

  const draw = () => {
    const W = el.width, H = el.height
    const C = props.cols, R = props.rows
    ctx.clearRect(0, 0, W, H)
    const cw = W / C, ch = H / R

    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        const fx = col + 1, fy = row + 1
        const cx = (col + 0.5) * cw, cy = (row + 0.5) * ch
        const rx = cw / 2 - 10, ry = ch / 2 - 10
        const period = Math.PI * 2 * fx * fy
        ctx.beginPath()
        for (let i = 0; i <= STEPS; i++) {
          const t = (i / STEPS) * period
          const x = cx + rx * Math.sin(fx * t + phase)
          const y = cy + ry * Math.sin(fy * t)
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const hue = props.hueStart + ((col * R + row) / (C * R)) * 280
        ctx.strokeStyle = `hsla(${hue % 360}, 85%, 62%, ${props.opacity})`
        ctx.lineWidth = 1.1; ctx.stroke()
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 0.5
        ctx.strokeRect(col * cw + 0.5, row * ch + 0.5, cw - 1, ch - 1)
      }
    }
    phase += 0.007 * props.speed
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
