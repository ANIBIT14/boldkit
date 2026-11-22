<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: number
  strokeWidth?: number
  filled?: boolean
  /** Fill colour when `filled`, outline colour when not. */
  color?: string
  /** Outline colour. Defaults to the foreground token. */
  strokeColor?: string
  animation?:
    | 'none'
    // smooth presets
    | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
    // stepped presets — hard, non-interpolated motion (v3.5)
    | 'spin-step' | 'pulse-hard' | 'marquee-stamp'
  speed?: 'slow' | 'normal' | 'fast'
  /** Number of petals (3–16). */
  petals?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
  filled: true,
  animation: 'none',
  speed: 'normal',
  petals: 8,
})

/**
 * Resolve the outline colour.
 *
 * `color` used to apply to `fill` only, so `<Shape :filled="false" color="red" />`
 * rendered a black outline and the prop was a silent no-op. When the shape *is*
 * its outline, `color` is what the caller meant.
 */
const strokeValue = computed(() => {
  if (props.strokeColor) return props.strokeColor
  if (!props.filled && props.color) return props.color
  return 'hsl(var(--foreground))'
})

const animClass = computed(() => {
  const a = props.animation
  if (!a || a === 'none') return ''
  const s = props.speed && props.speed !== 'normal' ? `-${props.speed}` : ''
  return `shape-animate-${a}${s}`
})

const count = computed(() => Math.min(16, Math.max(3, Math.round(props.petals))))
</script>

<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-primary', animClass, props.class)"
  >
    <ellipse
      v-for="i in count"
      :key="i"
      cx="50"
      cy="25"
      :rx="Math.max(6, 60 / count + 4)"
      ry="21"
      :transform="`rotate(${(360 / count) * (i - 1)} 50 50)`"
      :fill="filled ? (color || 'currentColor') : 'none'"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
    />
    <circle cx="50" cy="50" r="15" fill="hsl(var(--warning))" :stroke="strokeValue" :stroke-width="strokeWidth" />
  </svg>
</template>
