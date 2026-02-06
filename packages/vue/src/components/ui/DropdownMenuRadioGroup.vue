<script setup lang="ts">
import { DropdownMenuRadioGroup as DropdownMenuRadioGroupPrimitive } from 'reka-ui'

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<template>
  <DropdownMenuRadioGroupPrimitive :model-value="modelValue" @update:model-value="(val) => emit('update:modelValue', val as string | null)">
    <slot />
  </DropdownMenuRadioGroupPrimitive>
</template>
