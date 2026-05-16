import {
  Timeline, TimelineItem, TimelineDot, TimelineConnector,
  TimelineContent, TimelineTitle, TimelineDescription
} from '@/components/ui/timeline'

export default function Example() {
  return (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineDot status="completed" />
        <TimelineConnector status="completed" />
        <TimelineContent>
          <TimelineTitle>Order Placed</TimelineTitle>
          <TimelineDescription>Your order has been placed</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      {/* More items... */}
    </Timeline>
  )
}