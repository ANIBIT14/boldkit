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
import { Kbd } from '@/components/ui/kbd'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'
import { StatCard } from '@/components/ui/stat-card'
import { Toggle } from '@/components/ui/toggle'
import { Sticker } from '@/components/ui/sticker'
import { Marquee, MarqueeItem } from '@/components/ui/marquee'
import { TagInput } from '@/components/ui/tag-input'
import { Rating } from '@/components/ui/rating'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

/**
 * Accessible reference renders per registry slug. Consumed by a11y.test.tsx,
 * which runs axe over each and emits public/a11y-report.json — the data behind
 * the /accessibility WCAG matrix page. Slugs must match registry item names.
 */
export const a11yFixtures: { slug: string; element: React.ReactElement }[] = [
  { slug: 'button', element: <Button>Submit</Button> },
  {
    slug: 'input',
    element: (
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    ),
  },
  {
    slug: 'label',
    element: (
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </div>
    ),
  },
  { slug: 'badge', element: <Badge>New</Badge> },
  {
    slug: 'alert',
    element: (
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>
    ),
  },
  {
    slug: 'card',
    element: (
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    ),
  },
  {
    slug: 'checkbox',
    element: (
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    ),
  },
  {
    slug: 'switch',
    element: (
      <div>
        <Switch id="notify" />
        <Label htmlFor="notify">Enable notifications</Label>
      </div>
    ),
  },
  {
    slug: 'tabs',
    element: (
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Account</TabsTrigger>
          <TabsTrigger value="b">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Account settings</TabsContent>
        <TabsContent value="b">Password settings</TabsContent>
      </Tabs>
    ),
  },
  {
    slug: 'radio-group',
    element: (
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
    ),
  },
  {
    slug: 'select',
    element: (
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
    ),
  },
  {
    slug: 'slider',
    element: <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />,
  },
  { slug: 'progress', element: <Progress value={40} aria-label="Loading" /> },
  {
    slug: 'textarea',
    element: (
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself" />
      </div>
    ),
  },
  {
    slug: 'accordion',
    element: (
      <Accordion type="single" collapsible>
        <AccordionItem value="i1">
          <AccordionTrigger>Question one</AccordionTrigger>
          <AccordionContent>Answer one</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    slug: 'table',
    element: (
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
    ),
  },
  {
    slug: 'breadcrumb',
    element: (
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
    ),
  },
  {
    slug: 'avatar',
    element: (
      <Avatar>
        <AvatarFallback>BK</AvatarFallback>
      </Avatar>
    ),
  },
  {
    slug: 'separator',
    element: (
      <div>
        <span>Above</span>
        <Separator />
        <span>Below</span>
      </div>
    ),
  },
  {
    slug: 'toggle-group',
    element: (
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          L
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          C
        </ToggleGroupItem>
      </ToggleGroup>
    ),
  },
  { slug: 'kbd', element: <Kbd>⌘K</Kbd> },
  { slug: 'spinner', element: <Spinner aria-label="Loading" /> },
  { slug: 'skeleton', element: <Skeleton className="h-4 w-24" /> },
  { slug: 'stat-card', element: <StatCard title="Revenue" value="$12,400" /> },
  {
    slug: 'toggle',
    element: <Toggle aria-label="Toggle bold">B</Toggle>,
  },
  { slug: 'sticker', element: <Sticker>New!</Sticker> },
  {
    slug: 'marquee',
    element: (
      <Marquee>
        <MarqueeItem>BoldKit</MarqueeItem>
      </Marquee>
    ),
  },
  {
    slug: 'tag-input',
    element: (
      <div>
        <Label htmlFor="tags">Tags</Label>
        <TagInput id="tags" defaultValue={['ui']} />
      </div>
    ),
  },
  { slug: 'rating', element: <Rating defaultValue={3} /> },
  {
    slug: 'pagination',
    element: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
]
