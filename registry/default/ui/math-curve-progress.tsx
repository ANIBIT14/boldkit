import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  buildPath,
  getPoint,
  getAngle,
  type ProgressCurveKey,
} from '@/lib/math-curves'

const mathCurveProgressVariants = cva('', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface MathCurveProgressProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveProgressVariants> {
  value: number
  curve?: ProgressCurveKey
  showValue?: boolean
  trackColor?: string
  fillColor?: string
  strokeWidth?: number
  label?: string
}

const MathCurveProgress = React.forwardRef<SVGSVGElement, MathCurveProgressProps>(
  (
    {
      className,
      size,
      value,
      curve = 'spiral',
      showValue = false,
      trackColor,
      fillColor,
      strokeWidth = 4,
      label = 'Progress',
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const progress = clampedValue / 100

    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])
    const headPoint = getPoint(curve, progress)
    const headAngle = getAngle(curve, progress)
    const HEAD_SIZE = 8

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedFillColor = fillColor ?? 'hsl(var(--primary))'

    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="progressbar"
        aria-label={label}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(mathCurveProgressVariants({ size }), className)}
        {...props}
      >
        {/* Track layer */}
        <path
          d={trackPath}
          fill="none"
          stroke={resolvedTrackStroke}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Head square — CSS transition for smooth value-driven movement */}
        <rect
          width={HEAD_SIZE}
          height={HEAD_SIZE}
          x={headPoint.x - HEAD_SIZE / 2}
          y={headPoint.y - HEAD_SIZE / 2}
          fill={resolvedFillColor}
          stroke="currentColor"
          strokeWidth={1.5}
          transform={`rotate(${headAngle} ${headPoint.x} ${headPoint.y})`}
          style={{ transition: 'x 300ms ease, y 300ms ease' }}
        />
        {/* Optional numeric label */}
        {showValue && (
          <text
            x={50}
            y={50}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
            fill="currentColor"
            letterSpacing="0.05em"
            style={{ userSelect: 'none', fontFamily: 'inherit' }}
          >
            {Math.round(clampedValue)}%
          </text>
        )}
      </svg>
    )
  }
)
MathCurveProgress.displayName = 'MathCurveProgress'

export { MathCurveProgress, mathCurveProgressVariants }
