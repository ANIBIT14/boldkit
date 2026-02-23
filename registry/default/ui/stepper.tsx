import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

// Context
interface StepperContextValue {
  activeStep: number
  setActiveStep: (step: number) => void
  totalSteps: number
  orientation: 'horizontal' | 'vertical'
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a <Stepper />')
  }
  return context
}

// Step variants
const stepVariants = cva(
  'flex items-center justify-center border-3 border-foreground font-bold transition-all duration-200',
  {
    variants: {
      state: {
        completed: 'bg-success text-success-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        active: 'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: {
      state: 'upcoming',
      size: 'md',
    },
  }
)

// Stepper Root
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number
  onStepChange?: (step: number) => void
  orientation?: 'horizontal' | 'vertical'
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      activeStep: controlledActiveStep,
      onStepChange,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledActiveStep, setUncontrolledActiveStep] = React.useState(0)

    const isControlled = controlledActiveStep !== undefined
    const activeStep = isControlled ? controlledActiveStep : uncontrolledActiveStep

    const setActiveStep = React.useCallback(
      (step: number) => {
        if (!isControlled) {
          setUncontrolledActiveStep(step)
        }
        onStepChange?.(step)
      },
      [isControlled, onStepChange]
    )

    // Count total steps from children
    const totalSteps = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === StepperItem
    ).length

    return (
      <StepperContext.Provider value={{ activeStep, setActiveStep, totalSteps, orientation }}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-col' : 'flex-row',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = 'Stepper'

// Stepper List (container for triggers)
export interface StepperListProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperList = React.forwardRef<HTMLDivElement, StepperListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useStepperContext()

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'flex items-center',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col items-start',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
StepperList.displayName = 'StepperList'

// Stepper Item (wrapper for a single step)
interface StepperItemContextValue {
  index: number
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(null)

function useStepperItemContext() {
  const context = React.useContext(StepperItemContext)
  if (!context) {
    throw new Error('StepperItem components must be used within a <StepperItem />')
  }
  return context
}

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ index, className, children, ...props }, ref) => {
    const { orientation } = useStepperContext()

    return (
      <StepperItemContext.Provider value={{ index }}>
        <div
          ref={ref}
          className={cn(
            'flex items-center',
            orientation === 'horizontal' ? 'flex-row' : 'flex-col',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperItemContext.Provider>
    )
  }
)
StepperItem.displayName = 'StepperItem'

// Stepper Trigger (the clickable step indicator)
export interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stepVariants> {
  showStepNumber?: boolean
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ size, showStepNumber = true, className, children, ...props }, ref) => {
    const { activeStep, setActiveStep } = useStepperContext()
    const { index } = useStepperItemContext()

    const state: 'completed' | 'active' | 'upcoming' =
      index < activeStep ? 'completed' : index === activeStep ? 'active' : 'upcoming'

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={state === 'active'}
        onClick={() => setActiveStep(index)}
        className={cn(stepVariants({ state, size }), className)}
        {...props}
      >
        {state === 'completed' ? (
          <Check className="h-5 w-5" />
        ) : showStepNumber ? (
          index + 1
        ) : (
          children
        )}
      </button>
    )
  }
)
StepperTrigger.displayName = 'StepperTrigger'

// Stepper Separator (line between steps)
export interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { activeStep, orientation } = useStepperContext()
    const { index } = useStepperItemContext()

    const isCompleted = index < activeStep

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200',
          orientation === 'horizontal'
            ? 'h-[3px] flex-1 min-w-8 mx-2'
            : 'w-[3px] min-h-8 my-2 ml-5',
          isCompleted
            ? 'bg-foreground'
            : 'bg-foreground/30 border-foreground/30',
          !isCompleted && 'border-dashed border-2 bg-transparent',
          className
        )}
        {...props}
      />
    )
  }
)
StepperSeparator.displayName = 'StepperSeparator'

// Stepper Content (panel for each step)
export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ index, className, children, ...props }, ref) => {
    const { activeStep } = useStepperContext()

    if (index !== activeStep) {
      return null
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'mt-4 animate-[slide-in-from-bottom_200ms_ease-out]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
StepperContent.displayName = 'StepperContent'

// Stepper Actions (prev/next buttons helper)
export interface StepperActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  onComplete?: () => void
  prevLabel?: string
  nextLabel?: string
  completeLabel?: string
}

const StepperActions = React.forwardRef<HTMLDivElement, StepperActionsProps>(
  (
    {
      onComplete,
      prevLabel = 'Previous',
      nextLabel = 'Next',
      completeLabel = 'Complete',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { activeStep, setActiveStep, totalSteps } = useStepperContext()

    const isFirst = activeStep === 0
    const isLast = activeStep === totalSteps - 1

    const handlePrev = () => {
      if (!isFirst) {
        setActiveStep(activeStep - 1)
      }
    }

    const handleNext = () => {
      if (isLast) {
        onComplete?.()
      } else {
        setActiveStep(activeStep + 1)
      }
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 mt-4', className)}
        {...props}
      >
        {children || (
          <>
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className={cn(
                'px-4 py-2 border-3 border-foreground font-bold uppercase text-sm',
                'bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
                'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
                'disabled:opacity-50 disabled:pointer-events-none',
                'transition-all duration-200'
              )}
            >
              {prevLabel}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={cn(
                'px-4 py-2 border-3 border-foreground font-bold uppercase text-sm',
                'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
                'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
                'transition-all duration-200'
              )}
            >
              {isLast ? completeLabel : nextLabel}
            </button>
          </>
        )}
      </div>
    )
  }
)
StepperActions.displayName = 'StepperActions'

export {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
  StepperActions,
  stepVariants,
  useStepperContext,
}
