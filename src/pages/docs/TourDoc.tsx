import { useState } from 'react'
import { Tour, type TourStep } from '@/components/ui/tour'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface TourStep {
  target: string | HTMLElement | React.RefObject<HTMLElement>
  title: string
  description: string
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  spotlightPadding?: number
  content?: React.ReactNode
}

export interface TourProps {
  steps: TourStep[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onComplete?: () => void
  onSkip?: () => void
  showSkipButton?: boolean
  showProgress?: boolean
}

const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  ({ steps, open, onOpenChange, onComplete, onSkip, showSkipButton, showProgress }, ref) => {
    // Implementation with portal, spotlight overlay, and popover
  }
)

export { Tour, useTour }`

const usageCode = `import { Tour, type TourStep } from '@/components/ui/tour'

const steps: TourStep[] = [
  {
    target: '#step-1',
    title: 'Welcome',
    description: 'This is the first step of the tour.',
  },
  {
    target: '#step-2',
    title: 'Features',
    description: 'Here are some features.',
  },
]

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start Tour</Button>
      <Tour steps={steps} open={open} onOpenChange={setOpen} />
    </>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Tour } from '@/components/ui/tour'

const open = ref(false)
const steps = [
  { target: '#step-1', title: 'Welcome', description: 'First step' },
  { target: '#step-2', title: 'Features', description: 'Second step' },
]
</script>

<template>
  <Button @click="open = true">Start Tour</Button>
  <Tour :steps="steps" v-model:open="open" />
</template>`

export function TourDoc() {
  const [tourOpen, setTourOpen] = useState(false)
  const [advancedTourOpen, setAdvancedTourOpen] = useState(false)

  const basicSteps: TourStep[] = [
    {
      target: '#tour-demo-button',
      title: 'Welcome to BoldKit',
      description: 'This is a quick tour to show you around. Click Next to continue.',
      placement: 'bottom',
    },
    {
      target: '#tour-demo-input',
      title: 'Input Field',
      description: 'You can enter text here. Try it out!',
      placement: 'bottom',
    },
    {
      target: '#tour-demo-card',
      title: 'Feature Card',
      description: 'This card displays important information.',
      placement: 'left',
    },
  ]

  const advancedSteps: TourStep[] = [
    {
      target: 'center',
      title: 'Welcome!',
      description: 'This tour will show you the key features. No element is highlighted for this intro step.',
      placement: 'center',
    },
    {
      target: '#advanced-feature-1',
      title: 'Custom Content',
      description: 'Steps can include custom React content.',
      placement: 'right',
      content: (
        <div className="mt-2 p-2 bg-muted border-2 border-foreground">
          <p className="text-xs font-bold">Pro tip:</p>
          <p className="text-xs">You can add any React component here!</p>
        </div>
      ),
    },
    {
      target: '#advanced-feature-2',
      title: 'Custom Padding',
      description: 'The spotlight can have custom padding.',
      placement: 'bottom',
      spotlightPadding: 20,
    },
  ]

  return (
    <>
      <ComponentDoc
        name="Tour"
        description="A step-by-step product tour component with spotlight highlighting, progress indicators, and smooth transitions."
        dependencies={['lucide-react']}
        vueDependencies={['lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Button id="tour-demo-button" onClick={() => setTourOpen(true)}>
              Start Tour
            </Button>
            <Input id="tour-demo-input" placeholder="Type something..." className="max-w-xs" />
          </div>
          <div
            id="tour-demo-card"
            className="p-4 border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))] max-w-sm"
          >
            <h3 className="font-bold uppercase">Feature Card</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This is a sample card that will be highlighted during the tour.
            </p>
          </div>
        </div>

        <Tour
          steps={basicSteps}
          open={tourOpen}
          onOpenChange={setTourOpen}
          onComplete={() => console.log('Tour completed!')}
        />
      </ComponentDoc>

      {/* Basic Usage */}
      <ExampleSection
        title="Basic Usage"
        description="Define steps with target selectors and start the tour."
        code={`const steps = [
  {
    target: '#element-1',
    title: 'First Step',
    description: 'This highlights the first element.',
  },
  {
    target: '#element-2',
    title: 'Second Step',
    description: 'This highlights the second element.',
  },
]

<Button onClick={() => setOpen(true)}>Start Tour</Button>
<Tour steps={steps} open={open} onOpenChange={setOpen} />`}
        vueCode={`<script setup>
const steps = [
  { target: '#element-1', title: 'First Step', description: '...' },
  { target: '#element-2', title: 'Second Step', description: '...' },
]
const open = ref(false)
</script>

<template>
  <Button @click="open = true">Start Tour</Button>
  <Tour :steps="steps" v-model:open="open" />
