<script setup lang="ts">
import { shallowRef, computed, onMounted, onUnmounted, watch } from 'vue'
import { getPoint, getAngle, buildPath, getDetailScale, getCurvePulseDuration } from '@/lib/math-curves'
import type { LoaderCurveKey } from '@/lib/math-curves'

interface MathCurveLoaderProps {
  curve?: LoaderCurveKey
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  speed?: 'slow' | 'normal' | 'fast'
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
  ariaLabel?: string
  class?: string
}

const props = withDefaults(defineProps<MathCurveLoaderProps>(), {
  curve: 'rose',
  size: 'md',
  speed: 'normal',
  strokeWidth: 4,
  headSize: 8,
  ariaLabel: 'Loading',
})

const sizeMap: Record<NonNullable<MathCurveLoaderProps['size']>, number> = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
}

const speedMap: Record<NonNullable<MathCurveLoaderProps['speed']>, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

const svgPathRef = shallowRef<SVGPathElement | null>(null)
const svgHeadRef = shallowRef<SVGRectElement | null>(null)

const pixelSize = computed(() => sizeMap[props.size ?? 'md'])

let rafId = 0
let startTime = 0
let isMounted = false

function startLoop() {
  if (!isMounted) return
  cancelAnimationFrame(rafId)
  startTime = performance.now()

  function frame(now: number) {
    const elapsed = now - startTime
    const loopDuration = speedMap[props.speed ?? 'normal']
    const pulseDuration = getCurvePulseDuration(props.curve ?? 'rose')

    const progress = (elapsed % loopDuration) / loopDuration
    const detailScale = getDetailScale(elapsed, pulseDuration)

    // Update track path
    if (svgPathRef.value) {
      svgPathRef.value.setAttribute('d', buildPath(props.curve ?? 'rose', detailScale))
    }

    // Update head rect
    if (svgHeadRef.value) {
      const { x, y } = getPoint(props.curve ?? 'rose', progress, detailScale)
      const angle = getAngle(props.curve ?? 'rose', progress, detailScale)
      const half = (props.headSize ?? 8) / 2
      svgHeadRef.value.setAttribute('x', String(x - half))
      svgHeadRef.value.setAttribute('y', String(y - half))
      svgHeadRef.value.setAttribute(
        'transform',
        `rotate(${angle} ${x} ${y})`
      )
    }

    rafId = requestAnimationFrame(frame)
  }

  rafId = requestAnimationFrame(frame)
}

onMounted(() => {
  isMounted = true
  startLoop()
})

onUnmounted(() => {
  isMounted = false
  cancelAnimationFrame(rafId)
})

watch(
  () => [props.curve, props.speed],
  () => {
    startLoop()
  }
)
</script>

<template>
  <svg
    :width="pixelSize"
    :height="pixelSize"
    viewBox="0 0 100 100"
    role="status"
    :aria-label="props.ariaLabel"
    :class="props.class"
    style="overflow: visible; display: block"
  >
    <!-- Track -->
    <path
      ref="svgPathRef"
      :stroke="trackColor ?? 'currentColor'"
      :stroke-width="strokeWidth"
      stroke-opacity="0.2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
    />
    <!-- Head -->
    <rect
      ref="svgHeadRef"
      :width="headSize"
      :height="headSize"
      :fill="headColor ?? 'hsl(var(--primary))'"
      stroke="currentColor"
      stroke-width="1.5"
      x="0"
      y="0"
    />
  </svg>
</template>
