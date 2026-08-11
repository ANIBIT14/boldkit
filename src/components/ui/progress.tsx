import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

type ProgressVariant =
  /** Continuous fill. The pre-v3.5 default. */
  | 'smooth'
  /** Fill snaps forward in ten discrete notches. */
  | 'stepped'
  /** Indeterminate — a block travelling the track. Ignores `value`. */
  | 'marquee'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: ProgressVariant
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = 'smooth', max = 100, ...props }, ref) => {
  const indeterminate = variant === 'marquee'
  // Clamp against `max`, not a hard 100 — otherwise a max of 200 renders a full
  // bar while aria-valuenow reports half. Percent drives the fill; the raw
  // clamped value is what Radix exposes to AT.
  const safeMax = max > 0 ? max : 100
  const clampedValue = Math.max(0, Math.min(safeMax, value ?? 0))
  const percent = (clampedValue / safeMax) * 100
  // Radix reads null as indeterminate and drops aria-valuenow. Pass the clamped
  // value so an out-of-range `value` can't trip Radix's range warning, and keep
  // an omitted value indeterminate the way it was before v3.5.
  const ariaValue = indeterminate || value == null ? null : clampedValue
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={ariaValue}
      max={safeMax}
      className={cn(
        'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-primary transition duration-500 ease-out',
          variant === 'stepped' && 'bk-progress-stepped',
          indeterminate && 'bk-progress-marquee'
        )}
        style={
          indeterminate ? undefined : { transform: `translateX(-${100 - percent}%)` }
        }
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
export type { ProgressVariant }
