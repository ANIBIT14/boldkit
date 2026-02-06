<script setup lang="ts">
import { AlertDialogDescription as AlertDialogDescriptionPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AlertDialogDescriptionPrimitive :class="cn('text-sm text-muted-foreground', $props.class)">
    <slot />
  </AlertDialogDescriptionPrimitive>
</template>
