import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from '@/components/ui/empty-state'
import { Inbox, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MyEmptyState() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Inbox className="h-10 w-10" />
      </EmptyStateIcon>
      <EmptyStateTitle>No messages yet</EmptyStateTitle>
      <EmptyStateDescription>
        Your inbox is empty. Send a message to get started.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
export default MyEmptyState