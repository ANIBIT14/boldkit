<script setup lang="ts">
/**
 * God Rays — volumetric light shafts
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <GodRays :colors="['#ffc832', '#ff4b82']" :ray-count="22" :origin-y="0.15" :speed="1" />
 */
import { ref } from 'vue'
import { useCanvasEffect } from '@/composables/useCanvasEffect'

const props = withDefaults(defineProps<{
  /** Ray colours, cycled across the fan */
  colors?: string[]
  /** Backdrop fill behind the rays */
  bgColor?: string
  /** Number of rays in the fan */
  rayCount?: number
  /** Light source position, 0–1 of the canvas box */
  originX?: number
  originY?: number
  /** Animation speed multiplier */
  speed?: number
  /** Radius of the core glow, as a fraction of the canvas diagonal */
  glow?: number
}>(), {
  colors: () => ['#ffc832', '#ff8a3d', '#ff4b82', '#ffe98a'],
  bgColor: '#0b0616',
  rayCount: 20,
  originX: 0.5,
  originY: 0.18,
  speed: 1,
  glow: 0.32,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

useCanvasEffect(canvasRef, (ctx, el) => {
  // Fixed per-ray character so rays keep their identity frame to frame.
  const seeds = Array.from({ length: 64 }, (_, i) => ({
    offset: Math.sin(i * 12.9898) * 0.5 + 0.5,
    width:  0.4 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 1.4,
    pulse:  0.6 + (Math.sin(i * 39.425) * 0.5 + 0.5) * 1.8,
    phase:  i * 0.7,
  }))

  let t = 0

  return (_dt, frames) => {
    const W = el.width, H = el.height
    if (!W || !H) return

    const pal = props.colors
    if (!pal.length) return
    const n = Math.max(1, Math.min(seeds.length, Math.round(props.rayCount)))
    const cx = W * props.originX
    const cy = H * props.originY
    const reach = Math.hypot(W, H) * 1.2

    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)

    ctx.globalCompositeOperation = 'lighter'

    for (let i = 0; i < n; i++) {
      const s = seeds[i]
      const base = (i / n) * Math.PI * 2 + s.offset * 0.15
      const angle = base + Math.sin(t * 0.25 + s.phase) * 0.06
      const half = (s.width * 0.5 * Math.PI) / n
      // Each ray breathes independently; never fully off so the fan reads as a fan.
      const intensity = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(t * s.pulse + s.phase))

      const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * reach, cy + Math.sin(angle) * reach)
      const col = pal[i % pal.length]
      grad.addColorStop(0, col)
      grad.addColorStop(0.35, col)
      grad.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.globalAlpha = intensity * 0.5
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle - half) * reach, cy + Math.sin(angle - half) * reach)
      ctx.lineTo(cx + Math.cos(angle + half) * reach, cy + Math.sin(angle + half) * reach)
      ctx.closePath()
      ctx.fill()
    }

    // Core bloom sits on top of the wedges so the source reads as the origin.
    const r = Math.hypot(W, H) * props.glow
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, r))
    core.addColorStop(0, pal[0])
    core.addColorStop(0.4, `${pal[0]}66`)
    core.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.globalAlpha = 0.9
    ctx.fillStyle = core
    ctx.fillRect(0, 0, W, H)

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'

    t += 0.014 * props.speed * frames
  }
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
