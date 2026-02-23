<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Kbd from './Kbd.vue'

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold uppercase border-3 border-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        outline: 'bg-background',
        ghost: 'bg-transparent border-transparent text-muted-foreground',
      },
      size: {
        sm: 'min-w-5 h-5 px-1 text-[10px]',
        md: 'min-w-6 h-6 px-1.5 text-xs',
        lg: 'min-w-8 h-8 px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type KbdVariants = VariantProps<typeof kbdVariants>

interface KbdComboProps {
  keys: string[]
  separator?: string
  variant?: KbdVariants['variant']
  size?: KbdVariants['size']
  class?: string
}

const props = withDefaults(defineProps<KbdComboProps>(), {
  separator: '+',
  variant: 'default',
  size: 'md',
})
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1', props.class)">
    <template v-for="(key, index) in keys" :key="index">
      <span v-if="index > 0" class="text-muted-foreground text-xs font-bold">{{ separator }}</span>
      <Kbd :variant="variant" :size="size">{{ key }}</Kbd>
    </template>
  </div>
</template>
