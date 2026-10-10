/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// Typed here so the dev-only guards compile without @types/node (Vite's
// default tsconfig has none). `declare` emits nothing: bundlers still
// replace the literal process.env.NODE_ENV.
declare const process: { env: { NODE_ENV?: string } }

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
  const titleId = React.useId()
  const descriptionId = React.useId()

  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  // The tour visually covers the page with an opaque scrim, so it has to
  // behave like the modal dialog it looks like: focus moves in, Tab stays in,
  // Escape closes, and focus returns where it came from. Previously focus
  // stayed on the obscured page behind the scrim and Escape did nothing
  // (WCAG 2.1.2 / 4.1.2). Every other overlay in the library gets this from
  // Radix; Tour hand-rolls its portal, so it has to do it itself.
  React.useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    popoverRef.current?.focus()

    const focusableIn = (root: HTMLElement) =>
      [
        ...root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        ),
      ].filter((el) => el.offsetParent !== null || el === document.activeElement)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return

      const root = popoverRef.current
      if (!root) return
      const focusable = focusableIn(root)
      if (!focusable.length) {
        e.preventDefault()
        root.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      // `active === root` on open (the container holds initial focus but is
      // tabindex=-1, so it isn't in `focusable`) — without this the very first
      // Shift+Tab walked straight out of the dialog.
      if (!root.contains(active) || active === root) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      previouslyFocused?.focus?.()
    }
  }, [close])

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
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      className={cn(
        'fixed z-[9999] w-80 border-3 border-foreground bg-popover p-4',
        'shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
        'ease-out animate-in fade-in-0 zoom-in-95 duration-200',
        'focus:outline-none'
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
          'transition duration-150'
        )}
      >
        <X className="h-3 w-3 stroke-[3]" />
        <span className="sr-only">Close</span>
      </button>

      {/* Content */}
      <div className="space-y-3">
        <h3 id={titleId} className="text-base font-bold uppercase tracking-wide">
          {step.title}
        </h3>
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {step.description}
        </p>
        {step.content}
      </div>

      {/* Progress dots */}
      {showProgress && totalSteps > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-2 border-2 border-foreground transition duration-150',
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
          <Button size="sm" onClick={nextStep}>
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

      // Measure only. This runs on every scroll event, so it must NOT scroll:
      // calling scrollIntoView here re-entered itself through its own smooth
      // animation and pinned the page to the spotlight, fighting the user.
      const measure = () => {
        const element = getTargetElement(currentStepData.target)
        if (element) {
          setTargetRect(element.getBoundingClientRect())
        } else {
          // Target not found — fall back to center placement
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Tour] Step target "${currentStepData.target}" not found in DOM`)
          }
          setTargetRect(null)
        }
      }

      // Scrolling belongs to the step transition, not to measurement.
      getTargetElement(currentStepData.target)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      measure()

      // Coalesce to one measurement per frame — a capture-phase scroll handler
      // otherwise fires a setState per scroll event.
      let frame = 0
      const onViewportChange = () => {
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          measure()
        })
      }

      window.addEventListener('resize', onViewportChange)
      window.addEventListener('scroll', onViewportChange, true)

      return () => {
        if (frame) cancelAnimationFrame(frame)
        window.removeEventListener('resize', onViewportChange)
        window.removeEventListener('scroll', onViewportChange, true)
      }
    }, [open, currentStep, currentStepData])

    // Reset to the first step when the tour closes. Adjusted during render
    // rather than in an effect — reopening then never flashes the old step.
    const [prevOpen, setPrevOpen] = React.useState(open)
    if (prevOpen !== open) {
      setPrevOpen(open)
      if (!open) setCurrentStep(0)
    }

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
    }, [setOpen])

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

    return (
      <>
        {/* Stable ref anchor — always mounted so ref is never null */}
        <div ref={ref} style={{ display: 'none' }} />
        {open && currentStepData && createPortal(
          <TourContext.Provider value={contextValue}>
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
          </TourContext.Provider>,
          document.body
        )}
      </>
    )
  }
)
Tour.displayName = 'Tour'

export { Tour, useTour }
