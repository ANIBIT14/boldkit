import { ref, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const isMobile = ref<boolean>(false)

  const updateMobile = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      updateMobile()
    }

    mql.addEventListener('change', onChange)
    updateMobile()

    onUnmounted(() => {
      mql.removeEventListener('change', onChange)
    })
  })

  return isMobile
}
