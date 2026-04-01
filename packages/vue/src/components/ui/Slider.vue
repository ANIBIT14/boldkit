<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  stiffness?: number
  damping?: number
  mass?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: 'horizontal',
  stiffness: 400,
  damping: 28,
  mass: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
  'valueCommit': [value: number[]]
}>()

interface SpringState {
  position: number
  velocity: number
}

const trackRef = ref<HTMLDivElement | null>(null)
const internalValue = ref<number[]>(props.modelValue ?? props.defaultValue)

const isControlled = computed(() => props.modelValue !== undefined)
const actualValue = computed(() => isControlled.value ? props.modelValue! : internalValue.value)
const isRange = computed(() => actualValue.value.length > 1)

// Spring physics state
const springs = ref<SpringState[]>(
  actualValue.value.map((v) => ({
    position: ((v - props.min) / (props.max - props.min)) * 100,
    velocity: 0,
  }))
)

const targets = ref<number[]>(
  actualValue.value.map((v) => ((v - props.min) / (props.max - props.min)) * 100)
)

const activeThumb = ref<number | null>(null)
const hoveringThumb = ref<number | null>(null)
const squishes = ref<{ scaleX: number; scaleY: number }[]>(
  actualValue.value.map(() => ({ scaleX: 1, scaleY: 1 }))
)

let animationId: number | null = null
let lastTime = 0

// Update targets when value changes
watch(actualValue, (newValue) => {
  targets.value = newValue.map((v) => ((v - props.min) / (props.max - props.min)) * 100)

  if (springs.value.length !== newValue.length) {
    springs.value = newValue.map((v) => ({
      position: ((v - props.min) / (props.max - props.min)) * 100,
      velocity: 0,
    }))
    squishes.value = newValue.map(() => ({ scaleX: 1, scaleY: 1 }))
  }
}, { deep: true })

// Spring physics simulation
function simulate(timestamp: number) {
  if (!lastTime) lastTime = timestamp

  const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.064)
  lastTime = timestamp

  const newSprings: SpringState[] = []
  const newSquishes: { scaleX: number; scaleY: number }[] = []
  let allSettled = true

  for (let i = 0; i < springs.value.length; i++) {
    const displacement = targets.value[i] - springs.value[i].position
    const springForce = props.stiffness * displacement
    const dampingForce = props.damping * springs.value[i].velocity
    const acceleration = (springForce - dampingForce) / props.mass

    const newVelocity = springs.value[i].velocity + acceleration * deltaTime
    const newPosition = springs.value[i].position + newVelocity * deltaTime

    const velocityMagnitude = Math.abs(newVelocity)
    const squishAmount = Math.min(velocityMagnitude / 500, 0.25)
    const direction = newVelocity > 0 ? 1 : -1

    newSquishes.push({
      scaleX: 1 + squishAmount * direction * 0.4,
      scaleY: 1 - squishAmount * 0.25,
    })

    if (Math.abs(displacement) < 0.01 && Math.abs(newVelocity) < 0.01) {
      newSprings.push({ position: targets.value[i], velocity: 0 })
      newSquishes[i] = { scaleX: 1, scaleY: 1 }
    } else {
      newSprings.push({ position: newPosition, velocity: newVelocity })
      allSettled = false
    }
  }

  springs.value = newSprings
  squishes.value = newSquishes

  if (!allSettled || activeThumb.value !== null) {
    animationId = requestAnimationFrame(simulate)
  } else {
    animationId = null
    lastTime = 0
  }
}

function startAnimation() {
  if (animationId === null) {
    lastTime = 0
    animationId = requestAnimationFrame(simulate)
  }
}

onMounted(() => {
  // Do not start animation loop on mount; it starts on demand when dragging begins.
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})

function getValueFromPosition(clientX: number, clientY: number): number {
  if (!trackRef.value) return 0

  const rect = trackRef.value.getBoundingClientRect()
  let percent: number

  if (props.orientation === 'vertical') {
    percent = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
  } else {
    percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  const rawValue = props.min + percent * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, steppedValue))
}

function getPercentFromPosition(clientX: number, clientY: number): number {
  if (!trackRef.value) return 0

  const rect = trackRef.value.getBoundingClientRect()

  if (props.orientation === 'vertical') {
    return (1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))) * 100
  }
  return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100
}

function findNearestThumb(percent: number): number {
  if (!isRange.value) return 0

  let nearestIndex = 0
  let nearestDistance = Infinity

  for (let i = 0; i < springs.value.length; i++) {
    const distance = Math.abs(springs.value[i].position - percent)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = i
    }
  }

  return nearestIndex
}

function updateValue(index: number, newValue: number) {
  const newValues = [...actualValue.value]

  if (isRange.value) {
    if (index === 0) {
      newValues[0] = Math.min(newValue, actualValue.value[1] - props.step)
    } else {
      newValues[1] = Math.max(newValue, actualValue.value[0] + props.step)
    }
  } else {
    newValues[index] = newValue
  }

  newValues[index] = Math.max(props.min, Math.min(props.max, newValues[index]))

  if (!isControlled.value) {
    internalValue.value = newValues
  }
  emit('update:modelValue', newValues)
}

function handleTrackPointerDown(e: PointerEvent) {
  if (props.disabled) return

  e.preventDefault()
  const percent = getPercentFromPosition(e.clientX, e.clientY)
  const nearestThumbIndex = findNearestThumb(percent)
  const newValue = getValueFromPosition(e.clientX, e.clientY)

  activeThumb.value = nearestThumbIndex
  startAnimation()
  updateValue(nearestThumbIndex, newValue)

  springs.value[nearestThumbIndex].velocity += (e.movementX || 0) * 10

  const handlePointerMove = (e: PointerEvent) => {
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    updateValue(nearestThumbIndex, newValue)
    springs.value[nearestThumbIndex].velocity += (e.movementX || 0) * 3
  }

  const handlePointerUp = () => {
    activeThumb.value = null
    emit('valueCommit', actualValue.value)
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)
}

