<script setup lang="ts">
import { PinInputInput } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  index: number
}>()
</script>

<template>
  <PinInputInput
    :index="index"
    :class="
      cn(
        'relative flex h-12 w-12 items-center justify-center border-3 border-foreground bg-background text-sm font-bold uppercase shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 first:border-l-3 first:rounded-l-none last:rounded-r-none text-center',
        'focus:z-10 focus:ring-2 focus:ring-ring focus:ring-offset-background focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none',
        $props.class
      )
    "
  />
</template>
