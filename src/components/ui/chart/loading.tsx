import * as React from 'react'
import { cn } from '@/lib/utils'

/** Static silhouette — a chart-shaped placeholder, not real data. */
const BAR_HEIGHTS = ['45%', '70%', '35%', '85%', '55%', '75%', '40%']

export interface ChartLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Announced to screen readers while the chart is pending. */
  label?: string
  /** Number of placeholder bars. Defaults to 7. */
  bars?: number
}

const ChartLoading = React.forwardRef<HTMLDivElement, ChartLoadingProps>(
  ({ label = 'Loading chart', bars = BAR_HEIGHTS.length, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={cn(
          'flex min-h-[120px] w-full items-end justify-center gap-2 p-6',
          className
        )}
        {...props}
      >
        <span className="sr-only">{label}</span>
        {Array.from({ length: bars }, (_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="bk-skeleton-stamp w-full max-w-10 border-2 border-foreground/20 bg-muted"
            style={{
              height: BAR_HEIGHTS[i % BAR_HEIGHTS.length],
              animationDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>
    )
  }
)
ChartLoading.displayName = 'ChartLoading'

export { ChartLoading }
