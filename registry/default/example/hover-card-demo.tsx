import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@boldkit</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>BoldKit - Neubrutalism UI Components</p>
      </HoverCardContent>
    </HoverCard>
  )
}