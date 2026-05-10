import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal, Trash2 } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 bk-shadow animate-in fade-in-0 slide-in-from-top-2 duration-300 transition-all [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn('mb-1 font-bold uppercase tracking-wide leading-none', className)} {...props} />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
))
AlertDescription.displayName = 'AlertDescription'

export interface AlertActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shows an inline spinner and disables the button automatically */
  loading?: boolean
}

const AlertAction = React.forwardRef<HTMLButtonElement, AlertActionProps>(
  ({ className, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      data-alert-action=""
      disabled={disabled || loading}
      className={cn(
        'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
        'rounded-none border border-current',
        'px-3 py-1 text-xs font-bold uppercase tracking-wide',
        'opacity-80 transition-all duration-150',
        'hover:opacity-100 hover:bg-current/10',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className="truncate">{children}</span>
    </button>
  )
)
AlertAction.displayName = 'AlertAction'

export { Alert, AlertTitle, AlertDescription, AlertAction }`

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

const vueSourceCode = `<!-- Alert.vue -->
<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 bk-shadow animate-in fade-in-0 slide-in-from-top-2 duration-300 transition-all [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

type AlertVariants = VariantProps<typeof alertVariants>

defineProps<{
  class?: string
  variant?: AlertVariants['variant']
}>()
</script>

<template>
  <div role="alert" :class="cn(alertVariants({ variant }), $props.class)">
    <slot />
  </div>
</template>

<!-- AlertAction.vue -->
<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: string
    loading?: boolean
    disabled?: boolean
  }>(),
  { loading: false, disabled: false }
)

defineOptions({ inheritAttrs: true })
</script>

<template>
  <button
    v-bind="$attrs"
    data-alert-action=""
    :disabled="props.disabled || props.loading"
    :class="cn(
      'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
      'rounded-none border border-current',
      'px-3 py-1 text-xs font-bold uppercase tracking-wide',
      'opacity-80 transition-all duration-150',
      'hover:opacity-100 hover:bg-current/10 active:scale-95',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
      props.class
    )"
  >
    <span v-if="props.loading" aria-hidden="true"
      class="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <span class="truncate"><slot /></span>
  </button>
</template>`

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
  <AlertAction onClick={() => alert('upgrade')}>Upgrade Plan</AlertAction>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Delete Account</AlertTitle>
  <AlertDescription>
    This will permanently delete your account and all data.
  </AlertDescription>
  <AlertAction onClick={() => alert('delete')}>
    <Trash2 className="h-3 w-3" />
    Delete Forever
  </AlertAction>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
  <AlertAction loading>Installing…</AlertAction>
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
    <AlertAction :loading="true">Installing…</AlertAction>
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
            <AlertAction onClick={() => alert('upgrade')}>Upgrade Plan</AlertAction>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Delete Account</AlertTitle>
            <AlertDescription>
              This will permanently delete your account and all data.
            </AlertDescription>
            <AlertAction onClick={() => alert('delete')}>
              <Trash2 className="h-3 w-3" />
              Delete Forever
            </AlertAction>
          </Alert>

          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Update Available</AlertTitle>
            <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
            <AlertAction loading>Installing…</AlertAction>
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
