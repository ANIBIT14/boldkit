/**
 * Drawer.vue — moved from vaul-vue to Reka's native Drawer (reka-ui 2.10+).
 * The vaul-era props must keep working: `direction` maps to `swipeDirection`
 * and `dismissible: false` must veto user-initiated closes.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import Drawer from '@/components/ui/Drawer.vue'
import DrawerContent from '@/components/ui/DrawerContent.vue'
import DrawerTitle from '@/components/ui/DrawerTitle.vue'
import DrawerDescription from '@/components/ui/DrawerDescription.vue'
import DrawerTrigger from '@/components/ui/DrawerTrigger.vue'

const content = () => document.querySelector('[role="dialog"]') as HTMLElement | null

function harness(props: Record<string, unknown>) {
  return defineComponent({
    components: { Drawer, DrawerContent, DrawerTitle, DrawerDescription, DrawerTrigger },
    setup() {
      const open = ref(true)
      return { open, props }
    },
    template: `
      <Drawer v-model:open="open" v-bind="props">
        <DrawerTrigger><button type="button">Open</button></DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Body</DrawerDescription>
        </DrawerContent>
      </Drawer>
    `,
  })
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Drawer.vue (Reka)', () => {
  it('renders an accessible dialog with title and description', async () => {
    const w = mount(harness({}), { attachTo: document.body })
    await nextTick()
    const el = content()
    expect(el).not.toBeNull()
    expect(document.getElementById(el!.getAttribute('aria-labelledby')!)?.textContent).toBe('Title')
    expect(document.getElementById(el!.getAttribute('aria-describedby')!)?.textContent).toBe('Body')
    w.unmount()
  })

  it('defaults to a bottom drawer and maps the legacy `direction` prop', async () => {
    const w = mount(harness({}), { attachTo: document.body })
    await nextTick()
    expect(content()!.getAttribute('data-swipe-direction')).toBe('down')
    w.unmount()

    const r = mount(harness({ direction: 'right' }), { attachTo: document.body })
    await nextTick()
    expect(content()!.getAttribute('data-swipe-direction')).toBe('right')
    r.unmount()
  })

  it('closes on Escape by default', async () => {
    const w = mount(harness({}), { attachTo: document.body })
    await nextTick()
    content()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect((w.vm as unknown as { open: boolean }).open).toBe(false)
    w.unmount()
  })

  it('`dismissible: false` vetoes Escape', async () => {
    const w = mount(harness({ dismissible: false }), { attachTo: document.body })
    await nextTick()
    content()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect((w.vm as unknown as { open: boolean }).open).toBe(true)
    w.unmount()
  })
})
