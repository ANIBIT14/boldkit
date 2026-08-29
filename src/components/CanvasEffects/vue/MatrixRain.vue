<script setup lang="ts">
/**
 * MatrixRain — Falling column simulation
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <MatrixRain head-color="#ffffff" :trail-hue="120" :gap="16" :speed="1" :tail-length="10" />
 */
import { ref } from 'vue'
import { useCanvasEffect } from '@/composables/useCanvasEffect'

const props = withDefaults(defineProps<{
  headColor?: string
  trailHue?: number
  gap?: number
  speed?: number
  tailLength?: number
}>(), { headColor: '#ffffff', trailHue: 120, gap: 16, speed: 1, tailLength: 10 })

const canvasRef = ref<HTMLCanvasElement | null>(null)

useCanvasEffect(canvasRef, (ctx, el) => {

  let cols: number[] = []

  return (_dt, frames) => {
    const GAP = props.gap, TAIL = props.tailLength, W = el.width, H = el.height
    // Compounded over the frame delta so trail length is refresh-rate independent.
    ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - 0.18, frames)})`
    ctx.fillRect(0, 0, W, H)
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
  }
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%;background:#000" />
</template>
