import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export default function Example() {
  return (
    <Alert variant="warning">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Session Expiring</AlertTitle>
      <AlertDescription>
        Your session will expire in 5 minutes.
      </AlertDescription>
      <AlertAction onClick={() => console.log('extend')}>
        Extend Session
      </AlertAction>
    </Alert>
  )
}