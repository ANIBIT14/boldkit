<script setup lang="ts">
import { CollapsibleRoot, type CollapsibleRootProps } from 'reka-ui'

const props = defineProps<CollapsibleRootProps>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <CollapsibleRoot v-bind="props" @update:open="emit('update:open', $event)">
    <slot />
  </CollapsibleRoot>
</template>
