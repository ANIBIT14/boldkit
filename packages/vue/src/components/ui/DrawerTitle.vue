<script setup lang="ts">
import { DrawerTitle as DrawerTitlePrimitive } from 'vaul-vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DrawerTitlePrimitive
    :class="cn('text-lg font-bold uppercase tracking-wide leading-none', $props.class)"
  >
    <slot />
  </DrawerTitlePrimitive>
</template>
