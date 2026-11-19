<script setup lang="ts">
import { SelectRoot, useForwardProps, type SelectRootProps } from 'reka-ui'

const props = defineProps<SelectRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'update:open': [value: boolean]
}>()
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    @update:model-value="emit('update:modelValue', $event as string | number | null)"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </SelectRoot>
</template>
