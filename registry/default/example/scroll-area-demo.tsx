import { ScrollArea } from '@/components/ui/scroll-area'

export default function Example() {
  return (
    <ScrollArea className="h-[200px] w-[350px] border-3 border-foreground p-4">
      <div>
        {/* Long content here */}
      </div>
    </ScrollArea>
  )
}