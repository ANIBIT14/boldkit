import { SITE_URL, COUNTS } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const TOC = [
  { id: 'answer', label: 'The short answer' },
  { id: 'setup', label: 'Connect it' },
  { id: 'tools', label: 'What the agent can do' },
  { id: 'why', label: 'Why an MCP server beats pasting docs' },
  { id: 'cli', label: 'Prefer a plain CLI?' },
  { id: 'limits', label: 'Limits' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'What is an MCP server for UI components?',
    answer:
      'Model Context Protocol is an open standard that lets AI coding agents call external tools. An MCP server for a component library exposes search and install operations, so instead of guessing component names from training data, the agent queries the real catalogue and gets back accurate names, dependencies and install commands.',
  },
  {
    question: 'How do I add BoldKit to Claude Code or Cursor?',
    answer:
      'Add @boldkit/mcp as an MCP server in your client config, pointing at npx -y @boldkit/mcp. It runs over stdio and needs no API key or account. Claude Code, Cursor, Windsurf and any other MCP-capable client use the same package.',
  },
  {
    question: 'Does the agent write files to my project?',
    answer:
      'Only if you ask it to. Searching and getting an install command are read-only. There is a separate install tool that shells out to the shadcn or shadcn-vue CLI in a directory you specify — that one writes files, and your client will normally ask for approval first.',
  },
  {
    question: 'Does it detect React vs Vue automatically?',
    answer:
      'Yes. It walks up from the directory you point it at to the nearest package.json and looks for nuxt, vue or reka-ui first, then next or react, and picks the matching registry. You can override it explicitly if the detection guesses wrong in a monorepo.',
  },
]

