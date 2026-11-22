/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Types & Factory
// ============================================================================

type ShapeAnimation =
  | 'none'
  // smooth presets
  | 'spin' | 'pulse' | 'float' | 'wiggle' | 'bounce' | 'glitch'
  // stepped presets — hard, non-interpolated motion (v3.5)
  | 'spin-step' | 'pulse-hard' | 'marquee-stamp'
type ShapeSpeed = 'slow' | 'normal' | 'fast'

interface ShapeProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  strokeWidth?: number
  filled?: boolean
  /** Fill colour when `filled`, outline colour when not. */
  color?: string
  /** Outline colour. Defaults to the foreground token. */
  strokeColor?: string
  animation?: ShapeAnimation
  speed?: ShapeSpeed
}

const FOREGROUND = 'hsl(var(--foreground))'

/**
 * Resolve the outline colour.
 *
 * `color` used to apply to `fill` only, so `<Shape filled={false} color="red" />`
 * rendered a black outline and the prop was a silent no-op — there was no way
 * to recolour an outlined shape short of a `className` override. When the shape
 * *is* its outline, `color` is what the caller meant.
 */
function strokeFor(filled: boolean, color?: string, strokeColor?: string): string {
  if (strokeColor) return strokeColor
  if (!filled && color) return color
  return FOREGROUND
}

function getAnimClass(animation?: ShapeAnimation, speed?: ShapeSpeed): string {
  if (!animation || animation === 'none') return ''
  const s = speed && speed !== 'normal' ? `-${speed}` : ''
  return `shape-animate-${animation}${s}`
}

// ============================================================================
// GEOMETRIC SHAPES - Basic polygons and mathematical forms
// ============================================================================

export const TriangleShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L95 90 L5 90 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TriangleShape.displayName = 'TriangleShape'

export const DiamondBadge = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L95 50 L50 95 L5 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
DiamondBadge.displayName = 'DiamondBadge'

export const PentagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L95 38 L77 90 L23 90 L5 38 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
PentagonShape.displayName = 'PentagonShape'

export const HexagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
HexagonShape.displayName = 'HexagonShape'

export const OctagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
OctagonShape.displayName = 'OctagonShape'

export const CrossShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M35 5 L65 5 L65 35 L95 35 L95 65 L65 65 L65 95 L35 95 L35 65 L5 65 L5 35 L35 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CrossShape.displayName = 'CrossShape'

export const TrapezoidShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 5 L80 5 L95 55 L5 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TrapezoidShape.displayName = 'TrapezoidShape'

export const ParallelogramShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 5 L95 5 L80 45 L5 45 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ParallelogramShape.displayName = 'ParallelogramShape'

// ============================================================================
// STAR SHAPES - Stars, bursts, and explosion effects
// ============================================================================

export const Star4Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
Star4Shape.displayName = 'Star4Shape'

export const Star5Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L61 38 L95 38 L68 59 L79 93 L50 72 L21 93 L32 59 L5 38 L39 38 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
Star5Shape.displayName = 'Star5Shape'

export const BurstShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 0 L58 35 L95 20 L68 45 L100 50 L68 55 L95 80 L58 65 L50 100 L42 65 L5 80 L32 55 L0 50 L32 45 L5 20 L42 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BurstShape.displayName = 'BurstShape'

export const ExplosionShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L55 30 L80 15 L65 35 L95 35 L70 50 L95 65 L65 65 L80 85 L55 70 L50 95 L45 70 L20 85 L35 65 L5 65 L30 50 L5 35 L35 35 L20 15 L45 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ExplosionShape.displayName = 'ExplosionShape'

export const SplatShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 Q55 20 70 15 Q65 30 85 25 Q75 40 95 50 Q75 55 85 75 Q65 65 70 85 Q55 75 50 95 Q45 75 30 85 Q35 65 15 75 Q25 55 5 50 Q25 40 15 25 Q35 30 30 15 Q45 20 50 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SplatShape.displayName = 'SplatShape'

