<script setup lang="ts">
/**
 * Questionnaire: a data-driven, one-question-per-screen flow for agent
 * clarification prompts, onboarding, surveys and intake forms.
 *
 * It renders a real <form>: the current question's native radios / checkboxes /
 * textarea carry `name="question.id"`, and every other answered question is
 * mirrored into hidden inputs, so a server-rendered POST (`action` + `method`
 * attrs) receives every answer. Without `action`, submission stays client-side
 * and only the `submit` event fires.
 *
 * Why not <MultiStepForm />: it owns its values internally (no v-model), its
 * step list is fixed at setup (no `when` branching) and its validators can't be
 * bypassed by an optional question's Skip.
 */
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue'
import { ArrowLeft, ArrowRight, Check } from '@lucide/vue'
import { cn } from '@/lib/utils'
import Button from './Button.vue'
import Input from './Input.vue'
import Kbd from './Kbd.vue'
import Label from './Label.vue'
import Textarea from './Textarea.vue'
import {
  asArray,
  collectAnswers,
  getQuestionError,
  isTypingTarget,
  resolveIndex,
  resolveOther,
  resolveVisible,
  selectedChoices,
  selectionHint,
  shortcutIndex,
  type QuestionnaireAnswer,
  type QuestionnaireAnswers,
  type QuestionnaireOtherState,
  type QuestionnaireQuestion,
} from './questionnaire-types'

interface QuestionnaireProps {
  questions: QuestionnaireQuestion[]
  /** Controlled answers (v-model). */
  modelValue?: QuestionnaireAnswers
  /** Initial answers when uncontrolled. */
  defaultValue?: QuestionnaireAnswers
  /** `default` draws a bordered panel; `plain` drops it for use inside a Card or Dialog. */
  variant?: 'default' | 'plain'
  submitLabel?: string
  class?: string
}

const props = withDefaults(defineProps<QuestionnaireProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  variant: 'default',
  submitLabel: 'Submit',
  class: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [answers: QuestionnaireAnswers]
  /** Fires on the last question with the answers of every visible question. */
  submit: [answers: QuestionnaireAnswers, event: Event]
}>()

const attrs = useAttrs()
const baseId = useId()
const formRef = ref<HTMLFormElement | null>(null)
const questionRef = ref<HTMLDivElement | null>(null)

const innerAnswers = ref<QuestionnaireAnswers>({ ...(props.defaultValue ?? {}) })
const answers = computed(() => props.modelValue ?? innerAnswers.value)
const otherUi = ref<Record<string, QuestionnaireOtherState>>({})
const currentId = ref<string | null>(null)
const attempted = ref(false)
// Double-submit guards: set once `submit` fires / a Skip-submit is queued,
// cleared by any edit or navigation.
let submitted = false
let submitPending = false

const resolved = computed(() => resolveVisible(props.questions, answers.value))
const visible = computed(() => resolved.value.visible)
const total = computed(() => visible.value.length)
const index = computed(() => resolveIndex(props.questions, visible.value, currentId.value))
const current = computed<QuestionnaireQuestion | undefined>(() => visible.value[index.value])
const isLast = computed(() => index.value === total.value - 1)
const answer = computed(() => (current.value ? answers.value[current.value.id] : undefined))
const other = computed<QuestionnaireOtherState>(() =>
  current.value
    ? resolveOther(current.value, answer.value, otherUi.value[current.value.id])
    : { on: false, text: '' }
)
const error = computed(() =>
  current.value
    ? getQuestionError(current.value, answer.value, other.value, resolved.value.visibleAnswers)
    : null
)
const showError = computed(() => attempted.value && error.value !== null)
const payload = computed(() => collectAnswers(visible.value, answers.value))

const choices = computed(() => current.value?.choices ?? [])
const selected = computed(() =>
  current.value ? selectedChoices(current.value, answer.value, other.value) : []
)
const atMax = computed(() => {
  const q = current.value
  if (!q || q.type !== 'multiple' || q.max == null) return false
  return selected.value.length + (other.value.on ? 1 : 0) >= q.max
})

interface ChoiceRow {
  key: string
  label: string
  description?: string
  inputValue: string
  checked: boolean
  isOther: boolean
  letter?: string
  shortcuts?: string
}

