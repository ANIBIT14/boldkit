import { BlockDoc } from '@/components/docs/BlockDoc'
import {
  OnboardingWizard,
  WelcomeScreen,
  ProfileSetup,
  WorkspaceSetup,
  GoalSelection,
  CompletionScreen,
} from '@/components/blocks/application/onboarding-flow'
import { User, Building, Target, Sparkles } from 'lucide-react'

const sampleSteps = [
  {
    id: 'welcome',
    title: 'Welcome to BoldKit',
    description: "Let's get you started with a quick setup.",
    icon: <Sparkles className="h-7 w-7" />,
    content: <p className="text-center text-muted-foreground">Welcome content goes here.</p>,
  },
  {
    id: 'profile',
    title: 'Set Up Your Profile',
    description: 'Tell us a bit about yourself.',
    icon: <User className="h-7 w-7" />,
    content: <p className="text-center text-muted-foreground">Profile form goes here.</p>,
  },
  {
    id: 'complete',
    title: "You're All Set!",
    description: 'Start building something amazing.',
    icon: <Target className="h-7 w-7" />,
    content: <p className="text-center text-muted-foreground">Completion content goes here.</p>,
  },
]

const sampleGoals = [
  { id: 'build', title: 'Build a product', description: 'Create a new application from scratch.', icon: <Building className="h-5 w-5" /> },
  { id: 'learn', title: 'Learn the system', description: 'Explore components and patterns.', icon: <Sparkles className="h-5 w-5" /> },
  { id: 'design', title: 'Design interfaces', description: 'Create beautiful UI designs.', icon: <Target className="h-5 w-5" /> },
]

const variants = [
  {
    name: 'Wizard',
    description: 'Multi-step onboarding wizard with progress.',
    preview: (
      <div className="py-8">
        <OnboardingWizard
          steps={sampleSteps}
          showProgress
          onComplete={() => console.log('Complete')}
        />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.Wizard
  steps={[
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Get started.',
      icon: <Sparkles />,
      content: <WelcomeContent />,
    },
  ]}
  showProgress
  onComplete={() => navigate('/dashboard')}
  onStepChange={(step) => trackStep(step)}
/>`,
    vueCode: `<script setup lang="ts">
import { OnboardingFlow } from '@/components/blocks/application'
</script>

<template>
  <OnboardingFlow variant="wizard" :steps="steps" show-progress @complete="handleComplete" />
</template>`,
  },
  {
    name: 'Welcome',
    description: 'Welcome screen with features overview.',
    preview: (
      <div className="py-8">
        <WelcomeScreen
          logo={<Sparkles className="h-10 w-10 text-primary-foreground" />}
          title="Welcome to BoldKit"
          subtitle="Build bold, expressive interfaces"
          features={[
            { icon: <Target className="h-5 w-5" />, title: 'Fast', description: 'Optimized performance' },
            { icon: <Building className="h-5 w-5" />, title: 'Flexible', description: 'Customizable components' },
            { icon: <User className="h-5 w-5" />, title: 'Friendly', description: 'Great developer experience' },
          ]}
          primaryAction={{ label: 'Get Started', onClick: () => {} }}
        />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.Welcome
  logo={<Logo />}
  title="Welcome to App"
  subtitle="Get started in minutes"
  features={[
    { icon: <Zap />, title: 'Fast', description: 'Optimized' },
  ]}
  primaryAction={{ label: 'Get Started', onClick: handleStart }}
  secondaryAction={{ label: 'Learn More', onClick: handleLearnMore }}
/>`,
    vueCode: `<template>
  <OnboardingFlow variant="welcome" title="Welcome" :features="features" @primary-click="handleStart" />
</template>`,
  },
  {
    name: 'ProfileSetup',
    description: 'User profile setup form.',
    preview: (
      <div className="py-8">
        <ProfileSetup onSubmit={(data) => console.log('Profile:', data)} />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.ProfileSetup
  availableRoles={[
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
  ]}
  availableInterests={[
    { value: 'web', label: 'Web Development' },
  ]}
  onSubmit={(data) => saveProfile(data)}
/>`,
    vueCode: `<template>
  <OnboardingFlow variant="profileSetup" :available-roles="roles" @submit="saveProfile" />
</template>`,
  },
  {
    name: 'WorkspaceSetup',
    description: 'Workspace/team creation form.',
    preview: (
      <div className="py-8">
        <WorkspaceSetup
          onSubmit={(data) => console.log('Workspace:', data)}
          onSkip={() => console.log('Skipped')}
        />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.WorkspaceSetup
  onSubmit={(data) => createWorkspace(data)}
  onSkip={() => skipWorkspaceSetup()}
/>`,
    vueCode: `<template>
  <OnboardingFlow variant="workspaceSetup" @submit="createWorkspace" @skip="skipSetup" />
</template>`,
  },
  {
    name: 'GoalSelection',
    description: 'Goal/preference selection screen.',
    preview: (
      <div className="py-8">
        <GoalSelection
          goals={sampleGoals}
          minSelection={1}
          maxSelection={3}
          onSubmit={(goals) => console.log('Goals:', goals)}
        />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.GoalSelection
  goals={[
    { id: 'build', title: 'Build a product', description: '...', icon: <Building /> },
  ]}
  minSelection={1}
  maxSelection={3}
  onSubmit={(selectedGoals) => saveGoals(selectedGoals)}
/>`,
    vueCode: `<template>
  <OnboardingFlow variant="goalSelection" :goals="goals" :max-selection="3" @submit="saveGoals" />
</template>`,
  },
  {
    name: 'Completion',
    description: 'Onboarding completion screen.',
    preview: (
      <div className="py-8">
        <CompletionScreen
          title="You're all set!"
          subtitle="Here are some things you can do next:"
          features={[
            { title: 'Explore components', description: 'Browse the component library.' },
            { title: 'Read documentation', description: 'Learn best practices.' },
            { title: 'Join community', description: 'Connect with other developers.' },
          ]}
          primaryAction={{ label: 'Go to Dashboard', onClick: () => {} }}
        />
      </div>
    ),
    reactCode: `import { OnboardingFlow } from '@/components/blocks/application'

<OnboardingFlow.Completion
  title="You're all set!"
  subtitle="Here are some things you can do next:"
  features={[
    { title: 'Explore', description: 'Browse components.' },
  ]}
  primaryAction={{ label: 'Go to Dashboard', onClick: handleDashboard }}
/>`,
    vueCode: `<template>
  <OnboardingFlow
    variant="completion"
    title="You're all set!"
    :features="features"
    @primary-click="goToDashboard"
  />
</template>`,
  },
]

export function OnboardingFlowDoc() {
  return (
    <BlockDoc
      name="Onboarding Flow"
      description="User onboarding components including step wizards, welcome screens, profile setup, workspace creation, goal selection, and completion screens."
      category="application"
      variants={variants}
    />
  )
}

export default OnboardingFlowDoc
