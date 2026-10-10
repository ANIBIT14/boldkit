import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Copy, Globe, RotateCcw, Send, Sparkles, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MessageScroller,
  MessageScrollerContent,
  type MessageScrollerHandle,
} from '@/components/ui/message-scroller'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  type MessageFrom,
} from '@/components/ui/message'
import { Bubble, type BubbleReaction } from '@/components/ui/bubble'
import { Attachment } from '@/components/ui/attachment'
import { Marker } from '@/components/ui/marker'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/message-scroller.tsx?raw'
import vueSourceCode from '@vue-ui/MessageScroller.vue?raw'

const usageCode = `import { useRef } from 'react'
import {
  MessageScroller,
  MessageScrollerContent,
  type MessageScrollerHandle,
} from '@/components/ui/message-scroller'
import {
  Message, MessageAvatar, MessageHeader, MessageContent, MessageFooter,
} from '@/components/ui/message'
import { Bubble } from '@/components/ui/bubble'
import { Attachment } from '@/components/ui/attachment'
import { Marker } from '@/components/ui/marker'

export function Chat({ messages, streaming, loadEarlier }) {
  const scroller = useRef<MessageScrollerHandle>(null)

  return (
    <MessageScroller
      ref={scroller}
      streaming={streaming}
      onReachTop={loadEarlier}
      className="h-[32rem] border-3 border-foreground"
    >
      <MessageScrollerContent>
        <Marker variant="separator">Today</Marker>
        {messages.map((m, i) => (
          <Message
            key={m.id}
            data-message-id={m.id}
            from={m.from}
            grouped={messages[i - 1]?.from === m.from}
          >
            <MessageAvatar>{/* <Avatar /> */}</MessageAvatar>
            <MessageHeader name={m.author} timestamp={m.time} />
            <MessageContent>
              <Bubble variant={m.from === 'user' ? 'primary' : 'default'}>
                {m.text}
              </Bubble>
              {m.file && <Attachment name={m.file.name} size={m.file.size} href={m.file.url} />}
            </MessageContent>
          </Message>
        ))}
        {streaming && <Marker variant="status" active>Thinking…</Marker>}
      </MessageScrollerContent>
      {/* MessageScrollerJumpButton is auto-placed */}
    </MessageScroller>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import MessageScroller from '@/components/ui/MessageScroller.vue'
import MessageScrollerContent from '@/components/ui/MessageScrollerContent.vue'
import Message from '@/components/ui/Message.vue'
import MessageAvatar from '@/components/ui/MessageAvatar.vue'
import MessageHeader from '@/components/ui/MessageHeader.vue'
import MessageContent from '@/components/ui/MessageContent.vue'
import Bubble from '@/components/ui/Bubble.vue'
import Attachment from '@/components/ui/Attachment.vue'
import Marker from '@/components/ui/Marker.vue'

const props = defineProps<{ messages: ChatMessage[]; streaming: boolean }>()
const emit = defineEmits<{ loadEarlier: [] }>()

// scroller.value?.scrollToBottom() / scrollToMessage(id)
const scroller = ref<InstanceType<typeof MessageScroller>>()
</script>

<template>
  <MessageScroller
    ref="scroller"
    :streaming="streaming"
    class="h-[32rem] border-3 border-foreground"
    @reach-top="emit('loadEarlier')"
  >
    <MessageScrollerContent>
      <Marker variant="separator">Today</Marker>
      <Message
        v-for="(m, i) in messages"
        :key="m.id"
        :data-message-id="m.id"
        :from="m.from"
        :grouped="messages[i - 1]?.from === m.from"
      >
        <MessageAvatar><!-- <Avatar /> --></MessageAvatar>
        <MessageHeader :name="m.author" :timestamp="m.time" />
        <MessageContent>
          <Bubble :variant="m.from === 'user' ? 'primary' : 'default'">{{ m.text }}</Bubble>
          <Attachment v-if="m.file" :name="m.file.name" :size="m.file.size" :href="m.file.url" />
        </MessageContent>
      </Message>
      <Marker v-if="streaming" variant="status" active>Thinking…</Marker>
    </MessageScrollerContent>
  </MessageScroller>
</template>`

