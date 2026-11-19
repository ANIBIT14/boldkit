<script setup lang="ts">
import { HoverCardRoot, useForwardProps, type HoverCardRootProps } from 'reka-ui'

const props = defineProps<HoverCardRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
</script>

<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>
