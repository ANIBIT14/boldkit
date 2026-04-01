<script setup lang="ts">
import { provide, ref, computed, onMounted, onUnmounted, watch, readonly } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
import { cn } from '@/lib/utils'

export type CarouselApi = EmblaCarouselType | undefined
export type CarouselOptions = EmblaOptionsType
export type CarouselPlugin = EmblaPluginType

export interface CarouselContext {
  carouselRef: ReturnType<typeof ref<HTMLElement | undefined>>
  api: ReturnType<typeof ref<CarouselApi>>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Readonly<ReturnType<typeof ref<boolean>>>
  canScrollNext: Readonly<ReturnType<typeof ref<boolean>>>
  selectedIndex: Readonly<ReturnType<typeof ref<number>>>
  scrollSnaps: Readonly<ReturnType<typeof ref<number[]>>>
  scrollTo: (index: number) => void
  orientation: 'horizontal' | 'vertical'
}

export const CAROUSEL_INJECTION_KEY = Symbol('carousel')

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  class?: string
}

const props = withDefaults(defineProps<CarouselProps>(), {
  opts: undefined,
  plugins: undefined,
  orientation: 'horizontal',
  setApi: undefined,
})

const carouselOptions = computed<EmblaOptionsType>(() => ({
  ...props.opts,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
}))

const [emblaRef, emblaApi] = emblaCarouselVue(carouselOptions, props.plugins ? () => props.plugins! : undefined)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

const onSelect = (api: EmblaCarouselType) => {
  selectedIndex.value = api.selectedScrollSnap()
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
}

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}

const scrollNext = () => {
  emblaApi.value?.scrollNext()
}

const scrollTo = (index: number) => {
  emblaApi.value?.scrollTo(index)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    scrollNext()
  }
}

watch(emblaApi, (api) => {
  if (!api) return

  if (props.setApi) {
    props.setApi(api)
  }

  scrollSnaps.value = api.scrollSnapList()
  onSelect(api)

  api.on('reInit', onSelect)
  api.on('select', onSelect)
})

onUnmounted(() => {
  emblaApi.value?.off('reInit', onSelect)
  emblaApi.value?.off('select', onSelect)
})

provide(CAROUSEL_INJECTION_KEY, {
  carouselRef: emblaRef,
  api: emblaApi,
  scrollPrev,
  scrollNext,
  canScrollPrev: readonly(canScrollPrev),
  canScrollNext: readonly(canScrollNext),
  selectedIndex: readonly(selectedIndex),
  scrollSnaps: readonly(scrollSnaps),
  scrollTo,
  orientation: props.orientation,
})
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown="handleKeyDown"
  >
    <slot />
  </div>
</template>
