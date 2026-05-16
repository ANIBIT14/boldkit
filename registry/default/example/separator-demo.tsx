import { Separator } from '@/components/ui/separator'

export default function Example() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="text-sm">More content here</div>
    </div>
  )
}