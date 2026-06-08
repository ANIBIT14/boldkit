<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    position?: 'leading' | 'trailing'
  }>(),
  {
    position: 'leading',
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center bg-muted px-3 text-sm font-bold uppercase tracking-wide text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0',
        props.position === 'leading' ? 'border-r-3 border-foreground' : 'border-l-3 border-foreground',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
