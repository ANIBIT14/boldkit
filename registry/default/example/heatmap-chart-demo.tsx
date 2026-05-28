import { HeatmapChart } from "@/components/ui/chart/heatmap-chart"

export default function HeatmapChartDemo() {
  return (
    <HeatmapChart
      data={[
        { x: "Mon", y: "9am", value: 5 },
        { x: "Mon", y: "12pm", value: 8 },
        { x: "Tue", y: "9am", value: 3 },
        { x: "Tue", y: "12pm", value: 9 },
        { x: "Wed", y: "9am", value: 7 },
        { x: "Wed", y: "12pm", value: 4 },
      ]}
    />
  )
}
