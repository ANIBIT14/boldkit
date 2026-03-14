import { Check, Package, Truck, Home } from 'lucide-react'
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineCard,
} from '@/components/ui/timeline'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'completed' | 'current' | 'upcoming'
}

// Sub-components: Timeline, TimelineItem, TimelineDot, TimelineConnector,
// TimelineContent, TimelineHeader, TimelineTitle, TimelineDescription, TimelineTime, TimelineCard

export {
  Timeline, TimelineItem, TimelineDot, TimelineConnector,
  TimelineContent, TimelineHeader, TimelineTitle, TimelineDescription, TimelineTime, TimelineCard
}`

const usageCode = `import {
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
}`

const vueUsageCode = `<script setup lang="ts">
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent, TimelineTitle, TimelineDescription } from '@/components/ui/timeline'
</script>

<template>
  <Timeline>
    <TimelineItem status="completed">
      <TimelineDot status="completed" />
      <TimelineConnector status="completed" />
      <TimelineContent>
        <TimelineTitle>Order Placed</TimelineTitle>
        <TimelineDescription>Your order has been placed</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <!-- More items... -->
  </Timeline>
</template>`

export function TimelineDoc() {
  return (
    <>
      <ComponentDoc
        name="Timeline"
        description="A composable timeline component for displaying activity feeds, order tracking, version history, and more."
        dependencies={['class-variance-authority']}
        vueDependencies={['class-variance-authority']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Timeline>
          <TimelineItem status="completed">
            <TimelineDot status="completed">
              <Check className="h-4 w-4" />
            </TimelineDot>
            <TimelineConnector status="completed" />
            <TimelineContent>
              <TimelineTitle>Order Placed</TimelineTitle>
              <TimelineDescription>Your order has been confirmed</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="current">
            <TimelineDot status="current">
              <Package className="h-4 w-4" />
            </TimelineDot>
            <TimelineConnector status="upcoming" />
            <TimelineContent>
              <TimelineTitle>In Transit</TimelineTitle>
              <TimelineDescription>Package is on the way</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="upcoming">
            <TimelineDot status="upcoming">
              <Home className="h-4 w-4" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Delivered</TimelineTitle>
              <TimelineDescription>Estimated delivery tomorrow</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ComponentDoc>

      {/* Order Tracking */}
      <ExampleSection
        title="Order Tracking"
        description="Track order progress with status indicators and icons."
        code={`<Timeline>
  <TimelineItem status="completed">
    <TimelineDot status="completed"><Check /></TimelineDot>
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineTime>March 1, 2024</TimelineTime>
      <TimelineTitle>Order Placed</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="completed">
    <TimelineDot status="completed"><Package /></TimelineDot>
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineTime>March 2, 2024</TimelineTime>
      <TimelineTitle>Shipped</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="current">
    <TimelineDot status="current"><Truck /></TimelineDot>
    <TimelineConnector status="upcoming" />
    <TimelineContent>
      <TimelineTime>March 3, 2024</TimelineTime>
      <TimelineTitle>Out for Delivery</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="upcoming">
    <TimelineDot status="upcoming"><Home /></TimelineDot>
    <TimelineContent>
      <TimelineTitle>Delivered</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}
        vueCode={`<template>
  <Timeline>
    <TimelineItem status="completed">
      <TimelineDot status="completed"><Check /></TimelineDot>
      <TimelineConnector status="completed" />
      <TimelineContent>
        <TimelineTime>March 1, 2024</TimelineTime>
        <TimelineTitle>Order Placed</TimelineTitle>
      </TimelineContent>
    </TimelineItem>
    <!-- More items... -->
  </Timeline>
</template>`}
      >
        <Timeline>
          <TimelineItem status="completed">
            <TimelineDot status="completed">
              <Check className="h-4 w-4" />
            </TimelineDot>
            <TimelineConnector status="completed" />
            <TimelineContent>
              <TimelineTime>March 1, 2024</TimelineTime>
              <TimelineTitle>Order Placed</TimelineTitle>
              <TimelineDescription>Order #12345 confirmed</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="completed">
            <TimelineDot status="completed">
              <Package className="h-4 w-4" />
            </TimelineDot>
            <TimelineConnector status="completed" />
            <TimelineContent>
              <TimelineTime>March 2, 2024</TimelineTime>
              <TimelineTitle>Shipped</TimelineTitle>
              <TimelineDescription>Package left warehouse</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="current">
            <TimelineDot status="current">
              <Truck className="h-4 w-4" />
            </TimelineDot>
            <TimelineConnector status="upcoming" />
            <TimelineContent>
              <TimelineTime>March 3, 2024</TimelineTime>
              <TimelineTitle>Out for Delivery</TimelineTitle>
              <TimelineDescription>Driver is on the way</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="upcoming">
            <TimelineDot status="upcoming">
              <Home className="h-4 w-4" />
            </TimelineDot>
            <TimelineContent>
              <TimelineTitle>Delivered</TimelineTitle>
              <TimelineDescription>Expected today by 6 PM</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ExampleSection>

      {/* With Cards */}
      <ExampleSection
        title="With Cards"
        description="Use TimelineCard for richer content."
        code={`<Timeline>
  <TimelineItem status="completed">
    <TimelineDot status="completed" />
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineCard>
        <TimelineHeader>
          <TimelineTitle>Version 2.0 Released</TimelineTitle>
          <TimelineTime>2 days ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Major update with new features and improvements...
        </TimelineDescription>
      </TimelineCard>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}
        vueCode={`<template>
  <Timeline>
    <TimelineItem status="completed">
      <TimelineDot status="completed" />
      <TimelineConnector status="completed" />
      <TimelineContent>
        <TimelineCard>
          <TimelineHeader>
            <TimelineTitle>Version 2.0 Released</TimelineTitle>
            <TimelineTime>2 days ago</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>
            Major update with new features and improvements...
          </TimelineDescription>
        </TimelineCard>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>`}
      >
        <Timeline>
          <TimelineItem status="completed">
            <TimelineDot status="completed" />
            <TimelineConnector status="completed" />
            <TimelineContent>
              <TimelineCard>
                <TimelineHeader>
                  <TimelineTitle>Version 2.0 Released</TimelineTitle>
                </TimelineHeader>
                <TimelineTime>2 days ago</TimelineTime>
                <TimelineDescription className="mt-2">
                  Major update with new features including dark mode, improved performance,
                  and 10 new components.
                </TimelineDescription>
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="completed">
            <TimelineDot status="completed" />
            <TimelineConnector status="upcoming" />
            <TimelineContent>
              <TimelineCard>
                <TimelineHeader>
                  <TimelineTitle>Bug Fixes</TimelineTitle>
                </TimelineHeader>
                <TimelineTime>1 week ago</TimelineTime>
                <TimelineDescription className="mt-2">
                  Fixed issues with form validation and mobile responsiveness.
                </TimelineDescription>
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="upcoming">
            <TimelineDot status="upcoming" />
            <TimelineContent>
              <TimelineCard className="border-dashed">
                <TimelineHeader>
                  <TimelineTitle>Version 3.0 Planned</TimelineTitle>
                </TimelineHeader>
                <TimelineTime>Coming soon</TimelineTime>
                <TimelineDescription className="mt-2">
                  Major redesign with new theme system and advanced features.
                </TimelineDescription>
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ExampleSection>

      {/* Different Sizes */}
      <ExampleSection
        title="Dot Sizes"
        description="Timeline dots come in multiple sizes."
        code={`<TimelineDot size="sm" />
<TimelineDot size="md" />
<TimelineDot size="lg" />`}
        vueCode={`<template>
  <TimelineDot size="sm" />
  <TimelineDot size="md" />
  <TimelineDot size="lg" />
</template>`}
      >
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <TimelineDot size="sm" status="current" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TimelineDot size="md" status="current" />
            <span className="text-xs text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TimelineDot size="lg" status="current" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
      </ExampleSection>

      {/* Simple List */}
      <ExampleSection
        title="Simple Activity Feed"
        description="A simple activity feed without connectors."
        code={`<Timeline>
  {activities.map((activity) => (
    <TimelineItem key={activity.id}>
      <TimelineDot />
      <TimelineContent>
        <TimelineTitle>{activity.title}</TimelineTitle>
        <TimelineTime>{activity.time}</TimelineTime>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`}
        vueCode={`<template>
  <Timeline>
    <TimelineItem v-for="activity in activities" :key="activity.id">
      <TimelineDot />
      <TimelineContent>
        <TimelineTitle>{{ activity.title }}</TimelineTitle>
        <TimelineTime>{{ activity.time }}</TimelineTime>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>`}
      >
        <Timeline>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>John commented on your post</TimelineTitle>
              <TimelineTime>5 minutes ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>New follower: Jane Smith</TimelineTitle>
              <TimelineTime>1 hour ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>Your post reached 1,000 views</TimelineTitle>
              <TimelineTime>3 hours ago</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ExampleSection>
    </>
  )
}
