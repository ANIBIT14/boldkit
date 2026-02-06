<script setup lang="ts">
import { DialogPortal, DialogOverlay, DialogContent, DialogClose } from 'reka-ui'
import { X } from 'lucide-vue-next'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background border-3 border-foreground p-6 shadow-[8px_8px_0px_hsl(var(--shadow-color))] transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-t-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-b-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-l-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-r-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

type SheetVariants = VariantProps<typeof sheetVariants>

interface Props {
  class?: string
  side?: SheetVariants['side']
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
})
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent :class="cn(sheetVariants({ side: props.side }), props.class)">
      <DialogClose
        class="absolute right-4 top-4 border-2 border-foreground bg-background p-1 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none"
      >
        <X class="h-4 w-4 stroke-[3]" />
        <span class="sr-only">Close</span>
      </DialogClose>
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
