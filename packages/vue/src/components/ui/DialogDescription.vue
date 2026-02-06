<script setup lang="ts">
import { DialogDescription as DialogDescriptionPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DialogDescriptionPrimitive :class="cn('text-sm text-muted-foreground', $props.class)">
    <slot />
  </DialogDescriptionPrimitive>
</template>
