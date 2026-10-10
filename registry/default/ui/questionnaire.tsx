import * as React from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

/**
 * Questionnaire: a data-driven, one-question-per-screen flow for agent
 * clarification prompts, onboarding, surveys and intake forms.
 *
 * Answers are plain values: `single` → string, `multiple` → string[],
 * `text` → string. An "Other…" answer is stored as the typed text itself, so
 * the submitted payload needs no decoding.
 *
 * It renders a real <form>: the current question's native radios / checkboxes /
 * textarea carry `name={question.id}`, and every other answered question is
 * mirrored into hidden inputs, so a server-rendered POST (`action` + `method`)
 * receives every answer. Without `action`, submission stays client-side and
 * only `onSubmit(answers, event)` fires.
 *
 * Why not <MultiStepForm />: it owns its values internally (no controlled
 * `value`), its step list is fixed (no `when` branching) and its validators
 * can't be bypassed by an optional question's Skip.
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

export interface QuestionnaireProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'defaultValue' | 'children'> {
  questions: QuestionnaireQuestion[]
  /** Controlled answers. */
  value?: QuestionnaireAnswers
  /** Initial answers when uncontrolled. */
  defaultValue?: QuestionnaireAnswers
  onValueChange?: (answers: QuestionnaireAnswers) => void
  /** Fires on the last question with the answers of every visible question. */
  onSubmit?: (answers: QuestionnaireAnswers, event: React.FormEvent<HTMLFormElement>) => void
  /** `default` draws a bordered panel; `plain` drops it for use inside a Card or Dialog. */
  variant?: 'default' | 'plain'
  submitLabel?: React.ReactNode
}

interface OtherState {
  on: boolean
  text: string
}

const NON_TEXT_INPUTS = ['radio', 'checkbox', 'button', 'submit', 'reset', 'hidden']

function hasChoice(question: QuestionnaireQuestion, value: string) {
  return question.choices?.some((choice) => choice.value === value) ?? false
}

function isEmptyAnswer(answer: QuestionnaireAnswer | undefined) {
  return answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)
}

function asArray(answer: QuestionnaireAnswer | undefined): string[] {
  if (answer === undefined) return []
  return Array.isArray(answer) ? answer : [answer]
}

