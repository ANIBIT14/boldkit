import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
      {language && (
        <div className="absolute right-12 top-2 text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 border border-foreground/20">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 text-sm bk-shadow">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

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
  { name: 'drawer', description: 'Slide-out panels' },
  { name: 'dropdown-menu', description: 'Context menus' },
  { name: 'hover-card', description: 'Hover-triggered cards' },
  { name: 'input', description: 'Text input fields' },
  { name: 'input-otp', description: 'One-time password input' },
  { name: 'label', description: 'Form labels' },
  { name: 'layered-card', description: 'Stacked paper effect' },
  { name: 'marquee', description: 'Scrolling text ticker' },
  { name: 'pagination', description: 'Page navigation' },
  { name: 'popover', description: 'Floating content' },
  { name: 'progress', description: 'Progress indicators' },
  { name: 'radio-group', description: 'Single-select options' },
  { name: 'scroll-area', description: 'Custom scrollbars' },
  { name: 'select', description: 'Dropdown selection' },
  { name: 'separator', description: 'Visual dividers' },
  { name: 'shapes', description: '35 SVG shapes' },
  { name: 'sticky-note', description: 'Post-it style notes' },
  { name: 'sheet', description: 'Side panels' },
  { name: 'skeleton', description: 'Loading placeholders' },
  { name: 'slider', description: 'Range selection' },
  { name: 'sonner', description: 'Toast notifications' },
  { name: 'sticker', description: 'Decorative labels' },
  { name: 'switch', description: 'Toggle switches' },
  { name: 'table', description: 'Data tables' },
  { name: 'tabs', description: 'Tabbed interfaces' },
  { name: 'textarea', description: 'Multi-line text input' },
  { name: 'toggle', description: 'Toggle buttons' },
  { name: 'toggle-group', description: 'Toggle button groups' },
  { name: 'tooltip', description: 'Hover information' },
]

function ComponentRow({ name, description, framework }: { name: string; description: string; framework: 'react' | 'vue' }) {
  const [copied, setCopied] = useState(false)
  const registryPath = framework === 'vue' ? `/r/vue/${name}.json` : `/r/${name}.json`
  const cli = framework === 'vue' ? 'shadcn-vue' : 'shadcn'
  const command = `npx ${cli}@latest add https://boldkit.dev${registryPath}`

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

  return (
    <div className="space-y-8">
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
        <Card className={framework === 'vue' ? 'border-success' : 'border-primary'}>
          <CardHeader className={framework === 'vue' ? 'bg-success' : 'bg-primary'}>
            <CardTitle className="flex items-center gap-2">
              {framework === 'vue' ? <VueIcon /> : <ReactIcon />}
              Recommended: {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-muted-foreground">
              The fastest way to add BoldKit components is using the {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI with our registry.
            </p>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 1: Configure Registry</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add BoldKit to the registries in your <code className="bg-muted px-1 border">components.json</code>:
              </p>
              {framework === 'react' ? (
                <CodeBlock code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@boldkit": "https://boldkit.dev/r"
  }
}`} language="json" />
              ) : (
                <CodeBlock code={`{
  "$schema": "https://shadcn-vue.com/schema.json",
  "registries": {
    "@boldkit": "https://boldkit.dev/r/vue"
  }
}`} language="json" />
              )}
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 2: Install Components</h3>
              <Tabs defaultValue="single">
                <TabsList>
                  <TabsTrigger value="single">Single Component</TabsTrigger>
                  <TabsTrigger value="multiple">Multiple</TabsTrigger>
                </TabsList>
                <TabsContent value="single">
                  {framework === 'react' ? (
                    <CodeBlock code="npx shadcn@latest add @boldkit/button" />
                  ) : (
                    <CodeBlock code="npx shadcn-vue@latest add @boldkit/button" />
                  )}
                </TabsContent>
                <TabsContent value="multiple">
                  {framework === 'react' ? (
                    <CodeBlock code="npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input @boldkit/badge" />
                  ) : (
                    <CodeBlock code="npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input @boldkit/badge" />
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Step 3: Install Styles</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Install the BoldKit theme for CSS variables:
              </p>
              {framework === 'react' ? (
                <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/styles.json" />
              ) : (
                <CodeBlock code="npx shadcn-vue@latest add https://boldkit.dev/r/vue/styles.json" />
              )}
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wide mb-2">Alternative: Direct URL</h3>
              <p className="text-sm text-muted-foreground mb-2">
                You can also install directly from the registry URL:
              </p>
              {framework === 'react' ? (
                <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/button.json" />
              ) : (
                <CodeBlock code="npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manual Installation */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Manual Installation</h2>
          <p className="text-muted-foreground mb-6">
            If you prefer to set up manually or don't use {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI, follow these steps:
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
          ) : (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Vue 3.5+</li>
              <li>Tailwind CSS v4</li>
              <li>TypeScript (recommended)</li>
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Step 1: Create Project</h3>
          <p className="text-muted-foreground mb-4">
            Start with a new Vite + {framework === 'vue' ? 'Vue' : 'React'} + TypeScript project:
          </p>
          <Tabs defaultValue="npm">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              {framework === 'react' ? (
                <CodeBlock code="npm create vite@latest my-app -- --template react-ts" />
              ) : (
                <CodeBlock code="npm create vite@latest my-app -- --template vue-ts" />
              )}
            </TabsContent>
            <TabsContent value="pnpm">
              {framework === 'react' ? (
                <CodeBlock code="pnpm create vite my-app --template react-ts" />
              ) : (
                <CodeBlock code="pnpm create vite my-app --template vue-ts" />
              )}
            </TabsContent>
            <TabsContent value="bun">
              {framework === 'react' ? (
                <CodeBlock code="bun create vite my-app --template react-ts" />
              ) : (
                <CodeBlock code="bun create vite my-app --template vue-ts" />
              )}
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
            {framework === 'react' ? (
              <>
                <TabsContent value="npm">
                  <CodeBlock code="npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot" />
                </TabsContent>
                <TabsContent value="pnpm">
                  <CodeBlock code="pnpm add clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot" />
                </TabsContent>
                <TabsContent value="bun">
                  <CodeBlock code="bun add clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot" />
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="npm">
                  <CodeBlock code="npm install clsx tailwind-merge class-variance-authority lucide-vue-next reka-ui" />
                </TabsContent>
                <TabsContent value="pnpm">
                  <CodeBlock code="pnpm add clsx tailwind-merge class-variance-authority lucide-vue-next reka-ui" />
                </TabsContent>
                <TabsContent value="bun">
                  <CodeBlock code="bun add clsx tailwind-merge class-variance-authority lucide-vue-next reka-ui" />
                </TabsContent>
              </>
            )}
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
          ) : (
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
            Click to copy the {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI install command for any component:
          </p>
          <Card>
            <CardHeader className="py-3 bg-muted">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-sm flex items-center gap-2">
                  {framework === 'vue' ? <VueIcon /> : <ReactIcon />}
                  46 Components Available
                </span>
                <Badge variant={framework === 'vue' ? 'success' : 'secondary'}>
                  {framework === 'vue' ? 'shadcn-vue CLI' : 'shadcn CLI'}
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
            {framework === 'react' ? (
              <>
                <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/styles.json" />
                <CodeBlock code="npx shadcn@latest add https://boldkit.dev/r/utils.json" />
              </>
            ) : (
              <>
                <CodeBlock code="npx shadcn-vue@latest add https://boldkit.dev/r/vue/styles.json" />
                <CodeBlock code="npx shadcn-vue@latest add https://boldkit.dev/r/vue/utils.json" />
              </>
            )}
          </div>
        </section>

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
      </div>
    </div>
  )
}
