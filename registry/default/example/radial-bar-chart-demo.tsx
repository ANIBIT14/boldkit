import { RadialBarChart } from '@/components/ui/radial-bar-chart'

const data = [
  { name: 'Progress', value: 75, fill: 'hsl(var(--primary))' },
  { name: 'Goals', value: 60, fill: 'hsl(var(--secondary))' },
  { name: 'Tasks', value: 45, fill: 'hsl(var(--accent))' },
]

const config = {
  progress: { label: 'Progress', color: 'hsl(var(--primary))' },
  goals: { label: 'Goals', color: 'hsl(var(--secondary))' },
  tasks: { label: 'Tasks', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return <RadialBarChart data={data} config={config} />
}