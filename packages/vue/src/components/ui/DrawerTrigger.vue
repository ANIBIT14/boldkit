<script setup lang="ts">
import { DrawerTrigger as DrawerTriggerPrimitive } from 'vaul-vue'
</script>

<template>
  <DrawerTriggerPrimitive as-child>
    <slot />
  </DrawerTriggerPrimitive>
</template>
