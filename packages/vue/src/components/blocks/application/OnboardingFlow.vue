<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Progress from '@/components/ui/Progress.vue'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarImage from '@/components/ui/AvatarImage.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import { ArrowRight, ArrowLeft, Upload, Check, Sparkles, Users, Building2, Target, Rocket } from 'lucide-vue-next'

type OnboardingVariant = 'wizard' | 'welcome' | 'profileSetup' | 'workspaceSetup' | 'goalSelection' | 'completion'

interface Goal {
  id: string
  label: string
  description?: string
  icon?: typeof Target
}

interface OnboardingFlowProps {
  variant?: OnboardingVariant
  currentStep?: number
  totalSteps?: number
  userName?: string
  userAvatar?: string
  goals?: Goal[]
  class?: string
}

const props = withDefaults(defineProps<OnboardingFlowProps>(), {
  variant: 'wizard',
  currentStep: 1,
  totalSteps: 4,
  goals: () => [
    { id: 'productivity', label: 'Increase Productivity', description: 'Streamline your workflow' },
    { id: 'collaboration', label: 'Better Collaboration', description: 'Work together seamlessly' },
    { id: 'organization', label: 'Stay Organized', description: 'Keep everything in order' },
    { id: 'growth', label: 'Scale My Business', description: 'Grow and expand operations' },
  ],
})

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'back'): void
  (e: 'complete', data: Record<string, unknown>): void
  (e: 'skip'): void
}>()

const name = ref('')
const email = ref('')
const workspaceName = ref('')
const selectedGoals = ref<string[]>([])

const progress = ((props.currentStep - 1) / (props.totalSteps - 1)) * 100

const toggleGoal = (goalId: string) => {
  if (selectedGoals.value.includes(goalId)) {
    selectedGoals.value = selectedGoals.value.filter((g) => g !== goalId)
  } else {
    selectedGoals.value = [...selectedGoals.value, goalId]
  }
}
</script>

