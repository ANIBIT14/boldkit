import { useState } from 'react'
import { Toaster, toast, type ToastPosition } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/toast.tsx?raw'
import vueToasterSource from '@vue-ui/Toaster.vue?raw'
import vueToastStackSource from '@vue-ui/ToastStack.vue?raw'
import vueToastSource from '@vue-ui/toast.ts?raw'

const vueSourceCode = [
  `<!-- components/ui/Toaster.vue -->\n${vueToasterSource}`,
  `<!-- components/ui/ToastStack.vue -->\n${vueToastStackSource}`,
  `// components/ui/toast.ts\n${vueToastSource}`,
].join('\n\n')

const usageCode = `import { Toaster, toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

// Mount <Toaster /> once, near the root of your app.
export default function App() {
  return (
    <>
      <Button
        onClick={() =>
          toast({ title: 'Event created', description: 'Friday, 3pm — Room 4' })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import Toaster from '@/components/ui/Toaster.vue'
import Button from '@/components/ui/Button.vue'
import { toast } from '@/components/ui/toast'
</script>

<template>
  <!-- Mount <Toaster /> once, near the root of your app. -->
  <Button @click="toast({ title: 'Event created', description: 'Friday, 3pm — Room 4' })">
    Show Toast
  </Button>
  <Toaster />
</template>`

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

const sleep = (ms: number, fail = false) =>
  new Promise<string>((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error('Network down')) : resolve('report.pdf')), ms)
  )

