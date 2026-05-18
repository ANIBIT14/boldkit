<script setup lang="ts">
/**
 * Lightning — Fractal electric arcs
 *
 * Branching lightning bolts strike between random anchor points with
 * recursive midpoint-displacement subdivision and glow bloom.
 *
 * @example
 * <Lightning color="#7df9ff" :bolt-interval="1.2" :branches="4" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Primary bolt color */
  color?: string
  /** Seconds between new bolts */
  boltInterval?: number
  /** Max branch depth per bolt */
  branches?: number
  /** Animation speed multiplier */
  speed?: number
}>(), {
  color: '#7df9ff',
  boltInterval: 1.2,
  branches: 4,
  speed: 1,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  const resize = () => {
    const dpr = window.devicePixelRatio || 1
    if (el.offsetWidth > 0) el.width = el.offsetWidth * dpr
    if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
  }
  resize()

  function subdivide(
    x1: number, y1: number, x2: number, y2: number,
    depth: number, jitter: number,
  ): Array<{ x: number; y: number }> {
    if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }]
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * jitter
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * jitter
    const left = subdivide(x1, y1, mx, my, depth - 1, jitter * 0.55)
    const right = subdivide(mx, my, x2, y2, depth - 1, jitter * 0.55)
    return [...left, ...right.slice(1)]
  }

  type Bolt = { segments: Array<{ x: number; y: number }>[]; alpha: number; width: number; color: string }
  let bolts: Bolt[] = []
  let timer = 0

  function spawnBolt() {
    const W = el.width, H = el.height, col = props.color, maxBranch = props.branches
    const x1 = W * (0.2 + Math.random() * 0.6), y1 = H * 0.02
    const x2 = W * (0.15 + Math.random() * 0.7), y2 = H * (0.85 + Math.random() * 0.13)
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const trunk = subdivide(x1, y1, x2, y2, 7, dist * 0.18)
    const allSegments: Array<{ x: number; y: number }>[] = [trunk]

    const branchCount = 2 + Math.floor(Math.random() * maxBranch)
    for (let b = 0; b < branchCount; b++) {
      const idx = Math.floor(trunk.length * (0.15 + Math.random() * 0.6))
      const origin = trunk[idx]
      const angle = (Math.random() - 0.5) * 1.6 + Math.PI * 0.5
      const len = dist * (0.15 + Math.random() * 0.25)
      const ex = origin.x + Math.cos(angle) * len, ey = origin.y + Math.sin(angle) * len
      allSegments.push(subdivide(origin.x, origin.y, ex, ey, 5, len * 0.22))
    }

    bolts.push({ segments: allSegments, alpha: 1.2, width: 2.5, color: col })
  }

  const draw = () => {
    const W = el.width, H = el.height, spd = props.speed

    ctx.fillStyle = 'rgba(5,2,15,0.25)'
    ctx.fillRect(0, 0, W, H)

    timer += 0.016 * spd
    if (timer >= props.boltInterval) { spawnBolt(); timer = 0 }

    bolts = bolts.filter(bolt => {
      bolt.alpha -= 0.018 * spd
      if (bolt.alpha <= 0) return false
      const a = Math.min(1, bolt.alpha)

      bolt.segments.forEach((seg, si) => {
        const isTrunk = si === 0
        const lw = isTrunk ? bolt.width : bolt.width * 0.5

        ctx.beginPath()
        seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = bolt.color; ctx.lineWidth = lw + 6
        ctx.globalAlpha = a * 0.15; ctx.shadowColor = bolt.color; ctx.shadowBlur = 25; ctx.stroke()

        ctx.beginPath()
        seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = bolt.color; ctx.lineWidth = lw
        ctx.globalAlpha = a * 0.85; ctx.shadowBlur = 12; ctx.stroke()

        if (isTrunk) {
          ctx.beginPath()
          seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = lw * 0.35
          ctx.globalAlpha = a * 0.7; ctx.shadowBlur = 4; ctx.stroke()
        }
      })

      ctx.shadowBlur = 0; ctx.globalAlpha = 1
      return true
    })

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
