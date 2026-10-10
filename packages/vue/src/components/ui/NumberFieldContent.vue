<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// The single bordered box holding the − button, the input and the + button.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="number-field-content"
    :class="
      cn(
        'flex h-11 w-full items-stretch border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-interactive focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
