import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useThemeProvider, useTheme } from '@/composables/useTheme'

// Host that installs the provider and re-exposes it for assertions.
function mountProvider() {
  let api!: ReturnType<typeof useThemeProvider>
  const Comp = defineComponent({
    setup() {
      api = useThemeProvider({ defaultTheme: 'light' })
      return () => null
    },
  })
  const wrapper = mount(Comp)
  return { wrapper, api: () => api }
}

describe('useThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('mounts without throwing (immediate watcher runs during setup)', () => {
    expect(() => mountProvider()).not.toThrow()
  })

  it('applies the resolved theme class to <html> and updates on setTheme', async () => {
    const { api } = mountProvider()
    expect(document.documentElement.classList.contains('light')).toBe(true)

    api().setTheme('dark')
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
    expect(api().resolvedTheme.value).toBe('dark')
    expect(localStorage.getItem('boldkit-theme')).toBe('dark')
  })
})

describe('useTheme fallback (no provider)', () => {
  it('returns a working standalone state without throwing', () => {
    const Comp = defineComponent({
      setup() {
        const t = useTheme()
        return () => t.theme.value
      },
    })
    expect(() => mount(Comp)).not.toThrow()
  })
})
