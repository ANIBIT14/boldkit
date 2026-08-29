<script setup lang="ts">
/**
 * Truchet — flowing arc-tile maze
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Truchet color="#111111" bg-color="#f5f5f5" :tile-size="48" :line-width="6" :speed="1" />
 */
import { ref } from 'vue'
import { useCanvasEffect } from '@/composables/useCanvasEffect'

const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  tileSize?: number
  lineWidth?: number
  speed?: number
}>(), { color: '#111111', bgColor: '#f5f5f5', tileSize: 48, lineWidth: 6, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)

useCanvasEffect(canvasRef, (ctx, el) => {
  // Backing-store pixels per CSS pixel (reflects the maxPixelCount clamp).
  const scale = () => (el.offsetWidth ? el.width / el.offsetWidth : 1)
  let grid = new Uint8Array(0)
  let cols = 0, rows = 0

  const build = () => {
    const TS = Math.max(16, props.tileSize * scale())
    cols = Math.ceil(el.width / TS) + 1
    rows = Math.ceil(el.height / TS) + 1
    grid = new Uint8Array(cols * rows)
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.5 ? 1 : 0
  }


  let t = 0
  let flipAcc = 0
  let lastW = 0, lastH = 0
  return (_dt, frames) => {
    if (el.width !== lastW || el.height !== lastH) {
      lastW = el.width; lastH = el.height
      build()
    }
    const W = el.width, H = el.height
    const TS = Math.max(16, props.tileSize * scale())
    const R = TS / 2

    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = props.color
    ctx.lineWidth = Math.max(1, props.lineWidth * scale())
    ctx.lineCap = 'round'
    ctx.setLineDash([TS * 0.5, TS * 0.32])
    ctx.lineDashOffset = -t * 80 * props.speed

    for (let c = 0; c < cols; c++) {
      const x = c * TS
      for (let r = 0; r < rows; r++) {
        const y = r * TS
        if (grid[c * rows + r]) {
          ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI / 2); ctx.stroke()
          ctx.beginPath(); ctx.arc(x + TS, y + TS, R, Math.PI, Math.PI * 1.5); ctx.stroke()
        } else {
          ctx.beginPath(); ctx.arc(x + TS, y, R, Math.PI / 2, Math.PI); ctx.stroke()
          ctx.beginPath(); ctx.arc(x, y + TS, R, Math.PI * 1.5, Math.PI * 2); ctx.stroke()
        }
      }
    }
    ctx.setLineDash([])

    flipAcc += props.speed * frames
    if (flipAcc >= 6 && grid.length) {
      flipAcc = 0
      for (let n = 0; n < 3; n++) { const i = (Math.random() * grid.length) | 0; grid[i] ^= 1 }
    }

    t += 0.016 * frames
  }
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
