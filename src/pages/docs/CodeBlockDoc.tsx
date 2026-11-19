import { FileCode2, Terminal } from 'lucide-react'
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
} from '@/components/ui/code-block'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/code-block.tsx?raw'
import vueVariantsSource from '@vue-ui/code-block-variants.ts?raw'
import vueRootSource from '@vue-ui/CodeBlock.vue?raw'
import vueHeaderSource from '@vue-ui/CodeBlockHeader.vue?raw'
import vueTitleSource from '@vue-ui/CodeBlockTitle.vue?raw'
import vueActionsSource from '@vue-ui/CodeBlockActions.vue?raw'
import vueCopySource from '@vue-ui/CodeBlockCopyButton.vue?raw'
import vueContentSource from '@vue-ui/CodeBlockContent.vue?raw'
import vueLineSource from '@vue-ui/CodeBlockLine.vue?raw'
import vueFooterSource from '@vue-ui/CodeBlockFooter.vue?raw'

const vueSourceCode = [
  ['code-block-variants.ts', vueVariantsSource],
  ['CodeBlock.vue', vueRootSource],
  ['CodeBlockHeader.vue', vueHeaderSource],
  ['CodeBlockTitle.vue', vueTitleSource],
  ['CodeBlockActions.vue', vueActionsSource],
  ['CodeBlockCopyButton.vue', vueCopySource],
  ['CodeBlockContent.vue', vueContentSource],
  ['CodeBlockLine.vue', vueLineSource],
  ['CodeBlockFooter.vue', vueFooterSource],
]
  .map(([file, source]) => `<!-- ${file} -->\n${source}`)
  .join('\n')

const snippet = `export function greet(name: string) {
  return \`Hello, \${name}!\`
}

greet('BoldKit')`

const usageCode = `import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/components/ui/code-block'

const code = \`export function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`
}\`

export default function Example() {
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>greet.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
    </CodeBlock>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue'
import CodeBlockActions from '@/components/ui/CodeBlockActions.vue'
import CodeBlockContent from '@/components/ui/CodeBlockContent.vue'
import CodeBlockCopyButton from '@/components/ui/CodeBlockCopyButton.vue'
import CodeBlockHeader from '@/components/ui/CodeBlockHeader.vue'
import CodeBlockTitle from '@/components/ui/CodeBlockTitle.vue'

const code = \`export function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`
}\`
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>greet.ts</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton :value="code" />
      </CodeBlockActions>
    </CodeBlockHeader>
    <!-- Vue: pass plain text through \`code\`; the slot takes your own markup -->
    <CodeBlockContent :code="code" line-numbers />
  </CodeBlock>
</template>`

const terminal = `$ bun run build
vite v8.0.3 building for production...
✓ 2140 modules transformed.
dist/index.html   1.2 kB
✓ built in 4.81s`

const diff: { variant?: 'added' | 'removed'; text: string }[] = [
  { text: 'export function Button({ size }: ButtonProps) {' },
  { variant: 'removed', text: "  const height = size === 'sm' ? 36 : 44" },
  { variant: 'added', text: "  const height = sizes[size ?? 'default']" },
  { text: '  return <button style={{ height }} />' },
  { text: '}' },
]

const errorLog = `$ bun dev
error: listen EADDRINUSE: address already in use :::5173
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`

