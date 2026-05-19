import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useFramework, FrameworkToggle, ReactIcon, SvelteIcon, VueIcon, frameworkActiveClasses, type Framework } from '@/hooks/use-framework'
import { SEO, pageSEO } from '@/components/SEO'
import { CodeBlock } from '@/components/docs/ComponentDoc'

const allComponents = [
  { name: 'accordion', description: 'Collapsible content sections' },
  { name: 'alert', description: 'Attention-grabbing messages' },
  { name: 'alert-dialog', description: 'Modal confirmation dialogs' },
  { name: 'aspect-ratio', description: 'Maintain element proportions' },
  { name: 'avatar', description: 'User profile images' },
  { name: 'badge', description: 'Status indicators and labels' },
  { name: 'breadcrumb', description: 'Navigation trail' },
  { name: 'button', description: 'Interactive buttons' },
  { name: 'calendar', description: 'Date picker calendar' },
  { name: 'card', description: 'Content containers' },
  { name: 'chart', description: 'Data visualization' },
  { name: 'checkbox', description: 'Toggle selections' },
  { name: 'collapsible', description: 'Expandable sections' },
  { name: 'command', description: 'Command palette' },
  { name: 'dialog', description: 'Modal dialogs' },
  { name: 'carousel', description: 'Image and content slider' },
  { name: 'data-table', description: 'Advanced data tables with sorting and filtering' },
  { name: 'date-range-picker', description: 'Date range selection' },
  { name: 'drawer', description: 'Slide-out panels' },
  { name: 'dropdown-menu', description: 'Context menus' },
  { name: 'dropzone', description: 'File drag-and-drop upload' },
  { name: 'empty-state', description: 'Empty content placeholders' },
  { name: 'hover-card', description: 'Hover-triggered cards' },
  { name: 'input', description: 'Text input fields' },
  { name: 'input-otp', description: 'One-time password input' },
  { name: 'kbd', description: 'Keyboard shortcut keys' },
  { name: 'label', description: 'Form labels' },
  { name: 'layered-card', description: 'Stacked paper effect' },
  { name: 'marquee', description: 'Scrolling text ticker' },
  { name: 'pagination', description: 'Page navigation' },
  { name: 'popover', description: 'Floating content' },
  { name: 'progress', description: 'Progress indicators' },
  { name: 'radio-group', description: 'Single-select options' },
  { name: 'rating', description: 'Star rating input' },
  { name: 'scroll-area', description: 'Custom scrollbars' },
  { name: 'select', description: 'Dropdown selection' },
  { name: 'separator', description: 'Visual dividers' },
  { name: 'shapes', description: `${64} SVG shapes` },
  { name: 'sheet', description: 'Side panels' },
  { name: 'sidebar', description: 'Navigation sidebar' },
  { name: 'skeleton', description: 'Loading placeholders' },
  { name: 'slider', description: 'Range selection' },
  { name: 'sonner', description: 'Toast notifications' },
  { name: 'spinner', description: 'Loading spinners' },
  { name: 'stat-card', description: 'Metric stat cards' },
  { name: 'stepper', description: 'Multi-step wizard' },
  { name: 'sticker', description: 'Decorative labels' },
  { name: 'switch', description: 'Toggle switches' },
  { name: 'table', description: 'Data tables' },
  { name: 'tabs', description: 'Tabbed interfaces' },
  { name: 'tag-input', description: 'Multi-value tag input' },
  { name: 'textarea', description: 'Multi-line text input' },
  { name: 'time-picker', description: 'Time selection input' },
  { name: 'timeline', description: 'Activity feeds and history' },
  { name: 'toggle', description: 'Toggle buttons' },
  { name: 'toggle-group', description: 'Toggle button groups' },
  { name: 'tooltip', description: 'Hover information' },
  { name: 'tour', description: 'Step-by-step product tours' },
  { name: 'tree-view', description: 'Nested tree navigation' },
]

