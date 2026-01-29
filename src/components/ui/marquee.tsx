import * as React from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to display in the marquee */
  children: React.ReactNode
  /** Direction of the marquee animation */
  direction?: 'left' | 'right'
  /** Speed of the animation: 'slow' | 'normal' | 'fast' */
  speed?: 'slow' | 'normal' | 'fast'
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Show neubrutalism border styling */
  bordered?: boolean
  /** Number of times to repeat the content (for seamless loop) */
  repeat?: number
}

const speedClasses = {
  slow: 'animate-marquee-slow',
  normal: 'animate-marquee',
  fast: 'animate-marquee-fast',
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = 'left',
      speed = 'normal',
      pauseOnHover = true,
      bordered = true,
      repeat = 4,
      ...props
    },
    ref
  ) => {
    const animationClass = direction === 'right' ? 'animate-marquee-reverse' : speedClasses[speed]

    return (
      <div
        ref={ref}
        className={cn(
          'flex overflow-hidden',
          bordered && 'border-3 border-foreground bg-background',
          pauseOnHover && '[&:hover_.marquee-content]:pause',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'marquee-content flex shrink-0 items-center gap-8 py-3',
            animationClass,
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
        <div
          className={cn(
            'marquee-content flex shrink-0 items-center gap-8 py-3',
            animationClass,
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{
            animationDirection: direction === 'right' ? 'reverse' : 'normal',
          }}
          aria-hidden="true"
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = 'Marquee'

interface MarqueeItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const MarqueeItem = React.forwardRef<HTMLSpanElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide',
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeItem.displayName = 'MarqueeItem'

interface MarqueeSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Separator character or element */
  children?: React.ReactNode
}

const MarqueeSeparator = React.forwardRef<HTMLSpanElement, MarqueeSeparatorProps>(
  ({ className, children = '/', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-2xl font-black text-muted-foreground', className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeSeparator.displayName = 'MarqueeSeparator'

export { Marquee, MarqueeItem, MarqueeSeparator }