// Whether "Other…" is selected and what it says. Derived from the answer (a
// value that isn't a choice is the Other text) unless the UI state still
// matches it — which keeps the input open while the typed text happens to
// equal a choice value, or is still empty.
function resolveOther(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  ui: OtherState | undefined
): OtherState {
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

// The selected regular choices, with the Other entry removed.
function selectedChoices(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  other: OtherState
): string[] {
  const list = [...asArray(answer)]
  if (other.on) {
    const at = list.indexOf(other.text)
    if (at >= 0) list.splice(at, 1)
  }
  return list.filter((v) => hasChoice(question, v))
}

function getQuestionError(
  question: QuestionnaireQuestion,
  answer: QuestionnaireAnswer | undefined,
  other: OtherState,
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
  return isEmptyAnswer(answer) ? null : (question.validate?.(answer as QuestionnaireAnswer, answers) ?? null)
}

// Evaluate `when` in order against an accumulator of the answers of questions
// already found visible.
function resolveVisible(questions: QuestionnaireQuestion[], answers: QuestionnaireAnswers) {
  const visible: QuestionnaireQuestion[] = []
  const visibleAnswers: QuestionnaireAnswers = {}
  for (const question of questions) {
    if (question.when && !question.when({ ...visibleAnswers })) continue
    visible.push(question)
    if (answers[question.id] !== undefined) visibleAnswers[question.id] = answers[question.id]
  }
  return { visible, visibleAnswers }
}

// Position of the current question in `visible`. If it has been hidden, fall
// forward to the nearest following visible question.
function resolveIndex(
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

function collectAnswers(visible: QuestionnaireQuestion[], answers: QuestionnaireAnswers) {
  const out: QuestionnaireAnswers = {}
  for (const question of visible) {
    const answer = answers[question.id]
    if (isEmptyAnswer(answer)) continue
    out[question.id] = answer
  }
  return out
}

function selectionHint(question: QuestionnaireQuestion) {
  if (question.type !== 'multiple') return null
  const { min, max } = question
  if (min != null && max != null) return `Choose ${min}–${max}`
  if (min != null) return `Choose at least ${min}`
  if (max != null) return `Choose up to ${max}`
  return 'Choose all that apply'
}

// Letter A–Z or digit 1–9 → choice index.
function shortcutIndex(key: string) {
  if (/^[1-9]$/.test(key)) return Number(key) - 1
  if (/^[a-z]$/i.test(key)) return key.toLowerCase().charCodeAt(0) - 97
  return -1
}

function isTypingTarget(el: HTMLElement) {
  if (el.isContentEditable) return true
  if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return true
  return el.tagName === 'INPUT' && !NON_TEXT_INPUTS.includes((el as HTMLInputElement).type)
}

const titleClass = 'block text-xl font-black normal-case leading-tight tracking-tight sm:text-2xl'

const Questionnaire = React.forwardRef<HTMLFormElement, QuestionnaireProps>(
  (
    {
      questions,
      value,
      defaultValue,
      onValueChange,
      onSubmit,
      variant = 'default',
      submitLabel = 'Submit',
      className,
      action,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const baseId = React.useId()
    const formRef = React.useRef<HTMLFormElement | null>(null)
    const questionRef = React.useRef<HTMLDivElement>(null)
    const otherInputRef = React.useRef<HTMLInputElement>(null)
    const focusOtherRef = React.useRef(false)

    const [innerAnswers, setInnerAnswers] = React.useState<QuestionnaireAnswers>(defaultValue ?? {})
    const answers = value ?? innerAnswers
    const [otherUi, setOtherUi] = React.useState<Record<string, OtherState>>({})
    const [currentId, setCurrentId] = React.useState<string | null>(null)
    const [attempted, setAttempted] = React.useState(false)
    const [submitRequest, setSubmitRequest] = React.useState(0)
    // Double-submit guards: set once onSubmit fires / a Skip-submit is queued,
    // cleared by any edit or navigation.
    const submittedRef = React.useRef(false)
    const submitPendingRef = React.useRef(false)

    const { visible, visibleAnswers } = React.useMemo(
      () => resolveVisible(questions, answers),
      [questions, answers]
    )
    const total = visible.length
    const index = resolveIndex(questions, visible, currentId)
    const current = visible[index] as QuestionnaireQuestion | undefined
    const isLast = index === total - 1
    const answer = current ? answers[current.id] : undefined
    const other = current ? resolveOther(current, answer, otherUi[current.id]) : { on: false, text: '' }
    const error = current ? getQuestionError(current, answer, other, visibleAnswers) : null
    const showError = attempted && error !== null
    const payload = React.useMemo(() => collectAnswers(visible, answers), [visible, answers])

    const setFormRef = React.useCallback(
      (node: HTMLFormElement | null) => {
        formRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    // Move focus into the new question on navigation (not on first render), so
    // keyboard users land on it and the shortcuts keep working.
    const shownId = current?.id
    const prevShownIdRef = React.useRef(shownId)
    React.useEffect(() => {
      if (prevShownIdRef.current === shownId) return
      prevShownIdRef.current = shownId
      const root = questionRef.current
      const target =
        root?.querySelector<HTMLElement>('textarea') ??
        root?.querySelector<HTMLElement>('input:checked') ??
        root?.querySelector<HTMLElement>('input:not([type=hidden]):not(:disabled)')
      target?.focus()
    }, [shownId])

    React.useEffect(() => {
      if (focusOtherRef.current && otherInputRef.current) {
        focusOtherRef.current = false
        otherInputRef.current.focus()
      }
    })

    // Skip on the last question clears the answer first, then submits once the
    // form has re-rendered without it.
    React.useEffect(() => {
      if (submitRequest === 0) return
      submitPendingRef.current = false
      formRef.current?.requestSubmit()
    }, [submitRequest])

    const commit = (next: QuestionnaireAnswers) => {
      submittedRef.current = false
      if (value === undefined) setInnerAnswers(next)
      onValueChange?.(next)
    }

    const setAnswer = (id: string, next: QuestionnaireAnswer | undefined) => {
      const updated = { ...answers }
      if (next === undefined || (Array.isArray(next) && next.length === 0)) delete updated[id]
      else updated[id] = next
      commit(updated)
    }

    const setOther = (id: string, state: OtherState) =>
      setOtherUi((prev) => ({ ...prev, [id]: state }))

    const goTo = (target: number) => {
      submittedRef.current = false
      setAttempted(false)
      setCurrentId(visible[target]?.id ?? null)
    }

    if (!current) {
      return <form ref={setFormRef} data-slot="questionnaire" className={className} {...props} />
    }

    const choices = current.choices ?? []
    const selected = selectedChoices(current, answer, other)
    const count = selected.length + (other.on ? 1 : 0)
    const atMax = current.type === 'multiple' && current.max != null && count >= current.max

    const selectChoice = (choice: string) => {
      if (current.type === 'single') {
        setOther(current.id, { on: false, text: other.text })
        setAnswer(current.id, choice)
        return
      }
      const isOn = selected.includes(choice)
      if (!isOn && atMax) return
      const next = isOn ? selected.filter((v) => v !== choice) : [...selected, choice]
      setAnswer(current.id, other.on ? [...next, other.text] : next)
    }

    const toggleOther = (focus: boolean) => {
      if (current.type === 'single') {
        setOther(current.id, { on: true, text: other.text })
        setAnswer(current.id, other.text)
        focusOtherRef.current = focus
        return
      }
      const on = !other.on
      if (on && atMax) return
      setOther(current.id, { on, text: other.text })
      setAnswer(current.id, on ? [...selected, other.text] : selected)
      focusOtherRef.current = focus && on
    }

    const setOtherText = (text: string) => {
      setOther(current.id, { on: true, text })
      setAnswer(current.id, current.type === 'single' ? text : [...selected, text])
    }

    const skip = () => {
      if (isLast && (submittedRef.current || submitPendingRef.current)) return
      setOtherUi((prev) => {
        const next = { ...prev }
        delete next[current.id]
        return next
      })
      setAnswer(current.id, undefined)
      if (isLast) {
        submitPendingRef.current = true
        setSubmitRequest((n) => n + 1)
      } else {
        goTo(index + 1)
      }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (error !== null) {
        event.preventDefault()
        setAttempted(true)
        return
      }
      if (!isLast) {
        event.preventDefault()
        goTo(index + 1)
        return
      }
      if (submittedRef.current) {
        event.preventDefault()
        return
      }
      submittedRef.current = true
      onSubmit?.(payload, event)
      // Without an action there's nowhere to post to — keep it client-side.
      if (action === undefined) event.preventDefault()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
      onKeyDown?.(event)
      // keyCode 229: Safari fires the IME-confirming Enter after compositionend.
      if (event.defaultPrevented || event.nativeEvent.isComposing || event.keyCode === 229) return
      const target = event.target as HTMLElement

      if (event.key === 'Enter') {
        if (target.tagName === 'BUTTON' || target.tagName === 'A') return
        if (target.tagName === 'TEXTAREA' && !(event.metaKey || event.ctrlKey)) return
        event.preventDefault()
        formRef.current?.requestSubmit()
        return
      }

      if (current.type === 'text' || isTypingTarget(target)) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const i = shortcutIndex(event.key)
      if (i < 0) return
      if (i < choices.length) {
        const choice = choices[i].value
        if (current.type === 'multiple' && atMax && !selected.includes(choice)) return
        event.preventDefault()
        selectChoice(choice)
      } else if (i === choices.length && current.allowOther) {
        if (current.type === 'multiple' && atMax && !other.on) return
        event.preventDefault()
        toggleOther(true)
      }
    }

    const fieldId = `${baseId}-field`
    const progressId = `${baseId}-progress`
    const descriptionId = current.description ? `${baseId}-description` : undefined
    const hint = selectionHint(current)
    const hintId = hint ? `${baseId}-hint` : undefined
    const errorId = showError ? `${baseId}-error` : undefined
    const describedBy = [descriptionId, hintId, errorId].filter(Boolean).join(' ') || undefined
    const inputType = current.type === 'single' ? 'radio' : 'checkbox'

    const renderChoice = (
      key: string,
      i: number,
      label: string,
      inputValue: string,
      checked: boolean,
      onChange: () => void,
      description?: string
    ) => {
      const disabled = atMax && !checked
      const letter = i < 26 ? String.fromCharCode(65 + i) : undefined
      return (
        <label
          key={key}
          data-slot="questionnaire-choice"
          data-state={checked ? 'checked' : 'unchecked'}
          data-disabled={disabled ? '' : undefined}
          className={cn(
            'flex cursor-pointer items-start gap-3 border-3 border-foreground bg-background px-4 py-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-150 ease-out motion-reduce:transition-none',
            'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
            'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background',
            'data-[state=checked]:translate-x-[4px] data-[state=checked]:translate-y-[4px] data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-none',
            'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:translate-x-0 data-[disabled]:hover:translate-y-0 data-[disabled]:hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
          )}
        >
          <input
            type={inputType}
            className="sr-only"
            name={current.id}
            value={inputValue}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-invalid={showError || undefined}
            aria-keyshortcuts={letter ? `${letter}${i < 9 ? ` ${i + 1}` : ''}` : undefined}
          />
          {letter && (
            <Kbd aria-hidden="true" size="sm" className="mt-0.5 shrink-0 text-foreground">
              {letter}
            </Kbd>
          )}
          <span className="min-w-0 flex-1">
            <span className="block font-bold">{label}</span>
            {description && <span className="mt-0.5 block text-sm opacity-80">{description}</span>}
          </span>
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-3 border-foreground bg-background text-foreground"
          >
            {checked && <Check className="h-3 w-3" strokeWidth={4} />}
          </span>
        </label>
      )
    }

    return (
      <form
        ref={setFormRef}
        data-slot="questionnaire"
        data-variant={variant}
        noValidate
        action={action}
        className={cn(
          'text-foreground',
          variant === 'default' &&
            'border-3 border-foreground bg-background p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))] sm:p-6',
          className
        )}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div data-slot="questionnaire-header" className="mb-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p id={progressId} className="text-xs font-bold uppercase tracking-widest">
              Question {index + 1} of {total}
            </p>
            {current.optional && (
              <span className="border-2 border-foreground bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                Optional
              </span>
            )}
          </div>
          <div
            role="progressbar"
            aria-labelledby={progressId}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={index + 1}
            data-slot="questionnaire-progress"
            className="flex gap-1.5"
          >
            {visible.map((q, i) => (
              <span
                key={q.id}
                data-state={i < index ? 'complete' : i === index ? 'current' : 'upcoming'}
                className={cn(
                  'h-3 flex-1 border-3 border-foreground transition-colors duration-200 motion-reduce:transition-none',
                  i < index ? 'bg-primary' : i === index ? 'bg-accent' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>

        <div
          key={current.id}
          ref={questionRef}
          data-slot="questionnaire-question"
          className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
        >
          {current.type === 'text' ? (
            <div className="space-y-3">
              <Label htmlFor={fieldId} className={titleClass}>
                {current.title}
              </Label>
              {current.description && (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {current.description}
                </p>
              )}
              <Textarea
                id={fieldId}
                name={current.id}
                value={typeof answer === 'string' ? answer : ''}
                onChange={(e) => setAnswer(current.id, e.target.value)}
                aria-describedby={describedBy}
                aria-invalid={showError || undefined}
              />
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Kbd size="sm">Ctrl</Kbd>
                <span aria-hidden="true">+</span>
                <Kbd size="sm">Enter</Kbd>
                <span>to continue</span>
              </p>
            </div>
          ) : (
            <fieldset aria-describedby={describedBy} className="min-w-0 space-y-3">
              <legend className={cn(titleClass, 'mb-3')}>{current.title}</legend>
              {current.description && (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {current.description}
                </p>
              )}
              {hint && (
                <p id={hintId} className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {hint}
                </p>
              )}
              <div className="grid gap-3 pt-1">
                {choices.map((choice, i) =>
                  renderChoice(
                    choice.value,
                    i,
                    choice.label,
                    choice.value,
                    current.type === 'single'
                      ? !other.on && answer === choice.value
                      : selected.includes(choice.value),
                    () => selectChoice(choice.value),
                    choice.description
                  )
                )}
                {current.allowOther &&
                  renderChoice('__other__', choices.length, 'Other…', other.text, other.on, () =>
                    toggleOther(false)
                  )}
              </div>
              {other.on && (
                <Input
                  ref={otherInputRef}
                  value={other.text}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Type your answer"
                  aria-label={`Other answer for: ${current.title}`}
                  aria-invalid={(showError && !other.text.trim()) || undefined}
                />
              )}
            </fieldset>
          )}

          {showError && (
            <p id={errorId} role="alert" className="mt-3 text-sm font-bold text-destructive">
              {error}
            </p>
          )}
        </div>

        {visible.map((q) =>
          q.id === current.id
            ? null
            : asArray(payload[q.id]).map((v, i) => (
                <input key={`${q.id}-${i}`} type="hidden" name={q.id} value={v} />
              ))
        )}

        <div data-slot="questionnaire-footer" className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0}>
            <ArrowLeft />
            Previous
          </Button>
          <div className="flex items-center gap-3">
            {current.optional && (
              <Button type="button" variant="ghost" onClick={skip}>
                Skip
              </Button>
            )}
            <Button
              type="submit"
              aria-disabled={error !== null || undefined}
              className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:translate-x-0 aria-disabled:hover:translate-y-0 aria-disabled:hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              {isLast ? (
                <>
                  {submitLabel}
                  <Check />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    )
  }
)
Questionnaire.displayName = 'Questionnaire'

export { Questionnaire }
