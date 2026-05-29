import { DonutChart, DonutChartCenter } from '@/components/ui/donut-chart'

const data = [
  { name: 'Chrome', value: 275, fill: 'hsl(var(--primary))' },
  { name: 'Safari', value: 200, fill: 'hsl(var(--secondary))' },
  { name: 'Firefox', value: 187, fill: 'hsl(var(--accent))' },
]

const config = {
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return (
    <DonutChart
      data={data}
      config={config}
      centerContent={<DonutChartCenter value="662" label="Total" />}
    />
  )
}