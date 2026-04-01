import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Timeline Context
interface TimelineContextValue {
  orientation: 'vertical' | 'horizontal'
}

const TimelineContext = React.createContext<TimelineContextValue>({
  orientation: 'vertical',
})

function useTimeline() {
  return React.useContext(TimelineContext)
}

// Timeline Root
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ orientation = 'vertical', className, children, ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ orientation }}>
        <div
          ref={ref}
          className={cn(
            'relative',
            orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    )
  }
)
Timeline.displayName = 'Timeline'

// Timeline Item
const timelineItemVariants = cva('relative flex')

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'completed' | 'current' | 'upcoming'
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ status, className, children, ...props }, ref) => {
    const { orientation } = useTimeline()

    return (
      <div
        ref={ref}
        data-status={status}
        className={cn(
          timelineItemVariants(),
          orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col gap-4 items-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineItem.displayName = 'TimelineItem'

// Timeline Dot
const timelineDotVariants = cva(
  'relative z-10 flex items-center justify-center border-3 border-foreground transition-all duration-200',
  {
    variants: {
      status: {
        completed:
          'bg-success shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        current:
          'bg-primary shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted',
      },
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
)

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ status, size, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineDotVariants({ status, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineDot.displayName = 'TimelineDot'

// Timeline Connector
const timelineConnectorVariants = cva('transition-all duration-200', {
  variants: {
    status: {
      completed: 'bg-foreground',
      current: 'bg-foreground',
      upcoming: 'border-dashed border-2 border-foreground/50 bg-transparent',
    },
    orientation: {
      vertical: 'w-[3px] min-h-8 ml-[14px]',
      horizontal: 'h-[3px] min-w-8 mt-[14px]',
    },
  },
  defaultVariants: {
    status: 'upcoming',
    orientation: 'vertical',
  },
})

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof timelineConnectorVariants>, 'orientation'> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ status, className, ...props }, ref) => {
    const { orientation } = useTimeline()

    return (
      <div
        ref={ref}
        className={cn(
          timelineConnectorVariants({ status, orientation }),
          className
        )}
        {...props}
      />
    )
  }
)
TimelineConnector.displayName = 'TimelineConnector'

// Timeline Content
const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useTimeline()

  return (
    <div
      ref={ref}
      className={cn(
        'flex-1',
        orientation === 'vertical' ? 'pb-8' : 'pr-8',
        className
      )}
      {...props}
    />
  )
})
TimelineContent.displayName = 'TimelineContent'

// Timeline Header
const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
})
TimelineHeader.displayName = 'TimelineHeader'

// Timeline Title
const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-base font-bold uppercase tracking-wide',
        className
      )}
      {...props}
    />
  )
})
TimelineTitle.displayName = 'TimelineTitle'

// Timeline Description
const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground mt-1', className)}
      {...props}
    />
  )
})
TimelineDescription.displayName = 'TimelineDescription'

// Timeline Time
const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => {
  return (
    <time
      ref={ref}
      className={cn(
        'text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
})
TimelineTime.displayName = 'TimelineTime'

// Timeline Card - convenience wrapper
const TimelineCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-3 border-foreground bg-card p-4',
        'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    />
  )
})
TimelineCard.displayName = 'TimelineCard'

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineCard,
  timelineItemVariants,
  timelineDotVariants,
  timelineConnectorVariants,
}
