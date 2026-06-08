<script setup lang="ts">
import { computed } from 'vue'
import { GripVertical } from 'lucide-vue-next'
import { SplitterResizeHandle, type SplitterResizeHandleProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  SplitterResizeHandleProps & { withHandle?: boolean; class?: string }
>()

// Strip wrapper-only props so they don't leak onto the Splitter DOM node.
const delegatedProps = computed(() => {
  const { withHandle: _withHandle, class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <SplitterResizeHandle
    v-bind="delegatedProps"
    :class="
      cn(
        'relative flex w-[3px] items-center justify-center bg-foreground after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-[3px] data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90 data-[orientation=vertical]:h-[3px] data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-2 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90',
        props.class
      )
    "
  >
    <div
      v-if="props.withHandle"
      class="z-10 flex h-6 w-3 items-center justify-center border-3 border-foreground bg-background shadow-[2px_2px_0px_hsl(var(--shadow-color))]"
    >
      <GripVertical class="h-2.5 w-2.5 stroke-[3]" />
    </div>
  </SplitterResizeHandle>
</template>
