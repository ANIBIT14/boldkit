<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table
      :class="
        cn(
          'w-full caption-bottom text-sm border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          $props.class
        )
      "
    >
      <slot />
    </table>
  </div>
</template>
