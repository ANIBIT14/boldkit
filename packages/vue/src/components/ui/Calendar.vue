<script setup lang="ts">
import { computed } from 'vue'
import {
  CalendarRoot,
  CalendarHeader,
  CalendarHeading,
  CalendarGrid,
  CalendarCell,
  CalendarCellTrigger,
  CalendarGridHead,
  CalendarGridBody,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarNext,
  CalendarPrev,
  type DateValue,
} from 'reka-ui'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button-variants'

interface Props {
  class?: string
  modelValue?: DateValue
  defaultValue?: DateValue
  placeholder?: DateValue
  weekdayFormat?: 'narrow' | 'short' | 'long'
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  fixedWeeks?: boolean
  disabled?: boolean
  readonly?: boolean
  pagedNavigation?: boolean
  preventDeselect?: boolean
  isDateUnavailable?: (date: DateValue) => boolean
  isDateDisabled?: (date: DateValue) => boolean
  minValue?: DateValue
  maxValue?: DateValue
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: DateValue | undefined]
}>()

const delegatedProps = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    v-bind="delegatedProps"
    :class="
      cn(
        'p-3 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        props.class
      )
    "
    @update:model-value="emit('update:modelValue', $event)"
  >
    <CalendarHeader class="flex justify-center pt-1 relative items-center">
      <CalendarPrev
        :class="
          cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute left-1')
        "
      >
        <ChevronLeft class="h-4 w-4 stroke-[3]" />
      </CalendarPrev>
      <CalendarHeading class="text-sm font-bold uppercase tracking-wide" />
      <CalendarNext
        :class="
          cn(buttonVariants({ variant: 'outline' }), 'h-8 w-8 bg-transparent p-0 absolute right-1')
        "
      >
        <ChevronRight class="h-4 w-4 stroke-[3]" />
      </CalendarNext>
    </CalendarHeader>
    <CalendarGrid v-for="month in grid" :key="month.value.toString()" class="w-full border-collapse space-y-1 mt-4">
      <CalendarGridHead>
        <CalendarGridRow class="flex">
          <CalendarHeadCell
            v-for="day in weekDays"
            :key="day"
            class="text-muted-foreground w-9 font-bold text-[0.8rem] uppercase"
          >
            {{ day }}
          </CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>
      <CalendarGridBody>
        <CalendarGridRow v-for="(week, index) in month.rows" :key="`weekRow-${index}`" class="flex w-full mt-2">
          <CalendarCell
            v-for="day in week"
            :key="day.toString()"
            :date="day"
            class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
          >
            <CalendarCellTrigger
              :day="day"
              :month="month.value"
              :class="
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-9 w-9 p-0 font-medium border-0',
                  'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:border-2 data-[selected]:border-foreground',
                  'data-[today]:bg-accent data-[today]:text-accent-foreground data-[today]:border-2 data-[today]:border-foreground',
                  'data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50',
                  'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50'
                )
              "
            />
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>
