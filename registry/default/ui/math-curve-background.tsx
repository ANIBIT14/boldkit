import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type BackgroundCurveKey,
} from '@/lib/math-curves'

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  curve?: BackgroundCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  asChild?: boolean
  children?: React.ReactNode
}

const MathCurveBackground = React.forwardRef<HTMLDivElement, MathCurveBackgroundProps>(
  (
    {
      className,
      curve = 'rose',
      speed = 'slow',
      opacity = 0.15,
      trackColor,
      headColor,
      strokeWidth = 2,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.slow
    const HEAD_SIZE = 8

    const initialTrackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

    React.useEffect(() => {
      startTimeRef.current = performance.now()

      const tick = () => {
        const now = performance.now()
        const elapsed = (now - startTimeRef.current) % durationMs
        const progress = elapsed / durationMs
        const detailScale = getDetailScale(now, getCurvePulseDuration(curve))

        const { x, y } = getPoint(curve, progress, detailScale)
        const angle = getAngle(curve, progress, detailScale)

        if (pathRef.current) {
          pathRef.current.setAttribute('d', buildPath(curve, detailScale))
        }

        if (rectRef.current) {
          const cx = x
          const cy = y
          rectRef.current.setAttribute('x', String(cx - HEAD_SIZE / 2))
          rectRef.current.setAttribute('y', String(cy - HEAD_SIZE / 2))
          rectRef.current.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`)
        }

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(rafRef.current)
      }
    }, [curve, speed, durationMs])

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedHeadFill = headColor ?? 'hsl(var(--primary))'

    const Container = asChild ? Slot : 'div'

    return (
      <Container
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        {/* Animated SVG background layer */}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          opacity={opacity}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <path
            ref={pathRef}
            d={initialTrackPath}
            fill="none"
            stroke={resolvedTrackStroke}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect
            ref={rectRef}
            width={HEAD_SIZE}
            height={HEAD_SIZE}
            x={50 - HEAD_SIZE / 2}
            y={50 - HEAD_SIZE / 2}
            fill={resolvedHeadFill}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
        {/* Children sit above the SVG */}
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </Container>
    )
  }
)
MathCurveBackground.displayName = 'MathCurveBackground'

export { MathCurveBackground }
