import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  provideMultiStepForm,
  useMultiStepForm,
  type MultiStepFormContext,
  type MultiStepFormStep,
} from '../MultiStepForm'

interface Values {
  email: string
  name: string
}

const steps: MultiStepFormStep<Values>[] = [
  { id: 'account', validate: (v) => (v.email.includes('@') ? null : { email: 'Invalid email' }) },
  { id: 'profile', validate: (v) => (v.name.length > 0 ? null : { name: 'Required' }) },
  { id: 'review' },
]

// Drive the composable through a real provide/inject tree (the .vue wrapper is
// a thin pass-through around provideMultiStepForm). Mounting the generic .vue
// component directly widens V to `object` under vue-tsc, so we exercise the
// composable that the component delegates to.
function mountForm(onSubmit?: (v: Values) => void) {
  let form!: MultiStepFormContext<Values>
  const Inner = defineComponent({
    setup() {
      form = useMultiStepForm<Values>()
      return () => h('div')
    },
  })
  const Provider = defineComponent({
    setup() {
      provideMultiStepForm<Values>({
        steps,
        initialValues: { email: '', name: '' },
        onSubmit: onSubmit ?? (() => {}),
      })
      return () => h(Inner)
    },
  })
  const wrapper = mount(Provider)
  return { wrapper, form: () => form }
}

describe('useMultiStepForm (Vue)', () => {
  it('blocks next() while invalid and sets errors', async () => {
    const { form } = mountForm()
    form().next()
    expect(form().activeStep.value).toBe(0)
    expect(form().errors.email).toBe('Invalid email')
  })

  it('advances when the step validates', async () => {
    const { form } = mountForm()
    form().setValue('email', 'good@x.com')
    form().next()
    expect(form().activeStep.value).toBe(1)
    expect(form().errors.email).toBeUndefined()
  })

  it('back() is unguarded', () => {
    const { form } = mountForm()
    form().setValue('email', 'good@x.com')
    form().next()
    form().back()
    expect(form().activeStep.value).toBe(0)
  })

  it('submit() fires onSubmit only on the last step with full values', () => {
    const onSubmit = vi.fn()
    const { form } = mountForm(onSubmit)
    form().setValue('email', 'good@x.com')
    form().next()
    form().submit()
    expect(onSubmit).not.toHaveBeenCalled()
    form().setValue('name', 'Ada')
    form().next()
    expect(form().isLastStep.value).toBe(true)
    form().submit()
    expect(onSubmit).toHaveBeenCalledWith({ email: 'good@x.com', name: 'Ada' })
  })

  it('canGoNext reflects current-step validity', () => {
    const { form } = mountForm()
    expect(form().canGoNext.value).toBe(false)
    form().setValue('email', 'good@x.com')
    expect(form().canGoNext.value).toBe(true)
  })
})
