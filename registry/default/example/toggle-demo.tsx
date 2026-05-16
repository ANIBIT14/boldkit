import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}