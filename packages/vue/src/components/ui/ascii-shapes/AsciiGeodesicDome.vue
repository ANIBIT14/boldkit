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

function drawGeodesicDome(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0004, B = t * 0.00025
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K2 = 5.0
  const screenScale = Math.min(cols * aspect, rows) * 0.85
  const K1 = screenScale * K2 / (K2 + 1.05)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.577, ly = 0.577, lz = -0.577

  function norm3(v: [number, number, number]): [number, number, number] {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
    return [v[0] / len, v[1] / len, v[2] / len]
  }
  function rotYX(px: number, py: number, pz: number): [number, number, number] {
    const rx1 = px * cosA + pz * sinA, ry1 = py, rz1 = -px * sinA + pz * cosA
    return [rx1, ry1 * cosB - rz1 * sinB, ry1 * sinB + rz1 * cosB]
  }

  const phi = (1 + Math.sqrt(5)) / 2
  const rawV: [number, number, number][] = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1],
  ]
  const faces: [number, number, number][] = [
    [0,1,8],[0,8,4],[0,4,5],[0,5,9],[0,9,1],
    [1,6,8],[8,10,4],[4,2,5],[5,11,9],[9,7,1],
    [6,10,8],[10,2,4],[2,11,5],[11,7,9],[7,6,1],
    [3,6,7],[3,10,6],[3,2,10],[3,11,2],[3,7,11],
  ]
  const freq = 3

  function plotEdge(v1: [number, number, number], v2: [number, number, number]) {
    if (v1[1] < -0.3 && v2[1] < -0.3) return
    for (let s = 0; s <= 28; s++) {
      const f = s / 28
      const px = v1[0] + f * (v2[0] - v1[0])
      const py = v1[1] + f * (v2[1] - v1[1])
      const pz = v1[2] + f * (v2[2] - v1[2])
      const [rx, ry, rz] = rotYX(px, py, pz)
      const zDist = K2 - rz
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * rx * ooz)
      const yp = Math.round(cy - K1 * ry * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const [rnx, rny, rnz] = rotYX(px, py, pz)
      const L = Math.max(0.25, rnx * lx + rny * ly + rnz * lz)
      if (ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        grid[yp][xp] = chars[Math.min(Math.floor(L * (chars.length - 1)), chars.length - 1)]
      }
    }
  }

  for (const [ai, bi, ci] of faces) {
    const va = norm3(rawV[ai]), vb = norm3(rawV[bi]), vc = norm3(rawV[ci])
    const pts: [number, number, number][][] = []
    for (let i = 0; i <= freq; i++) {
      pts[i] = []
      for (let j = 0; j <= freq - i; j++) {
        const k = freq - i - j
        pts[i][j] = norm3([(i * va[0] + j * vb[0] + k * vc[0]) / freq,
                            (i * va[1] + j * vb[1] + k * vc[1]) / freq,
                            (i * va[2] + j * vb[2] + k * vc[2]) / freq])
      }
    }
    for (let i = 0; i <= freq; i++) {
      for (let j = 0; j <= freq - i; j++) {
        if (j + 1 <= freq - i) plotEdge(pts[i][j], pts[i][j + 1])
        if (i + 1 <= freq && j <= freq - (i + 1)) plotEdge(pts[i][j], pts[i + 1][j])
        if (i + 1 <= freq && j >= 1) plotEdge(pts[i][j], pts[i + 1][j - 1])
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawGeodesicDome(g, cols, rows, t, chars)
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
