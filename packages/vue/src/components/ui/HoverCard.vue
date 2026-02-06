<script setup lang="ts">
import { HoverCardRoot, type HoverCardRootProps } from 'reka-ui'

const props = defineProps<HoverCardRootProps>()
</script>

<template>
  <HoverCardRoot v-bind="props">
    <slot />
  </HoverCardRoot>
</template>