export const LightningShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M35 0 L5 55 L25 55 L15 100 L55 40 L35 40 L50 0 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
LightningShape.displayName = 'LightningShape'

// ============================================================================
// ORGANIC SHAPES - Blobs, waves, and natural forms
// ============================================================================

export const BlobShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 Q80 10 90 35 Q95 60 80 80 Q60 95 40 90 Q15 85 10 60 Q5 35 25 15 Q40 5 50 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BlobShape.displayName = 'BlobShape'

export const WaveShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 25 Q12.5 0 25 25 Q37.5 50 50 25 Q62.5 0 75 25 Q87.5 50 100 25 L100 50 L0 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
WaveShape.displayName = 'WaveShape'

export const CloudShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M25 60 Q5 60 5 45 Q5 30 20 30 Q20 15 40 15 Q55 10 65 20 Q75 10 90 25 Q100 35 90 50 Q95 65 75 65 L25 65 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CloudShape.displayName = 'CloudShape'

export const HeartShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 90 L15 55 Q0 40 0 25 Q0 5 20 5 Q35 5 50 20 Q65 5 80 5 Q100 5 100 25 Q100 40 85 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
HeartShape.displayName = 'HeartShape'

// ============================================================================
// UI & BADGE SHAPES - Tags, badges, ribbons, and UI elements
// ============================================================================

export const ArrowBadge = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 10 L70 10 L70 0 L100 30 L70 60 L70 50 L0 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ArrowBadge.displayName = 'ArrowBadge'

export const ZigzagBanner = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 0 L100 0 L100 35 L90 50 L80 35 L70 50 L60 35 L50 50 L40 35 L30 50 L20 35 L10 50 L0 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ZigzagBanner.displayName = 'ZigzagBanner'

export const RibbonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 10 L10 0 L10 10 L90 10 L90 0 L100 10 L100 30 L90 40 L90 30 L10 30 L10 40 L0 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
RibbonShape.displayName = 'RibbonShape'

export const ShieldShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-success', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 L90 20 L90 50 Q90 80 50 95 Q10 80 10 50 L10 20 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ShieldShape.displayName = 'ShieldShape'

export const TagShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15 5 L85 5 L100 30 L85 55 L15 55 L0 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle cx="20" cy="30" r="6" fill="hsl(var(--foreground))" />
    </svg>
  )
)
TagShape.displayName = 'TagShape'

export const PriceTagShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10 5 L75 5 L95 30 L75 55 L10 55 L10 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle cx="22" cy="30" r="8" fill="none" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
      <line x1="10" y1="30" x2="14" y2="30" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
    </svg>
  )
)
PriceTagShape.displayName = 'PriceTagShape'

export const TicketShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-success', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 0 L95 0 Q100 0 100 5 L100 20 Q90 20 90 25 Q90 30 100 30 L100 45 Q100 50 95 50 L5 50 Q0 50 0 45 L0 30 Q10 30 10 25 Q10 20 0 20 L0 5 Q0 0 5 0 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TicketShape.displayName = 'TicketShape'

export const CouponShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-success', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 5 L95 5 L95 15 Q90 15 90 20 Q90 25 95 25 L95 35 Q90 35 90 40 Q90 45 95 45 L5 45 L5 35 Q10 35 10 30 Q10 25 5 25 L5 15 Q10 15 10 10 Q10 5 5 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <line x1="35" y1="10" x2="35" y2="40" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth - 1} strokeDasharray="4,4" />
    </svg>
  )
)
CouponShape.displayName = 'CouponShape'

export const BookmarkShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 5 L55 5 L55 95 L30 75 L5 95 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BookmarkShape.displayName = 'BookmarkShape'

export const FlagShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M10 5 L10 95" fill="none" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
      <path
        d="M10 5 L90 5 L75 30 L90 55 L10 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
FlagShape.displayName = 'FlagShape'

export const PillShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 5 L80 5 Q95 5 95 20 Q95 35 80 35 L20 35 Q5 35 5 20 Q5 5 20 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
PillShape.displayName = 'PillShape'

