<script setup lang="ts">
import { computed, h, type Component } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  Search,
  Database,
  Inbox,
  FolderOpen,
  Users,
  ShoppingCart,
  Bell,
  Image,
} from 'lucide-vue-next'
import EmptyState from './EmptyState.vue'
import EmptyStateIcon from './EmptyStateIcon.vue'
import EmptyStateTitle from './EmptyStateTitle.vue'
import EmptyStateDescription from './EmptyStateDescription.vue'
import EmptyStateActions from './EmptyStateActions.vue'

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/50 rounded-none p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        sm: 'py-6 gap-2',
        md: 'py-8 gap-3',
        lg: 'py-12 gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const iconContainerVariants = cva(
  'flex items-center justify-center rounded-none border-3 border-foreground mb-4',
  {
    variants: {
      iconColor: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted/50 text-muted-foreground border-muted-foreground/50',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      iconColor: 'default',
      size: 'md',
    },
  }
)

type EmptyStateVariants = VariantProps<typeof emptyStateVariants>
type IconContainerVariants = VariantProps<typeof iconContainerVariants>

type PresetType =
  | 'no-results'
  | 'no-data'
  | 'empty-inbox'
  | 'empty-folder'
  | 'no-users'
  | 'empty-cart'
  | 'no-notifications'
  | 'no-images'

interface PresetConfig {
  icon: Component
  title: string
  description: string
}

const presets: Record<PresetType, PresetConfig> = {
  'no-results': {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  'no-data': {
    icon: Database,
    title: 'No data yet',
    description: 'Get started by adding your first item.',
  },
  'empty-inbox': {
    icon: Inbox,
    title: 'Your inbox is empty',
    description: 'Messages you receive will appear here.',
  },
  'empty-folder': {
    icon: FolderOpen,
    title: 'This folder is empty',
    description: 'Upload files or create new content to fill this space.',
  },
  'no-users': {
    icon: Users,
    title: 'No users found',
    description: 'Invite team members to collaborate.',
  },
  'empty-cart': {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Browse our products and add items to your cart.',
  },
  'no-notifications': {
    icon: Bell,
    title: 'All caught up!',
    description: 'You have no new notifications.',
  },
  'no-images': {
    icon: Image,
    title: 'No images yet',
    description: 'Upload images to display them here.',
  },
}

interface EmptyStatePresetProps {
  preset: PresetType
  variant?: EmptyStateVariants['variant']
  size?: EmptyStateVariants['size']
  iconColor?: IconContainerVariants['iconColor']
  class?: string
}

const props = withDefaults(defineProps<EmptyStatePresetProps>(), {
  variant: 'default',
  size: 'md',
  iconColor: 'default',
})

const config = computed(() => presets[props.preset])

const iconSizeClass = computed(() => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }
  return sizes[props.size || 'md']
})
</script>

<template>
  <EmptyState :variant="variant" :size="size" :class="props.class">
    <EmptyStateIcon :icon-color="iconColor" :size="size">
      <component :is="config.icon" :class="iconSizeClass" />
    </EmptyStateIcon>
    <EmptyStateTitle>{{ config.title }}</EmptyStateTitle>
    <EmptyStateDescription>{{ config.description }}</EmptyStateDescription>
    <EmptyStateActions v-if="$slots.action">
      <slot name="action" />
    </EmptyStateActions>
  </EmptyState>
</template>
