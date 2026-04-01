<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import {
  RangeCalendarRoot,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarGrid,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGridHead,
  RangeCalendarGridBody,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
} from 'reka-ui'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'
import Popover from './Popover.vue'
import PopoverTrigger from './PopoverTrigger.vue'
import PopoverContent from './PopoverContent.vue'
import Button from './Button.vue'

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DateRangePickerPreset {
  label: string
  value: DateRange
}

interface Props {
  modelValue?: DateRange
  defaultValue?: DateRange
  numberOfMonths?: 1 | 2
  presets?: DateRangePickerPreset[]
  showPresets?: boolean
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  numberOfMonths: 2,
  showPresets: true,
  disabled: false,
  placeholder: 'Pick a date range',
  align: 'start',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateRange | undefined]
}>()

const open = ref(false)
const uncontrolledValue = ref<DateRange | undefined>(props.defaultValue)
const isMobile = ref(false)

const isControlled = computed(() => props.modelValue !== undefined)
const selectedRange = computed(() => (isControlled.value ? props.modelValue : uncontrolledValue.value))

const getDefaultPresets = (): DateRangePickerPreset[] => {
  const today = new Date()
  const lastMonth = subMonths(today, 1)

  return [
    {
      label: 'Today',
      value: { from: today, to: today },
    },
    {
      label: 'Last 7 days',
      value: { from: subDays(today, 6), to: today },
    },
    {
      label: 'Last 30 days',
      value: { from: subDays(today, 29), to: today },
    },
    {
      label: 'This month',
      value: { from: startOfMonth(today), to: today },
    },
    {
      label: 'Last month',
      value: { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) },
    },
  ]
}

const resolvedPresets = computed(() => props.presets ?? getDefaultPresets())

