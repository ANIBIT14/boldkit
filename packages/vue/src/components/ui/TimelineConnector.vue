<script setup lang="ts">
import { inject } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { TIMELINE_INJECTION_KEY, type TimelineContext } from './Timeline.vue'

const timelineConnectorVariants = cva('transition duration-200', {
  variants: {
    status: {
      completed: 'bg-foreground',
      current: 'bg-foreground',
      upcoming: 'border-dashed border-2 border-foreground/50 bg-transparent',
    },
    orientation: {
      vertical: 'w-[3px] min-h-8 ml-[14px]',
      horizontal: 'h-[3px] min-w-8 mt-[14px]',
    },
  },
  defaultVariants: {
    status: 'upcoming',
    orientation: 'vertical',
  },
})

type TimelineConnectorVariants = VariantProps<typeof timelineConnectorVariants>

interface TimelineConnectorProps {
  status?: TimelineConnectorVariants['status']
  class?: string
}

const props = withDefaults(defineProps<TimelineConnectorProps>(), {
  status: 'upcoming',
})

const timelineContext = inject<TimelineContext>(TIMELINE_INJECTION_KEY, {
  orientation: 'vertical',
})
</script>

<template>
  <div
    :class="cn(
      timelineConnectorVariants({ status, orientation: timelineContext.orientation }),
      props.class
    )"
  />
</template>
