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
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
  filled: true,
  animation: 'none',
  speed: 'normal',
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
</script>

<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :class="cn('text-card', animClass, props.class)"
  >
    <path
      d="M50 6 C26 6 10 22 10 46 C10 60 18 68 26 72 L26 86 Q26 92 32 92 L68 92 Q74 92 74 86 L74 72 C82 68 90 60 90 46 C90 22 74 6 50 6 Z"
      stroke-linejoin="round"
      :fill="filled ? (color || 'currentColor') : 'none'"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
    />
    <circle
      cx="33"
      cy="46"
      r="11"
      fill="hsl(var(--foreground))"
    />
    <circle
      cx="67"
      cy="46"
      r="11"
      fill="hsl(var(--foreground))"
    />
    <path
      d="M50 58 L44 70 L56 70 Z"
      fill="hsl(var(--foreground))"
    />
    <path
      d="M40 80 V92 M50 80 V92 M60 80 V92"
      fill="none"
      :stroke="strokeValue"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
