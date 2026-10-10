/**
 * Chat kit (Vue) — MessageScroller core + rendering of every part, parity with
 * src/components/ui/__tests__/chat.test.tsx.
 *
 * happy-dom has no layout, so the scroller tests stub scrollHeight /
 * clientHeight / scrollTop on the viewport and drive a hand-rolled
 * ResizeObserver whose callbacks fire on demand.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, type PropType } from 'vue'
import MessageScroller from '@/components/ui/MessageScroller.vue'
import MessageScrollerContent from '@/components/ui/MessageScrollerContent.vue'
import MessageScrollerJumpButton from '@/components/ui/MessageScrollerJumpButton.vue'
import Message from '@/components/ui/Message.vue'
import MessageAvatar from '@/components/ui/MessageAvatar.vue'
import MessageHeader from '@/components/ui/MessageHeader.vue'
import MessageContent from '@/components/ui/MessageContent.vue'
import MessageFooter from '@/components/ui/MessageFooter.vue'
import Bubble from '@/components/ui/Bubble.vue'
import Attachment from '@/components/ui/Attachment.vue'
import Marker from '@/components/ui/Marker.vue'
import type { MessageScrollerExposed } from '@/components/ui/message-scroller-context'

// --- ResizeObserver driven by the test -------------------------------------
const observers = new Set<MockResizeObserver>()
class MockResizeObserver {
  private cb: ResizeObserverCallback
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb
    observers.add(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {
    observers.delete(this)
  }
  fire() {
    this.cb([], this as unknown as ResizeObserver)
  }
}
async function triggerResize() {
  observers.forEach((o) => o.fire())
  await nextTick()
}

beforeEach(() => {
  observers.clear()
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
})
afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

function stubGeometry(el: HTMLElement, init: { scrollHeight: number; clientHeight: number }) {
  const geo = { ...init, scrollTop: 0 }
  Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => geo.scrollHeight })
  Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => geo.clientHeight })
  Object.defineProperty(el, 'scrollTop', {
    configurable: true,
    get: () => geo.scrollTop,
    set: (v: number) => {
      geo.scrollTop = Math.max(0, Math.min(v, geo.scrollHeight - geo.clientHeight))
    },
  })
  el.scrollTo = ((opts: ScrollToOptions) => {
    el.scrollTop = opts.top ?? 0
  }) as typeof el.scrollTo
  return geo
}

async function userScrollTo(el: HTMLElement, top: number) {
  el.scrollTop = top
  el.dispatchEvent(new Event('scroll'))
  await nextTick()
}

const Conversation = defineComponent({
  props: {
    ids: { type: Array as PropType<string[]>, required: true },
    streaming: { type: Boolean, default: false },
    customJump: { type: Boolean, default: false },
    preventJump: { type: Boolean, default: false },
  },
  emits: ['reachTop'],
  setup(props, { emit }) {
    return () =>
      h(
        MessageScroller,
        { streaming: props.streaming, onReachTop: () => emit('reachTop') },
        () => [
          h(MessageScrollerContent, null, () =>
            props.ids.map((id) =>
              h(Message, { key: id, 'data-message-id': id }, () =>
                h(MessageContent, null, () => h(Bubble, null, () => `Message ${id}`))
              )
            )
          ),
          // Nested inside a div: registration must work at any depth.
          props.customJump
            ? h('div', null, [
                h(
                  MessageScrollerJumpButton,
                  {
                    class: 'custom-jump',
                    onClick: (e: MouseEvent) => {
                      if (props.preventJump) e.preventDefault()
                    },
                  },
                  () => 'Latest'
                ),
              ])
            : null,
        ]
      )
  },
})

async function mountConversation(props: {
  ids: string[]
  streaming?: boolean
  customJump?: boolean
  preventJump?: boolean
}) {
  const wrapper = mount(Conversation, { props, attachTo: document.body })
  await nextTick()
  const log = wrapper.get('[role="log"]').element as HTMLElement
  return { wrapper, log }
}

const jumpButton = () =>
  document.querySelector('[data-slot="message-scroller-jump-button"]') as HTMLButtonElement | null

describe('MessageScroller.vue', () => {
  it('renders the log with live-region semantics and aria-busy while streaming', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['a'] })
    expect(log.getAttribute('aria-live')).toBe('polite')
    expect(log.getAttribute('tabindex')).toBe('0')
    expect(log.hasAttribute('aria-busy')).toBe(false)
    await wrapper.setProps({ streaming: true })
    expect(log.getAttribute('aria-busy')).toBe('true')
    wrapper.unmount()
  })

  it('follows new content and streamed growth while at the bottom', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['1', '2', '3'] })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    expect(geo.scrollTop).toBe(600)

    await wrapper.setProps({ ids: ['1', '2', '3', '4'] })
    geo.scrollHeight = 1200
    await triggerResize()
    expect(geo.scrollTop).toBe(800)

    geo.scrollHeight = 1350
    await triggerResize()
    expect(geo.scrollTop).toBe(950)
    expect(jumpButton()).toBeNull()
    wrapper.unmount()
  })

  it('stops following after a scroll up, shows the jump button with an unread count', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['1', '2', '3'] })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()

    await userScrollTo(log, 200)
    expect(jumpButton()).not.toBeNull()

    await wrapper.setProps({ ids: ['1', '2', '3', '4', '5'] })
    geo.scrollHeight = 1400
    await triggerResize()
    expect(geo.scrollTop).toBe(200)
    expect(jumpButton()!.getAttribute('aria-label')).toBe('Jump to latest message, 2 new')

    jumpButton()!.click()
    expect(geo.scrollTop).toBe(1000)
    await userScrollTo(log, 1000)
    expect(jumpButton()).toBeNull()

    await wrapper.setProps({ ids: ['1', '2', '3', '4', '5', '6'] })
    geo.scrollHeight = 1600
    await triggerResize()
    expect(geo.scrollTop).toBe(1200)
    wrapper.unmount()
  })

  it('keeps the viewport anchored when older history is prepended, and emits reachTop', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['3', '4', '5'] })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    // The unlaid-out mount (0 × 0) counts as "fits" and already asked once.
    const base = wrapper.emitted('reachTop')?.length ?? 0

    await userScrollTo(log, 120)
    await userScrollTo(log, 10)
    await userScrollTo(log, 5)
    expect(wrapper.emitted('reachTop')).toHaveLength(base + 1)

    await wrapper.setProps({ ids: ['1', '2', '3', '4', '5'] })
    geo.scrollHeight = 1500
    await triggerResize()
    expect(geo.scrollTop).toBe(505)
    expect(jumpButton()!.getAttribute('aria-label')).toBe('Jump to latest message')
    wrapper.unmount()
  })

  it('exposes scrollToMessage / scrollToBottom / isAtBottom', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['m1', 'm2', 'm3'] })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    log.getBoundingClientRect = () => ({ top: 100, height: 400 }) as DOMRect
    const target = log.querySelector('[data-message-id="m2"]') as HTMLElement
    target.getBoundingClientRect = () => ({ top: 400, height: 50 }) as DOMRect

    const api = wrapper.findComponent(MessageScroller).vm as unknown as MessageScrollerExposed
    expect(api.scrollToMessage('m2', { behavior: 'instant' })).toBe(true)
    expect(geo.scrollTop).toBe(300)
    expect(api.scrollToMessage('missing')).toBe(false)

    api.scrollToBottom({ behavior: 'instant' })
    expect(geo.scrollTop).toBe(600)
    expect(api.isAtBottom()).toBe(true)
    wrapper.unmount()
  })

  it('detaches on any upward scroll, even inside the threshold, and re-attaches at the bottom', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['1', '2'], streaming: true })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    expect(geo.scrollTop).toBe(600)

    await userScrollTo(log, 580) // 20px up: within the 48px threshold
    expect(jumpButton()).not.toBeNull()
    geo.scrollHeight = 1100
    await triggerResize()
    expect(geo.scrollTop).toBe(580)

    await userScrollTo(log, 690) // downward, back inside the threshold
    expect(jumpButton()).toBeNull()
    await wrapper.setProps({ ids: ['1', '2', '3'] })
    geo.scrollHeight = 1200
    await triggerResize()
    expect(geo.scrollTop).toBe(800)

    // Content shrinking clamps scrollTop down — not a reader moving up.
    geo.scrollHeight = 1100
    geo.scrollTop = 700
    log.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(jumpButton()).toBeNull()
    wrapper.unmount()
  })

  it('moves focus to the log when the jump button is activated from the keyboard', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['1', '2'] })
    stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    await userScrollTo(log, 100)

    const button = jumpButton()!
    button.focus()
    expect(document.activeElement).toBe(button)
    button.click()
    await nextTick()
    expect(jumpButton()).toBeNull()
    expect(document.activeElement).toBe(log)
    wrapper.unmount()
  })

  it('emits reachTop when the history does not overflow, once per first message', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['3'] })
    const geo = stubGeometry(log, { scrollHeight: 400, clientHeight: 400 })
    await triggerResize()
    expect(wrapper.emitted('reachTop')).toHaveLength(1)

    await wrapper.setProps({ ids: ['1', '2', '3'] })
    await triggerResize()
    expect(wrapper.emitted('reachTop')).toHaveLength(2)

    await triggerResize()
    await triggerResize()
    expect(wrapper.emitted('reachTop')).toHaveLength(2)

    geo.scrollHeight = 1000
    await triggerResize()
    expect(wrapper.emitted('reachTop')).toHaveLength(2)
    wrapper.unmount()
  })

  it('cancels the jump when a consumer @click calls preventDefault', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['x'], customJump: true, preventJump: true })
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    await userScrollTo(log, 100)
    jumpButton()!.click()
    await nextTick()
    expect(geo.scrollTop).toBe(100)
    expect(jumpButton()).not.toBeNull()
    wrapper.unmount()
  })

  it('uses a slotted MessageScrollerJumpButton (at any depth) instead of the auto-placed one', async () => {
    const { wrapper, log } = await mountConversation({ ids: ['x'], customJump: true })
    stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    await triggerResize()
    await userScrollTo(log, 100)
    await nextTick()
    const buttons = document.querySelectorAll('[data-slot="message-scroller-jump-button"]')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].classList.contains('custom-jump')).toBe(true)
    expect(buttons[0].textContent).toContain('Latest')
    wrapper.unmount()
  })
})

describe('Message parts (Vue)', () => {
  it('renders avatar, header, content and footer with author data attributes', () => {
    const wrapper = mount(Message, {
      props: { from: 'user', grouped: true },
      slots: {
        default: () => [
          h(MessageAvatar, null, () => 'AV'),
          h(MessageHeader, { name: 'Ada', timestamp: '10:42', dateTime: '2026-10-10T10:42' }),
          h(MessageContent, null, () => 'Hello'),
          h(MessageFooter, null, () => h('button', { type: 'button' }, 'Copy')),
        ],
      },
    })
    const row = wrapper.get('[data-slot="message"]')
    expect(row.attributes('data-from')).toBe('user')
    expect(row.attributes('data-grouped')).toBe('true')
    expect(wrapper.get('[data-slot="message-avatar"]').text()).toBe('AV')
    expect(wrapper.get('time').attributes('datetime')).toBe('2026-10-10T10:42')
    expect(wrapper.get('[data-slot="message-header"]').text()).toContain('Ada')
    expect(wrapper.get('[data-slot="message-content"]').text()).toBe('Hello')
    expect(wrapper.get('[data-slot="message-footer"] button').text()).toBe('Copy')
  })
})

describe('Bubble.vue', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return (this as HTMLElement).dataset.slot === 'bubble-content' ? 200 : 0
      },
    })
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() {
        return (this as HTMLElement).dataset.slot === 'bubble-content' ? 60 : 0
      },
    })
  })
  afterEach(() => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>).scrollHeight
    delete (HTMLElement.prototype as unknown as Record<string, unknown>).clientHeight
  })

  it('collapses overflowing content and toggles Show more / Show less', async () => {
    const wrapper = mount(Bubble, {
      props: { collapsedLines: 3 },
      slots: { default: 'A very long answer' },
    })
    await nextTick()
    const content = wrapper.get('[data-slot="bubble-content"]')
    const toggle = wrapper.get('button')
    expect(toggle.text()).toBe('Show more')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(toggle.attributes('aria-controls')).toBe(content.attributes('id'))
    expect(content.attributes('data-state')).toBe('collapsed')

    await toggle.trigger('click')
    expect(wrapper.get('button').text()).toBe('Show less')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
    expect(content.attributes('data-state')).toBe('expanded')
  })

  it('renders reactions as toggle buttons when @reaction-click is bound', async () => {
    const onReactionClick = vi.fn()
    const wrapper = mount(Bubble, {
      props: {
        variant: 'primary',
        reactions: [{ emoji: '🔥', count: 3, label: 'fire', active: true }],
        onReactionClick,
      },
      slots: { default: 'Hi' },
    })
    const chip = wrapper.get('button[aria-label="fire: 3"]')
    expect(chip.attributes('aria-pressed')).toBe('true')
    await chip.trigger('click')
    expect(onReactionClick).toHaveBeenCalledWith(expect.objectContaining({ emoji: '🔥' }), 0)
  })

  it('renders static reaction chips without buttons', () => {
    const wrapper = mount(Bubble, {
      props: { reactions: [{ emoji: '👍', count: 2, label: 'thumbs up' }] },
      slots: { default: 'Hi' },
    })
    expect(wrapper.find('ul[aria-label="Reactions"] button').exists()).toBe(false)
    expect(wrapper.get('.sr-only').text()).toBe('thumbs up: 2')
  })
})

describe('Attachment.vue', () => {
  it('uses a stretched link without nesting interactive elements', async () => {
    const onDownload = vi.fn()
    const onRemove = vi.fn()
    const wrapper = mount(Attachment, {
      props: {
        name: 'report.pdf',
        type: 'application/pdf',
        size: 2048,
        href: '/files/report.pdf',
        onDownload,
        onRemove,
      },
    })
    const link = wrapper.get('a')
    expect(link.text()).toBe('report.pdf')
    expect(link.attributes('href')).toBe('/files/report.pdf')
    expect(wrapper.text()).toContain('2 KB')

    const interactives = Array.from((wrapper.element as HTMLElement).querySelectorAll('a, button'))
    for (const outer of interactives) {
      for (const inner of interactives) {
        if (outer !== inner) expect(outer.contains(inner)).toBe(false)
      }
    }

    await wrapper.get('button[aria-label="Download report.pdf"]').trigger('click')
    await wrapper.get('button[aria-label="Remove report.pdf"]').trigger('click')
    expect(onDownload).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('shows a progress bar and no open link while uploading', () => {
    const wrapper = mount(Attachment, {
      props: { name: 'photo.png', src: '/photo.png', state: 'uploading', progress: 42, href: '/photo.png' },
    })
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.get('img').attributes('src')).toBe('/photo.png')
    const bar = wrapper.get('[role="progressbar"]')
    expect(bar.attributes('aria-label')).toBe('Uploading photo.png')
    expect(bar.attributes('aria-valuenow')).toBe('42')
    expect(wrapper.text()).toContain('Uploading · 42%')
  })
})

describe('Marker.vue', () => {
  it('renders each variant and shimmers only while active', async () => {
    const wrapper = mount(Marker, {
      props: { variant: 'status', active: true },
      slots: { default: 'Searching the web…' },
    })
    expect(wrapper.get('[data-slot="marker-label"]').classes()).toContain('bk-shimmer')
    await wrapper.setProps({ active: false })
    expect(wrapper.get('[data-slot="marker-label"]').classes()).not.toContain('bk-shimmer')

    const sep = mount(Marker, { props: { variant: 'separator' }, slots: { default: 'Today' } })
    expect(sep.get('[data-slot="marker"]').attributes('data-variant')).toBe('separator')
    expect(sep.findAll('[aria-hidden="true"].bg-foreground')).toHaveLength(2)
    expect(sep.text()).toBe('Today')

    const note = mount(Marker, { slots: { default: 'Ada joined' } })
    expect(note.get('[data-slot="marker"]').attributes('data-variant')).toBe('note')
    expect(note.text()).toBe('Ada joined')
  })
})
