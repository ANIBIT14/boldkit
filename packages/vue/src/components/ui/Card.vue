<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  interactive?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        'bg-card text-card-foreground border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
        interactive &&
          'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        $props.class
      )
    "
  >
    <slot />
  </div>
</template>
