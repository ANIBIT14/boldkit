import { readFileSync } from 'node:fs'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { getItem, loadCatalog, searchCatalog, type Framework } from './catalog.js'
import { buildInstallCommand } from './commands.js'
import { detectFramework } from './detect.js'
import { runInstall } from './install.js'

const VERSION = (
  JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
    version: string
  }
).version

const frameworkSchema = z
  .enum(['react', 'vue'])
  .optional()
  .describe('Target framework. Omit to auto-detect from the project package.json.')

type ToolResult = { content: { type: 'text'; text: string }[] }

// server.tool()'s generic inference hits TS2589 (excessively deep instantiation)
// with zod 3.25 optional-enum shapes. This helper erases the generic; runtime
// zod validation by the SDK is unchanged, handlers type their args explicitly.
function registerTool<Args>(
  server: McpServer,
  name: string,
  description: string,
  shape: z.ZodRawShape,
  handler: (args: Args) => Promise<ToolResult>
): void {
  ;(
    server.tool as unknown as (
      name: string,
      description: string,
      shape: z.ZodRawShape,
      handler: (args: Args) => Promise<ToolResult>
    ) => void
  )(name, description, shape, handler)
}

function json(data: unknown): ToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
}

function summarize(item: ReturnType<typeof loadCatalog>[number]) {
  return {
    name: item.name,
    type: item.type,
    description: item.description,
    frameworks: item.frameworks,
  }
}

export function createServer(): McpServer {
  const server = new McpServer({ name: 'boldkit', version: VERSION })

  registerTool<{ query: string; framework?: Framework }>(
    server,
    'search_components',
    'Search BoldKit neubrutalism UI components, charts, shapes, and blocks by natural-language description. Returns ranked matches with framework availability (react/vue).',
    {
      query: z.string().describe('Natural-language description, e.g. "toast notification" or "chart showing proportions"'),
      framework: frameworkSchema,
    },
    async ({ query, framework }) => {
      const results = searchCatalog(query, framework)
      if (results.length === 0) {
        return json({ results: [], hint: 'No matches. Try broader keywords, or list_components.' })
      }
      return json({ results: results.map((r) => ({ ...summarize(r), score: r.score })) })
    }
  )

  registerTool<{ name: string }>(
    server,
    'get_component',
    'Get full details for a BoldKit component: description, dependencies, registry URLs per framework, files, and docs link.',
    { name: z.string().describe('Component name, e.g. "button" or "date-range-picker"') },
    async ({ name }) => {
      const item = getItem(name)
      if (!item) {
        const near = searchCatalog(name).slice(0, 5).map((r) => r.name)
        return json({ error: `Unknown component "${name}"`, didYouMean: near })
      }
      return json(item)
    }
  )

  registerTool<{ names: string[]; framework?: Framework; projectDir?: string }>(
    server,
    'get_install_command',
    'Get the exact shadcn / shadcn-vue CLI command to install BoldKit components into a project. Auto-detects React vs Vue from the project directory unless framework is given.',
    {
      names: z.array(z.string()).min(1).describe('Component names to install'),
      framework: frameworkSchema,
      projectDir: z.string().optional().describe('Project directory used for framework auto-detection. Defaults to the current working directory.'),
    },
    async ({ names, framework, projectDir }) => {
      const detected = framework
        ? { framework, reason: 'explicitly requested' }
        : detectFramework(projectDir ?? process.cwd())
      const cmd = buildInstallCommand(names, detected.framework)
      return json({
        framework: detected.framework,
        frameworkReason: detected.reason,
        command: cmd.display,
        unknown: cmd.unknown,
        unavailable: cmd.unavailable,
      })
    }
  )

  registerTool<{ names: string[]; framework?: Framework; projectDir: string }>(
    server,
    'install_components',
    'Install BoldKit components into a project by running the shadcn / shadcn-vue CLI. Returns the CLI output.',
    {
      names: z.array(z.string()).min(1).describe('Component names to install'),
      framework: frameworkSchema,
      projectDir: z.string().describe('Absolute path of the project to install into'),
    },
    async ({ names, framework, projectDir }) => {
      const detected = framework
        ? { framework, reason: 'explicitly requested' }
        : detectFramework(projectDir)
      const cmd = buildInstallCommand(names, detected.framework)
      if (cmd.unknown.length > 0 || cmd.items.length === 0) {
        return json({
          error: 'Nothing installable',
          unknown: cmd.unknown,
          unavailable: cmd.unavailable,
        })
      }
      const result = await runInstall(cmd, projectDir)
      return json({
        framework: detected.framework,
        command: cmd.display,
        installed: result.ok ? cmd.items.map((i) => i.name) : [],
        skipped: { unknown: cmd.unknown, unavailable: cmd.unavailable },
        ok: result.ok,
        exitCode: result.exitCode,
        output: result.output,
      })
    }
  )

  registerTool<{ framework?: Framework }>(
    server,
    'list_components',
    'List every item in the BoldKit registry (components, charts, shapes, blocks, templates), optionally filtered by framework.',
    { framework: frameworkSchema },
    async ({ framework }) => {
      let items = loadCatalog()
      if (framework) items = items.filter((item) => item.frameworks.includes(framework))
      return json({ count: items.length, items: items.map(summarize) })
    }
  )

  return server
}

export async function startServer(): Promise<void> {
  const server = createServer()
  await server.connect(new StdioServerTransport())
  console.error(`boldkit mcp v${VERSION} — ${loadCatalog().length} registry items ready`)
}