const rows = computed<ChoiceRow[]>(() => {
  const q = current.value
  if (!q || q.type === 'text') return []
  const list: ChoiceRow[] = choices.value.map((choice) => ({
    key: choice.value,
    label: choice.label,
    description: choice.description,
    inputValue: choice.value,
    checked:
      q.type === 'single'
        ? !other.value.on && answer.value === choice.value
        : selected.value.includes(choice.value),
    isOther: false,
  }))
  if (q.allowOther) {
    list.push({
      key: '__other__',
      label: 'Other…',
      inputValue: other.value.text,
      checked: other.value.on,
      isOther: true,
    })
  }
  return list.map((row, i) => {
    const letter = i < 26 ? String.fromCharCode(65 + i) : undefined
    return {
      ...row,
      letter,
      shortcuts: letter ? `${letter}${i < 9 ? ` ${i + 1}` : ''}` : undefined,
    }
  })
})

const fieldId = `${baseId}-field`
const progressId = `${baseId}-progress`
const hint = computed(() => (current.value ? selectionHint(current.value) : null))
const descriptionId = computed(() => (current.value?.description ? `${baseId}-description` : undefined))
const hintId = computed(() => (hint.value ? `${baseId}-hint` : undefined))
const errorId = computed(() => (showError.value ? `${baseId}-error` : undefined))
const describedBy = computed(
  () => [descriptionId.value, hintId.value, errorId.value].filter(Boolean).join(' ') || undefined
)

// Hidden mirrors for every answered question except the one on screen, whose
// native controls already carry its name.
const hiddenInputs = computed(() =>
  visible.value
    .filter((q) => q.id !== current.value?.id)
    .flatMap((q) => asArray(payload.value[q.id]).map((value, i) => ({ key: `${q.id}-${i}`, name: q.id, value })))
)

const titleClass = 'block text-xl font-black normal-case leading-tight tracking-tight sm:text-2xl'

function commit(next: QuestionnaireAnswers) {
  submitted = false
  if (props.modelValue === undefined) innerAnswers.value = next
  emit('update:modelValue', next)
}

function setAnswer(id: string, next: QuestionnaireAnswer | undefined) {
  const updated = { ...answers.value }
  if (next === undefined || (Array.isArray(next) && next.length === 0)) delete updated[id]
  else updated[id] = next
  commit(updated)
}

function setOther(id: string, state: QuestionnaireOtherState) {
  otherUi.value = { ...otherUi.value, [id]: state }
}

function goTo(target: number) {
  submitted = false
  attempted.value = false
  currentId.value = visible.value[target]?.id ?? null
}

// Move focus into the new question on navigation (not on first render), so
// keyboard users land on it and the shortcuts keep working.
watch(() => current.value?.id, () =>
  nextTick(() => {
    const root = questionRef.value
    const target =
      root?.querySelector<HTMLElement>('textarea') ??
      root?.querySelector<HTMLElement>('input:checked') ??
      root?.querySelector<HTMLElement>('input:not([type=hidden]):not(:disabled)')
    target?.focus()
  })
)

function focusOtherInput() {
  nextTick(() =>
    questionRef.value?.querySelector<HTMLElement>('[data-slot="questionnaire-other"]')?.focus()
  )
}

function selectChoice(choice: string) {
  const q = current.value
  if (!q) return
  if (q.type === 'single') {
    setOther(q.id, { on: false, text: other.value.text })
    setAnswer(q.id, choice)
    return
  }
  const isOn = selected.value.includes(choice)
  if (!isOn && atMax.value) return
  const next = isOn ? selected.value.filter((v) => v !== choice) : [...selected.value, choice]
  setAnswer(q.id, other.value.on ? [...next, other.value.text] : next)
}

function toggleOther(focus: boolean) {
  const q = current.value
  if (!q) return
  const text = other.value.text
  if (q.type === 'single') {
    setOther(q.id, { on: true, text })
    setAnswer(q.id, text)
    if (focus) focusOtherInput()
    return
  }
  const on = !other.value.on
  if (on && atMax.value) return
  setOther(q.id, { on, text })
  setAnswer(q.id, on ? [...selected.value, text] : selected.value)
  if (focus && on) focusOtherInput()
}

function onRowChange(row: ChoiceRow) {
  if (row.isOther) toggleOther(false)
  else selectChoice(row.inputValue)
}

