<script setup lang="ts">
import { MenubarRadioGroup as MenubarRadioGroupPrimitive } from 'reka-ui'

defineProps<{
  modelValue?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<template>
  <MenubarRadioGroupPrimitive :model-value="modelValue" @update:model-value="(val) => emit('update:modelValue', val as string | null)">
    <slot />
  </MenubarRadioGroupPrimitive>
</template>
