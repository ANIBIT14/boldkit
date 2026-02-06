<script setup lang="ts">
import { SelectRoot, type SelectRootProps } from 'reka-ui'

const props = defineProps<SelectRootProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string | number | bigint | Record<string, unknown> | null]
  'update:open': [value: boolean]
}>()
</script>

<template>
  <SelectRoot
    v-bind="props"
    @update:model-value="emit('update:modelValue', $event)"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </SelectRoot>
</template>
