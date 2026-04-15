<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  SIZE_MAP, CHARSETS, SPEED_MAP, makeGrid, gridToLines,
  type AsciiSize, type AsciiCharset, type AsciiSpeed,
} from './constants'

interface Props {
  class?: string
  size?: AsciiSize
  charset?: AsciiCharset
  color?: string
  speed?: AsciiSpeed
  animated?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md', charset: 'classic', speed: 'normal', animated: true,
})

const lines = ref<string[]>([])
let rafId = 0

function drawSpiral(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const spacing = Math.min(cx * aspect, cy) * 0.35
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect, dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.5) { grid[r][c] = chars[chars.length - 1]; continue }
      const angle = ((Math.atan2(dy, dx) + t * 0.002) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
      const armPhase = angle / (2 * Math.PI)
      const winding = Math.round(dist / spacing - armPhase)
      const nearestR = spacing * (armPhase + winding)
      const distToArm = Math.abs(dist - nearestR)
      const threshold = spacing * 0.38
      if (nearestR >= 0 && distToArm < threshold) {
        grid[r][c] = chars[Math.floor((1 - distToArm / threshold) * (chars.length - 1))]
      } else {
        grid[r][c] = ' '
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawSpiral(g, cols, rows, t, chars)
  return gridToLines(g)
}

function start() {
  cancelAnimationFrame(rafId)
  if (!props.animated) { lines.value = buildFrame(0); return }
  const startTime = performance.now()
  const speedMul = SPEED_MAP[props.speed]
  function loop(now: number) {
    lines.value = buildFrame((now - startTime) * speedMul)
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

onMounted(() => start())
onUnmounted(() => cancelAnimationFrame(rafId))
watch(() => [props.size, props.charset, props.speed, props.animated], () => start())
</script>

<template>
  <div :class="cn('inline-block border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-background overflow-hidden', props.class)">
    <pre class="font-mono text-xs leading-none tracking-tight select-none p-1"
      :style="{ color: color || 'currentColor' }">{{ lines.join('\n') }}</pre>
  </div>
</template>
