import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <Button
      onClick={() => toast('Event has been created')}
    >
      Show Toast
    </Button>
  )
}