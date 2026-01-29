import { useState, type ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Terminal } from 'lucide-react'

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={copyCode}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 pr-20 text-sm bk-shadow">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 border-3 border-foreground bg-muted p-3 bk-shadow">
      <Terminal className="h-4 w-4 text-muted-foreground" />
      <code className="flex-1 text-sm">{command}</code>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCommand}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

interface ComponentDocProps {
  name: string
  description: string
  children: ReactNode
  installCommand?: string
  dependencies?: string[]
  sourceCode: string
  usageCode: string
}

export function ComponentDoc({
  name,
  description,
  children,
  installCommand,
  dependencies = [],
  sourceCode,
  usageCode,
}: ComponentDocProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="secondary" className="mb-4">Component</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          {name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Installation</h2>

        <Tabs defaultValue="cli">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="space-y-4">
            <p className="text-muted-foreground">
              Run the following command to add this component:
            </p>
            <InstallCommand command={installCommand || `npx boldkit-ui add ${name.toLowerCase()}`} />
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {dependencies.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-2">
                  Install the required dependencies:
                </p>
                <InstallCommand command={`npm install ${dependencies.join(' ')}`} />
              </div>
            )}
            <div>
              <p className="text-muted-foreground mb-2">
                Copy and paste the following code into{' '}
                <code className="bg-muted px-1 border text-sm">
                  src/components/ui/{name.toLowerCase()}.tsx
                </code>
              </p>
              <CodeBlock code={sourceCode} />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Usage</h2>
        <CodeBlock code={usageCode} />
      </section>
    </div>
  )
}

interface ExampleSectionProps {
  title: string
  description?: string
  children: ReactNode
  code: string
}

export function ExampleSection({ title, description, children, code }: ExampleSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-6">
              {children}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={code} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
