<script setup lang="ts">
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { stickyNoteVariants } from './sticker-variants'

type StickyNoteVariants = VariantProps<typeof stickyNoteVariants>

interface Props {
  class?: string
  variant?: StickyNoteVariants['variant']
  size?: StickyNoteVariants['size']
  rotation?: StickyNoteVariants['rotation']
  pin?: boolean
  folded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'yellow',
  size: 'default',
  rotation: 'left',
  pin: false,
  folded: true,
})
</script>

<template>
  <div
    :class="
      cn(
        stickyNoteVariants({ variant: props.variant, size: props.size, rotation: props.rotation }),
        folded && 'before:absolute before:bottom-0 before:right-0 before:w-0 before:h-0 before:border-l-[20px] before:border-l-transparent before:border-b-[20px] before:border-b-foreground/20',
        props.class
      )
    "
  >
    <div
      v-if="pin"
      class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-destructive border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
    />
    <slot />
  </div>
</template>
