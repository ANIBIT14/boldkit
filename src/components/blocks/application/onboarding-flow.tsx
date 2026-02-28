import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Building,
  Target,
  Sparkles,
  PartyPopper,
  Upload,
} from 'lucide-react'

// ============================================================================
// ONBOARDING VARIANT 1: Step Wizard
// ============================================================================
export interface OnboardingStep {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  content: React.ReactNode
  optional?: boolean
}

export interface OnboardingWizardProps {
  steps: OnboardingStep[]
  onComplete?: () => void
  onStepChange?: (stepIndex: number) => void
  showProgress?: boolean
  className?: string
}

export function OnboardingWizard({
  steps,
  onComplete,
  onStepChange,
  showProgress = true,
  className,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      onStepChange?.(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      onStepChange?.(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (steps[currentStep].optional) {
      handleNext()
    }
  }

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Progress */}
      {showProgress && (
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold uppercase tracking-wide">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      )}

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'w-10 h-10 flex items-center justify-center border-3 border-foreground font-bold transition-all',
                index < currentStep
                  ? 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
                  : index === currentStep
                    ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110'
                    : 'bg-muted text-muted-foreground'
              )}
            >
              {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 w-8 transition-colors',
                  index < currentStep ? 'bg-success' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader className="text-center">
          {steps[currentStep].icon && (
            <div className="w-16 h-16 mx-auto flex items-center justify-center border-3 border-foreground bg-primary/10 shadow-[4px_4px_0px_hsl(var(--shadow-color))] mb-4">
              {steps[currentStep].icon}
            </div>
          )}
          <CardTitle className="text-2xl font-black uppercase">
            {steps[currentStep].title}
          </CardTitle>
          {steps[currentStep].description && (
            <CardDescription>{steps[currentStep].description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {steps[currentStep].content}

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              {steps[currentStep].optional && (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// ONBOARDING VARIANT 2: Welcome Screen
// ============================================================================
export interface WelcomeScreenProps {
  logo?: React.ReactNode
  title?: string
  subtitle?: string
  features?: Array<{ icon: React.ReactNode; title: string; description: string }>
  primaryAction?: { label: string; onClick?: () => void }
  secondaryAction?: { label: string; onClick?: () => void }
  className?: string
}

export function WelcomeScreen({
  logo,
  title = 'Welcome to the app',
  subtitle = "Let's get you started with a quick setup",
  features,
  primaryAction,
  secondaryAction,
  className,
}: WelcomeScreenProps) {
  return (
    <div className={cn('w-full max-w-2xl mx-auto text-center', className)}>
      <Card>
        <CardContent className="pt-8 pb-8 space-y-8">
          {logo && (
            <div className="w-20 h-20 mx-auto flex items-center justify-center border-3 border-foreground bg-primary shadow-[6px_6px_0px_hsl(var(--shadow-color))]">
              {logo}
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>

          {features && features.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-3 border-foreground p-4 bg-muted/30 space-y-2"
                >
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-foreground bg-card">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {primaryAction && (
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" size="lg" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// ONBOARDING VARIANT 3: User Profile Setup
// ============================================================================
export interface ProfileSetupProps {
  onSubmit?: (data: {
    name: string
    role: string
    avatar?: File
    interests: string[]
  }) => void
  availableRoles?: Array<{ value: string; label: string }>
  availableInterests?: Array<{ value: string; label: string }>
  className?: string
}

const defaultRoles = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Product Manager' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
]

const defaultInterests = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'ai', label: 'AI & Machine Learning' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'data', label: 'Data Science' },
  { value: 'devops', label: 'DevOps' },
]

export function ProfileSetup({
  onSubmit,
  availableRoles = defaultRoles,
  availableInterests = defaultInterests,
  className,
}: ProfileSetupProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    role: '',
    interests: [] as string[],
  })
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({
      ...formData,
      avatar: fileInputRef.current?.files?.[0],
    })
  }

  return (
    <Card className={cn('w-full max-w-lg mx-auto', className)}>
      <CardHeader className="text-center">
        <div className="w-14 h-14 mx-auto flex items-center justify-center border-3 border-foreground bg-primary/10 shadow-[4px_4px_0px_hsl(var(--shadow-color))] mb-2">
          <User className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl font-black uppercase">
          Set Up Your Profile
        </CardTitle>
        <CardDescription>Tell us a bit about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 border-3 border-dashed border-foreground bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </button>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold uppercase text-xs">
              Your Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="What should we call you?"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label className="font-bold uppercase text-xs">Your Role</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableRoles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.value })}
                  className={cn(
                    'p-2 text-sm border-2 border-foreground font-medium transition-all',
                    formData.role === role.value
                      ? 'bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]'
                      : 'bg-card hover:bg-muted'
                  )}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label className="font-bold uppercase text-xs">
              Your Interests <span className="text-muted-foreground">(Select all that apply)</span>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {availableInterests.map((interest) => (
                <button
                  key={interest.value}
                  type="button"
                  onClick={() => toggleInterest(interest.value)}
                  className={cn(
                    'p-2 text-sm border-2 border-foreground font-medium transition-all flex items-center gap-2',
                    formData.interests.includes(interest.value)
                      ? 'bg-secondary text-secondary-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]'
                      : 'bg-card hover:bg-muted'
                  )}
                >
                  <div
                    className={cn(
                      'w-4 h-4 border-2 border-current flex items-center justify-center',
                      formData.interests.includes(interest.value) && 'bg-current'
                    )}
                  >
                    {formData.interests.includes(interest.value) && (
                      <Check className="h-3 w-3 text-secondary" />
                    )}
                  </div>
                  {interest.label}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// ONBOARDING VARIANT 4: Workspace/Team Setup
// ============================================================================
export interface WorkspaceSetupProps {
  onSubmit?: (data: { name: string; members: string[] }) => void
  onSkip?: () => void
  className?: string
}

export function WorkspaceSetup({
  onSubmit,
  onSkip,
  className,
}: WorkspaceSetupProps) {
  const [workspaceName, setWorkspaceName] = React.useState('')
  const [memberEmail, setMemberEmail] = React.useState('')
  const [members, setMembers] = React.useState<string[]>([])

  const addMember = () => {
    if (memberEmail && !members.includes(memberEmail)) {
      setMembers([...members, memberEmail])
      setMemberEmail('')
    }
  }

  const removeMember = (email: string) => {
    setMembers(members.filter((m) => m !== email))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ name: workspaceName, members })
  }

  return (
    <Card className={cn('w-full max-w-lg mx-auto', className)}>
      <CardHeader className="text-center">
        <div className="w-14 h-14 mx-auto flex items-center justify-center border-3 border-foreground bg-secondary/10 shadow-[4px_4px_0px_hsl(var(--shadow-color))] mb-2">
          <Building className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl font-black uppercase">
          Create Your Workspace
        </CardTitle>
        <CardDescription>Set up your team workspace and invite members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="workspace" className="font-bold uppercase text-xs">
              Workspace Name
            </Label>
            <Input
              id="workspace"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g., Acme Inc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invite" className="font-bold uppercase text-xs">
              Invite Team Members <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="invite"
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                placeholder="colleague@email.com"
              />
              <Button type="button" variant="outline" onClick={addMember}>
                Add
              </Button>
            </div>
          </div>

          {members.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Pending Invites ({members.length})
              </p>
              <div className="space-y-2">
                {members.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between border-2 border-foreground p-2 bg-muted/30"
                  >
                    <span className="text-sm">{email}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(email)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {onSkip && (
              <Button type="button" variant="outline" className="flex-1" onClick={onSkip}>
                Skip for Now
              </Button>
            )}
            <Button type="submit" className="flex-1">
              Create Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// ONBOARDING VARIANT 5: Goal Selection
// ============================================================================
export interface GoalSelectionProps {
  goals: Array<{
    id: string
    title: string
    description: string
    icon: React.ReactNode
  }>
  onSubmit?: (selectedGoals: string[]) => void
  minSelection?: number
  maxSelection?: number
  className?: string
}

export function GoalSelection({
  goals,
  onSubmit,
  minSelection = 1,
  maxSelection = 3,
  className,
}: GoalSelectionProps) {
  const [selected, setSelected] = React.useState<string[]>([])

  const toggleGoal = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else if (selected.length < maxSelection) {
      setSelected([...selected, id])
    }
  }

  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader className="text-center">
        <div className="w-14 h-14 mx-auto flex items-center justify-center border-3 border-foreground bg-accent/10 shadow-[4px_4px_0px_hsl(var(--shadow-color))] mb-2">
          <Target className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl font-black uppercase">
          What are your goals?
        </CardTitle>
        <CardDescription>
          Select up to {maxSelection} goals to personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                'flex items-start gap-4 p-4 border-3 border-foreground text-left transition-all',
                selected.includes(goal.id)
                  ? 'bg-primary/10 shadow-[4px_4px_0px_hsl(var(--shadow-color))] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-card hover:bg-muted'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 flex items-center justify-center border-2 border-foreground shrink-0',
                  selected.includes(goal.id) ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                {goal.icon}
              </div>
              <div>
                <h3 className="font-bold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => onSubmit?.(selected)}
          disabled={selected.length < minSelection}
        >
          Continue with {selected.length} goal{selected.length !== 1 ? 's' : ''}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// ONBOARDING VARIANT 6: Completion Screen
// ============================================================================
export interface CompletionScreenProps {
  title?: string
  subtitle?: string
  features?: Array<{ title: string; description: string }>
  primaryAction?: { label: string; onClick?: () => void }
  className?: string
}

export function CompletionScreen({
  title = "You're all set!",
  subtitle = 'Your account is ready to go. Here are some things you can do next:',
  features,
  primaryAction,
  className,
}: CompletionScreenProps) {
  return (
    <Card className={cn('w-full max-w-lg mx-auto', className)}>
      <CardContent className="pt-8 pb-8 text-center space-y-6">
        <div className="w-20 h-20 mx-auto flex items-center justify-center border-3 border-foreground bg-success shadow-[6px_6px_0px_hsl(var(--shadow-color))] text-success-foreground">
          <PartyPopper className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {features && features.length > 0 && (
          <div className="space-y-3 text-left">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-2 border-foreground p-3 bg-muted/30"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-success text-success-foreground border-2 border-foreground shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {primaryAction && (
          <Button size="lg" className="w-full" onClick={primaryAction.onClick}>
            <Sparkles className="mr-2 h-4 w-4" />
            {primaryAction.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const OnboardingFlow = {
  Wizard: OnboardingWizard,
  Welcome: WelcomeScreen,
  ProfileSetup: ProfileSetup,
  WorkspaceSetup: WorkspaceSetup,
  GoalSelection: GoalSelection,
  Completion: CompletionScreen,
}
