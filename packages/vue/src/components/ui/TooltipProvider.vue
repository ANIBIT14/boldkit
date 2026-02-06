<script setup lang="ts">
import { TooltipProvider as TooltipProviderPrimitive, type TooltipProviderProps } from 'reka-ui'

defineProps<TooltipProviderProps>()
</script>

<template>
  <TooltipProviderPrimitive v-bind="$props">
    <slot />
  </TooltipProviderPrimitive>
</template>