function setOtherText(value: string | number) {
  const q = current.value
  if (!q) return
  const text = String(value)
  setOther(q.id, { on: true, text })
  setAnswer(q.id, q.type === 'single' ? text : [...selected.value, text])
}

function setText(value: string) {
  if (current.value) setAnswer(current.value.id, value)
}

function skip() {
  const q = current.value
  if (!q || (isLast.value && (submitted || submitPending))) return
  const nextUi = { ...otherUi.value }
  delete nextUi[q.id]
  otherUi.value = nextUi
  setAnswer(q.id, undefined)
  // On the last question, submit once the form re-renders without the answer.
  if (isLast.value) {
    submitPending = true
    nextTick(() => {
      submitPending = false
      formRef.value?.requestSubmit()
    })
  } else {
    goTo(index.value + 1)
  }
}

function onSubmit(event: Event) {
  if (!current.value) {
    event.preventDefault()
    return
  }
  if (error.value !== null) {
    event.preventDefault()
    attempted.value = true
    return
  }
  if (!isLast.value) {
    event.preventDefault()
    goTo(index.value + 1)
    return
  }
  if (submitted) {
    event.preventDefault()
    return
  }
  submitted = true
  emit('submit', payload.value, event)
  // Without an action there's nowhere to post to — keep it client-side.
  if (attrs.action === undefined) event.preventDefault()
}

function onKeydown(event: KeyboardEvent) {
  const q = current.value
  // keyCode 229: Safari fires the IME-confirming Enter after compositionend.
  if (!q || event.defaultPrevented || event.isComposing || event.keyCode === 229) return
  const target = event.target as HTMLElement

  if (event.key === 'Enter') {
    if (target.tagName === 'BUTTON' || target.tagName === 'A') return
    if (target.tagName === 'TEXTAREA' && !(event.metaKey || event.ctrlKey)) return
    event.preventDefault()
    formRef.value?.requestSubmit()
    return
  }

  if (q.type === 'text' || isTypingTarget(target)) return
  if (event.metaKey || event.ctrlKey || event.altKey) return
  const i = shortcutIndex(event.key)
  if (i < 0) return
  if (i < choices.value.length) {
    const choice = choices.value[i].value
    if (q.type === 'multiple' && atMax.value && !selected.value.includes(choice)) return
    event.preventDefault()
    selectChoice(choice)
  } else if (i === choices.value.length && q.allowOther) {
    if (q.type === 'multiple' && atMax.value && !other.value.on) return
    event.preventDefault()
    toggleOther(true)
  }
}
</script>

