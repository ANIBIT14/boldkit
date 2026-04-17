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

function drawTrefoilKnot(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0008, B = t * 0.0005
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K2 = 5.0
  const screenScale = Math.min(cols * aspect, rows) * 0.85
  const K1 = screenScale * K2 / (K2 + 3.5)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const tubeR = 0.28
  const steps = 400
  const tubeSteps = 20
  const lx = 0.577, ly = 0.577, lz = -0.577
  const EPS = 0.02

  function knotPt(th: number): [number, number, number] {
    return [
      (2 + Math.cos(3 * th)) * Math.cos(2 * th),
      (2 + Math.cos(3 * th)) * Math.sin(2 * th),
      Math.sin(3 * th) * 2,
    ]
  }
  function rotYX(px: number, py: number, pz: number): [number, number, number] {
    const rx1 = px * cosA + pz * sinA, ry1 = py, rz1 = -px * sinA + pz * cosA
    return [rx1, ry1 * cosB - rz1 * sinB, ry1 * sinB + rz1 * cosB]
  }

  for (let i = 0; i < steps; i++) {
    const th = (i / steps) * 2 * Math.PI
    const [px, py, pz] = knotPt(th)
    const [px2, py2, pz2] = knotPt(th + EPS)
    let tx = px2 - px, ty = py2 - py, tz = pz2 - pz
    const tlen = Math.sqrt(tx * tx + ty * ty + tz * tz)
    tx /= tlen; ty /= tlen; tz /= tlen
    let upx = 0, upy = 0, upz = 1
    let dot = tx * upx + ty * upy + tz * upz
    let nx = upx - dot * tx, ny = upy - dot * ty, nz = upz - dot * tz
    let nlen = Math.sqrt(nx * nx + ny * ny + nz * nz)
    if (nlen < 0.001) {
      upx = 0; upy = 1; upz = 0; dot = tx * upx + ty * upy + tz * upz
      nx = upx - dot * tx; ny = upy - dot * ty; nz = upz - dot * tz
      nlen = Math.sqrt(nx * nx + ny * ny + nz * nz)
    }
    nx /= nlen; ny /= nlen; nz /= nlen
    const bx = ty * nz - tz * ny, by = tz * nx - tx * nz, bz = tx * ny - ty * nx
    for (let j = 0; j < tubeSteps; j++) {
      const u = (j / tubeSteps) * 2 * Math.PI
      const cu = Math.cos(u), su = Math.sin(u)
      const qx = px + tubeR * (cu * nx + su * bx)
      const qy = py + tubeR * (cu * ny + su * by)
      const qz = pz + tubeR * (cu * nz + su * bz)
      const [rx, ry, rz] = rotYX(qx, qy, qz)
      const zDist = K2 - rz
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * rx * ooz)
      const yp = Math.round(cy - K1 * ry * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const snx = cu * nx + su * bx, sny = cu * ny + su * by, snz = cu * nz + su * bz
      const [rnx, rny, rnz] = rotYX(snx, sny, snz)
      const L = Math.max(0, rnx * lx + rny * ly + rnz * lz)
      if (ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        const intensity = 0.15 + L * 0.85
        grid[yp][xp] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawTrefoilKnot(g, cols, rows, t, chars)
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
