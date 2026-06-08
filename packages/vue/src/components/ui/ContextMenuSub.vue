<script setup lang="ts">
import { ContextMenuSub as ContextMenuSubPrimitive, type ContextMenuSubProps } from 'reka-ui'

const props = defineProps<ContextMenuSubProps>()
</script>

<template>
  <ContextMenuSubPrimitive v-bind="props">
    <slot />
  </ContextMenuSubPrimitive>
</template>
