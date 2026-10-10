import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import axe from 'axe-core'

import NumberField from '@/components/ui/NumberField.vue'
import NumberFieldContent from '@/components/ui/NumberFieldContent.vue'
import NumberFieldInput from '@/components/ui/NumberFieldInput.vue'
import NumberFieldIncrement from '@/components/ui/NumberFieldIncrement.vue'
import NumberFieldDecrement from '@/components/ui/NumberFieldDecrement.vue'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

function mountField(rootProps: Record<string, unknown> = {}) {
  const model = ref<number | undefined>(rootProps.modelValue as number | undefined)
  const Harness = defineComponent({
    setup: () => () =>
      h(
        NumberField,
        {
          locale: 'en-US',
          ...rootProps,
          ...('modelValue' in rootProps
            ? {
                modelValue: model.value,
                'onUpdate:modelValue': (v: number | undefined) => (model.value = v),
              }
            : {}),
        },
        () =>
          h(NumberFieldContent, () => [
            h(NumberFieldDecrement),
            h(NumberFieldInput, { 'aria-label': 'Quantity' }),
            h(NumberFieldIncrement),
          ])
      ),
  })
  wrapper = mount(Harness, { attachTo: document.body })
  return { wrapper, model }
}

const input = () => wrapper!.get('input[role="spinbutton"]')
const inc = () => wrapper!.get('button[aria-label="Increase"]')
const dec = () => wrapper!.get('button[aria-label="Decrease"]')

/** Reka's stepper buttons act on pointerdown (press-and-hold), not click. */
async function press(button: ReturnType<typeof inc>) {
  // Reka attaches its pointerdown listener after mount; let that settle first.
  await nextTick()
  const init = { button: 0, pointerId: 1, pointerType: 'mouse', bubbles: true }
  button.element.dispatchEvent(new PointerEvent('pointerdown', init))
  window.dispatchEvent(new PointerEvent('pointerup', init))
  await nextTick()
}

async function key(k: string) {
  await input().trigger('keydown', { key: k })
  await nextTick()
}

describe('NumberField.vue', () => {
  it('renders a spinbutton with stepper buttons and the box styling', () => {
    mountField({ defaultValue: 3, min: 0, max: 10 })
    const el = input()
    expect(el.attributes('type')).toBe('text')
    expect(el.attributes('aria-valuenow')).toBe('3')
    expect(el.attributes('aria-valuemin')).toBe('0')
    expect(el.attributes('aria-valuemax')).toBe('10')
    expect((el.element as HTMLInputElement).value).toBe('3')
    expect(inc().attributes('tabindex')).toBe('-1')
    expect(dec().attributes('tabindex')).toBe('-1')
    const content = wrapper!.get('[data-slot="number-field-content"]')
    expect(content.classes()).toContain('border-3')
    expect(inc().classes()).toContain('border-l-3')
    expect(dec().classes()).toContain('border-r-3')
  })

  it('increments and decrements by step', async () => {
    const { model } = mountField({ modelValue: 5, step: 5 })
    await press(inc())
    expect(model.value).toBe(10)
    await press(dec())
    await press(dec())
    expect(model.value).toBe(0)
  })

  it('disables the increment button at max', async () => {
    const { model } = mountField({ modelValue: 9, min: 0, max: 10 })
    await press(inc())
    expect(model.value).toBe(10)
    expect(inc().attributes('disabled')).toBeDefined()
    expect(dec().attributes('disabled')).toBeUndefined()
  })

  it('clamps a typed value to max on blur', async () => {
    const { model } = mountField({ modelValue: 1, min: 0, max: 10 })
    const el = input().element as HTMLInputElement
    el.value = '42'
    await input().trigger('blur')
    expect(model.value).toBe(10)
  })

  it('supports ArrowUp/Down, PageUp/Down and Home/End', async () => {
    const { model } = mountField({ modelValue: 50, min: 0, max: 100 })
    await key('ArrowUp')
    expect(model.value).toBe(51)
    await key('ArrowDown')
    expect(model.value).toBe(50)
    await key('PageUp')
    expect(model.value).toBe(60)
    await key('PageDown')
    expect(model.value).toBe(50)
    await key('End')
    expect(model.value).toBe(100)
    await key('Home')
    expect(model.value).toBe(0)
  })

  it('formats with formatOptions', async () => {
    mountField({ defaultValue: 1234.5, formatOptions: { style: 'currency', currency: 'USD' } })
    await nextTick()
    expect((input().element as HTMLInputElement).value).toBe('$1,234.50')
  })

  it('disables the input and buttons', () => {
    mountField({ defaultValue: 5, disabled: true })
    expect(input().attributes('disabled')).toBeDefined()
    expect(inc().attributes('disabled')).toBeDefined()
    expect(dec().attributes('disabled')).toBeDefined()
  })

  it('submits the value under `name` in a native form', async () => {
    const Form = defineComponent({
      setup: () => () =>
        h('form', [
          h(NumberField, { name: 'quantity', defaultValue: 7 }, () =>
            h(NumberFieldContent, () => [h(NumberFieldInput, { 'aria-label': 'Quantity' })])
          ),
        ]),
    })
    wrapper = mount(Form, { attachTo: document.body })
    await nextTick()
    const form = wrapper.get('form').element as HTMLFormElement
    expect(new FormData(form).get('quantity')).toBe('7')
  })

  it('has no axe violations', async () => {
    mountField({ defaultValue: 3, min: 0, max: 10 })
    const results = await axe.run(wrapper!.element as Element, {
      rules: { 'color-contrast': { enabled: false } },
    })
    expect(results.violations.map((v) => v.id)).toEqual([])
  })
})
