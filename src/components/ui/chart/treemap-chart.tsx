import * as React from 'react'
import { cn } from '@/lib/utils'
import { Treemap as RechartsTreemap, ResponsiveContainer, Tooltip } from 'recharts'

export interface TreemapChartData {
  name: string
  value?: number
  children?: TreemapChartData[]
  fill?: string
  [key: string]: unknown
}

export interface TreemapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreemapChartData[]
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

interface CustomContentProps {
  x?: number
  y?: number
  width?: number
  height?: number
  name?: string
  value?: number
  depth?: number
  index?: number
}

function CustomTreemapContent(props: CustomContentProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, value, depth = 0, index = 0 } = props
  const fill = NEUBRUTALISM_COLORS[index % NEUBRUTALISM_COLORS.length]
  const isSmall = width < 60 || height < 40

  if (depth === 0) return null

  return (
    <g>
      <rect
        x={x + 2}
        y={y + 2}
        width={width - 4}
        height={height - 4}
        style={{ fill, stroke: 'hsl(var(--foreground))', strokeWidth: 3 }}
      />
      {!isSmall && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - (value !== undefined ? 8 : 0)}
            textAnchor="middle"
            dominantBaseline="central"
            fill="hsl(var(--foreground))"
            style={{ fontFamily: 'inherit', fontSize: Math.min(14, width / 6), fontWeight: 900 }}
          >
            {name}
          </text>
          {value !== undefined && (
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              dominantBaseline="central"
              fill="hsl(var(--foreground))"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: Math.min(11, width / 8), fontWeight: 700, opacity: 0.75 }}
            >
              {value.toLocaleString()}
            </text>
          )}
        </>
      )}
    </g>
  )
}

const TreemapChart = React.forwardRef<HTMLDivElement, TreemapChartProps>(
  (
    {
      data,
      showTooltip = true,
      animated = true,
      height = 320,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        style={{ height }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsTreemap
            data={data}
            dataKey="value"
            aspectRatio={4 / 3}
            isAnimationActive={animated}
            animationDuration={400}
            content={<CustomTreemapContent />}
          >
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
                formatter={(value: number | undefined, name: string) => [`${(value ?? 0).toLocaleString()}`, name]}
              />
            )}
          </RechartsTreemap>
        </ResponsiveContainer>
      </div>
    )
  }
)
TreemapChart.displayName = 'TreemapChart'

export { TreemapChart }
