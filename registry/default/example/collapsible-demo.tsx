import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">
          Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="border-3 border-foreground p-4">
          Collapsible content here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}