// Convert Date to CalendarDate for reka-ui
const dateToCalendarDate = (date: Date): CalendarDate => {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

// Convert CalendarDate to Date
const calendarDateToDate = (calendarDate: DateValue): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

// Convert DateRange to reka-ui range format
const calendarModelValue = computed(() => {
  if (!selectedRange.value?.from) return undefined
  return {
    start: dateToCalendarDate(selectedRange.value.from),
    end: selectedRange.value.to ? dateToCalendarDate(selectedRange.value.to) : dateToCalendarDate(selectedRange.value.from),
  }
})

const handleSelect = (range: { start: DateValue; end: DateValue } | undefined) => {
  const newRange: DateRange | undefined = range
    ? {
        from: calendarDateToDate(range.start),
        to: calendarDateToDate(range.end),
      }
    : undefined

  if (!isControlled.value) {
    uncontrolledValue.value = newRange
  }
  emit('update:modelValue', newRange)
}

const handlePresetClick = (preset: DateRangePickerPreset) => {
  const range = preset.value
  if (!isControlled.value) {
    uncontrolledValue.value = range
  }
  emit('update:modelValue', range)
}

const isPresetSelected = (preset: DateRangePickerPreset): boolean => {
  if (!selectedRange.value?.from || !selectedRange.value?.to) return false
  if (!preset.value.from || !preset.value.to) return false

  return (
    format(selectedRange.value.from, 'yyyy-MM-dd') === format(preset.value.from, 'yyyy-MM-dd') &&
    format(selectedRange.value.to, 'yyyy-MM-dd') === format(preset.value.to, 'yyyy-MM-dd')
  )
}

const formatDateRange = (range: DateRange): string => {
  if (!range.from) return props.placeholder
  if (!range.to) return format(range.from, 'LLL dd, y')
  return `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
}

const effectiveNumberOfMonths = computed(() => (isMobile.value ? 1 : props.numberOfMonths))

const minValue = computed(() => (props.minDate ? dateToCalendarDate(props.minDate) : undefined))
const maxValue = computed(() => (props.maxDate ? dateToCalendarDate(props.maxDate) : undefined))

const checkMobile = () => {
  // SSR guard
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button
        variant="outline"
        :disabled="disabled"
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !selectedRange?.from && 'text-muted-foreground',
            props.class
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4 shrink-0" />
        <span class="truncate">
          {{ selectedRange ? formatDateRange(selectedRange) : placeholder }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      :align="align"
      :side-offset="4"
      :class="
        cn(
          'w-auto p-0 overflow-hidden',
          'shadow-[8px_8px_0px_hsl(var(--shadow-color))]',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          'max-w-[calc(100vw-2rem)]',
          'max-h-[calc(100vh-4rem)] overflow-auto'
        )
      "
    >
      <div
        :class="
          cn(
            'flex',
            isMobile && showPresets ? 'flex-col' : 'flex-row'
          )
        "
      >
        <!-- Presets sidebar/header -->
        <div
          v-if="showPresets && resolvedPresets.length > 0"
          :class="
            cn(
              'p-3 bg-muted/30',
              isMobile
                ? 'border-b-3 border-foreground'
                : 'min-w-[130px] border-r-3 border-foreground'
            )
          "
        >
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Presets
          </p>
          <div
            :class="
              cn(
                isMobile ? 'flex flex-wrap gap-1' : 'space-y-1'
              )
            "
          >
            <button
              v-for="preset in resolvedPresets"
              :key="preset.label"
              type="button"
              @click="handlePresetClick(preset)"
              :class="
                cn(
                  'text-left text-sm transition-all duration-150',
                  'hover:bg-muted',
                  isMobile
                    ? 'px-2 py-1 border-2 border-foreground text-xs'
                    : 'w-full px-3 py-2',
                  isPresetSelected(preset) && 'bg-accent font-medium shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
                )
              "
            >
              {{ preset.label }}
            </button>
          </div>
        </div>

        <!-- Calendar(s) -->
        <div class="p-3">
          <RangeCalendarRoot
            v-slot="{ grid, weekDays }"
            :model-value="calendarModelValue"
            @update:model-value="handleSelect"
            :number-of-months="effectiveNumberOfMonths"
            :min-value="minValue"
            :max-value="maxValue"
            :class="cn('border-0 shadow-none')"
          >
            <RangeCalendarHeader class="flex justify-center pt-1 relative items-center">
              <RangeCalendarPrev
                :class="
                  cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute left-1')
                "
              >
                <ChevronLeft class="h-4 w-4 stroke-[3]" />
              </RangeCalendarPrev>
              <RangeCalendarHeading class="text-sm font-bold uppercase tracking-wide" />
              <RangeCalendarNext
                :class="
                  cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute right-1')
                "
              >
                <ChevronRight class="h-4 w-4 stroke-[3]" />
              </RangeCalendarNext>
            </RangeCalendarHeader>

            <div class="flex gap-4">
              <RangeCalendarGrid
                v-for="month in grid"
                :key="month.value.toString()"
                class="w-full border-collapse space-y-1 mt-4"
              >
                <RangeCalendarGridHead>
                  <RangeCalendarGridRow class="flex">
                    <RangeCalendarHeadCell
                      v-for="day in weekDays"
                      :key="day"
                      class="text-muted-foreground w-9 font-bold text-[0.8rem] uppercase"
                    >
                      {{ day }}
                    </RangeCalendarHeadCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridHead>
                <RangeCalendarGridBody>
                  <RangeCalendarGridRow
                    v-for="(week, index) in month.rows"
                    :key="`weekRow-${index}`"
                    class="flex w-full mt-2"
                  >
                    <RangeCalendarCell
                      v-for="day in week"
                      :key="day.toString()"
                      :date="day"
                      class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
                    >
                      <RangeCalendarCellTrigger
                        :day="day"
                        :month="month.value"
                        :class="
                          cn(
                            buttonVariants({ variant: 'ghost' }),
                            'h-9 w-9 p-0 font-medium border-0',
                            'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-2 data-[selected]:border-foreground',
                            'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground',
                            'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground',
                            'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
                            'data-[today]:bg-accent data-[today]:text-accent-foreground data-[today]:border-2 data-[today]:border-foreground',
                            'data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50',
                            'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50'
                          )
                        "
                      />
                    </RangeCalendarCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridBody>
              </RangeCalendarGrid>
            </div>
          </RangeCalendarRoot>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
