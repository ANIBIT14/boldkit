<script setup lang="ts">
import { RadioGroupItem as RadioGroupItemPrimitive, RadioGroupIndicator } from 'reka-ui'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <RadioGroupItemPrimitive
    :value="value"
    :class="
      cn(
        'aspect-square h-5 w-5 rounded-full border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none data-[state=checked]:bg-primary',
        $props.class
      )
    "
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <Circle class="h-2.5 w-2.5 fill-primary stroke-none" />
    </RadioGroupIndicator>
  </RadioGroupItemPrimitive>
</template>
