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
  size: 'md', charset: 'braille', speed: 'normal', animated: true, multicolor: false,
})

let rafId = 0
let isMounted = false
const lines = shallowRef<string[]>(buildFrame(0))

function drawDNA(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const A = t * 0.0005
  const cosA = Math.cos(A), sinA = Math.sin(A)
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K2 = 6.0
  const scale = Math.min(cols * aspect, rows) * 0.52
  const K1 = scale
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.707, lz = -0.707
  const helixR = 1.0, helixH = 4.2, turns = 4.0, tubeR = 0.22
  const strandOffset = (150 / 180) * Math.PI
  const stepsPerBP = 6
  const totalSteps = Math.round(turns * 10 * stepsPerBP)
  const totalAngle = turns * 2 * Math.PI

  function rotY(px: number, py: number, pz: number): [number, number, number] {
    return [px * cosA + pz * sinA, py, -px * sinA + pz * cosA]
  }

  function plotTube(px: number, py: number, pz: number,
    tx: number, ty: number, tz: number, r: number, baseBrightness: number) {
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
    for (let j = 0; j < 16; j++) {
      const u = (j / 16) * 2 * Math.PI
      const cu = Math.cos(u), su = Math.sin(u)
      const qx = px + r * (cu * nx + su * bx)
      const qy = py + r * (cu * ny + su * by)
      const qz = pz + r * (cu * nz + su * bz)
      const [rx, ry, rz] = rotY(qx, qy, qz)
      const zDist = K2 - rz
      if (zDist <= 0) continue
      const ooz = 1 / zDist
      const xp = Math.round(cx + K1 * rx * ooz)
      const yp = Math.round(cy - K1 * ry * ooz * aspect)
      if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
      const snx = cu * nx + su * bx, snz = cu * nz + su * bz
      const [rnx,, rnz] = rotY(snx, 0, snz)
      const L = Math.max(0, rnx * lx + rnz * lz)
      if (ooz > zbuf[yp][xp]) {
        zbuf[yp][xp] = ooz
        const intensity = Math.max(0.12, Math.min(1, baseBrightness * (0.3 + L * 0.7)))
        grid[yp][xp] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
      }
    }
  }

  for (let i = 0; i < totalSteps; i++) {
    const f = i / totalSteps
    const y = -helixH + f * helixH * 2
    const angle = f * totalAngle
    const da = totalAngle / totalSteps
    const txRaw = -helixR * Math.sin(angle) * da
    const tyRaw = (helixH * 2) / totalSteps
    const tzRaw = helixR * Math.cos(angle) * da
    const tlen = Math.sqrt(txRaw * txRaw + tyRaw * tyRaw + tzRaw * tzRaw)
    const tx = txRaw / tlen, ty = tyRaw / tlen, tz = tzRaw / tlen
    const x1 = helixR * Math.cos(angle), z1 = helixR * Math.sin(angle)
    plotTube(x1, y, z1, tx, ty, tz, tubeR, 1.0)
    const x2 = helixR * Math.cos(angle + strandOffset), z2 = helixR * Math.sin(angle + strandOffset)
    plotTube(x2, y, z2, tx, ty, tz, tubeR, 0.72)
    if (i % stepsPerBP === 0) {
      for (let s = 0; s <= 10; s++) {
        const sf = s / 10
        const rx = x1 + sf * (x2 - x1), rz = z1 + sf * (z2 - z1)
        const [vrx, vry, vrz] = rotY(rx, y, rz)
        const zDist = K2 - vrz
        if (zDist <= 0) continue
        const ooz = 1 / zDist
        const xp = Math.round(cx + K1 * vrx * ooz)
        const yp = Math.round(cy - K1 * vry * ooz * aspect)
        if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue
        if (ooz > zbuf[yp][xp]) {
          zbuf[yp][xp] = ooz
          grid[yp][xp] = chars[Math.min(Math.floor(0.42 * (chars.length - 1)), chars.length - 1)]
        }
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawDNA(g, cols, rows, t, chars)
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
