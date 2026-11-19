<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="code-block-footer"
    :class="
      cn(
        'flex min-w-0 shrink-0 items-center gap-2 border-t-3 border-foreground bg-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wider group-data-[size=sm]/code-block:border-t-2',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