// ---------------------------------------------------------------------------
// Streaming demo
// ---------------------------------------------------------------------------

type ChatItem =
  | { kind: 'message'; id: string; from: MessageFrom; text: string; time: string }
  | { kind: 'status'; id: string; label: string; active: boolean }

const AUTHORS: Record<MessageFrom, { name: string; initials: string }> = {
  user: { name: 'You', initials: 'ME' },
  assistant: { name: 'BoldBot', initials: 'BK' },
  system: { name: 'System', initials: '' },
}

const REPLY =
  'Neubrutalism is honest UI. Thick 3px borders say where every surface ends, hard offset shadows replace soft blur, and color is flat and loud instead of gradient-polite. Corners stay sharp, labels go bold and uppercase, and hover states physically press the element into its shadow. The result reads instantly — nothing hides behind translucency.'

let seq = 0
const nextId = () => `msg-${++seq}`
const clock = (offsetMin = 0) => {
  const d = new Date(Date.now() + offsetMin * 60_000)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const INITIAL: ChatItem[] = [
  { kind: 'message', id: 'seed-1', from: 'user', text: 'Hey! Can you help me style a dashboard?', time: clock(-6) },
  { kind: 'message', id: 'seed-2', from: 'assistant', text: 'Absolutely. What vibe are you going for?', time: clock(-5) },
  { kind: 'message', id: 'seed-3', from: 'user', text: 'Loud. Blocky. Unapologetic.', time: clock(-4) },
  { kind: 'message', id: 'seed-4', from: 'user', text: 'Think gig poster, not bank app.', time: clock(-4) },
]

const OLDER_TEXT = [
  'Morning — picking up from yesterday.',
  'We left off at the color tokens.',
  'Right, primary was the hot pink.',
  'And the shadows were 4px hard offsets.',
  'Yes. No blur anywhere.',
  'Perfect, let’s keep going today.',
]

const INCOMING_TEXT = [
  'Also: try a 3px border on every card.',
  'And make the primary button pink.',
  'Shadows should be pure black in light mode.',
]

function StreamingChatDemo() {
  const scrollerRef = useRef<MessageScrollerHandle>(null)
  const [items, setItems] = useState<ChatItem[]>(INITIAL)
  const [olderLeft, setOlderLeft] = useState(OLDER_TEXT.length)
  const [loadingEarlier, setLoadingEarlier] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const timers = useRef<number[]>([])

  useEffect(() => {
    const list = timers.current
    return () => list.forEach((id) => window.clearInterval(id))
  }, [])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const loadEarlier = () => {
    if (loadingEarlier || olderLeft === 0) return
    setLoadingEarlier(true)
    later(700, () => {
      const take = Math.min(3, olderLeft)
      const chunk = OLDER_TEXT.slice(olderLeft - take, olderLeft).map<ChatItem>((text, i) => ({
        kind: 'message',
        id: nextId(),
        from: (olderLeft - take + i) % 2 === 0 ? 'user' : 'assistant',
        text,
        time: clock(-90 + i),
      }))
      setItems((prev) => [...chunk, ...prev])
      setOlderLeft(olderLeft - take)
      setLoadingEarlier(false)
    })
  }

  const send = (event?: FormEvent) => {
    event?.preventDefault()
    if (streaming) return
    const text = draft.trim() || 'Explain neubrutalism in one paragraph.'
    const statusId = nextId()
    const replyId = nextId()
    setDraft('')
    setStreaming(true)
    setItems((prev) => [
      ...prev,
      { kind: 'message', id: nextId(), from: 'user', text, time: clock() },
      { kind: 'status', id: statusId, label: 'Searching the web…', active: true },
    ])
    scrollerRef.current?.scrollToBottom()

    later(1400, () => {
      setItems((prev) => [
        ...prev.map((item) =>
          item.id === statusId ? { ...item, label: 'Searched 4 sources', active: false } : item
        ),
        { kind: 'message', id: replyId, from: 'assistant', text: '', time: clock() },
      ])
      setStreamingId(replyId)
      const tokens = REPLY.split(/(\s+)/)
      let index = 0
      const interval = window.setInterval(() => {
        const chunk = tokens.slice(index, index + 2).join('')
        index += 2
        setItems((prev) =>
          prev.map((item) =>
            item.id === replyId && item.kind === 'message' ? { ...item, text: item.text + chunk } : item
          )
        )
        if (index >= tokens.length) {
          window.clearInterval(interval)
          setStreaming(false)
          setStreamingId(null)
        }
      }, 50)
      timers.current.push(interval)
    })
  }

  const simulateIncoming = () => {
    INCOMING_TEXT.forEach((text, i) =>
      later(500 * (i + 1), () =>
        setItems((prev) => [
          ...prev,
          { kind: 'message', id: nextId(), from: 'assistant', text, time: clock() },
        ])
      )
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={simulateIncoming}>
          <UserPlus className="h-4 w-4" /> Simulate 3 incoming
        </Button>
        <Button size="sm" variant="outline" onClick={() => scrollerRef.current?.scrollToMessage('seed-1', { block: 'center' })}>
          Scroll to first
        </Button>
      </div>
      <div className="flex h-[28rem] flex-col border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
        <MessageScroller
          ref={scrollerRef}
          streaming={streaming}
          onReachTop={loadEarlier}
          className="flex-1"
        >
          <MessageScrollerContent>
            {/* Fixed-height top row: swapping its content never shifts the log. */}
            <div className="flex h-8 items-center justify-center">
              {loadingEarlier ? (
                <Marker variant="status" active className="justify-center">
                  Loading earlier messages…
                </Marker>
              ) : olderLeft > 0 ? (
                <Button size="sm" variant="ghost" className="h-8" onClick={loadEarlier}>
                  Load earlier
                </Button>
              ) : (
                <Marker>Start of conversation</Marker>
              )}
            </div>
            <Marker variant="separator">Today</Marker>
            {items.map((item, i) => {
              if (item.kind === 'status') {
                return (
                  <Marker
                    key={item.id}
                    variant="status"
                    active={item.active}
                    icon={<Globe />}
                  >
                    {item.label}
                  </Marker>
                )
              }
              const prev = items[i - 1]
              const grouped = prev?.kind === 'message' && prev.from === item.from
              const author = AUTHORS[item.from]
              const isStreaming = item.id === streamingId
              return (
                <Message key={item.id} data-message-id={item.id} from={item.from} grouped={grouped}>
                  <MessageAvatar>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback
                        className={item.from === 'assistant' ? 'bg-accent text-accent-foreground text-xs' : 'text-xs'}
                      >
                        {author.initials}
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageHeader name={author.name} timestamp={item.time} />
                  <MessageContent>
                    <Bubble variant={item.from === 'user' ? 'primary' : 'default'}>
                      {item.text}
                      {isStreaming && (
                        <span
                          aria-hidden="true"
                          className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-current motion-safe:animate-pulse"
                        />
                      )}
                    </Bubble>
                  </MessageContent>
                  {item.from === 'assistant' && !grouped && !isStreaming && item.text.length > 60 && (
                    <MessageFooter>
                      <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="Copy message">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="Retry">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </MessageFooter>
                  )}
                </Message>
              )
            })}
          </MessageScrollerContent>
        </MessageScroller>
        <form onSubmit={send} className="flex gap-2 border-t-3 border-foreground p-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask BoldBot anything…"
            aria-label="Message"
            disabled={streaming}
          />
          <Button type="submit" size="icon" aria-label="Send" disabled={streaming}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Send a message to watch the reply stream in. Scroll up mid-stream to detach — the jump
        button appears and counts new messages. Scroll to the top to load earlier history without
        losing your place.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Attachments demo
// ---------------------------------------------------------------------------

const PREVIEW_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#FFD23F"/><rect x="40" y="40" width="180" height="140" fill="#FF6B9D" stroke="#111" stroke-width="8"/><circle cx="290" cy="190" r="70" fill="#3BCEAC" stroke="#111" stroke-width="8"/><rect x="120" y="200" width="120" height="60" fill="#111"/></svg>'
)}`

function AttachmentsDemo() {
  const [progress, setProgress] = useState(12)
  useEffect(() => {
    const id = window.setInterval(() => setProgress((p) => (p >= 100 ? 8 : p + 4)), 250)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex flex-wrap items-start gap-6">
      <Attachment
        name="poster-draft.svg"
        type="image/svg+xml"
        size={48_213}
        src={PREVIEW_SRC}
        alt="Poster draft: pink square, teal circle and black bar on yellow"
        href="#attachments"
        onDownload={() => {}}
      />
      <div className="flex w-72 max-w-full flex-col gap-4">
        <Attachment
          name="brand-guidelines.pdf"
          type="application/pdf"
          size={2_457_600}
          href="#attachments"
          onDownload={() => {}}
          onRemove={() => {}}
        />
        <Attachment
          name="tokens.json"
          type="application/json"
          size={8_192}
          state="uploading"
          progress={progress}
          onRemove={() => {}}
        />
        <Attachment
          name="hero-video.mp4"
          type="video/mp4"
          state="error"
          error="File exceeds 25 MB"
          onRemove={() => {}}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Bubbles demo
// ---------------------------------------------------------------------------

function BubblesDemo() {
  const [reactions, setReactions] = useState<BubbleReaction[]>([
    { emoji: '🔥', count: 4, label: 'fire', active: true },
    { emoji: '👍', count: 2, label: 'thumbs up' },
  ])
  const toggle = (_r: BubbleReaction, index: number) =>
    setReactions((list) =>
      list.map((r, i) =>
        i === index ? { ...r, active: !r.active, count: r.count + (r.active ? -1 : 1) } : r
      )
    )

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <Bubble align="start">Default</Bubble>
        <Bubble align="start" variant="primary">Primary</Bubble>
        <Bubble align="start" variant="muted">Muted</Bubble>
        <Bubble variant="outline">Outline</Bubble>
        <Bubble align="end" variant="primary">End-aligned shadow</Bubble>
      </div>
      <Bubble align="start" reactions={reactions} onReactionClick={toggle}>
        Shipped the new pricing page — see the <a href="#bubbles">preview link</a> and the{' '}
        <code>--shadow-color</code> token change.
      </Bubble>
      <Bubble align="start" variant="muted" collapsedLines={3}>
        <p>
          Long answers collapse after a set number of lines. This one is clamped to three lines with
          CSS line-clamp, and the toggle only appears when the content actually overflows — short
          messages never get a pointless “Show more”.
        </p>
        <p>
          Expanded, the full text is restored and the toggle flips to “Show less” with
          aria-expanded kept in sync, so screen reader users know what the button does.
        </p>
      </Bubble>
    </div>
  )
}

export function ChatDoc() {
  return (
    <>
      <ComponentDoc
        name="Chat"
        registryName="chat"
        description="Brutalist building blocks for chat and AI-assistant interfaces. MessageScroller owns scrolling — auto-follow while at the bottom (ResizeObserver, so streamed tokens stay pinned), a jump-to-latest button with an unread count, and anchored history prepends. Message, Bubble, Attachment and Marker render the conversation: aligned rows with grouping, hard-edged bubbles with reactions and collapsible text, file cards with upload progress, and shimmering live-status markers."
        dependencies={['lucide-react', 'radix-ui']}
        vueDependencies={['@lucide/vue', 'reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <StreamingChatDemo />
      </ComponentDoc>

      <ExampleSection
        title="Attachments"
        description="Image previews, file cards, and upload states. The file name is a stretched link covering the card; download and remove stay separately clickable above it."
        code={`<Attachment name="poster.png" src={url} alt="Poster draft" href={url} onDownload={download} />
<Attachment name="brand.pdf" type="application/pdf" size={2457600} href={url} onDownload={download} onRemove={remove} />
<Attachment name="tokens.json" type="application/json" state="uploading" progress={64} onRemove={cancel} />
<Attachment name="hero.mp4" type="video/mp4" state="error" error="File exceeds 25 MB" onRemove={remove} />`}
        vueCode={`<template>
  <Attachment name="poster.png" :src="url" alt="Poster draft" :href="url" @download="download" />
  <Attachment name="brand.pdf" type="application/pdf" :size="2457600" :href="url" @download="download" @remove="remove" />
  <Attachment name="tokens.json" type="application/json" state="uploading" :progress="64" @remove="cancel" />
  <Attachment name="hero.mp4" type="video/mp4" state="error" error="File exceeds 25 MB" @remove="remove" />
</template>`}
      >
        <AttachmentsDemo />
      </ExampleSection>

      <ExampleSection
        title="Bubbles"
        description="Four variants, alignment-aware shadows, reactions (toggle buttons when onReactionClick is set), styled links and code, and collapsible long content."
        code={`<Bubble>Default</Bubble>
<Bubble variant="primary">Primary</Bubble>
<Bubble variant="muted">Muted</Bubble>
<Bubble variant="outline">Outline</Bubble>

<Bubble reactions={[{ emoji: '🔥', count: 4, label: 'fire', active: true }]} onReactionClick={toggle}>
  Shipped — see the <a href="/preview">preview</a>.
</Bubble>

<Bubble variant="muted" collapsedLines={3}>{longAnswer}</Bubble>`}
        vueCode={`<template>
  <Bubble>Default</Bubble>
  <Bubble variant="primary">Primary</Bubble>
  <Bubble variant="muted">Muted</Bubble>
  <Bubble variant="outline">Outline</Bubble>

  <Bubble :reactions="[{ emoji: '🔥', count: 4, label: 'fire', active: true }]" @reaction-click="toggle">
    Shipped — see the <a href="/preview">preview</a>.
  </Bubble>

  <Bubble variant="muted" :collapsed-lines="3">{{ longAnswer }}</Bubble>
</template>`}
      >
        <BubblesDemo />
      </ExampleSection>

      <ExampleSection
        title="Markers"
        description="System notes, labeled separators, and live status rows. Active status labels get the .bk-shimmer text effect (static under prefers-reduced-motion)."
        code={`<Marker variant="separator">Today</Marker>
<Marker>Ada joined the chat</Marker>
<Marker variant="status" active icon={<Globe />}>Searching the web…</Marker>
<Marker variant="status" icon={<Sparkles />}>Generated 3 drafts</Marker>`}
        vueCode={`<template>
  <Marker variant="separator">Today</Marker>
  <Marker>Ada joined the chat</Marker>
  <Marker variant="status" active>
    <template #icon><Globe /></template>
    Searching the web…
  </Marker>
  <Marker variant="status">
    <template #icon><Sparkles /></template>
    Generated 3 drafts
  </Marker>
</template>`}
      >
        <div className="flex w-full max-w-xl flex-col gap-5">
          <Marker variant="separator">Today</Marker>
          <Marker>Ada joined the chat</Marker>
          <Marker variant="status" active icon={<Globe />}>
            Searching the web…
          </Marker>
          <Marker variant="status" icon={<Sparkles />}>
            Generated 3 drafts
          </Marker>
        </div>
      </ExampleSection>
    </>
  )
}
