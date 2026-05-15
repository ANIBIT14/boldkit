<script setup lang="ts">
import { inject, computed } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { SIDEBAR_INJECTION_KEY, type SidebarContext } from './SidebarProvider.vue'
import Button from './Button.vue'

interface SidebarToggleProps {
  class?: string
}

const props = defineProps<SidebarToggleProps>()

const context = inject<SidebarContext>(SIDEBAR_INJECTION_KEY)
if (!context) {
  throw new Error('SidebarToggle must be used within a SidebarProvider')
}

const { toggleSidebar, state } = context

const isCollapsed = computed(() => state.value === 'collapsed')
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    :class="cn('h-8 w-8 transition-transform duration-300', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft
      :class="cn(
        'h-4 w-4 transition-transform duration-300',
        isCollapsed && 'rotate-180'
      )"
    />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
