<script setup lang="ts">
import { CollapsibleTrigger } from 'reka-ui'
import { ChevronRight } from '@lucide/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    :class="
      cn(
        'group/trace-trigger flex w-fit min-w-0 max-w-full cursor-pointer items-center gap-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&:hover_[data-slot=trace-line]]:text-foreground',
        props.class
      )
    "
  >
    <slot />
    <ChevronRight
      aria-hidden="true"
      :stroke-width="3"
      class="size-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-[var(--bk-ease-snap)] group-data-[state=open]/trace-trigger:rotate-90"
    />
  </CollapsibleTrigger>
</template>
