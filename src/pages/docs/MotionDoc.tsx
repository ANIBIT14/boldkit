import * as React from 'react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Reveal, Stagger, useShake } from '@/components/ui/motion'
import { Button } from '@/components/ui/button'
import sourceCode from '@/components/ui/motion.tsx?raw'
import coreCode from '@/lib/motion-core.ts?raw'

const reactInstall = `npx shadcn@latest add "https://boldkit.dev/r/motion-react.json"`
// Vue install command is auto-derived from name="Motion" → /r/vue/motion.json,
// which matches our Vue registry entry exactly. No override needed.

const usageCode = `import { Reveal, Motion, Stagger, useShake } from '@/components/ui/motion'

export default function Example() {
  return (
    <Reveal direction="up">
      <Motion as="button" press className="px-4 py-2 border-3 border-foreground bg-primary">
        Press me
      </Motion>
    </Reveal>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { Reveal, Motion } from '@/components/ui'
</script>

<template>
  <Reveal direction="up">
    <Motion as="button" :press="true"
            class="px-4 py-2 border-3 border-foreground bg-primary">
      Press me
    </Motion>
  </Reveal>
</template>`

// ──────────────────────────────────────────────────────────────────
// Demo helpers
// ──────────────────────────────────────────────────────────────────

function PressDemo() {
  return (
    <button className="bk-press px-6 py-3 border-3 border-foreground bg-primary text-primary-foreground font-bold uppercase tracking-wide">
      Press me
    </button>
  )
}

function StampInDemo() {
  // key remounts on click so the entrance plays repeatedly
  const [key, setKey] = React.useState(0)
  return (
    <div className="flex items-center gap-4">
      <div
        key={key}
        className="bk-stamp-in px-6 py-3 border-3 border-foreground bg-accent text-accent-foreground font-bold uppercase tracking-wide"
      >
        Stamped In
      </div>
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
    </div>
  )
}

function ShakeDemo() {
  const shake = useShake()
  const ref = React.useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center gap-3">
      <input
        ref={ref}
        type="text"
        placeholder="Type then click shake"
        className="px-3 py-2 border-3 border-foreground bg-background font-medium"
      />
      <Button size="sm" onClick={() => shake(ref.current)}>
        Shake on error
      </Button>
    </div>
  )
}

function PulseShadowDemo() {
  return (
    <div className="bk-pulse-shadow inline-flex px-6 py-3 border-3 border-foreground bg-secondary text-secondary-foreground font-bold uppercase tracking-wide">
      Pending…
    </div>
  )
}

function StaggerDemo() {
  const [key, setKey] = React.useState(0)
  return (
    <div className="space-y-3">
      <Stagger key={key} delay={80} className="flex flex-wrap gap-3">
        {['Tokens', 'Recipes', 'Adapters', 'Components'].map((label) => (
          <div
            key={label}
            className="bk-stamp-in px-4 py-2 border-3 border-foreground bg-background font-bold uppercase tracking-wide"
          >
            {label}
          </div>
        ))}
      </Stagger>
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
    </div>
  )
}

function RevealDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Scroll the area below — each tile reveals as it enters the viewport.
      </p>
      <div className="h-72 overflow-y-auto border-3 border-foreground bg-muted/30 p-4 space-y-4">
        <div className="h-32" />
        <Reveal direction="up">
          <div className="px-4 py-3 border-3 border-foreground bg-primary text-primary-foreground font-bold uppercase">
            Reveal up
          </div>
        </Reveal>
        <div className="h-16" />
        <Reveal direction="left">
          <div className="px-4 py-3 border-3 border-foreground bg-secondary text-secondary-foreground font-bold uppercase">
            Reveal left
          </div>
        </Reveal>
        <div className="h-16" />
        <Reveal direction="right">
          <div className="px-4 py-3 border-3 border-foreground bg-accent text-accent-foreground font-bold uppercase">
            Reveal right
          </div>
        </Reveal>
        <div className="h-16" />
        <Reveal direction="down">
          <div className="px-4 py-3 border-3 border-foreground bg-background font-bold uppercase">
            Reveal down
          </div>
        </Reveal>
        <div className="h-32" />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────

