<script setup lang="ts">
/**
 * Mesh Gradient — drifting colour field
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <MeshGradient :colors="['#ff4b82', '#ffc832', '#00d2dc']" :steps="6" :speed="1" />
 */
import { ref } from 'vue'
import { useCanvasEffect } from '@/composables/useCanvasEffect'

const props = withDefaults(defineProps<{
  /** Colour stops. Each becomes a drifting control point (2–8 works best). */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** How far control points wander from their anchor, 0–1 */
  distortion?: number
  /** Posterise the blend into N hard bands. 0 keeps the gradient smooth. */
  steps?: number
  /** Film-grain strength over the top, 0–1 */
  grain?: number
}>(), {
  colors: () => ['#ff4b82', '#ffc832', '#00d2dc', '#241d9a'],
  speed: 1,
  distortion: 0.55,
  steps: 0,
  grain: 0.12,
})

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

useCanvasEffect(canvasRef, (ctx, el) => {
  // Per-pixel work, so render at 1/SCALE and upscale — same trick as Plasma.
  const SCALE = 4
  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')
  if (!offCtx) return

  // Each control point gets its own frequency pair so the mesh never
  // settles into a visible loop.
  const anchors = Array.from({ length: 8 }, (_, i) => ({
    ax: 0.5 + 0.34 * Math.cos((i / 8) * Math.PI * 2),
    ay: 0.5 + 0.34 * Math.sin((i / 8) * Math.PI * 2),
    fx: 0.7 + i * 0.13,
    fy: 0.9 + i * 0.11,
    ph: i * 1.7,
  }))

  let t = 0

  return (_dt, frames) => {
    const W = el.width, H = el.height
    if (!W || !H) return

    const pal = props.colors.map(hexToRgb)
    if (!pal.length) return
    const dist = props.distortion
    const bands = Math.max(0, Math.round(props.steps))
    const grainAmt = props.grain

    const iw = Math.max(1, Math.ceil(W / SCALE))
    const ih = Math.max(1, Math.ceil(H / SCALE))
    if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

    const pts = pal.map((rgb, i) => {
      const a = anchors[i % anchors.length]
      return {
        x: a.ax + dist * 0.3 * Math.sin(t * a.fx + a.ph),
        y: a.ay + dist * 0.3 * Math.cos(t * a.fy + a.ph * 1.3),
        rgb,
      }
    })

    const img = offCtx.createImageData(iw, ih)
    const d = img.data

    for (let py = 0; py < ih; py++) {
      const v = py / ih
      for (let px = 0; px < iw; px++) {
        const u = px / iw
        let wr = 0, wg = 0, wb = 0, wsum = 0

        for (let k = 0; k < pts.length; k++) {
          const p = pts[k]
          const dx = u - p.x, dy = v - p.y
          // Inverse *fourth* power, not square: with squared falloff every point
          // contributes everywhere and the field washes out to grey.
          // +1e-4 keeps the weight finite when a pixel lands on a point.
          const d2 = dx * dx + dy * dy
          const w = 1 / (d2 * d2 + 1e-4)
          wr += p.rgb[0] * w; wg += p.rgb[1] * w; wb += p.rgb[2] * w
          wsum += w
        }

        let r = wr / wsum, g = wg / wsum, b = wb / wsum

        if (bands > 0) {
          const q = 255 / bands
          r = Math.round(r / q) * q
          g = Math.round(g / q) * q
          b = Math.round(b / q) * q
        }

        const i = (py * iw + px) * 4
        d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255
      }
    }

    offCtx.putImageData(img, 0, 0)
    ctx.clearRect(0, 0, W, H)
    // Smoothing off keeps band edges crisp when posterised.
    ctx.imageSmoothingEnabled = bands === 0
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(off, 0, 0, W, H)

    if (grainAmt > 0) {
      ctx.globalAlpha = grainAmt * 0.5
      ctx.fillStyle = '#000'
      for (let i = 0; i < 900; i++) {
        ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2)
      }
      ctx.globalAlpha = 1
    }

    t += 0.012 * props.speed * frames
  }
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
