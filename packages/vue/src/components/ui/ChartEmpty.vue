<script setup lang="ts">
import { cn } from '@/lib/utils'

interface ChartEmptyProps {
  message?: string
  class?: string
}

withDefaults(defineProps<ChartEmptyProps>(), {
  message: 'No data',
})
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    :class="cn(
      'flex min-h-[120px] w-full items-center justify-center border-3 border-dashed border-foreground/40 bg-muted/20 p-6 text-xs font-bold uppercase tracking-wide text-muted-foreground',
      $props.class
    )"
  >
    <slot>{{ message }}</slot>
  </div>
</template>
