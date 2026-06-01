import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChartEmpty } from './chart'

export interface HeatmapCellData {
  row: string
  col: string
  value: number
}

export interface HeatmapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapCellData[]
  rows: string[]
  cols: string[]
  /** CSS color at 0 intensity (default: transparent primary) */
  colorLow?: string
  /** CSS color at max intensity (default: primary) */
  colorHigh?: string
  showLabels?: boolean
  showTooltip?: boolean
  cellSize?: number
  /** Accessible label for screen readers (default: "Heatmap chart") */
  ariaLabel?: string
  /** Fires when a cell is clicked or activated via keyboard (Enter/Space). */
  onCellClick?: (cell: HeatmapCellData) => void
  emptyState?: React.ReactNode
}

function interpolateOpacity(value: number, min: number, max: number): number {
  if (max === min) return 0.5
  return (value - min) / (max - min)
}

/**
 * Compute cell background color from colorLow → colorHigh using CSS color-mix(),
 * which works with any valid CSS color string including hsl(var(--*)) tokens.
 * Falls back to primary-opacity when custom colors are not provided.
 */
function getCellColor(
  intensity: number,
  colorLow: string | undefined,
  colorHigh: string | undefined
): string {
  if (colorLow && colorHigh) {
    // color-mix interpolates in srgb space: at t=0 we want colorLow, at t=1 we want colorHigh.
    // color-mix(in srgb, colorHigh <t*100>%, colorLow) gives us colorHigh at t=1 and colorLow at t=0.
    const pct = Math.round(Math.max(0, Math.min(1, intensity)) * 100)
    return `color-mix(in srgb, ${colorHigh} ${pct}%, ${colorLow})`
  }
  // Default: vary opacity of primary from 0.08 (low) to 1 (high)
  return `hsl(var(--primary) / ${Math.max(0.08, intensity)})`
}

const HeatmapChart = React.forwardRef<HTMLDivElement, HeatmapChartProps>(
  (
    {
      data,
      rows,
      cols,
      colorLow,
      colorHigh,
      showLabels = true,
      showTooltip = true,
      cellSize = 40,
      ariaLabel = 'Heatmap chart',
      onCellClick,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    const [tooltip, setTooltip] = React.useState<{ x: number; y: number; row: string; col: string; value: number } | null>(null)
    const isInteractive = !!onCellClick
    const cellTabIndex = showTooltip || isInteractive ? 0 : undefined

    const valueMap = React.useMemo(() => {
      const map = new Map<string, number>()
      data.forEach(d => map.set(`${d.row}__${d.col}`, d.value))
      return map
    }, [data])

    const { min, max } = React.useMemo(() => {
      if (data.length === 0) return { min: 0, max: 1 }
      // Reduce instead of Math.min(...vals) spread: the spread passes every
      // value as a function argument and throws RangeError on very large datasets.
      let min = data[0].value
      let max = data[0].value
      for (const d of data) {
        if (d.value < min) min = d.value
        if (d.value > max) max = d.value
      }
      return { min, max }
    }, [data])

    const labelWidth = showLabels ? 72 : 8
    const headerHeight = showLabels ? 32 : 8

    if (!data || data.length === 0) {
      return <ChartEmpty ref={ref} message={emptyState} className={className} {...props} />
    }

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
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
          {cols.map(col =>
            showLabels ? (
              <div
                key={col}
                className="flex items-end justify-center pb-1"
                style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}
              >
                <span style={{ transform: 'rotate(-45deg)', transformOrigin: 'bottom center', whiteSpace: 'nowrap' }}>
                  {col}
                </span>
              </div>
            ) : (
              <div key={col} />
            )
          )}

          {/* Rows */}
          {rows.map(row => (
            <React.Fragment key={row}>
              {/* Row label */}
              {showLabels ? (
                <div
                  className="flex items-center pr-2 text-right"
                  style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700, justifyContent: 'flex-end' }}
                >
                  {row}
                </div>
              ) : (
                <div />
              )}

              {/* Cells */}
              {cols.map(col => {
                const value = valueMap.get(`${row}__${col}`) ?? 0
                const intensity = interpolateOpacity(value, min, max)

                return (
                  <div
                    key={col}
                    role={isInteractive ? 'button' : undefined}
                    aria-label={isInteractive ? `${row}, ${col}: ${value}` : undefined}
                    tabIndex={cellTabIndex}
                    className={cn(
                      'border border-foreground/30 transition-all duration-100 hover:border-foreground hover:border-2 hover:z-10 focus:border-foreground focus:border-2 focus:z-10 focus:outline-none',
                      isInteractive ? 'cursor-pointer' : 'cursor-default'
                    )}
                    style={{
                      backgroundColor: getCellColor(intensity, colorLow, colorHigh),
                    }}
                    onMouseEnter={(e) => {
                      if (showTooltip) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltip({ x: rect.left + rect.width / 2, y: rect.top, row, col, value })
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={(e) => {
                      if (showTooltip) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltip({ x: rect.left + rect.width / 2, y: rect.top, row, col, value })
                      }
                    }}
                    onBlur={() => setTooltip(null)}
                    onClick={onCellClick ? () => onCellClick({ row, col, value }) : undefined}
                    onKeyDown={
                      onCellClick
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              onCellClick({ row, col, value })
                            }
                          }
                        : undefined
                    }
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
            style={{
              left: Math.min(
                Math.max(tooltip.x, 100),
                (typeof window !== 'undefined' ? window.innerWidth : 1024) - 100
              ),
              top: Math.min(
                Math.max(tooltip.y - 64 < 0 ? tooltip.y + 10 : tooltip.y - 64, 10),
                (typeof window !== 'undefined' ? window.innerHeight : 768) - 60
              ),
              transform: 'translateX(-50%)',
              maxWidth: 200,
            }}
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
