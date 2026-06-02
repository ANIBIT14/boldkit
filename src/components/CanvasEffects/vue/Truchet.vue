<script setup lang="ts">
/**
 * Truchet — flowing arc-tile maze
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <Truchet color="#111111" bg-color="#f5f5f5" :tile-size="48" :line-width="6" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  tileSize?: number
  lineWidth?: number
  speed?: number
}>(), { color: '#111111', bgColor: '#f5f5f5', tileSize: 48, lineWidth: 6, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return
  let dpr = 1
  let grid = new Uint8Array(0)
  let cols = 0, rows = 0

  const build = () => {
    const TS = Math.max(16, props.tileSize * dpr)
    cols = Math.ceil(el.width / TS) + 1
    rows = Math.ceil(el.height / TS) + 1
    grid = new Uint8Array(cols * rows)
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.5 ? 1 : 0
  }

  const resize = () => { if (!el.offsetWidth || !el.offsetHeight) return; dpr = window.devicePixelRatio || 1; el.width = el.offsetWidth * dpr; el.height = el.offsetHeight * dpr; build() }
  resize()

  let t = 0
  let flipAcc = 0
  const draw = () => {
    const W = el.width, H = el.height
    const TS = Math.max(16, props.tileSize * dpr)
    const R = TS / 2

    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = props.color
    ctx.lineWidth = Math.max(1, props.lineWidth * dpr)
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

    flipAcc += props.speed
    if (flipAcc >= 6 && grid.length) {
      flipAcc = 0
      for (let n = 0; n < 3; n++) { const i = (Math.random() * grid.length) | 0; grid[i] ^= 1 }
    }

    t += 0.016
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
