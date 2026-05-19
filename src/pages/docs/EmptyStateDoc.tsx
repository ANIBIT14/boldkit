import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  EmptyStatePreset,
} from '@/components/ui/empty-state'
import { CodeBlock } from '@/components/docs/ComponentDoc'
import { SEO, getComponentSEO } from '@/components/SEO'
import { useFramework, ReactIcon, SvelteIcon, VueIcon, frameworkBadgeClasses, frameworkBadgeVariants } from '@/hooks/use-framework'
import { Plus, Upload, Search, Inbox, Star, RotateCcw } from 'lucide-react'
import { useState } from 'react'

// ─── Install ───────────────────────────────────────────────────────────────
const reactInstallCode = `npx shadcn@latest add "https://boldkit.dev/r/empty-state.json"`
const vueInstallCode   = `npx shadcn-vue@latest add "https://boldkit.dev/r/vue/empty-state.json"`
const svelteInstallCode = `npx shadcn-svelte@latest add "https://boldkit.dev/r/svelte/empty-state.json"`

// ─── Basic Usage ───────────────────────────────────────────────────────────
const reactUsageCode = `import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from '@/components/ui/empty-state'
import { Inbox, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MyEmptyState() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Inbox className="h-10 w-10" />
      </EmptyStateIcon>
      <EmptyStateTitle>No messages yet</EmptyStateTitle>
      <EmptyStateDescription>
        Your inbox is empty. Send a message to get started.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </EmptyStateActions>
    </EmptyState>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from '@/components/ui/empty-state'
import { Inbox, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <EmptyState>
    <EmptyStateIcon>
      <Inbox class="h-10 w-10" />
    </EmptyStateIcon>
    <EmptyStateTitle>No messages yet</EmptyStateTitle>
    <EmptyStateDescription>
      Your inbox is empty. Send a message to get started.
    </EmptyStateDescription>
    <EmptyStateActions>
      <Button>
        <Plus class="mr-2 h-4 w-4" />
        Compose
      </Button>
    </EmptyStateActions>
  </EmptyState>
</template>`

const svelteUsageCode = `<script lang="ts">
  import {
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateDescription,
    EmptyStateActions,
  } from '$lib/components/ui/empty-state'
  import { Inbox, Plus } from 'lucide-svelte'
  import Button from '$lib/components/ui/button/button.svelte'
</script>

<EmptyState>
  <EmptyStateIcon>
    <Inbox class="h-10 w-10" />
  </EmptyStateIcon>
  <EmptyStateTitle>No messages yet</EmptyStateTitle>
  <EmptyStateDescription>
    Your inbox is empty. Send a message to get started.
  </EmptyStateDescription>
  <EmptyStateActions>
    <Button>
      <Plus class="mr-2 h-4 w-4" />
      Compose
    </Button>
  </EmptyStateActions>
</EmptyState>`

// ─── Presets ───────────────────────────────────────────────────────────────
const reactPresetCode = `import { EmptyStatePreset } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'

// Available presets:
// 'no-results' | 'no-data' | 'empty-inbox' | 'empty-folder' |
// 'no-users'   | 'empty-cart' | 'no-notifications' | 'no-images' |
// 'error'      | 'offline' | 'permission-denied' | 'coming-soon' |
// 'maintenance'| 'upload'

export function SearchResults() {
  return (
    <EmptyStatePreset
      preset="no-results"
      action={
        <Button variant="outline" onClick={() => clearSearch()}>
          Clear search
        </Button>
      }
    />
  )
}`

const vuePresetCode = `<script setup lang="ts">
import { EmptyStatePreset } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
</script>

<template>
  <!-- Available presets:
    'no-results' | 'no-data' | 'empty-inbox' | 'empty-folder' |
    'no-users'   | 'empty-cart' | 'no-notifications' | 'no-images' |
    'error'      | 'offline' | 'permission-denied' | 'coming-soon' |
    'maintenance'| 'upload' -->
  <EmptyStatePreset preset="no-results">
    <template #action>
      <Button variant="outline" @click="clearSearch">
        Clear search
      </Button>
    </template>
  </EmptyStatePreset>
</template>`

