<script setup lang="ts">
import { inject, computed, useSlots } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { SIDEBAR_INJECTION_KEY, type SidebarContext } from './SidebarProvider.vue'
import Tooltip from './Tooltip.vue'
import TooltipTrigger from './TooltipTrigger.vue'
import TooltipContent from './TooltipContent.vue'

const sidebarItemVariants = cva(
  'flex w-full items-center gap-3 px-3 py-2 text-sm transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        active: 'bg-accent shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type SidebarItemVariants = VariantProps<typeof sidebarItemVariants>

interface SidebarItemProps {
  variant?: SidebarItemVariants['variant']
  tooltip?: string
  class?: string
}

const props = withDefaults(defineProps<SidebarItemProps>(), {
  variant: 'default',
})

const slots = useSlots()

const context = inject<SidebarContext>(SIDEBAR_INJECTION_KEY)
const isCollapsed = computed(() => context?.state.value === 'collapsed')

const buttonClasses = computed(() =>
  cn(
    sidebarItemVariants({ variant: props.variant }),
    isCollapsed.value && 'justify-center px-2',
    props.class
  )
)
</script>

<template>
  <!-- With Tooltip when collapsed -->
  <Tooltip v-if="isCollapsed && tooltip">
    <TooltipTrigger>
      <button :class="buttonClasses">
        <span v-if="slots.icon" class="shrink-0">
          <slot name="icon" />
        </span>
      </button>
    </TooltipTrigger>
    <TooltipContent side="right">
      {{ tooltip }}
    </TooltipContent>
  </Tooltip>

  <!-- Without Tooltip -->
  <button v-else :class="buttonClasses">
    <span v-if="slots.icon" class="shrink-0">
      <slot name="icon" />
    </span>
    <span v-if="!isCollapsed" class="truncate">
      <slot />
    </span>
  </button>
</template>
