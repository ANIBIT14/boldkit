<script setup lang="ts">
import { AlertDialogRoot } from 'reka-ui'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <AlertDialogRoot v-bind="props" @update:open="emit('update:open', $event)">
    <slot />
  </AlertDialogRoot>
</template>
