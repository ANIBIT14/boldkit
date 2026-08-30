import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  // `.claude` holds agent scratch — including stale git worktrees (e.g.
  // .claude/worktrees/fix-audit-2026-05-22) that are whole second copies of
  // the repo. Linting them reported 76 duplicate errors against code that
  // isn't shipped. `.worktrees` was already ignored; this covers the other path.
  globalIgnores(['dist', '.worktrees', '.claude', 'registry']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Underscore-prefixed bindings are the codebase's existing marker for
      // "deliberately unused" (required positional params, destructured
      // rest-omits, ignored catch bindings). Honour it instead of reporting them.
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
    },
  },
  {
    // packages/vue TS files (composables, tests) are Vue, not React — the
    // React-only rules from the base .ts block are false positives here
    // (e.g. `useTheme()` in a Vue `setup()` is not a React hook violation).
    files: ['packages/vue/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['packages/vue/**/*.vue'],
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    extends: [
      js.configs.recommended,
      ...vuePlugin.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript already reports undefined identifiers, and it understands
      // bundler-replaced globals like `process.env.NODE_ENV` that the browser
      // globals list doesn't carry. tseslint turns this off for .ts files for
      // the same reason — which is why the React ErrorBoundary using the exact
      // same expression was never flagged.
      'no-undef': 'off',
      // These SFCs are TypeScript, so the plain-JS rule mis-reads type syntax:
      // it treated the parameter names inside `PropType<(id: string) => void>`
      // and `isDateUnavailable?: (date: DateValue) => boolean` as unused runtime
      // params — 54 false positives. Renaming them to `_id` would have silenced
      // it while making the types less readable. Use the TS-aware rule instead.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
      // This is a component library: `Button.vue`, `Card.vue`, `Alert.vue` are
      // the public API, and consumers write <Button />. The rule exists to stop
      // app components colliding with current or future HTML elements, which
      // doesn't apply to a namespaced UI kit installed via the shadcn CLI.
      'vue/multi-word-component-names': 'off',
    },
  },
])
