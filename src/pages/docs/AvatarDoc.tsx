import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden border-3 border-foreground bk-shadow-sm',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-bold uppercase',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }`

const usageCode = `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`

export function AvatarDoc() {
  return (
    <>
      <ComponentDoc
        name="Avatar"
        description="An image element with a fallback for representing the user with bold neubrutalism borders."
        dependencies={['@radix-ui/react-avatar']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ComponentDoc>

      {/* With Image */}
      <ExampleSection
        title="With Image"
        description="Display a user's profile picture."
        code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ExampleSection>

      {/* Fallback */}
      <ExampleSection
        title="Fallback"
        description="Shows initials when image fails to load or is not provided."
        code={`<Avatar>
  <AvatarImage src="/broken-image.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarImage src="/broken-image.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </ExampleSection>

      {/* Different Sizes */}
      <ExampleSection
        title="Sizes"
        description="Avatars can be customized to different sizes using className."
        code={`<Avatar className="h-8 w-8">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar className="h-10 w-10">
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar className="h-14 w-14">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>
<Avatar className="h-20 w-20">
  <AvatarFallback>XL</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">SM</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm">MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-14 w-14">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">XL</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>

      {/* Avatar Group */}
      <ExampleSection
        title="Avatar Group"
        description="Stack multiple avatars together for a group display with overlapping effect."
        code={`<div className="flex items-center">
  <Avatar className="ring-2 ring-background z-40">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-30">
    <AvatarFallback className="bg-secondary">JD</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-20">
    <AvatarFallback className="bg-accent">AB</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-10">
    <AvatarFallback className="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
  </Avatar>
</div>`}
      >
        <div className="flex items-center">
          <Avatar className="ring-2 ring-background z-40">
            <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-30">
            <AvatarFallback className="bg-secondary">JD</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-20">
            <AvatarFallback className="bg-accent">AB</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-background -ml-3 z-10">
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>

      {/* Custom Fallback Colors */}
      <ExampleSection
        title="Custom Colors"
        description="Customize the fallback background color for different users."
        code={`<Avatar>
  <AvatarFallback className="bg-primary">AB</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-secondary text-secondary-foreground">CD</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-accent text-accent-foreground">EF</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-destructive text-destructive-foreground">GH</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary">AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-secondary text-secondary-foreground">CD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-accent text-accent-foreground">EF</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-destructive text-destructive-foreground">GH</AvatarFallback>
          </Avatar>
        </div>
      </ExampleSection>
    </>
  )
}
