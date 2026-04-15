<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
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
  size: 'md', charset: 'braille', speed: 'normal', animated: true,
})

let rafId = 0
let isMounted = false
const lines = shallowRef<string[]>(buildFrame(0))

function drawRose(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const k = 5
  const radius = Math.min(cx * aspect, cy) * 0.85
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) * aspect, dy = r - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) + t * 0.001
      const roseR = radius * Math.abs(Math.cos(k * angle))
      const distToRose = Math.abs(dist - roseR)
      const threshold = radius * 0.12
      if (distToRose < threshold) {
        grid[r][c] = chars[Math.floor((1 - distToRose / threshold) * (chars.length - 1))]
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
  drawRose(g, cols, rows, t, chars)
  return gridToLines(g)
}

function start() {
  if (!isMounted) return
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

onMounted(() => { isMounted = true; start() })
onUnmounted(() => { isMounted = false; cancelAnimationFrame(rafId) })
watch(() => [props.size, props.charset, props.speed, props.animated], () => start())
</script>

<template>
  <pre
    :class="cn('inline-block border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bg-background overflow-hidden font-mono text-xs leading-none tracking-tight select-none p-1', props.class)"
    :style="{ color: color || 'currentColor' }"
  >{{ lines.join('\n') }}</pre>
</template>
