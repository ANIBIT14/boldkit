import { SankeyChart } from "@/components/ui/sankey-chart"

export default function SankeyChartDemo() {
  return (
    <SankeyChart
      nodes={[
        { name: "Source A" },
        { name: "Source B" },
        { name: "Target X" },
        { name: "Target Y" },
      ]}
      links={[
        { source: 0, target: 2, value: 5 },
        { source: 0, target: 3, value: 3 },
        { source: 1, target: 2, value: 2 },
        { source: 1, target: 3, value: 7 },
      ]}
    />
  )
}
