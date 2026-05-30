<script setup lang="ts">
import { provide, ref, computed, readonly, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { cn } from '@/lib/utils'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_COLLAPSED = '4rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export interface SidebarContext {
  state: ReturnType<typeof computed<'expanded' | 'collapsed'>>
  open: ReturnType<typeof computed<boolean>>
  setOpen: (value: boolean) => void
  openMobile: Readonly<ReturnType<typeof ref<boolean>>>
  setOpenMobile: (value: boolean) => void
  isMobile: Readonly<ReturnType<typeof ref<boolean>>>
  toggleSidebar: () => void
}

export const SIDEBAR_INJECTION_KEY = Symbol('sidebar')

interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  class?: string
}

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  defaultOpen: true,
  open: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const uncontrolledOpen = ref(props.defaultOpen)
const openMobile = ref(false)
const isMobile = ref(false)

const isControlled = computed(() => props.open !== undefined)
const currentOpen = computed(() => isControlled.value ? props.open! : uncontrolledOpen.value)

const setOpen = (value: boolean) => {
  if (!isControlled.value) {
    uncontrolledOpen.value = value
  }
  emit('update:open', value)

  // Save to cookie
  if (typeof document !== 'undefined') {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
}

const setOpenMobile = (value: boolean) => {
  openMobile.value = value
}

const toggleSidebar = () => {
  if (isMobile.value) {
    openMobile.value = !openMobile.value
  } else {
    setOpen(!currentOpen.value)
  }
}

const state = computed<'expanded' | 'collapsed'>(() => currentOpen.value ? 'expanded' : 'collapsed')

// Check if mobile
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

// Keyboard shortcut handler
const handleKeyDown = (e: KeyboardEvent) => {
  if (
    e.key === SIDEBAR_KEYBOARD_SHORTCUT &&
    (e.metaKey || e.ctrlKey) &&
    !e.shiftKey &&
    !e.altKey
  ) {
    e.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  checkMobile()
  // Restore the persisted open state written by setOpen (uncontrolled only) —
  // otherwise the cookie was write-only and never affected the next load.
  if (!isControlled.value && typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`))
    if (match) {
      uncontrolledOpen.value = match[1] === 'true'
    }
  }
  window.addEventListener('resize', checkMobile)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('keydown', handleKeyDown)
})

provide(SIDEBAR_INJECTION_KEY, {
  state,
  open: currentOpen,
  setOpen,
  openMobile: readonly(openMobile),
  setOpenMobile,
  isMobile: readonly(isMobile),
  toggleSidebar,
})

const cssVars = computed<CSSProperties>(() => ({
  '--sidebar-width': SIDEBAR_WIDTH,
  '--sidebar-width-collapsed': SIDEBAR_WIDTH_COLLAPSED,
}))
</script>

<template>
  <div
    :style="cssVars"
    :class="cn(
      'group/sidebar-wrapper flex min-h-screen w-full',
      props.class
    )"
  >
    <slot />
  </div>
</template>