// ============================================================================
// COMMUNICATION SHAPES - Speech bubbles, cursors, and interactive elements
// ============================================================================

export const SpeechBubble = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-card', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10 10 L90 10 L90 65 L40 65 L20 90 L25 65 L10 65 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SpeechBubble.displayName = 'SpeechBubble'

export const CursorShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.7}
      height={size}
      viewBox="0 0 70 100"
      className={cn('text-success', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 5 L5 85 L25 65 L45 95 L55 90 L35 60 L65 60 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CursorShape.displayName = 'CursorShape'

export const EyeShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 30 Q25 5 50 5 Q75 5 95 30 Q75 55 50 55 Q25 55 5 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle cx="50" cy="30" r="12" fill="hsl(var(--foreground))" />
    </svg>
  )
)
EyeShape.displayName = 'EyeShape'

// ============================================================================
// NATURE & CELESTIAL SHAPES - Sun, moon, planet, rainbow, and natural forms
// ============================================================================

export const SunShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="22"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <path
        d="M50 5 L54 22 L46 22 Z M50 95 L54 78 L46 78 Z M5 50 L22 46 L22 54 Z M95 50 L78 46 L78 54 Z M18 18 L32 28 L28 32 Z M82 18 L68 28 L72 32 Z M18 82 L28 68 L32 72 Z M82 82 L72 68 L68 72 Z"
        fill="hsl(var(--foreground))"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={Math.max(1, strokeWidth - 2)}
        strokeLinejoin="round"
      />
    </svg>
  )
)
SunShape.displayName = 'SunShape'

export const Star6Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      {/* 6-pointed star (hexagram) with 12 points alternating */}
      <path
        d="M50 2 L56 30 L85 15 L65 40 L98 50 L65 60 L85 85 L56 70 L50 98 L44 70 L15 85 L35 60 L2 50 L35 40 L15 15 L44 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
Star6Shape.displayName = 'Star6Shape'

export const CrescentShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M70 10 Q90 30 90 55 Q90 80 65 92 Q80 75 80 55 Q80 30 60 15 Q55 12 70 10 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
)
CrescentShape.displayName = 'CrescentShape'

export const RainbowShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 55 Q5 10 50 10 Q95 10 95 55"
        fill="none"
        stroke={filled ? (color || "hsl(var(--destructive))") : 'none'}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d="M15 55 Q15 22 50 22 Q85 22 85 55"
        fill="none"
        stroke={filled ? (color || "hsl(var(--warning))") : 'none'}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d="M25 55 Q25 34 50 34 Q75 34 75 55"
        fill="none"
        stroke={filled ? (color || "hsl(var(--info))") : 'none'}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d="M5 55 Q5 10 50 10 Q95 10 95 55"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15 55 Q15 22 50 22 Q85 22 85 55"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M25 55 Q25 34 50 34 Q75 34 75 55"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
)
RainbowShape.displayName = 'RainbowShape'

export const PlanetShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="28"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="50"
        cy="50"
        rx="45"
        ry="14"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        transform="rotate(-25 50 50)"
      />
    </svg>
  )
)
PlanetShape.displayName = 'PlanetShape'

export const UmbrellaShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 10 Q15 10 5 45 L25 45 Q25 30 35 30 Q40 30 40 45 L60 45 Q60 30 65 30 Q75 30 75 45 L95 45 Q85 10 50 10 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <path
        d="M50 10 L50 80 Q50 92 40 92 Q32 92 32 85"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
)
UmbrellaShape.displayName = 'UmbrellaShape'

export const AppleShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 25 Q30 20 15 35 Q0 55 15 75 Q25 92 40 95 Q50 97 50 90 Q50 97 60 95 Q75 92 85 75 Q100 55 85 35 Q70 20 50 25 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <path
        d="M50 25 Q55 10 60 5"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M58 12 Q68 8 72 15 Q70 20 62 18"
        fill="hsl(var(--foreground))"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={Math.max(1, strokeWidth - 2)}
      />
    </svg>
  )
)
AppleShape.displayName = 'AppleShape'

