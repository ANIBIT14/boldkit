import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/ui/Button.vue'

// Smoke test proving the SFC test harness renders BoldKit components and that
// CVA variant/prop wiring reaches the DOM.
describe('Button.vue', () => {
  it('renders slot content in a <button> by default', () => {
    const wrapper = mount(Button, { slots: { default: 'Submit' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Submit')
  })

  it('applies the default variant classes', () => {
    const wrapper = mount(Button, { slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('border-3')
  })

  it('applies the selected variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('honors the `as` prop for polymorphic rendering', () => {
    const wrapper = mount(Button, {
      props: { as: 'a' },
      slots: { default: 'link' },
    })
    expect(wrapper.element.tagName).toBe('A')
  })

  it('merges a custom class', () => {
    const wrapper = mount(Button, {
      props: { class: 'custom-x' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('custom-x')
  })
})
