import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { cn } from '@/lib/utils'

const HoverCard = HoverCardPrimitive.Root
const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 border-3 border-foreground bg-background p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      className
    )}
    {...props}
  />
))

export { HoverCard, HoverCardTrigger, HoverCardContent }`

const usageCode = `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@boldkit</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>BoldKit - Neubrutalism UI Components</p>
      </HoverCardContent>
    </HoverCard>
  )
}`

export function HoverCardDoc() {
  return (
    <>
      <ComponentDoc
        name="Hover Card"
        description="For sighted users to preview content available behind a link with neubrutalism styling."
        installCommand="npx boldkit-ui add hover-card"
        dependencies={['@radix-ui/react-hover-card']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="text-lg">@boldkit</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">@boldkit</h4>
                <p className="text-sm">
                  Neubrutalism React component library built on shadcn/ui.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Joined December 2024
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple hover card with text content."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">Hover me</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p>This is a hover card with some content.</p>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-sm">This is a hover card with some helpful content that appears on hover.</p>
          </HoverCardContent>
        </HoverCard>
      </ExampleSection>

      {/* Profile Card */}
      <ExampleSection
        title="Profile Card"
        description="Show user profile information on hover."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-bold">@username</h4>
        <p className="text-sm">Full-stack developer</p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">Joined January 2024</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@johndoe</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">@johndoe</h4>
                <p className="text-sm">
                  Full-stack developer. Building cool stuff with React and TypeScript.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Joined January 2024
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ExampleSection>

      {/* Link Preview */}
      <ExampleSection
        title="Link Preview"
        description="Preview link content before clicking."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="underline font-medium">Read the docs</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="font-bold">Documentation</h4>
      <p className="text-sm text-muted-foreground">
        Learn how to use BoldKit components in your project.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <a href="#" className="underline font-medium">Read the documentation</a>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="font-bold">Documentation</h4>
              <p className="text-sm text-muted-foreground">
                Learn how to install and use BoldKit components in your React project.
              </p>
              <p className="text-xs text-muted-foreground">docs.boldkit.dev</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ExampleSection>
    </>
  )
}
