<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { NumberFieldDecrement as NumberFieldDecrementPrimitive, useForwardProps, type NumberFieldDecrementProps } from 'reka-ui'
import { Minus } from '@lucide/vue'
import { cn } from '@/lib/utils'

// Reka sets tabindex="-1", the "Decrease" aria-label, press-and-hold
// repeat, and disables the button at the bound.
const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldDecrementPrimitive
    v-bind="forwarded"
    data-slot="number-field-decrement"
    :class="
      cn(
        'flex w-11 shrink-0 items-center justify-center border-foreground bg-secondary text-secondary-foreground transition-[background-color,box-shadow] duration-100 hover:bg-primary hover:text-primary-foreground active:shadow-[inset_3px_3px_0px_hsl(var(--shadow-color))] data-[pressed]:shadow-[inset_3px_3px_0px_hsl(var(--shadow-color))] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:stroke-[3]',
        'border-r-3',
        props.class
      )
    "
  >
    <slot>
      <Minus aria-hidden="true" />
    </slot>
  </NumberFieldDecrementPrimitive>
</template>
