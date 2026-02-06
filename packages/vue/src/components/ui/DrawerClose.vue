<script setup lang="ts">
import { DrawerClose as DrawerClosePrimitive } from 'vaul-vue'
</script>

<template>
  <DrawerClosePrimitive as-child>
    <slot />
  </DrawerClosePrimitive>
</template>
