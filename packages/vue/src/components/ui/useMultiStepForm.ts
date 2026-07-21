import {
  computed,
  inject,
  provide,
  reactive,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'

/**
 * Multi-step form: a dependency-free form-state layer that sits on top of the
 * <Stepper /> UI. Owns values, per-field errors, touched state, and the active
 * step, gating forward navigation on the current step's validator.
 */

export type StepValidator<V> = (values: V) => Record<string, string> | null

export interface MultiStepFormStep<V> {
  id: string
  validate?: StepValidator<V>
}

export interface MultiStepFormContext<V> {
  values: V
  setValue: <K extends keyof V>(name: K, value: V[K]) => void
  errors: Record<string, string>
  touched: Record<string, boolean>
  activeStep: Ref<number>
  next: () => void
  back: () => void
  goTo: (step: number) => void
  canGoNext: ComputedRef<boolean>
  isStepValid: ComputedRef<boolean>
  isFirstStep: ComputedRef<boolean>
  isLastStep: ComputedRef<boolean>
  submit: () => void
}

export const MULTI_STEP_FORM_KEY: InjectionKey<MultiStepFormContext<unknown>> =
  Symbol('BoldKitMultiStepForm')

export interface ProvideMultiStepFormOptions<V> {
  steps: MultiStepFormStep<V>[]
  initialValues: V
  onSubmit: (values: V) => void
}

export function provideMultiStepForm<V extends object>(
  options: ProvideMultiStepFormOptions<V>
): MultiStepFormContext<V> {
  const { steps, initialValues, onSubmit } = options

  const values = reactive({ ...initialValues }) as V
  const errors = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})
  const activeStep = ref(0)

  const totalSteps = steps.length
  const isFirstStep = computed(() => activeStep.value === 0)
  const isLastStep = computed(() => activeStep.value === totalSteps - 1)

  function replaceErrors(next: Record<string, string> | null) {
    for (const key of Object.keys(errors)) delete errors[key]
    if (next) Object.assign(errors, next)
  }

  function setValue<K extends keyof V>(name: K, value: V[K]) {
    ;(values as Record<string, unknown>)[name as string] = value
    touched[name as string] = true
    delete errors[name as string]
  }

  function validateStep(step: number): boolean {
    const validator = steps[step]?.validate
    if (!validator) {
      replaceErrors(null)
      return true
    }
    const result = validator(values)
    replaceErrors(result)
    return result === null
  }

  const isStepValid = computed(() => {
    const validator = steps[activeStep.value]?.validate
    return validator ? validator(values) === null : true
  })

  function goTo(step: number) {
    if (step < 0 || step >= totalSteps) return
    if (step > activeStep.value) {
      if (!validateStep(activeStep.value)) return
    } else {
      replaceErrors(null)
    }
    activeStep.value = step
  }

  function next() {
    if (isLastStep.value) return
    if (!validateStep(activeStep.value)) return
    activeStep.value = Math.min(activeStep.value + 1, totalSteps - 1)
  }

  function back() {
    replaceErrors(null)
    activeStep.value = Math.max(activeStep.value - 1, 0)
  }

  function submit() {
    if (!isLastStep.value) return
    if (!validateStep(activeStep.value)) return
    onSubmit({ ...values })
  }

  const context: MultiStepFormContext<V> = {
    values,
    setValue,
    errors,
    touched,
    activeStep,
    next,
    back,
    goTo,
    canGoNext: computed(() => isStepValid.value && !isLastStep.value),
    isStepValid,
    isFirstStep,
    isLastStep,
    submit,
  }

  provide(MULTI_STEP_FORM_KEY, context as MultiStepFormContext<unknown>)
  return context
}

export function useMultiStepForm<V>(): MultiStepFormContext<V> {
  const context = inject(MULTI_STEP_FORM_KEY)
  if (!context) {
    throw new Error('useMultiStepForm must be used within a <MultiStepForm />')
  }
  return context as MultiStepFormContext<V>
}
