<script setup lang="ts">
/**
 * MouseRipple — Interactive dot-grid ripple
 * Compatible with Vue 3 and Nuxt 3.
 *
 * @example
 * <MouseRipple color="#f59e0b" :gap="24" :ripple-radius="130" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  gap?: number
  rippleRadius?: number
  speed?: number
}>(), { color: '#f59e0b', gap: 24, rippleRadius: 130, speed: 1 })

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!
  const mouse = { x: -999, y: -999 }

  const resize = () => { el.width = el.offsetWidth; el.height = el.offsetHeight }
  resize()

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
  }
  el.addEventListener('mousemove', onMove)

  let t = 0
  const draw = () => {
    const GAP = props.gap, W = el.width, H = el.height, RAD = props.rippleRadius
    ctx.clearRect(0, 0, W, H)
    const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * GAP + GAP / 2, cy = r * GAP + GAP / 2
        const dx = cx - mouse.x, dy = cy - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const ripple = Math.max(0, 1 - dist / RAD) * Math.sin(dist * 0.14 - t * 3.2)
        const size = 3 + ripple * 9
        ctx.globalAlpha = Math.max(0.1, Math.min(1, 0.25 + Math.abs(ripple) * 0.75))
        ctx.fillStyle = props.color
        ctx.fillRect(cx - size / 2, cy - size / 2, size, size)
      }
    }
    ctx.globalAlpha = 1
    t += 0.06 * props.speed
    raf = requestAnimationFrame(draw)
  }

  draw()
  ro = new ResizeObserver(resize)
  ro.observe(el)

  // store cleanup for onUnmounted
  ;(el as unknown as { _cleanup: () => void })._cleanup = () => el.removeEventListener('mousemove', onMove)
})

onUnmounted(() => {
  cancelAnimationFrame(raf); ro?.disconnect()
  const el = canvasRef.value
  if (el) (el as unknown as { _cleanup?: () => void })._cleanup?.()
})
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%;cursor:crosshair" />
</template>
