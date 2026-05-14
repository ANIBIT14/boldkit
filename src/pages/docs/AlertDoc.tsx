import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal, Trash2 } from 'lucide-react'
import sourceCode from '@/components/ui/alert.tsx?raw'
import vueSourceCode from '@vue-ui/Alert.vue?raw'


const usageCode = `import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
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
}`


const vueUsageCode = `<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@/components/ui'
import { AlertCircle } from 'lucide-vue-next'

function extend() {
  console.log('extend session')
}
</script>

<template>
  <Alert variant="warning">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Session Expiring</AlertTitle>
    <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
    <AlertAction @click="extend">Extend Session</AlertAction>
  </Alert>
</template>`

export function AlertDoc() {
  return (
    <>
      <ComponentDoc
        name="Alert"
        description="Displays a callout for user attention with various severity levels and bold neubrutalism styling."
        dependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={['class-variance-authority']}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <Alert className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
      </ComponentDoc>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="The alert comes with several variants to convey different levels of importance."
        code={`<Alert variant="default">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please be careful.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Here is some information.</AlertDescription>
</Alert>`}
        vueCode={`<template>
  <Alert variant="default">
    <Terminal class="h-4 w-4" />
    <AlertTitle>Default</AlertTitle>
    <AlertDescription>This is a default alert.</AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Something went wrong.</AlertDescription>
  </Alert>

  <Alert variant="success">
    <CheckCircle class="h-4 w-4" />
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Operation completed.</AlertDescription>
  </Alert>

  <Alert variant="warning">
    <AlertTriangle class="h-4 w-4" />
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>Please be careful.</AlertDescription>
  </Alert>

  <Alert variant="info">
    <Info class="h-4 w-4" />
    <AlertTitle>Info</AlertTitle>
    <AlertDescription>Here is some information.</AlertDescription>
  </Alert>
</template>`}
      >
        <div className="space-y-4 max-w-md">
          <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action cannot be undone.</AlertDescription>
          </Alert>

          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Here is some helpful information.</AlertDescription>
          </Alert>
        </div>
      </ExampleSection>

      {/* Without Icon */}
      <ExampleSection
        title="Without Icon"
        description="Alerts can be used without an icon for simpler notifications."
        code={`<Alert>
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>
    This is a simple alert without an icon.
  </AlertDescription>
</Alert>`}
        vueCode={`<template>
  <Alert>
    <AlertTitle>Notice</AlertTitle>
    <AlertDescription>
      This is a simple alert without an icon.
    </AlertDescription>
  </Alert>
</template>`}
      >
        <Alert className="max-w-md">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>
            This is a simple alert without an icon for cleaner layouts.
          </AlertDescription>
        </Alert>
      </ExampleSection>

      {/* Description Only */}
      <ExampleSection
        title="Description Only"
        description="Use just the description for brief inline messages."
        code={`<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertDescription>
    Your session will expire in 5 minutes.
  </AlertDescription>
</Alert>`}
        vueCode={`<template>
  <Alert variant="info">
    <Info class="h-4 w-4" />
    <AlertDescription>
      Your session will expire in 5 minutes.
    </AlertDescription>
  </Alert>
</template>`}
      >
        <Alert variant="info" className="max-w-md">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your session will expire in 5 minutes. Save your work now.
          </AlertDescription>
        </Alert>
      </ExampleSection>

      {/* With Action Button */}
      <ExampleSection
        title="With Action Button"
        description="Pass an optional AlertAction at the end of the alert. It accepts any children — text, icon, or both. Supports loading and disabled states."
        code={`<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Storage Almost Full</AlertTitle>
  <AlertDescription>
    You're using 95% of your storage. Upgrade to keep your files.
  </AlertDescription>
  <AlertAction onClick={() => console.log('upgrade')}>Upgrade Plan</AlertAction>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Delete Account</AlertTitle>
  <AlertDescription>
    This will permanently delete your account and all data.
  </AlertDescription>
  <AlertAction onClick={() => console.log('delete')}>
    <Trash2 className="h-3 w-3" />
    Delete Forever
  </AlertAction>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
  <AlertAction onClick={() => console.log('install')}>Install Now</AlertAction>
</Alert>

<Alert variant="default">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Build Failed</AlertTitle>
  <AlertDescription>The last deployment did not complete.</AlertDescription>
  <AlertAction disabled>Retry</AlertAction>
</Alert>`}
        vueCode={`<template>
  <Alert variant="warning">
    <AlertTriangle class="h-4 w-4" />
    <AlertTitle>Storage Almost Full</AlertTitle>
    <AlertDescription>
      You're using 95% of your storage. Upgrade to keep your files.
    </AlertDescription>
    <AlertAction @click="upgrade">Upgrade Plan</AlertAction>
  </Alert>

  <Alert variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Delete Account</AlertTitle>
    <AlertDescription>
      This will permanently delete your account and all data.
    </AlertDescription>
    <AlertAction @click="deleteAccount">
      <Trash2Icon class="h-3 w-3" />
      Delete Forever
    </AlertAction>
  </Alert>

  <Alert variant="info">
    <Info class="h-4 w-4" />
    <AlertTitle>Update Available</AlertTitle>
    <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
    <AlertAction @click="install">Install Now</AlertAction>
  </Alert>

  <Alert variant="default">
    <Terminal class="h-4 w-4" />
    <AlertTitle>Build Failed</AlertTitle>
    <AlertDescription>The last deployment did not complete.</AlertDescription>
    <AlertAction disabled>Retry</AlertAction>
  </Alert>
</template>`}
      >
        <div className="space-y-4 max-w-md">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription>
              You're using 95% of your storage. Upgrade to keep your files.
            </AlertDescription>
            <AlertAction onClick={() => console.log('upgrade')}>Upgrade Plan</AlertAction>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Delete Account</AlertTitle>
            <AlertDescription>
              This will permanently delete your account and all data.
            </AlertDescription>
            <AlertAction onClick={() => console.log('delete')}>
              <Trash2 className="h-3 w-3" />
              Delete Forever
            </AlertAction>
          </Alert>

          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Update Available</AlertTitle>
            <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
            <AlertAction onClick={() => console.log('install')}>Install Now</AlertAction>
          </Alert>

          <Alert variant="default">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Build Failed</AlertTitle>
            <AlertDescription>The last deployment did not complete.</AlertDescription>
            <AlertAction disabled>Retry</AlertAction>
          </Alert>
        </div>
      </ExampleSection>
    </>
  )
}