// ============================================================================
// DECORATIVE SHAPES - Scribbles, tears, and artistic effects
// ============================================================================

export const ScribbleCircle = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <path
        d="M20 50 Q30 30 50 25 Q70 20 80 40 Q85 60 70 75 Q50 90 30 75 Q15 60 20 50"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth - 1}
        strokeDasharray="5,5"
      />
    </svg>
  )
)
ScribbleCircle.displayName = 'ScribbleCircle'

export const ScribbleUnderline = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.2}
      viewBox="0 0 100 20"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 12 Q10 8 20 14 Q30 18 40 10 Q50 6 60 14 Q70 18 80 10 Q90 6 98 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M5 16 Q15 10 25 16 Q35 20 45 12 Q55 8 65 16 Q75 20 85 12 Q95 8 98 14"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth - 1}
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
)
ScribbleUnderline.displayName = 'ScribbleUnderline'

export const PaperTearShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.3}
      viewBox="0 0 100 30"
      className={cn('text-card', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 0 L100 0 L100 15 L95 20 L90 12 L85 22 L80 10 L75 25 L70 8 L65 20 L60 12 L55 28 L50 10 L45 22 L40 15 L35 25 L30 10 L25 20 L20 8 L15 18 L10 12 L5 22 L0 15 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
PaperTearShape.displayName = 'PaperTearShape'

// ============================================================================
// NEW SHAPES - Seals, Gears, and Wavy Forms
// ============================================================================

export const SealShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-success', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 5 Q60 5 65 12 Q72 8 78 15 Q85 12 88 22 Q95 22 95 32 Q100 40 95 50 Q100 60 95 68 Q95 78 88 78 Q85 88 78 85 Q72 92 65 88 Q60 95 50 95 Q40 95 35 88 Q28 92 22 85 Q15 88 12 78 Q5 78 5 68 Q0 60 5 50 Q0 40 5 32 Q5 22 12 22 Q15 12 22 15 Q28 8 35 12 Q40 5 50 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SealShape.displayName = 'SealShape'

export const GearShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-muted-foreground', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <g transform="translate(0, 10)">
        <path
          d="M42 8 L58 8 L60 18 L68 14 L76 22 L72 30 L82 34 L82 48 L72 50 L76 58 L68 66 L60 62 L58 72 L42 72 L40 62 L32 66 L24 58 L28 50 L18 48 L18 34 L28 30 L24 22 L32 14 L40 18 Z"
          fill={filled ? (color || 'currentColor') : 'none'}
          stroke={strokeFor(filled, color, strokeColor)}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="40"
          r="12"
          fill="hsl(var(--background))"
          stroke={strokeFor(filled, color, strokeColor)}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  )
)
GearShape.displayName = 'GearShape'

export const WavyRectangleShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10 15 Q15 10 20 15 Q25 20 30 15 Q35 10 40 15 Q45 20 50 15 Q55 10 60 15 Q65 20 70 15 Q75 10 80 15 Q85 20 90 15 L90 20 Q95 25 90 30 Q85 35 90 40 Q95 45 90 50 Q85 55 90 55 L90 60 Q85 65 80 60 Q75 55 70 60 Q65 65 60 60 Q55 55 50 60 Q45 65 40 60 Q35 55 30 60 Q25 65 20 60 Q15 55 10 60 L10 55 Q5 50 10 45 Q15 40 10 35 Q5 30 10 25 Q15 20 10 20 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
WavyRectangleShape.displayName = 'WavyRectangleShape'

// ============================================================================
// GEOMETRIC ADDITIONS — Regular polygons and ellipse
// ============================================================================

export const RhombusShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <path d="M50 5 L92 50 L50 95 L8 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
    </svg>
  )
)
RhombusShape.displayName = 'RhombusShape'

export const EllipseShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size * 0.7} viewBox="0 0 100 70"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <ellipse cx="50" cy="35" rx="46" ry="28"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
      <line x1="4" y1="35" x2="96" y2="35" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={Math.max(1, strokeWidth - 1)} strokeDasharray="4,4" />
      <line x1="50" y1="7" x2="50" y2="63" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={Math.max(1, strokeWidth - 1)} strokeDasharray="4,4" />
    </svg>
  )
)
EllipseShape.displayName = 'EllipseShape'

