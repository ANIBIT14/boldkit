<script setup lang="ts">
import { DialogRoot, useForwardProps, type DialogRootProps } from 'reka-ui'

const props = defineProps<DialogRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot v-bind="forwarded" @update:open="emit('update:open', $event)">
    <slot />
  </DialogRoot>
</template>
