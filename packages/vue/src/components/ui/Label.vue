<script setup lang="ts">
import { Label as LabelPrimitive, type LabelProps } from 'reka-ui'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <LabelPrimitive v-bind="props" :class="cn(labelVariants(), props.class)">
    <slot />
  </LabelPrimitive>
</template>
