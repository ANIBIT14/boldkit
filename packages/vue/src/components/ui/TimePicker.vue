<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-vue-next'
import Popover from './Popover.vue'
import PopoverTrigger from './PopoverTrigger.vue'
import PopoverContent from './PopoverContent.vue'
import Button from './Button.vue'
import ScrollArea from './ScrollArea.vue'

export interface TimePickerProps {
  modelValue?: Date
  defaultValue?: Date
  format?: '12h' | '24h'
  minuteStep?: 1 | 5 | 10 | 15 | 30
  showSeconds?: boolean
  minTime?: Date
  maxTime?: Date
  disabled?: boolean
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  format: '12h',
  minuteStep: 1,
  showSeconds: false,
  disabled: false,
  placeholder: 'Select time',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | undefined]
}>()

const open = ref(false)
const uncontrolledValue = ref<Date | undefined>(props.defaultValue)

const isControlled = computed(() => props.modelValue !== undefined)
const selectedTime = computed(() =>
  isControlled.value ? props.modelValue : uncontrolledValue.value
)

const hours = computed(() => (props.format === '12h' ? 12 : 24))
const hoursArray = computed(() =>
  Array.from({ length: hours.value }, (_, i) => (props.format === '12h' ? i + 1 : i))
)
const minutesArray = computed(() =>
  Array.from({ length: 60 / props.minuteStep }, (_, i) => i * props.minuteStep)
)
const secondsArray = computed(() => Array.from({ length: 60 }, (_, i) => i))

const getHour = (date: Date): number => {
  const h = date.getHours()
  if (props.format === '12h') {
    return h === 0 ? 12 : h > 12 ? h - 12 : h
  }
  return h
}

const getPeriod = (date: Date): 'AM' | 'PM' => {
  return date.getHours() >= 12 ? 'PM' : 'AM'
}

const selectedHour = computed(() =>
  selectedTime.value ? getHour(selectedTime.value) : null
)
const selectedMinute = computed(() =>
  selectedTime.value ? selectedTime.value.getMinutes() : null
)
const selectedSecond = computed(() =>
  selectedTime.value ? selectedTime.value.getSeconds() : null
)
const selectedPeriod = computed(() =>
  selectedTime.value ? getPeriod(selectedTime.value) : 'AM'
)

const updateTime = (
  hour?: number,
  minute?: number,
  second?: number,
  period?: 'AM' | 'PM'
) => {
  const newDate = new Date(selectedTime.value || new Date())

  if (hour !== undefined) {
    let h = hour
    if (props.format === '12h') {
      const currentPeriod = period ?? selectedPeriod.value
      if (currentPeriod === 'PM' && hour !== 12) h = hour + 12
      else if (currentPeriod === 'AM' && hour === 12) h = 0
    }
    newDate.setHours(h)
  }

  if (minute !== undefined) {
    newDate.setMinutes(minute)
  }

  if (second !== undefined) {
    newDate.setSeconds(second)
  }

  if (period !== undefined && hour === undefined && selectedTime.value) {
    let h = selectedTime.value.getHours()
    if (period === 'PM' && h < 12) h += 12
    else if (period === 'AM' && h >= 12) h -= 12
    newDate.setHours(h)
  }

  // Check min/max time
  if (props.minTime) {
    const minMinutes = props.minTime.getHours() * 60 + props.minTime.getMinutes()
    const newMinutes = newDate.getHours() * 60 + newDate.getMinutes()
    if (newMinutes < minMinutes) return
  }

  if (props.maxTime) {
    const maxMinutes = props.maxTime.getHours() * 60 + props.maxTime.getMinutes()
    const newMinutes = newDate.getHours() * 60 + newDate.getMinutes()
    if (newMinutes > maxMinutes) return
  }

  if (!isControlled.value) {
    uncontrolledValue.value = newDate
  }
  emit('update:modelValue', newDate)
}

const formatDisplayTime = (date: Date): string => {
  const h = getHour(date)
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  const period = props.format === '12h' ? ` ${getPeriod(date)}` : ''
  const hourStr = props.format === '12h' ? h.toString() : h.toString().padStart(2, '0')

  if (props.showSeconds) {
    return `${hourStr}:${m}:${s}${period}`
  }
  return `${hourStr}:${m}${period}`
}

const isTimeDisabled = (hour: number, minute: number): boolean => {
  let h = hour
  if (props.format === '12h') {
    if (selectedPeriod.value === 'PM' && hour !== 12) h = hour + 12
    else if (selectedPeriod.value === 'AM' && hour === 12) h = 0
  }

  const timeMinutes = h * 60 + minute

  if (props.minTime) {
    const minMinutes = props.minTime.getHours() * 60 + props.minTime.getMinutes()
    if (timeMinutes < minMinutes) return true
  }

  if (props.maxTime) {
    const maxMinutes = props.maxTime.getHours() * 60 + props.maxTime.getMinutes()
    if (timeMinutes > maxMinutes) return true
  }

  return false
}

