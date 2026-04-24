<script setup lang="ts">
/**
 * MatrixRain — Falling column simulation
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <MatrixRain head-color="#ffffff" :trail-hue="120" :gap="16" :speed="1" :tail-length="10" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  headColor?: string
  trailHue?: number
  gap?: number
  speed?: number
  tailLength?: number
}>(), { headColor: '#ffffff', trailHue: 120, gap: 16, speed: 1, tailLength: 10 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  let cols: number[] = []
  const resize = () => {
    el.width = el.offsetWidth; el.height = el.offsetHeight
    cols = Array.from({ length: Math.ceil(el.width / props.gap) }, () =>
      -Math.floor(Math.random() * (el.height / props.gap + props.tailLength))
    )
  }
  resize()

  const draw = () => {
    const GAP = props.gap, TAIL = props.tailLength, W = el.width, H = el.height
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 0, W, H)
    const rows = Math.ceil(H / GAP), size = GAP - 3
    const needed = Math.ceil(W / GAP)
    while (cols.length < needed) cols.push(-Math.floor(Math.random() * 12))
    if (cols.length > needed) cols.length = needed

    cols.forEach((head, c) => {
      for (let i = 0; i < TAIL; i++) {
        const row = Math.floor(head) - i
        if (row < 0 || row > rows) continue
        const bright = 1 - i / TAIL
        ctx.globalAlpha = bright
        ctx.fillStyle = i === 0
          ? props.headColor
          : `hsl(${props.trailHue} 100% ${28 + bright * 28}%)`
        ctx.fillRect(c * GAP + 1, row * GAP + 1, size, size)
      }
      cols[c] = head >= rows + TAIL ? -Math.floor(Math.random() * 12) : head + 0.28 * props.speed
    })
    ctx.globalAlpha = 1
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