export const HeptagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      {/* 7 vertices: k=0..6, angle = k*2π/7 - π/2 */}
      <path d="M50 5 L85 22 L94 60 L70 91 L30 91 L6 60 L15 22 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
    </svg>
  )
)
HeptagonShape.displayName = 'HeptagonShape'

export const DecagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      {/* 10 vertices: k=0..9, angle = k*π/5 - π/2 */}
      <path d="M50 5 L76 14 L93 36 L93 64 L76 86 L50 95 L24 86 L7 64 L7 36 L24 14 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
    </svg>
  )
)
DecagonShape.displayName = 'DecagonShape'

// ============================================================================
// MATHEMATICAL SHAPES — Fractals, impossible figures, topological forms
// ============================================================================

/** Koch Snowflake iteration-2 path helper (runs once at module level, pure math) */
function buildKochPath(): string {
  let pts = [{ x: 50, y: 8 }, { x: 91, y: 73 }, { x: 9, y: 73 }]
  const cos60 = 0.5, sin60 = Math.sqrt(3) / 2
  for (let iter = 0; iter < 2; iter++) {
    const next: { x: number; y: number }[] = []
    for (let j = 0; j < pts.length; j++) {
      const a = pts[j]!, b = pts[(j + 1) % pts.length]!
      const dx = (b.x - a.x) / 3, dy = (b.y - a.y) / 3
      const p1 = { x: a.x + dx, y: a.y + dy }
      const p2 = { x: a.x + 2 * dx, y: a.y + 2 * dy }
      const peak = { x: p1.x + dx * cos60 + dy * sin60, y: p1.y - dx * sin60 + dy * cos60 }
      next.push(a, p1, peak, p2)
    }
    pts = next
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'
}
const KOCH_PATH = buildKochPath()

export const KochSnowflakeShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-info', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <path d={KOCH_PATH}
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
)
KochSnowflakeShape.displayName = 'KochSnowflakeShape'

export const PenroseTriangleShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      {/* Top beam */}
      <path d="M50 8 L62 8 L38 50 L26 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
      {/* Bottom-right beam */}
      <path d="M62 8 L88 52 L76 52 L50 8 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
      {/* Bottom beam */}
      <path d="M26 50 L38 50 L76 52 L88 52 L82 62 L20 62 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
)
PenroseTriangleShape.displayName = 'PenroseTriangleShape'

/** Trefoil knot projection: x = sin(t)+2sin(2t), y = cos(t)-2cos(2t) */
function buildTrefoilPath(): string {
  const n = 120, scale = 14
  let d = ''
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * 2 * Math.PI
    const x = 50 + scale * (Math.sin(t) + 2 * Math.sin(2 * t))
    const y = 50 + scale * (Math.cos(t) - 2 * Math.cos(2 * t))
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return d + 'Z'
}
const TREFOIL_PATH = buildTrefoilPath()

export const TrefoilShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <path d={TREFOIL_PATH}
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
)
TrefoilShape.displayName = 'TrefoilShape'

/** Fibonacci spiral: 8 quarter-circle arcs with φ-scaled radii */
function buildFibonacciPath(): string {
  const scale = 1.9
  const arcs: { cx: number; cy: number; r: number; startAngle: number }[] = [
    { cx: 51, cy: 51, r: 1, startAngle: Math.PI },
    { cx: 51, cy: 50, r: 1, startAngle: Math.PI / 2 },
    { cx: 50, cy: 50, r: 2, startAngle: 0 },
    { cx: 50, cy: 52, r: 3, startAngle: -Math.PI / 2 },
    { cx: 53, cy: 52, r: 5, startAngle: Math.PI },
    { cx: 53, cy: 47, r: 8, startAngle: Math.PI / 2 },
    { cx: 45, cy: 47, r: 13, startAngle: 0 },
    { cx: 45, cy: 60, r: 21, startAngle: -Math.PI / 2 },
  ]
  let d = ''
  arcs.forEach(({ cx, cy, r, startAngle }, i) => {
    const endAngle = startAngle - Math.PI / 2
    const sx = cx + r * scale * Math.cos(startAngle)
    const sy = cy + r * scale * Math.sin(startAngle)
    const ex = cx + r * scale * Math.cos(endAngle)
    const ey = cy + r * scale * Math.sin(endAngle)
    const R = r * scale
    if (i === 0) d += `M${sx.toFixed(1)} ${sy.toFixed(1)} `
    d += `A${R.toFixed(1)} ${R.toFixed(1)} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)} `
  })
  return d
}
const FIBONACCI_PATH = buildFibonacciPath()

