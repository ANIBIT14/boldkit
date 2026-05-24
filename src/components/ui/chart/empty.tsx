import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChartEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode
}

const ChartEmpty = React.forwardRef<HTMLDivElement, ChartEmptyProps>(
  ({ message = 'No data', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'flex min-h-[120px] w-full items-center justify-center border-3 border-dashed border-foreground/40 bg-muted/20 p-6 text-xs font-bold uppercase tracking-wide text-muted-foreground',
          className
        )}
        {...props}
      >
        {message}
      </div>
    )
  }
)
ChartEmpty.displayName = 'ChartEmpty'

export { ChartEmpty }
