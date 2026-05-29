import { FunnelChart } from "@/components/ui/funnel-chart"

export default function FunnelChartDemo() {
  return (
    <FunnelChart
      data={[
        { name: "Visitors", value: 5000 },
        { name: "Leads", value: 3000 },
        { name: "Prospects", value: 1500 },
        { name: "Customers", value: 800 },
      ]}
    />
  )
}
