import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Home, LayoutGrid, Eye, Code } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, ReactIcon, VueIcon } from '@/hooks/use-framework'

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 flex items-center gap-2 z-10">
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={copyCode}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 pr-20 text-sm max-h-96">
        <code>{code}</code>
      </pre>
    </div>
  )
}

interface BlockVariant {
  name: string
  description?: string
  preview: ReactNode
  reactCode: string
  vueCode: string
}

interface BlockDocProps {
  name: string
  description: string
  category: 'marketing' | 'application'
  variants: BlockVariant[]
}

export function BlockDoc({
  name,
  description,
  category,
  variants,
}: BlockDocProps) {
  const { framework } = useFramework()
  const [activeVariant, setActiveVariant] = useState(0)

  return (
    <>
      <SEO
        title={`${name} Block - BoldKit`}
        description={description}
      />
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blocks">Blocks</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5" />
                {category === 'marketing' ? 'Marketing Block' : 'Application Block'}
              </Badge>
              <Badge variant={framework === 'react' ? 'info' : 'success'} className="gap-1.5">
                {framework === 'react' ? <ReactIcon className="h-3.5 w-3.5" /> : <VueIcon className="h-3.5 w-3.5" />}
                {framework === 'react' ? 'React' : 'Vue 3'}
              </Badge>
            </div>
            <FrameworkToggle size="sm" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            {name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-2">
          {variants.map((variant, index) => (
            <Button
              key={variant.name}
              variant={activeVariant === index ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveVariant(index)}
            >
              {variant.name}
            </Button>
          ))}
        </div>

        {/* Current Variant */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold uppercase">{variants[activeVariant].name}</h2>
              {variants[activeVariant].description && (
                <p className="text-muted-foreground mt-1">{variants[activeVariant].description}</p>
              )}
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/30 min-h-[300px]">
                    {variants[activeVariant].preview}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              <CodeBlock
                code={framework === 'react' ? variants[activeVariant].reactCode : variants[activeVariant].vueCode}
                language={framework === 'react' ? 'tsx' : 'vue'}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* All Variants Quick Reference */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase">All Variants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variants.map((variant, index) => (
              <Card
                key={variant.name}
                className={`cursor-pointer transition-all hover:shadow-[6px_6px_0px_hsl(var(--shadow-color))] hover:translate-x-[-3px] hover:translate-y-[-3px] ${
                  activeVariant === index ? 'border-primary shadow-[4px_4px_0px_hsl(var(--primary))]' : ''
                }`}
                onClick={() => setActiveVariant(index)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base uppercase">{variant.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {variant.description || `${variant.name} variant of ${name}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase">Usage</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Import the block from the blocks directory:
            </p>
            <CodeBlock
              code={
                framework === 'react'
                  ? `import { ${name.replace(/\s+/g, '')} } from '@/components/blocks/${category}'

// Use the ${variants[0].name} variant
<${name.replace(/\s+/g, '')}.${variants[0].name} {...props} />`
                  : `<script setup lang="ts">
import { ${name.replace(/\s+/g, '')} } from '@/components/blocks/${category}'
</script>

<template>
  <${name.replace(/\s+/g, '')} variant="${variants[0].name.toLowerCase()}" v-bind="props" />
</template>`
              }
              language={framework === 'react' ? 'tsx' : 'vue'}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default BlockDoc
