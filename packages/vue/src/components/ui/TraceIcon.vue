<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <span
    data-slot="trace-icon"
    aria-hidden="true"
    :class="
      cn(
        'flex size-6 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground transition-colors duration-150 [&_svg]:pointer-events-none [&_svg]:size-3.5',
        'group-data-[status=running]/trace-line:bg-accent group-data-[status=running]/trace-line:text-accent-foreground',
        'group-data-[status=error]/trace-line:bg-destructive group-data-[status=error]/trace-line:text-destructive-foreground',
        'group-data-[status=pending]/trace-line:border-dashed',
        props.class
      )
    "
  >
    <slot />
  </span>
</template>
