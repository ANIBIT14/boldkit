import * as React from 'react'
import { cn } from '@/lib/utils'

interface ShapeProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  strokeWidth?: number
  filled?: boolean
  color?: string
}

// Burst/Explosion shape - 8 points
export const BurstShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M50 0 L58 35 L95 20 L68 45 L100 50 L68 55 L95 80 L58 65 L50 100 L42 65 L5 80 L32 55 L0 50 L32 45 L5 20 L42 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BurstShape.displayName = 'BurstShape'

// Blob shape - organic irregular
export const BlobShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-secondary', className)}
      {...props}
    >
      <path
        d="M50 5 Q80 10 90 35 Q95 60 80 80 Q60 95 40 90 Q15 85 10 60 Q5 35 25 15 Q40 5 50 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BlobShape.displayName = 'BlobShape'

// Arrow badge - pointing right
export const ArrowBadge = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-accent', className)}
      {...props}
    >
      <path
        d="M0 10 L70 10 L70 0 L100 30 L70 60 L70 50 L0 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ArrowBadge.displayName = 'ArrowBadge'

// Zigzag banner
export const ZigzagBanner = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-warning', className)}
      {...props}
    >
      <path
        d="M0 0 L100 0 L100 35 L90 50 L80 35 L70 50 L60 35 L50 50 L40 35 L30 50 L20 35 L10 50 L0 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ZigzagBanner.displayName = 'ZigzagBanner'

// Scribble circle
export const ScribbleCircle = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-info', className)}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
      <path
        d="M20 50 Q30 30 50 25 Q70 20 80 40 Q85 60 70 75 Q50 90 30 75 Q15 60 20 50"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth - 1}
        strokeDasharray="5,5"
      />
    </svg>
  )
)
ScribbleCircle.displayName = 'ScribbleCircle'

// Ticket/Coupon shape
export const TicketShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-success', className)}
      {...props}
    >
      <path
        d="M5 0 L95 0 Q100 0 100 5 L100 20 Q90 20 90 25 Q90 30 100 30 L100 45 Q100 50 95 50 L5 50 Q0 50 0 45 L0 30 Q10 30 10 25 Q10 20 0 20 L0 5 Q0 0 5 0 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TicketShape.displayName = 'TicketShape'

// Splat shape
export const SplatShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', className)}
      {...props}
    >
      <path
        d="M50 5 Q55 20 70 15 Q65 30 85 25 Q75 40 95 50 Q75 55 85 75 Q65 65 70 85 Q55 75 50 95 Q45 75 30 85 Q35 65 15 75 Q25 55 5 50 Q25 40 15 25 Q35 30 30 15 Q45 20 50 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SplatShape.displayName = 'SplatShape'

// Speech bubble
export const SpeechBubble = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-card', className)}
      {...props}
    >
      <path
        d="M10 10 L90 10 L90 65 L40 65 L20 90 L25 65 L10 65 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
SpeechBubble.displayName = 'SpeechBubble'

// Diamond badge
export const DiamondBadge = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M50 5 L95 50 L50 95 L5 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
DiamondBadge.displayName = 'DiamondBadge'

// Hexagon
export const HexagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-secondary', className)}
      {...props}
    >
      <path
        d="M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
HexagonShape.displayName = 'HexagonShape'

// Cross/Plus shape
export const CrossShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', className)}
      {...props}
    >
      <path
        d="M35 5 L65 5 L65 35 L95 35 L95 65 L65 65 L65 95 L35 95 L35 65 L5 65 L5 35 L35 35 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CrossShape.displayName = 'CrossShape'

// Lightning bolt
export const LightningShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      className={cn('text-warning', className)}
      {...props}
    >
      <path
        d="M35 0 L5 55 L25 55 L15 100 L55 40 L35 40 L50 0 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
LightningShape.displayName = 'LightningShape'

// Heart shape
export const HeartShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-destructive', className)}
      {...props}
    >
      <path
        d="M50 90 L15 55 Q0 40 0 25 Q0 5 20 5 Q35 5 50 20 Q65 5 80 5 Q100 5 100 25 Q100 40 85 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
HeartShape.displayName = 'HeartShape'

// Star 4-point
export const Star4Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-info', className)}
      {...props}
    >
      <path
        d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
Star4Shape.displayName = 'Star4Shape'

// Shield shape
export const ShieldShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-success', className)}
      {...props}
    >
      <path
        d="M50 5 L90 20 L90 50 Q90 80 50 95 Q10 80 10 50 L10 20 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ShieldShape.displayName = 'ShieldShape'

// Ribbon/Banner
export const RibbonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M0 10 L10 0 L10 10 L90 10 L90 0 L100 10 L100 30 L90 40 L90 30 L10 30 L10 40 L0 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
RibbonShape.displayName = 'RibbonShape'

