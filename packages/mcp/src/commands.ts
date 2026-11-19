import { getItem, type CatalogItem, type Framework } from './catalog.js'

export interface InstallCommand {
  framework: Framework
  /** Executable + args, e.g. ["npx", "shadcn@latest", "add", "<url>"] */
  argv: string[]
  /** Copy-pasteable command string */
  display: string
  items: CatalogItem[]
  /** Names not present in the catalog at all */
  unknown: string[]
  /** Names that exist but are not available for this framework */
  unavailable: string[]
}

const CLI: Record<Framework, string> = {
  react: 'shadcn@latest',
  vue: 'shadcn-vue@latest',
}

export function buildInstallCommand(names: string[], framework: Framework): InstallCommand {
  const items: CatalogItem[] = []
  const unknown: string[] = []
  const unavailable: string[] = []

  for (const name of names) {
    const item = getItem(name)
    if (!item) unknown.push(name)
    else if (!item[framework]) unavailable.push(name)
    else items.push(item)
  }

  // A registry:base item (the `boldkit` preset) sets up the project, so it goes
  // through `init` — which also accepts extra items — and must come first.
  items.sort((a, b) => Number(b.type === 'registry:base') - Number(a.type === 'registry:base'))
  const verb = items[0]?.type === 'registry:base' ? 'init' : 'add'
  const urls = items.map((item) => item[framework]!.url)
  const argv = ['npx', CLI[framework], verb, ...urls]
  return {
    framework,
    argv,
    display: ['npx', CLI[framework], verb, ...urls.map((u) => `"${u}"`)].join(' '),
    items,
    unknown,
    unavailable,
  }
}