const sveltePresetCode = `<script lang="ts">
  import { EmptyStatePreset } from '$lib/components/ui/empty-state'
  import Button from '$lib/components/ui/button/button.svelte'
</script>

<!-- Available presets:
  'no-results' | 'no-data' | 'empty-inbox' | 'empty-folder' |
  'no-users'   | 'empty-cart' | 'no-notifications' | 'no-images' |
  'error'      | 'offline' | 'permission-denied' | 'coming-soon' |
  'maintenance'| 'upload' -->
<EmptyStatePreset preset="no-results">
  {#snippet action()}
    <Button variant="outline" onclick={() => clearSearch()}>
      Clear search
    </Button>
  {/snippet}
</EmptyStatePreset>`

// ─── Animations ────────────────────────────────────────────────────────────
const reactAnimationCode = `// Fade in on mount
<EmptyState animation="fadeIn">...</EmptyState>

// Bounce in on mount
<EmptyState animation="bounce">...</EmptyState>

// Scale in on mount
<EmptyState animation="scale">...</EmptyState>

// No animation (default)
<EmptyState animation="none">...</EmptyState>

// Works with presets too
<EmptyStatePreset preset="no-results" animation="fadeIn" />`

const vueAnimationCode = `<!-- Fade in on mount -->
<EmptyState animation="fadeIn">...</EmptyState>

<!-- Bounce in on mount -->
<EmptyState animation="bounce">...</EmptyState>

<!-- Scale in on mount -->
<EmptyState animation="scale">...</EmptyState>

<!-- No animation (default) -->
<EmptyState animation="none">...</EmptyState>

<!-- Works with presets too -->
<EmptyStatePreset preset="no-results" animation="fadeIn" />`

// ─── Layout ────────────────────────────────────────────────────────────────
const reactLayoutCode = `// Vertical layout (default) — centered, stacked
<EmptyState layout="vertical">
  <EmptyStateIcon><Inbox className="h-10 w-10" /></EmptyStateIcon>
  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
</EmptyState>

// Horizontal layout — icon left, content right
<EmptyState layout="horizontal">
  <EmptyStateIcon><Inbox className="h-10 w-10" /></EmptyStateIcon>
  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
</EmptyState>`

const vueLayoutCode = `<!-- Vertical layout (default) — centered, stacked -->
<EmptyState layout="vertical">
  <EmptyStateIcon><Inbox class="h-10 w-10" /></EmptyStateIcon>
  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
</EmptyState>

<!-- Horizontal layout — icon left, content right -->
<EmptyState layout="horizontal">
  <EmptyStateIcon><Inbox class="h-10 w-10" /></EmptyStateIcon>
  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
</EmptyState>`

// ─── Variants ──────────────────────────────────────────────────────────────
const variantsCode = {
  react: `// Default variant
<EmptyState variant="default">...</EmptyState>

// Filled variant (dashed border + muted background)
<EmptyState variant="filled">...</EmptyState>

// Card variant (solid border + shadow)
<EmptyState variant="card">...</EmptyState>`,
  vue: `<!-- Default variant -->
<EmptyState variant="default">...</EmptyState>

<!-- Filled variant (dashed border + muted background) -->
<EmptyState variant="filled">...</EmptyState>

<!-- Card variant (solid border + shadow) -->
<EmptyState variant="card">...</EmptyState>`
}

// ─── Sizes ─────────────────────────────────────────────────────────────────
const sizesCode = {
  react: `// Compact
<EmptyState size="compact">...</EmptyState>

// Small
<EmptyState size="sm">...</EmptyState>

// Medium (default)
<EmptyState size="md">...</EmptyState>

// Large
<EmptyState size="lg">...</EmptyState>`,
  vue: `<!-- Compact -->
<EmptyState size="compact">...</EmptyState>

<!-- Small -->
<EmptyState size="sm">...</EmptyState>

<!-- Medium (default) -->
<EmptyState size="md">...</EmptyState>

<!-- Large -->
<EmptyState size="lg">...</EmptyState>`
}