export const FibonacciSpiralShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled: _filled = false, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <path d={FIBONACCI_PATH}
        fill="none"
        stroke={strokeColor || color || 'currentColor'}
        strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
)
FibonacciSpiralShape.displayName = 'FibonacciSpiralShape'

export const MobiusStripShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size * 0.6} viewBox="0 0 100 60"
      className={cn('text-secondary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <path d="M5 15 Q15 5 30 10 Q50 18 70 8 Q85 3 95 15 Q100 25 95 35 Q85 47 70 42 Q50 35 30 45 Q15 52 5 42 Q0 35 5 25 Q5 20 5 15 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M38 28 Q50 22 62 28 Q50 34 38 28 Z"
        fill="hsl(var(--background))" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
    </svg>
  )
)
MobiusStripShape.displayName = 'MobiusStripShape'

export const TorusShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100"
      className={cn('text-primary', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}>
      <ellipse cx="50" cy="50" rx="45" ry="20"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
      <ellipse cx="50" cy="50" rx="20" ry="9"
        fill="hsl(var(--background))" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={strokeWidth} />
      <ellipse cx="50" cy="55" rx="45" ry="20"
        fill="none" stroke={strokeFor(filled, color, strokeColor)} strokeWidth={Math.max(1, strokeWidth - 1)} strokeDasharray="4,4" />
    </svg>
  )
)
TorusShape.displayName = 'TorusShape'

// ============================================================================
// SHAPE CATEGORIES - Grouped exports for easy access
// ============================================================================

// ============================================================================
// EMOJI & TREND SHAPES - Faces, reactions, retro daisy, orbit (v3.6.2)
// ============================================================================

export const SmileyShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="36"
        cy="40"
        rx="5"
        ry="8"
        fill="hsl(var(--foreground))"
      />
      <ellipse
        cx="64"
        cy="40"
        rx="5"
        ry="8"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M30 60 Q50 80 70 60"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
)
SmileyShape.displayName = 'SmileyShape'

export const MeltingFaceShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 62 C8 30 26 8 50 8 C74 8 92 30 92 62 L92 72 Q92 80 85 80 Q79 80 79 87 Q79 95 71 95 Q63 95 63 86 L63 83 Q63 78 57 78 L31 78 Q25 78 25 85 Q25 92 17 92 Q9 92 9 84 Z"
        strokeLinejoin="round"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="34"
        cy="42"
        r="6"
        fill="hsl(var(--foreground))"
      />
      <ellipse
        cx="66"
        cy="46"
        rx="5"
        ry="9"
        transform="rotate(-20 66 46)"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M28 64 Q36 56 44 63 T60 62 T76 58"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
)
MeltingFaceShape.displayName = 'MeltingFaceShape'

export const WinkShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="35"
        cy="40"
        rx="5"
        ry="8"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M57 41 Q65 33 73 41"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 58 Q50 84 72 58 Z"
        fill="hsl(var(--foreground))"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
)
WinkShape.displayName = 'WinkShape'

