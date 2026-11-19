<script setup lang="ts">
import { DropdownMenuRoot, useForwardProps, type DropdownMenuRootProps } from 'reka-ui'

const props = defineProps<DropdownMenuRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
