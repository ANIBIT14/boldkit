import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCommand}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

export function Introduction() {
  const { framework } = useFramework()

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="accent" className="mb-4">Documentation</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          BoldKit is a neubrutalism-styled component library for React and Vue 3, built on top of shadcn/ui primitives.
        </p>
      </div>

      {/* Framework Toggle */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm uppercase">Choose Framework:</span>
        <FrameworkToggle />
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold uppercase tracking-wide">What is BoldKit?</h2>
        <p>
          BoldKit brings the bold, raw aesthetic of neubrutalism to your {framework === 'vue' ? 'Vue 3' : 'React'} applications.
          It features high-contrast colors, thick borders, hard shadows, and a deliberately
          unpolished look that makes your UI stand out.
        </p>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Key Features</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>45+ Components</strong> - All shadcn/ui components with neubrutalism styling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>{framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI Compatible</strong> - Install components directly using the {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Accessible</strong> - Built on {framework === 'vue' ? 'Reka UI' : 'Radix UI'} primitives with full keyboard navigation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Customizable</strong> - CSS variables for easy theming</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>TypeScript</strong> - Full type safety and IntelliSense support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Dark Mode</strong> - Built-in support for light and dark themes</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Design Philosophy</h3>
        <p>
          Neubrutalism is characterized by:
        </p>
        <Card className="my-4">
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li><strong>Bold Colors:</strong> High-contrast, vibrant color palettes</li>
              <li><strong>Thick Borders:</strong> 3px solid borders that define elements</li>
              <li><strong>Hard Shadows:</strong> Offset shadows with no blur (e.g., 4px 4px 0px)</li>
              <li><strong>Raw Typography:</strong> Bold, uppercase text for emphasis</li>
              <li><strong>Minimal Radius:</strong> Square or barely-rounded corners</li>
            </ul>
          </CardContent>
        </Card>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8 flex items-center gap-2">
          Quick Start with {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI
          {framework === 'vue' ? <VueIcon className="h-5 w-5" /> : <ReactIcon className="h-5 w-5" />}
        </h3>
        <p>The fastest way to add BoldKit components is using the {framework === 'vue' ? 'shadcn-vue' : 'shadcn'} CLI:</p>

        <div className="not-prose my-4">
          <p className="text-sm text-muted-foreground mb-2">1. Add BoldKit registry to your components.json:</p>
          {framework === 'react' ? (
            <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
              <code className="flex-1 font-mono text-sm">
                {`"registries": { "@boldkit": "https://boldkit.dev/r" }`}
              </code>
              <CopyButton text={`"registries": { "@boldkit": "https://boldkit.dev/r" }`} />
            </div>
          ) : (
            <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
              <code className="flex-1 font-mono text-sm">
                {`"registries": { "@boldkit": "https://boldkit.dev/r/vue" }`}
              </code>
              <CopyButton text={`"registries": { "@boldkit": "https://boldkit.dev/r/vue" }`} />
            </div>
          )}
        </div>

        <div className="not-prose my-4">
          <p className="text-sm text-muted-foreground mb-2">2. Install components:</p>
          <Tabs defaultValue="single" className="w-full">
            <TabsList>
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="multiple">Multiple</TabsTrigger>
              <TabsTrigger value="url">Direct URL</TabsTrigger>
            </TabsList>
            {framework === 'react' ? (
              <>
                <TabsContent value="single">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add @boldkit/button</code>
                    <CopyButton text="npx shadcn@latest add @boldkit/button" />
                  </div>
                </TabsContent>
                <TabsContent value="multiple">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input</code>
                    <CopyButton text="npx shadcn@latest add @boldkit/button @boldkit/card @boldkit/input" />
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn@latest add https://boldkit.dev/r/button.json</code>
                    <CopyButton text="npx shadcn@latest add https://boldkit.dev/r/button.json" />
                  </div>
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="single">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add @boldkit/button</code>
                    <CopyButton text="npx shadcn-vue@latest add @boldkit/button" />
                  </div>
                </TabsContent>
                <TabsContent value="multiple">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input</code>
                    <CopyButton text="npx shadcn-vue@latest add @boldkit/button @boldkit/card @boldkit/input" />
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
                    <code className="flex-1 font-mono text-sm">npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json</code>
                    <CopyButton text="npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json" />
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>

        <p>Or follow the manual installation guide for full setup:</p>

        <Link to="/docs/installation">
          <Button className="mt-4 gap-2">
            Installation Guide <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
