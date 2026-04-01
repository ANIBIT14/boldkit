import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  FileQuestion,
  Search,
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
} from 'lucide-react'

// ============================================================================
// Empty State Root
// ============================================================================

const emptyStateVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-muted/30 border-3 border-dashed border-foreground p-8',
        card: 'bg-card border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] p-8',
      },
      size: {
        compact: 'gap-2 p-2',
        sm: 'gap-3 p-4',
        md: 'gap-4 p-6',
        lg: 'gap-6 p-8',
      },
      layout: {
        vertical: 'flex-col text-center',
        horizontal: 'flex-row text-left',
      },
      animation: {
        none: '',
        fadeIn: 'animate-[fadeIn_0.3s_ease-out]',
        bounce: 'animate-[bounceIn_0.5s_ease-out]',
        scale: 'animate-[scaleIn_0.3s_ease-out]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      layout: 'vertical',
      animation: 'none',
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, layout, animation, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size, layout, animation }), className)}
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
        xs: 'w-10 h-10',
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24',
      },
      iconColor: {
        default: 'bg-muted text-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        warning: 'bg-warning text-warning-foreground',
        success: 'bg-success text-success-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      iconColor: 'default',
    },
  }
)

const iconSizeMap = {
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
}

export interface EmptyStateIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {
  /** Custom icon size independent of container */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ className, size, iconColor, iconSize, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(iconContainerVariants({ size, iconColor }), className)}
        {...props}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ className?: string }>, {
              className: cn(
                iconSizeMap[iconSize ?? size ?? 'md'],
                (children as React.ReactElement<{ className?: string }>).props.className
              ),
            })
          : children}
      </div>
    )
  }
)
EmptyStateIcon.displayName = 'EmptyStateIcon'

// ============================================================================
// Empty State Illustration (for custom SVGs/images)
// ============================================================================

export interface EmptyStateIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width for the illustration */
  maxWidth?: string | number
}

const EmptyStateIllustration = React.forwardRef<HTMLDivElement, EmptyStateIllustrationProps>(
  ({ className, maxWidth = '200px', children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        style={{ maxWidth, ...style }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
EmptyStateIllustration.displayName = 'EmptyStateIllustration'

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
  // New presets
  | 'error'
  | 'offline'
  | 'permission-denied'
  | 'coming-soon'
  | 'maintenance'
  | 'upload'

interface PresetConfig {
  icon: React.ReactNode
  title: string
  description: string
  iconColor?: VariantProps<typeof iconContainerVariants>['iconColor']
}

const presetConfig: Record<EmptyStatePresetType, PresetConfig> = {
  'no-results': {
    icon: <Search />,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  'no-data': {
    icon: <FileQuestion />,
    title: 'No data available',
    description: 'There\'s nothing to display here yet. Data will appear once available.',
  },
  'empty-inbox': {
    icon: <Inbox />,
    title: 'Inbox is empty',
    description: 'You\'re all caught up! New messages will appear here.',
  },
  'empty-folder': {
    icon: <FolderOpen />,
    title: 'Folder is empty',
    description: 'This folder doesn\'t contain any files yet.',
  },
  'no-users': {
    icon: <Users />,
    title: 'No users found',
    description: 'There are no users matching your criteria.',
  },
  'empty-cart': {
    icon: <ShoppingCart />,
    title: 'Your cart is empty',
    description: 'Looks like you haven\'t added anything to your cart yet.',
  },
  'no-notifications': {
    icon: <Bell />,
    title: 'No notifications',
    description: 'You\'re all caught up! Check back later for updates.',
  },
  'no-images': {
    icon: <Image />,
    title: 'No images',
    description: 'There are no images to display. Upload some to get started.',
  },
  // New presets
  'error': {
    icon: <AlertTriangle />,
    title: 'Something went wrong',
    description: 'An error occurred. Please try again or contact support if the problem persists.',
    iconColor: 'destructive',
  },
  'offline': {
    icon: <WifiOff />,
    title: 'You\'re offline',
    description: 'Please check your internet connection and try again.',
    iconColor: 'warning',
  },
  'permission-denied': {
    icon: <ShieldX />,
    title: 'Access denied',
    description: 'You don\'t have permission to view this content.',
    iconColor: 'destructive',
  },
  'coming-soon': {
    icon: <Clock />,
    title: 'Coming soon',
    description: 'This feature is under development. Stay tuned for updates!',
    iconColor: 'accent',
  },
  'maintenance': {
    icon: <Wrench />,
    title: 'Under maintenance',
    description: 'We\'re performing scheduled maintenance. Please check back soon.',
    iconColor: 'warning',
  },
  'upload': {
    icon: <Upload />,
    title: 'Upload files',
    description: 'Drag and drop files here, or click to browse.',
    iconColor: 'primary',
  },
}

export interface EmptyStatePresetProps
  extends Omit<EmptyStateProps, 'children'>,
    Omit<VariantProps<typeof iconContainerVariants>, 'size'> {
  preset: EmptyStatePresetType
  action?: React.ReactNode
  customTitle?: string
  customDescription?: string
  /** Custom icon to override the preset icon */
  customIcon?: React.ReactNode
  /** Custom illustration (overrides icon completely) */
  illustration?: React.ReactNode
  /** Icon container size */
  iconSize?: VariantProps<typeof iconContainerVariants>['size']
}

const EmptyStatePreset = React.forwardRef<HTMLDivElement, EmptyStatePresetProps>(
  (
    {
      preset,
      action,
      customTitle,
      customDescription,
      customIcon,
      illustration,
      iconColor,
      iconSize,
      size,
      layout,
      variant,
      animation,
      className,
      ...props
    },
    ref
  ) => {
    const config = presetConfig[preset]
    const finalIconColor = iconColor ?? config.iconColor ?? 'default'

    return (
      <EmptyState
        ref={ref}
        variant={variant}
        size={size}
        layout={layout}
        animation={animation}
        className={className}
        {...props}
      >
        {illustration ? (
          <EmptyStateIllustration>{illustration}</EmptyStateIllustration>
        ) : (
          <EmptyStateIcon iconColor={finalIconColor} size={iconSize ?? (size === 'compact' ? 'sm' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md')}>
            {customIcon ?? config.icon}
          </EmptyStateIcon>
        )}
        <div className={cn(layout === 'horizontal' && 'flex flex-col')}>
          <EmptyStateTitle>{customTitle ?? config.title}</EmptyStateTitle>
          <EmptyStateDescription>{customDescription ?? config.description}</EmptyStateDescription>
          {action && <EmptyStateActions>{action}</EmptyStateActions>}
        </div>
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
  EmptyStateIllustration,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  EmptyStatePreset,
  emptyStateVariants,
  iconContainerVariants,
}
