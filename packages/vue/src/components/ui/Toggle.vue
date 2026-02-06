<script setup lang="ts">
import { Toggle as TogglePrimitive } from 'reka-ui'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { toggleVariants } from './toggle-variants'

type ToggleVariants = VariantProps<typeof toggleVariants>

interface Props {
  class?: string
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  modelValue?: boolean
  defaultValue?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <TogglePrimitive
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :disabled="props.disabled"
    :name="props.name"
    :required="props.required"
    :class="cn(toggleVariants({ variant: props.variant, size: props.size }), props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TogglePrimitive>
</template>
