<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Star, Heart, Circle } from 'lucide-vue-next'

const ratingVariants = cva('flex items-center gap-0.5', {
  variants: {
    size: {
      sm: '[&_svg]:h-4 [&_svg]:w-4',
      md: '[&_svg]:h-5 [&_svg]:w-5',
      lg: '[&_svg]:h-6 [&_svg]:w-6',
      xl: '[&_svg]:h-8 [&_svg]:w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type RatingVariants = VariantProps<typeof ratingVariants>

const iconMap = {
  star: Star,
  heart: Heart,
  circle: Circle,
} as const

interface RatingProps {
  modelValue?: number
  defaultValue?: number
  max?: number
  precision?: 0.5 | 1
  icon?: 'star' | 'heart' | 'circle'
  size?: RatingVariants['size']
  readOnly?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<RatingProps>(), {
  defaultValue: 0,
  max: 5,
  precision: 1,
  icon: 'star',
  size: 'md',
  readOnly: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'hoverChange': [value: number | null]
}>()

const internalValue = ref(props.defaultValue)
const hoverValue = ref<number | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)
const currentValue = computed(() => isControlled.value ? props.modelValue! : internalValue.value)
const displayValue = computed(() => hoverValue.value ?? currentValue.value)

const IconComponent = computed(() => iconMap[props.icon])

// Sync internal value when modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
})

const handleClick = (index: number, isHalf: boolean) => {
  if (props.readOnly || props.disabled) return

  const newValue = isHalf && props.precision === 0.5 ? index + 0.5 : index + 1

  if (!isControlled.value) {
    internalValue.value = newValue
  }
  emit('update:modelValue', newValue)
}

const handleMouseMove = (e: MouseEvent, index: number) => {
  if (props.readOnly || props.disabled) return

  const target = e.currentTarget as HTMLButtonElement
  const rect = target.getBoundingClientRect()
  const isHalf = e.clientX - rect.left < rect.width / 2

  const newHoverValue = isHalf && props.precision === 0.5 ? index + 0.5 : index + 1
  hoverValue.value = newHoverValue
  emit('hoverChange', newHoverValue)
}

const handleMouseLeave = () => {
  if (props.readOnly || props.disabled) return
  hoverValue.value = null
  emit('hoverChange', null)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.readOnly || props.disabled) return

  let newValue = currentValue.value

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      e.preventDefault()
      newValue = Math.min(currentValue.value + props.precision, props.max)
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      e.preventDefault()
      newValue = Math.max(currentValue.value - props.precision, 0)
      break
    case 'Home':
      e.preventDefault()
      newValue = 0
      break
    case 'End':
      e.preventDefault()
      newValue = props.max
      break
    default:
      return
  }

  if (!isControlled.value) {
    internalValue.value = newValue
  }
  emit('update:modelValue', newValue)
}

const handleIconClick = (e: MouseEvent, index: number) => {
  const target = e.currentTarget as HTMLButtonElement
  const rect = target.getBoundingClientRect()
  const isHalf = e.clientX - rect.left < rect.width / 2
  handleClick(index, isHalf)
}

const getFillState = (index: number) => {
  const fillValue = displayValue.value - index
  return {
    isFilled: fillValue >= 1,
    isHalfFilled: fillValue > 0 && fillValue < 1,
  }
}

const getClipPath = (isHalfFilled: boolean) => {
  return isHalfFilled ? { clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' } : undefined
}
</script>

<template>
  <div
    role="radiogroup"
    :aria-label="`Rating: ${currentValue} out of ${max} ${icon === 'star' ? 'stars' : icon === 'heart' ? 'hearts' : 'circles'}`"
    :tabindex="readOnly || disabled ? -1 : 0"
    :class="cn(
      ratingVariants({ size }),
      disabled && 'opacity-50 pointer-events-none',
      !readOnly && !disabled && 'cursor-pointer',
      props.class
    )"
    @keydown="handleKeyDown"
    @mouseleave="handleMouseLeave"
  >
    <button
      v-for="index in max"
      :key="index - 1"
      type="button"
      role="radio"
      :aria-checked="currentValue >= index"
      :aria-label="`${index} ${icon === 'star' ? 'star' : icon === 'heart' ? 'heart' : 'circle'}${index !== 1 ? 's' : ''}`"
      :tabindex="(!readOnly && !disabled && currentValue === index) ? 0 : -1"
      :disabled="disabled || readOnly"
      :class="cn(
        'relative transition-transform duration-150 focus:outline-none',
        !readOnly && !disabled && 'hover:scale-110'
      )"
      @click="handleIconClick($event, index - 1)"
      @mousemove="handleMouseMove($event, index - 1)"
    >
      <!-- Empty icon (background) -->
      <component
        :is="IconComponent"
        :class="cn(
          'stroke-foreground stroke-[2px] fill-muted transition-colors duration-150'
        )"
      />

      <!-- Filled icon (overlay) -->
      <component
        v-if="getFillState(index - 1).isFilled || getFillState(index - 1).isHalfFilled"
        :is="IconComponent"
        :class="cn(
          'absolute inset-0 stroke-foreground stroke-[2px] fill-primary transition-colors duration-150'
        )"
        :style="getClipPath(getFillState(index - 1).isHalfFilled)"
      />
    </button>
  </div>
</template>
