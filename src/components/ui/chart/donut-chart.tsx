import * as React from 'react'
import { cn } from '@/lib/utils'
import { Pie, PieChart, Cell, Label } from 'recharts'
import { ChartContainer } from './container'
import { ChartTooltip, ChartTooltipContent } from './tooltip'
import type { ChartConfig } from './types'

export interface DonutChartData {
  name: string
  value: number
  fill?: string
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutChartData[]
  config: ChartConfig
  innerRadius?: string | number
  outerRadius?: string | number
  centerContent?: React.ReactNode
  showLabels?: 'none' | 'inside' | 'outside'
  variant?: 'default' | 'separated'
  showTooltip?: boolean
  animated?: boolean
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      config,
      innerRadius = '60%',
      outerRadius = '80%',
      centerContent,
      showLabels = 'none',
      variant = 'default',
      showTooltip = true,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const paddingAngle = variant === 'separated' ? 4 : 0

    // Calculate total for center content (available for custom center content)
    const _total = React.useMemo(
      () => data.reduce((sum, item) => sum + item.value, 0),
      [data]
    )
    void _total // Used by consumer via centerContent prop

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <PieChart>
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            strokeWidth={3}
            stroke="hsl(var(--foreground))"
            isAnimationActive={animated}
            animationDuration={400}
            label={
              showLabels === 'outside'
                ? ({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''}: ${((percent ?? 0) * 100).toFixed(0)}%`
                : showLabels === 'inside'
                ? ({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`
                : false
            }
            labelLine={showLabels === 'outside'}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || `hsl(var(--chart-${(index % 5) + 1}))`}
              />
            ))}
            {centerContent && (
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <foreignObject
                        x={(viewBox.cx || 0) - 50}
                        y={(viewBox.cy || 0) - 30}
                        width={100}
                        height={60}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          {centerContent}
                        </div>
                      </foreignObject>
                    )
                  }
                  return null
                }}
              />
            )}
          </Pie>
        </PieChart>
      </ChartContainer>
    )
  }
)
DonutChart.displayName = 'DonutChart'

// Helper component for common center content pattern
export interface DonutChartCenterProps {
  value: string | number
  label?: string
  className?: string
}

const DonutChartCenter = React.forwardRef<HTMLDivElement, DonutChartCenterProps>(
  ({ value, label, className }, ref) => {
    return (
      <div ref={ref} className={cn('text-center', className)}>
        <div className="text-2xl font-black">{value}</div>
        {label && (
          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
        )}
      </div>
    )
  }
)
DonutChartCenter.displayName = 'DonutChartCenter'

export { DonutChart, DonutChartCenter }
