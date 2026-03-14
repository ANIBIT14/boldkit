import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface TourStep {
  target: string | HTMLElement | React.RefObject<HTMLElement>
  title: string
  description: string
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  spotlightPadding?: number
  content?: React.ReactNode
}

export interface TourProps {
  steps: TourStep[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onComplete?: () => void
  onSkip?: () => void
  showSkipButton?: boolean
  showProgress?: boolean
}

interface TourContextValue {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  close: () => void
  skip: () => void
}

const TourContext = React.createContext<TourContextValue | null>(null)

function useTour() {
  const context = React.useContext(TourContext)
  if (!context) {
    throw new Error('useTour must be used within a <Tour />')
  }
  return context
}

// Get element from target
function getTargetElement(
  target: string | HTMLElement | React.RefObject<HTMLElement>
): HTMLElement | null {
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  if (target instanceof HTMLElement) {
    return target
  }
  return target.current
}

// Calculate popover position
function calculatePosition(
  targetRect: DOMRect,
  popoverRect: DOMRect,
  placement: TourStep['placement'] = 'bottom',
  padding: number = 8
): { top: number; left: number; actualPlacement: TourStep['placement'] } {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  let top = 0
  let left = 0
  let actualPlacement = placement

  if (placement === 'center') {
    return {
      top: viewport.height / 2 - popoverRect.height / 2,
      left: viewport.width / 2 - popoverRect.width / 2,
      actualPlacement: 'center',
    }
  }

  // Calculate base positions
  switch (placement) {
    case 'top':
      top = targetRect.top - popoverRect.height - padding
      left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2
      break
    case 'bottom':
      top = targetRect.bottom + padding
      left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2
      break
    case 'left':
      top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2
      left = targetRect.left - popoverRect.width - padding
      break
    case 'right':
      top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2
      left = targetRect.right + padding
      break
  }

  // Check if popover fits, flip if necessary
  if (placement === 'top' && top < 0) {
    top = targetRect.bottom + padding
    actualPlacement = 'bottom'
  } else if (placement === 'bottom' && top + popoverRect.height > viewport.height) {
    top = targetRect.top - popoverRect.height - padding
    actualPlacement = 'top'
  } else if (placement === 'left' && left < 0) {
    left = targetRect.right + padding
    actualPlacement = 'right'
  } else if (placement === 'right' && left + popoverRect.width > viewport.width) {
    left = targetRect.left - popoverRect.width - padding
    actualPlacement = 'left'
  }

  // Keep within viewport bounds
  left = Math.max(padding, Math.min(left, viewport.width - popoverRect.width - padding))
  top = Math.max(padding, Math.min(top, viewport.height - popoverRect.height - padding))

  return { top, left, actualPlacement }
}

// Tour Overlay
interface TourOverlayProps {
  targetRect: DOMRect | null
  spotlightPadding: number
}

function TourOverlay({ targetRect, spotlightPadding }: TourOverlayProps) {
  if (!targetRect) {
    // Center placement - full overlay
    return (
      <div className="fixed inset-0 z-[9998] bg-black/70" />
    )
  }

  const spotlightRect = {
    top: targetRect.top - spotlightPadding,
    left: targetRect.left - spotlightPadding,
    width: targetRect.width + spotlightPadding * 2,
    height: targetRect.height + spotlightPadding * 2,
  }

  return (
    <div
      className="fixed inset-0 z-[9998]"
      style={{
        background: `
          linear-gradient(to right, rgba(0,0,0,0.7) ${spotlightRect.left}px, transparent ${spotlightRect.left}px, transparent ${spotlightRect.left + spotlightRect.width}px, rgba(0,0,0,0.7) ${spotlightRect.left + spotlightRect.width}px),
          linear-gradient(to bottom, rgba(0,0,0,0.7) ${spotlightRect.top}px, transparent ${spotlightRect.top}px, transparent ${spotlightRect.top + spotlightRect.height}px, rgba(0,0,0,0.7) ${spotlightRect.top + spotlightRect.height}px)
        `,
        backgroundBlendMode: 'multiply',
      }}
    />
  )
}

// Tour Popover
interface TourPopoverProps {
  step: TourStep
  targetRect: DOMRect | null
  showSkipButton: boolean
  showProgress: boolean
}

function TourPopover({
  step,
  targetRect,
  showSkipButton,
  showProgress,
}: TourPopoverProps) {
  const { currentStep, totalSteps, nextStep, prevStep, close, skip } = useTour()
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })

  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  // Calculate position
  React.useEffect(() => {
    if (!popoverRef.current) return

    const popoverRect = popoverRef.current.getBoundingClientRect()

    if (step.placement === 'center' || !targetRect) {
      setPosition({
        top: window.innerHeight / 2 - popoverRect.height / 2,
        left: window.innerWidth / 2 - popoverRect.width / 2,
      })
    } else {
      const pos = calculatePosition(
        targetRect,
        popoverRect,
        step.placement,
        16
      )
      setPosition({ top: pos.top, left: pos.left })
    }
  }, [step, targetRect])

  return (
    <div
      ref={popoverRef}
      className={cn(
        'fixed z-[9999] w-80 border-3 border-foreground bg-popover p-4',
        'shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
        'animate-in fade-in-0 zoom-in-95 duration-200'
      )}
      style={{ top: position.top, left: position.left }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={close}
        className={cn(
          'absolute -right-3 -top-3 border-2 border-foreground bg-background p-1',
          'shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
          'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
          'transition-all duration-150'
        )}
      >
        <X className="h-3 w-3 stroke-[3]" />
        <span className="sr-only">Close</span>
      </button>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-base font-bold uppercase tracking-wide">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
        {step.content}
      </div>

      {/* Progress dots */}
      {showProgress && totalSteps > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-2 border-2 border-foreground transition-all duration-150',
                i === currentStep ? 'bg-primary scale-110' : 'bg-muted'
              )}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          {showSkipButton && !isLast && (
            <Button
              variant="ghost"
              size="sm"
              onClick={skip}
              className="text-muted-foreground"
            >
              Skip Tour
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button variant="outline" size="sm" onClick={prevStep}>
              Previous
            </Button>
          )}
          <Button size="sm" onClick={isLast ? close : nextStep}>
            {isLast ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main Tour Component
const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  (
    {
      steps,
      open: controlledOpen,
      onOpenChange,
      onComplete,
      onSkip,
      showSkipButton = true,
      showProgress = true,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const [currentStep, setCurrentStep] = React.useState(0)
    const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    const currentStepData = steps[currentStep]

    // Update target rect when step changes
    React.useEffect(() => {
      if (!open || !currentStepData) return

      const updateRect = () => {
        const element = getTargetElement(currentStepData.target)
        if (element) {
          const rect = element.getBoundingClientRect()
          setTargetRect(rect)

          // Scroll element into view
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        } else if (currentStepData.placement === 'center') {
          setTargetRect(null)
        }
      }

      updateRect()

      // Update on resize/scroll
      window.addEventListener('resize', updateRect)
      window.addEventListener('scroll', updateRect, true)

      return () => {
        window.removeEventListener('resize', updateRect)
        window.removeEventListener('scroll', updateRect, true)
      }
    }, [open, currentStep, currentStepData])

    // Reset step when closed
    React.useEffect(() => {
      if (!open) {
        setCurrentStep(0)
      }
    }, [open])

    const nextStep = React.useCallback(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setOpen(false)
        onComplete?.()
      }
    }, [currentStep, steps.length, setOpen, onComplete])

    const prevStep = React.useCallback(() => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1)
      }
    }, [currentStep])

    const goToStep = React.useCallback((index: number) => {
      if (index >= 0 && index < steps.length) {
        setCurrentStep(index)
      }
    }, [steps.length])

    const close = React.useCallback(() => {
      setOpen(false)
      if (currentStep === steps.length - 1) {
        onComplete?.()
      }
    }, [setOpen, currentStep, steps.length, onComplete])

    const skip = React.useCallback(() => {
      setOpen(false)
      onSkip?.()
    }, [setOpen, onSkip])

    const contextValue = React.useMemo<TourContextValue>(
      () => ({
        currentStep,
        totalSteps: steps.length,
        nextStep,
        prevStep,
        goToStep,
        close,
        skip,
      }),
      [currentStep, steps.length, nextStep, prevStep, goToStep, close, skip]
    )

    if (!open || !currentStepData) return null

    return createPortal(
      <TourContext.Provider value={contextValue}>
        <div ref={ref}>
          <TourOverlay
            targetRect={targetRect}
            spotlightPadding={currentStepData.spotlightPadding ?? 8}
          />
          <TourPopover
            step={currentStepData}
            targetRect={targetRect}
            showSkipButton={showSkipButton}
            showProgress={showProgress}
          />
        </div>
      </TourContext.Provider>,
      document.body
    )
  }
)
Tour.displayName = 'Tour'

export { Tour, useTour }
