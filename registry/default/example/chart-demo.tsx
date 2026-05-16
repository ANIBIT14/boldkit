import { createChartConfig, CHART_PALETTES } from "@/components/ui/chart"

export default function ChartDemo() {
  const config = createChartConfig(["Revenue", "Expenses", "Profit"], "bold")
  return (
    <pre className="p-4 border-3 border-foreground bg-muted">
      {JSON.stringify(config, null, 2)}
    </pre>
  )
}
