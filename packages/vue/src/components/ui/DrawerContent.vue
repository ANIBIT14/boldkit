<script setup lang="ts">
import { DrawerPortal, DrawerOverlay, DrawerContent as DrawerContentPrimitive } from 'vaul-vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay class="fixed inset-0 z-50 bg-black/70" />
    <DrawerContentPrimitive
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col border-3 border-b-0 border-foreground bg-background shadow-[0px_-8px_0px_hsl(var(--shadow-color))]',
          $props.class
        )
      "
    >
      <div class="mx-auto mt-4 h-2 w-[100px] bg-foreground" />
      <slot />
    </DrawerContentPrimitive>
  </DrawerPortal>
</template>
