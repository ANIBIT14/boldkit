import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import { h, defineComponent, type Component } from 'vue'
import axe from 'axe-core'

import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Switch from '@/components/ui/Switch.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Alert from '@/components/ui/Alert.vue'
import AlertTitle from '@/components/ui/AlertTitle.vue'
import AlertDescription from '@/components/ui/AlertDescription.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import Separator from '@/components/ui/Separator.vue'
import Progress from '@/components/ui/Progress.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import ChartLoading from '@/components/ui/ChartLoading.vue'
import Kbd from '@/components/ui/Kbd.vue'
import Spinner from '@/components/ui/Spinner.vue'
import Toggle from '@/components/ui/Toggle.vue'

/**
 * Automated accessibility smoke tests for the Vue components. Mirrors the React
 * axe suite: renders each fixture in an accessible reference configuration and
 * asserts axe-core finds no violations. Emits the report consumed by the
 * `/accessibility` matrix page (Vue column).
 *
 * `color-contrast` is disabled — happy-dom has no layout engine to compute it
 * (verified separately by the token-based contrast audit).
 */
const axeConfig: axe.RunOptions = {
  rules: { 'color-contrast': { enabled: false } },
}

// A fixture is a component + mounting options producing accessible markup.
interface Fixture {
  slug: string
  component: Component
  options?: ComponentMountingOptions<unknown>
}

// Inline wrapper for compositions (label + control, compound components).
function wrap(render: () => unknown): Component {
  return defineComponent({ setup: () => render })
}

const fixtures: Fixture[] = [
  { slug: 'button', component: Button, options: { slots: { default: 'Submit' } } },
  { slug: 'badge', component: Badge, options: { slots: { default: 'New' } } },
  {
    slug: 'input',
    component: wrap(() =>
      h('div', [
        h(Label, { for: 'email' }, () => 'Email'),
        h(Input, { id: 'email', type: 'email', 'aria-label': 'Email' }),
      ])
    ),
  },
  {
    slug: 'label',
    component: wrap(() =>
      h('div', [h(Label, { for: 'name' }, () => 'Name'), h(Input, { id: 'name', 'aria-label': 'Name' })])
    ),
  },
  {
    slug: 'checkbox',
    component: wrap(() =>
      h('div', [h(Checkbox, { id: 'terms' }), h(Label, { for: 'terms' }, () => 'Accept terms')])
    ),
  },
  {
    slug: 'switch',
    component: wrap(() =>
      h('div', [h(Switch, { id: 'notify' }), h(Label, { for: 'notify' }, () => 'Notifications')])
    ),
  },
  {
    slug: 'textarea',
    component: wrap(() =>
      h('div', [h(Label, { for: 'bio' }, () => 'Bio'), h(Textarea, { id: 'bio' })])
    ),
  },
  {
    slug: 'alert',
    component: wrap(() =>
      h(Alert, () => [h(AlertTitle, () => 'Heads up'), h(AlertDescription, () => 'Something happened.')])
    ),
  },
  {
    slug: 'card',
    component: wrap(() =>
      h(Card, () => [
        h(CardHeader, () => [h(CardTitle, () => 'Title')]),
        h(CardContent, () => 'Body'),
      ])
    ),
  },
  {
    slug: 'avatar',
    component: wrap(() => h(Avatar, () => [h(AvatarFallback, () => 'BK')])),
  },
  {
    slug: 'separator',
    component: wrap(() => h('div', [h('span', 'Above'), h(Separator), h('span', 'Below')])),
  },
  { slug: 'progress', component: Progress, options: { props: { value: 40, 'aria-label': 'Loading' } } },
  { slug: 'progress-stepped', component: Progress, options: { props: { modelValue: 40, variant: 'stepped', 'aria-label': 'Uploading' } } },
  { slug: 'progress-marquee', component: Progress, options: { props: { variant: 'marquee', 'aria-label': 'Loading' } } },
  { slug: 'skeleton', component: Skeleton, options: { attrs: { class: 'h-4 w-24' } } },
  { slug: 'skeleton-stamp', component: Skeleton, options: { props: { variant: 'stamp' }, attrs: { class: 'h-4 w-24' } } },
  { slug: 'skeleton-blocks', component: Skeleton, options: { props: { variant: 'blocks' }, attrs: { class: 'h-4 w-24' } } },
  { slug: 'skeleton-scan', component: Skeleton, options: { props: { variant: 'scan' }, attrs: { class: 'h-4 w-24' } } },
  { slug: 'chart-loading', component: ChartLoading, options: {} },
  { slug: 'kbd', component: Kbd, options: { slots: { default: '⌘K' } } },
  { slug: 'spinner', component: Spinner, options: { attrs: { role: 'status', 'aria-label': 'Loading' } } },
  { slug: 'toggle', component: Toggle, options: { attrs: { 'aria-label': 'Toggle bold' }, slots: { default: 'B' } } },
]

interface ReportEntry {
  slug: string
  status: 'pass' | 'fail'
  violations: string[]
}
const report: ReportEntry[] = []

describe('accessibility (axe) — Vue', () => {
  for (const fixture of fixtures) {
    it(`${fixture.slug} has no violations`, async () => {
      const wrapper = mount(fixture.component, {
        attachTo: document.body,
        ...(fixture.options ?? {}),
      })
      const results = await axe.run(wrapper.element as Element, axeConfig)
      report.push({
        slug: fixture.slug,
        status: results.violations.length === 0 ? 'pass' : 'fail',
        violations: results.violations.map((v) => v.id),
      })
      wrapper.unmount()
      expect(results.violations.map((v) => v.id)).toEqual([])
    })
  }

  afterAll(() => {
    report.sort((a, b) => a.slug.localeCompare(b.slug))
    const body =
      JSON.stringify(
        {
          tool: 'axe-core via @vue/test-utils (color-contrast excluded: no layout engine in happy-dom)',
          framework: 'vue',
          components: report,
        },
        null,
        2
      ) + '\n'
    // src/config copy backs the /accessibility matrix (imported); public copy is
    // the raw downloadable report. Paths are relative to packages/vue cwd.
    writeFileSync(join(process.cwd(), '../../src/config/a11y-report-vue.json'), body)
    writeFileSync(join(process.cwd(), '../../public/a11y-report-vue.json'), body)
  })
})
