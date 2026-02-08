import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'
import { useChart } from './types'
import { getPayloadConfigFromPayload } from './utils'

export const ChartLegend = RechartsPrimitive.Legend

export interface ChartLegendContentProps extends React.ComponentProps<'div'> {
  payload?: Array<{
    value?: string
    dataKey?: string
    color?: string
  }>
  verticalAlign?: 'top' | 'bottom'
  hideIcon?: boolean
  nameKey?: string
}

export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 font-bold uppercase tracking-wide',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={cn(
              'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-foreground'
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-3 w-3 shrink-0 border-2 border-foreground"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <span className="text-sm">{itemConfig?.label}</span>
          </div>
        )
      })}
    </div>
  )
}