export function CodeBlockDoc() {
  return (
    <>
      <ComponentDoc
        name="Code Block"
        registryName="code-block"
        description="Code, terminal output, logs and diffs in a bordered slab: a header with title and actions, a copy button, line numbers, wrapping, and added / removed / highlighted lines. The small size is made for tool output nested in a Trace. Bring your own highlighter — CodeBlockContent renders plain text or whatever markup you pass it."
        dependencies={['lucide-react', 'class-variance-authority']}
        vueDependencies={['@lucide/vue', 'class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <CodeBlock className="max-w-xl">
          <CodeBlockHeader>
            <CodeBlockTitle>
              <FileCode2 aria-hidden="true" />
              greet.ts
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={snippet} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers>{snippet}</CodeBlockContent>
        </CodeBlock>
      </ComponentDoc>

      <ExampleSection
        title="Terminal"
        description="Without a header, put CodeBlockActions straight inside the block: it floats over the corner and shows on hover or focus (always on touch screens). A footer carries status."
        code={`<CodeBlock>
  <CodeBlockActions>
    <CodeBlockCopyButton value={output} />
  </CodeBlockActions>
  <CodeBlockContent>{output}</CodeBlockContent>
  <CodeBlockFooter>
    <Terminal /> Exit 0 · 4.81s
  </CodeBlockFooter>
</CodeBlock>`}
        vueCode={`<template>
  <CodeBlock>
    <CodeBlockActions>
      <CodeBlockCopyButton :value="output" />
    </CodeBlockActions>
    <CodeBlockContent :code="output" />
    <CodeBlockFooter>
      <Terminal /> Exit 0 · 4.81s
    </CodeBlockFooter>
  </CodeBlock>
</template>`}
      >
        <CodeBlock className="max-w-xl">
          <CodeBlockActions>
            <CodeBlockCopyButton value={terminal} />
          </CodeBlockActions>
          <CodeBlockContent>{terminal}</CodeBlockContent>
          <CodeBlockFooter>
            <Terminal aria-hidden="true" className="size-3.5" /> Exit 0 · 4.81s
          </CodeBlockFooter>
        </CodeBlock>
      </ExampleSection>

      <ExampleSection
        title="Diff"
        description="Compose CodeBlockLine yourself for diffs and highlights. Added and removed lines get a thick left bar, a tint, and a screen-reader prefix that stays out of copied text."
        code={`<CodeBlock>
  <CodeBlockContent lineNumbers>
    <CodeBlockLine>{'export function Button({ size }: ButtonProps) {'}</CodeBlockLine>
    <CodeBlockLine variant="removed">{"  const height = size === 'sm' ? 36 : 44"}</CodeBlockLine>
    <CodeBlockLine variant="added">{"  const height = sizes[size ?? 'default']"}</CodeBlockLine>
    <CodeBlockLine>{'  return <button style={{ height }} />'}</CodeBlockLine>
    <CodeBlockLine>{'}'}</CodeBlockLine>
  </CodeBlockContent>
</CodeBlock>`}
        vueCode={`<template>
  <CodeBlock>
    <CodeBlockContent line-numbers>
      <CodeBlockLine>export function Button({ size }: ButtonProps) {</CodeBlockLine>
      <CodeBlockLine variant="removed">  const height = size === 'sm' ? 36 : 44</CodeBlockLine>
      <CodeBlockLine variant="added">  const height = sizes[size ?? 'default']</CodeBlockLine>
      <CodeBlockLine>  return &lt;button :style="{ height }" /&gt;</CodeBlockLine>
      <CodeBlockLine>}</CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>`}
      >
        <CodeBlock className="max-w-xl">
          <CodeBlockHeader>
            <CodeBlockTitle>button.tsx</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent lineNumbers startLine={12}>
            {diff.map((line, i) => (
              <CodeBlockLine key={i} variant={line.variant}>
                {line.text}
              </CodeBlockLine>
            ))}
          </CodeBlockContent>
        </CodeBlock>
      </ExampleSection>

      <ExampleSection
        title="Error output, small"
        description='variant="destructive" turns the header red; size="sm" thins the border and shadow for nesting in a Trace. wrap breaks long lines instead of scrolling.'
        code={`<CodeBlock size="sm" variant="destructive">
  <CodeBlockHeader>
    <CodeBlockTitle>Exit 1</CodeBlockTitle>
  </CodeBlockHeader>
  <CodeBlockContent wrap>{log}</CodeBlockContent>
</CodeBlock>`}
        vueCode={`<template>
  <CodeBlock size="sm" variant="destructive">
    <CodeBlockHeader>
      <CodeBlockTitle>Exit 1</CodeBlockTitle>
    </CodeBlockHeader>
    <CodeBlockContent :code="log" wrap />
  </CodeBlock>
</template>`}
      >
        <CodeBlock size="sm" variant="destructive" className="max-w-md">
          <CodeBlockHeader>
            <CodeBlockTitle>Exit 1</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent wrap>{errorLog}</CodeBlockContent>
        </CodeBlock>
      </ExampleSection>
    </>
  )
}
