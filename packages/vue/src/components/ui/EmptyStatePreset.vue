<script setup lang="ts">
import { computed, type Component } from 'vue'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { emptyStateVariants, iconContainerVariants } from './empty-state-variants'
import {
  Search,
  FileQuestion,
  Inbox,
  FolderOpen,
  Users,
  ShoppingCart,
  Bell,
  Image,
  AlertTriangle,
  WifiOff,
  ShieldX,
  Clock,
  Wrench,
  Upload,
} from 'lucide-vue-next'
import EmptyState from './EmptyState.vue'
import EmptyStateIcon from './EmptyStateIcon.vue'
import EmptyStateIllustration from './EmptyStateIllustration.vue'
import EmptyStateTitle from './EmptyStateTitle.vue'
import EmptyStateDescription from './EmptyStateDescription.vue'
import EmptyStateActions from './EmptyStateActions.vue'

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>
type IconContainerVariants = VariantProps<typeof iconContainerVariants>

export type PresetType =
  | 'no-results'
  | 'no-data'
  | 'empty-inbox'
  | 'empty-folder'
  | 'no-users'
  | 'empty-cart'
  | 'no-notifications'
  | 'no-images'
  | 'error'
  | 'offline'
  | 'permission-denied'
  | 'coming-soon'
  | 'maintenance'
  | 'upload'

interface PresetConfig {
  icon: Component
  title: string
  description: string
  iconColor?: IconContainerVariants['iconColor']
}

const presets: Record<PresetType, PresetConfig> = {
  'no-results': {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  'no-data': {
    icon: FileQuestion,
    title: 'No data available',
    description: 'There\'s nothing to display here yet. Data will appear once available.',
  },
  'empty-inbox': {
    icon: Inbox,
    title: 'Inbox is empty',
    description: 'You\'re all caught up! New messages will appear here.',
  },
  'empty-folder': {
    icon: FolderOpen,
    title: 'Folder is empty',
    description: 'This folder doesn\'t contain any files yet.',
  },
  'no-users': {
    icon: Users,
    title: 'No users found',
    description: 'There are no users matching your criteria.',
  },
  'empty-cart': {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Looks like you haven\'t added anything to your cart yet.',
  },
  'no-notifications': {
    icon: Bell,
    title: 'No notifications',
    description: 'You\'re all caught up! Check back later for updates.',
  },
  'no-images': {
    icon: Image,
    title: 'No images',
    description: 'There are no images to display. Upload some to get started.',
  },
  'error': {
    icon: AlertTriangle,
    title: 'Something went wrong',
    description: 'An error occurred. Please try again or contact support if the problem persists.',
    iconColor: 'destructive',
  },
  'offline': {
    icon: WifiOff,
    title: 'You\'re offline',
    description: 'Please check your internet connection and try again.',
    iconColor: 'warning',
  },
  'permission-denied': {
    icon: ShieldX,
    title: 'Access denied',
    description: 'You don\'t have permission to view this content.',
    iconColor: 'destructive',
  },
  'coming-soon': {
    icon: Clock,
    title: 'Coming soon',
    description: 'This feature is under development. Stay tuned for updates!',
    iconColor: 'accent',
  },
  'maintenance': {
    icon: Wrench,
    title: 'Under maintenance',
    description: 'We\'re performing scheduled maintenance. Please check back soon.',
    iconColor: 'warning',
  },
  'upload': {
    icon: Upload,
    title: 'Upload files',
    description: 'Drag and drop files here, or click to browse.',
    iconColor: 'primary',
  },
}

export interface EmptyStatePresetProps {
  preset: PresetType
  variant?: EmptyStateVariants['variant']
  size?: EmptyStateVariants['size']
  layout?: EmptyStateVariants['layout']
  animation?: EmptyStateVariants['animation']
  iconColor?: IconContainerVariants['iconColor']
  iconSize?: IconContainerVariants['size']
  customTitle?: string
  customDescription?: string
  class?: string
}

const props = withDefaults(defineProps<EmptyStatePresetProps>(), {
  variant: 'default',
  size: 'md',
  layout: 'vertical',
  animation: 'none',
})

const config = computed(() => presets[props.preset])
const finalIconColor = computed(() => props.iconColor ?? config.value.iconColor ?? 'default')

const computedIconSize = computed(() => {
  if (props.iconSize) return props.iconSize
  switch (props.size) {
    case 'compact': return 'sm'
    case 'sm': return 'sm'
    case 'lg': return 'lg'
    default: return 'md'
  }
})

const iconSizeClass = computed(() => {
  const sizes: Record<string, string> = {
    xs: 'h-5 w-5',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  }
  return sizes[computedIconSize.value] || sizes.md
})
</script>

<template>
  <EmptyState
    :variant="variant"
    :size="size"
    :layout="layout"
    :animation="animation"
    :class="props.class"
  >
    <EmptyStateIllustration v-if="$slots.illustration">
      <slot name="illustration" />
    </EmptyStateIllustration>
    <EmptyStateIcon v-else :icon-color="finalIconColor" :size="computedIconSize">
      <slot name="icon">
        <component :is="config.icon" :class="iconSizeClass" />
      </slot>
    </EmptyStateIcon>
    <div :class="cn(layout === 'horizontal' && 'flex flex-col')">
      <EmptyStateTitle>{{ customTitle ?? config.title }}</EmptyStateTitle>
      <EmptyStateDescription>{{ customDescription ?? config.description }}</EmptyStateDescription>
      <EmptyStateActions v-if="$slots.action">
        <slot name="action" />
      </EmptyStateActions>
    </div>
  </EmptyState>
</template>
