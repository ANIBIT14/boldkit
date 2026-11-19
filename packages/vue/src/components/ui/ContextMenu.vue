<script setup lang="ts">
import { ContextMenuRoot, useForwardProps, type ContextMenuRootProps } from 'reka-ui'

const props = defineProps<ContextMenuRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
</script>

<template>
  <ContextMenuRoot v-bind="forwarded">
    <slot />
  </ContextMenuRoot>
</template>
