import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gaugeChartVariants = cva(
  'relative flex items-center justify-center',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        semicircle: '',
        full: '',
        meter: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'semicircle',
    },
  }
)

export interface GaugeChartZone {
  from: number
  to: number
  color: string
  label?: string
}

export interface GaugeChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof gaugeChartVariants> {
  value: number
  min?: number
  max?: number
  zones?: GaugeChartZone[]
  label?: string
  valueFormatter?: (value: number) => string
  showTicks?: boolean
  animated?: boolean
}

const DEFAULT_ZONES: GaugeChartZone[] = [
  { from: 0, to: 33, color: 'hsl(var(--destructive))', label: 'Low' },
  { from: 33, to: 66, color: 'hsl(var(--warning))', label: 'Medium' },
  { from: 66, to: 100, color: 'hsl(var(--success))', label: 'High' },
]

/**
 * Variant arc configs:
 *   semicircle — 180° sweep, arc from left (-90°) to right (+90°), open at bottom
 *   full       — 360° sweep (330° drawn with a gap at the bottom to show min/max)
 *   meter      — same 180° sweep as semicircle but with denser tick marks (every 10%)
 */
const VARIANT_ARC_CONFIG = {
  semicircle: { arcStartDeg: -90, sweepDeg: 180 },
  full:       { arcStartDeg: -210, sweepDeg: 300 }, // 300° sweep, gap at bottom
  meter:      { arcStartDeg: -90, sweepDeg: 180 },
} as const

type Variant = 'semicircle' | 'full' | 'meter'

