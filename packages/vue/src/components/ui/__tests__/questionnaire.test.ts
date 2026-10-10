import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import axe from 'axe-core'
import Questionnaire from '@/components/ui/Questionnaire.vue'
import type { QuestionnaireAnswers, QuestionnaireQuestion } from '@/components/ui/questionnaire-types'

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
  { id: 'notes', type: 'text', title: 'Anything else?', optional: true },
]

const progress = (w: VueWrapper) => w.get('[data-slot="questionnaire"] p').text()
const input = (w: VueWrapper, value: string) => w.get(`input[value="${value}"]`)
const submit = async (w: VueWrapper) => {
  await w.get('form').trigger('submit')
}

function mountQ(props: Record<string, unknown> = {}) {
  return mount(Questionnaire, {
    props: { questions, ...props },
    attachTo: document.body,
  })
}

describe('Questionnaire.vue', () => {
  it('gates a required question and shows an inline error on attempt', async () => {
    const w = mountQ()
    const next = w.get('button[type="submit"]')
    expect(next.attributes('aria-disabled')).toBe('true')
    await submit(w)
    expect(progress(w)).toBe('Question 1 of 2')
    expect(w.get('[role="alert"]').text()).toBe('Choose an option.')

    await input(w, 'dev').setValue(true)
    expect(w.get('button[type="submit"]').attributes('aria-disabled')).toBeUndefined()
    await submit(w)
    expect(progress(w)).toBe('Question 2 of 3')
    expect(w.find('[role="alert"]').exists()).toBe(false)
    w.unmount()
  })

  it('skips `when`-hidden questions and excludes them from the count', async () => {
    const w = mountQ()
    await input(w, 'design').setValue(true)
    expect(progress(w)).toBe('Question 1 of 2')
    await submit(w)
    expect(w.text()).toContain('Anything else?')
    w.unmount()
  })

  it('selects with letter/number shortcuts and respects max', async () => {
    const w = mountQ()
    await input(w, 'dev').trigger('keydown', { key: 'b' })
    expect((input(w, 'design').element as HTMLInputElement).checked).toBe(true)
    await input(w, 'design').trigger('keydown', { key: '1' })
    expect((input(w, 'dev').element as HTMLInputElement).checked).toBe(true)
    await input(w, 'dev').trigger('keydown', { key: 'Enter' })
    expect(progress(w)).toBe('Question 2 of 3')

    const form = w.get('form')
    await form.trigger('keydown', { key: 'a' })
    await form.trigger('keydown', { key: '3' })
    expect((input(w, 'react').element as HTMLInputElement).checked).toBe(true)
    expect((input(w, 'svelte').element as HTMLInputElement).checked).toBe(true)
    expect((input(w, 'vue').element as HTMLInputElement).disabled).toBe(true)
    await form.trigger('keydown', { key: 'b' })
    expect((input(w, 'vue').element as HTMLInputElement).checked).toBe(false)
    w.unmount()
  })

  it('does not hijack keys while typing', async () => {
    const w = mountQ({ questions: [questions[0]] })
    await input(w, 'dev').trigger('keydown', { key: 'c' })
    const other = w.get('[data-slot="questionnaire-other"]')
    await other.trigger('keydown', { key: 'a' })
    expect((input(w, 'dev').element as HTMLInputElement).checked).toBe(false)
    w.unmount()
  })

  it('allowOther requires text and submits it as the answer', async () => {
    const w = mountQ({ questions: [questions[0]] })
    await w.findAll('input[type="radio"]')[2].setValue(true)
    await submit(w)
    expect(w.get('[role="alert"]').text()).toBe('Please describe your other answer.')
    expect(w.emitted('submit')).toBeUndefined()
    await w.get('[data-slot="questionnaire-other"]').setValue('Founder')
    await submit(w)
    expect(w.emitted('submit')?.[0][0]).toEqual({ role: 'Founder' })
    w.unmount()
  })

  it('Skip clears an optional answer and submits on the last question', async () => {
    const w = mountQ({ defaultValue: { role: 'design', notes: 'draft' } })
    await submit(w)
    const skip = w.findAll('button').find((b) => b.text() === 'Skip')!
    await skip.trigger('click')
    await new Promise((r) => setTimeout(r))
    expect(w.emitted('submit')?.[0][0]).toEqual({ role: 'design' })
    w.unmount()
  })

  it('emits v-model updates and serializes answers into the native form', async () => {
    const w = mountQ()
    await input(w, 'dev').setValue(true)
    expect(w.emitted('update:modelValue')?.[0][0]).toEqual({ role: 'dev' })
    await submit(w)
    await input(w, 'react').setValue(true)
    await input(w, 'vue').setValue(true)
    await submit(w)
    await w.get('textarea').setValue('ship it')

    const form = w.get('form').element as HTMLFormElement
    const data = new FormData(form)
    expect(data.getAll('role')).toEqual(['dev'])
    expect(data.getAll('stack')).toEqual(['react', 'vue'])
    expect(data.getAll('notes')).toEqual(['ship it'])
    w.unmount()
  })

  it('follows a controlled modelValue', async () => {
    const w = mountQ({ modelValue: { role: 'design' } })
    expect((input(w, 'design').element as HTMLInputElement).checked).toBe(true)
    await w.setProps({ modelValue: { role: 'dev' } })
    expect((input(w, 'dev').element as HTMLInputElement).checked).toBe(true)
    expect(progress(w)).toBe('Question 1 of 3')
    w.unmount()
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
    const back = (w: VueWrapper) => w.findAll('button').find((b) => b.text() === 'Previous')!.trigger('click')

    it('evaluates `when` against visible answers only, and passes them to validate', async () => {
      const seen: { answers?: QuestionnaireAnswers } = {}
      const w = mountQ({ questions: branching(seen) })
      await input(w, 'a').setValue(true)
      await submit(w)
      await input(w, 'x').setValue(true)
      await submit(w)
      expect(progress(w)).toBe('Question 3 of 4')
      await back(w)
      await back(w)
      await input(w, 'b').setValue(true)
      expect(progress(w)).toBe('Question 1 of 2')
      await submit(w)
      await w.get('textarea').setValue('done')
      await submit(w)
      expect(seen.answers).toEqual({ q1: 'b', q4: 'done' })
      expect(w.emitted('submit')?.[0][0]).toEqual({ q1: 'b', q4: 'done' })
      w.unmount()
    })

    it('guards against double submit until the answers change', async () => {
      const w = mountQ({ questions: [questions[2]] })
      await w.get('textarea').setValue('x')
      await submit(w)
      await submit(w)
      await w.get('textarea').trigger('keydown', { key: 'Enter', ctrlKey: true })
      expect(w.emitted('submit')).toHaveLength(1)
      await w.get('textarea').setValue('xy')
      await submit(w)
      expect(w.emitted('submit')).toHaveLength(2)
      w.unmount()
    })

    it('guards against a double Skip on the last question', async () => {
      const w = mountQ({ questions: [questions[2]] })
      const skip = w.findAll('button').find((b) => b.text() === 'Skip')!
      void skip.trigger('click')
      await skip.trigger('click')
      await new Promise((r) => setTimeout(r))
      await skip.trigger('click')
      await new Promise((r) => setTimeout(r))
      expect(w.emitted('submit')).toHaveLength(1)
      w.unmount()
    })

    it('keeps the current question when an earlier one hides, else falls forward', async () => {
      const qs: QuestionnaireQuestion[] = [
        { id: 'q1', type: 'single', title: 'Q1', choices: [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Bravo' }] },
        { id: 'q2', type: 'text', title: 'Q2', when: (a) => a.q1 === 'a' },
        { id: 'q3', type: 'text', title: 'Q3' },
        { id: 'q4', type: 'text', title: 'Q4' },
      ]
      const w = mountQ({ questions: qs, modelValue: { q1: 'a', q2: 'hi', q3: 'yo' } })
      await submit(w)
      await submit(w)
      expect(progress(w)).toBe('Question 3 of 4')
      await w.setProps({ modelValue: { q1: 'b', q2: 'hi', q3: 'yo' } })
      expect(w.get('label').text()).toBe('Q3')
      expect(progress(w)).toBe('Question 2 of 3')
      w.unmount()

      // On q3 of the branching set, hiding q2 also hides q3 → fall forward to q4.
      const v = mountQ({ questions: branching(), modelValue: { q1: 'a', q2: 'x', q3: 'hi' } })
      await submit(v)
      await submit(v)
      expect(v.get('label').text()).toBe('Q3')
      await v.setProps({ modelValue: { q1: 'b', q2: 'x', q3: 'hi' } })
      expect(v.get('label').text()).toBe('Q4')
      expect(progress(v)).toBe('Question 2 of 2')
      v.unmount()
    })

    it('ignores the IME-confirming Enter (keyCode 229)', async () => {
      const w = mountQ({ defaultValue: { role: 'dev' } })
      await input(w, 'dev').trigger('keydown', { key: 'Enter', keyCode: 229 })
      expect(progress(w)).toBe('Question 1 of 3')
      await input(w, 'dev').trigger('keydown', { key: 'Enter' })
      expect(progress(w)).toBe('Question 2 of 3')
      w.unmount()
    })
  })

  it('has no axe violations', async () => {
    const w = mountQ()
    await submit(w)
    const results = await axe.run(w.element as Element, {
      rules: { 'color-contrast': { enabled: false } },
    })
    expect(results.violations.map((v) => v.id)).toEqual([])
    w.unmount()
  })
})
