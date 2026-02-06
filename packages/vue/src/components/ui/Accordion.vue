<script setup lang="ts">
import { AccordionRoot, type AccordionRootProps } from 'reka-ui'

const props = defineProps<AccordionRootProps>()
</script>

<template>
  <AccordionRoot v-bind="props">
    <slot />
  </AccordionRoot>
</template>
