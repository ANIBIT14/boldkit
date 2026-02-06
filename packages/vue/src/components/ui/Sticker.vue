<script setup lang="ts">
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { stickerVariants } from './sticker-variants'

type StickerVariants = VariantProps<typeof stickerVariants>

interface Props {
  class?: string
  variant?: StickerVariants['variant']
  size?: StickerVariants['size']
  rotation?: StickerVariants['rotation']
  shadow?: StickerVariants['shadow']
  dashed?: boolean
  tape?: boolean
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  rotation: 'slight',
  shadow: 'default',
  dashed: false,
  tape: false,
  interactive: false,
})
</script>

<template>
  <div
    :class="
      cn(
        stickerVariants({ variant: props.variant, size: props.size, rotation: props.rotation, shadow: props.shadow }),
        dashed && 'before:absolute before:inset-[-6px] before:border-2 before:border-dashed before:border-foreground/50',
        tape && 'after:absolute after:left-1/2 after:top-[-8px] after:-translate-x-1/2 after:rotate-[-2deg] after:w-[50px] after:h-[16px] after:bg-accent/80 after:border-2 after:border-foreground',
        interactive && 'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
