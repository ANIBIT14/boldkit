import { useState } from 'react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import {
  Questionnaire,
  type QuestionnaireAnswers,
  type QuestionnaireQuestion,
} from '@/components/ui/questionnaire'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import sourceCode from '@/components/ui/questionnaire.tsx?raw'
import vueSourceCode from '@vue-ui/Questionnaire.vue?raw'

const onboardingQuestions: QuestionnaireQuestion[] = [
  {
    id: 'role',
    type: 'single',
    title: 'What best describes your role?',
    choices: [
      { value: 'developer', label: 'Developer', description: 'I write the code.' },
      { value: 'designer', label: 'Designer', description: 'I own the pixels.' },
      { value: 'pm', label: 'Product manager' },
    ],
    allowOther: true,
  },
  {
    id: 'frameworks',
    type: 'multiple',
    title: 'Which frameworks will you build with?',
    description: 'Only asked when you picked Developer.',
    choices: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'nuxt', label: 'Nuxt' },
      { value: 'next', label: 'Next.js' },
    ],
    max: 2,
    allowOther: true,
    when: (answers) => answers.role === 'developer',
  },
  {
    id: 'team',
    type: 'single',
    title: 'How big is your team?',
    choices: [
      { value: 'solo', label: 'Just me' },
      { value: 'small', label: '2–10' },
      { value: 'large', label: '11+' },
    ],
  },
  {
    id: 'goal',
    type: 'text',
    title: 'What are you hoping to ship first?',
    optional: true,
  },
]

const surveyQuestions: QuestionnaireQuestion[] = [
  {
    id: 'rating',
    type: 'single',
    title: 'How was your checkout experience?',
    choices: [
      { value: 'great', label: 'Great' },
      { value: 'okay', label: 'Okay' },
      { value: 'bad', label: 'Frustrating' },
    ],
  },
  {
    id: 'feedback',
    type: 'text',
    title: 'What could we improve?',
    optional: true,
    validate: (answer) => (String(answer).length > 500 ? 'Keep it under 500 characters.' : null),
  },
]

const agentQuestions: QuestionnaireQuestion[] = [
  {
    id: 'database',
    type: 'single',
    title: 'Which database should the migration target?',
    description: 'I found config for two databases in this repo.',
    choices: [
      { value: 'postgres', label: 'Postgres', description: 'config/database.yml' },
      { value: 'sqlite', label: 'SQLite', description: 'dev.sqlite3' },
    ],
    allowOther: true,
  },
  {
    id: 'scope',
    type: 'multiple',
    title: 'What should I include?',
    choices: [
      { value: 'migration', label: 'Migration file' },
      { value: 'model', label: 'Model + validations' },
      { value: 'tests', label: 'Tests' },
    ],
    min: 1,
  },
  {
    id: 'notes',
    type: 'text',
    title: 'Anything else I should know?',
    optional: true,
  },
]

function Answers({ answers }: { answers: QuestionnaireAnswers | null }) {
  if (!answers) return null
  return (
    <pre className="mt-6 overflow-x-auto border-3 border-foreground bg-muted p-4 text-xs">
      {JSON.stringify(answers, null, 2)}
    </pre>
  )
}

function CardExample() {
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null)
  return (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Quick survey</CardTitle>
          <CardDescription>Two questions, under a minute.</CardDescription>
        </CardHeader>
        <CardContent>
          <Questionnaire variant="plain" questions={surveyQuestions} onSubmit={setAnswers} />
        </CardContent>
      </Card>
      <Answers answers={answers} />
    </div>
  )
}

function DialogExample() {
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null)
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Review agent questions</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>The agent needs a few details</DialogTitle>
            <DialogDescription>Answer so it can continue the task.</DialogDescription>
          </DialogHeader>
          <Questionnaire
            variant="plain"
            questions={agentQuestions}
            submitLabel="Send answers"
            onSubmit={(result) => {
              setAnswers(result)
              setOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
      <Answers answers={answers} />
    </div>
  )
}

