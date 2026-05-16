import {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
} from '@/components/ui/layered-card'

export default function Example() {
  return (
    <LayeredCard className="w-[350px]">
      <LayeredCardHeader>
        <LayeredCardTitle>Layered Card</LayeredCardTitle>
        <LayeredCardDescription>With stacked depth effect</LayeredCardDescription>
      </LayeredCardHeader>
      <LayeredCardContent>
        <p>This card has visible layers behind it for a 3D stacked paper effect.</p>
      </LayeredCardContent>
    </LayeredCard>
  )
}