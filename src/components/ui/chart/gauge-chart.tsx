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
    const normalizedValue = Math.max(min, Math.min(max, value))
    const percentage = ((normalizedValue - min) / (max - min)) * 100

    // SVG dimensions based on size - properly calculated to fit content
    const sizeConfig = {
      sm: { width: 140, height: 90, radius: 45, strokeWidth: 10, fontSize: 14, labelSize: 9 },
      md: { width: 180, height: 115, radius: 58, strokeWidth: 12, fontSize: 18, labelSize: 11 },
      lg: { width: 240, height: 150, radius: 76, strokeWidth: 14, fontSize: 22, labelSize: 13 },
    }

    const currentSize = size || 'md'
    const config = sizeConfig[currentSize]

    const centerX = config.width / 2
    const centerY = config.radius + config.strokeWidth + 5 // Position center so arc fits
    const needleLength = config.radius - 8

    // Calculate needle angle (180 degrees for semicircle, from -90 to 90)
    const needleAngle = -90 + (percentage * 180) / 100

    // Calculate arc paths for zones
    const createArcPath = (
      startPercent: number,
      endPercent: number,
      radius: number
    ) => {
      const startAngle = (-90 + (startPercent * 180) / 100) * (Math.PI / 180)
      const endAngle = (-90 + (endPercent * 180) / 100) * (Math.PI / 180)

      const startX = centerX + radius * Math.cos(startAngle)
      const startY = centerY + radius * Math.sin(startAngle)
      const endX = centerX + radius * Math.cos(endAngle)
      const endY = centerY + radius * Math.sin(endAngle)

      const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0

      return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`
    }

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
            [0, 25, 50, 75, 100].map((tick) => {
              const angle = (-90 + (tick * 180) / 100) * (Math.PI / 180)
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

          {/* Min/Max labels */}
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
        </svg>
      </div>
    )
  }
)
GaugeChart.displayName = 'GaugeChart'

export { GaugeChart, gaugeChartVariants }
