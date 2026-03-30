import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HeatmapCellData {
  row: string
  col: string
  value: number
}

export interface HeatmapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapCellData[]
  rows: string[]
  cols: string[]
  /** CSS color at 0 intensity (default: muted) */
  colorLow?: string
  /** CSS color at max intensity (default: primary) */
  colorHigh?: string
  showLabels?: boolean
  showTooltip?: boolean
  cellSize?: number
}

function interpolateOpacity(value: number, min: number, max: number): number {
  if (max === min) return 0.5
  return (value - min) / (max - min)
}

const HeatmapChart = React.forwardRef<HTMLDivElement, HeatmapChartProps>(
  (
    {
      data,
      rows,
      cols,
      showLabels = true,
      showTooltip = true,
      cellSize = 40,
      className,
      ...props
    },
    ref
  ) => {
    const [tooltip, setTooltip] = React.useState<{ x: number; y: number; row: string; col: string; value: number } | null>(null)

    const valueMap = React.useMemo(() => {
      const map = new Map<string, number>()
      data.forEach(d => map.set(`${d.row}__${d.col}`, d.value))
      return map
    }, [data])

    const { min, max } = React.useMemo(() => {
      const vals = data.map(d => d.value)
      return { min: Math.min(...vals), max: Math.max(...vals) }
    }, [data])

    const labelWidth = showLabels ? 72 : 8
    const headerHeight = showLabels ? 32 : 8

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-x-auto', className)}
        {...props}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${labelWidth}px repeat(${cols.length}, ${cellSize}px)`,
            gridTemplateRows: `${headerHeight}px repeat(${rows.length}, ${cellSize}px)`,
            width: 'fit-content',
          }}
        >
          {/* Top-left empty corner */}
          <div />

          {/* Column headers */}
          {showLabels && cols.map(col => (
            <div
              key={col}
              className="flex items-end justify-center pb-1"
              style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}
            >
              <span style={{ transform: 'rotate(-45deg)', transformOrigin: 'bottom center', whiteSpace: 'nowrap' }}>
                {col}
              </span>
            </div>
          ))}

          {/* Rows */}
          {rows.map(row => (
            <React.Fragment key={row}>
              {/* Row label */}
              {showLabels && (
                <div
                  className="flex items-center pr-2 text-right"
                  style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700, justifyContent: 'flex-end' }}
                >
                  {row}
                </div>
              )}

              {/* Cells */}
              {cols.map(col => {
                const value = valueMap.get(`${row}__${col}`) ?? 0
                const intensity = interpolateOpacity(value, min, max)

                return (
                  <div
                    key={col}
                    className="border border-foreground/30 cursor-default transition-all duration-100 hover:border-foreground hover:border-2 hover:z-10"
                    style={{
                      backgroundColor: `hsl(var(--primary) / ${Math.max(0.08, intensity)})`,
                    }}
                    onMouseEnter={(e) => {
                      if (showTooltip) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltip({ x: rect.left + rect.width / 2, y: rect.top, row, col, value })
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Tooltip */}
        {showTooltip && tooltip && (
          <div
            className="fixed z-50 pointer-events-none border-3 border-foreground bg-background px-3 py-2 text-xs font-mono shadow-[4px_4px_0px_hsl(var(--foreground))]"
            style={{ left: tooltip.x, top: tooltip.y - 56, transform: 'translateX(-50%)' }}
          >
            <p className="font-black">{tooltip.row} × {tooltip.col}</p>
            <p className="text-muted-foreground">{tooltip.value}</p>
          </div>
        )}
      </div>
    )
  }
)
HeatmapChart.displayName = 'HeatmapChart'

export { HeatmapChart }
