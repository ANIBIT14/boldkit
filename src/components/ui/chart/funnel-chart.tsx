import * as React from 'react'
import { cn } from '@/lib/utils'
import { FunnelChart as RechartsFC, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts'

export interface FunnelChartData {
  name: string
  value: number
  fill?: string
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FunnelChartData[]
  showLabels?: boolean
  showTooltip?: boolean
  animated?: boolean
  height?: number
}

const NEUBRUTALISM_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--warning))',
]

const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (
    {
      data,
      showLabels = true,
      showTooltip = true,
      animated = true,
      height = 300,
      className,
      ...props
    },
    ref
  ) => {
    const coloredData = data.map((d, i) => ({
      ...d,
      fill: d.fill || NEUBRUTALISM_COLORS[i % NEUBRUTALISM_COLORS.length],
    }))

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        style={{ height }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFC>
            <Funnel
              dataKey="value"
              data={coloredData}
              isAnimationActive={animated}
              animationDuration={400}
              stroke="hsl(var(--foreground))"
              strokeWidth={3}
            >
              {showLabels && (
                <LabelList
                  position="right"
                  fill="hsl(var(--foreground))"
                  stroke="none"
                  dataKey="name"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700 }}
                />
              )}
            </Funnel>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  border: '3px solid hsl(var(--foreground))',
                  borderRadius: 0,
                  boxShadow: '4px 4px 0px hsl(var(--foreground))',
                  background: 'hsl(var(--background))',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                }}
                formatter={(value: number | undefined, name: string | undefined) => [`${(value ?? 0).toLocaleString()}`, name ?? '']}
              />
            )}
          </RechartsFC>
        </ResponsiveContainer>
      </div>
    )
  }
)
FunnelChart.displayName = 'FunnelChart'

export { FunnelChart }
