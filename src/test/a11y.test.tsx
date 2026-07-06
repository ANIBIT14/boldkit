import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { render } from '@/test/test-utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'

/**
 * Automated accessibility smoke tests. Renders core components and asserts
 * axe-core finds no violations. Enforced on every PR via CI so a11y is a
 * gate, not a periodic manual audit.
 *
 * `color-contrast` and other layout-dependent rules are disabled because the
 * happy-dom test environment has no layout engine to compute them. Contrast
 * is verified separately in the dark-mode contrast audit.
 */
const axeConfig = {
  rules: {
    'color-contrast': { enabled: false },
  },
}

async function expectNoViolations(ui: React.ReactElement) {
  const { container } = render(ui)
  const results = await axe(container, axeConfig)
  expect(results).toHaveNoViolations()
}

describe('accessibility (axe)', () => {
  it('Button has no violations', async () => {
    await expectNoViolations(<Button>Submit</Button>)
  })

  it('labelled Input has no violations', async () => {
    await expectNoViolations(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    )
  })

  it('Badge has no violations', async () => {
    await expectNoViolations(<Badge>New</Badge>)
  })

  it('Alert has no violations', async () => {
    await expectNoViolations(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>
    )
  })

  it('Card has no violations', async () => {
    await expectNoViolations(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    )
  })

  it('labelled Checkbox has no violations', async () => {
    await expectNoViolations(
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    )
  })

  it('labelled Switch has no violations', async () => {
    await expectNoViolations(
      <div>
        <Switch id="notify" />
        <Label htmlFor="notify">Enable notifications</Label>
      </div>
    )
  })
})
