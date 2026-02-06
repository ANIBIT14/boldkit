<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: number
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 3,
})
</script>

<template>
  <svg
    :width="size"
    :height="size * 0.2"
    viewBox="0 0 100 20"
    :class="cn('text-primary', props.class)"
  >
    <path
      d="M2 12 Q10 8 20 14 Q30 18 40 10 Q50 6 60 14 Q70 18 80 10 Q90 6 98 12"
      fill="none"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      d="M5 16 Q15 10 25 16 Q35 20 45 12 Q55 8 65 16 Q75 20 85 12 Q95 8 98 14"
      fill="none"
      stroke="currentColor"
      :stroke-width="strokeWidth - 1"
      stroke-linecap="round"
      opacity="0.5"
    />
  </svg>
</template>
