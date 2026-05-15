<script setup lang="ts">
import { inject, computed, type CSSProperties } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { SIDEBAR_INJECTION_KEY, type SidebarContext } from './SidebarProvider.vue'
import Sheet from './Sheet.vue'
import SheetContent from './SheetContent.vue'

const SIDEBAR_WIDTH_MOBILE = '18rem'

const sidebarVariants = cva(
  'relative flex h-full flex-col border-r-3 border-foreground bg-background transition-all duration-300 ease-out',
  {
    variants: {
      collapsible: {
        none: 'w-[var(--sidebar-width)]',
        icon: 'w-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar:w-[var(--sidebar-width-collapsed)]',
        hidden: 'w-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:border-0 group-data-[state=collapsed]/sidebar:overflow-hidden',
      },
      side: {
        left: '',
        right: 'border-r-0 border-l-3',
      },
    },
    defaultVariants: {
      collapsible: 'icon',
      side: 'left',
    },
  }
)

type SidebarVariants = VariantProps<typeof sidebarVariants>

interface SidebarProps {
  side?: SidebarVariants['side']
  collapsible?: SidebarVariants['collapsible']
  class?: string
}

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  collapsible: 'icon',
})

const context = inject<SidebarContext>(SIDEBAR_INJECTION_KEY)
if (!context) {
  throw new Error('Sidebar must be used within a SidebarProvider')
}

const { isMobile, state, openMobile, setOpenMobile } = context

const mobileStyle = computed<CSSProperties>(() => ({
  '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
}))

const handleMobileOpenChange = (value: boolean) => {
  setOpenMobile(value)
}
</script>

<template>
  <!-- Mobile: Sheet drawer -->
  <Sheet
    v-if="isMobile"
    :open="openMobile"
    @update:open="handleMobileOpenChange"
  >
    <SheetContent
      :side="side === 'left' ? 'left' : 'right'"
      class="w-[var(--sidebar-width-mobile)] p-0"
      :style="mobileStyle"
    >
      <div class="flex h-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <!-- Desktop: Regular sidebar -->
  <div
    v-else
    :data-state="state"
    :data-collapsible="collapsible"
    class="group/sidebar hidden md:block"
  >
    <div :class="cn(sidebarVariants({ collapsible, side }), props.class)">
      <slot />
    </div>
  </div>
</template>
