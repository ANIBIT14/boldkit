import { Search } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export default function Example() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon position="leading">
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search components..." />
      <InputGroupAddon position="trailing">⌘K</InputGroupAddon>
    </InputGroup>
  )
}