// ─── Icon Colors ───────────────────────────────────────────────────────────
const iconColorsCode = {
  react: `<EmptyStateIcon iconColor="default">...</EmptyStateIcon>
<EmptyStateIcon iconColor="primary">...</EmptyStateIcon>
<EmptyStateIcon iconColor="secondary">...</EmptyStateIcon>
<EmptyStateIcon iconColor="accent">...</EmptyStateIcon>
<EmptyStateIcon iconColor="muted">...</EmptyStateIcon>
<EmptyStateIcon iconColor="success">...</EmptyStateIcon>
<EmptyStateIcon iconColor="warning">...</EmptyStateIcon>
<EmptyStateIcon iconColor="destructive">...</EmptyStateIcon>`,
  vue: `<EmptyStateIcon iconColor="default">...</EmptyStateIcon>
<EmptyStateIcon iconColor="primary">...</EmptyStateIcon>
<EmptyStateIcon iconColor="secondary">...</EmptyStateIcon>
<EmptyStateIcon iconColor="accent">...</EmptyStateIcon>
<EmptyStateIcon iconColor="muted">...</EmptyStateIcon>
<EmptyStateIcon iconColor="success">...</EmptyStateIcon>
<EmptyStateIcon iconColor="warning">...</EmptyStateIcon>
<EmptyStateIcon iconColor="destructive">...</EmptyStateIcon>`
}

// ─── With Actions ──────────────────────────────────────────────────────────
const reactActionsCode = `<EmptyStatePreset
  preset="no-data"
  action={
    <div className="flex gap-2">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add item
      </Button>
      <Button variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Import
      </Button>
    </div>
  }
/>`

const vueActionsCode = `<EmptyStatePreset preset="no-data">
  <template #action>
    <div class="flex gap-2">
      <Button>
        <Plus class="mr-2 h-4 w-4" />
        Add item
      </Button>
      <Button variant="outline">
        <Upload class="mr-2 h-4 w-4" />
        Import
      </Button>
    </div>
  </template>
</EmptyStatePreset>`

