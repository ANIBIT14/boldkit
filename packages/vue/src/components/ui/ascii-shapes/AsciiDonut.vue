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

function drawDonut(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0008, B = t * 0.001
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const R1 = 1.2, R2 = 2.0, K2 = 5.0
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const screenScale = Math.min(cols * aspect, rows) * 0.85
  const K1 = screenScale * K2 / (K2 + R1 + R2)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))

  for (let theta = 0; theta < 2 * Math.PI; theta += 0.04) {
    const cosT = Math.cos(theta), sinT = Math.sin(theta)
    for (let phi = 0; phi < 2 * Math.PI; phi += 0.015) {
      const cosP = Math.cos(phi), sinP = Math.sin(phi)
      const px = (R2 + R1 * cosT) * cosP
      const py = (R2 + R1 * cosT) * sinP
      const pz = R1 * sinT
      const py1 = py * cosA - pz * sinA
      const pz1 = py * sinA + pz * cosA
      const px2 = px * cosB - py1 * sinB
      const py2 = px * sinB + py1 * cosB
      const pz2 = pz1
      const zDist = K2 - pz2
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * px2 * ooz)
      const yp = Math.round(cy - K1 * py2 * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const nx = cosT * cosP
      const ny = cosT * sinP
      const nz = sinT
      const ny1 = ny * cosA - nz * sinA
      const nz1 = ny * sinA + nz * cosA
      const nx2 = nx * cosB - ny1 * sinB
      const ny2 = nx * sinB + ny1 * cosB
      const nz2 = nz1
      const L = nx2 * 0.57 + ny2 * (-0.57) + nz2 * (-0.57)
      if (L > 0 && ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawDonut(g, cols, rows, t, chars)
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
