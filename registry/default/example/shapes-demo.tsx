import { Star5Shape, HeartShape, LightningShape } from "@/components/ui/shapes"

export default function ShapesDemo() {
  return (
    <div className="flex gap-4 items-center">
      <Star5Shape className="w-16 h-16 text-primary" />
      <HeartShape className="w-16 h-16 text-destructive" />
      <LightningShape className="w-16 h-16 text-accent" />
    </div>
  )
}
