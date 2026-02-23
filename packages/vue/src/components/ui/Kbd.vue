<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

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

interface KbdProps extends PrimitiveProps {
  variant?: KbdVariants['variant']
  size?: KbdVariants['size']
  class?: string
}

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  variant: 'default',
  size: 'md',
})

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, ...rest } = props
  return rest
})
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :class="cn(kbdVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
