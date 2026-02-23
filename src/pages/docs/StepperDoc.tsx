import { useState } from 'react'
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
  StepperActions,
} from '@/components/ui/stepper'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

// Context
interface StepperContextValue {
  activeStep: number
  setActiveStep: (step: number) => void
  totalSteps: number
  orientation: 'horizontal' | 'vertical'
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

// Step variants
const stepVariants = cva(
  'flex items-center justify-center border-3 border-foreground font-bold transition-all duration-200',
  {
    variants: {
      state: {
        completed: 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        active: 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: { state: 'upcoming', size: 'md' },
  }
)

// Components: Stepper, StepperList, StepperItem, StepperTrigger, StepperSeparator, StepperContent, StepperActions
export {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
  StepperActions,
  stepVariants,
}`

const vueSourceCode = `<script setup lang="ts">
import { provide, inject, ref, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'

// Context using provide/inject
const StepperKey = Symbol('stepper')

const stepVariants = cva(
  'flex items-center justify-center border-3 border-foreground font-bold transition-all duration-200',
  {
    variants: {
      state: {
        completed: 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        active: 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: { state: 'upcoming', size: 'md' },
  }
)
</script>`

const usageCode = `import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
} from '@/components/ui/stepper'

export default function Example() {
  return (
    <Stepper>
      <StepperList>
        <StepperItem index={0}>
          <StepperTrigger />
        </StepperItem>
        <StepperSeparator />
        <StepperItem index={1}>
          <StepperTrigger />
        </StepperItem>
        <StepperSeparator />
        <StepperItem index={2}>
          <StepperTrigger />
        </StepperItem>
      </StepperList>
      <StepperContent index={0}>Step 1 content</StepperContent>
      <StepperContent index={1}>Step 2 content</StepperContent>
      <StepperContent index={2}>Step 3 content</StepperContent>
    </Stepper>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
} from '@/components/ui'
</script>

<template>
  <Stepper>
    <StepperList>
      <StepperItem :index="0">
        <StepperTrigger />
      </StepperItem>
      <StepperSeparator />
      <StepperItem :index="1">
        <StepperTrigger />
      </StepperItem>
      <StepperSeparator />
      <StepperItem :index="2">
        <StepperTrigger />
      </StepperItem>
    </StepperList>
    <StepperContent :index="0">Step 1 content</StepperContent>
    <StepperContent :index="1">Step 2 content</StepperContent>
    <StepperContent :index="2">Step 3 content</StepperContent>
  </Stepper>
</template>`

export function StepperDoc() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <ComponentDoc
        name="Stepper"
        description="Multi-step form wizard with progress indicators and content panels."
        dependencies={['class-variance-authority', 'lucide-react']}
        vueDependencies={['class-variance-authority', 'lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Stepper>
          <StepperList>
            <StepperItem index={0}>
              <StepperTrigger />
              <StepperSeparator />
            </StepperItem>
            <StepperItem index={1}>
              <StepperTrigger />
              <StepperSeparator />
            </StepperItem>
            <StepperItem index={2}>
              <StepperTrigger />
            </StepperItem>
          </StepperList>
          <StepperContent index={0}>
            <div className="p-4 border-3 border-foreground bg-muted/30">
              <h3 className="font-bold uppercase mb-2">Step 1: Account</h3>
              <p className="text-sm text-muted-foreground">Enter your account details.</p>
            </div>
          </StepperContent>
          <StepperContent index={1}>
            <div className="p-4 border-3 border-foreground bg-muted/30">
              <h3 className="font-bold uppercase mb-2">Step 2: Profile</h3>
              <p className="text-sm text-muted-foreground">Set up your profile information.</p>
            </div>
          </StepperContent>
          <StepperContent index={2}>
            <div className="p-4 border-3 border-foreground bg-muted/30">
              <h3 className="font-bold uppercase mb-2">Step 3: Complete</h3>
              <p className="text-sm text-muted-foreground">Review and submit.</p>
            </div>
          </StepperContent>
          <StepperActions />
        </Stepper>
      </ComponentDoc>

      <ExampleSection
        title="Controlled Stepper"
        description="Control the active step externally."
        code={`const [activeStep, setActiveStep] = useState(0)

<Stepper activeStep={activeStep} onStepChange={setActiveStep}>
  {/* ... */}
</Stepper>`}
        vueCode={`<script setup>
const activeStep = ref(0)
</script>

<template>
  <Stepper v-model:active-step="activeStep">
    <!-- ... -->
  </Stepper>
</template>`}
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className="px-3 py-1 border-3 border-foreground bg-muted font-bold text-sm"
            >
              Prev
            </button>
            <button
              onClick={() => setActiveStep(Math.min(2, activeStep + 1))}
              className="px-3 py-1 border-3 border-foreground bg-primary text-primary-foreground font-bold text-sm"
            >
              Next
            </button>
            <span className="px-3 py-1 text-sm font-bold">Active: {activeStep}</span>
          </div>
          <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
            <StepperList>
              <StepperItem index={0}>
                <StepperTrigger />
                <StepperSeparator />
              </StepperItem>
              <StepperItem index={1}>
                <StepperTrigger />
                <StepperSeparator />
              </StepperItem>
              <StepperItem index={2}>
                <StepperTrigger />
              </StepperItem>
            </StepperList>
          </Stepper>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Vertical Orientation"
        description="Stack steps vertically for sidebar or mobile layouts."
        code={`<Stepper orientation="vertical">
  {/* ... */}
</Stepper>`}
        vueCode={`<template>
  <Stepper orientation="vertical">
    <!-- ... -->
  </Stepper>
</template>`}
      >
        <Stepper orientation="vertical">
          <StepperList>
            <StepperItem index={0}>
              <StepperTrigger />
              <StepperSeparator />
            </StepperItem>
            <StepperItem index={1}>
              <StepperTrigger />
              <StepperSeparator />
            </StepperItem>
            <StepperItem index={2}>
              <StepperTrigger />
            </StepperItem>
          </StepperList>
        </Stepper>
      </ExampleSection>

      <ExampleSection
        title="Step Sizes"
        description="Different trigger sizes for various contexts."
        code={`<StepperTrigger size="sm" />
<StepperTrigger size="md" />
<StepperTrigger size="lg" />`}
        vueCode={`<template>
  <StepperTrigger size="sm" />
  <StepperTrigger size="md" />
  <StepperTrigger size="lg" />
</template>`}
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold uppercase mb-2">Small</p>
            <Stepper>
              <StepperList>
                <StepperItem index={0}>
                  <StepperTrigger size="sm" />
                  <StepperSeparator />
                </StepperItem>
                <StepperItem index={1}>
                  <StepperTrigger size="sm" />
                  <StepperSeparator />
                </StepperItem>
                <StepperItem index={2}>
                  <StepperTrigger size="sm" />
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-2">Large</p>
            <Stepper>
              <StepperList>
                <StepperItem index={0}>
                  <StepperTrigger size="lg" />
                  <StepperSeparator />
                </StepperItem>
                <StepperItem index={1}>
                  <StepperTrigger size="lg" />
                  <StepperSeparator />
                </StepperItem>
                <StepperItem index={2}>
                  <StepperTrigger size="lg" />
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
