<script setup lang="ts">
import { AvatarRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AvatarRoot
    :class="
      cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        $props.class
      )
    "
  >
    <slot />
  </AvatarRoot>
</template>
