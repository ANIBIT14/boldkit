<script setup lang="ts">
import { computed, watch } from 'vue'
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastManager,
} from 'reka-ui'
import { CircleCheck, CircleX, Info, LoaderCircle, TriangleAlert, X } from '@lucide/vue'
import { cn } from '@/lib/utils'
import type { ToastData, ToastPosition, ToastVariant } from './toast'

// Renders the toasts of the surrounding <ToastProvider> (see Toaster.vue) as a brutalist pile:
// collapsed, older toasts peek out behind the newest as offset hard-edged cards; on hover/focus
// the pile fans out into a list. Reka exposes the stack as --reka-toast-index /
// --reka-toast-offset-y / --reka-toast-frontmost-height and sets data-expanded.

const props = withDefaults(
  defineProps<{
    position?: ToastPosition
    /** Maximum number of toasts kept open; older ones are dismissed. */
    max?: number
    class?: string
  }>(),
  { position: 'bottom-right', max: 3 }
)

const { toasts, close } = useToastManager<ToastData>()

// Keep at most `max` toasts open — older ones are dismissed (and animate out).
watch(
  [toasts, () => props.max],
  ([list, max]) => {
    list
      .filter((t) => t.open)
      .slice(max)
      .forEach((t) => close(t.id))
  },
  { immediate: true }
)

// Same as Reka's stack index: open toasts are numbered consecutively; closing toasts keep their
// place in the whole list, so a collapsed 'behind' card stays clamped while it animates out.
const items = computed(() => {
  let index = 0
  return toasts.value.map((t, i) => ({ toast: t, index: t.open ? index++ : i }))
})

const variantBlock: Record<Exclude<ToastVariant, 'default'>, { class: string; icon: typeof Info }> = {
  success: { class: 'bg-success text-success-foreground', icon: CircleCheck },
  error: { class: 'bg-destructive text-destructive-foreground', icon: CircleX },
  warning: { class: 'bg-warning text-warning-foreground', icon: TriangleAlert },
  info: { class: 'bg-info text-info-foreground', icon: Info },
  loading: { class: 'bg-muted text-foreground', icon: LoaderCircle },
}

const positionClasses: Record<ToastPosition, { viewport: string; toast: string }> = {
  'top-left': {
    viewport: 'left-4 top-4',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-left-full',
  },
  'top-right': {
    viewport: 'right-4 top-4',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full',
  },
  'top-center': {
    viewport: 'left-1/2 top-4 -translate-x-1/2',
    toast: 'top-0 after:top-full data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full',
  },
  'bottom-left': {
    viewport: 'bottom-4 left-4',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-left-full',
  },
  'bottom-right': {
    viewport: 'bottom-4 right-4',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  },
  'bottom-center': {
    viewport: 'bottom-4 left-1/2 -translate-x-1/2',
    toast: 'bottom-0 after:bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  },
}

// Collapsed pile offset (6px across, 10px up/down per card) and the 12px gap of the expanded list.
const stackStyle = computed(() => {
  const yDir = props.position.startsWith('top') ? 1 : -1
  const xDir = props.position.endsWith('left') ? 1 : -1
  return {
    zIndex: 'calc(100 - var(--reka-toast-index))',
    '--toast-pile-x': `calc(var(--reka-toast-index) * ${6 * xDir}px)`,
    '--toast-pile-y': `calc(var(--reka-toast-index) * ${10 * yDir}px)`,
    '--toast-list-y': `calc((var(--reka-toast-offset-y) + var(--reka-toast-index) * 12px) * ${yDir})`,
  }
})
</script>

<template>
  <ToastViewport
    data-slot="toast-viewport"
    :data-position="props.position"
    :class="
      cn(
        'fixed z-[100] m-0 h-[var(--toast-front-height)] w-[calc(100%-2rem)] list-none p-0 outline-none sm:w-[380px]',
        positionClasses[props.position].viewport,
        props.class
      )
    "
    :style="{ '--toast-front-height': 'var(--reka-toast-frontmost-height, 0px)' }"
  >
    <ToastRoot
      v-for="{ toast: t, index } in items"
      :key="t.id"
      :toast="t"
      data-slot="toast"
      :data-variant="t.data?.variant ?? 'default'"
      :data-index="index"
      :data-behind="index > 0 ? '' : undefined"
      :class="
        cn(
          'group/toast pointer-events-auto absolute inset-x-0 flex w-full items-stretch border-3 border-foreground bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          // enter / exit + swipe (Reka exposes the drag offset as CSS vars)
          'duration-200 ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          'data-[swipe=move]:[transform:translateX(var(--reka-toast-swipe-move-x))] data-[swipe=cancel]:[transform:translateX(0)] data-[swipe=cancel]:transition-[transform] data-[swipe=end]:[transform:translateX(var(--reka-toast-swipe-end-x))]',
          // stack geometry: collapsed pile ⇄ expanded list
          'transition-[translate,height] [translate:var(--toast-pile-x)_var(--toast-pile-y)] data-[expanded]:[translate:0_var(--toast-list-y)]',
          '[&[data-behind]:not([data-expanded])]:h-[var(--toast-front-height)] [&[data-behind]:not([data-expanded])]:overflow-hidden',
          // bridges the gap between expanded toasts so hovering it doesn't collapse the list
          'after:absolute after:inset-x-0 after:h-3',
          'motion-reduce:transition-none',
          positionClasses[props.position].toast
        )
      "
      :style="stackStyle"
    >
      <div
        v-if="t.data && t.data.variant !== 'default'"
        data-slot="toast-icon"
        :class="cn('flex w-11 shrink-0 items-center justify-center border-r-3 border-foreground', variantBlock[t.data.variant].class)"
      >
        <component
          :is="variantBlock[t.data.variant].icon"
          aria-hidden="true"
          :class="cn('h-5 w-5 stroke-[2.5]', t.data.variant === 'loading' && 'animate-spin motion-reduce:animate-none')"
        />
      </div>
      <div
        class="flex min-w-0 flex-1 items-start gap-3 self-start p-3 pr-10 transition-opacity duration-200 [[data-behind]:not([data-expanded])>&]:pointer-events-none [[data-behind]:not([data-expanded])>&]:opacity-0 motion-reduce:transition-none"
      >
        <div class="grid min-w-0 flex-1 gap-1">
          <ToastTitle
            v-if="t.title"
            data-slot="toast-title"
            class="text-sm font-black uppercase leading-tight tracking-wide"
          >
            {{ t.title }}
          </ToastTitle>
          <ToastDescription
            v-if="t.description"
            data-slot="toast-description"
            class="text-sm font-medium text-muted-foreground"
          >
            {{ t.description }}
          </ToastDescription>
        </div>
        <ToastAction
          v-if="t.actionProps"
          data-slot="toast-action"
          class="inline-flex shrink-0 items-center self-center border-2 border-foreground bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))] transition duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          {{ t.actionProps.label }}
        </ToastAction>
        <ToastClose
          data-slot="toast-close"
          aria-label="Close"
          class="absolute right-2 top-2 border-2 border-foreground bg-background p-0.5 text-foreground transition duration-150 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          <X class="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
        </ToastClose>
      </div>
    </ToastRoot>
  </ToastViewport>
</template>
