<script setup lang="ts">
import { AspectRatio as AspectRatioPrimitive } from 'reka-ui'

defineProps<{
  ratio?: number
}>()
</script>

<template>
  <AspectRatioPrimitive :ratio="ratio">
    <slot />
  </AspectRatioPrimitive>
</template>