// Calculate number of columns for responsive width
const columnCount = computed(
  () => 2 + (props.showSeconds ? 1 : 0) + (props.format === '12h' ? 1 : 0)
)

const contentStyle = computed(() => ({
  minWidth: `${columnCount.value * 60}px`,
}))

const periods: readonly ('AM' | 'PM')[] = ['AM', 'PM']
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button
        variant="outline"
        :disabled="disabled"
        :class="
          cn(
            'w-[180px] justify-start text-left font-normal',
            !selectedTime && 'text-muted-foreground',
            props.class
          )
        "
      >
        <Clock class="mr-2 h-4 w-4 shrink-0" />
        <span class="truncate">
          {{ selectedTime ? formatDisplayTime(selectedTime) : placeholder }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      :class="cn('w-auto p-0 overflow-hidden', 'ease-out animate-in fade-in-0 zoom-in-95 duration-200')"
      align="start"
      :side-offset="4"
    >
      <div
        :class="cn('flex', 'max-w-[calc(100vw-2rem)]')"
        :style="contentStyle"
      >
        <!-- Hours column -->
        <div class="flex-1 min-w-[60px] border-r-3 border-foreground">
          <div
            class="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30"
          >
            Hour
          </div>
          <ScrollArea class="h-[200px]">
            <div class="p-1">
              <button
                v-for="hour in hoursArray"
                :key="hour"
                type="button"
                @click="updateTime(hour)"
                :class="
                  cn(
                    'w-full px-2 py-1.5 text-center text-sm',
                    'transition-all duration-150 ease-out',
                    'hover:bg-muted hover:scale-105',
                    'focus:outline-none focus:bg-muted',
                    selectedHour === hour &&
                      'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105',
                    isTimeDisabled(hour, selectedMinute ?? 0) &&
                      'opacity-50 cursor-not-allowed hover:scale-100'
                  )
                "
              >
                {{ format === '12h' ? hour : hour.toString().padStart(2, '0') }}
              </button>
            </div>
          </ScrollArea>
        </div>

        <!-- Minutes column -->
        <div
          :class="
            cn(
              'flex-1 min-w-[60px]',
              (showSeconds || format === '12h') && 'border-r-3 border-foreground'
            )
          "
        >
          <div
            class="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30"
          >
            Min
          </div>
          <ScrollArea class="h-[200px]">
            <div class="p-1">
              <button
                v-for="minute in minutesArray"
                :key="minute"
                type="button"
                @click="updateTime(undefined, minute)"
                :class="
                  cn(
                    'w-full px-2 py-1.5 text-center text-sm',
                    'transition-all duration-150 ease-out',
                    'hover:bg-muted hover:scale-105',
                    'focus:outline-none focus:bg-muted',
                    selectedMinute === minute &&
                      'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105'
                  )
                "
              >
                {{ minute.toString().padStart(2, '0') }}
              </button>
            </div>
          </ScrollArea>
        </div>

        <!-- Seconds column -->
        <div
          v-if="showSeconds"
          :class="cn('flex-1 min-w-[60px]', format === '12h' && 'border-r-3 border-foreground')"
        >
          <div
            class="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30"
          >
            Sec
          </div>
          <ScrollArea class="h-[200px]">
            <div class="p-1">
              <button
                v-for="second in secondsArray"
                :key="second"
                type="button"
                @click="updateTime(undefined, undefined, second)"
                :class="
                  cn(
                    'w-full px-2 py-1.5 text-center text-sm',
                    'transition-all duration-150 ease-out',
                    'hover:bg-muted hover:scale-105',
                    'focus:outline-none focus:bg-muted',
                    selectedSecond === second &&
                      'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105'
                  )
                "
              >
                {{ second.toString().padStart(2, '0') }}
              </button>
            </div>
          </ScrollArea>
        </div>

        <!-- AM/PM column -->
        <div v-if="format === '12h'" class="flex-1 min-w-[50px]">
          <div
            class="px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-3 border-foreground bg-muted/30"
          >
            <span class="hidden sm:inline">Period</span>
            <span class="sm:hidden">AP</span>
          </div>
          <div class="p-1 space-y-1">
            <button
              v-for="period in periods"
              :key="period"
              type="button"
              @click="updateTime(undefined, undefined, undefined, period)"
              :class="
                cn(
                  'w-full px-2 py-3 text-center text-sm font-bold',
                  'transition-all duration-150 ease-out',
                  'hover:bg-muted hover:scale-105',
                  'focus:outline-none focus:bg-muted',
                  selectedPeriod === period &&
                    'bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] scale-105'
                )
              "
            >
              {{ period }}
            </button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
