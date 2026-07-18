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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

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

  it('Tabs have no violations', async () => {
    await expectNoViolations(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Account</TabsTrigger>
          <TabsTrigger value="b">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Account settings</TabsContent>
        <TabsContent value="b">Password settings</TabsContent>
      </Tabs>
    )
  })

  it('labelled RadioGroup has no violations', async () => {
    await expectNoViolations(
      <RadioGroup defaultValue="one" aria-label="Choose an option">
        <div>
          <RadioGroupItem value="one" id="r1" />
          <Label htmlFor="r1">One</Label>
        </div>
        <div>
          <RadioGroupItem value="two" id="r2" />
          <Label htmlFor="r2">Two</Label>
        </div>
      </RadioGroup>
    )
  })

  it('labelled Select trigger has no violations', async () => {
    await expectNoViolations(
      <div>
        <Label htmlFor="fruit">Fruit</Label>
        <Select>
          <SelectTrigger id="fruit" aria-label="Fruit">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="pear">Pear</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  })

  it('labelled Slider has no violations', async () => {
    await expectNoViolations(
      <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
    )
  })

  it('labelled Progress has no violations', async () => {
    await expectNoViolations(<Progress value={40} aria-label="Loading" />)
  })

  it('labelled Textarea has no violations', async () => {
    await expectNoViolations(
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself" />
      </div>
    )
  })

  it('Accordion has no violations', async () => {
    await expectNoViolations(
      <Accordion type="single" collapsible>
        <AccordionItem value="i1">
          <AccordionTrigger>Question one</AccordionTrigger>
          <AccordionContent>Answer one</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  })

  it('Table has no violations', async () => {
    await expectNoViolations(
      <Table>
        <TableCaption>Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>$100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  })

  it('Breadcrumb has no violations', async () => {
    await expectNoViolations(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Docs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  })

  it('Avatar with fallback has no violations', async () => {
    await expectNoViolations(
      <Avatar>
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
    )
  })

  it('Separator has no violations', async () => {
    await expectNoViolations(
      <div>
        <span>Above</span>
        <Separator />
        <span>Below</span>
      </div>
    )
  })

  it('labelled ToggleGroup has no violations', async () => {
    await expectNoViolations(
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          L
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          C
        </ToggleGroupItem>
      </ToggleGroup>
    )
  })
})
