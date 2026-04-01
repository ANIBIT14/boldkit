<script setup lang="ts">
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { emptyStateVariants } from './empty-state-variants'

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>

export interface EmptyStateProps {
  variant?: EmptyStateVariants['variant']
  size?: EmptyStateVariants['size']
  layout?: EmptyStateVariants['layout']
  animation?: EmptyStateVariants['animation']
  class?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  variant: 'default',
  size: 'md',
  layout: 'vertical',
  animation: 'none',
})
</script>

<template>
  <div :class="cn(emptyStateVariants({ variant, size, layout, animation }), props.class)">
    <slot />
  </div>
</template>
