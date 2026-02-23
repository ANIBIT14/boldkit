import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts'
import { ChartContainer } from './container'
import { ChartTooltip, ChartTooltipContent } from './tooltip'
import { ChartLegend, ChartLegendContent } from './legend'
import type { ChartConfig } from './types'

export interface RadialBarChartData {
  name: string
  value: number
  fill?: string
}

export interface RadialBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadialBarChartData[]
  config: ChartConfig
  variant?: 'default' | 'stacked' | 'nested'
  innerRadius?: string | number
  outerRadius?: string | number
  showLabel?: boolean
  showBackground?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  startAngle?: number
  endAngle?: number
  animated?: boolean
  maxValue?: number
}

const RadialBarChartComponent = React.forwardRef<HTMLDivElement, RadialBarChartProps>(
  (
    {
      data,
      config,
      variant = 'default',
      innerRadius = '30%',
      outerRadius = '100%',
      showLabel = true,
      showBackground = true,
      showLegend = false,
      showTooltip = true,
      startAngle = 90,
      endAngle = -270,
      animated = true,
      maxValue,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate max value for the scale
    const calculatedMax = maxValue || Math.max(...data.map((d) => d.value))

    // Transform data for nested variant (each item gets its own ring)
    const chartData = React.useMemo(() => {
      if (variant === 'nested') {
        return data.map((item, index) => ({
          ...item,
          fill: item.fill || `hsl(var(--chart-${(index % 5) + 1}))`,
        }))
      }
      return data.map((item, index) => ({
        ...item,
        fill: item.fill || `hsl(var(--chart-${(index % 5) + 1}))`,
      }))
    }, [data, variant])

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <RechartsRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          data={chartData}
          startAngle={startAngle}
          endAngle={endAngle}
          barSize={variant === 'nested' ? 15 : 20}
        >
          {showBackground && (
            <PolarAngleAxis
              type="number"
              domain={[0, calculatedMax]}
              angleAxisId={0}
              tick={false}
            />
          )}
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
          )}
          <RadialBar
            dataKey="value"
            background={showBackground ? { fill: 'hsl(var(--muted))' } : undefined}
            cornerRadius={0}
            isAnimationActive={animated}
            animationDuration={400}
            label={
              showLabel
                ? {
                    position: 'insideStart',
                    fill: 'hsl(var(--foreground))',
                    fontWeight: 700,
                    fontSize: 12,
                  }
                : false
            }
          />
          {showLegend && (
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              verticalAlign="bottom"
            />
          )}
        </RechartsRadialBarChart>
      </ChartContainer>
    )
  }
)
RadialBarChartComponent.displayName = 'RadialBarChart'

export { RadialBarChartComponent as RadialBarChart }
