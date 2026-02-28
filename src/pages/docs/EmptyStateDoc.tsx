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
import { useFramework, ReactIcon, VueIcon } from '@/hooks/use-framework'
import { Plus, Upload, Search, Inbox } from 'lucide-react'

const reactInstallCode = `npx shadcn@latest add "https://boldkit.tech/r/empty-state.json"`
const vueInstallCode = `npx shadcn-vue@latest add "https://boldkit.tech/r/vue/empty-state.json"`

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

const reactPresetCode = `import { EmptyStatePreset } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'

// Available presets: 'no-results', 'no-data', 'empty-inbox', 'empty-folder',
// 'no-users', 'empty-cart', 'no-notifications', 'no-images'

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
  <EmptyStatePreset preset="no-results">
    <template #action>
      <Button variant="outline" @click="clearSearch">
        Clear search
      </Button>
    </template>
  </EmptyStatePreset>
</template>`

const variantsCode = {
  react: `// Default variant
<EmptyState variant="default">...</EmptyState>

// Filled variant (with background)
<EmptyState variant="filled">...</EmptyState>

// Card variant (bordered card style)
<EmptyState variant="card">...</EmptyState>`,
  vue: `<!-- Default variant -->
<EmptyState variant="default">...</EmptyState>

<!-- Filled variant (with background) -->
<EmptyState variant="filled">...</EmptyState>

<!-- Card variant (bordered card style) -->
<EmptyState variant="card">...</EmptyState>`
}

const sizesCode = {
  react: `// Small
<EmptyState size="sm">...</EmptyState>

// Medium (default)
<EmptyState size="md">...</EmptyState>

// Large
<EmptyState size="lg">...</EmptyState>`,
  vue: `<!-- Small -->
<EmptyState size="sm">...</EmptyState>

<!-- Medium (default) -->
<EmptyState size="md">...</EmptyState>

<!-- Large -->
<EmptyState size="lg">...</EmptyState>`
}

export function EmptyStateDoc() {
  const { framework } = useFramework()

  return (
    <>
      <SEO {...getComponentSEO('empty-state', 'Empty State')} />
      <div className="space-y-8 md:space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Empty State</h1>
            <Badge variant="secondary">UI Component</Badge>
            <Badge variant="success" className="gap-1.5">
              {framework === 'react' ? <ReactIcon className="h-3.5 w-3.5" /> : <VueIcon className="h-3.5 w-3.5" />}
              {framework === 'react' ? 'React' : 'Vue 3'}
            </Badge>
            <Badge variant="info">New in v2.6</Badge>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            A flexible empty state component for displaying placeholder content when there's no data to show.
            Includes built-in presets for common scenarios.
          </p>
        </div>

        {/* Installation */}
        <section id="installation" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Installation</h2>
          <CodeBlock
            code={framework === 'react' ? reactInstallCode : vueInstallCode}
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
            code={framework === 'react' ? reactUsageCode : vueUsageCode}
            language={framework === 'react' ? 'tsx' : 'vue'}
          />
        </section>

        {/* Presets */}
        <section id="presets" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Presets</h2>
          <p className="text-muted-foreground">
            Use built-in presets for common empty state scenarios.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <EmptyStatePreset preset="no-results" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="no-data" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="empty-inbox" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="empty-folder" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="no-users" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="empty-cart" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="no-notifications" size="sm" />
            </Card>
            <Card className="p-4">
              <EmptyStatePreset preset="no-images" size="sm" />
            </Card>
          </div>

          <CodeBlock
            code={framework === 'react' ? reactPresetCode : vuePresetCode}
            language={framework === 'react' ? 'tsx' : 'vue'}
          />
        </section>

        {/* Variants */}
        <section id="variants" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Variants</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">Default</h3>
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
              <h3 className="font-bold mb-2">Filled</h3>
              <Card className="p-6">
                <EmptyState variant="filled">
                  <EmptyStateIcon iconColor="primary">
                    <Search className="h-10 w-10" />
                  </EmptyStateIcon>
                  <EmptyStateTitle>Filled variant</EmptyStateTitle>
                  <EmptyStateDescription>With muted background.</EmptyStateDescription>
                </EmptyState>
              </Card>
            </div>

            <div>
              <h3 className="font-bold mb-2">Card</h3>
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
            code={variantsCode[framework]}
            language={framework === 'react' ? 'tsx' : 'vue'}
          />
        </section>

        {/* Sizes */}
        <section id="sizes" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Sizes</h2>

          <div className="grid md:grid-cols-3 gap-4">
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
            code={sizesCode[framework]}
            language={framework === 'react' ? 'tsx' : 'vue'}
          />
        </section>

        {/* Icon Colors */}
        <section id="icon-colors" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">Icon Colors</h2>

          <div className="grid md:grid-cols-5 gap-4">
            {(['default', 'primary', 'secondary', 'accent', 'muted'] as const).map((color) => (
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
        </section>

        {/* With Actions */}
        <section id="with-actions" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold uppercase">With Actions</h2>

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
        </section>
      </div>
    </>
  )
}

export default EmptyStateDoc
