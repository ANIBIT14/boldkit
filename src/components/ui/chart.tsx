// Re-export all chart components from the chart directory
// This maintains backward compatibility with existing imports

export {
  // Types and context
  ChartContext,
  useChart,
  THEMES,
  // Palettes and color helpers
  CHART_PALETTES,
  getChartColor,
  createChartConfig,
  // Container components
  ChartContainer,
  ChartStyle,
  chartContainerVariants,
  // Tooltip components
  ChartTooltip,
  ChartTooltipContent,
  // Legend components
  ChartLegend,
  ChartLegendContent,
  // Utility functions
  getPayloadConfigFromPayload,
} from './chart/index'

export type {
  ChartConfig,
  ChartContextProps,
  ChartPalette,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
} from './chart/index'
