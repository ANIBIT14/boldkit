import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { FileQuestion, Search, Inbox, FolderOpen, Users, ShoppingCart, Bell, Image } from 'lucide-react'

// ============================================================================
// Empty State Root
// ============================================================================

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/30 border-3 border-dashed border-foreground p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        sm: 'gap-3 p-4',
        md: 'gap-4 p-6',
        lg: 'gap-6 p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
EmptyState.displayName = 'EmptyState'

// ============================================================================
// Empty State Icon
// ============================================================================

const iconContainerVariants = cva(
  'flex items-center justify-center border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]',
  {
    variants: {
      size: {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
      },
      iconColor: {
        default: 'bg-muted text-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      iconColor: 'default',
    },
  }
)

export interface EmptyStateIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {}

const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ className, size, iconColor, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(iconContainerVariants({ size, iconColor }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
EmptyStateIcon.displayName = 'EmptyStateIcon'

// ============================================================================
// Empty State Title
// ============================================================================

export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('font-black text-lg uppercase tracking-wide', className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)
EmptyStateTitle.displayName = 'EmptyStateTitle'

// ============================================================================
// Empty State Description
// ============================================================================

export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const EmptyStateDescription = React.forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-muted-foreground font-medium max-w-sm', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
EmptyStateDescription.displayName = 'EmptyStateDescription'

// ============================================================================
// Empty State Actions
// ============================================================================

export interface EmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyStateActions = React.forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center justify-center gap-2 mt-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
EmptyStateActions.displayName = 'EmptyStateActions'

// ============================================================================
// Presets
// ============================================================================

export type EmptyStatePresetType =
  | 'no-results'
  | 'no-data'
  | 'empty-inbox'
  | 'empty-folder'
  | 'no-users'
  | 'empty-cart'
  | 'no-notifications'
  | 'no-images'

const presetConfig: Record<EmptyStatePresetType, { icon: React.ReactNode; title: string; description: string }> = {
  'no-results': {
    icon: <Search className="h-8 w-8" />,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  'no-data': {
    icon: <FileQuestion className="h-8 w-8" />,
    title: 'No data available',
    description: 'There\'s nothing to display here yet. Data will appear once available.',
  },
  'empty-inbox': {
    icon: <Inbox className="h-8 w-8" />,
    title: 'Inbox is empty',
    description: 'You\'re all caught up! New messages will appear here.',
  },
  'empty-folder': {
    icon: <FolderOpen className="h-8 w-8" />,
    title: 'Folder is empty',
    description: 'This folder doesn\'t contain any files yet.',
  },
  'no-users': {
    icon: <Users className="h-8 w-8" />,
    title: 'No users found',
    description: 'There are no users matching your criteria.',
  },
  'empty-cart': {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: 'Your cart is empty',
    description: 'Looks like you haven\'t added anything to your cart yet.',
  },
  'no-notifications': {
    icon: <Bell className="h-8 w-8" />,
    title: 'No notifications',
    description: 'You\'re all caught up! Check back later for updates.',
  },
  'no-images': {
    icon: <Image className="h-8 w-8" />,
    title: 'No images',
    description: 'There are no images to display. Upload some to get started.',
  },
}

export interface EmptyStatePresetProps
  extends Omit<EmptyStateProps, 'children'>,
    VariantProps<typeof iconContainerVariants> {
  preset: EmptyStatePresetType
  action?: React.ReactNode
  customTitle?: string
  customDescription?: string
}

const EmptyStatePreset = React.forwardRef<HTMLDivElement, EmptyStatePresetProps>(
  ({ preset, action, customTitle, customDescription, iconColor, size, variant, className, ...props }, ref) => {
    const config = presetConfig[preset]

    return (
      <EmptyState ref={ref} variant={variant} size={size} className={className} {...props}>
        <EmptyStateIcon iconColor={iconColor} size={size}>
          {config.icon}
        </EmptyStateIcon>
        <EmptyStateTitle>{customTitle ?? config.title}</EmptyStateTitle>
        <EmptyStateDescription>{customDescription ?? config.description}</EmptyStateDescription>
        {action && <EmptyStateActions>{action}</EmptyStateActions>}
      </EmptyState>
    )
  }
)
EmptyStatePreset.displayName = 'EmptyStatePreset'

// ============================================================================
// Exports
// ============================================================================

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  EmptyStatePreset,
  emptyStateVariants,
  iconContainerVariants,
}