export const SkullShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-card', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 6 C26 6 10 22 10 46 C10 60 18 68 26 72 L26 86 Q26 92 32 92 L68 92 Q74 92 74 86 L74 72 C82 68 90 60 90 46 C90 22 74 6 50 6 Z"
        strokeLinejoin="round"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="33"
        cy="46"
        r="11"
        fill="hsl(var(--foreground))"
      />
      <circle
        cx="67"
        cy="46"
        r="11"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M50 58 L44 70 L56 70 Z"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M40 80 V92 M50 80 V92 M60 80 V92"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
)
SkullShape.displayName = 'SkullShape'

export const FlameShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50 4 C56 20 74 30 78 50 C84 74 70 96 50 96 C30 96 16 80 20 60 C22 48 30 42 32 30 C40 38 42 46 42 52 C48 40 52 22 50 4 Z"
        strokeLinejoin="round"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <path
        d="M50 54 C54 62 64 68 64 78 C64 88 58 92 50 92 C42 92 36 86 37 78 C38 70 46 66 50 54 Z"
        fill="hsl(var(--warning))"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={Math.max(1, strokeWidth - 1)}
        strokeLinejoin="round"
      />
    </svg>
  )
)
FlameShape.displayName = 'FlameShape'

export const SparklesShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M40 26 Q44 54 72 58 Q44 62 40 90 Q36 62 8 58 Q36 54 40 26 Z M76 6 Q78 22 94 24 Q78 26 76 42 Q74 26 58 24 Q74 22 76 6 Z M80 66 Q81 75 90 76 Q81 77 80 86 Q79 77 70 76 Q79 75 80 66 Z"
        strokeLinejoin="round"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SparklesShape.displayName = 'SparklesShape'

export const HundredShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      className={cn('text-destructive', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 16 L22 8 L28 8 L28 54 L17 54 L17 22 L8 26 Z M36 31 a14 23 0 1 0 28 0 a14 23 0 1 0 -28 0 Z M43 31 a7 14 0 1 0 14 0 a7 14 0 1 0 -14 0 Z M70 31 a13 23 0 1 0 26 0 a13 23 0 1 0 -26 0 Z M77 31 a6 14 0 1 0 12 0 a6 14 0 1 0 -12 0 Z M6 62 L94 60 L94 66 L6 68 Z M12 72 L88 70 L88 76 L12 78 Z"
        fillRule="evenodd"
        strokeLinejoin="round"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
HundredShape.displayName = 'HundredShape'

export const EyesShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      className={cn('text-card', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <ellipse
        cx="29"
        cy="35"
        rx="20"
        ry="30"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="71"
        cy="35"
        rx="20"
        ry="30"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="21"
        cy="40"
        r="9"
        fill="hsl(var(--foreground))"
      />
      <circle
        cx="63"
        cy="40"
        r="9"
        fill="hsl(var(--foreground))"
      />
    </svg>
  )
)
EyesShape.displayName = 'EyesShape'

export const OrbitShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', getAnimClass(animation, speed), className)}
      aria-hidden="true"
      {...props}
    >
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="16"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="16"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        transform="rotate(60 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="16"
        fill="none"
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
        transform="rotate(120 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r="12"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke={strokeFor(filled, color, strokeColor)}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="94"
        cy="50"
        r="5"
        fill="hsl(var(--foreground))"
      />
      <circle
        cx="28"
        cy="11.9"
        r="5"
        fill="hsl(var(--foreground))"
      />
      <circle
        cx="28"
        cy="88.1"
        r="5"
        fill="hsl(var(--foreground))"
      />
    </svg>
  )
)
OrbitShape.displayName = 'OrbitShape'

export const DaisyShape = React.forwardRef<SVGSVGElement, ShapeProps & { petals?: number }>(
  ({ size = 100, strokeWidth = 3, filled = true, color, strokeColor, animation = 'none', speed = 'normal', petals = 8, className, ...props }, ref) => {
    const count = Math.min(16, Math.max(3, Math.round(petals)))
    const stroke = strokeFor(filled, color, strokeColor)
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={cn('text-primary', getAnimClass(animation, speed), className)}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="25"
            rx={Math.max(6, 60 / count + 4)}
            ry="21"
            transform={`rotate(${(360 / count) * i} 50 50)`}
            fill={filled ? (color || 'currentColor') : 'none'}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        ))}
        <circle cx="50" cy="50" r="15" fill="hsl(var(--warning))" stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    )
  }
)
DaisyShape.displayName = 'DaisyShape'

