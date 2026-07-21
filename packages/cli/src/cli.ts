import { spawn } from 'node:child_process'
import {
  buildInstallCommand,
  detectFramework,
  loadCatalog,
  searchCatalog,
  type Framework,
} from '@boldkit/mcp'

const USAGE = `boldkit — neubrutalism UI components for React & Vue

Usage:
  npx boldkit add <component...>   Install components via shadcn / shadcn-vue
  npx boldkit list                 List every registry item
  npx boldkit search <query...>    Search components by description

Options:
  --react | --vue    Force framework (default: auto-detect from package.json)
  --dry-run          Print the install command without running it (add only)
`

export interface ParsedArgs {
  command: string | undefined
  names: string[]
  framework?: Framework
  dryRun: boolean
}

export function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = []
  let framework: Framework | undefined
  let dryRun = false
  for (const arg of argv) {
    if (arg === '--react') framework = 'react'
    else if (arg === '--vue') framework = 'vue'
    else if (arg === '--dry-run') dryRun = true
    else if (!arg.startsWith('-')) positional.push(arg)
  }
  const [command, ...names] = positional
  return { command, names, framework, dryRun }
}

function resolveFramework(args: ParsedArgs): Framework {
  if (args.framework) return args.framework
  const detected = detectFramework(process.cwd())
  console.log(`→ ${detected.framework} (${detected.reason})`)
  return detected.framework
}

export async function run(argv: string[]): Promise<number> {
  const args = parseArgs(argv)

  switch (args.command) {
    case 'add': {
      if (args.names.length === 0) {
        console.error('Nothing to add. Try: npx boldkit add button')
        return 1
      }
      const framework = resolveFramework(args)
      const cmd = buildInstallCommand(args.names, framework)
      for (const name of cmd.unknown) console.error(`✗ unknown component: ${name}`)
      for (const name of cmd.unavailable) console.error(`✗ not available for ${framework}: ${name}`)
      if (cmd.items.length === 0) return 1
      console.log(`$ ${cmd.display}`)
      if (args.dryRun) return 0
      const [bin, ...rest] = cmd.argv
      return new Promise((resolve) => {
        // stdio inherit — the shadcn CLI stays interactive (prompts, spinners)
        const child = spawn(bin, rest, { stdio: 'inherit', shell: process.platform === 'win32' })
        child.on('error', (err) => {
          console.error(String(err))
          resolve(1)
        })
        child.on('close', (code) => resolve(code ?? 1))
      })
    }

    case 'list': {
      let items = loadCatalog()
      if (args.framework) items = items.filter((i) => i.frameworks.includes(args.framework!))
      for (const item of items) {
        console.log(`${item.name.padEnd(28)} [${item.frameworks.join(', ')}] ${item.description}`)
      }
      console.log(`\n${items.length} items`)
      return 0
    }

    case 'search': {
      if (args.names.length === 0) {
        console.error('Nothing to search. Try: npx boldkit search "toast notification"')
        return 1
      }
      const results = searchCatalog(args.names.join(' '), args.framework)
      if (results.length === 0) {
        console.log('No matches. Try broader keywords, or `npx boldkit list`.')
        return 0
      }
      for (const item of results) {
        console.log(`${item.name.padEnd(28)} [${item.frameworks.join(', ')}] ${item.description}`)
      }
      return 0
    }

    default:
      console.log(USAGE)
      return args.command === undefined || args.command === 'help' ? 0 : 1
  }
}
