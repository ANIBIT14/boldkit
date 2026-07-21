import { useState } from 'react'
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

interface SignupValues {
  email: string
  password: string
  displayName: string
}

const steps: MultiStepFormStep<SignupValues>[] = [
  {
    id: 'account',
    validate: (v) => {
      const errors: Record<string, string> = {}
      if (!v.email.includes('@')) errors.email = 'Enter a valid email'
      if (v.password.length < 8) errors.password = 'At least 8 characters'
      return Object.keys(errors).length ? errors : null
    },
  },
  {
    id: 'profile',
    validate: (v) => (v.displayName.trim() ? null : { displayName: 'Required' }),
  },
  { id: 'review' },
]

function Field({
  name,
  label,
  type = 'text',
}: {
  name: keyof SignupValues
  label: string
  type?: string
}) {
  const { values, setValue, errors } = useMultiStepForm<SignupValues>()
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        value={values[name]}
        onChange={(e) => setValue(name, e.target.value)}
        aria-invalid={Boolean(errors[name])}
      />
      {errors[name] && (
        <p className="text-sm font-bold text-destructive">{errors[name]}</p>
      )}
    </div>
  )
}

function WizardBody() {
  const { activeStep, goTo, next, back, submit, isFirstStep, isLastStep, values } =
    useMultiStepForm<SignupValues>()

  return (
    <div className="space-y-6">
      <Stepper activeStep={activeStep} onStepChange={goTo}>
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

      <div className="min-h-[160px] space-y-4">
        {activeStep === 0 && (
          <>
            <Field name="email" label="Email" type="email" />
            <Field name="password" label="Password" type="password" />
          </>
        )}
        {activeStep === 1 && <Field name="displayName" label="Display name" />}
        {activeStep === 2 && (
          <div className="border-3 border-foreground bg-muted p-4">
            <p className="font-black uppercase tracking-wide">Review</p>
            <p className="mt-2 text-sm">{values.email}</p>
            <p className="text-sm">{values.displayName}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={back} disabled={isFirstStep}>
          Back
        </Button>
        {isLastStep ? (
          <Button onClick={submit}>Create account</Button>
        ) : (
          <Button onClick={next}>Next</Button>
        )}
      </div>
    </div>
  )
}

export default function Example() {
  const [submitted, setSubmitted] = useState<SignupValues | null>(null)
  return (
    <div className="max-w-md">
      <MultiStepForm<SignupValues>
        steps={steps}
        initialValues={{ email: '', password: '', displayName: '' }}
        onSubmit={setSubmitted}
      >
        <WizardBody />
      </MultiStepForm>
      {submitted && (
        <p className="mt-4 font-bold text-success">Account created for {submitted.email}!</p>
      )}
    </div>
  )
}
