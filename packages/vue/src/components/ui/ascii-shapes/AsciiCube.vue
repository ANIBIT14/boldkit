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
  size: 'md', charset: 'blocks', speed: 'normal', animated: true, multicolor: false,
})

let rafId = 0
let isMounted = false
const lines = shallowRef<string[]>(buildFrame(0))

function drawCube(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0009, B = t * 0.0006
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const cx = cols / 2, cy = rows / 2
  const K2 = 5.0, S = 1.4, aspect = 0.5
  const scale = Math.min(cols * aspect, rows) * 0.72
  const K1 = scale * K2 / (K2 + S)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.577, ly = -0.577, lz = -0.577

  function rot(px: number, py: number, pz: number): [number, number, number] {
    const y1 = py * cosA - pz * sinA
    const z1 = py * sinA + pz * cosA
    return [px * cosB + z1 * sinB, y1, -px * sinB + z1 * cosB]
  }

  const step = 0.04
  const faces: Array<[[number, number, number], (u: number, v: number) => [number, number, number]]> = [
    [[0,  0,  1], (u, v) => [ u*S,  v*S,  S]],
    [[0,  0, -1], (u, v) => [-u*S,  v*S, -S]],
    [[1,  0,  0], (u, v) => [ S,    v*S, -u*S]],
    [[-1, 0,  0], (u, v) => [-S,    v*S,  u*S]],
    [[0, -1,  0], (u, v) => [ u*S, -S,    v*S]],
    [[0,  1,  0], (u, v) => [ u*S,  S,   -v*S]],
  ]

  for (const [norm, ptFn] of faces) {
    const [rnx, rny, rnz] = rot(norm[0], norm[1], norm[2])
    const L = Math.max(0, rnx * lx + rny * ly + rnz * lz)
    if (L < 0.02) continue
    const ch = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
    for (let u = -1; u <= 1 + step * 0.5; u += step) {
      for (let v = -1; v <= 1 + step * 0.5; v += step) {
        const [rx, ry, rz] = rot(...ptFn(u, v))
        const zDist = K2 - rz
        if (zDist <= 0) continue
        const ooz = 1 / zDist
        const xp = Math.round(cx + K1 * rx * ooz)
        const yp = Math.round(cy - K1 * ry * ooz * aspect)
        if (xp >= 0 && xp < cols && yp >= 0 && yp < rows && ooz > zbuf[yp][xp]) {
          zbuf[yp][xp] = ooz
          grid[yp][xp] = ch
        }
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawCube(g, cols, rows, t, chars)
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
