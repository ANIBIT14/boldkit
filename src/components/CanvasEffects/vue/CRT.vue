<script setup lang="ts">
/**
 * CRT — retro cathode-ray tube screen
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <CRT color="#43ff7a" bg-color="#04140a" :scan-gap="3" :flicker="0.6" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  scanGap?: number
  flicker?: number
  speed?: number
}>(), { color: '#43ff7a', bgColor: '#04140a', scanGap: 3, flicker: 0.6, speed: 1 })

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
  const ctx = el.getContext('2d')
  if (!ctx) return
  const resize = () => { if (!el.offsetWidth || !el.offsetHeight) return; const dpr = window.devicePixelRatio || 1; el.width = el.offsetWidth * dpr; el.height = el.offsetHeight * dpr }
  resize()

  let t = 0
  const draw = () => {
    const W = el.width, H = el.height
    const [r, g, b] = hexToRgb(props.color)
    const gap = Math.max(2, props.scanGap * (window.devicePixelRatio || 1))

    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)

    ctx.globalAlpha = 0.05
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(0, 0, W, H)

    ctx.globalAlpha = 0.18
    ctx.fillStyle = '#000'
    for (let y = 0; y < H; y += gap) ctx.fillRect(0, y, W, gap / 2)

    const bandY = ((t * 60 * props.speed) % (H + 200)) - 100
    const grad = ctx.createLinearGradient(0, bandY - 80, 0, bandY + 80)
    grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.12)`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.globalAlpha = 1
    ctx.fillStyle = grad
    ctx.fillRect(0, bandY - 80, W, 160)

    const vig = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.72)
    vig.addColorStop(0, 'rgba(0,0,0,0)')
    vig.addColorStop(1, 'rgba(0,0,0,0.55)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    if (props.flicker > 0) {
      ctx.globalAlpha = props.flicker * 0.06 * (0.5 + 0.5 * Math.sin(t * 40))
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, W, H)
      ctx.globalAlpha = 1
    }

    t += 0.016 * props.speed
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
