<script setup lang="ts">
import { AvatarFallback as AvatarFallbackPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
  delayMs?: number
}>()
</script>

<template>
  <AvatarFallbackPrimitive
    :delay-ms="delayMs"
    :class="
      cn(
        'flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-bold uppercase',
        $props.class
      )
    "
  >
    <slot />
  </AvatarFallbackPrimitive>
</template>
