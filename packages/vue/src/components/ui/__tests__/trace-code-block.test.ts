/**
 * Trace + CodeBlock (Vue) — parity with
 * src/components/ui/__tests__/trace-code-block.test.tsx.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import CodeBlockContent from '@/components/ui/CodeBlockContent.vue'
import CodeBlockLine from '@/components/ui/CodeBlockLine.vue'
import CodeBlockCopyButton from '@/components/ui/CodeBlockCopyButton.vue'
import Trace from '@/components/ui/Trace.vue'
import TraceLine from '@/components/ui/TraceLine.vue'
import TraceTitle from '@/components/ui/TraceTitle.vue'
import TraceCollapsible from '@/components/ui/TraceCollapsible.vue'
import TraceCollapsibleTrigger from '@/components/ui/TraceCollapsibleTrigger.vue'
import TraceCollapsibleContent from '@/components/ui/TraceCollapsibleContent.vue'

describe('CodeBlockContent', () => {
  it('splits `code` into one numbered line per row, dropping the trailing newline', () => {
    const w = mount(CodeBlock, {
      slots: {
        default: () => h(CodeBlockContent, { code: 'a\n\nc\n', lineNumbers: true, startLine: 10 }),
      },
    })
    const pre = w.get('pre')
    expect(pre.attributes('data-numbered')).toBeDefined()
    expect((pre.element as HTMLElement).style.counterReset).toBe('line 9')
    const lines = w.findAll('[data-slot=code-block-line]')
    expect(lines).toHaveLength(3)
    // the empty middle line keeps a newline so copied selections keep it
    expect(lines[1].text()).toBe('')
    expect(lines[1].element.textContent).toBe('\n')
  })

  it('renders `code` as-is without lineNumbers, and the slot when no `code`', () => {
    const plain = mount(CodeBlockContent, { props: { code: 'a\nb' } })
    expect(plain.findAll('[data-slot=code-block-line]')).toHaveLength(0)
    expect(plain.get('code').element.textContent).toBe('a\nb')
    const slotted = mount(CodeBlockContent, { slots: { default: '<b>hi</b>' } })
    expect(slotted.get('code b').text()).toBe('hi')
  })

  it('is keyboard-focusable so overflowing code can be scrolled', () => {
    expect(mount(CodeBlockContent).get('pre').attributes('tabindex')).toBe('0')
  })
})

describe('CodeBlockLine', () => {
  it('announces diff lines to screen readers', () => {
    const added = mount(CodeBlockLine, { props: { variant: 'added' }, slots: { default: 'x' } })
    const removed = mount(CodeBlockLine, { props: { variant: 'removed' }, slots: { default: 'x' } })
    const hot = mount(CodeBlockLine, { props: { variant: 'highlighted' }, slots: { default: 'x' } })
    expect(added.get('.sr-only').text()).toBe('Added:')
    expect(removed.get('.sr-only').text()).toBe('Removed:')
    expect(hot.find('.sr-only').exists()).toBe(false)
  })
})

describe('CodeBlockCopyButton', () => {
  let spy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: async () => {} },
        configurable: true,
      })
    }
    spy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  })
  afterEach(() => {
    vi.useRealTimers()
    spy.mockRestore()
  })

  it('copies the value, flips to "Copied", and resets after 2s', async () => {
    vi.useFakeTimers()
    const w = mount(CodeBlockCopyButton, { props: { value: 'npm i' } })
    const button = w.get('button')
    expect(button.attributes('aria-label')).toBe('Copy code')
    await button.trigger('click')
    await flushPromises()
    expect(spy).toHaveBeenCalledWith('npm i')
    expect(button.attributes('aria-label')).toBe('Copied')
    expect(button.attributes('data-copied')).toBeDefined()
    vi.advanceTimersByTime(2000)
    await flushPromises()
    expect(button.attributes('aria-label')).toBe('Copy code')
  })

  it('skips copying when the consumer prevents default', async () => {
    const w = mount(CodeBlockCopyButton, {
      props: { value: 'x', onClick: (e: MouseEvent) => e.preventDefault() },
    })
    await w.get('button').trigger('click')
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Trace', () => {
  it('shimmers the title and marks the line busy while running', () => {
    const w = mount(
      defineComponent({
        components: { Trace, TraceLine, TraceTitle },
        template: `<Trace>
          <TraceLine status="running"><TraceTitle>Searching</TraceTitle></TraceLine>
          <TraceLine status="error"><TraceTitle>Failed</TraceTitle></TraceLine>
        </Trace>`,
      })
    )
    const [running, failed] = w.findAll('[data-slot=trace-line]')
    expect(running.attributes('aria-busy')).toBe('true')
    expect(running.get('[data-slot=trace-title]').classes()).toContain('bk-shimmer')
    expect(failed.attributes('aria-busy')).toBeUndefined()
    expect(failed.get('[data-slot=trace-title]').classes()).not.toContain('bk-shimmer')
  })

  it('expands and collapses through the trigger (uncontrolled)', async () => {
    const w = mount(
      defineComponent({
        components: { Trace, TraceLine, TraceTitle, TraceCollapsible, TraceCollapsibleTrigger, TraceCollapsibleContent },
        template: `<Trace>
          <TraceCollapsible>
            <TraceCollapsibleTrigger><TraceLine><TraceTitle>Ran tests</TraceTitle></TraceLine></TraceCollapsibleTrigger>
            <TraceCollapsibleContent>output</TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>`,
      }),
      { attachTo: document.body }
    )
    const trigger = w.get('button')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(w.text()).not.toContain('output')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(w.text()).toContain('output')
    w.unmount()
  })
})
