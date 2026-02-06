<script setup lang="ts">
import { TooltipRoot, type TooltipRootProps } from 'reka-ui'

defineProps<TooltipRootProps>()
</script>

<template>
  <TooltipRoot v-bind="$props">
    <slot />
  </TooltipRoot>
</template>
