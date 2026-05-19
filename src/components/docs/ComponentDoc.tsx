import { useEffect, useState, type ReactNode } from 'react'
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
import { Copy, Check, Terminal, Home } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { OpenInV0Button } from './OpenInV0Button'
import { SEO, getComponentSEO } from '@/components/SEO'
import { useFramework, FrameworkToggle, SvelteIcon, VueIcon, type Framework } from '@/hooks/use-framework'

interface RegistryFile {
  content?: string
}

interface RegistryItem {
  dependencies?: string[]
  files?: RegistryFile[]
}

const codeTheme = {
  'code[class*="language-"]': {
    color: 'hsl(var(--foreground))',
    background: 'transparent',
    textShadow: 'none',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  'pre[class*="language-"]': {
    color: 'hsl(var(--foreground))',
    background: 'transparent',
    textShadow: 'none',
    margin: 0,
    padding: 0,
    overflow: 'visible',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  comment: { color: 'hsl(var(--muted-foreground))', fontStyle: 'italic' },
  prolog: { color: 'hsl(var(--muted-foreground))' },
  doctype: { color: 'hsl(var(--muted-foreground))' },
  cdata: { color: 'hsl(var(--muted-foreground))' },
  punctuation: { color: 'hsl(var(--foreground) / 0.65)' },
  property: { color: 'hsl(var(--info))' },
  tag: { color: 'hsl(var(--primary))' },
  boolean: { color: 'hsl(var(--accent))' },
  number: { color: 'hsl(var(--accent))' },
  constant: { color: 'hsl(var(--warning))' },
  symbol: { color: 'hsl(var(--warning))' },
  deleted: { color: 'hsl(var(--destructive))' },
  selector: { color: 'hsl(var(--success))' },
  'attr-name': { color: 'hsl(var(--info))' },
  string: { color: 'hsl(var(--success))' },
  char: { color: 'hsl(var(--success))' },
  builtin: { color: 'hsl(var(--secondary))' },
  inserted: { color: 'hsl(var(--success))' },
  operator: { color: 'hsl(var(--foreground) / 0.7)' },
  entity: { color: 'hsl(var(--warning))' },
  url: { color: 'hsl(var(--info))' },
  atrule: { color: 'hsl(var(--accent))' },
  'attr-value': { color: 'hsl(var(--success))' },
  keyword: { color: 'hsl(var(--secondary))', fontWeight: 700 },
  function: { color: 'hsl(var(--primary))' },
  'class-name': { color: 'hsl(var(--warning))' },
  regex: { color: 'hsl(var(--accent))' },
  important: { color: 'hsl(var(--destructive))', fontWeight: 700 },
  variable: { color: 'hsl(var(--info))' },
} as const

const languageAliases: Record<string, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  vue: 'vue',
  svelte: 'svelte',
  bash: 'bash',
  shell: 'bash',
  json: 'json',
  css: 'css',
  html: 'markup',
}

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
      <div className="absolute right-2 top-2 flex items-center gap-2 bg-muted px-2 py-1 border-2 border-foreground">
        <span className="text-xs text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={copyCode}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 pr-24 text-sm bk-shadow">
        <SyntaxHighlighter
          language={languageAliases[language] || language}
          style={codeTheme}
          customStyle={{ margin: 0, padding: 0, background: 'transparent' }}
          codeTagProps={{ style: { fontFamily: 'inherit' } }}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
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
      <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
      <code className="flex-1 text-sm overflow-x-auto">{command}</code>
      <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 bg-background" onClick={copyCommand}>
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
  registryName?: string
  // Vue-specific props
  vueSourceCode?: string
  vueUsageCode?: string
  vueDependencies?: string[]
  // Svelte-specific props. When omitted, docs load the generated Svelte registry item.
  svelteSourceCode?: string
  svelteUsageCode?: string
  svelteDependencies?: string[]
  // Nuxt-specific
  nuxtClientOnly?: boolean
}

