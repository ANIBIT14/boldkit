# @boldkit/mcp

MCP server for [BoldKit](https://boldkit.dev) — search and install neubrutalism UI components (React **and** Vue 3) by natural-language description.

## Setup

**Claude Code**

```bash
claude mcp add boldkit -- npx -y @boldkit/mcp
```

**Cursor / any MCP client** (`mcp.json`):

```json
{
  "mcpServers": {
    "boldkit": {
      "command": "npx",
      "args": ["-y", "@boldkit/mcp"]
    }
  }
}
```

## Tools

| Tool | What it does |
| --- | --- |
| `search_components` | Natural-language search over all 144 registry items — components, charts, shapes, hooks, the 14 theme presets, fonts and the `boldkit` base ("toast notification" → `toast`) |
| `get_component` | Full details: deps, registry URLs, files, docs link |
| `get_install_command` | Exact `shadcn` / `shadcn-vue` command (`init` for the `boldkit` base, `add` otherwise); auto-detects React vs Vue |
| `install_components` | Runs the shadcn CLI for real and returns its output |
| `list_components` | Everything in the registry, optionally per framework |

React installs go through `npx shadcn@latest`, Vue through `npx shadcn-vue@latest` — the same battle-tested resolvers as manual installs.

## License

MIT
