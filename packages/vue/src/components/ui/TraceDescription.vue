<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <span
    data-slot="trace-description"
    :class="
      cn(
        'shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground tabular-nums',
        props.class
      )
    "
  >
    <slot />
  </span>
</template>
