<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconContainerVariants = cva(
  'flex items-center justify-center rounded-none border-3 border-foreground mb-4',
  {
    variants: {
      iconColor: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted/50 text-muted-foreground border-muted-foreground/50',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      iconColor: 'default',
      size: 'md',
    },
  }
)

type IconContainerVariants = VariantProps<typeof iconContainerVariants>

interface EmptyStateIconProps {
  iconColor?: IconContainerVariants['iconColor']
  size?: IconContainerVariants['size']
  class?: string
}

const props = withDefaults(defineProps<EmptyStateIconProps>(), {
  iconColor: 'default',
  size: 'md',
})
</script>

<template>
  <div :class="cn(iconContainerVariants({ iconColor, size }), props.class)">
    <slot />
  </div>
</template>
