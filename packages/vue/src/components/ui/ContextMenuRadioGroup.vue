<script setup lang="ts">
import { ContextMenuRadioGroup as ContextMenuRadioGroupPrimitive } from 'reka-ui'

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <ContextMenuRadioGroupPrimitive
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </ContextMenuRadioGroupPrimitive>
</template>
