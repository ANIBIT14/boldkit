import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function Example() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
        alt="Photo"
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  )
}