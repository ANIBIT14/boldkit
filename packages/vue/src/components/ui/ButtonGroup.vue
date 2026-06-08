<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    orientation: 'horizontal',
  }
)
</script>

<template>
  <div
    role="group"
    :class="
      cn(
        'inline-flex shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        '[&>*]:shadow-none [&>*]:hover:translate-x-0 [&>*]:hover:translate-y-0 [&>*]:active:translate-x-0 [&>*]:active:translate-y-0',
        props.orientation === 'horizontal'
          ? '[&>*:not(:first-child)]:ml-[-3px]'
          : 'flex-col [&>*:not(:first-child)]:mt-[-3px]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
