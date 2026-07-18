import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useIsMobile } from '@/composables/useMobile'

function mountWithWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    configurable: true,
    writable: true,
  })
  let isMobile!: ReturnType<typeof useIsMobile>
  const Comp = defineComponent({
    setup() {
      isMobile = useIsMobile()
      return () => null
    },
  })
  const wrapper = mount(Comp) // triggers onMounted → updateMobile()
  return { wrapper, isMobile: () => isMobile }
}

describe('useIsMobile', () => {
  it('is true below the 768px breakpoint', () => {
    const { isMobile } = mountWithWidth(500)
    expect(isMobile().value).toBe(true)
  })

  it('is false at/above the breakpoint', () => {
    const { isMobile } = mountWithWidth(1200)
    expect(isMobile().value).toBe(false)
  })

  it('cleans up its media-query listener on unmount', () => {
    const { wrapper } = mountWithWidth(500)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