export function ComponentDoc({
  name,
  description,
  children,
  installCommand,
  dependencies = [],
  sourceCode,
  usageCode,
  registryName,
  vueSourceCode,
  vueUsageCode,
  vueDependencies,
  svelteSourceCode,
  svelteUsageCode,
  svelteDependencies,
  nuxtClientOnly = false,
}: ComponentDocProps) {
  // Use global framework context
  const { framework } = useFramework()

  // Convert component name to registry name (e.g., "Alert Dialog" -> "alert-dialog")
  const componentRegistryName = registryName || name.toLowerCase().replace(/\s+/g, '-')
  const [svelteRegistryItem, setSvelteRegistryItem] = useState<RegistryItem | null>(null)
  const [hasSvelteRegistry, setHasSvelteRegistry] = useState(false)

  useEffect(() => {
    if (framework !== 'svelte' || svelteSourceCode) {
      return
    }

    let cancelled = false

    fetch(`/r/svelte/${componentRegistryName}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Svelte registry item unavailable')
        }
        return response.json() as Promise<RegistryItem>
      })
      .then((item) => {
        if (!cancelled) {
          setSvelteRegistryItem(item)
          setHasSvelteRegistry(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSvelteRegistryItem(null)
          setHasSvelteRegistry(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [componentRegistryName, framework, svelteSourceCode])

  // Generate the correct CLI commands for each framework
  const reactCliCommand = installCommand || `npx shadcn@latest add https://boldkit.dev/r/${componentRegistryName}.json`
  const vueCliCommand = `npx shadcn-vue@latest add https://boldkit.dev/r/vue/${componentRegistryName}.json`
  const svelteCliCommand = `npx shadcn-svelte@latest add https://boldkit.dev/r/svelte/${componentRegistryName}.json`
  const svelteRegistrySourceCode = svelteRegistryItem?.files?.map((file) => file.content).filter(Boolean).join('\n\n') || ''
  const defaultSvelteUsageCode = `<script lang="ts">
  import { ${name.replace(/\s+/g, '')} } from "$lib/components/ui/${componentRegistryName}"
</script>

<${name.replace(/\s+/g, '')} />`

  const getFrameworkValue = <T,>(values: Record<Framework, T>) => values[framework]

  const currentCliCommand = getFrameworkValue({
    react: reactCliCommand,
    vue: vueCliCommand,
    svelte: svelteCliCommand,
  })
  const currentSourceCode = getFrameworkValue({
    react: sourceCode,
    vue: vueSourceCode || sourceCode,
    svelte: svelteSourceCode || svelteRegistrySourceCode || sourceCode,
  })
  const currentUsageCode = getFrameworkValue({
    react: usageCode,
    vue: vueUsageCode || usageCode,
    svelte: svelteUsageCode || defaultSvelteUsageCode,
  })
  const currentDependencies = getFrameworkValue({
    react: dependencies,
    vue: vueDependencies || dependencies,
    svelte: svelteDependencies || svelteRegistryItem?.dependencies || dependencies,
  })
  const fileExtension = getFrameworkValue({
    react: 'tsx',
    vue: 'vue',
    svelte: 'svelte',
  })
  const programmingLanguage = getFrameworkValue({
    react: 'React',
    vue: 'Vue',
    svelte: 'Svelte',
  })

  const componentSEO = {
    ...getComponentSEO(componentRegistryName, name),
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${name} Component - BoldKit`,
      description: description,
      articleSection: 'Components',
      dependencies: currentDependencies.join(', '),
      proficiencyLevel: 'Beginner',
      programmingLanguage,
      author: {
        '@type': 'Person',
        name: 'Aniruddha Agarwal',
        url: 'https://boldkit.dev'
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0]
    }
  }

  // Check if Vue code is available
  const hasVueCode = !!vueSourceCode
  const hasSvelteCode = !!svelteSourceCode || hasSvelteRegistry

  return (
    <>
      <SEO {...componentSEO} />
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
              <Link to="/components">Components</Link>
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
            <Badge variant="secondary">Component</Badge>
            <OpenInV0Button name={componentRegistryName} />
          </div>
          <FrameworkToggle size="sm" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          {name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
        {framework === 'vue' && !hasVueCode && (
          <div className="mt-4 p-3 border-3 border-info bg-info/10">
            <p className="text-sm font-medium flex items-center gap-2">
              <VueIcon /> Vue code sample coming soon. The component is available in the registry.
            </p>
          </div>
        )}
        {framework === 'svelte' && !hasSvelteCode && (
          <div className="mt-4 p-3 border-3 border-warning bg-warning/10">
            <p className="text-sm font-medium flex items-center gap-2">
              <SvelteIcon /> Svelte code sample coming soon.
            </p>
          </div>
        )}
        {framework === 'vue' && nuxtClientOnly && (
          <div className="mt-4 p-3 border-3 border-warning bg-warning/10">
            <p className="text-sm font-medium">
              <strong>Nuxt:</strong> This component requires <code className="bg-muted px-1 border mx-1">&lt;ClientOnly&gt;</code> wrapper for SSR compatibility.
            </p>
            <pre className="mt-2 text-xs bg-muted p-2 border overflow-x-auto">
              <code>{`<ClientOnly>\n  <${name.replace(/\s+/g, '')}>\n    ...\n  </${name.replace(/\s+/g, '')}>\n</ClientOnly>`}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Preview */}
      <Card>
        <CardHeader className="bg-primary border-b-3 border-foreground flex flex-row items-center justify-between">
          <CardTitle>Preview</CardTitle>
          <OpenInV0Button name={componentRegistryName} />
        </CardHeader>
        <CardContent className="relative pt-8 pb-8 overflow-hidden">
          <div className="grid-pattern absolute inset-0 opacity-30" />
          <div className="relative">
            {children}
          </div>
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
            <InstallCommand command={currentCliCommand} />
            {framework === 'vue' && (
              <p className="text-sm text-muted-foreground">
                Using <a href="https://shadcn-vue.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">shadcn-vue</a> CLI with BoldKit Vue registry.
              </p>
            )}
            {framework === 'svelte' && (
              <p className="text-sm text-muted-foreground">
                Using <a href="https://www.shadcn-svelte.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">shadcn-svelte</a> CLI with BoldKit Svelte registry.
              </p>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {currentDependencies.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-2">
                  Install the required dependencies:
                </p>
                <InstallCommand command={`npm install ${currentDependencies.join(' ')}`} />
              </div>
            )}
            <div>
              <p className="text-muted-foreground mb-2">
                Copy and paste the following code into{' '}
                <code className="bg-muted px-1 border text-sm">
                  src/components/ui/{name.toLowerCase().replace(/\s+/g, '-')}.{fileExtension}
                </code>
              </p>
              <CodeBlock code={currentSourceCode} language={fileExtension} />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Usage</h2>
        <CodeBlock code={currentUsageCode} language={fileExtension} />
      </section>
    </div>
    </>
  )
}

interface ExampleSectionProps {
  title: string
  description?: string
  children: ReactNode
  code: string
  vueCode?: string
  svelteCode?: string
}

export function ExampleSection({ title, description, children, code, vueCode, svelteCode }: ExampleSectionProps) {
  const { framework } = useFramework()
  const currentCode = framework === 'react' ? code : framework === 'vue' ? (vueCode || code) : (svelteCode || '<!-- Svelte example coming soon. -->')
  const language = framework === 'react' ? 'tsx' : framework === 'vue' ? 'vue' : 'svelte'

  return (
    <section className="mt-12">
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
          <CodeBlock code={currentCode} language={language} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
