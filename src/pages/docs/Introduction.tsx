import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function Introduction() {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText('npx boldkit-ui init')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="accent" className="mb-4">Documentation</Badge>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          BoldKit is a neubrutalism-styled React component library built on top of shadcn/ui and Radix UI primitives.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold uppercase tracking-wide">What is BoldKit?</h2>
        <p>
          BoldKit brings the bold, raw aesthetic of neubrutalism to your React applications.
          It features high-contrast colors, thick borders, hard shadows, and a deliberately
          unpolished look that makes your UI stand out.
        </p>

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Key Features</h3>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>30+ Components</strong> - All shadcn/ui components with neubrutalism styling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">◼</span>
            <span><strong>Accessible</strong> - Built on Radix UI primitives with full keyboard navigation</span>
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
            <span><strong>Mobile-First</strong> - Responsive design that works on all devices</span>
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

        <h3 className="text-xl font-bold uppercase tracking-wide mt-8">Quick Start</h3>
        <p>Get started by running the CLI command:</p>

        <div className="not-prose my-4 flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-3 bk-shadow">
          <code className="flex-1 font-mono">npx boldkit-ui init</code>
          <Button variant="ghost" size="icon" onClick={copyCommand}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <p>Or follow the manual installation guide:</p>

        <Link to="/docs/installation">
          <Button className="mt-4 gap-2">
            Installation Guide <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
