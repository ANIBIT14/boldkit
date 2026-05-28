/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type LoaderCurveKey,
} from '@/lib/math-curves'

const mathCurveLoaderVariants = cva('', {
  variants: {
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveLoaderVariants> {
  curve?: LoaderCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
}

const MathCurveLoader = React.forwardRef<SVGSVGElement, MathCurveLoaderProps>(
  (
    {
      className,
      size,
      curve = 'rose',
      speed = 'normal',
      trackColor,
      headColor,
      strokeWidth = 4,
      headSize = 8,
      'aria-label': ariaLabel = 'Loading',
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.normal

    // Rebuild static track path when curve changes
    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

    React.useEffect(() => {
      startTimeRef.current = performance.now()

      const tick = () => {
        const now = performance.now()
        const elapsed = (now - startTimeRef.current) % durationMs
        const progress = elapsed / durationMs
        const detailScale = getDetailScale(now, getCurvePulseDuration(curve))

        const { x, y } = getPoint(curve, progress, detailScale)
        const angle = getAngle(curve, progress, detailScale)

        // Update track path with breathing detail scale
        if (pathRef.current) {
          pathRef.current.setAttribute('d', buildPath(curve, detailScale))
        }

        // Update head rect position and rotation
        if (rectRef.current) {
          const cx = x
          const cy = y
          rectRef.current.setAttribute('x', String(cx - headSize / 2))
          rectRef.current.setAttribute('y', String(cy - headSize / 2))
          rectRef.current.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`)
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(rafRef.current)
      }
    }, [curve, speed, durationMs, headSize])

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedHeadFill = headColor ?? 'hsl(var(--primary))'

    return (
      <ErrorBoundary>
        <svg
          ref={ref}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          role="status"
          aria-label={ariaLabel}
          className={cn(
            mathCurveLoaderVariants({ size }),
            'group',
            className
          )}
          {...props}
        >
          {/* Track layer */}
          <path
            ref={pathRef}
            d={trackPath}
            fill="none"
            stroke={resolvedTrackStroke}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="group-hover:[stroke-opacity:0.4] transition-[stroke-opacity] duration-200"
          />
          {/* Head square */}
          <rect
            ref={rectRef}
            width={headSize}
            height={headSize}
            x={50 - headSize / 2}
            y={50 - headSize / 2}
            fill={resolvedHeadFill}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
      </ErrorBoundary>
    )
  }
)
MathCurveLoader.displayName = 'MathCurveLoader'

export { MathCurveLoader, mathCurveLoaderVariants }
