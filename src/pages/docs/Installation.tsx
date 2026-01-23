import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

function CodeBlock({ code, language: _language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
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

export function Installation() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Getting Started</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Installation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          How to install and set up BoldKit in your React project.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Prerequisites</h2>
          <p className="text-muted-foreground mb-4">
            BoldKit is built on top of Tailwind CSS v4 and requires the following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React 18 or higher</li>
            <li>Tailwind CSS v4</li>
            <li>TypeScript (recommended)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 1: Create Project</h2>
          <p className="text-muted-foreground mb-4">
            Start with a new Vite + React + TypeScript project:
          </p>
          <Tabs defaultValue="bun">
            <TabsList>
              <TabsTrigger value="bun">bun</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="bun">
              <CodeBlock code="bun create vite my-app --template react-ts" />
            </TabsContent>
            <TabsContent value="npm">
              <CodeBlock code="npm create vite@latest my-app -- --template react-ts" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code="pnpm create vite my-app --template react-ts" />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 2: Install Tailwind CSS</h2>
          <Tabs defaultValue="bun">
            <TabsList>
              <TabsTrigger value="bun">bun</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="bun">
              <CodeBlock code="bun add tailwindcss @tailwindcss/vite" />
            </TabsContent>
            <TabsContent value="npm">
              <CodeBlock code="npm install tailwindcss @tailwindcss/vite" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code="pnpm add tailwindcss @tailwindcss/vite" />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 3: Install Dependencies</h2>
          <p className="text-muted-foreground mb-4">
            Install the required dependencies for BoldKit components:
          </p>
          <Tabs defaultValue="bun">
            <TabsList>
              <TabsTrigger value="bun">bun</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="bun">
              <CodeBlock code={`bun add clsx tailwind-merge class-variance-authority lucide-react`} />
            </TabsContent>
            <TabsContent value="npm">
              <CodeBlock code={`npm install clsx tailwind-merge class-variance-authority lucide-react`} />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code={`pnpm add clsx tailwind-merge class-variance-authority lucide-react`} />
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 4: Configure Vite</h2>
          <p className="text-muted-foreground mb-4">
            Update your <code className="bg-muted px-1 border">vite.config.ts</code>:
          </p>
          <CodeBlock
            language="typescript"
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
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 5: Add BoldKit Styles</h2>
          <p className="text-muted-foreground mb-4">
            Create or update your <code className="bg-muted px-1 border">src/styles/globals.css</code> with the BoldKit CSS variables.
            Visit the <a href="/docs/theming" className="text-primary underline">Theming</a> page to copy the full stylesheet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 6: Add Utility Function</h2>
          <p className="text-muted-foreground mb-4">
            Create <code className="bg-muted px-1 border">src/lib/utils.ts</code>:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Step 7: Add Components</h2>
          <p className="text-muted-foreground mb-4">
            Copy any component from the Components section into your <code className="bg-muted px-1 border">src/components/ui/</code> directory.
            Each component is self-contained and ready to use.
          </p>
        </section>
      </div>
    </div>
  )
}
