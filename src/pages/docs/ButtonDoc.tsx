import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Loader2, Mail, ChevronRight } from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
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

export function ButtonDoc() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Component</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Button
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Button>Button</Button>
          </div>
        </CardContent>
      </Card>

      {/* Variants */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Variants</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Sizes</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="icon"><Mail className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`} />
          </TabsContent>
        </Tabs>
      </section>

      {/* With Icon */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">With Icon</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" /> Login with Email
                  </Button>
                  <Button variant="secondary">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={`<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
<Button variant="secondary">
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>`} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Loading */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Loading</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                  <Button
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => setLoading(false), 2000)
                    }}
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Loading...' : 'Click me'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={`<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>`} />
          </TabsContent>
        </Tabs>
      </section>

      {/* As Child */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">As Child</h2>
        <p className="text-muted-foreground mb-4">
          Use the <code className="bg-muted px-1 border">asChild</code> prop to render the button as a different element.
        </p>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <Button asChild>
                  <a href="#">Link styled as Button</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={`<Button asChild>
  <a href="#">Link styled as Button</a>
</Button>`} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