export function MotionDoc() {
  return (
    <>
      <ComponentDoc
        name="Motion"
        description="Framework-agnostic motion system for BoldKit. Six signature CSS recipes plus React and Vue adapters share one vanilla core, so the same animation language works in any framework — including Svelte, Solid, or plain HTML."
        dependencies={[]}
        vueDependencies={['reka-ui']}
        installCommand={reactInstall}
        sourceCode={sourceCode}
        vueSourceCode={sourceCode /* core file is shared; show same source */}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <PressDemo />
      </ComponentDoc>

      <ExampleSection
        title="Press — interactive shadow"
        description="The .bk-press recipe choreographs transform + a hard offset shadow on the snap curve. Hover lifts and grows the shadow; active presses into the page and collapses it; @media (hover:none) shortens duration so taps don't feel mushy."
        code={`<button className="bk-press px-6 py-3 border-3 border-foreground bg-primary">
  Press me
</button>`}
        vueCode={`<button class="bk-press px-6 py-3 border-3 border-foreground bg-primary">
  Press me
</button>`}
      >
        <PressDemo />
      </ExampleSection>

      <ExampleSection
        title="Stamp-in — hard entrance"
        description="An entrance with brutalist 'snap' easing. Scales and rotates slightly from zero, lands with a one-time overshoot. Use on mount for headlines, callouts, or post-action confirmations."
        code={`<div className="bk-stamp-in px-6 py-3 border-3 border-foreground bg-accent">
  Stamped In
</div>`}
        vueCode={`<div class="bk-stamp-in px-6 py-3 border-3 border-foreground bg-accent">
  Stamped In
</div>`}
      >
        <StampInDemo />
      </ExampleSection>

      <ExampleSection
        title="Shake — imperative error feedback"
        description="useShake() returns a function that shakes a given element. Stepped easing for a hard back-and-forth instead of a smooth wobble. Pair with form validation for instant feedback."
        code={`const shake = useShake()
const ref = React.useRef(null)

<input ref={ref} ... />
<Button onClick={() => shake(ref.current)}>Submit</Button>`}
        vueCode={`<script setup lang="ts">
import { useShake } from '@/composables'
const shake = useShake()
const el = ref<HTMLInputElement | null>(null)
</script>
<template>
  <input ref="el" />
  <Button @click="shake(el)">Submit</Button>
</template>`}
      >
        <ShakeDemo />
      </ExampleSection>

      <ExampleSection
        title="Pulse shadow — attention / loading"
        description="Pulses the pseudo-element shadow on an infinite loop. Never animates box-shadow — composited, mobile-safe. Use for pending states, attention prompts, or 'tap me' hints."
        code={`<div className="bk-pulse-shadow inline-flex px-6 py-3 border-3 border-foreground bg-secondary">
  Pending…
</div>`}
        vueCode={`<div class="bk-pulse-shadow inline-flex px-6 py-3 border-3 border-foreground bg-secondary">
  Pending…
</div>`}
      >
        <PulseShadowDemo />
      </ExampleSection>

      <ExampleSection
        title="Stagger — sequenced entrance"
        description="<Stagger> assigns incrementing animation-delay to its direct children so they animate in sequence. Pairs with any bk-* entrance (stamp-in here). Tune delay and initialDelay to taste."
        code={`<Stagger delay={80}>
  {items.map(label => (
    <div key={label} className="bk-stamp-in ...">{label}</div>
  ))}
</Stagger>`}
        vueCode={`<Stagger :delay="80">
  <div v-for="label in items" :key="label" class="bk-stamp-in ...">
    {{ label }}
  </div>
</Stagger>`}
      >
        <StaggerDemo />
      </ExampleSection>

      <ExampleSection
        title="Reveal — scroll-triggered"
        description="<Reveal> wraps any element. An IntersectionObserver fires reveal just before the element enters the viewport (rootMargin defaults to '0px 0px -10% 0px' — tuned for slow scroll on mobile). Direction selects which side it slides in from."
        code={`<Reveal direction="up">
  <div className="...">Reveal up</div>
</Reveal>`}
        vueCode={`<Reveal direction="up">
  <div class="...">Reveal up</div>
</Reveal>`}
      >
        <RevealDemo />
      </ExampleSection>

      <ExampleSection
        title="Architecture"
        description="Three layers, strictly ordered. L1 tokens and L2 recipes are pure CSS — every framework consumes them identically. L3 is a tiny adapter wrapping the shared motion-core. Adding Svelte/Solid/Qwik = ~150 LOC of wrapper code; the lower layers don't change."
        code={`// L1 tokens (any framework, via plain CSS vars)
--bk-ease-snap:  cubic-bezier(0.2, 0.9, 0.1, 1.2);
--bk-ease-stamp: cubic-bezier(0.7, 0, 0.84, 0);
--bk-dur-snap:   150ms;

// L2 recipe (any framework, via class name)
.bk-press { /* GPU-composited shadow choreography */ }

// L3 adapter (React shown; Vue mirrors the surface)
<Motion press as="button">Click</Motion>`}
        vueCode={`<!-- Same L1 + L2 — only L3 differs -->
<Motion as="button" :press="true">Click</Motion>`}
      >
        <div className="text-xs text-muted-foreground">
          motion-core: {coreCode.split('\n').length} lines of vanilla TS ·
          shared by every adapter.
        </div>
      </ExampleSection>

      <ExampleSection
        title="Accessibility — reduced motion"
        description="The L1 CSS guard disables all bk-* animations when prefers-reduced-motion is set. motion-core also gates observeReveal, staggerChildren, and triggerAnimation so JS-driven motion respects the preference. Marquees slow rather than stop, so single-row content remains visible."
        code={`@media (prefers-reduced-motion: reduce) {
  [class*="bk-press"],
  [class*="bk-stamp-in"],
  [class*="bk-reveal"] {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}`}
      >
        <div className="text-xs text-muted-foreground">
          Toggle "Reduce motion" in your OS settings and reload — every motion
          recipe on this page becomes instant.
        </div>
      </ExampleSection>

      <ExampleSection
        title="Mobile performance"
        description="Animates only transform and opacity (no box-shadow / width / height). Shadow motion via pseudo-element translate stays GPU-composited. :active fires kernel-level so taps have zero JS latency. @media (hover: none) tightens active duration so taps don't feel mushy. IntersectionObserver rootMargin fires reveals slightly early on slow scroll."
        code={`/* Mobile-tuned hover/active branch */
@media (hover: none) {
  .bk-press,
  .bk-press::after {
    transition-duration: var(--bk-dur-instant); /* 80ms */
  }
}`}
      >
        <div className="text-xs text-muted-foreground">
          Bundle budget: motion.css ≤ 4 KB gz, motion-core ≤ 1 KB gz,
          per-framework adapter ≤ 2 KB gz.
        </div>
      </ExampleSection>
    </>
  )
}
