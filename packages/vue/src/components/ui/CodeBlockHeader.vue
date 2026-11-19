<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="code-block-header"
    :class="
      cn(
        'flex min-w-0 shrink-0 items-center gap-2 border-b-3 border-foreground bg-muted px-3 py-1.5 group-data-[size=sm]/code-block:border-b-2 group-data-[size=sm]/code-block:px-2 group-data-[size=sm]/code-block:py-1',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