// ─── Component ─────────────────────────────────────────────────────────────
export function EmptyStateDoc() {
  const { framework } = useFramework()
  const [animKey, setAnimKey] = useState(0)
  const isSvelte = framework === 'svelte'
  const codeLanguage = framework === 'react' ? 'tsx' : isSvelte ? 'svelte' : 'vue'
  const svelteExamplePending = '<!-- Svelte example coming soon. -->'
  const getFrameworkCode = (code: Partial<Record<typeof framework, string>>) => code[framework] || svelteExamplePending
  const frameworkIcon = framework === 'react'
    ? <ReactIcon className="h-3.5 w-3.5" />
    : isSvelte
      ? <SvelteIcon className="h-3.5 w-3.5" />
      : <VueIcon className="h-3.5 w-3.5" />
  const frameworkLabel = framework === 'react' ? 'React' : isSvelte ? 'Svelte' : 'Vue 3'
  const installCode = framework === 'react' ? reactInstallCode : isSvelte ? svelteInstallCode : vueInstallCode

  return (
    <>
      <SEO {...getComponentSEO('empty-state', 'Empty State')} />
      <div className="space-y-8 md:space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Empty State</h1>
            <Badge variant="secondary">UI Component</Badge>
            <Badge variant={frameworkBadgeVariants[framework]} className={`gap-1.5 ${frameworkBadgeClasses[framework]}`}>
              {frameworkIcon}
              {frameworkLabel}
            </Badge>
            <Badge variant="info">New</Badge>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            A flexible empty state component with 14 presets, 3 animation variants, horizontal layout,
            and full icon customization for displaying placeholder content when there's no data to show.
          </p>
        </div>

        {/* Installation */}
        <section id="installation" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Installation</h2>
          <CodeBlock
            code={installCode}
            language="bash"
          />
        </section>

        {/* Basic Usage */}
        <section id="usage" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Usage</h2>
          <Card className="p-6">
            <EmptyState>
              <EmptyStateIcon>
                <Inbox className="h-10 w-10" />
              </EmptyStateIcon>
              <EmptyStateTitle>No messages yet</EmptyStateTitle>
              <EmptyStateDescription>
                Your inbox is empty. Send a message to get started.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Compose
                </Button>
              </EmptyStateActions>
            </EmptyState>
          </Card>
          <CodeBlock
            code={framework === 'react' ? reactUsageCode : isSvelte ? svelteUsageCode : vueUsageCode}
            language={codeLanguage}
          />
        </section>

        {/* Presets */}
        <section id="presets" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Presets</h2>
          <p className="text-muted-foreground">
            14 built-in presets for common empty state scenarios. Pass a <code className="text-xs bg-muted px-1 py-0.5 border border-foreground font-mono">preset</code> prop and optionally add an action.
          </p>

          <h3 className="font-bold uppercase text-sm tracking-wide">General</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(['no-results', 'no-data', 'empty-inbox', 'empty-folder', 'no-users', 'empty-cart', 'no-notifications', 'no-images'] as const).map(p => (
              <Card key={p} className="p-4">
                <EmptyStatePreset preset={p} size="sm" />
              </Card>
            ))}
          </div>

          <h3 className="font-bold uppercase text-sm tracking-wide mt-6">Status & System</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(['error', 'offline', 'permission-denied', 'coming-soon', 'maintenance', 'upload'] as const).map(p => (
              <Card key={p} className="p-4">
                <EmptyStatePreset preset={p} size="sm" />
              </Card>
            ))}
          </div>

          <CodeBlock
            code={framework === 'react' ? reactPresetCode : isSvelte ? sveltePresetCode : vuePresetCode}
            language={codeLanguage}
          />
        </section>

        {/* Animations */}
        <section id="animations" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Animations</h2>
          <p className="text-muted-foreground">
            Add entrance animations via the <code className="text-xs bg-muted px-1 py-0.5 border border-foreground font-mono">animation</code> prop.
            Works on both custom composition and presets.
          </p>

          <div className="flex items-center justify-end">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setAnimKey(k => k + 1)}>
              <RotateCcw className="h-3.5 w-3.5" /> Replay
            </Button>
          </div>

          <div key={animKey} className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <EmptyState size="sm" animation="fadeIn">
                <EmptyStateIcon iconColor="primary">
                  <Star className="h-8 w-8" />
                </EmptyStateIcon>
                <EmptyStateTitle>Fade In</EmptyStateTitle>
                <EmptyStateDescription>Smooth opacity entrance</EmptyStateDescription>
              </EmptyState>
            </Card>
            <Card className="p-4">
              <EmptyState size="sm" animation="bounce">
                <EmptyStateIcon iconColor="secondary">
                  <Star className="h-8 w-8" />
                </EmptyStateIcon>
                <EmptyStateTitle>Bounce</EmptyStateTitle>
                <EmptyStateDescription>Springy bounce entrance</EmptyStateDescription>
              </EmptyState>
            </Card>
            <Card className="p-4">
              <EmptyState size="sm" animation="scale">
                <EmptyStateIcon iconColor="accent">
                  <Star className="h-8 w-8" />
                </EmptyStateIcon>
                <EmptyStateTitle>Scale</EmptyStateTitle>
                <EmptyStateDescription>Scale up from center</EmptyStateDescription>
              </EmptyState>
            </Card>
          </div>

          <CodeBlock
            code={framework === 'react' ? reactAnimationCode : isSvelte ? svelteExamplePending : vueAnimationCode}
            language={codeLanguage}
          />
        </section>

        {/* Layout */}
        <section id="layout" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Layout</h2>
          <p className="text-muted-foreground">
            Switch between vertical (default) and horizontal layouts using the <code className="text-xs bg-muted px-1 py-0.5 border border-foreground font-mono">layout</code> prop.
            Horizontal places the icon to the left of the content — useful in sidebars or compact list rows.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Vertical (default)</h3>
              <Card className="p-6">
                <EmptyState layout="vertical" size="sm">
                  <EmptyStateIcon iconColor="primary">
                    <Inbox className="h-8 w-8" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
                  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
                </EmptyState>
              </Card>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Horizontal</h3>
              <Card className="p-6">
                <EmptyState layout="horizontal" size="sm">
                  <EmptyStateIcon iconColor="secondary">
                    <Inbox className="h-8 w-8" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Inbox empty</EmptyStateTitle>
                  <EmptyStateDescription>No messages to display.</EmptyStateDescription>
                </EmptyState>
              </Card>
            </div>
          </div>

          <CodeBlock
            code={framework === 'react' ? reactLayoutCode : vueLayoutCode}
            language={codeLanguage}
          />
        </section>

        {/* Variants */}
        <section id="variants" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Variants</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Default</h3>
              <Card className="p-6">
                <EmptyState variant="default">
                  <EmptyStateIcon>
                    <Search className="h-10 w-10" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Default variant</EmptyStateTitle>
                  <EmptyStateDescription>Clean and minimal style.</EmptyStateDescription>
                </EmptyState>
              </Card>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Filled</h3>
              <Card className="p-6">
                <EmptyState variant="filled">
                  <EmptyStateIcon iconColor="primary">
                    <Search className="h-10 w-10" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Filled variant</EmptyStateTitle>
                  <EmptyStateDescription>Dashed border with muted background.</EmptyStateDescription>
                </EmptyState>
              </Card>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Card</h3>
              <div className="p-6 bg-muted/30">
                <EmptyState variant="card">
                  <EmptyStateIcon iconColor="secondary">
                    <Search className="h-10 w-10" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Card variant</EmptyStateTitle>
                  <EmptyStateDescription>Bordered card style with shadow.</EmptyStateDescription>
                </EmptyState>
              </div>
            </div>
          </div>

          <CodeBlock
            code={getFrameworkCode(variantsCode)}
            language={codeLanguage}
          />
        </section>

        {/* Sizes */}
        <section id="sizes" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Sizes</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <EmptyState size="compact">
                <EmptyStateIcon>
                  <Upload className="h-6 w-6" />
                </EmptyStateIcon>
                <EmptyStateTitle>Compact</EmptyStateTitle>
                <EmptyStateDescription>Tightest size</EmptyStateDescription>
              </EmptyState>
            </Card>
            <Card className="p-4">
              <EmptyState size="sm">
                <EmptyStateIcon>
                  <Upload className="h-8 w-8" />
                </EmptyStateIcon>
                <EmptyStateTitle>Small</EmptyStateTitle>
                <EmptyStateDescription>Compact size</EmptyStateDescription>
              </EmptyState>
            </Card>
            <Card className="p-4">
              <EmptyState size="md">
                <EmptyStateIcon>
                  <Upload className="h-10 w-10" />
                </EmptyStateIcon>
                <EmptyStateTitle>Medium</EmptyStateTitle>
                <EmptyStateDescription>Default size</EmptyStateDescription>
              </EmptyState>
            </Card>
            <Card className="p-4">
              <EmptyState size="lg">
                <EmptyStateIcon>
                  <Upload className="h-12 w-12" />
                </EmptyStateIcon>
                <EmptyStateTitle>Large</EmptyStateTitle>
                <EmptyStateDescription>Larger size</EmptyStateDescription>
              </EmptyState>
            </Card>
          </div>

          <CodeBlock
            code={getFrameworkCode(sizesCode)}
            language={codeLanguage}
          />
        </section>

        {/* Icon Colors */}
        <section id="icon-colors" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Icon Colors</h2>
          <p className="text-muted-foreground">
            8 icon color options to match the context of your empty state.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['default', 'primary', 'secondary', 'accent', 'muted', 'success', 'warning', 'destructive'] as const).map((color) => (
              <Card key={color} className="p-4">
                <EmptyState size="sm">
                  <EmptyStateIcon iconColor={color}>
                    <Inbox className="h-8 w-8" />
                  </EmptyStateIcon>
                  <EmptyStateTitle className="text-sm">{color}</EmptyStateTitle>
                </EmptyState>
              </Card>
            ))}
          </div>

          <CodeBlock
            code={getFrameworkCode(iconColorsCode)}
            language={codeLanguage}
          />
        </section>

        {/* With Actions */}
        <section id="with-actions" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">With Actions</h2>
          <p className="text-muted-foreground">
            Add action buttons via the <code className="text-xs bg-muted px-1 py-0.5 border border-foreground font-mono">action</code> prop (React) or{' '}
            <code className="text-xs bg-muted px-1 py-0.5 border border-foreground font-mono">#action</code> slot (Vue).
          </p>

          <Card className="p-6">
            <EmptyStatePreset
              preset="no-data"
              action={
                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add item
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                </div>
              }
            />
          </Card>

          <CodeBlock
            code={framework === 'react' ? reactActionsCode : isSvelte ? svelteExamplePending : vueActionsCode}
            language={codeLanguage}
          />
        </section>

      </div>
    </>
  )
}

export default EmptyStateDoc
