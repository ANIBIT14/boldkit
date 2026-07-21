import { useState } from 'react'
import { Copy, Check, Terminal, Bot } from 'lucide-react'
import { toast } from 'sonner'
// Brand marks: raster logos shared with vanikya.ai/mcp; Gemini CLI + generic MCP
// fall back to @lobehub/icons-static-svg (MIT, currentColor → theme-aware inline)
import claudeCodeImg from '@/assets/agents/claudecode.webp'
import cursorImg from '@/assets/agents/cursor.webp'
import vscodeImg from '@/assets/agents/vscode.webp'
import windsurfImg from '@/assets/agents/windsurf.png'
import claudeImg from '@/assets/agents/claude.webp'
import codexImg from '@/assets/agents/codex.webp'
import geminiCliSvg from '@lobehub/icons-static-svg/icons/geminicli-color.svg?raw'
import mcpSvg from '@lobehub/icons-static-svg/icons/mcp.svg?raw'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { copyToClipboard } from '@/lib/clipboard'
import { SEO, pageSEO } from '@/components/SEO'
import catalog from '../../../packages/mcp/catalog.json'

const COMPONENT_COUNT = catalog.items.filter((i) => i.type === 'registry:ui').length
const REGISTRY_COUNT = catalog.items.length

function SectionBanner({
  icon,
  name,
  kind,
  stats,
}: {
  icon: React.ReactNode
  name: string
  kind: string
  stats: string[]
}) {
  return (
    <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border-3 border-foreground bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))]">
          {icon}
        </span>
        <div className="space-y-0.5">
          <h2 className="font-mono text-lg font-black tracking-tight">{name}</h2>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {kind}
          </p>
        </div>
      </div>
      <div className="hidden flex-wrap justify-end gap-2 sm:flex">
        {stats.map((stat) => (
          <span
            key={stat}
            className="border-2 border-foreground bg-background px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
          >
            {stat}
          </span>
        ))}
      </div>
    </CardHeader>
  )
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    if (!(await copyToClipboard(code))) return
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4">
      {language && (
        <div className="absolute right-12 top-2 text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 border border-foreground/20">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto border-3 border-foreground bg-muted p-4 pr-12 text-sm bk-shadow">
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 bg-background"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

const MCP_JSON = `{
  "mcpServers": {
    "boldkit": {
      "command": "npx",
      "args": ["-y", "@boldkit/mcp"]
    }
  }
}`

const AGENTS: { id: string; label: string; img?: string; svg?: string; language: string; instructions: string; code: string }[] = [
  {
    id: 'claude-code',
    img: claudeCodeImg,
    label: 'Claude Code',
    language: 'bash',
    instructions: 'Run once in your terminal:',
    code: `claude mcp add boldkit -- npx -y @boldkit/mcp`,
  },
  {
    id: 'cursor',
    img: cursorImg,
    label: 'Cursor',
    language: 'json',
    instructions: 'Add to ~/.cursor/mcp.json (Settings → MCP → Add new global MCP server):',
    code: MCP_JSON,
  },
  {
    id: 'vscode',
    img: vscodeImg,
    label: 'VS Code',
    language: 'bash',
    instructions: 'Run once (VS Code with GitHub Copilot agent mode):',
    code: `code --add-mcp '{"name":"boldkit","command":"npx","args":["-y","@boldkit/mcp"]}'`,
  },
  {
    id: 'windsurf',
    img: windsurfImg,
    label: 'Windsurf',
    language: 'json',
    instructions: 'Add to ~/.codeium/windsurf/mcp_config.json (Settings → Cascade → MCP):',
    code: MCP_JSON,
  },
  {
    id: 'claude-desktop',
    img: claudeImg,
    label: 'Claude Desktop',
    language: 'json',
    instructions: 'Add to claude_desktop_config.json (Settings → Developer → Edit Config):',
    code: MCP_JSON,
  },
  {
    id: 'codex',
    img: codexImg,
    label: 'Codex',
    language: 'bash',
    instructions: 'Run once in your terminal:',
    code: `codex mcp add boldkit -- npx -y @boldkit/mcp`,
  },
  {
    id: 'gemini',
    svg: geminiCliSvg,
    label: 'Gemini CLI',
    language: 'bash',
    instructions: 'Run once in your terminal:',
    code: `gemini mcp add boldkit npx -- -y @boldkit/mcp`,
  },
  {
    id: 'other',
    svg: mcpSvg,
    label: 'Other',
    language: 'json',
    instructions: 'Any MCP client that supports stdio servers — add to its MCP config:',
    code: MCP_JSON,
  },
]

const MCP_TOOLS = [
  ['search_components', 'Natural-language search over the whole registry ("toast notification" → sonner)'],
  ['get_component', 'Full details: dependencies, registry URLs, files, docs link'],
  ['get_install_command', 'Exact shadcn / shadcn-vue command; auto-detects React vs Vue'],
  ['install_components', 'Runs the shadcn CLI for real and returns its output'],
  ['list_components', 'Everything in the registry, optionally per framework'],
]

export function McpCli() {
  return (
    <div className="space-y-8">
      <SEO {...pageSEO.mcp} />
      <div>
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-4xl font-black uppercase tracking-tight">MCP Server & CLI</h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Install BoldKit components from an AI agent or straight from your terminal. Both support
          React <em>and</em> Vue 3, and delegate the actual install to the battle-tested shadcn /
          shadcn-vue CLIs.
        </p>
      </div>

      <Card>
        <SectionBanner
          icon={<Bot className="h-6 w-6" />}
          name="@boldkit/mcp"
          kind="MCP Server"
          stats={[`${REGISTRY_COUNT} registry items`, 'React + Vue', `${MCP_TOOLS.length} tools`]}
        />
        <CardContent>
          <p className="mb-2 text-sm text-muted-foreground">
            An MCP server that lets Claude Code, Cursor, or any MCP client search the BoldKit
            registry by natural language and install components into your project.
          </p>
          <h3 className="mt-6 mb-2 font-bold uppercase text-sm tracking-wide">
            Connect your AI agent
          </h3>
          <p className="mb-2 text-sm text-muted-foreground">
            Pick your client and paste one command or config. Requires Node.js 18+.
          </p>
          <Tabs defaultValue={AGENTS[0].id}>
            <TabsList className="h-auto flex-wrap justify-start">
              {AGENTS.map((agent) => (
                <TabsTrigger key={agent.id} value={agent.id} className="gap-1.5">
                  {agent.img ? (
                    <img src={agent.img} alt="" aria-hidden className="h-4 w-4 object-contain" />
                  ) : (
                    <span
                      aria-hidden
                      className="inline-flex h-4 w-4 items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: agent.svg ?? '' }}
                    />
                  )}
                  {agent.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {AGENTS.map((agent) => (
              <TabsContent key={agent.id} value={agent.id}>
                <p className="mt-2 text-sm text-muted-foreground">{agent.instructions}</p>
                <CodeBlock language={agent.language} code={agent.code} />
                {agent.id === 'cursor' && (
                  <p className="text-sm text-muted-foreground">
                    Or one-click:{' '}
                    <a
                      className="font-semibold underline decoration-2 underline-offset-2"
                      href="https://cursor.com/en-US/install-mcp?name=boldkit&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBib2xka2l0L21jcCJdfQ%3D%3D"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Install in Cursor
                    </a>
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
          <h3 className="mt-6 mb-2 font-bold uppercase text-sm tracking-wide">Tools</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>What it does</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MCP_TOOLS.map(([tool, desc]) => (
                <TableRow key={tool}>
                  <TableCell className="font-mono text-sm">{tool}</TableCell>
                  <TableCell>{desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4 text-sm text-muted-foreground">
            Then just ask your agent: <em>“add a star rating and a toast to this page using
            BoldKit”</em> — it finds the components, detects your framework, and installs them.
          </p>
        </CardContent>
      </Card>

      <Card>
        <SectionBanner
          icon={<Terminal className="h-6 w-6" />}
          name="boldkit"
          kind="Command-line interface"
          stats={[`${COMPONENT_COUNT} components`, 'add · search · list', 'zero config']}
        />
        <CardContent>
          <p className="mb-2 text-sm text-muted-foreground">
            The same registry, from your terminal. Auto-detects React vs Vue from your
            package.json.
          </p>
          <CodeBlock
            language="bash"
            code={`npx boldkit add button card dialog   # install components
npx boldkit search "toast"           # find components by description
npx boldkit list                     # everything in the registry`}
          />
          <p className="text-sm text-muted-foreground">
            Flags: <code className="font-mono">--react</code> /{' '}
            <code className="font-mono">--vue</code> force the framework,{' '}
            <code className="font-mono">--dry-run</code> prints the underlying shadcn command
            without running it.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