</template>`}
      >
        <div className="flex gap-4">
          <Button onClick={() => setTourOpen(true)}>Start Tour</Button>
        </div>
      </ExampleSection>

      {/* Placement Options */}
      <ExampleSection
        title="Placement Options"
        description="Position the popover on different sides of the target."
        code={`const steps = [
  { target: '#el', title: 'Top', description: '...', placement: 'top' },
  { target: '#el', title: 'Right', description: '...', placement: 'right' },
  { target: '#el', title: 'Bottom', description: '...', placement: 'bottom' },
  { target: '#el', title: 'Left', description: '...', placement: 'left' },
  { target: 'center', title: 'Center', description: '...', placement: 'center' },
]`}
        vueCode={`const steps = [
  { target: '#el', title: 'Top', description: '...', placement: 'top' },
  { target: '#el', title: 'Right', description: '...', placement: 'right' },
  { target: '#el', title: 'Bottom', description: '...', placement: 'bottom' },
  { target: '#el', title: 'Left', description: '...', placement: 'left' },
  { target: 'center', title: 'Center', description: '...', placement: 'center' },
]`}
      >
        <div className="text-sm text-muted-foreground space-y-2">
          <p><code className="bg-muted px-1">top</code> - Popover above the target</p>
          <p><code className="bg-muted px-1">right</code> - Popover to the right of the target</p>
          <p><code className="bg-muted px-1">bottom</code> - Popover below the target (default)</p>
          <p><code className="bg-muted px-1">left</code> - Popover to the left of the target</p>
          <p><code className="bg-muted px-1">center</code> - Centered on screen, no spotlight</p>
        </div>
      </ExampleSection>

      {/* Advanced Features */}
      <ExampleSection
        title="Advanced Features"
        description="Add custom content, adjust spotlight padding, and use center placement for intro screens."
        code={`const steps = [
  {
    target: 'center',
    title: 'Welcome!',
    description: 'Intro step with no target.',
    placement: 'center',
  },
  {
    target: '#feature',
    title: 'Custom Content',
    description: 'Include custom React content.',
    content: <div>Custom component here</div>,
  },
  {
    target: '#element',
    title: 'Spotlight Padding',
    description: 'Adjust the spotlight area.',
    spotlightPadding: 20,
  },
]`}
        vueCode={`const steps = [
  {
    target: 'center',
    title: 'Welcome!',
    description: 'Intro step with no target.',
    placement: 'center',
  },
  // ...
]`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div
              id="advanced-feature-1"
              className="p-4 border-3 border-foreground bg-primary text-primary-foreground"
            >
              Feature 1
            </div>
            <div
              id="advanced-feature-2"
              className="p-4 border-3 border-foreground bg-secondary text-secondary-foreground"
            >
              Feature 2
            </div>
          </div>
          <Button onClick={() => setAdvancedTourOpen(true)}>
            Start Advanced Tour
          </Button>
          <Tour
            steps={advancedSteps}
            open={advancedTourOpen}
            onOpenChange={setAdvancedTourOpen}
          />
        </div>
      </ExampleSection>

      {/* Callbacks */}
      <ExampleSection
        title="Callbacks"
        description="Handle tour completion and skip events."
        code={`<Tour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  onComplete={() => {
    console.log('Tour completed!')
    // Mark as seen, update user preferences, etc.
  }}
  onSkip={() => {
    console.log('Tour skipped!')
    // Track analytics, show later, etc.
  }}
/>`}
        vueCode={`<template>
  <Tour
    :steps="steps"
    v-model:open="open"
    @complete="handleComplete"
    @skip="handleSkip"
  />
</template>`}
      >
        <div className="text-sm text-muted-foreground space-y-2">
          <p><code className="bg-muted px-1">onComplete</code> - Called when user finishes the tour</p>
          <p><code className="bg-muted px-1">onSkip</code> - Called when user skips the tour</p>
          <p><code className="bg-muted px-1">onOpenChange</code> - Called when tour open state changes</p>
        </div>
      </ExampleSection>

      {/* Options */}
      <ExampleSection
        title="Display Options"
        description="Customize the tour appearance."
        code={`<Tour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  showSkipButton={true}   // Show/hide skip button
  showProgress={true}     // Show/hide progress dots
/>`}
        vueCode={`<template>
  <Tour
    :steps="steps"
    v-model:open="open"
    :show-skip-button="true"
    :show-progress="true"
  />
</template>`}
      >
        <div className="text-sm text-muted-foreground space-y-2">
          <p><code className="bg-muted px-1">showSkipButton</code> - Show "Skip Tour" button (default: true)</p>
          <p><code className="bg-muted px-1">showProgress</code> - Show progress dots (default: true)</p>
        </div>
      </ExampleSection>

      {/* Target Types */}
      <ExampleSection
        title="Target Types"
        description="Target elements using CSS selectors, DOM elements, or refs."
        code={`const buttonRef = useRef<HTMLButtonElement>(null)

const steps = [
  // CSS selector
  { target: '#my-button', title: 'Selector', description: '...' },

  // DOM element
  { target: document.getElementById('my-button')!, title: 'Element', description: '...' },

  // React ref
  { target: buttonRef, title: 'Ref', description: '...' },

  // Center (no target)
  { target: 'center', title: 'Centered', description: '...', placement: 'center' },
]`}
        vueCode={`const buttonRef = ref<HTMLElement>()

const steps = [
  // CSS selector
  { target: '#my-button', title: 'Selector', description: '...' },

  // Template ref
  { target: buttonRef, title: 'Ref', description: '...' },

  // Center (no target)
  { target: 'center', title: 'Centered', description: '...', placement: 'center' },
]`}
      >
        <div className="text-sm text-muted-foreground space-y-2">
          <p><code className="bg-muted px-1">string</code> - CSS selector like "#id" or ".class"</p>
          <p><code className="bg-muted px-1">HTMLElement</code> - Direct DOM element reference</p>
          <p><code className="bg-muted px-1">RefObject</code> - React ref to an element</p>
          <p><code className="bg-muted px-1">"center"</code> - Special value for centered steps</p>
        </div>
      </ExampleSection>
    </>
  )
}
