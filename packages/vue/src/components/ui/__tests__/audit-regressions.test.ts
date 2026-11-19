/**
 * Regression tests for the Vue bugs found in the 2026-09 React/Vue audit.
 *
 * Each block names the defect it pins so a future refactor that reintroduces
 * it fails here rather than in a consumer's app.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import TagInput from '@/components/ui/TagInput.vue'
import Dropzone from '@/components/ui/Dropzone.vue'
import Input from '@/components/ui/Input.vue'

describe('TagInput.vue delimiter', () => {
  // The prop was wrapped in `new RegExp(...)`, so any regex metacharacter was
  // reinterpreted: '.' split on every character and '(' threw a SyntaxError on
  // every keystroke. React has always split on the literal string.
  async function typeInto(wrapper: ReturnType<typeof mount>, text: string) {
    const input = wrapper.get('input[type="text"]')
    await input.setValue(text)
    return input
  }

  it('treats a "." delimiter literally, not as "any character"', async () => {
    const w = mount(TagInput, { props: { delimiter: '.', modelValue: [] } })
    await typeInto(w, 'alpha.beta.')
    expect(w.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['alpha', 'beta'])
  })

  it('does not throw on a delimiter that is an invalid regex', async () => {
    const w = mount(TagInput, { props: { delimiter: '(', modelValue: [] } })
    await expect(typeInto(w, 'a(b(')).resolves.toBeDefined()
    expect(w.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['a', 'b'])
  })

  it('still accepts a real RegExp delimiter', async () => {
    const w = mount(TagInput, { props: { delimiter: /[,;]/, modelValue: [] } })
    await typeInto(w, 'a,b;')
    expect(w.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['a', 'b'])
  })

  it('keeps the default comma behaviour', async () => {
    const w = mount(TagInput, { props: { modelValue: [] } })
    await typeInto(w, 'one,two,')
    expect(w.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['one', 'two'])
  })
})

describe('TagInput.vue error id', () => {
  // The error element used a hardcoded id, so two TagInputs on one form emitted
  // duplicate ids and aria-describedby resolved to the wrong component's error.
  it('derives the error id from useId, not a literal', async () => {
    // Both instances must live in the SAME app — Vue's useId counter is
    // per-app, so two separate mount() calls would each restart it.
    const Host = defineComponent({
      components: { TagInput },
      template: `
        <div>
          <TagInput :max-tags="1" :model-value="['x']" />
          <TagInput :max-tags="1" :model-value="['y']" />
        </div>
      `,
    })
    const w = mount(Host, { attachTo: document.body })
    for (const input of w.findAll('input[type="text"]')) {
      await input.setValue('z')
      await input.trigger('keydown', { key: 'Enter' })
    }
    const ids = w.findAll('[role="alert"]').map((el) => el.attributes('id'))
    expect(ids).toHaveLength(2)
    expect(ids).not.toContain('tag-input-error')
    expect(ids[0]).not.toBe(ids[1])
    w.unmount()
  })
})

describe('Dropzone.vue keyboard access', () => {
  // role="button" with a tabindex but no key handler is a keyboard trap: the
  // control is focusable but Enter and Space do nothing, so the file picker
  // can never be opened without a mouse (WCAG 2.1.1).
  it.each(['Enter', ' '])('opens the file picker on %s', async (key) => {
    const w = mount(Dropzone, { attachTo: document.body })
    const input = w.get('input[type="file"]').element as HTMLInputElement
    let clicked = 0
    input.click = () => {
      clicked++
    }
    await w.get('[role="button"]').trigger('keydown', { key })
    expect(clicked).toBe(1)
    w.unmount()
  })

  it('ignores keys while disabled', async () => {
    const w = mount(Dropzone, { props: { disabled: true }, attachTo: document.body })
    const input = w.get('input[type="file"]').element as HTMLInputElement
    let clicked = 0
    input.click = () => {
      clicked++
    }
    await w.get('[role="button"]').trigger('keydown', { key: 'Enter' })
    expect(clicked).toBe(0)
    w.unmount()
  })

  it('has an accessible name', () => {
    const w = mount(Dropzone)
    expect(w.get('[role="button"]').attributes('aria-label')).toBe('File upload area')
  })

  it('keeps the hidden file input out of the tab order', () => {
    // It is interactive inside a role="button", which axe flags as
    // nested-interactive unless it is unreachable by Tab.
    const w = mount(Dropzone)
    expect(w.get('input[type="file"]').attributes('tabindex')).toBe('-1')
  })
})

describe('TagInput.vue combobox semantics', () => {
  // Parity with the React suite: arrow-key highlighting and validation errors
  // were purely visual, with nothing announced to assistive tech.
  const suggestions = ['alpha', 'alto', 'beta']

  it('reports collapsed state with no suggestions showing', () => {
    const w = mount(TagInput, { props: { suggestions, modelValue: [] } })
    const input = w.get('input[role="combobox"]')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-controls')).toBeUndefined()
  })

  it('exposes the suggestion list as a listbox of options', async () => {
    const w = mount(TagInput, { props: { suggestions, modelValue: [] } })
    const input = w.get('input[role="combobox"]')
    await input.setValue('al')

    expect(input.attributes('aria-expanded')).toBe('true')
    const listbox = w.get('[role="listbox"]')
    expect(listbox.attributes('id')).toBe(input.attributes('aria-controls'))
    expect(w.findAll('[role="option"]')).toHaveLength(2)
  })

  it('tracks the active option with aria-activedescendant', async () => {
    const w = mount(TagInput, { props: { suggestions, modelValue: [] }, attachTo: document.body })
    const input = w.get('input[role="combobox"]')
    await input.setValue('al')
    expect(input.attributes('aria-activedescendant')).toBeUndefined()

    await input.trigger('keydown', { key: 'ArrowDown' })
    const active = w.get('input[role="combobox"]').attributes('aria-activedescendant')
    expect(active).toBeTruthy()
    expect(document.getElementById(active!)?.getAttribute('aria-selected')).toBe('true')
    w.unmount()
  })

  it('keeps options out of the tab order', async () => {
    const w = mount(TagInput, { props: { suggestions, modelValue: [] } })
    await w.get('input[role="combobox"]').setValue('al')
    for (const option of w.findAll('[role="option"]')) {
      expect(option.element.tagName).not.toBe('BUTTON')
      expect(option.attributes('tabindex')).toBeUndefined()
    }
  })
})

describe('Input.vue native props', () => {
  // Declared props are removed from $attrs, and the template bound only
  // type/class/v-model — so placeholder, disabled, name, id... never reached
  // the <input> (Questionnaire's "Other" field lost its placeholder).
  it('forwards declared native props to the <input>', () => {
    const w = mount(Input, {
      props: { placeholder: 'Type', disabled: true, name: 'q', id: 'x', maxlength: 5, inputmode: 'numeric' },
    })
    const el = w.get('input').element as HTMLInputElement
    expect(el.placeholder).toBe('Type')
    expect(el.disabled).toBe(true)
    expect(el.name).toBe('q')
    expect(el.id).toBe('x')
    expect(el.maxLength).toBe(5)
    expect(el.getAttribute('inputmode')).toBe('numeric')
  })
})

describe('Reka root wrappers stay uncontrolled', () => {
  // `defineProps<XRootProps>()` + `v-bind="props"` forwarded Vue's cast of an
  // absent boolean (`open: false`), pinning every Dialog/Sheet/Popover/
  // Collapsible/DropdownMenu closed unless driven by v-model:open.
  const cases = [
    ['Dialog', () => import('@/components/ui/Dialog.vue'), 'DialogTrigger'],
    ['Sheet', () => import('@/components/ui/Sheet.vue'), 'DialogTrigger'],
    ['Popover', () => import('@/components/ui/Popover.vue'), 'PopoverTrigger'],
    ['Collapsible', () => import('@/components/ui/Collapsible.vue'), 'CollapsibleTrigger'],
  ] as const
  for (const [name, load, trigger] of cases) {
    it(`${name} opens from its trigger without v-model`, async () => {
      const Root = (await load()).default
      const Trigger = (await import('reka-ui'))[trigger]
      const w = mount(
        defineComponent({ components: { Root, Trigger }, template: '<Root><Trigger>t</Trigger></Root>' }),
        { attachTo: document.body }
      )
      await w.get('button').trigger('click')
      expect(w.get('button').attributes('aria-expanded')).toBe('true')
      w.unmount()
    })
  }
})