function handleThumbPointerDown(index: number, e: PointerEvent) {
  if (props.disabled) return

  e.preventDefault()
  e.stopPropagation()
  activeThumb.value = index
  startAnimation()

  const handlePointerMove = (e: PointerEvent) => {
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    updateValue(index, newValue)
    springs.value[index].velocity += (e.movementX || 0) * 3
  }

  const handlePointerUp = () => {
    activeThumb.value = null
    emit('valueCommit', actualValue.value)
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  document.addEventListener('pointermove', handlePointerMove)
  document.addEventListener('pointerup', handlePointerUp)
}

function handleKeyDown(index: number, e: KeyboardEvent) {
  if (props.disabled) return

  let newValue = actualValue.value[index]
  const largeStep = (props.max - props.min) / 10

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      newValue = Math.min(props.max, actualValue.value[index] + props.step)
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      newValue = Math.max(props.min, actualValue.value[index] - props.step)
      break
    case 'PageUp':
      newValue = Math.min(props.max, actualValue.value[index] + largeStep)
      break
    case 'PageDown':
      newValue = Math.max(props.min, actualValue.value[index] - largeStep)
      break
    case 'Home':
      newValue = props.min
      break
    case 'End':
      newValue = props.max
      break
    default:
      return
  }

  e.preventDefault()
  updateValue(index, newValue)
  springs.value[index].velocity += (newValue > actualValue.value[index] ? 1 : -1) * 80
}

const rangeFillStyle = computed(() => {
  if (isRange.value) {
    const left = Math.min(springs.value[0]?.position ?? 0, springs.value[1]?.position ?? 0)
    const right = Math.max(springs.value[0]?.position ?? 0, springs.value[1]?.position ?? 0)
    return props.orientation === 'vertical'
      ? { bottom: `${left}%`, height: `${right - left}%` }
      : { left: `${left}%`, width: `${right - left}%` }
  }
  return props.orientation === 'vertical'
    ? { bottom: '0%', height: `${springs.value[0]?.position ?? 0}%` }
    : { left: '0%', width: `${springs.value[0]?.position ?? 0}%` }
})

function getThumbStyle(index: number) {
  const spring = springs.value[index]
  const squish = squishes.value[index] ?? { scaleX: 1, scaleY: 1 }

  if (props.orientation === 'vertical') {
    return {
      bottom: `calc(${spring?.position ?? 0}% - 14px)`,
      left: '50%',
      transform: `translateX(-50%) scaleX(${squish.scaleY}) scaleY(${squish.scaleX}) rotate(${(squish.scaleX - 1) * 8}deg)`,
    }
  }
  return {
    left: `calc(${spring?.position ?? 0}% - 14px)`,
    top: '50%',
    transform: `translateY(-50%) scaleX(${squish.scaleX}) scaleY(${squish.scaleY}) rotate(${(squish.scaleX - 1) * 8}deg)`,
  }
}
</script>

<template>
  <div
    :class="cn(
      'relative flex touch-none select-none items-center',
      orientation === 'vertical' ? 'h-full w-5 flex-col' : 'w-full py-2',
      disabled && 'opacity-50 pointer-events-none',
      props.class
    )"
  >
    <!-- Track -->
    <div
      ref="trackRef"
      :class="cn(
        'relative cursor-pointer overflow-hidden',
        'border-3 border-foreground bg-muted',
        'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        'transition-shadow duration-200',
        orientation === 'vertical' ? 'h-full w-4' : 'h-4 w-full',
        activeThumb !== null && 'shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
      )"
      @pointerdown="handleTrackPointerDown"
    >
      <!-- Range fill -->
      <div
        :class="cn(
          'absolute bg-primary',
          orientation === 'vertical' ? 'w-full' : 'h-full'
        )"
        :style="rangeFillStyle"
      />

      <!-- Decorative stripes -->
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        :style="{
          backgroundImage: `repeating-linear-gradient(
            ${orientation === 'vertical' ? '0deg' : '45deg'},
            transparent,
            transparent 3px,
            currentColor 3px,
            currentColor 4px
          )`,
        }"
      />
    </div>

    <!-- Thumbs -->
    <div
      v-for="(spring, index) in springs"
      :key="index"
      role="slider"
      :tabindex="disabled ? -1 : 0"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="actualValue[index]"
      :aria-disabled="disabled"
      :aria-orientation="orientation"
      :class="cn(
        'absolute h-7 w-7 cursor-grab',
        'border-3 border-foreground bg-background',
        'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'transition-shadow duration-150',
        activeThumb === index && 'cursor-grabbing shadow-[2px_2px_0px_hsl(var(--shadow-color))] z-10',
        hoveringThumb === index && activeThumb !== index && 'shadow-[5px_5px_0px_hsl(var(--shadow-color))]'
      )"
      :style="getThumbStyle(index)"
      @keydown="handleKeyDown(index, $event)"
      @pointerdown="handleThumbPointerDown(index, $event)"
      @mouseenter="hoveringThumb = index"
      @mouseleave="hoveringThumb = null"
    >
      <!-- Inner border detail -->
      <div class="absolute inset-1 border-2 border-foreground/20" />
      <!-- Grip lines -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div :class="cn('flex gap-0.5', orientation === 'vertical' ? 'flex-row' : 'flex-col')">
          <div :class="cn('bg-foreground/30', orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5')" />
          <div :class="cn('bg-foreground/30', orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5')" />
          <div :class="cn('bg-foreground/30', orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5')" />
        </div>
      </div>
    </div>
  </div>
</template>
