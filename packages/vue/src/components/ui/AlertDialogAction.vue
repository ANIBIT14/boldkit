<script setup lang="ts">
import { AlertDialogAction as AlertDialogActionPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'

defineProps<{
  class?: string
}>()
</script>

<template>
  <AlertDialogActionPrimitive :class="cn(buttonVariants(), $props.class)">
    <slot />
  </AlertDialogActionPrimitive>
</template>