const usageCode = `import { Questionnaire, type QuestionnaireQuestion } from '@/components/ui/questionnaire'

const questions: QuestionnaireQuestion[] = [
  {
    id: 'role',
    type: 'single',
    title: 'What best describes your role?',
    choices: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
    ],
    allowOther: true,
  },
  {
    id: 'frameworks',
    type: 'multiple',
    title: 'Which frameworks will you build with?',
    choices: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
    max: 2,
    when: (answers) => answers.role === 'developer',
  },
  { id: 'goal', type: 'text', title: 'What are you hoping to ship first?', optional: true },
]

export function Onboarding() {
  return <Questionnaire questions={questions} onSubmit={(answers) => console.log(answers)} />
}

// Server POST: pass action/method — every answer is serialized under its question id.
<Questionnaire questions={questions} action="/onboarding" method="post" />`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import Questionnaire from '@/components/ui/Questionnaire.vue'
import type { QuestionnaireAnswers, QuestionnaireQuestion } from '@/components/ui/questionnaire-types'

const questions: QuestionnaireQuestion[] = [
  {
    id: 'role',
    type: 'single',
    title: 'What best describes your role?',
    choices: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
    ],
    allowOther: true,
  },
  {
    id: 'frameworks',
    type: 'multiple',
    title: 'Which frameworks will you build with?',
    choices: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
    max: 2,
    when: (answers) => answers.role === 'developer',
  },
  { id: 'goal', type: 'text', title: 'What are you hoping to ship first?', optional: true },
]

const answers = ref<QuestionnaireAnswers>({})
</script>

<template>
  <Questionnaire v-model="answers" :questions="questions" @submit="(result) => console.log(result)" />
</template>`

export function QuestionnaireDoc() {
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null)
  return (
    <ComponentDoc
      name="Questionnaire"
      description="A one-question-per-screen flow for agent clarification prompts, onboarding, surveys and intake forms. Single, multiple and freeform questions with an optional Other… answer, conditional questions, A/B/C and 1/2/3 keyboard shortcuts, and a real <form> that serializes every answer for a server POST."
      dependencies={['lucide-react', 'radix-ui']}
      vueDependencies={['@lucide/vue', 'reka-ui']}
      registryName="questionnaire"
      sourceCode={sourceCode}
      vueSourceCode={vueSourceCode}
      usageCode={usageCode}
      vueUsageCode={vueUsageCode}
    >
      <div className="max-w-xl">
        <Questionnaire questions={onboardingQuestions} onSubmit={setAnswers} />
        <Answers answers={answers} />
      </div>

      <ExampleSection
        title="Inside a Card"
        description="Use the plain variant to drop the panel border when the Card already provides one."
        code={`<Card>
  <CardHeader>
    <CardTitle>Quick survey</CardTitle>
    <CardDescription>Two questions, under a minute.</CardDescription>
  </CardHeader>
  <CardContent>
    <Questionnaire variant="plain" questions={questions} onSubmit={setAnswers} />
  </CardContent>
</Card>`}
        vueCode={`<template>
  <Card>
    <CardHeader>
      <CardTitle>Quick survey</CardTitle>
      <CardDescription>Two questions, under a minute.</CardDescription>
    </CardHeader>
    <CardContent>
      <Questionnaire variant="plain" :questions="questions" @submit="onSubmit" />
    </CardContent>
  </Card>
</template>`}
      >
        <CardExample />
      </ExampleSection>

      <ExampleSection
        title="Agent clarification in a Dialog"
        description="When an agent needs input before it can continue, ask in a Dialog and close it on submit."
        code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Review agent questions</Button>
  </DialogTrigger>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>The agent needs a few details</DialogTitle>
      <DialogDescription>Answer so it can continue the task.</DialogDescription>
    </DialogHeader>
    <Questionnaire
      variant="plain"
      questions={questions}
      submitLabel="Send answers"
      onSubmit={(answers) => {
        sendToAgent(answers)
        setOpen(false)
      }}
    />
  </DialogContent>
</Dialog>`}
        vueCode={`<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>Review agent questions</Button>
    </DialogTrigger>
    <DialogContent class="max-w-lg">
      <DialogHeader>
        <DialogTitle>The agent needs a few details</DialogTitle>
        <DialogDescription>Answer so it can continue the task.</DialogDescription>
      </DialogHeader>
      <Questionnaire
        variant="plain"
        :questions="questions"
        submit-label="Send answers"
        @submit="(answers) => { sendToAgent(answers); open = false }"
      />
    </DialogContent>
  </Dialog>
</template>`}
      >
        <DialogExample />
      </ExampleSection>
    </ComponentDoc>
  )
}
