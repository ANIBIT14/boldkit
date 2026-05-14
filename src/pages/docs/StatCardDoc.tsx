import { StatCard } from '@/components/ui/stat-card'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { DollarSign, Users, Activity, ShoppingCart } from 'lucide-react'
import sourceCode from '@/components/ui/stat-card.tsx?raw'
import vueSourceCode from '@vue-ui/StatCard.vue?raw'



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
        registryName="stat-card"
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