export const GeometricShapes = {
  TriangleShape,
  DiamondBadge,
  PentagonShape,
  HexagonShape,
  OctagonShape,
  CrossShape,
  TrapezoidShape,
  ParallelogramShape,
  RhombusShape,
  EllipseShape,
  HeptagonShape,
  DecagonShape,
}

export const MathematicalShapes = {
  KochSnowflakeShape,
  PenroseTriangleShape,
  TrefoilShape,
  FibonacciSpiralShape,
  MobiusStripShape,
  TorusShape,
}

export const StarShapes = {
  Star4Shape,
  Star5Shape,
  Star6Shape,
  BurstShape,
  ExplosionShape,
  SplatShape,
  LightningShape,
}

export const OrganicShapes = {
  BlobShape,
  WaveShape,
  CloudShape,
  HeartShape,
  AppleShape,
  DaisyShape,
}

export const CelestialShapes = {
  SunShape,
  CrescentShape,
  RainbowShape,
  PlanetShape,
  UmbrellaShape,
  OrbitShape,
}

export const BadgeShapes = {
  ArrowBadge,
  ZigzagBanner,
  RibbonShape,
  ShieldShape,
  TagShape,
  PriceTagShape,
  TicketShape,
  CouponShape,
  BookmarkShape,
  FlagShape,
  PillShape,
  SealShape,
  WavyRectangleShape,
}

export const MechanicalShapes = {
  GearShape,
}

export const CommunicationShapes = {
  SpeechBubble,
  CursorShape,
  EyeShape,
}

export const DecorativeShapes = {
  ScribbleCircle,
  ScribbleUnderline,
  PaperTearShape,
}

export const EmojiShapes = {
  SmileyShape,
  MeltingFaceShape,
  WinkShape,
  SkullShape,
  FlameShape,
  SparklesShape,
  HundredShape,
  EyesShape,
}

export const TicketShapes = {
  WavyRectangleShape,
}

// ============================================================================
// ALL SHAPES - Combined export for backwards compatibility
// ============================================================================

export const shapes = {
  // Geometric
  TriangleShape,
  DiamondBadge,
  PentagonShape,
  HexagonShape,
  OctagonShape,
  CrossShape,
  TrapezoidShape,
  ParallelogramShape,
  // Stars & Bursts
  Star4Shape,
  Star5Shape,
  Star6Shape,
  BurstShape,
  ExplosionShape,
  SplatShape,
  LightningShape,
  // Organic
  BlobShape,
  WaveShape,
  CloudShape,
  HeartShape,
  AppleShape,
  // Celestial & Nature
  SunShape,
  CrescentShape,
  RainbowShape,
  PlanetShape,
  UmbrellaShape,
  // Badges & UI
  ArrowBadge,
  ZigzagBanner,
  RibbonShape,
  ShieldShape,
  TagShape,
  PriceTagShape,
  TicketShape,
  CouponShape,
  BookmarkShape,
  FlagShape,
  PillShape,
  SealShape,
  WavyRectangleShape,
  // Communication
  SpeechBubble,
  CursorShape,
  EyeShape,
  // Decorative
  ScribbleCircle,
  ScribbleUnderline,
  PaperTearShape,
  // Mechanical
  GearShape,
  // Geometric additions
  RhombusShape,
  EllipseShape,
  HeptagonShape,
  DecagonShape,
  // Mathematical
  KochSnowflakeShape,
  PenroseTriangleShape,
  TrefoilShape,
  FibonacciSpiralShape,
  MobiusStripShape,
  TorusShape,
  // Emoji & trend (v3.6.2)
  SmileyShape,
  MeltingFaceShape,
  WinkShape,
  SkullShape,
  FlameShape,
  SparklesShape,
  HundredShape,
  EyesShape,
  DaisyShape,
  OrbitShape,
}
