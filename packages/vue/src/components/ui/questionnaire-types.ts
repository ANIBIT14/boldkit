/**
 * Types + pure helpers for <Questionnaire />. Kept out of the SFC so they can be
 * imported for typing `questions` arrays and unit-tested on their own.
 *
 * Answers are plain values: `single` → string, `multiple` → string[],
 * `text` → string. An "Other…" answer is stored as the typed text itself.
 */

export type QuestionnaireQuestionType = 'single' | 'multiple' | 'text'

export interface QuestionnaireChoice {
  value: string
  label: string
  description?: string
}

/** `single` and `text` answer with a string, `multiple` with a string[]. */
export type QuestionnaireAnswer = string | string[]

export type QuestionnaireAnswers = Record<string, QuestionnaireAnswer>

export interface QuestionnaireQuestion {
  id: string
  type: QuestionnaireQuestionType
  title: string
  description?: string
  choices?: QuestionnaireChoice[]
  /** Shows a Skip button and lets Next pass with no answer. */
  optional?: boolean
  /** Adds an "Other…" choice that reveals a text input (single / multiple). */
  allowOther?: boolean
  /** Minimum selections for `multiple`. */
  min?: number
  /** Maximum selections for `multiple`; further choices disable at the cap. */
  max?: number
  /**
   * Runs after the built-in checks pass on a non-empty answer, with the answers
   * of the visible questions. Return an error message or null.
   */
  validate?: (answer: QuestionnaireAnswer, answers: QuestionnaireAnswers) => string | null
  /**
   * Show this question only when it returns true. Receives the answers of the
   * earlier visible questions only, so a hidden question's stale answer can't
   * keep its dependents alive. Hidden answers are left out of the payload.
   */
  when?: (answers: QuestionnaireAnswers) => boolean
}

export interface QuestionnaireOtherState {
  on: boolean
  text: string
}

const NON_TEXT_INPUTS = ['radio', 'checkbox', 'button', 'submit', 'reset', 'hidden']

function hasChoice(question: QuestionnaireQuestion, value: string) {
  return question.choices?.some((choice) => choice.value === value) ?? false
}

export function isEmptyAnswer(answer: QuestionnaireAnswer | undefined) {
  return answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)
}

export function asArray(answer: QuestionnaireAnswer | undefined): string[] {
  if (answer === undefined) return []
  return Array.isArray(answer) ? answer : [answer]
}

/**
 * Whether "Other…" is selected and what it says. Derived from the answer (a
 * value that isn't a choice is the Other text) unless the UI state still
 * matches it — which keeps the input open while the typed text happens to
 * equal a choice value, or is still empty.
 */
export function resolveOther(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  ui: QuestionnaireOtherState | undefined
): QuestionnaireOtherState {
  if (!question.allowOther || question.type === 'text') return { on: false, text: '' }
  if (question.type === 'single') {
    const single = typeof answer === 'string' ? answer : undefined
    if (ui?.on && single === ui.text) return ui
    if (single !== undefined && !hasChoice(question, single)) return { on: true, text: single }
  } else {
    const list = asArray(answer)
    if (ui?.on && list.includes(ui.text)) return ui
    const extra = list.find((v) => !hasChoice(question, v))
    if (extra !== undefined) return { on: true, text: extra }
  }
  return { on: false, text: ui?.text ?? '' }
}

/** The selected regular choices, with the Other entry removed. */
export function selectedChoices(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  other: QuestionnaireOtherState
): string[] {
  const list = [...asArray(answer)]
  if (other.on) {
    const at = list.indexOf(other.text)
    if (at >= 0) list.splice(at, 1)
  }
  return list.filter((v) => hasChoice(question, v))
}

export function getQuestionError(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  other: QuestionnaireOtherState,
  answers: QuestionnaireAnswers
): string | null {
  if (question.type === 'text') {
    const text = typeof answer === 'string' ? answer : ''
    if (!text.trim()) return question.optional ? null : 'This question is required.'
  } else {
    const count = question.type === 'single' ? (answer === undefined ? 0 : 1) : asArray(answer).length
    if (count === 0) {
      if (question.optional) return null
      return question.type === 'single' ? 'Choose an option.' : 'Choose at least one option.'
    }
    if (other.on && !other.text.trim()) return 'Please describe your other answer.'
    if (question.type === 'multiple') {
      if (question.min != null && count < question.min) return `Choose at least ${question.min} options.`
      if (question.max != null && count > question.max) return `Choose at most ${question.max} options.`
    }
  }
  return isEmptyAnswer(answer)
    ? null
    : (question.validate?.(answer as QuestionnaireAnswer, answers) ?? null)
}

/**
 * Evaluate `when` in order against an accumulator of the answers of questions
 * already found visible.
 */
export function resolveVisible(questions: QuestionnaireQuestion[], answers: QuestionnaireAnswers) {
  const visible: QuestionnaireQuestion[] = []
  const visibleAnswers: QuestionnaireAnswers = {}
  for (const question of questions) {
    if (question.when && !question.when({ ...visibleAnswers })) continue
    visible.push(question)
    if (answers[question.id] !== undefined) visibleAnswers[question.id] = answers[question.id]
  }
  return { visible, visibleAnswers }
}

/**
 * Position of the current question in `visible`. If it has been hidden, fall
 * forward to the nearest following visible question.
 */
export function resolveIndex(
  questions: QuestionnaireQuestion[],
  visible: QuestionnaireQuestion[],
  currentId: string | null
) {
  if (currentId === null) return 0
  const at = visible.findIndex((q) => q.id === currentId)
  if (at >= 0) return at
  const order = questions.findIndex((q) => q.id === currentId)
  const following = visible.findIndex((q) => questions.indexOf(q) > order)
  return following >= 0 ? following : Math.max(visible.length - 1, 0)
}

/** The non-empty answers of the visible questions — the submit payload. */
export function collectAnswers(visible: QuestionnaireQuestion[], answers: QuestionnaireAnswers) {
  const out: QuestionnaireAnswers = {}
  for (const question of visible) {
    const answer = answers[question.id]
    if (isEmptyAnswer(answer)) continue
    out[question.id] = answer
  }
  return out
}

export function selectionHint(question: QuestionnaireQuestion) {
  if (question.type !== 'multiple') return null
  const { min, max } = question
  if (min != null && max != null) return `Choose ${min}–${max}`
  if (min != null) return `Choose at least ${min}`
  if (max != null) return `Choose up to ${max}`
  return 'Choose all that apply'
}

/** Letter A–Z or digit 1–9 → choice index, else -1. */
export function shortcutIndex(key: string) {
  if (/^[1-9]$/.test(key)) return Number(key) - 1
  if (/^[a-z]$/i.test(key)) return key.toLowerCase().charCodeAt(0) - 97
  return -1
}

export function isTypingTarget(el: HTMLElement) {
  if (el.isContentEditable) return true
  if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return true
  return el.tagName === 'INPUT' && !NON_TEXT_INPUTS.includes((el as HTMLInputElement).type)
}
