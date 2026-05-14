import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { join, basename } from 'path'

const ROOT = join(import.meta.dir, '..')
const docsDir = join(ROOT, 'src/pages/docs')
const uiDir = join(ROOT, 'src/components/ui')
const chartDir = join(ROOT, 'src/components/ui/chart')
const vueUiDir = join(ROOT, 'packages/vue/src/components/ui')

// PascalCase → kebab-case
function toKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function findReactPath(componentName: string): string | null {
  const kebab = toKebab(componentName)
  // Direct match in ui/
  if (existsSync(join(uiDir, `${kebab}.tsx`))) return `@/components/ui/${kebab}.tsx`
  // Match in chart/
  if (existsSync(join(chartDir, `${kebab}.tsx`))) return `@/components/ui/chart/${kebab}.tsx`
  // Try without -chart suffix for chart dir (e.g. "Sparkline" -> sparkline.tsx)
  if (existsSync(join(uiDir, 'chart', `${kebab}.tsx`))) return `@/components/ui/chart/${kebab}.tsx`
  return null
}

function findVuePath(componentName: string): string | null {
  // Vue components use PascalCase filenames
  if (existsSync(join(vueUiDir, `${componentName}.vue`))) return `@vue-ui/${componentName}.vue`
  return null
}

// Find end of template literal starting at backtick index
function findTemplateEnd(src: string, start: number): number {
  let i = start + 1
  while (i < src.length) {
    if (src[i] === '\\') { i += 2; continue }
    if (src[i] === '`') return i
    i++
  }
  return -1
}

function processFile(filePath: string): { changed: boolean; imports: string[] } {
  const fileName = basename(filePath, '.tsx')
  const componentName = fileName.replace(/Doc$/, '')
  let source = readFileSync(filePath, 'utf8')
  const newImports: string[] = []

  // Process sourceCode
  const reactPath = findReactPath(componentName)
  const sourceCodeMarker = '\nconst sourceCode = `'
  let scIdx = source.indexOf(sourceCodeMarker)
  if (scIdx !== -1 && reactPath) {
    const backtickStart = scIdx + sourceCodeMarker.length - 1
    const backtickEnd = findTemplateEnd(source, backtickStart)
    if (backtickEnd !== -1) {
      source = source.slice(0, scIdx) + source.slice(backtickEnd + 1)
      newImports.push(`import sourceCode from '${reactPath}?raw'`)
    }
  }

  // Process vueSourceCode
  const vuePath = findVuePath(componentName)
  const vueMarker = '\nconst vueSourceCode = `'
  let vIdx = source.indexOf(vueMarker)
  if (vIdx !== -1 && vuePath) {
    const backtickStart = vIdx + vueMarker.length - 1
    const backtickEnd = findTemplateEnd(source, backtickStart)
    if (backtickEnd !== -1) {
      source = source.slice(0, vIdx) + source.slice(backtickEnd + 1)
      newImports.push(`import vueSourceCode from '${vuePath}?raw'`)
    }
  }

  if (newImports.length === 0) {
    console.log(`  skip  ${fileName}`)
    return { changed: false, imports: [] }
  }

  // Insert imports after last existing import line
  const lines = source.split('\n')
  let lastImportLine = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) lastImportLine = i
  }

  if (lastImportLine === -1) lastImportLine = 0

  // Insert after the last import
  lines.splice(lastImportLine + 1, 0, ...newImports)
  source = lines.join('\n')

  writeFileSync(filePath, source, 'utf8')
  console.log(`  ✓     ${fileName}: ${newImports.length} import(s)`)
  return { changed: true, imports: newImports }
}

console.log('Migrating doc sources to ?raw imports...\n')
const files = readdirSync(docsDir)
  .filter(f => f.endsWith('Doc.tsx'))
  .sort()
  .map(f => join(docsDir, f))

let count = 0
for (const f of files) {
  const result = processFile(f)
  if (result.changed) count++
}
console.log(`\nDone: ${count}/${files.length} files migrated.`)
