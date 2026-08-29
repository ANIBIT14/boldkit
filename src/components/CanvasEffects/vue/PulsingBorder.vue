<script setup lang="ts">
/**
 * Pulsing Border — travelling light around a frame
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <PulsingBorder :colors="['#ff4b82', '#00d2dc']" :thickness="6" :spots="4" />
 */
import { ref } from 'vue'
import { useCanvasEffect } from '@/composables/useCanvasEffect'

const props = withDefaults(defineProps<{
  /** Colours of the travelling light spots */
  colors?: string[]
  /** Fill inside the frame */
  bgColor?: string
  /** Border thickness in CSS pixels */
  thickness?: number
  /** Number of light spots travelling the perimeter */
  spots?: number
  /** Animation speed multiplier */
  speed?: number
  /** Glow bleed in CSS pixels */
  bloom?: number
}>(), {
  colors: () => ['#ff4b82', '#ffc832', '#00d2dc', '#7df9ff'],
  bgColor: '#080808',
  thickness: 5,
  spots: 4,
  speed: 1,
  bloom: 26,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

useCanvasEffect(canvasRef, (ctx, el) => {
  /**
   * Map 0..1 to a point on the rectangle perimeter, walking clockwise from
   * the top-left corner.
   */
  const onPerimeter = (u: number, w: number, h: number) => {
    const p = ((u % 1) + 1) % 1
    const per = 2 * (w + h)
    let dLeft = p * per
    if (dLeft < w) return { x: dLeft, y: 0 }
    dLeft -= w
    if (dLeft < h) return { x: w, y: dLeft }
    dLeft -= h
    if (dLeft < w) return { x: w - dLeft, y: h }
    dLeft -= w
    return { x: 0, y: h - dLeft }
  }

  let t = 0

  return (_dt, frames) => {
    const W = el.width, H = el.height
    if (!W || !H) return

    // Props are authored in CSS pixels; convert once per frame.
    const scale = el.offsetWidth ? W / el.offsetWidth : 1
    const pal = props.colors
    if (!pal.length) return
    const thick = Math.max(1, props.thickness * scale)
    const bloomPx = Math.max(0, props.bloom * scale)
    const n = Math.max(1, Math.round(props.spots))

    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, W, H)

    // Clip to the frame so the bloom bleeds inward but never floods the middle.
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, W, H)
    ctx.rect(thick + bloomPx, thick + bloomPx, Math.max(0, W - 2 * (thick + bloomPx)), Math.max(0, H - 2 * (thick + bloomPx)))
    ctx.clip('evenodd')

    ctx.globalCompositeOperation = 'lighter'
    const iw = W - thick, ih = H - thick

    for (let i = 0; i < n; i++) {
      const u = t * (0.35 + (i % 3) * 0.12) + i / n
      const { x, y } = onPerimeter(u, iw, ih)
      const px = x + thick / 2, py = y + thick / 2
      const pulse = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.9)
      const r = Math.max(1, (thick * 2 + bloomPx) * pulse)

      const g = ctx.createRadialGradient(px, py, 0, px, py, r)
      const col = pal[i % pal.length]
      g.addColorStop(0, col)
      g.addColorStop(0.35, `${col}99`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(px, py, r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
    ctx.restore()

    // Hard keyline on top — the frame stays crisp regardless of the glow.
    ctx.strokeStyle = pal[0]
    ctx.globalAlpha = 0.75
    ctx.lineWidth = Math.max(1, thick * 0.35)
    ctx.strokeRect(thick / 2, thick / 2, W - thick, H - thick)
    ctx.globalAlpha = 1

    t += 0.006 * props.speed * frames
  }
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
