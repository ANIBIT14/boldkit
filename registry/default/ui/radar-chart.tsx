import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from './chart'

export interface RadarChartData {
  subject: string
  [key: string]: number | string
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadarChartData[]
  dataKeys: string[]
  config: ChartConfig
  variant?: 'default' | 'filled' | 'outlined'
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  fillOpacity?: number
  animated?: boolean
}

const RadarChartComponent = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      data,
      dataKeys,
      config,
      variant = 'default',
      showLegend = true,
      showGrid = true,
      showTooltip = true,
      fillOpacity = 0.6,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const getRadarProps = (index: number, key: string) => {
      const baseColor = config[key]?.color || `hsl(var(--chart-${(index % 5) + 1}))`

      switch (variant) {
        case 'outlined':
          return {
            fill: 'transparent',
            fillOpacity: 0,
            stroke: baseColor,
            strokeWidth: 3,
          }
        case 'filled':
          return {
            fill: baseColor,
            fillOpacity: fillOpacity,
            stroke: 'hsl(var(--foreground))',
            strokeWidth: 3,
          }
        default:
          return {
            fill: baseColor,
            fillOpacity: fillOpacity,
            stroke: 'hsl(var(--foreground))',
            strokeWidth: 3,
          }
      }
    }

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {showGrid && (
            <PolarGrid
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              strokeDasharray="none"
            />
          )}
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: 'hsl(var(--foreground))',
              fontWeight: 700,
              fontSize: 12,
            }}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 'auto']}
            tick={{
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
            axisLine={false}
          />
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
          )}
          {dataKeys.map((key, index) => (
            <Radar
              key={key}
              name={config[key]?.label?.toString() || key}
              dataKey={key}
              {...getRadarProps(index, key)}
              isAnimationActive={animated}
              animationDuration={400}
              dot={{
                r: 4,
                fill: config[key]?.color || `hsl(var(--chart-${(index % 5) + 1}))`,
                stroke: 'hsl(var(--foreground))',
                strokeWidth: 2,
              }}
            />
          ))}
          {showLegend && (
            <ChartLegend content={<ChartLegendContent />} />
          )}
        </RechartsRadarChart>
      </ChartContainer>
    )
  }
)
RadarChartComponent.displayName = 'RadarChart'

export { RadarChartComponent as RadarChart }
