import * as React from 'react'
import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * Trace — the steps an agent takes inside one turn: reasoning, tool calls,
 * sources, plans, subagent runs. Each step is a TraceLine (icon + title +
 * optional description) that can sit alone, inside a link/button, or inside a
 * TraceCollapsibleTrigger to expand into detail — including nested Traces.
 *
 * Status mirrors Marker's `status` variant: the icon box fills with accent
 * and the title shimmers while `running`, fills destructive on `error`, and
 * goes dashed + faded while `pending`.
 */

export type TraceStatus = 'running' | 'error' | 'pending'

// `.bk-shimmer` is plain CSS, not a Tailwind utility, so TraceTitle can't
// pick it up through a group variant — it reads the line's status instead.
const TraceLineStatusContext = React.createContext<TraceStatus | undefined>(undefined)

const Trace = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="trace"
      className={cn(
        'flex w-full min-w-0 flex-col gap-1.5 text-sm',
        // A link or button wrapping a line shrinks to the line, not the row.
        '*:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:text-left',
        className
      )}
      {...props}
    />
  )
)
Trace.displayName = 'Trace'

export interface TraceLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: TraceStatus
}

const TraceLine = React.forwardRef<HTMLSpanElement, TraceLineProps>(
  ({ className, status, ...props }, ref) => (
    <TraceLineStatusContext.Provider value={status}>
      <span
        ref={ref}
        data-slot="trace-line"
        data-status={status}
        aria-busy={status === 'running' || undefined}
        className={cn(
          'group/trace-line flex w-fit min-w-0 max-w-full items-center gap-2 font-bold text-muted-foreground transition-colors duration-150',
          'in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground',
          'data-[status=running]:text-foreground data-[status=error]:text-destructive data-[status=pending]:opacity-60',
          className
        )}
        {...props}
      />
    </TraceLineStatusContext.Provider>
  )
)
TraceLine.displayName = 'TraceLine'

const TraceIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        'flex size-6 shrink-0 items-center justify-center border-2 border-foreground bg-background text-foreground transition-colors duration-150 [&_svg]:pointer-events-none [&_svg]:size-3.5',
        'group-data-[status=running]/trace-line:bg-accent group-data-[status=running]/trace-line:text-accent-foreground',
        'group-data-[status=error]/trace-line:bg-destructive group-data-[status=error]/trace-line:text-destructive-foreground',
        'group-data-[status=pending]/trace-line:border-dashed',
        className
      )}
      {...props}
    />
  )
)
TraceIcon.displayName = 'TraceIcon'

const TraceTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const status = React.useContext(TraceLineStatusContext)
    return (
      <span
        ref={ref}
        data-slot="trace-title"
        className={cn('min-w-0 truncate', status === 'running' && 'bk-shimmer', className)}
        {...props}
      />
    )
  }
)
TraceTitle.displayName = 'TraceTitle'

const TraceDescription = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="trace-description"
      className={cn(
        'shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground tabular-nums',
        className
      )}
      {...props}
    />
  )
)
TraceDescription.displayName = 'TraceDescription'

const TraceCollapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    data-slot="trace-collapsible"
    className={cn('flex w-full min-w-0 flex-col', className)}
    {...props}
  />
))
TraceCollapsible.displayName = 'TraceCollapsible'

const TraceCollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  Omit<React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>, 'asChild'>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    data-slot="trace-collapsible-trigger"
    className={cn(
      'group/trace-trigger flex w-fit min-w-0 max-w-full cursor-pointer items-center gap-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&:hover_[data-slot=trace-line]]:text-foreground',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight
      aria-hidden="true"
      strokeWidth={3}
      className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 ease-[var(--bk-ease-snap)] group-data-[state=open]/trace-trigger:rotate-90"
    />
  </CollapsiblePrimitive.Trigger>
))
TraceCollapsibleTrigger.displayName = 'TraceCollapsibleTrigger'

const TraceCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  Omit<React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>, 'asChild'>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    data-slot="trace-collapsible-content"
    className="min-w-0 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
    {...props}
  >
    {/* The rail lines up under the 24px icon box: 11px in, 3px wide. */}
    <div
      data-slot="trace-collapsible-content-inner"
      className={cn(
        'ml-[11px] mt-1.5 min-w-0 break-words border-l-3 border-foreground pb-1 pl-4 text-muted-foreground',
        className
      )}
    >
      {children}
    </div>
  </CollapsiblePrimitive.Content>
))
TraceCollapsibleContent.displayName = 'TraceCollapsibleContent'

export {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
}