function ComponentRow({ name, description, framework }: { name: string; description: string; framework: Framework }) {
  const [copied, setCopied] = useState(false)
  const getCommand = () => {
    const registryPath = framework === 'vue'
      ? `/r/vue/${name}.json`
      : framework === 'svelte'
        ? `/r/svelte/${name}.json`
        : `/r/${name}.json`
    const cli = framework === 'vue' ? 'shadcn-vue' : framework === 'svelte' ? 'shadcn-svelte' : 'shadcn'
    return `npx ${cli}@latest add https://boldkit.dev${registryPath}`
  }
  const command = getCommand()

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    toast.success(`Copied ${name} install command!`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between py-2 px-3 border-b border-muted last:border-b-0 hover:bg-muted/50 transition-colors">
      <div className="flex-1 min-w-0">
        <span className="font-bold text-sm">{name}</span>
        <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">{description}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs shrink-0"
        onClick={copyCommand}
      >
        {copied ? <Check className="h-3 w-3 mr-1" /> : <Terminal className="h-3 w-3 mr-1" />}
        Copy
      </Button>
    </div>
  )
}

export function Installation() {
  // Use global framework context
  const { framework } = useFramework()
  const isVue = framework === 'vue'
  const isSvelte = framework === 'svelte'
  const cliName = isVue ? 'shadcn-vue' : isSvelte ? 'shadcn-svelte' : 'shadcn'
  const registryPath = isVue ? '/r/vue' : isSvelte ? '/r/svelte' : '/r'
  const schemaUrl = isVue ? 'https://shadcn-vue.com/schema.json' : 'https://ui.shadcn.com/schema.json'
  const viteTemplate = isVue ? 'vue-ts' : isSvelte ? 'svelte-ts' : 'react-ts'
  const baseDependencies = isVue
    ? 'clsx tailwind-merge class-variance-authority lucide-vue-next reka-ui'
    : isSvelte
      ? 'clsx tailwind-merge tailwind-variants bits-ui lucide-svelte'
      : 'clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot'
  const frameworkIcon = isVue ? <VueIcon /> : isSvelte ? <SvelteIcon /> : <ReactIcon />
  const frameworkBorderClass = isVue ? 'border-success' : isSvelte ? 'border-primary' : 'border-secondary'
  const frameworkHeaderClass = frameworkActiveClasses[framework]

  return (
    <div className="space-y-8">
      <SEO {...pageSEO.installation} />
      <div>
        <Badge variant="secondary" className="mb-4">Getting Started</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Installation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          How to install and set up BoldKit in your project.
        </p>
      </div>

      {/* Framework Toggle */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm uppercase">Choose Framework:</span>
        <FrameworkToggle />
      </div>

      <div className="space-y-8">
        {/* shadcn CLI Method */}
        <Card className={frameworkBorderClass}>
          <CardHeader className={frameworkHeaderClass}>
            <CardTitle className="flex items-center gap-2">
              {frameworkIcon}
              Recommended: {cliName} CLI
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-muted-foreground">
              The fastest way to add BoldKit components is using the {cliName} CLI with our registry.
            </p>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 1: Configure Registry</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add BoldKit to the registries in your <code className="bg-muted px-1 border">components.json</code>:
              </p>
              <CodeBlock code={`{
  "$schema": "${schemaUrl}",
  "registries": {
    "@boldkit": "https://boldkit.dev${registryPath}"
  }
}`} language="json" />
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 2: Install Components</h3>
              <Tabs defaultValue="single">
                <TabsList>
                  <TabsTrigger value="single">Single Component</TabsTrigger>
                  <TabsTrigger value="multiple">Multiple</TabsTrigger>
                </TabsList>
                <TabsContent value="single">
                  <CodeBlock code={`npx ${cliName}@latest add @boldkit/button`} />
                </TabsContent>
                <TabsContent value="multiple">
                  <CodeBlock code={`npx ${cliName}@latest add @boldkit/button @boldkit/card @boldkit/input @boldkit/badge`} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 3: Install Styles</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Install the BoldKit theme for CSS variables:
              </p>
              <CodeBlock code={`npx ${cliName}@latest add https://boldkit.dev${registryPath}/styles.json`} />
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Alternative: Direct URL</h3>
              <p className="text-sm text-muted-foreground mb-2">
                You can also install directly from the registry URL:
              </p>
              <CodeBlock code={`npx ${cliName}@latest add https://boldkit.dev${registryPath}/button.json`} />
            </div>
          </CardContent>
        </Card>

        {/* Manual Installation */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Manual Installation</h2>
          <p className="text-muted-foreground mb-6">
            If you prefer to set up manually or don't use {cliName} CLI, follow these steps:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Prerequisites</h3>
          <p className="text-muted-foreground mb-4">
            BoldKit is built on top of Tailwind CSS v4 and requires the following:
          </p>
          {framework === 'react' ? (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>React 18 or 19</li>
              <li>Tailwind CSS v4</li>
              <li>TypeScript (recommended)</li>
            </ul>
          ) : framework === 'vue' ? (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Vue 3.5+</li>
              <li>Tailwind CSS v4</li>
              <li>TypeScript (recommended)</li>
            </ul>
          ) : (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Svelte 5</li>
              <li>Tailwind CSS v4</li>
              <li>TypeScript (recommended)</li>
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 1: Create Project</h3>
          <p className="text-muted-foreground mb-4">
            Start with a new Vite + {isVue ? 'Vue' : isSvelte ? 'Svelte' : 'React'} + TypeScript project:
          </p>
          <Tabs defaultValue="npm">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code={`npm create vite@latest my-app -- --template ${viteTemplate}`} />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code={`pnpm create vite my-app --template ${viteTemplate}`} />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock code={`bun create vite my-app --template ${viteTemplate}`} />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 2: Install Tailwind CSS</h3>
          <Tabs defaultValue="npm">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code="npm install tailwindcss @tailwindcss/vite" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code="pnpm add tailwindcss @tailwindcss/vite" />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock code="bun add tailwindcss @tailwindcss/vite" />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 3: Install Dependencies</h3>
          <p className="text-muted-foreground mb-4">
            Install the required dependencies for BoldKit components:
          </p>
          <Tabs defaultValue="npm">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code={`npm install ${baseDependencies}`} />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code={`pnpm add ${baseDependencies}`} />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock code={`bun add ${baseDependencies}`} />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 4: Configure Vite</h3>
          <p className="text-muted-foreground mb-4">
            Update your <code className="bg-muted px-1 border">vite.config.ts</code>:
          </p>
          {framework === 'react' ? (
            <CodeBlock
              code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`}
              language="typescript"
            />
          ) : framework === 'vue' ? (
            <CodeBlock
              code={`import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`}
              language="typescript"
            />
          ) : (
            <CodeBlock
              code={`import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      '$lib': path.resolve(__dirname, './src/lib'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})`}
              language="typescript"
            />
          )}
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 5: Add BoldKit Styles</h3>
          <p className="text-muted-foreground mb-4">
            Create or update your <code className="bg-muted px-1 border">src/styles/globals.css</code> with the BoldKit CSS variables.
            Visit the <a href="/docs/theming" className="text-primary underline">Theming</a> page to copy the full stylesheet.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 6: Add Utility Function</h3>
          <p className="text-muted-foreground mb-4">
            Create <code className="bg-muted px-1 border">src/lib/utils.ts</code>:
          </p>
          <CodeBlock
            code={`import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
            language="typescript"
          />
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 7: Add Components</h3>
          <p className="text-muted-foreground mb-4">
            Copy any component from the Components section into your <code className="bg-muted px-1 border">src/components/ui/</code> directory.
            Each component is self-contained and ready to use.
          </p>
        </section>

        {/* All Components List */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">All Components</h2>
          <p className="text-muted-foreground mb-6">
            Click to copy the {cliName} CLI install command for any component:
          </p>
          <Card>
            <CardHeader className="py-3 bg-muted">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-sm flex items-center gap-2">
                  {frameworkIcon}
                  {allComponents.length} Components Available
                </span>
                <Badge variant={isVue ? 'success' : isSvelte ? 'warning' : 'secondary'}>
                  {cliName} CLI
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
              {allComponents.map((component) => (
                <ComponentRow
                  key={component.name}
                  name={component.name}
                  description={component.description}
                  framework={framework}
                />
              ))}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground mt-4">
            You can also install the styles and utilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <CodeBlock code={`npx ${cliName}@latest add https://boldkit.dev${registryPath}/styles.json`} />
            <CodeBlock code={`npx ${cliName}@latest add https://boldkit.dev${registryPath}/utils.json`} />
          </div>
        </section>

        {framework === 'svelte' && (
          <section className="mt-8">
            <Card className="border-warning">
              <CardHeader className="bg-warning">
                <CardTitle className="flex items-center gap-2">
                  <SvelteIcon /> Svelte 5 Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Svelte 5 Components</h4>
                  <p className="text-sm text-muted-foreground">
                    BoldKit Svelte components use Svelte 5 syntax and the shadcn-svelte registry format.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Headless Primitives</h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive primitives are built on <a href="https://bits-ui.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">Bits UI</a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Vue-specific notes */}
        {framework === 'vue' && (
          <section className="mt-8">
            <Card className="border-info">
              <CardHeader className="bg-info">
                <CardTitle className="flex items-center gap-2">
                  <VueIcon /> Vue 3 Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Reka UI Primitives</h4>
                  <p className="text-sm text-muted-foreground">
                    BoldKit Vue uses <a href="https://reka-ui.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">Reka UI</a> as the headless component primitive layer (the Vue equivalent of Radix UI).
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Composition API</h4>
                  <p className="text-sm text-muted-foreground">
                    All components use Vue 3 Composition API with <code className="bg-muted px-1 border">&lt;script setup&gt;</code> syntax for optimal developer experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Additional Dependencies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Some components require additional packages:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><code className="bg-muted px-1 border">vue-sonner</code> for toast notifications</li>
                    <li><code className="bg-muted px-1 border">vaul-vue</code> for drawer component</li>
                    <li><code className="bg-muted px-1 border">vue-echarts</code> + <code className="bg-muted px-1 border">echarts</code> for charts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Nuxt Installation */}
        {framework === 'vue' && (
          <section id="nuxt-installation" className="mt-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Nuxt Installation</h2>
            <p className="text-muted-foreground mb-6">
              BoldKit Vue components are fully compatible with Nuxt. Follow these steps to set up BoldKit in your Nuxt project.
            </p>

            <Card className="border-secondary mb-6">
              <CardHeader className="bg-secondary">
                <CardTitle>Quick Setup with shadcn-nuxt</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-bold mb-2">Step 1: Create Nuxt Project</h4>
                  <CodeBlock code="npx nuxi@latest init my-nuxt-app" />
                </div>

                <div>
                  <h4 className="font-bold mb-2">Step 2: Add Tailwind CSS</h4>
                  <CodeBlock code="npm install tailwindcss @tailwindcss/vite -D" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Create <code className="bg-muted px-1 border">assets/css/tailwind.css</code>:
                  </p>
                  <CodeBlock code='@import "tailwindcss";' language="css" />
                </div>

                <div>
                  <h4 className="font-bold mb-2">Step 3: Install shadcn-nuxt Module</h4>
                  <CodeBlock code="npx nuxi@latest module add shadcn-nuxt" />
                </div>

                <div>
                  <h4 className="font-bold mb-2">Step 4: Configure nuxt.config.ts</h4>
                  <CodeBlock code={`import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['shadcn-nuxt'],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  css: ['~/assets/css/tailwind.css']
})`} language="typescript" />
                </div>

                <div>
                  <h4 className="font-bold mb-2">Step 5: Initialize shadcn-vue</h4>
                  <CodeBlock code="npx shadcn-vue@latest init" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Select <strong>Nuxt</strong> when prompted for framework.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Step 6: Add BoldKit Components</h4>
                  <CodeBlock code="npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Nuxt will auto-import components from <code className="bg-muted px-1 border">components/ui</code>.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning mb-6">
              <CardHeader className="bg-warning">
                <CardTitle>SSR Hydration Fix</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Some components use viewport width detection which can cause hydration mismatches.
                  Add this plugin to fix SSR hydration errors on mobile:
                </p>
                <p className="text-sm text-muted-foreground">
                  Create <code className="bg-muted px-1 border">plugins/ssr-width.ts</code>:
                </p>
                <CodeBlock code={`import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})`} language="typescript" />
                <p className="text-sm text-muted-foreground">
                  Install VueUse if not already installed:
                </p>
                <CodeBlock code="npm install @vueuse/core" />
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader className="bg-destructive text-destructive-foreground">
                <CardTitle>Client-Only Components</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Some components require browser APIs and must be wrapped in <code className="bg-muted px-1 border">&lt;ClientOnly&gt;</code> to prevent SSR errors:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>Drawer</strong> - Uses vaul-vue with browser APIs</li>
                  <li><strong>Sonner</strong> - Toast notifications</li>
                  <li><strong>Command</strong> - Keyboard event handling</li>
                  <li><strong>Calendar</strong> - Date picker interactions</li>
                  <li><strong>Chart</strong> - ECharts canvas rendering</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">Example usage:</p>
                <CodeBlock code={`<template>
  <ClientOnly>
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>Content here</DrawerContent>
    </Drawer>
  </ClientOnly>
</template>`} language="vue" />
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  )
}
