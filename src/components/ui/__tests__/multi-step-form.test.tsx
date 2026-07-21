import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { MultiStepForm, useMultiStepForm, type MultiStepFormStep } from '../multi-step-form'

interface Values {
  email: string
  name: string
}

const steps: MultiStepFormStep<Values>[] = [
  {
    id: 'account',
    validate: (v) => (v.email.includes('@') ? null : { email: 'Invalid email' }),
  },
  {
    id: 'profile',
    validate: (v) => (v.name.length > 0 ? null : { name: 'Required' }),
  },
  { id: 'review' },
]

// A harness exposing the hook's actions as buttons + readouts so tests drive
// the state machine through the real provider.
function Harness({ onSubmit }: { onSubmit?: (v: Values) => void }) {
  return (
    <MultiStepForm<Values>
      steps={steps}
      initialValues={{ email: '', name: '' }}
      onSubmit={onSubmit ?? (() => {})}
    >
      <Inner />
    </MultiStepForm>
  )
}

function Inner() {
  const f = useMultiStepForm<Values>()
  return (
    <div>
      <div data-testid="step">{f.activeStep}</div>
      <div data-testid="email-error">{f.errors.email ?? ''}</div>
      <div data-testid="can-next">{String(f.canGoNext)}</div>
      <div data-testid="last">{String(f.isLastStep)}</div>
      <button onClick={() => f.setValue('email', 'good@x.com')}>set-email-good</button>
      <button onClick={() => f.setValue('name', 'Ada')}>set-name</button>
      <button onClick={() => f.next()}>next</button>
      <button onClick={() => f.back()}>back</button>
      <button onClick={() => f.submit()}>submit</button>
    </div>
  )
}

describe('useMultiStepForm', () => {
  it('blocks next() while the current step is invalid and sets errors', async () => {
    const { user } = render(<Harness />)
    await user.click(screen.getByText('next'))
    expect(screen.getByTestId('step').textContent).toBe('0')
    expect(screen.getByTestId('email-error').textContent).toBe('Invalid email')
  })

  it('advances when the current step validates', async () => {
    const { user } = render(<Harness />)
    await user.click(screen.getByText('set-email-good'))
    await user.click(screen.getByText('next'))
    expect(screen.getByTestId('step').textContent).toBe('1')
    expect(screen.getByTestId('email-error').textContent).toBe('')
  })

  it('back() is unguarded', async () => {
    const { user } = render(<Harness />)
    await user.click(screen.getByText('set-email-good'))
    await user.click(screen.getByText('next'))
    await user.click(screen.getByText('back'))
    expect(screen.getByTestId('step').textContent).toBe('0')
  })

  it('submit() fires onSubmit only on the last step with full values', async () => {
    const onSubmit = vi.fn()
    const { user } = render(<Harness onSubmit={onSubmit} />)
    // step 0 -> 1
    await user.click(screen.getByText('set-email-good'))
    await user.click(screen.getByText('next'))
    // submit on non-last step does nothing
    await user.click(screen.getByText('submit'))
    expect(onSubmit).not.toHaveBeenCalled()
    // step 1 -> 2 (last)
    await user.click(screen.getByText('set-name'))
    await user.click(screen.getByText('next'))
    expect(screen.getByTestId('last').textContent).toBe('true')
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({ email: 'good@x.com', name: 'Ada' })
  })

  it('canGoNext reflects current-step validity', async () => {
    const { user } = render(<Harness />)
    expect(screen.getByTestId('can-next').textContent).toBe('false')
    await user.click(screen.getByText('set-email-good'))
    expect(screen.getByTestId('can-next').textContent).toBe('true')
  })
})
