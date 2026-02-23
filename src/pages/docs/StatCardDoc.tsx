import { StatCard } from '@/components/ui/stat-card'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { DollarSign, Users, Activity, ShoppingCart } from 'lucide-react'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const statCardVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        compact: '[&_.stat-content]:p-4',
        large: 'md:col-span-2',
      },
      color: {
        primary: '[&_.stat-icon]:bg-primary [&_.stat-bg]:bg-primary',
        secondary: '[&_.stat-icon]:bg-secondary [&_.stat-bg]:bg-secondary',
        accent: '[&_.stat-icon]:bg-accent [&_.stat-bg]:bg-accent',
        success: '[&_.stat-icon]:bg-success [&_.stat-bg]:bg-success',
        warning: '[&_.stat-icon]:bg-warning [&_.stat-bg]:bg-warning',
        info: '[&_.stat-icon]:bg-info [&_.stat-bg]:bg-info',
        destructive: '[&_.stat-icon]:bg-destructive [&_.stat-bg]:bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
    },
  }
)

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  progress?: { value: number; label?: string }
  comparison?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant, color, title, value, change, trend, icon, progress, comparison, ...props }, ref) => {
    // Renders card with decorative background, value, change indicator, and optional progress
  }
)

export { StatCard, statCardVariants }`

const vueSourceCode = `<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const statCardVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        compact: '[&_.stat-content]:p-4',
        large: 'md:col-span-2',
      },
      color: {
        primary: '[&_.stat-icon]:bg-primary [&_.stat-bg]:bg-primary',
        // ... other colors
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
    },
  }
)

interface Props {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: Component
  progress?: { value: number; label?: string }
  comparison?: string
  variant?: VariantProps<typeof statCardVariants>['variant']
  color?: VariantProps<typeof statCardVariants>['color']
}

const props = withDefaults(defineProps<Props>(), {
  trend: 'neutral',
  comparison: 'vs last month',
})
</script>

<template>
  <Card :class="cn(statCardVariants({ variant, color }))">
    <!-- Card content -->
  </Card>
</template>`

const usageCode = `import { StatCard } from '@/components/ui/stat-card'
import { DollarSign } from 'lucide-react'

export default function Example() {
  return (
    <StatCard
      title="Total Revenue"
      value="$45,231"
      change="+20.1%"
      trend="up"
      icon={<DollarSign className="h-6 w-6" />}
      color="success"
    />
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { StatCard } from '@/components/ui'
import { DollarSign } from 'lucide-vue-next'
</script>

<template>
  <StatCard
    title="Total Revenue"
    value="$45,231"
    change="+20.1%"
    trend="up"
    :icon="DollarSign"
    color="success"
  />
</template>`

export function StatCardDoc() {
  return (
    <>
      <ComponentDoc
        name="StatCard"
        description="Display key metrics and statistics with trend indicators and progress bars."
        dependencies={['class-variance-authority', 'lucide-react']}
        vueDependencies={['class-variance-authority', 'lucide-vue-next']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Total Revenue"
            value="$45,231"
            change="+20.1%"
            trend="up"
            icon={<DollarSign className="h-6 w-6" />}
            color="success"
          />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Colors"
        description="Different color variants for various metric types."
        code={`<StatCard title="Revenue" value="$45K" color="success" icon={<DollarSign />} />
<StatCard title="Users" value="2,350" color="info" icon={<Users />} />
<StatCard title="Activity" value="12,234" color="primary" icon={<Activity />} />
<StatCard title="Orders" value="432" color="warning" icon={<ShoppingCart />} />`}
        vueCode={`<template>
  <StatCard title="Revenue" value="$45K" color="success" :icon="DollarSign" />
  <StatCard title="Users" value="2,350" color="info" :icon="Users" />
  <StatCard title="Activity" value="12,234" color="primary" :icon="Activity" />
  <StatCard title="Orders" value="432" color="warning" :icon="ShoppingCart" />
</template>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Revenue"
            value="$45K"
            change="+12%"
            trend="up"
            color="success"
            icon={<DollarSign className="h-6 w-6" />}
          />
          <StatCard
            title="Users"
            value="2,350"
            change="+8%"
            trend="up"
            color="info"
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Activity"
            value="12,234"
            change="-3%"
            trend="down"
            color="primary"
            icon={<Activity className="h-6 w-6" />}
          />
          <StatCard
            title="Orders"
            value="432"
            change="+15%"
            trend="up"
            color="warning"
            icon={<ShoppingCart className="h-6 w-6" />}
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Trend Indicators"
        description="Show positive, negative, or neutral trends."
        code={`<StatCard title="Growing" value="$45K" change="+20%" trend="up" />
<StatCard title="Declining" value="$32K" change="-5%" trend="down" />
<StatCard title="Stable" value="$28K" change="0%" trend="neutral" />`}
        vueCode={`<template>
  <StatCard title="Growing" value="$45K" change="+20%" trend="up" />
  <StatCard title="Declining" value="$32K" change="-5%" trend="down" />
  <StatCard title="Stable" value="$28K" change="0%" trend="neutral" />
</template>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Growing"
            value="$45K"
            change="+20%"
            trend="up"
            color="success"
          />
          <StatCard
            title="Declining"
            value="$32K"
            change="-5%"
            trend="down"
            color="destructive"
          />
          <StatCard
            title="Stable"
            value="$28K"
            change="0%"
            trend="neutral"
            color="secondary"
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="With Progress Bar"
        description="Show progress toward a goal with the large variant."
        code={`<StatCard
  title="Monthly Target"
  value="$45,231"
  change="+20.1%"
  trend="up"
  icon={<DollarSign />}
  color="success"
  variant="large"
  progress={{ value: 78, label: "Monthly Target" }}
/>`}
        vueCode={`<template>
  <StatCard
    title="Monthly Target"
    value="$45,231"
    change="+20.1%"
    trend="up"
    :icon="DollarSign"
    color="success"
    variant="large"
    :progress="{ value: 78, label: 'Monthly Target' }"
  />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Monthly Target"
            value="$45,231"
            change="+20.1%"
            trend="up"
            icon={<DollarSign className="h-6 w-6" />}
            color="success"
            variant="large"
            progress={{ value: 78, label: "Monthly Target" }}
          />
          <StatCard
            title="Quarterly Goal"
            value="$128,000"
            change="+15.3%"
            trend="up"
            icon={<Activity className="h-6 w-6" />}
            color="primary"
            variant="large"
            progress={{ value: 62, label: "Q4 Progress" }}
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Compact Variant"
        description="Smaller padding for dense layouts."
        code={`<StatCard
  title="Revenue"
  value="$45K"
  variant="compact"
  color="primary"
/>`}
        vueCode={`<template>
  <StatCard
    title="Revenue"
    value="$45K"
    variant="compact"
    color="primary"
  />
</template>`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="Revenue" value="$45K" variant="compact" color="primary" />
          <StatCard title="Users" value="2.3K" variant="compact" color="secondary" />
          <StatCard title="Orders" value="432" variant="compact" color="accent" />
          <StatCard title="Growth" value="+12%" variant="compact" color="success" />
        </div>
      </ExampleSection>
    </>
  )
}
