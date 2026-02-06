<script setup lang="ts">
import { PopoverRoot, type PopoverRootProps } from 'reka-ui'

const props = defineProps<PopoverRootProps>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <PopoverRoot v-bind="props" @update:open="emit('update:open', $event)">
    <slot />
  </PopoverRoot>
</template>
