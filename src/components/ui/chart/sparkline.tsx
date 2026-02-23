import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts'

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[]
  type?: 'line' | 'area' | 'bar'
  color?: string
  height?: number
  width?: number | string
  showEndDot?: boolean
  strokeWidth?: number
  trend?: 'up' | 'down' | 'neutral'
  animated?: boolean
}

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  (
    {
      data,
      type = 'line',
      color,
      height = 32,
      width = '100%',
      showEndDot = false,
      strokeWidth = 2,
      trend,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    // Convert data array to format recharts expects
    const chartData = data.map((value, index) => ({ value, index }))

    // Determine color based on trend or explicit color
    const resolvedColor = React.useMemo(() => {
      if (color) return color
      if (trend === 'up') return 'hsl(var(--success))'
      if (trend === 'down') return 'hsl(var(--destructive))'
      return 'hsl(var(--primary))'
    }, [color, trend])

    const strokeColor = 'hsl(var(--foreground))'

    if (type === 'bar') {
      return (
        <div
          ref={ref}
          className={cn('inline-block', className)}
          style={{ width, height }}
          {...props}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Bar
                dataKey="value"
                fill={resolvedColor}
                stroke={strokeColor}
                strokeWidth={1}
                isAnimationActive={animated}
                animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    }

    if (type === 'area') {
      return (
        <div
          ref={ref}
          className={cn('inline-block', className)}
          style={{ width, height }}
          {...props}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`sparkline-gradient-${trend || 'default'}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={resolvedColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill={`url(#sparkline-gradient-${trend || 'default'})`}
                isAnimationActive={animated}
                animationDuration={300}
                dot={false}
                activeDot={false}
              />
              {showEndDot && (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="none"
                  dot={(props) => {
                    const { cx, cy, index } = props
                    if (index !== data.length - 1) return null
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={resolvedColor}
                        stroke={strokeColor}
                        strokeWidth={2}
                      />
                    )
                  }}
                  isAnimationActive={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    }

    // Default: line
    return (
      <div
        ref={ref}
        className={cn('inline-block', className)}
        style={{ width, height }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={false}
              isAnimationActive={animated}
              animationDuration={300}
            />
            {showEndDot && (
              <Line
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="none"
                dot={(props) => {
                  const { cx, cy, index } = props
                  if (index !== data.length - 1) return null
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={resolvedColor}
                      stroke={strokeColor}
                      strokeWidth={2}
                    />
                  )
                }}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
Sparkline.displayName = 'Sparkline'

export { Sparkline }
