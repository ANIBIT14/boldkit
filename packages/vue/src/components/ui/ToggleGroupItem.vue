<script setup lang="ts">
import { ToggleGroupItem as ToggleGroupItemPrimitive } from 'reka-ui'
import { type VariantProps } from 'class-variance-authority'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { toggleVariants } from './toggle-variants'
import { ToggleGroupContextKey, type ToggleGroupContext } from './ToggleGroup.vue'

type ToggleVariants = VariantProps<typeof toggleVariants>

interface Props {
  class?: string
  value: string
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  disabled?: boolean
}

const props = defineProps<Props>()

const context = inject<ToggleGroupContext>(ToggleGroupContextKey, {
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <ToggleGroupItemPrimitive
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        toggleVariants({
          variant: props.variant || context.variant,
          size: props.size || context.size,
        }),
        props.class
      )
    "
  >
    <slot />
  </ToggleGroupItemPrimitive>
</template>