export function ToastDoc() {
  const [position, setPosition] = useState<ToastPosition>('bottom-right')

  return (
    <>
      {/* This page's own viewport — the site-wide <Toaster /> in App.tsx is Sonner's. */}
      <Toaster position={position} />

      <ComponentDoc
        name="Toast"
        description="First-party brutalist toast stacks with an imperative API. Toasts pile up like offset paper cards and fan out on hover. Built on Radix Toast (React) and Reka UI Toast (Vue) — no Sonner dependency."
        dependencies={['radix-ui', 'lucide-react']}
        vueDependencies={['reka-ui', '@lucide/vue']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
      >
        <Button
          onClick={() => toast({ title: 'Event created', description: 'Friday, 3pm — Room 4' })}
        >
          Show Toast
        </Button>
      </ComponentDoc>

      {/* Toast vs Sonner */}
      <section className="mt-12 border-3 border-foreground bg-muted p-6 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
        <h2 className="mb-2 text-xl font-black uppercase tracking-wide">Toast vs Sonner</h2>
        <p className="text-sm font-medium">
          <strong>Sonner</strong> is a styled skin over the <code>sonner</code> / <code>vue-sonner</code> libraries
          — pick it if you already use Sonner or want its feature set. <strong>Toast</strong> is BoldKit&apos;s own
          implementation on the Radix / Reka primitives you already ship: hard-edged paper-pile stacking,
          variant icon blocks, and a small API (<code>toast()</code>, <code>.success/.error/.warning/.info</code>,{' '}
          <code>.promise</code>, <code>.dismiss</code>) with one fewer dependency. Both can live in the same app;
          mount only one <code>&lt;Toaster /&gt;</code> of each.
        </p>
      </section>

      {/* Variants */}
      <ExampleSection
        title="Variants"
        description="Variants colour the icon block on the left edge. Errors are announced assertively; everything else politely."
        code={`toast({ title: 'Default toast' })
toast.success('Changes saved')
toast.error('Payment failed', { description: 'Card was declined.' })
toast.warning('Storage almost full')
toast.info('New version available')`}
        vueCode={`<script setup lang="ts">
import { toast } from '@/components/ui/toast'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button variant="outline" @click="toast({ title: 'Default toast' })">Default</Button>
    <Button variant="outline" @click="toast.success('Changes saved')">Success</Button>
    <Button variant="outline" @click="toast.error('Payment failed', { description: 'Card was declined.' })">Error</Button>
    <Button variant="outline" @click="toast.warning('Storage almost full')">Warning</Button>
    <Button variant="outline" @click="toast.info('New version available')">Info</Button>
  </div>
</template>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast({ title: 'Default toast' })}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success('Changes saved')}>
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error('Payment failed', { description: 'Card was declined.' })}
          >
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning('Storage almost full')}>
            Warning
          </Button>
          <Button variant="outline" onClick={() => toast.info('New version available')}>
            Info
          </Button>
        </div>
      </ExampleSection>

      {/* Action */}
      <ExampleSection
        title="With Action"
        description="One action button per toast. Clicking it runs your handler and closes the toast."
        code={`toast({
  title: 'Message archived',
  description: '1 conversation moved to Archive.',
  action: {
    label: 'Undo',
    onClick: () => toast.success('Restored'),
  },
})`}
        vueCode={`<script setup lang="ts">
import { toast } from '@/components/ui/toast'
import Button from '@/components/ui/Button.vue'

function archive() {
  toast({
    title: 'Message archived',
    description: '1 conversation moved to Archive.',
    action: {
      label: 'Undo',
      onClick: () => toast.success('Restored'),
    },
  })
}
</script>

<template>
  <Button @click="archive">Archive</Button>
</template>`}
      >
        <Button
          onClick={() =>
            toast({
              title: 'Message archived',
              description: '1 conversation moved to Archive.',
              action: { label: 'Undo', onClick: () => toast.success('Restored') },
            })
          }
        >
          Archive
        </Button>
      </ExampleSection>

      {/* Promise */}
      <ExampleSection
        title="Promise"
        description="A loading toast that turns into success or error in place when the promise settles. Loading toasts never auto-dismiss."
        code={`toast.promise(uploadReport(), {
  loading: 'Uploading report…',
  success: (file) => \`Uploaded \${file}\`,
  error: (err) => \`Upload failed: \${err.message}\`,
})`}
        vueCode={`<script setup lang="ts">
import { toast } from '@/components/ui/toast'
import Button from '@/components/ui/Button.vue'

function upload() {
  toast.promise(uploadReport(), {
    loading: 'Uploading report…',
    success: (file) => \`Uploaded \${file}\`,
    error: (err) => \`Upload failed: \${(err as Error).message}\`,
  })
}
</script>

<template>
  <Button @click="upload">Upload</Button>
</template>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast.promise(sleep(2000), {
                loading: 'Uploading report…',
                success: (file) => `Uploaded ${file}`,
                error: (err) => `Upload failed: ${(err as Error).message}`,
              })
            }
          >
            Upload (succeeds)
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(sleep(2000, true), {
                loading: 'Uploading report…',
                success: (file) => `Uploaded ${file}`,
                error: (err) => `Upload failed: ${(err as Error).message}`,
              })
            }
          >
            Upload (fails)
          </Button>
        </div>
      </ExampleSection>

      {/* Stacking */}
      <ExampleSection
        title="Stacking"
        description="Fire a few: older toasts peek out behind the newest as offset cards. Hover or focus the stack (F8) to fan it out — timers pause while you do, and while the window is in the background. Swipe a toast toward the screen edge to dismiss it. Only `max` (default 3) stay open; older ones are dropped."
        code={`const messages = ['Build queued', 'Tests passed', 'Preview deployed', 'Promoted to production']
messages.forEach((title, i) => setTimeout(() => toast({ title }), i * 250))

// <Toaster max={3} />`}
        vueCode={`<script setup lang="ts">
import { toast } from '@/components/ui/toast'
import Button from '@/components/ui/Button.vue'

const messages = ['Build queued', 'Tests passed', 'Preview deployed', 'Promoted to production']

function fire() {
  messages.forEach((title, i) => setTimeout(() => toast({ title }), i * 250))
}
</script>

<template>
  <Button @click="fire">Fire 4 toasts</Button>
  <!-- <Toaster :max="3" /> -->
</template>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              ['Build queued', 'Tests passed', 'Preview deployed', 'Promoted to production'].forEach(
                (title, i) => setTimeout(() => toast({ title }), i * 250)
              )
            }
          >
            Fire 4 toasts
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </div>
      </ExampleSection>

      {/* Positions */}
      <ExampleSection
        title="Positions"
        description="Set `position` on the Toaster. Swipe-to-dismiss follows the nearest edge (left positions swipe left)."
        code={`<Toaster position="top-center" />`}
        vueCode={`<template>
  <Toaster position="top-center" />
</template>`}
      >
        <div className="flex flex-wrap gap-2">
          {positions.map((p) => (
            <Button
              key={p}
              variant={p === position ? 'default' : 'outline'}
              onClick={() => {
                toast.dismiss()
                setPosition(p)
                toast({ title: p, description: `Toaster position="${p}"` })
              }}
            >
              {p}
            </Button>
          ))}
        </div>
      </ExampleSection>
    </>
  )
}
