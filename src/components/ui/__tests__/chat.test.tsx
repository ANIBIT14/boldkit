/**
 * Chat kit — MessageScroller, Message, Bubble, Attachment, Marker.
 *
 * happy-dom has no layout, so the scroller tests stub scrollHeight /
 * clientHeight / scrollTop on the viewport and drive a hand-rolled
 * ResizeObserver whose callbacks fire on demand.
 */
import * as React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen, fireEvent, act } from '@/test/test-utils'
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerJumpButton,
  type MessageScrollerHandle,
} from '../message-scroller'
import { Message, MessageAvatar, MessageHeader, MessageContent, MessageFooter } from '../message'
import { Bubble } from '../bubble'
import { Attachment } from '../attachment'
import { Marker } from '../marker'

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
function triggerResize() {
  act(() => {
    observers.forEach((o) => o.fire())
  })
}

beforeEach(() => {
  observers.clear()
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
})
afterEach(() => {
  vi.unstubAllGlobals()
})

// --- viewport geometry ------------------------------------------------------
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

function userScrollTo(el: HTMLElement, top: number) {
  el.scrollTop = top
  fireEvent.scroll(el)
}

function Conversation({
  ids,
  scrollerRef,
  streaming,
  onReachTop,
}: {
  ids: string[]
  scrollerRef?: React.Ref<MessageScrollerHandle>
  streaming?: boolean
  onReachTop?: () => void
}) {
  return (
    <MessageScroller ref={scrollerRef} streaming={streaming} onReachTop={onReachTop} className="h-96">
      <MessageScrollerContent>
        {ids.map((id) => (
          <Message key={id} data-message-id={id} from="assistant">
            <MessageContent>
              <Bubble>Message {id}</Bubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScrollerContent>
    </MessageScroller>
  )
}

const jumpButton = () => screen.queryByRole('button', { name: /jump to latest/i })

describe('MessageScroller', () => {
  it('renders the log with live-region semantics and aria-busy while streaming', () => {
    const { rerender } = render(<Conversation ids={['a']} />)
    const log = screen.getByRole('log')
    expect(log).toHaveAttribute('aria-live', 'polite')
    expect(log).toHaveAttribute('tabindex', '0')
    expect(log).not.toHaveAttribute('aria-busy')
    rerender(<Conversation ids={['a']} streaming />)
    expect(screen.getByRole('log')).toHaveAttribute('aria-busy', 'true')
  })

  it('follows new content and streamed growth while at the bottom', () => {
    const { rerender } = render(<Conversation ids={['1', '2', '3']} />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })

    triggerResize()
    expect(geo.scrollTop).toBe(600)

    // A new message arrives.
    rerender(<Conversation ids={['1', '2', '3', '4']} />)
    geo.scrollHeight = 1200
    triggerResize()
    expect(geo.scrollTop).toBe(800)

    // The last message grows as tokens stream in.
    geo.scrollHeight = 1350
    triggerResize()
    expect(geo.scrollTop).toBe(950)
    expect(jumpButton()).toBeNull()
  })

  it('stops following after a scroll up, shows the jump button with an unread count', () => {
    const { rerender } = render(<Conversation ids={['1', '2', '3']} />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()

    userScrollTo(log, 200)
    expect(jumpButton()).toBeInTheDocument()

    rerender(<Conversation ids={['1', '2', '3', '4', '5']} />)
    geo.scrollHeight = 1400
    triggerResize()
    expect(geo.scrollTop).toBe(200) // not dragged down
    expect(jumpButton()).toHaveAccessibleName('Jump to latest message, 2 new')

    fireEvent.click(jumpButton()!)
    expect(geo.scrollTop).toBe(1000)
    fireEvent.scroll(log)
    expect(jumpButton()).toBeNull()

    // Following again: the next message pins to the bottom.
    rerender(<Conversation ids={['1', '2', '3', '4', '5', '6']} />)
    geo.scrollHeight = 1600
    triggerResize()
    expect(geo.scrollTop).toBe(1200)
  })

  it('keeps the viewport anchored when older history is prepended', () => {
    const onReachTop = vi.fn()
    const { rerender } = render(<Conversation ids={['3', '4', '5']} onReachTop={onReachTop} />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()
    onReachTop.mockClear() // the unlaid-out mount (0 × 0) counts as "fits"

    userScrollTo(log, 120)
    userScrollTo(log, 10)
    expect(onReachTop).toHaveBeenCalledTimes(1)
    userScrollTo(log, 5) // still inside the top zone: no repeat
    expect(onReachTop).toHaveBeenCalledTimes(1)

    rerender(<Conversation ids={['1', '2', '3', '4', '5']} onReachTop={onReachTop} />)
    geo.scrollHeight = 1500 // 500px of history inserted above
    triggerResize()
    expect(geo.scrollTop).toBe(5 + 500)
    // Prepended messages are history, not unread.
    expect(jumpButton()).toHaveAccessibleName('Jump to latest message')
  })

  it('scrollToMessage / scrollToBottom via the imperative handle', () => {
    const ref = React.createRef<MessageScrollerHandle>()
    render(<Conversation ids={['m1', 'm2', 'm3']} scrollerRef={ref} />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })

    log.getBoundingClientRect = () => ({ top: 100, height: 400 }) as DOMRect
    const target = log.querySelector('[data-message-id="m2"]') as HTMLElement
    target.getBoundingClientRect = () => ({ top: 400, height: 50 }) as DOMRect

    let found = false
    act(() => {
      found = ref.current!.scrollToMessage('m2', { behavior: 'instant' })
    })
    expect(found).toBe(true)
    expect(geo.scrollTop).toBe(300)
    expect(ref.current!.scrollToMessage('missing')).toBe(false)

    act(() => ref.current!.scrollToBottom({ behavior: 'instant' }))
    expect(geo.scrollTop).toBe(600)
    expect(ref.current!.isAtBottom()).toBe(true)
  })

  it('detaches on any upward scroll, even inside the threshold, and re-attaches at the bottom', () => {
    const { rerender } = render(<Conversation ids={['1', '2']} streaming />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()
    expect(geo.scrollTop).toBe(600)

    userScrollTo(log, 580) // 20px up: within the 48px threshold
    expect(jumpButton()).toBeInTheDocument()
    geo.scrollHeight = 1100 // tokens keep streaming
    triggerResize()
    expect(geo.scrollTop).toBe(580) // not snapped back

    userScrollTo(log, 690) // downward, back inside the threshold
    expect(jumpButton()).toBeNull()
    rerender(<Conversation ids={['1', '2', '3']} streaming />)
    geo.scrollHeight = 1200
    triggerResize()
    expect(geo.scrollTop).toBe(800)

    // Content shrinking clamps scrollTop down — not a reader moving up.
    geo.scrollHeight = 1100
    geo.scrollTop = 700
    fireEvent.scroll(log)
    expect(jumpButton()).toBeNull()
  })

  it('moves focus to the log when the jump button is activated from the keyboard', () => {
    render(<Conversation ids={['1', '2']} />)
    const log = screen.getByRole('log')
    stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()
    userScrollTo(log, 100)

    const button = jumpButton()!
    button.focus()
    expect(document.activeElement).toBe(button)
    fireEvent.click(button)
    expect(jumpButton()).toBeNull()
    expect(document.activeElement).toBe(log)
  })

  it('fires onReachTop when the history does not overflow, once per first message', () => {
    const onReachTop = vi.fn()
    const { rerender } = render(<Conversation ids={['3']} onReachTop={onReachTop} />)
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 400, clientHeight: 400 })
    triggerResize()
    expect(onReachTop).toHaveBeenCalledTimes(1)

    // A page arrived but still fits: ask again.
    rerender(<Conversation ids={['1', '2', '3']} onReachTop={onReachTop} />)
    triggerResize()
    expect(onReachTop).toHaveBeenCalledTimes(2)

    // Nothing new loaded (same first message): no loop.
    triggerResize()
    triggerResize()
    expect(onReachTop).toHaveBeenCalledTimes(2)

    // Once it overflows, only a scroll into the top zone fires it.
    geo.scrollHeight = 1000
    triggerResize()
    expect(onReachTop).toHaveBeenCalledTimes(2)
  })

  it('cancels the jump when a consumer onClick calls preventDefault', () => {
    render(
      <MessageScroller>
        <MessageScrollerContent>
          <div data-message-id="x">x</div>
        </MessageScrollerContent>
        <MessageScrollerJumpButton onClick={(e) => e.preventDefault()} />
      </MessageScroller>
    )
    const log = screen.getByRole('log')
    const geo = stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()
    userScrollTo(log, 100)
    fireEvent.click(jumpButton()!)
    expect(geo.scrollTop).toBe(100)
    expect(jumpButton()).toBeInTheDocument()
  })

  it('uses a composed MessageScrollerJumpButton (at any depth) instead of the auto-placed one', () => {
    // Wrapped in a component + fragment + div: not a direct child of the root.
    const CustomJump = () => (
      <>
        <div>
          <MessageScrollerJumpButton className="custom-jump">Latest</MessageScrollerJumpButton>
        </div>
      </>
    )
    render(
      <MessageScroller>
        <MessageScrollerContent>
          <div data-message-id="x">x</div>
        </MessageScrollerContent>
        <CustomJump />
      </MessageScroller>
    )
    const log = screen.getByRole('log')
    stubGeometry(log, { scrollHeight: 1000, clientHeight: 400 })
    triggerResize()
    userScrollTo(log, 100)
    const buttons = screen.getAllByRole('button', { name: /jump to latest/i })
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveClass('custom-jump')
    expect(buttons[0]).toHaveTextContent('Latest')
  })
})

describe('Message', () => {
  it('exposes author and grouping on data attributes and renders its parts', () => {
    render(
      <Message from="user" grouped data-message-id="u1">
        <MessageAvatar>AV</MessageAvatar>
        <MessageHeader name="Ada" timestamp="10:42" dateTime="2026-10-10T10:42" />
        <MessageContent>Hello</MessageContent>
        <MessageFooter>
          <button type="button">Copy</button>
        </MessageFooter>
      </Message>
    )
    const row = document.querySelector('[data-slot="message"]')!
    expect(row).toHaveAttribute('data-from', 'user')
    expect(row).toHaveAttribute('data-grouped', 'true')
    expect(screen.getByText('Ada')).toBeInTheDocument()
    expect(screen.getByText('10:42')).toHaveAttribute('datetime', '2026-10-10T10:42')
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })
})

describe('Bubble', () => {
  beforeEach(() => {
    // Content taller than its clamped box.
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

  it('collapses overflowing content and toggles with Show more / Show less', () => {
    render(<Bubble collapsedLines={3}>A very long answer</Bubble>)
    const content = document.querySelector('[data-slot="bubble-content"]') as HTMLElement
    const toggle = screen.getByRole('button', { name: 'Show more' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', content.id)
    expect(content).toHaveAttribute('data-state', 'collapsed')

    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute('aria-expanded', 'true')
    expect(content).toHaveAttribute('data-state', 'expanded')

    fireEvent.click(screen.getByRole('button', { name: 'Show less' }))
    expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument()
  })

  it('renders reactions as toggle buttons when clickable', () => {
    const onReactionClick = vi.fn()
    render(
      <Bubble
        variant="primary"
        reactions={[{ emoji: '🔥', count: 3, label: 'fire', active: true }]}
        onReactionClick={onReactionClick}
      >
        Hi
      </Bubble>
    )
    const chip = screen.getByRole('button', { name: 'fire: 3' })
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(chip)
    expect(onReactionClick).toHaveBeenCalledWith(expect.objectContaining({ emoji: '🔥' }), 0)
  })
})

describe('Attachment', () => {
  it('uses a stretched link without nesting interactive elements', () => {
    const onDownload = vi.fn()
    const onRemove = vi.fn()
    render(
      <Attachment
        name="report.pdf"
        type="application/pdf"
        size={2048}
        href="/files/report.pdf"
        onDownload={onDownload}
        onRemove={onRemove}
      />
    )
    const link = screen.getByRole('link', { name: 'report.pdf' })
    expect(link).toHaveAttribute('href', '/files/report.pdf')
    expect(screen.getByText('2 KB')).toBeInTheDocument()

    const interactives = Array.from(document.querySelectorAll('a, button'))
    for (const outer of interactives) {
      for (const inner of interactives) {
        if (outer !== inner) expect(outer.contains(inner)).toBe(false)
      }
    }

    fireEvent.click(screen.getByRole('button', { name: 'Download report.pdf' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove report.pdf' }))
    expect(onDownload).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('shows a progress bar and no open link while uploading', () => {
    render(<Attachment name="photo.png" src="/photo.png" state="uploading" progress={42} href="/photo.png" />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByRole('progressbar', { name: 'Uploading photo.png' })).toHaveAttribute(
      'aria-valuenow',
      '42'
    )
    expect(screen.getByText('Uploading · 42%')).toBeInTheDocument()
  })
})

describe('Marker', () => {
  it('shimmers the label only while active', () => {
    const { rerender } = render(
      <Marker variant="status" active>
        Searching the web…
      </Marker>
    )
    expect(screen.getByText('Searching the web…')).toHaveClass('bk-shimmer')
    rerender(<Marker variant="status">Searched 4 sites</Marker>)
    expect(screen.getByText('Searched 4 sites')).not.toHaveClass('bk-shimmer')
  })
})

describe('Chat kit a11y', () => {
  it('has no axe violations for a composed conversation', async () => {
    const { container } = render(
      <MessageScroller className="h-96" streaming>
        <MessageScrollerContent>
          <Marker variant="separator">Today</Marker>
          <Message from="user" data-message-id="1">
            <MessageAvatar>
              <span>ME</span>
            </MessageAvatar>
            <MessageHeader name="You" timestamp="10:41" />
            <MessageContent>
              <Bubble variant="primary">
                Find me the <a href="#spec">spec</a>.
              </Bubble>
              <Attachment name="notes.txt" type="text/plain" size={512} href="#notes" onRemove={() => {}} />
            </MessageContent>
          </Message>
          <Marker variant="status" active>
            Searching the web…
          </Marker>
          <Message from="assistant" data-message-id="2">
            <MessageContent>
              <Bubble reactions={[{ emoji: '👍', count: 2, label: 'thumbs up' }]}>Here it is.</Bubble>
            </MessageContent>
            <MessageFooter>
              <button type="button">Copy</button>
            </MessageFooter>
          </Message>
        </MessageScrollerContent>
      </MessageScroller>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
