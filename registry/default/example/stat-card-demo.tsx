import { StatCard } from '@/components/ui/stat-card'
import { DollarSign } from 'lucide-react'

export default function Example() {
  return (
    <StatCard
      title="Total Revenue"
      value="$45,231"
      change="+20.1%"
      trend="up"
      icon={<DollarSign className="h-6 w-6" />}
      color="success"
    />
  )
}