<template>
  <form
    ref="formRef"
    data-slot="questionnaire"
    :data-variant="props.variant"
    novalidate
    :class="
      cn(
        'text-foreground',
        props.variant === 'default' &&
          'border-3 border-foreground bg-background p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))] sm:p-6',
        props.class
      )
    "
    @submit="onSubmit"
    @keydown="onKeydown"
  >
    <template v-if="current">
      <div data-slot="questionnaire-header" class="mb-6 space-y-3">
        <div class="flex items-center justify-between gap-3">
          <p :id="progressId" class="text-xs font-bold uppercase tracking-widest">
            Question {{ index + 1 }} of {{ total }}
          </p>
          <span
            v-if="current.optional"
            class="border-2 border-foreground bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
          >
            Optional
          </span>
        </div>
        <div
          role="progressbar"
          :aria-labelledby="progressId"
          :aria-valuemin="1"
          :aria-valuemax="total"
          :aria-valuenow="index + 1"
          data-slot="questionnaire-progress"
          class="flex gap-1.5"
        >
          <span
            v-for="(q, i) in visible"
            :key="q.id"
            :data-state="i < index ? 'complete' : i === index ? 'current' : 'upcoming'"
            :class="
              cn(
                'h-3 flex-1 border-3 border-foreground transition-colors duration-200 motion-reduce:transition-none',
                i < index ? 'bg-primary' : i === index ? 'bg-accent' : 'bg-muted'
              )
            "
          />
        </div>
      </div>

      <div
        :key="current.id"
        ref="questionRef"
        data-slot="questionnaire-question"
        class="animate-in fade-in-0 slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
      >
        <div v-if="current.type === 'text'" class="space-y-3">
          <Label :for="fieldId" :class="titleClass">{{ current.title }}</Label>
          <p v-if="current.description" :id="descriptionId" class="text-sm text-muted-foreground">
            {{ current.description }}
          </p>
          <Textarea
            :id="fieldId"
            :name="current.id"
            :model-value="typeof answer === 'string' ? answer : ''"
            :aria-describedby="describedBy"
            :aria-invalid="showError || undefined"
            @update:model-value="setText"
          />
          <p class="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Kbd size="sm">Ctrl</Kbd>
            <span aria-hidden="true">+</span>
            <Kbd size="sm">Enter</Kbd>
            <span>to continue</span>
          </p>
        </div>

        <fieldset v-else :aria-describedby="describedBy" class="min-w-0 space-y-3">
          <legend :class="cn(titleClass, 'mb-3')">{{ current.title }}</legend>
          <p v-if="current.description" :id="descriptionId" class="text-sm text-muted-foreground">
            {{ current.description }}
          </p>
          <p
            v-if="hint"
            :id="hintId"
            class="text-xs font-bold uppercase tracking-wide text-muted-foreground"
          >
            {{ hint }}
          </p>
          <div class="grid gap-3 pt-1">
            <label
              v-for="row in rows"
              :key="row.key"
              data-slot="questionnaire-choice"
              :data-state="row.checked ? 'checked' : 'unchecked'"
              :data-disabled="atMax && !row.checked ? '' : undefined"
              :class="
                cn(
                  'flex cursor-pointer items-start gap-3 border-3 border-foreground bg-background px-4 py-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-150 ease-out motion-reduce:transition-none',
                  'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
                  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background',
                  'data-[state=checked]:translate-x-[4px] data-[state=checked]:translate-y-[4px] data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-none',
                  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:translate-x-0 data-[disabled]:hover:translate-y-0 data-[disabled]:hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
                )
              "
            >
              <input
                :type="current.type === 'single' ? 'radio' : 'checkbox'"
                class="sr-only"
                :name="current.id"
                :value="row.inputValue"
                :checked="row.checked"
                :disabled="atMax && !row.checked"
                :aria-invalid="showError || undefined"
                :aria-keyshortcuts="row.shortcuts"
                @change="onRowChange(row)"
              >
              <Kbd v-if="row.letter" aria-hidden="true" size="sm" class="mt-0.5 shrink-0 text-foreground">
                {{ row.letter }}
              </Kbd>
              <span class="min-w-0 flex-1">
                <span class="block font-bold">{{ row.label }}</span>
                <span v-if="row.description" class="mt-0.5 block text-sm opacity-80">
                  {{ row.description }}
                </span>
              </span>
              <span
                aria-hidden="true"
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-3 border-foreground bg-background text-foreground"
              >
                <Check v-if="row.checked" class="h-3 w-3" :stroke-width="4" />
              </span>
            </label>
          </div>
          <Input
            v-if="other.on"
            data-slot="questionnaire-other"
            :model-value="other.text"
            placeholder="Type your answer"
            :aria-label="`Other answer for: ${current.title}`"
            :aria-invalid="(showError && !other.text.trim()) || undefined"
            @update:model-value="setOtherText"
          />
        </fieldset>

        <p
          v-if="showError"
          :id="errorId"
          role="alert"
          class="mt-3 text-sm font-bold text-destructive"
        >
          {{ error }}
        </p>
      </div>

      <input
        v-for="field in hiddenInputs"
        :key="field.key"
        type="hidden"
        :name="field.name"
        :value="field.value"
      >

      <div data-slot="questionnaire-footer" class="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" :disabled="index === 0" @click="goTo(index - 1)">
          <ArrowLeft />
          Previous
        </Button>
        <div class="flex items-center gap-3">
          <Button v-if="current.optional" type="button" variant="ghost" @click="skip">
            Skip
          </Button>
          <Button
            type="submit"
            :aria-disabled="error !== null || undefined"
            class="aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:translate-x-0 aria-disabled:hover:translate-y-0 aria-disabled:hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
          >
            <template v-if="isLast">
              {{ props.submitLabel }}
              <Check />
            </template>
            <template v-else>
              Next
              <ArrowRight />
            </template>
          </Button>
        </div>
      </div>
    </template>
  </form>
</template>
