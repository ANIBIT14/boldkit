<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'
import {
  SIZE_MAP, CHARSETS, SPEED_MAP, makeGrid, gridToLines,
  makeMatrixState,
  type AsciiSize, type AsciiCharset, type AsciiSpeed, type ColState,
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
let matrixState: ColState[] = []

function drawMatrix(grid: string[][], cols: number, rows: number, t: number, chars: string[], state: ColState[]) {
  for (let c = 0; c < cols; c++) {
    const colT = (t * 0.001 * state[c].speed + state[c].offset) % (rows * 1.8)
    for (let r = 0; r < rows; r++) {
      const distFromHead = colT - r
      if (distFromHead >= 0 && distFromHead < 1) {
        grid[r][c] = chars[chars.length - 1]
      } else if (distFromHead >= 1 && distFromHead < rows * 0.45) {
        const fade = 1 - distFromHead / (rows * 0.45)
        grid[r][c] = chars[Math.floor(fade * (chars.length - 1))]
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
  drawMatrix(g, cols, rows, t, chars, matrixState)
  return gridToLines(g)
}

function start() {
  cancelAnimationFrame(rafId)
  matrixState = makeMatrixState(SIZE_MAP[props.size].cols)
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
