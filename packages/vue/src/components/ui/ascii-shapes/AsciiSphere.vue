<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  SIZE_MAP, CHARSETS, SPEED_MAP, makeGrid, gridToLines, MULTICOLOR_PALETTE,
  type AsciiSize, type AsciiCharset, type AsciiSpeed,
} from './constants'

interface Props {
  class?: string
  size?: AsciiSize
  charset?: AsciiCharset
  color?: string
  speed?: AsciiSpeed
  animated?: boolean
  multicolor?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md', charset: 'classic', speed: 'normal', animated: true, multicolor: false,
})

let rafId = 0
let isMounted = false
const lines = shallowRef<string[]>(buildFrame(0))

function drawSphere(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const cx = cols / 2, cy = rows / 2
  const aspect = 2.0
  const R = Math.min(cols / (aspect * 2), rows / 2) * 0.88
  const A = t * 0.0007, B = t * 0.0004
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const lx = 0.577, ly = -0.577, lz = -0.577
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sx = (c - cx) / (R * aspect)
      const sy = (r - cy) / R
      const d2 = sx * sx + sy * sy
      if (d2 >= 1.0) continue
      const sz = Math.sqrt(1.0 - d2)
      const ny1 = sy * cosA - sz * sinA
      const nz1 = sy * sinA + sz * cosA
      const nx2 = sx * cosB + nz1 * sinB
      const nz2 = -sx * sinB + nz1 * cosB
      const ny2 = ny1
      const lat = Math.asin(Math.max(-1, Math.min(1, ny2)))
      const lon = Math.atan2(nx2, nz2)
      const onGrid = Math.abs(Math.cos(lat * 5)) > 0.93 || Math.abs(Math.cos(lon * 8)) > 0.91
      const L = Math.max(0, sx * lx + sy * ly + sz * lz)
      if (onGrid) {
        grid[r][c] = chars[Math.min(Math.floor((0.3 + L * 0.7) * (chars.length - 1)), chars.length - 1)]
      } else if (L > 0.02) {
        grid[r][c] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawSphere(g, cols, rows, t, chars)
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
    :style="props.multicolor ? undefined : { color: props.color || 'currentColor' }"
  ><template v-if="props.multicolor"><template v-for="(line, i) in lines" :key="i"><span :style="{ color: MULTICOLOR_PALETTE[i % MULTICOLOR_PALETTE.length] }">{{ line }}</span><template v-if="i < lines.length - 1">&#10;</template></template></template><template v-else>{{ lines.join('\n') }}</template></pre>
</template>
