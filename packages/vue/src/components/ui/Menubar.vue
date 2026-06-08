<script setup lang="ts">
import { MenubarRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <MenubarRoot
    :class="
      cn(
        'flex h-10 items-center gap-1 border-3 border-foreground bg-background p-1 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        $props.class
      )
    "
  >
    <slot />
  </MenubarRoot>
</template>
