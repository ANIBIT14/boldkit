<script setup lang="ts">
import { ref } from 'vue'
import {
  Search, ChevronRight, ChevronDown, Menu, X, Moon, Sun,
  Copy, Check, ExternalLink, Github, ArrowLeft, ArrowRight,
  BookOpen, Zap, Layers, Code2, Terminal, Info,
} from 'lucide-vue-next'
import {
  Badge,
  Button,
  Input,
} from '@/components/ui'

// ============================================
// DOCS SITE TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// Copy this template and customize for your project

const NAV_SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction', active: true },
      { label: 'Installation', href: '#installation' },
      { label: 'Quick Start', href: '#quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { label: 'Components', href: '#components' },
      { label: 'Theming', href: '#theming' },
      { label: 'Typography', href: '#typography' },
      { label: 'Spacing', href: '#spacing' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', href: '#button' },
      { label: 'Card', href: '#card' },
      { label: 'Badge', href: '#badge' },
      { label: 'Input', href: '#input' },
      { label: 'Dialog', href: '#dialog' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Props', href: '#props' },
      { label: 'Variants', href: '#variants' },
      { label: 'Hooks', href: '#hooks' },
    ],
  },
]

const TOC_ITEMS = [
  { label: 'Overview', href: '#overview', level: 1 },
  { label: 'Installation', href: '#installation', level: 1 },
  { label: 'npm / pnpm', href: '#npm', level: 2 },
  { label: 'CDN', href: '#cdn', level: 2 },
  { label: 'Usage', href: '#usage', level: 1 },
  { label: 'Basic example', href: '#basic', level: 2 },
  { label: 'With variants', href: '#variants', level: 2 },
  { label: 'Props', href: '#props', level: 1 },
]

const OVERVIEW_CARDS = [
  { title: '50+ Components', desc: 'Accordion to Toggle', color: 'bg-primary text-primary-foreground' },
  { title: '10 Chart Types', desc: 'Area, Bar, Sankey…', color: 'bg-secondary text-secondary-foreground' },
  { title: 'shadcn CLI', desc: 'Install individually', color: 'bg-accent text-accent-foreground' },
  { title: '14 Themes', desc: 'Cyberpunk to Pastel', color: 'bg-success text-success-foreground' },
]

