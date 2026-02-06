<script setup lang="ts">
import { AlertDialogCancel as AlertDialogCancelPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AlertDialogCancelPrimitive :class="cn(buttonVariants({ variant: 'outline' }), $props.class)">
    <slot />
  </AlertDialogCancelPrimitive>
</template>
