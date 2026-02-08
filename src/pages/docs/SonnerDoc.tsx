import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import { useTheme } from '@/hooks/use-theme'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-3 group-[.toaster]:border-foreground group-[.toaster]:shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-2 group-[.toast]:border-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }`

const usageCode = `import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <Button
      onClick={() => toast('Event has been created')}
    >
      Show Toast
    </Button>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { Toaster as Sonner } from 'vue-sonner'
import { useTheme } from '@/composables/useTheme'

const { resolvedTheme } = useTheme()
</script>

<template>
  <Sonner
    :theme="resolvedTheme"
    class="toaster group"
    :toast-options="{
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-3 group-[.toaster]:border-foreground group-[.toaster]:shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-2 group-[.toast]:border-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-foreground',
      },
    }"
  />
</template>`

const vueUsageCode = `<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui'
</script>

<template>
  <Button @click="toast('Event has been created')">
    Show Toast
  </Button>
</template>`

export function SonnerDoc() {
  return (
    <>
      <ComponentDoc
        name="Sonner"
        description="Toast notifications with bold neubrutalism styling powered by the Sonner library."
        dependencies={['sonner']}
        vueDependencies={['vue-sonner']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
      >
        <Button onClick={() => toast('Event has been created')}>
          Show Toast
        </Button>
      </ComponentDoc>

      {/* Toast Types */}
      <ExampleSection
        title="Types"
        description="Different toast types for various notifications."
        code={`toast('Default toast')
toast.success('Success!')
toast.error('Error occurred')
toast.warning('Warning!')
toast.info('Information')`}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast('Default toast')}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success('Success!')}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.error('Error occurred')}>
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning('Warning!')}>
            Warning
          </Button>
          <Button variant="outline" onClick={() => toast.info('Information')}>
            Info
          </Button>
        </div>
      </ExampleSection>

      {/* With Description */}
      <ExampleSection
        title="With Description"
        description="Toast with a title and description."
        code={`toast('Event Created', {
  description: 'Your event has been scheduled for tomorrow at 3pm.',
})`}
      >
        <Button
          onClick={() =>
            toast('Event Created', {
              description: 'Your event has been scheduled for tomorrow at 3pm.',
            })
          }
        >
          With Description
        </Button>
      </ExampleSection>

      {/* With Action */}
      <ExampleSection
        title="With Action"
        description="Toast with action and cancel buttons."
        code={`toast('Event Created', {
  description: 'Your event has been scheduled.',
  action: {
    label: 'Undo',
    onClick: () => toast.info('Action undone'),
  },
})`}
      >
        <Button
          onClick={() =>
            toast('Event Created', {
              description: 'Your event has been scheduled.',
              action: {
                label: 'Undo',
                onClick: () => toast.info('Action undone'),
              },
            })
          }
        >
          With Action
        </Button>
      </ExampleSection>

      {/* Promise Toast */}
      <ExampleSection
        title="Promise"
        description="Toast that shows loading, success, and error states."
        code={`const promise = new Promise((resolve) =>
  setTimeout(resolve, 2000)
)

toast.promise(promise, {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Error loading data',
})`}
      >
        <Button
          onClick={() => {
            const promise = new Promise((resolve) => setTimeout(resolve, 2000))
            toast.promise(promise, {
              loading: 'Loading...',
              success: 'Data loaded!',
              error: 'Error loading data',
            })
          }}
        >
          Promise Toast
        </Button>
      </ExampleSection>
    </>
  )
}
