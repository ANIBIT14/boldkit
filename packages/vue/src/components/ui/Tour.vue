<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, provide, type Ref, type InjectionKey, type ComputedRef } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import Button from './Button.vue'

export interface TourStep {
  target: string | HTMLElement | Ref<HTMLElement | undefined>
  title: string
  description: string
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  spotlightPadding?: number
}

export interface TourProps {
  steps: TourStep[]
  open?: boolean
  showSkipButton?: boolean
  showProgress?: boolean
}

interface TourContextValue {
  currentStep: Ref<number>
  totalSteps: ComputedRef<number>
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  close: () => void
  skip: () => void
}

const TOUR_INJECTION_KEY: InjectionKey<TourContextValue> = Symbol('tour')

const props = withDefaults(defineProps<TourProps>(), {
  open: false,
  showSkipButton: true,
  showProgress: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  complete: []
  skip: []
}>()

const currentStep = ref(0)
const targetRect = ref<DOMRect | null>(null)
const popoverRef = ref<HTMLDivElement | undefined>()
const popoverPosition = ref({ top: 0, left: 0 })

const isOpen = computed(() => props.open)
const currentStepData = computed(() => props.steps[currentStep.value])
const isFirst = computed(() => currentStep.value === 0)
const isLast = computed(() => currentStep.value === props.steps.length - 1)
const totalSteps = computed(() => props.steps.length)

// Get element from target
function getTargetElement(target: TourStep['target']): HTMLElement | null {
  // SSR guard
  if (typeof document === 'undefined') return null

  if (typeof target === 'string') {
    if (target === 'center') return null
    return document.querySelector(target)
  }
  if (target instanceof HTMLElement) {
    return target
  }
  // Vue ref
  return target.value || null
}

// Calculate popover position with flip logic
function calculatePosition(
  targetRect: DOMRect,
  popoverRect: DOMRect,
  placement: TourStep['placement'] = 'bottom',
  padding: number = 16
): { top: number; left: number } {
  // SSR guard
  if (typeof window === 'undefined') return { top: 0, left: 0 }

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  let top = 0
  let left = 0

  if (placement === 'center') {
    return {
      top: viewport.height / 2 - popoverRect.height / 2,
      left: viewport.width / 2 - popoverRect.width / 2,
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
  } else if (placement === 'bottom' && top + popoverRect.height > viewport.height) {
    top = targetRect.top - popoverRect.height - padding
  } else if (placement === 'left' && left < 0) {
    left = targetRect.right + padding
  } else if (placement === 'right' && left + popoverRect.width > viewport.width) {
    left = targetRect.left - popoverRect.width - padding
  }

  // Keep within viewport bounds
  left = Math.max(padding, Math.min(left, viewport.width - popoverRect.width - padding))
  top = Math.max(padding, Math.min(top, viewport.height - popoverRect.height - padding))

  return { top, left }
}

// Update target rect and scroll into view
function updateTargetRect() {
  if (!isOpen.value || !currentStepData.value) return

  const element = getTargetElement(currentStepData.value.target)
  if (element) {
    const rect = element.getBoundingClientRect()
    targetRect.value = rect

    // Scroll element into view
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  } else if (currentStepData.value.placement === 'center' || currentStepData.value.target === 'center') {
    targetRect.value = null
  }
}

// Update popover position
async function updatePopoverPosition() {
  await nextTick()
  // SSR guard
  if (typeof window === 'undefined') return
  if (!popoverRef.value) return

  const popoverRect = popoverRef.value.getBoundingClientRect()
  const stepData = currentStepData.value

  if (!stepData) return

  if (stepData.placement === 'center' || stepData.target === 'center' || !targetRect.value) {
    popoverPosition.value = {
      top: window.innerHeight / 2 - popoverRect.height / 2,
      left: window.innerWidth / 2 - popoverRect.width / 2,
    }
  } else {
    popoverPosition.value = calculatePosition(
      targetRect.value,
      popoverRect,
      stepData.placement,
      16
    )
  }
}

// Navigation functions
function nextStep() {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++
  } else {
    closeAndComplete()
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function goToStep(index: number) {
  if (index >= 0 && index < props.steps.length) {
    currentStep.value = index
  }
}

function closeTour() {
  emit('update:open', false)
}

function closeAndComplete() {
  emit('update:open', false)
  emit('complete')
}

function skipTour() {
  emit('update:open', false)
  emit('skip')
}

// Computed spotlight rect
const spotlightRect = computed(() => {
  if (!targetRect.value) return null
  const padding = currentStepData.value?.spotlightPadding ?? 8
  return {
    top: targetRect.value.top - padding,
    left: targetRect.value.left - padding,
    width: targetRect.value.width + padding * 2,
    height: targetRect.value.height + padding * 2,
  }
})

// Spotlight element style — uses box-shadow with huge spread to create uniform
// dark overlay around the transparent spotlight area, avoiding corner opacity
// artifacts from stacked linear-gradients.
const spotlightStyle = computed(() => {
  if (!spotlightRect.value) return null
  const rect = spotlightRect.value
  return {
    position: 'fixed' as const,
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
    pointerEvents: 'none' as const,
    zIndex: 9998,
  }
})

// Watchers
watch(isOpen, (newVal) => {
  if (!newVal) {
    currentStep.value = 0
  } else {
    nextTick(() => {
      updateTargetRect()
      updatePopoverPosition()
    })
  }
})

watch(currentStep, () => {
  nextTick(() => {
    updateTargetRect()
    updatePopoverPosition()
  })
})

watch(targetRect, () => {
  updatePopoverPosition()
})

// Event handlers for resize/scroll
function handleResize() {
  updateTargetRect()
}

function handleScroll() {
  updateTargetRect()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)

  if (isOpen.value) {
    updateTargetRect()
    updatePopoverPosition()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
})

// Provide context for potential child components
provide(TOUR_INJECTION_KEY, {
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  goToStep,
  close: closeTour,
  skip: skipTour,
})

// Export for external use
defineExpose({
  currentStep,
  nextStep,
  prevStep,
  goToStep,
  close: closeTour,
  skip: skipTour,
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen && currentStepData">
      <!-- Full dark overlay (no spotlight) -->
      <div
        v-if="!spotlightStyle"
        class="fixed inset-0 z-[9998]"
        style="background: rgba(0,0,0,0.7)"
      />
      <!-- Spotlight: transparent element with box-shadow spread as overlay -->
      <div
        v-else
        :style="spotlightStyle"
      />

      <!-- Popover -->
      <div
        ref="popoverRef"
        :class="cn(
          'fixed z-[9999] w-80 border-3 border-foreground bg-popover p-4',
          'shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )"
        :style="{ top: `${popoverPosition.top}px`, left: `${popoverPosition.left}px` }"
      >
        <!-- Close button -->
        <button
          type="button"
          :class="cn(
            'absolute -right-3 -top-3 border-2 border-foreground bg-background p-1',
            'shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
            'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
            'transition-all duration-150'
          )"
          @click="closeTour"
        >
          <X class="h-3 w-3 stroke-[3]" />
          <span class="sr-only">Close</span>
        </button>

        <!-- Content -->
        <div class="space-y-3">
          <h3 class="text-base font-bold uppercase tracking-wide">
            {{ currentStepData.title }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ currentStepData.description }}
          </p>
          <slot name="content" :step="currentStepData" :step-index="currentStep" />
        </div>

        <!-- Progress dots -->
        <div
          v-if="showProgress && totalSteps > 1"
          class="mt-4 flex items-center justify-center gap-1.5"
        >
          <div
            v-for="(_, i) in steps"
            :key="i"
            :class="cn(
              'h-2 w-2 border-2 border-foreground transition-all duration-150',
              i === currentStep ? 'bg-primary scale-110' : 'bg-muted'
            )"
          />
        </div>

        <!-- Navigation -->
        <div class="mt-4 flex items-center justify-between gap-2">
          <div>
            <Button
              v-if="showSkipButton && !isLast"
              variant="ghost"
              size="sm"
              class="text-muted-foreground"
              @click="skipTour"
            >
              Skip Tour
            </Button>
          </div>
          <div class="flex items-center gap-2">
            <Button
              v-if="!isFirst"
              variant="outline"
              size="sm"
              @click="prevStep"
            >
              Previous
            </Button>
            <Button
              size="sm"
              @click="isLast ? closeAndComplete() : nextStep()"
            >
              {{ isLast ? 'Finish' : 'Next' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
