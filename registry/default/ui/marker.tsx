import * as React from 'react'
import { cn } from '@/lib/utils'

/*
 * Marker — inline status rows inside the conversation log:
 *   note      — a system note ("ADA JOINED THE CHAT")
 *   separator — a labeled rule ("TODAY")
 *   status    — live activity ("SEARCHING THE WEB…"); `active` adds the
 *               `.bk-shimmer` text effect while the work is in flight.
 *
 * No live-region role of its own: inside MessageScroller the surrounding
 * role="log" already announces it, and a nested live region double-announces.
 */

export type MarkerVariant = 'note' | 'separator' | 'status'

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MarkerVariant
  /** Streaming / tool activity in progress — shimmers the label. */
  active?: boolean
  icon?: React.ReactNode
}

const Marker = React.forwardRef<HTMLDivElement, MarkerProps>(
  ({ className, variant = 'note', active = false, icon, children, ...props }, ref) => {
    const label = (
      <span data-slot="marker-label" className={cn(active && 'bk-shimmer')}>
        {children}
      </span>
    )
    const iconNode = icon != null && (
      <span aria-hidden="true" className="flex shrink-0 items-center [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </span>
    )

    return (
      <div
        ref={ref}
        data-slot="marker"
        data-variant={variant}
        data-active={active}
        className={cn(
          'flex w-full items-center text-xs font-bold uppercase tracking-widest',
          variant === 'note' && 'justify-center',
          variant === 'separator' && 'gap-3',
          variant === 'status' && 'gap-2',
          className
        )}
        {...props}
      >
        {variant === 'separator' ? (
          <>
            <span aria-hidden="true" className="h-[3px] flex-1 bg-foreground" />
            <span className="inline-flex items-center gap-2 border-3 border-foreground bg-background px-2 py-0.5 shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
              {iconNode}
              {label}
            </span>
            <span aria-hidden="true" className="h-[3px] flex-1 bg-foreground" />
          </>
        ) : variant === 'status' ? (
          <>
            {iconNode && (
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center border-2 border-foreground',
                  active ? 'bg-accent text-accent-foreground' : 'bg-background'
                )}
              >
                {iconNode}
              </span>
            )}
            {label}
          </>
        ) : (
          <span className="inline-flex items-center gap-2 border-2 border-dashed border-foreground bg-muted px-3 py-1 text-foreground">
            {iconNode}
            {label}
          </span>
        )}
      </div>
    )
  }
)
Marker.displayName = 'Marker'

export { Marker }
