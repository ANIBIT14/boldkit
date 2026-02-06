<script setup lang="ts">
import { DrawerDescription as DrawerDescriptionPrimitive } from 'vaul-vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DrawerDescriptionPrimitive :class="cn('text-sm text-muted-foreground', $props.class)">
    <slot />
  </DrawerDescriptionPrimitive>
</template>
