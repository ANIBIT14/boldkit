import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { axe } from 'vitest-axe'
import { render, screen, fireEvent } from '@/test/test-utils'
import {
  Questionnaire,
  type QuestionnaireAnswers,
  type QuestionnaireQuestion,
} from '../questionnaire'

const questions: QuestionnaireQuestion[] = [
  {
    id: 'role',
    type: 'single',
    title: 'What is your role?',
    choices: [
      { value: 'dev', label: 'Developer' },
      { value: 'design', label: 'Designer' },
    ],
    allowOther: true,
  },
  {
    id: 'stack',
    type: 'multiple',
    title: 'Which frameworks do you use?',
    choices: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
    max: 2,
    when: (a) => a.role === 'dev',
  },
  {
    id: 'notes',
    type: 'text',
    title: 'Anything else?',
    optional: true,
  },
]

const progress = () => screen.getByText(/^Question \d+ of \d+$/).textContent
// Choice labels also hold an aria-hidden key hint, so query by accessible name.
const choice = (name: string) =>
  screen.queryByRole('radio', { name }) ?? screen.getByRole('checkbox', { name })
const next = () => screen.getByRole('button', { name: /next/i })

describe('Questionnaire', () => {
  it('gates a required question: Next is aria-disabled and shows an inline error on attempt', async () => {
    const { user } = render(<Questionnaire questions={questions} />)
    expect(next()).toHaveAttribute('aria-disabled', 'true')
    await user.click(next())
    expect(progress()).toBe('Question 1 of 2')
    expect(screen.getByRole('alert')).toHaveTextContent('Choose an option.')

    await user.click(choice('Developer'))
    expect(next()).not.toHaveAttribute('aria-disabled')
    await user.click(next())
    expect(progress()).toBe('Question 2 of 3')
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('skips conditional questions when `when` is false and excludes them from the count', async () => {
    const { user } = render(<Questionnaire questions={questions} />)
    await user.click(choice('Designer'))
    expect(progress()).toBe('Question 1 of 2')
    await user.click(next())
    expect(screen.getByText('Anything else?')).toBeInTheDocument()
    expect(screen.getAllByRole('progressbar')[0]).toHaveAttribute('aria-valuemax', '2')
  })

  it('selects choices with letter and number shortcuts and toggles multiples', async () => {
    const { user } = render(<Questionnaire questions={questions} />)
    choice('Developer').focus()
    await user.keyboard('b')
    expect(choice('Designer')).toBeChecked()
    await user.keyboard('1')
    expect(choice('Developer')).toBeChecked()
    await user.keyboard('{Enter}')
    expect(progress()).toBe('Question 2 of 3')

    await user.keyboard('a')
    await user.keyboard('3')
    expect(choice('React')).toBeChecked()
    expect(choice('Svelte')).toBeChecked()
    // max: 2 — the remaining choice is disabled and its shortcut ignored
    expect(choice('Vue')).toBeDisabled()
    await user.keyboard('b')
    expect(choice('Vue')).not.toBeChecked()
    await user.keyboard('a')
    expect(choice('React')).not.toBeChecked()
  })

  it('does not hijack letter keys while typing in a text field', async () => {
    const onValueChange = vi.fn()
    const { user } = render(
      <Questionnaire
        questions={[questions[2]]}
        onValueChange={onValueChange}
      />
    )
    await user.type(screen.getByLabelText('Anything else?'), 'ab1')
    expect(screen.getByLabelText('Anything else?')).toHaveValue('ab1')
    expect(onValueChange).toHaveBeenLastCalledWith({ notes: 'ab1' })
  })

  it('reveals a text input for allowOther and requires it to be filled', async () => {
    const onSubmit = vi.fn()
    const { user } = render(
      <Questionnaire questions={[questions[0]]} onSubmit={onSubmit} />
    )
    await user.click(choice('Other…'))
    const other = screen.getByRole('textbox', { name: /other answer/i })
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Please describe your other answer.')
    expect(onSubmit).not.toHaveBeenCalled()

    await user.type(other, 'Founder')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledWith({ role: 'Founder' }, expect.anything())
  })

  it('focuses the Other input when chosen by shortcut', async () => {
    const { user } = render(<Questionnaire questions={[questions[0]]} />)
    choice('Developer').focus()
    await user.keyboard('c')
    expect(screen.getByRole('textbox', { name: /other answer/i })).toHaveFocus()
    // Typing in it is not hijacked
    await user.keyboard('ab')
    expect(screen.getByRole('textbox', { name: /other answer/i })).toHaveValue('ab')
    expect(choice('Other…')).toBeChecked()
  })

  it('Skip clears an optional answer and submits on the last question', async () => {
    const onSubmit = vi.fn()
    const { user } = render(
      <Questionnaire
        questions={questions}
        defaultValue={{ role: 'design', notes: 'draft' }}
        onSubmit={onSubmit}
      />
    )
    await user.click(next())
    await user.click(screen.getByRole('button', { name: /skip/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0]).toEqual({ role: 'design' })
  })

  it('submits only visible answers and Previous preserves them', async () => {
    const onSubmit = vi.fn()
    const { user } = render(<Questionnaire questions={questions} onSubmit={onSubmit} />)
    await user.click(choice('Developer'))
    await user.click(next())
    await user.click(choice('Vue'))
    await user.click(screen.getByRole('button', { name: /previous/i }))
    expect(choice('Developer')).toBeChecked()
    // Switching role hides the stack question; its answer must not be submitted
    await user.click(choice('Designer'))
    await user.click(next())
    await user.type(screen.getByLabelText('Anything else?'), 'hi')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit.mock.calls[0][0]).toEqual({ role: 'design', notes: 'hi' })
  })

  it('serializes every answer into the native form for a server POST', async () => {
    const { user, container } = render(<Questionnaire questions={questions} />)
    await user.click(choice('Developer'))
    await user.click(next())
    await user.click(choice('React'))
    await user.click(choice('Vue'))
    await user.click(next())
    await user.type(screen.getByLabelText('Anything else?'), 'ship it')

    const form = container.querySelector('form') as HTMLFormElement
    const hidden = form.querySelectorAll('input[type=hidden]')
    expect(Array.from(hidden).map((el) => (el as HTMLInputElement).name)).toEqual([
      'role',
      'stack',
      'stack',
    ])
    const data = new FormData(form)
    expect(data.getAll('role')).toEqual(['dev'])
    expect(data.getAll('stack')).toEqual(['react', 'vue'])
    expect(data.getAll('notes')).toEqual(['ship it'])
  })

  it('supports controlled answers', async () => {
    function Controlled() {
      const [answers, setAnswers] = useState<QuestionnaireAnswers>({ role: 'design' })
      return (
        <>
          <Questionnaire questions={questions} value={answers} onValueChange={setAnswers} />
          <output data-testid="out">{JSON.stringify(answers)}</output>
        </>
      )
    }
    const { user } = render(<Controlled />)
    expect(choice('Designer')).toBeChecked()
    await user.click(choice('Developer'))
    expect(screen.getByTestId('out').textContent).toBe('{"role":"dev"}')
  })

  it('runs a custom validate on the answer', async () => {
    const { user } = render(
      <Questionnaire
        questions={[
          {
            id: 'email',
            type: 'text',
            title: 'Work email',
            validate: (a) => (String(a).includes('@') ? null : 'Enter a valid email.'),
          },
        ]}
      />
    )
    await user.type(screen.getByLabelText('Work email'), 'nope')
    fireEvent.submit(screen.getByLabelText('Work email').closest('form')!)
    expect(await screen.findByRole('alert')).toHaveTextContent('Enter a valid email.')
  })

  it('renders without the panel chrome in the plain variant', () => {
    const { container } = render(<Questionnaire questions={questions} variant="plain" />)
    const form = container.querySelector('[data-slot="questionnaire"]')!
    expect(form.className).not.toContain('border-3')
  })

  describe('review regressions', () => {
    const branching = (seen?: { answers?: QuestionnaireAnswers }): QuestionnaireQuestion[] => [
      { id: 'q1', type: 'single', title: 'Q1', choices: [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Bravo' }] },
      { id: 'q2', type: 'single', title: 'Q2', choices: [{ value: 'x', label: 'Xray' }, { value: 'y', label: 'Yankee' }], when: (a) => a.q1 === 'a' },
      { id: 'q3', type: 'text', title: 'Q3', when: (a) => a.q2 === 'x' },
      {
        id: 'q4',
        type: 'text',
        title: 'Q4',
        validate: (_answer, answers) => {
          if (seen) seen.answers = answers
          return null
        },
      },
    ]

    it('evaluates `when` against visible answers only, and passes them to validate', async () => {
      const seen: { answers?: QuestionnaireAnswers } = {}
      const onSubmit = vi.fn()
      const { user } = render(<Questionnaire questions={branching(seen)} onSubmit={onSubmit} />)
      await user.click(choice('Alpha'))
      await user.click(next())
      await user.click(choice('Xray'))
      await user.click(next())
      expect(progress()).toBe('Question 3 of 4')
      await user.click(screen.getByRole('button', { name: /previous/i }))
      await user.click(screen.getByRole('button', { name: /previous/i }))
      await user.click(choice('Bravo'))
      // q2 is hidden, so its stale 'x' must not keep q3 visible
      expect(progress()).toBe('Question 1 of 2')
      await user.click(next())
      await user.type(screen.getByLabelText('Q4'), 'done')
      await user.click(screen.getByRole('button', { name: /submit/i }))
      expect(seen.answers).toEqual({ q1: 'b', q4: 'done' })
      expect(onSubmit.mock.calls[0][0]).toEqual({ q1: 'b', q4: 'done' })
    })

    it('guards against double submit until the answers change', async () => {
      const onSubmit = vi.fn()
      const { user } = render(<Questionnaire questions={[questions[2]]} onSubmit={onSubmit} />)
      await user.type(screen.getByLabelText('Anything else?'), 'x')
      await user.dblClick(screen.getByRole('button', { name: /submit/i }))
      await user.keyboard('{Control>}{Enter}{/Control}')
      expect(onSubmit).toHaveBeenCalledTimes(1)
      await user.type(screen.getByLabelText('Anything else?'), 'y')
      await user.click(screen.getByRole('button', { name: /submit/i }))
      expect(onSubmit).toHaveBeenCalledTimes(2)
    })

    it('guards against a double Skip on the last question', async () => {
      const onSubmit = vi.fn()
      const { user } = render(<Questionnaire questions={[questions[2]]} onSubmit={onSubmit} />)
      await user.dblClick(screen.getByRole('button', { name: /skip/i }))
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('stays on the same question when visibility changes underneath it', async () => {
      function Controlled() {
        const [answers, setAnswers] = useState<QuestionnaireAnswers>({ q1: 'a', q2: 'x', q3: 'hi' })
        return (
          <>
            <button type="button" onClick={() => setAnswers((a) => ({ ...a, q1: 'b' }))}>
              external
            </button>
            <Questionnaire questions={branching()} value={answers} onValueChange={setAnswers} />
          </>
        )
      }
      const { user } = render(<Controlled />)
      await user.click(next())
      await user.click(next())
      expect(screen.getByLabelText('Q3')).toBeInTheDocument()
      // Hiding q2 shifts every index; we must still be on q3 — but q3 itself
      // depends on q2, so it hides too and we fall forward to q4.
      await user.click(screen.getByText('external'))
      expect(screen.getByLabelText('Q4')).toBeInTheDocument()
      expect(progress()).toBe('Question 2 of 2')
    })

    it('keeps the current question when an earlier one hides', async () => {
      const qs: QuestionnaireQuestion[] = [
        { id: 'q1', type: 'single', title: 'Q1', choices: [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Bravo' }] },
        { id: 'q2', type: 'text', title: 'Q2', when: (a) => a.q1 === 'a' },
        { id: 'q3', type: 'text', title: 'Q3' },
        { id: 'q4', type: 'text', title: 'Q4' },
      ]
      function Controlled() {
        const [answers, setAnswers] = useState<QuestionnaireAnswers>({ q1: 'a', q2: 'hi' })
        return (
          <>
            <button type="button" onClick={() => setAnswers((a) => ({ ...a, q1: 'b' }))}>
              external
            </button>
            <Questionnaire questions={qs} value={answers} onValueChange={setAnswers} />
          </>
        )
      }
      const { user } = render(<Controlled />)
      await user.click(next())
      await user.click(next())
      expect(progress()).toBe('Question 3 of 4')
      await user.click(screen.getByText('external'))
      expect(screen.getByLabelText('Q3')).toBeInTheDocument()
      expect(progress()).toBe('Question 2 of 3')
    })

    it('ignores the IME-confirming Enter (keyCode 229)', () => {
      render(<Questionnaire questions={questions} defaultValue={{ role: 'dev' }} />)
      fireEvent.keyDown(choice('Developer'), { key: 'Enter', keyCode: 229 })
      expect(progress()).toBe('Question 1 of 3')
      fireEvent.keyDown(choice('Developer'), { key: 'Enter' })
      expect(progress()).toBe('Question 2 of 3')
    })
  })

  it('has no axe violations (choice question, with an error shown)', async () => {
    const { user, container } = render(<Questionnaire questions={questions} />)
    await user.click(next())
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations (text question)', async () => {
    const { container } = render(<Questionnaire questions={[questions[2]]} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
