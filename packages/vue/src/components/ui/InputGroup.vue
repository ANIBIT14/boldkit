<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-stretch border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
