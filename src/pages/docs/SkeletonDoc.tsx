import { Skeleton } from '@/components/ui/skeleton'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse bg-muted border-2 border-foreground/20', className)}
      {...props}
    />
  )
}

export { Skeleton }`

const usageCode = `import { Skeleton } from '@/components/ui/skeleton'

export default function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`

export function SkeletonDoc() {
  return (
    <>
      <ComponentDoc
        name="Skeleton"
        description="A placeholder loading animation with neubrutalism styling to indicate content is being loaded."
        installCommand="npx boldkit-ui add skeleton"
        dependencies={[]}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ComponentDoc>

      {/* Card Skeleton */}
      <ExampleSection
        title="Card"
        description="A skeleton that resembles a card layout."
        code={`<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}
      >
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ExampleSection>

      {/* Profile Skeleton */}
      <ExampleSection
        title="Profile"
        description="A skeleton that resembles a user profile."
        code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-16 w-16 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-5 w-[150px]" />
    <Skeleton className="h-4 w-[100px]" />
  </div>
</div>`}
      >
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </ExampleSection>

      {/* List Skeleton */}
      <ExampleSection
        title="List"
        description="A skeleton that resembles a list of items."
        code={`<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>`}
      >
        <div className="space-y-4 max-w-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>
    </>
  )
}