// Wave shape
export const WaveShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-secondary', className)}
      {...props}
    >
      <path
        d="M0 25 Q12.5 0 25 25 Q37.5 50 50 25 Q62.5 0 75 25 Q87.5 50 100 25 L100 50 L0 50 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
WaveShape.displayName = 'WaveShape'

// Octagon
export const OctagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', className)}
      {...props}
    >
      <path
        d="M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
OctagonShape.displayName = 'OctagonShape'

// Cloud shape
export const CloudShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      className={cn('text-info', className)}
      {...props}
    >
      <path
        d="M25 60 Q5 60 5 45 Q5 30 20 30 Q20 15 40 15 Q55 10 65 20 Q75 10 90 25 Q100 35 90 50 Q95 65 75 65 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CloudShape.displayName = 'CloudShape'

// Tag shape
export const TagShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-warning', className)}
      {...props}
    >
      <path
        d="M15 5 L85 5 L100 30 L85 55 L15 55 L0 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="20"
        cy="30"
        r="6"
        fill="hsl(var(--foreground))"
      />
    </svg>
  )
)
TagShape.displayName = 'TagShape'

// Star 5-point
export const Star5Shape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', className)}
      {...props}
    >
      <path
        d="M50 5 L61 38 L95 38 L68 59 L79 93 L50 72 L21 93 L32 59 L5 38 L39 38 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
Star5Shape.displayName = 'Star5Shape'

// Pentagon
export const PentagonShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M50 5 L95 38 L77 90 L23 90 L5 38 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
PentagonShape.displayName = 'PentagonShape'

// Trapezoid
export const TrapezoidShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-secondary', className)}
      {...props}
    >
      <path
        d="M20 5 L80 5 L95 55 L5 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TrapezoidShape.displayName = 'TrapezoidShape'

// Parallelogram
export const ParallelogramShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      className={cn('text-info', className)}
      {...props}
    >
      <path
        d="M20 5 L95 5 L80 45 L5 45 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
ParallelogramShape.displayName = 'ParallelogramShape'

// Cursor/Pointer
export const CursorShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.7}
      height={size}
      viewBox="0 0 70 100"
      className={cn('text-success', className)}
      {...props}
    >
      <path
        d="M5 5 L5 85 L25 65 L45 95 L55 90 L35 60 L65 60 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
CursorShape.displayName = 'CursorShape'

// Bookmark
export const BookmarkShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size * 0.6}
      height={size}
      viewBox="0 0 60 100"
      className={cn('text-destructive', className)}
      {...props}
    >
      <path
        d="M5 5 L55 5 L55 95 L30 75 L5 95 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
BookmarkShape.displayName = 'BookmarkShape'

// Flag
export const FlagShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-warning', className)}
      {...props}
    >
      <path
        d="M10 5 L10 95"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
      <path
        d="M10 5 L90 5 L75 30 L90 55 L10 55 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
FlagShape.displayName = 'FlagShape'

// Pill/Capsule
export const PillShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      className={cn('text-primary', className)}
      {...props}
    >
      <path
        d="M20 5 L80 5 Q95 5 95 20 Q95 35 80 35 L20 35 Q5 35 5 20 Q5 5 20 5 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
PillShape.displayName = 'PillShape'

// Eye
export const EyeShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={cn('text-secondary', className)}
      {...props}
    >
      <path
        d="M5 30 Q25 5 50 5 Q75 5 95 30 Q75 55 50 55 Q25 55 5 30 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="50"
        cy="30"
        r="12"
        fill="hsl(var(--foreground))"
      />
    </svg>
  )
)
EyeShape.displayName = 'EyeShape'

// Triangle
export const TriangleShape = React.forwardRef<SVGSVGElement, ShapeProps>(
  ({ size = 100, strokeWidth = 3, filled = true, color, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-accent', className)}
      {...props}
    >
      <path
        d="M50 5 L95 90 L5 90 Z"
        fill={filled ? (color || 'currentColor') : 'none'}
        stroke="hsl(var(--foreground))"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
)
TriangleShape.displayName = 'TriangleShape'

export const shapes = {
  BurstShape,
  BlobShape,
  ArrowBadge,
  ZigzagBanner,
  ScribbleCircle,
  TicketShape,
  SplatShape,
  SpeechBubble,
  DiamondBadge,
  HexagonShape,
  CrossShape,
  LightningShape,
  HeartShape,
  Star4Shape,
  ShieldShape,
  RibbonShape,
  WaveShape,
  OctagonShape,
  CloudShape,
  TagShape,
  Star5Shape,
  PentagonShape,
  TrapezoidShape,
  ParallelogramShape,
  CursorShape,
  BookmarkShape,
  FlagShape,
  PillShape,
  EyeShape,
  TriangleShape,
}
