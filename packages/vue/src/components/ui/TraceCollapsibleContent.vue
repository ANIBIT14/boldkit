<script setup lang="ts">
import { CollapsibleContent } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    class="min-w-0 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
  >
    <!-- The rail lines up under the 24px icon box: 11px in, 3px wide. -->
    <div
      data-slot="trace-collapsible-content-inner"
      :class="
        cn(
          'ml-[11px] mt-1.5 min-w-0 break-words border-l-3 border-foreground pb-1 pl-4 text-muted-foreground',
          props.class
        )
      "
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