const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      zones = DEFAULT_ZONES,
      label,
      valueFormatter = (v) => `${v}`,
      showTicks = true,
      animated = true,
      size,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedVariant: Variant = (variant as Variant) || 'semicircle'
    const arcConfig = VARIANT_ARC_CONFIG[resolvedVariant]

    const normalizedValue = Math.max(min, Math.min(max, value))
    const percentage = ((normalizedValue - min) / (max - min)) * 100

    // SVG dimensions — full variant needs a taller canvas to show the bottom arc
    const sizeConfig = {
      sm: {
        width: 140,
        height: resolvedVariant === 'full' ? 140 : 90,
        radius: 45,
        strokeWidth: 10,
        fontSize: 14,
        labelSize: 9,
      },
      md: {
        width: 180,
        height: resolvedVariant === 'full' ? 180 : 115,
        radius: 58,
        strokeWidth: 12,
        fontSize: 18,
        labelSize: 11,
      },
      lg: {
        width: 240,
        height: resolvedVariant === 'full' ? 240 : 150,
        radius: 76,
        strokeWidth: 14,
        fontSize: 22,
        labelSize: 13,
      },
    }

    const currentSize = size || 'md'
    const config = sizeConfig[currentSize]

    // For full variant, center is the geometric center of the SVG
    // For semicircle/meter, center is pushed up so the arc+needle fits in the half-height canvas
    const centerX = config.width / 2
    const centerY =
      resolvedVariant === 'full'
        ? config.height / 2
        : config.radius + config.strokeWidth + 5

    const needleLength = config.radius - 8

    // Convert a percentage (0–100) along the arc to an SVG angle in radians
    const percentToAngleRad = (pct: number) => {
      const deg = arcConfig.arcStartDeg + (pct * arcConfig.sweepDeg) / 100
      return deg * (Math.PI / 180)
    }

    // Create an SVG arc path segment between two percentages on the gauge track
    const createArcPath = (startPercent: number, endPercent: number, radius: number) => {
      const startAngle = percentToAngleRad(startPercent)
      const endAngle = percentToAngleRad(endPercent)

      const startX = centerX + radius * Math.cos(startAngle)
      const startY = centerY + radius * Math.sin(startAngle)
      const endX = centerX + radius * Math.cos(endAngle)
      const endY = centerY + radius * Math.sin(endAngle)

      const sweepDelta = endPercent - startPercent
      const sweepAngle = (sweepDelta / 100) * arcConfig.sweepDeg
      const largeArcFlag = sweepAngle > 180 ? 1 : 0

      return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
    }

    // Needle angle: percentage along the sweep, converted to an absolute SVG rotation
    // The needle points upward (the line is drawn rightward then rotated)
    const needleAngle = arcConfig.arcStartDeg + (percentage * arcConfig.sweepDeg) / 100

    // Tick marks: semicircle/full use 5 ticks at 0/25/50/75/100 %
    // meter variant gets denser ticks at every 10%
    const tickPercentages =
      resolvedVariant === 'meter'
        ? [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        : [0, 25, 50, 75, 100]

    return (
      <div
        ref={ref}
        className={cn(gaugeChartVariants({ size, variant }), className)}
        {...props}
      >
        <svg
          width={config.width}
          height={config.height}
          viewBox={`0 0 ${config.width} ${config.height}`}
        >
          {/* Background track */}
          <path
            d={createArcPath(0, 100, config.radius)}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />

          {/* Zone arcs */}
          {zones.map((zone, index) => (
            <path
              key={index}
              d={createArcPath(zone.from, zone.to, config.radius)}
              fill="none"
              stroke={zone.color}
              strokeWidth={config.strokeWidth}
              strokeLinecap="butt"
              className="transition-all duration-300"
            />
          ))}

          {/* Outer border */}
          <path
            d={createArcPath(0, 100, config.radius + config.strokeWidth / 2 + 2)}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Inner border */}
          <path
            d={createArcPath(0, 100, config.radius - config.strokeWidth / 2 - 2)}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {showTicks &&
            tickPercentages.map((tick) => {
              const angle = percentToAngleRad(tick)
              const innerR = config.radius - config.strokeWidth / 2 - 6
              const outerR = config.radius + config.strokeWidth / 2 + 6
              const x1 = centerX + innerR * Math.cos(angle)
              const y1 = centerY + innerR * Math.sin(angle)
              const x2 = centerX + outerR * Math.cos(angle)
              const y2 = centerY + outerR * Math.sin(angle)

              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="2"
                />
              )
            })}

          {/* Needle */}
          <g
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: `${centerX}px ${centerY}px`,
              transition: animated ? 'transform 0.5s ease-out' : 'none',
            }}
          >
            {/* Needle shadow */}
            <line
              x1={centerX + 2}
              y1={centerY + 2}
              x2={centerX + needleLength + 2}
              y2={centerY + 2}
              stroke="hsl(var(--shadow-color))"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Needle body */}
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + needleLength}
              y2={centerY}
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Needle tip */}
            <circle
              cx={centerX + needleLength}
              cy={centerY}
              r="3"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
          </g>

          {/* Center pivot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill="hsl(var(--foreground))"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="3"
            fill="hsl(var(--background))"
          />

          {/* Value display */}
          <text
            x={centerX}
            y={centerY + 20}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontWeight="900"
            fontSize={config.fontSize}
            fontFamily="ui-monospace, monospace"
          >
            {valueFormatter(normalizedValue)}
          </text>

          {/* Label */}
          {label && (
            <text
              x={centerX}
              y={centerY + 20 + config.fontSize}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontWeight="700"
              fontSize={config.labelSize}
              style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {label}
            </text>
          )}

          {/* Min/Max labels — only for semicircle and meter (full variant has no clear endpoints) */}
          {resolvedVariant !== 'full' && (
            <>
              <text
                x={centerX - config.radius - 8}
                y={centerY + 4}
                textAnchor="end"
                fill="hsl(var(--muted-foreground))"
                fontWeight="600"
                fontSize={config.labelSize}
              >
                {min}
              </text>
              <text
                x={centerX + config.radius + 8}
                y={centerY + 4}
                textAnchor="start"
                fill="hsl(var(--muted-foreground))"
                fontWeight="600"
                fontSize={config.labelSize}
              >
                {max}
              </text>
            </>
          )}
        </svg>
      </div>
    )
  }
)
GaugeChart.displayName = 'GaugeChart'

export { GaugeChart, gaugeChartVariants }
