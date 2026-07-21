# boldkit

CLI for [BoldKit](https://boldkit.dev) — neubrutalism UI components for React and Vue 3.

```bash
npx boldkit add button card dialog   # install components (auto-detects React vs Vue)
npx boldkit search "toast"           # find components by description
npx boldkit list                     # everything in the registry
```

Flags: `--react` / `--vue` force the framework, `--dry-run` prints the underlying
`shadcn` / `shadcn-vue` command without running it.

Prefer an AI agent doing the installing? See [`@boldkit/mcp`](https://www.npmjs.com/package/@boldkit/mcp).

## License

MIT