export function McpUiComponents() {
  return (
    <SeoArticleLayout
      eyebrow="AI tooling"
      title="Install UI Components With AI"
      lede="Coding agents are confidently wrong about component libraries — they invent prop names and hallucinate components that never existed. An MCP server fixes that by letting the agent read the actual catalogue."
      accent="#FF6B35"
      updated="August 2026"
      toc={TOC}
      seo={{
        title: 'MCP Server for UI Components — Install with Claude Code & Cursor | BoldKit',
        description:
          'Give your AI coding agent a real component catalogue. The BoldKit MCP server exposes search, component details and install commands for React and Vue, so agents stop hallucinating component names.',
        canonical: `${SITE_URL}/mcp-ui-components`,
        keywords:
          'mcp server ui components, model context protocol components, claude code component library, cursor mcp ui, ai component install, shadcn mcp server, ai ui component generator',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'MCP Server' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="answer" title="The short answer">
        <p>
          <code>@boldkit/mcp</code> is a Model Context Protocol server that exposes the BoldKit
          catalogue to any MCP-capable coding agent. The agent searches real components by description,
          reads their real dependencies, and produces an install command that actually works — for
          React or Vue.
        </p>
        <Callout title="One line to connect it" tone="#FF6B35">
          <code>npx -y @boldkit/mcp</code>
          <br />
          Runs over stdio. No API key, no account, no telemetry.
        </Callout>
        <p>
          The problem it solves is specific. Ask an agent for &ldquo;a neubrutalist date range
          picker&rdquo; without tool access and it will confidently produce an import path that does
          not exist, props that were never in the API, and an install command for a package name it
          invented. Not because the model is bad — because it is recalling a library it saw in
          training rather than reading the one you are using.
        </p>
      </Section>

      <Section id="setup" title="Connect it">
        <p>
          Every MCP client uses the same package; only the config file location differs. The server
          entry looks like this:
        </p>
        <Callout title="Server config" tone="#FF6B35">
          <code>
            {'{ "mcpServers": { "boldkit": { "command": "npx", "args": ["-y", "@boldkit/mcp"] } } }'}
          </code>
        </Callout>
        <ul className="ml-1 space-y-2">
          <li><strong>Claude Code</strong> — add it as an MCP server in your project or user config.</li>
          <li><strong>Cursor / Windsurf</strong> — the same entry in the editor&rsquo;s MCP settings.</li>
          <li><strong>Anything else MCP-capable</strong> — stdio transport, no bespoke setup.</li>
        </ul>
        <p>
          The catalogue ships inside the package, so the tools work offline. Installing components
          still needs network, because that step shells out to the shadcn CLI.
        </p>
      </Section>

      <Section id="tools" title="What the agent can do">
        <DataGrid
          headers={['Tool', 'What it does', 'Writes files?']}
          rows={[
            ['search_components', 'Ranked search by natural-language description across the catalogue', 'No'],
            ['get_component', 'Full detail for one item — dependencies, registry URLs per framework, files, docs link', 'No'],
            ['list_components', 'Every installable item, optionally filtered by framework', 'No'],
            ['get_install_command', 'The exact CLI command, with React/Vue auto-detected from your package.json', 'No'],
            ['install_components', 'Runs the shadcn or shadcn-vue CLI in a directory you name', 'Yes'],
          ]}
        />
        <p>
          Four of the five are read-only, which matters — an agent can explore the whole catalogue and
          propose a plan before anything touches your repo.
        </p>
        <Callout title="Framework detection" tone="#FF6B35">
          The server walks up to the nearest <code>package.json</code> and checks for{' '}
          <code>nuxt</code>, <code>vue</code> or <code>reka-ui</code> before <code>next</code> or{' '}
          <code>react</code>, then targets the matching registry. In a monorepo where that guesses
          wrong, pass the framework explicitly.
        </Callout>
      </Section>

      <Section id="why" title="Why an MCP server beats pasting docs">
        <p>
          The common workaround is pasting documentation into context, or pointing the agent at an
          llms.txt. Both help. Neither is the same thing:
        </p>
        <DataGrid
          headers={['', 'Pasting docs', 'MCP server']}
          rows={[
            ['Accuracy', 'Only as fresh as what you pasted', 'Reads the catalogue shipped with the package'],
            ['Context cost', 'Whole documents in context', 'One query, one small result'],
            ['Coverage', 'Whatever you remembered to paste', `All ${COUNTS.components}+ items, both frameworks`],
            ['Install', 'Agent guesses the command', 'Command generated from real registry URLs'],
            ['Framework', 'You have to say which', 'Detected from your project'],
          ]}
        />
        <p>
          BoldKit publishes an <code>llms.txt</code> too, and for one-off questions it is genuinely
          fine. The MCP server matters when the agent needs to do something — pick between similar
          components, resolve dependencies, and run the right CLI for the framework it is actually
          looking at.
        </p>
      </Section>

      <Section id="cli" title="Prefer a plain CLI?">
        <p>
          Same catalogue, no agent involved. The <code>boldkit</code> CLI wraps the same search and
          install logic for humans:
        </p>
        <ul className="ml-1 space-y-2">
          <li><code>npx boldkit search &quot;toast notification&quot;</code> — ranked matches with framework availability.</li>
          <li><code>npx boldkit list</code> — the whole catalogue.</li>
          <li><code>npx boldkit add button card</code> — installs via the right CLI, framework auto-detected.</li>
          <li><code>npx boldkit add button --vue --dry-run</code> — print the command without running it.</li>
        </ul>
      </Section>

      <Section id="limits" title="Limits">
        <p>Worth knowing before you wire it in:</p>
        <ul className="ml-1 space-y-2">
          <li>
            <strong>Blocks and templates are not in the catalogue.</strong> They are copy-paste from
            their docs pages, not registry items, so the agent cannot install a hero section. Ask it
            for the docs URL instead.
          </li>
          <li>
            <strong>Search is keyword scoring, not semantic.</strong> It ranks well over roughly a
            hundred items, but very oblique phrasing may need a second try.
          </li>
          <li>
            <strong>The install tool runs a real CLI.</strong> It is non-interactive and passes{' '}
            <code>--yes</code>, so point it at a directory under version control.
          </li>
          <li>
            <strong>The catalogue is pinned to the published package version.</strong> Update{' '}
            <code>@boldkit/mcp</code> to pick up newly added components.
          </li>
        </ul>
      </Section>

      <CTABox
        title="Add it to your agent"
        body="One config entry, no key, no account. Then ask your agent for a component and watch it install the real thing."
        href="https://www.npmjs.com/package/@boldkit/mcp"
        cta="View on npm"
        external
        tone="#FF6B35"
      />

      <LinkCards
        items={[
          { to: '/components', label: 'Browse components', desc: `The same ${COUNTS.components}+ items the agent searches.` },
          { to: '/docs', label: 'Install guide', desc: 'Manual setup for React and Vue.' },
          { to: '/vue-ui-components', label: 'Vue components', desc: 'The Vue registry the server targets for Vue projects.' },
          { to: '/shadcn-alternatives', label: 'shadcn alternatives', desc: 'Where BoldKit sits in the wider ecosystem.' },
        ]}
      />
    </SeoArticleLayout>
  )
}
