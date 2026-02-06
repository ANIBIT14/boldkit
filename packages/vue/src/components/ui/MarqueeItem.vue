<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide',
        $props.class
      )
    "
  >
    <slot />
  </span>
</template>
