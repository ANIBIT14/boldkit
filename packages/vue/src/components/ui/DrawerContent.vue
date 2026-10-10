<script setup lang="ts">
import { DrawerPortal, DrawerOverlay, DrawerContent as DrawerContentPrimitive, type DrawerContentProps, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// Reka's Drawer is headless: it reports the drag through
// --drawer-swipe-movement-{x,y} and the side through data-swipe-direction,
// so position, the slide and the follow-the-finger transform all live here.
const props = defineProps<DrawerContentProps & { class?: string }>()
const delegated = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay
      class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
    />
    <DrawerContentPrimitive
      v-bind="forwarded"
      :class="
        cn(
          'group/drawer fixed z-50 flex flex-col border-foreground bg-background outline-none',
          'translate-x-[var(--drawer-swipe-movement-x,0px)] translate-y-[var(--drawer-swipe-movement-y,0px)] transition-transform duration-300 ease-[var(--ease-out,cubic-bezier(0.32,0.72,0,1))] data-[swiping]:duration-0',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-300 data-[state=closed]:duration-200',
          'data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[85vh] data-[swipe-direction=down]:border-3 data-[swipe-direction=down]:border-b-0 data-[swipe-direction=down]:shadow-[0px_-8px_0px_hsl(var(--shadow-color))] data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom',
          'data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[85vh] data-[swipe-direction=up]:border-3 data-[swipe-direction=up]:border-t-0 data-[swipe-direction=up]:shadow-[0px_8px_0px_hsl(var(--shadow-color))] data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top',
          'data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:sm:max-w-sm data-[swipe-direction=left]:border-3 data-[swipe-direction=left]:border-l-0 data-[swipe-direction=left]:shadow-[8px_0px_0px_hsl(var(--shadow-color))] data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left',
          'data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:sm:max-w-sm data-[swipe-direction=right]:border-3 data-[swipe-direction=right]:border-r-0 data-[swipe-direction=right]:shadow-[-8px_0px_0px_hsl(var(--shadow-color))] data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right',
          props.class,
        )
      "
    >
      <div
        aria-hidden="true"
        class="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 bg-foreground group-data-[swipe-direction=down]/drawer:block"
      />
      <slot />
    </DrawerContentPrimitive>
  </DrawerPortal>
</template>
