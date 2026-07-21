import { useState } from 'react'
import { ComponentDoc } from '@/components/docs/ComponentDoc'
import {
  MultiStepForm,
  useMultiStepForm,
  type MultiStepFormStep,
} from '@/components/ui/multi-step-form'
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
} from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import sourceCode from '@/components/ui/multi-step-form.tsx?raw'
import vueSourceCode from '@vue-ui/useMultiStepForm.ts?raw'

interface Values {
  email: string
  displayName: string
}

const steps: MultiStepFormStep<Values>[] = [
  { id: 'account', validate: (v) => (v.email.includes('@') ? null : { email: 'Enter a valid email' }) },
  { id: 'profile', validate: (v) => (v.displayName.trim() ? null : { displayName: 'Required' }) },
  { id: 'review' },
]

function Wizard() {
  const f = useMultiStepForm<Values>()
  return (
    <div className="space-y-6">
      <Stepper activeStep={f.activeStep} onStepChange={f.goTo}>
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
      </Stepper>

      <div className="min-h-[130px] space-y-4">
        {f.activeStep === 0 && (
          <div className="space-y-1.5">
            <Label htmlFor="msf-email">Email</Label>
            <Input
              id="msf-email"
              type="email"
              value={f.values.email}
              onChange={(e) => f.setValue('email', e.target.value)}
              aria-invalid={Boolean(f.errors.email)}
            />
            {f.errors.email && <p className="text-sm font-bold text-destructive">{f.errors.email}</p>}
          </div>
        )}
        {f.activeStep === 1 && (
          <div className="space-y-1.5">
            <Label htmlFor="msf-name">Display name</Label>
            <Input
              id="msf-name"
              value={f.values.displayName}
              onChange={(e) => f.setValue('displayName', e.target.value)}
              aria-invalid={Boolean(f.errors.displayName)}
            />
            {f.errors.displayName && (
              <p className="text-sm font-bold text-destructive">{f.errors.displayName}</p>
            )}
          </div>
        )}
        {f.activeStep === 2 && (
          <div className="border-3 border-foreground bg-muted p-4">
            <p className="font-black uppercase tracking-wide">Review</p>
            <p className="mt-2 text-sm">{f.values.email}</p>
            <p className="text-sm">{f.values.displayName}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={f.back} disabled={f.isFirstStep}>
          Back
        </Button>
        {f.isLastStep ? (
          <Button onClick={f.submit}>Create account</Button>
        ) : (
          <Button onClick={f.next}>Next</Button>
        )}
      </div>
    </div>
  )
}

const usageCode = `import { MultiStepForm, useMultiStepForm } from '@/components/ui/multi-step-form'

const steps = [
  { id: 'account', validate: (v) => (v.email.includes('@') ? null : { email: 'Invalid email' }) },
  { id: 'profile', validate: (v) => (v.name ? null : { name: 'Required' }) },
  { id: 'review' },
]

<MultiStepForm steps={steps} initialValues={{ email: '', name: '' }} onSubmit={handleSubmit}>
  <Wizard />
</MultiStepForm>

// inside <Wizard/>:
const { values, setValue, errors, activeStep, next, back, submit, isLastStep } = useMultiStepForm()`

const vueUsageCode = `<script setup lang="ts">
import { MultiStepForm } from '@/components/ui/MultiStepForm.vue'
import { useMultiStepForm } from '@/components/ui/useMultiStepForm'
</script>

<template>
  <MultiStepForm :steps="steps" :initial-values="{ email: '', name: '' }" :on-submit="handleSubmit">
    <Wizard />
  </MultiStepForm>
</template>`

export function MultiStepFormDoc() {
  const [done, setDone] = useState(false)
  return (
    <ComponentDoc
      name="Multi-Step Form"
      description="A dependency-free form-state layer with per-step validation that composes with the Stepper. Forward navigation is gated on the current step's validator; submit fires only on the last step."
      dependencies={[]}
      vueDependencies={[]}
      registryName="multi-step-form"
      sourceCode={sourceCode}
      vueSourceCode={vueSourceCode}
      usageCode={usageCode}
      vueUsageCode={vueUsageCode}
    >
      <div className="max-w-md">
        <MultiStepForm<Values>
          steps={steps}
          initialValues={{ email: '', displayName: '' }}
          onSubmit={() => setDone(true)}
        >
          <Wizard />
        </MultiStepForm>
        {done && <p className="mt-4 font-bold text-success">Account created!</p>}
      </div>
    </ComponentDoc>
  )
}
