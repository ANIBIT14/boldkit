<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/50 rounded-none p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        sm: 'py-6 gap-2',
        md: 'py-8 gap-3',
        lg: 'py-12 gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>

interface EmptyStateProps {
  variant?: EmptyStateVariants['variant']
  size?: EmptyStateVariants['size']
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  variant: 'default',
  size: 'md',
})
</script>

<template>
  <div :class="cn(emptyStateVariants({ variant, size }), props.class)">
    <slot />
  </div>
</template>
