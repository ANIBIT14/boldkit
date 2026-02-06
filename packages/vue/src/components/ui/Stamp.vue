<script setup lang="ts">
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { stampVariants } from './sticker-variants'

type StampVariants = VariantProps<typeof stampVariants>

interface Props {
  class?: string
  variant?: StampVariants['variant']
  size?: StampVariants['size']
  rotation?: StampVariants['rotation']
  doubleRing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  rotation: 'slight',
  doubleRing: false,
})
</script>

<template>
  <div
    :class="
      cn(
        stampVariants({ variant: props.variant, size: props.size, rotation: props.rotation }),
        'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        doubleRing && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
        props.class
      )
    "
  >
    <span class="text-center leading-tight">
      <slot />
    </span>
  </div>
</template>
