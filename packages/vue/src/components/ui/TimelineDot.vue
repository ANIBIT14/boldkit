<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const timelineDotVariants = cva(
  'relative z-10 flex items-center justify-center border-3 border-foreground transition duration-200',
  {
    variants: {
      status: {
        completed: 'bg-success shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        current: 'bg-primary shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted',
      },
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
)

type TimelineDotVariants = VariantProps<typeof timelineDotVariants>

interface TimelineDotProps {
  status?: TimelineDotVariants['status']
  size?: TimelineDotVariants['size']
  class?: string
}

const props = withDefaults(defineProps<TimelineDotProps>(), {
  status: 'upcoming',
  size: 'md',
})
</script>

<template>
  <div :class="cn(timelineDotVariants({ status, size }), props.class)">
    <slot />
  </div>
</template>
