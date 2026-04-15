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

function drawHelix(grid: string[][], cols: number, rows: number, t: number, chars: string[]) {
  const cx = cols / 2, cy = rows / 2
  const aspect = 0.5
  const K2 = 6.0
  const scale = Math.min(cols * aspect, rows) * 0.5
  const K1 = scale
  const B = t * 0.0006
  const cosB = Math.cos(B), sinB = Math.sin(B)
  const zbuf: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-Infinity))
  const lx = 0.707, lz = -0.707
  const helixR = 1.2, helixH = 3.8, turns = 3

  function plotPt(px: number, py: number, pz: number, intensity: number) {
    const rx = px * cosB + pz * sinB
    const rz = -px * sinB + pz * cosB
    const zDist = K2 - rz
    if (zDist <= 0) return
    const ooz = 1 / zDist
    const xp = Math.round(cx + K1 * rx * ooz)
    const yp = Math.round(cy - K1 * py * ooz * aspect)
    if (xp >= 0 && xp < cols && yp >= 0 && yp < rows && ooz > zbuf[yp][xp]) {
      zbuf[yp][xp] = ooz
      grid[yp][xp] = chars[Math.min(Math.floor(intensity * (chars.length - 1)), chars.length - 1)]
    }
  }

  const pStep = 0.025
  for (let phi = 0; phi < turns * 2 * Math.PI; phi += pStep) {
    const y = (phi / (turns * 2 * Math.PI) - 0.5) * helixH * 2
    const x1 = helixR * Math.cos(phi), z1 = helixR * Math.sin(phi)
    plotPt(x1, y, z1, Math.max(0.15, Math.cos(phi) * lx + Math.sin(phi) * lz * 0.5 + 0.55))
    const x2 = helixR * Math.cos(phi + Math.PI), z2 = helixR * Math.sin(phi + Math.PI)
    plotPt(x2, y, z2, Math.max(0.15, Math.cos(phi + Math.PI) * lx + Math.sin(phi + Math.PI) * lz * 0.5 + 0.55))
    if (phi % (Math.PI * 0.5) < pStep * 1.5) {
      for (let s = 0; s <= 14; s++) {
        const f = s / 14
        plotPt(x1 + (x2 - x1) * f, y, z1 + (z2 - z1) * f, 0.45)
      }
    }
  }
}

function buildFrame(t: number): string[] {
  const { cols, rows } = SIZE_MAP[props.size]
  const chars = CHARSETS[props.charset]
  const g = makeGrid(cols, rows)
  drawHelix(g, cols, rows, t, chars)
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
