import { Sparkline } from '@/components/ui/sparkline'

export default function Example() {
  const data = [10, 15, 8, 20, 14, 25, 18, 30]

  return <Sparkline data={data} />
}