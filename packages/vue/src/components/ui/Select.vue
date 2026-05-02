<script setup lang="ts">
import { SelectRoot, type SelectRootProps } from 'reka-ui'

const props = defineProps<SelectRootProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'update:open': [value: boolean]
}>()
</script>

<template>
  <SelectRoot
    v-bind="props"
    @update:model-value="emit('update:modelValue', $event as string | number | null)"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </SelectRoot>
</template>
