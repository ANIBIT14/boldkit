import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChartContext, THEMES, type ChartConfig } from './types'

export const chartContainerVariants = cva(
  'flex aspect-video justify-center text-xs overflow-hidden [&_.recharts-cartesian-axis-tick_text]:fill-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-muted-foreground/30 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-muted-foreground [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-foreground [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-foreground [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke="#fff"]]:stroke-foreground [&_.recharts-surface]:outline-hidden [&_.recharts-layer_path]:[fill-opacity:1] [&_.recharts-layer_path]:[stroke-width:3] [&_.recharts-layer_path]:[stroke:hsl(var(--foreground))]',
  {
    variants: {
      variant: {
        default: 'border-3 border-foreground bg-background p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        elevated: 'border-3 border-foreground bg-background p-4 shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:shadow-[8px_8px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all',
        flat: 'border-3 border-foreground bg-background p-4',
        filled: 'border-3 border-foreground bg-muted/30 p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        minimal: 'bg-background p-4',
        accent: 'border-3 border-foreground bg-accent/10 p-4 shadow-[4px_4px_0px_hsl(var(--accent))]',
        primary: 'border-3 border-foreground bg-primary/10 p-4 shadow-[4px_4px_0px_hsl(var(--primary))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ChartContainerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof chartContainerVariants> {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children']
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  variant,
  ...props
}: ChartContainerProps) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(chartContainerVariants({ variant }), className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

export function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, configItem]) => configItem.theme || configItem.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  )
}
