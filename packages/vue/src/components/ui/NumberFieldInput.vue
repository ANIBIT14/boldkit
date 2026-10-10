<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { NumberFieldInput as NumberFieldInputPrimitive, useForwardProps, type NumberFieldInputProps } from 'reka-ui'
import { cn } from '@/lib/utils'

// Reka renders <input type="text" role="spinbutton"> with aria-valuenow/min/max,
// inputmode, and ArrowUp/Down, PageUp/Down (×10), Home/End handling; the id set
// on <NumberField> lands here so a <Label for> can target it.
const props = defineProps<NumberFieldInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldInputPrimitive
    v-bind="forwarded"
    data-slot="number-field-input"
    :class="
      cn(
        'w-full min-w-0 flex-1 bg-transparent px-3 text-center text-base font-bold tabular-nums placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed md:text-sm',
        props.class
      )
    "
  />
</template>