const PROPS_TABLE = [
  { prop: 'variant', type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', def: '"default"', desc: 'Visual style variant' },
  { prop: 'size', type: '"sm" | "default" | "lg" | "icon"', def: '"default"', desc: 'Size of the button' },
  { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render as child via Reka Slot' },
  { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Disables interaction' },
  { prop: 'class', type: 'string', def: '—', desc: 'Additional CSS classes' },
]

// State
const sidebarOpen = ref(false)
const dark = ref(false)
const searchVal = ref('')
const copiedCode = ref<string | null>(null)
const openSections = ref<Record<string, boolean>>({ 'Getting Started': true, 'Core Concepts': true })

function copyCode(code: string) {
  navigator.clipboard.writeText(code)
  copiedCode.value = code
  setTimeout(() => { copiedCode.value = null }, 2000)
}

function toggleSection(title: string) {
  openSections.value[title] = !openSections.value[title]
}

function isSectionOpen(title: string) {
  return openSections.value[title] !== false
}
</script>

<template>
  <div :class="['min-h-screen bg-background text-foreground', dark && 'dark']">

    <!-- Primary accent eyebrow -->
    <div class="h-[3px] bg-primary w-full" />

    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-background border-b-3 border-foreground h-13 flex items-center gap-3 px-4">
      <!-- Mobile toggle -->
      <button
        class="lg:hidden p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
        @click="sidebarOpen = !sidebarOpen"
        aria-label="Toggle menu"
      >
        <X v-if="sidebarOpen" class="h-4 w-4" />
        <Menu v-else class="h-4 w-4" />
      </button>

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 flex-shrink-0 group">
        <div class="w-7 h-7 bg-primary border-2 border-foreground flex items-center justify-center shadow-[2px_2px_0px_hsl(var(--shadow-color))] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_hsl(var(--shadow-color))] transition-all duration-100">
          <BookOpen class="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div class="hidden sm:flex items-baseline gap-1.5">
          <span class="font-black text-base uppercase tracking-tight leading-none">BoldKit</span>
          <span class="text-[10px] font-black uppercase tracking-widest text-primary border border-primary px-1 py-0.5 leading-none">DOCS</span>
        </div>
      </a>

      <!-- Search -->
      <div class="flex-1 max-w-xs relative ml-2">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          v-model="searchVal"
          placeholder="Search docs..."
          class="pl-8 h-8 text-sm font-mono"
        />
      </div>

      <!-- Right actions -->
      <div class="ml-auto flex items-center gap-2">
        <div class="hidden sm:flex items-center gap-1 border-2 border-foreground px-2 py-0.5">
          <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ver</span>
          <span class="text-[10px] font-black uppercase tracking-widest text-primary">3.0</span>
        </div>
        <button
          class="p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
          aria-label="Toggle dark mode"
          @click="dark = !dark"
        >
          <Sun v-if="dark" class="h-3.5 w-3.5" />
          <Moon v-else class="h-3.5 w-3.5" />
        </button>
        <a
          href="https://github.com/ANIBIT14/boldkit"
          target="_blank"
          rel="noopener noreferrer"
          class="p-1.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
          aria-label="GitHub"
        >
          <Github class="h-3.5 w-3.5" />
        </a>
        <Button size="sm" class="hidden md:flex gap-1.5 h-8 text-xs">
          Components <ArrowRight class="h-3 w-3" />
        </Button>
      </div>
    </header>

    <!-- Body -->
    <div class="flex relative">

      <!-- Left Sidebar -->
      <aside
        :class="[
          'fixed lg:sticky top-[52px] z-40 h-[calc(100vh-52px)] w-56 flex-shrink-0',
          'bg-muted/30 border-r-3 border-foreground overflow-y-auto',
          'transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
      >
        <div class="p-3 pt-4">
          <!-- Version selector -->
          <div class="mb-4">
            <select class="w-full text-xs font-bold font-mono border-2 border-foreground bg-background px-2 py-1.5 cursor-pointer focus:outline-none">
              <option>v3.0 (latest)</option>
              <option>v2.8</option>
              <option>v2.5</option>
            </select>
          </div>

          <!-- Nav sections -->
          <div class="space-y-0.5">
            <div v-for="section in NAV_SECTIONS" :key="section.title" class="mb-1">
              <button
                class="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-foreground/50 hover:text-foreground/80 transition-colors"
                @click="toggleSection(section.title)"
              >
                {{ section.title }}
                <ChevronDown v-if="isSectionOpen(section.title)" class="h-3 w-3 flex-shrink-0" />
                <ChevronRight v-else class="h-3 w-3 flex-shrink-0" />
              </button>
              <ul v-if="isSectionOpen(section.title)" class="mb-2">
                <li v-for="item in section.items" :key="item.label">
                  <a
                    :href="item.href"
                    :class="[
                      'flex items-center gap-2 px-3 py-[5px] text-sm transition-all duration-100 border-l-2',
                      item.active
                        ? 'border-primary bg-primary/10 font-bold text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted/40',
                    ]"
                  >
                    <span v-if="item.active" class="w-1 h-1 bg-primary flex-shrink-0" />
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <!-- Mobile overlay -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <div class="max-w-[740px] mx-auto px-8 lg:px-12 py-10">

          <!-- Breadcrumb -->
          <nav class="flex items-center gap-1 text-[11px] font-mono font-bold text-muted-foreground mb-7 uppercase tracking-wide">
            <a href="/docs" class="hover:text-foreground transition-colors">Docs</a>
            <ChevronRight class="h-3 w-3 flex-shrink-0" />
            <a href="#getting-started" class="hover:text-foreground transition-colors">Getting Started</a>
            <ChevronRight class="h-3 w-3 flex-shrink-0" />
            <span class="text-foreground">Introduction</span>
          </nav>

          <!-- Hero area -->
          <div class="mb-8 pb-8 border-b-3 border-foreground">
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="default" class="text-[10px]">New in v3.0</Badge>
              <Badge variant="outline" class="text-[10px]">React &amp; Vue 3</Badge>
            </div>
            <h1 class="text-[2.6rem] font-black uppercase tracking-tight leading-none mb-4">
              Introduction
            </h1>
            <p class="text-base text-muted-foreground leading-relaxed max-w-xl">
              BoldKit is a neubrutalism UI component library for React and Vue 3. Build bold, distinctive interfaces with thick borders, hard shadows, and vibrant colors.
            </p>
          </div>

          <!-- Overview -->
          <section id="overview" class="mb-10">
            <h2 class="text-xl font-black uppercase tracking-tight mb-1">Overview</h2>
            <div class="w-8 h-[3px] bg-primary mb-5" />
            <p class="text-sm text-muted-foreground leading-relaxed mb-5">
              BoldKit provides 50+ accessible components built on Radix UI and Reka UI primitives, styled with the neubrutalism aesthetic.
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="card in OVERVIEW_CARDS"
                :key="card.title"
                class="flex items-start gap-3 p-3.5 border-3 border-foreground shadow-[3px_3px_0px_hsl(var(--shadow-color))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_hsl(var(--shadow-color))] transition-all duration-100 cursor-default"
              >
                <div :class="['p-1.5 border-2 border-foreground flex-shrink-0', card.color]">
                  <Layers class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-sm font-black uppercase tracking-tight leading-tight">{{ card.title }}</p>
                  <p class="text-[11px] text-muted-foreground mt-0.5 leading-tight">{{ card.desc }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Installation -->
          <section id="installation" class="mb-10">
            <h2 class="text-xl font-black uppercase tracking-tight mb-1">Installation</h2>
            <div class="w-8 h-[3px] bg-secondary mb-5" />
            <p class="text-sm text-muted-foreground mb-1">Install individual components via the shadcn-vue CLI:</p>

            <!-- Code block -->
            <div class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-5 overflow-hidden">
              <div class="flex items-center justify-between bg-foreground px-3 py-2">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-destructive opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-warning opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-success opacity-80" />
                  </div>
                  <span class="text-[10px] font-mono font-bold text-background/50 uppercase tracking-[0.15em] ml-1">bash</span>
                </div>
                <button
                  :class="['flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 transition-all duration-100 border', copiedCode === 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json' ? 'bg-success text-success-foreground border-success' : 'border-background/30 text-background/70 hover:text-background hover:border-background/60']"
                  @click="copyCode('npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json')"
                >
                  <Check v-if="copiedCode === 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json'" class="h-2.5 w-2.5" />
                  <Copy v-else class="h-2.5 w-2.5" />
                  {{ copiedCode === 'npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json' ? 'COPIED' : 'COPY' }}
                </button>
              </div>
              <pre class="bg-foreground/5 border-t border-foreground/10 p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground"><code>npx shadcn-vue@latest add https://boldkit.dev/r/vue/button.json</code></pre>
            </div>

            <!-- Callout -->
            <div class="flex gap-3 border-l-4 border-info border-3 px-4 py-3 my-5 bg-info/10">
              <Info class="h-4 w-4 flex-shrink-0 mt-0.5 text-info" />
              <div class="text-sm leading-relaxed text-foreground/80">
                <strong>Tip:</strong> Browse all components at
                <code class="text-xs font-mono bg-foreground/10 px-1 py-0.5">boldkit.dev/components</code>
                and copy their individual install commands.
              </div>
            </div>

            <p class="text-sm text-muted-foreground mb-1 mt-5">Or install as a full package:</p>
            <div class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-5 overflow-hidden">
              <div class="flex items-center justify-between bg-foreground px-3 py-2">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-destructive opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-warning opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-success opacity-80" />
                  </div>
                  <span class="text-[10px] font-mono font-bold text-background/50 uppercase tracking-[0.15em] ml-1">bash</span>
                </div>
              </div>
              <pre class="bg-foreground/5 border-t border-foreground/10 p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground"><code>npm install @boldkit/vue
# or
pnpm add @boldkit/vue</code></pre>
            </div>
          </section>

          <!-- Usage -->
          <section id="usage" class="mb-10">
            <h2 class="text-xl font-black uppercase tracking-tight mb-1">Usage</h2>
            <div class="w-8 h-[3px] bg-accent mb-5" />

            <h3 class="text-sm font-black uppercase tracking-widest mb-2 text-foreground/70" id="basic">— Basic Example</h3>
            <div class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-5 overflow-hidden">
              <div class="flex items-center justify-between bg-foreground px-3 py-2">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-destructive opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-warning opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-success opacity-80" />
                  </div>
                  <span class="text-[10px] font-mono font-bold text-background/50 uppercase tracking-[0.15em] ml-1">vue</span>
                </div>
              </div>
              <pre class="bg-foreground/5 border-t border-foreground/10 p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground"><code>&lt;script setup lang="ts"&gt;
import { Button } from '@/components/ui'
&lt;/script&gt;

&lt;template&gt;
  &lt;Button&gt;Click me&lt;/Button&gt;
&lt;/template&gt;</code></pre>
            </div>

            <h3 class="text-sm font-black uppercase tracking-widest mb-2 mt-6 text-foreground/70" id="variants">— With Variants</h3>
            <div class="border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] my-5 overflow-hidden">
              <div class="flex items-center justify-between bg-foreground px-3 py-2">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-destructive opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-warning opacity-80" />
                    <div class="w-2.5 h-2.5 rounded-full bg-success opacity-80" />
                  </div>
                  <span class="text-[10px] font-mono font-bold text-background/50 uppercase tracking-[0.15em] ml-1">vue</span>
                </div>
              </div>
              <pre class="bg-foreground/5 border-t border-foreground/10 p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-foreground"><code>&lt;template&gt;
  &lt;div class="flex gap-2 flex-wrap"&gt;
    &lt;Button variant="default"&gt;Default&lt;/Button&gt;
    &lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;
    &lt;Button variant="outline"&gt;Outline&lt;/Button&gt;
    &lt;Button variant="destructive"&gt;Destructive&lt;/Button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
            </div>
          </section>

          <!-- Props Table -->
          <section id="props" class="mb-10">
            <h2 class="text-xl font-black uppercase tracking-tight mb-1">Props</h2>
            <div class="w-8 h-[3px] bg-info mb-5" />
            <div class="border-3 border-foreground overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-foreground text-background">
                    <th v-for="h in ['Prop', 'Type', 'Default', 'Description']" :key="h"
                      class="text-left px-4 py-2.5 font-black text-[10px] uppercase tracking-[0.12em] whitespace-nowrap">
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in PROPS_TABLE"
                    :key="row.prop"
                    :class="['border-t border-foreground/10', i % 2 !== 0 && 'bg-muted/40']"
                  >
                    <td class="px-4 py-2.5 font-black font-mono text-primary text-[13px]">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-[11px] text-muted-foreground max-w-[160px]">
                      <span class="block truncate">{{ row.type }}</span>
                    </td>
                    <td class="px-4 py-2.5 font-mono text-[12px] font-bold text-accent whitespace-nowrap">{{ row.def }}</td>
                    <td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ row.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Prev / Next -->
          <div class="pt-6 border-t-3 border-foreground">
            <div class="flex gap-3">
              <Button variant="outline" class="gap-2 flex-1 justify-start h-auto py-3" disabled>
                <ArrowLeft class="h-4 w-4 flex-shrink-0" />
                <div class="text-left min-w-0">
                  <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prev</div>
                  <div class="text-sm font-bold truncate">—</div>
                </div>
              </Button>
              <Button variant="outline" class="gap-2 flex-1 justify-end h-auto py-3">
                <div class="text-right min-w-0">
                  <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next</div>
                  <div class="text-sm font-bold truncate">Installation</div>
                </div>
                <ArrowRight class="h-4 w-4 flex-shrink-0" />
              </Button>
            </div>

            <div class="mt-5 flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground transition-colors w-fit">
              <ExternalLink class="h-3 w-3" />
              <a href="#">Edit this page on GitHub</a>
            </div>
          </div>

        </div>
      </main>

      <!-- Right ToC — compact annotation rail -->
      <aside class="hidden xl:flex flex-col sticky top-[52px] h-[calc(100vh-52px)] w-44 flex-shrink-0 overflow-y-auto pt-10 pr-5 pl-3 border-l border-foreground/20">
        <p class="text-[9px] font-black uppercase tracking-[0.18em] text-foreground/40 mb-3">
          On this page
        </p>
        <ul class="space-y-0.5 flex-1">
          <li v-for="(item, i) in TOC_ITEMS" :key="item.href">
            <a
              :href="item.href"
              :class="[
                'block text-[11px] leading-5 transition-colors duration-100 hover:text-foreground',
                item.level === 1 ? 'font-bold text-foreground/70 mt-2 first:mt-0' : 'font-medium text-muted-foreground pl-2.5 border-l border-foreground/15 hover:border-primary/60',
                i === 0 && 'text-primary font-black',
              ]"
            >{{ item.label }}</a>
          </li>
        </ul>

        <div class="mt-6 pt-4 border-t border-foreground/15 space-y-2 pb-6">
          <a
            href="https://github.com/ANIBIT14/boldkit"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github class="h-3 w-3" /> GitHub
          </a>
          <a
            href="#"
            class="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink class="h-3 w-3" /> Changelog
          </a>
        </div>
      </aside>

    </div>
  </div>
</template>
