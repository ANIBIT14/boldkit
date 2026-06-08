<script setup lang="ts">
import { ContextMenuTrigger as ContextMenuTriggerPrimitive } from 'reka-ui'
</script>

<template>
  <ContextMenuTriggerPrimitive as-child>
    <slot />
  </ContextMenuTriggerPrimitive>
</template>
