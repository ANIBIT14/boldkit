<script setup lang="ts">
import { provide } from 'vue'
import { cn } from '@/lib/utils'

export interface TimelineContext {
  orientation: 'vertical' | 'horizontal'
}

export const TIMELINE_INJECTION_KEY = Symbol('timeline')

interface TimelineProps {
  orientation?: 'vertical' | 'horizontal'
  class?: string
}

const props = withDefaults(defineProps<TimelineProps>(), {
  orientation: 'vertical',
})

provide(TIMELINE_INJECTION_KEY, {
  orientation: props.orientation,
})
</script>

<template>
  <div
    :class="cn(
      'relative',
      props.orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row',
      props.class
    )"
  >
    <slot />
  </div>
</template>
