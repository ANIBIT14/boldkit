<script setup lang="ts">
import { AccordionRoot, useForwardProps, type AccordionRootProps } from 'reka-ui'

const props = defineProps<AccordionRootProps>()
// Forward only props the caller set: Vue casts absent booleans to false,
// which would pin `open` closed and override Reka defaults (loop, unmountOnHide).
const forwarded = useForwardProps(props)
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
