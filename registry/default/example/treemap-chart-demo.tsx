import { TreemapChart } from "@/components/ui/chart/treemap-chart"

export default function TreemapChartDemo() {
  return (
    <TreemapChart
      data={[
        { name: "React", value: 400 },
        { name: "Vue", value: 300 },
        { name: "Angular", value: 200 },
        { name: "Svelte", value: 100 },
      ]}
    />
  )
}