<template>
  <!-- Wizard Variant (Full Flow) -->
  <div v-if="variant === 'wizard'" :class="cn('min-h-screen flex flex-col', props.class)">
    <div class="border-b-3 border-foreground p-4">
      <div class="max-w-3xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 border-3 border-foreground bg-primary shadow-[3px_3px_0px_hsl(var(--shadow-color))]" />
          <span class="font-black uppercase text-xl">BoldKit</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-muted-foreground">Step {{ currentStep }} of {{ totalSteps }}</span>
          <Progress :model-value="progress" class="w-32 h-3" />
        </div>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-6">
      <Card class="w-full max-w-lg shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
        <CardHeader class="text-center">
          <CardTitle class="text-2xl uppercase">Welcome! Let's get started</CardTitle>
          <CardDescription>Tell us a bit about yourself</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="wizard-name">Full Name</Label>
            <Input id="wizard-name" v-model="name" placeholder="John Doe" />
          </div>
          <div class="space-y-2">
            <Label for="wizard-email">Email</Label>
            <Input id="wizard-email" v-model="email" type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="ghost" @click="emit('skip')">Skip for now</Button>
          <Button class="gap-2" @click="emit('next')">
            Continue
            <ArrowRight class="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>

  <!-- Welcome Variant -->
  <div v-else-if="variant === 'welcome'" :class="cn('min-h-screen flex items-center justify-center p-6 bg-primary/5', props.class)">
    <div class="max-w-2xl text-center space-y-8">
      <div class="w-24 h-24 mx-auto border-3 border-foreground bg-primary shadow-[8px_8px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <Sparkles class="h-12 w-12 text-primary-foreground" />
      </div>
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase">
          Welcome{{ userName ? `, ${userName}` : '' }}!
        </h1>
        <p class="text-xl text-muted-foreground font-medium max-w-lg mx-auto">
          We're excited to have you on board. Let's set up your account in just a few steps.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="gap-2" @click="emit('next')">
          Get Started
          <ArrowRight class="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" @click="emit('skip')">
          I'll do this later
        </Button>
      </div>
    </div>
  </div>

  <!-- Profile Setup Variant -->
  <div v-else-if="variant === 'profileSetup'" :class="cn('min-h-screen flex items-center justify-center p-6', props.class)">
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <div class="w-16 h-16 mx-auto border-3 border-foreground bg-secondary shadow-[4px_4px_0px_hsl(var(--shadow-color))] flex items-center justify-center mb-4">
          <Users class="h-8 w-8 text-secondary-foreground" />
        </div>
        <CardTitle class="text-2xl uppercase">Set Up Your Profile</CardTitle>
        <CardDescription>Help us personalize your experience</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="flex justify-center">
          <div class="relative">
            <Avatar class="h-24 w-24 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <AvatarImage v-if="userAvatar" :src="userAvatar" alt="Profile" />
              <AvatarFallback class="bg-primary text-primary-foreground text-2xl font-black">
                {{ name ? name[0].toUpperCase() : 'U' }}
              </AvatarFallback>
            </Avatar>
            <Button size="icon" class="absolute -bottom-2 -right-2 h-10 w-10 rounded-full">
              <Upload class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="profile-name">Display Name</Label>
            <Input id="profile-name" v-model="name" placeholder="How should we call you?" />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="ghost" class="gap-2" @click="emit('back')">
          <ArrowLeft class="h-4 w-4" />
          Back
        </Button>
        <Button class="gap-2" @click="emit('next')">
          Continue
          <ArrowRight class="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Workspace Setup Variant -->
  <div v-else-if="variant === 'workspaceSetup'" :class="cn('min-h-screen flex items-center justify-center p-6', props.class)">
    <Card class="w-full max-w-md shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <div class="w-16 h-16 mx-auto border-3 border-foreground bg-accent shadow-[4px_4px_0px_hsl(var(--shadow-color))] flex items-center justify-center mb-4">
          <Building2 class="h-8 w-8 text-accent-foreground" />
        </div>
        <CardTitle class="text-2xl uppercase">Create Your Workspace</CardTitle>
        <CardDescription>Set up your team's home base</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="workspace-name">Workspace Name</Label>
          <Input id="workspace-name" v-model="workspaceName" placeholder="My Awesome Team" />
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="ghost" class="gap-2" @click="emit('back')">
          <ArrowLeft class="h-4 w-4" />
          Back
        </Button>
        <Button class="gap-2" @click="emit('next')">
          Continue
          <ArrowRight class="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Goal Selection Variant -->
  <div v-else-if="variant === 'goalSelection'" :class="cn('min-h-screen flex items-center justify-center p-6', props.class)">
    <Card class="w-full max-w-lg shadow-[8px_8px_0px_hsl(var(--shadow-color))]">
      <CardHeader class="text-center">
        <div class="w-16 h-16 mx-auto border-3 border-foreground bg-success shadow-[4px_4px_0px_hsl(var(--shadow-color))] flex items-center justify-center mb-4">
          <Target class="h-8 w-8 text-success-foreground" />
        </div>
        <CardTitle class="text-2xl uppercase">What are your goals?</CardTitle>
        <CardDescription>Select all that apply</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-3">
          <button
            v-for="goal in goals"
            :key="goal.id"
            :class="cn(
              'flex items-center gap-4 p-4 border-3 border-foreground text-left transition-all',
              selectedGoals.includes(goal.id)
                ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
                : 'hover:bg-muted'
            )"
            @click="toggleGoal(goal.id)"
          >
            <div :class="cn(
              'w-6 h-6 border-2 flex items-center justify-center shrink-0',
              selectedGoals.includes(goal.id) ? 'border-primary-foreground bg-primary-foreground' : 'border-foreground'
            )">
              <Check v-if="selectedGoals.includes(goal.id)" class="h-4 w-4 text-primary" />
            </div>
            <div>
              <p class="font-bold">{{ goal.label }}</p>
              <p v-if="goal.description" :class="cn(
                'text-sm',
                selectedGoals.includes(goal.id) ? 'text-primary-foreground/80' : 'text-muted-foreground'
              )">
                {{ goal.description }}
              </p>
            </div>
          </button>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="ghost" class="gap-2" @click="emit('back')">
          <ArrowLeft class="h-4 w-4" />
          Back
        </Button>
        <Button class="gap-2" @click="emit('next')">
          Continue
          <ArrowRight class="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </div>

  <!-- Completion Variant -->
  <div v-else-if="variant === 'completion'" :class="cn('min-h-screen flex items-center justify-center p-6 bg-success/5', props.class)">
    <div class="max-w-2xl text-center space-y-8">
      <div class="w-32 h-32 mx-auto border-3 border-foreground bg-success shadow-[8px_8px_0px_hsl(var(--shadow-color))] flex items-center justify-center">
        <Rocket class="h-16 w-16 text-success-foreground" />
      </div>
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase">You're all set!</h1>
        <p class="text-xl text-muted-foreground font-medium max-w-lg mx-auto">
          Your account is ready. Let's start building something amazing together.
        </p>
      </div>
      <div class="grid gap-4 max-w-md mx-auto">
        <div class="flex items-center gap-3 p-4 border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <Check class="h-6 w-6 text-success" />
          <span class="font-bold">Profile created</span>
        </div>
        <div class="flex items-center gap-3 p-4 border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <Check class="h-6 w-6 text-success" />
          <span class="font-bold">Workspace set up</span>
        </div>
        <div class="flex items-center gap-3 p-4 border-3 border-foreground bg-card shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <Check class="h-6 w-6 text-success" />
          <span class="font-bold">Goals configured</span>
        </div>
      </div>
      <Button size="lg" class="gap-2" @click="emit('complete', { name, email, workspaceName, goals: selectedGoals })">
        Go to Dashboard
        <ArrowRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
