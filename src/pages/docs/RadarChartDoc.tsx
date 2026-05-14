import { RadarChart } from '@/components/ui/chart'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import type { ChartConfig } from '@/components/ui/chart'
import sourceCode from '@/components/ui/chart/radar-chart.tsx?raw'
import vueSourceCode from '@vue-ui/RadarChart.vue?raw'



const usageCode = `import { RadarChart } from '@/components/ui/chart'

const data = [
  { subject: 'Speed', player1: 80, player2: 65 },
  { subject: 'Strength', player1: 70, player2: 85 },
  { subject: 'Accuracy', player1: 90, player2: 75 },
  { subject: 'Stamina', player1: 85, player2: 70 },
  { subject: 'Agility', player1: 75, player2: 90 },
]

const config = {
  player1: { label: 'Player 1', color: 'hsl(var(--primary))' },
  player2: { label: 'Player 2', color: 'hsl(var(--secondary))' },
}

export default function Example() {
  return (
    <RadarChart
      data={data}
      dataKeys={['player1', 'player2']}
      config={config}
    />
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { RadarChart } from '@/components/ui'

const data = [
  { subject: 'Speed', player1: 80, player2: 65 },
  { subject: 'Strength', player1: 70, player2: 85 },
  { subject: 'Accuracy', player1: 90, player2: 75 },
  { subject: 'Stamina', player1: 85, player2: 70 },
  { subject: 'Agility', player1: 75, player2: 90 },
]

const config = {
  player1: { label: 'Player 1', color: 'hsl(var(--primary))' },
  player2: { label: 'Player 2', color: 'hsl(var(--secondary))' },
}
</script>

<template>
  <RadarChart
    :data="data"
    :data-keys="['player1', 'player2']"
    :config="config"
  />
</template>`

export function RadarChartDoc() {
  const skillsData = [
    { subject: 'Speed', player1: 80, player2: 65 },
    { subject: 'Strength', player1: 70, player2: 85 },
    { subject: 'Accuracy', player1: 90, player2: 75 },
    { subject: 'Stamina', player1: 85, player2: 70 },
    { subject: 'Agility', player1: 75, player2: 90 },
    { subject: 'Defense', player1: 60, player2: 80 },
  ]

  const singleData = [
    { subject: 'Design', value: 85 },
    { subject: 'Development', value: 90 },
    { subject: 'Communication', value: 75 },
    { subject: 'Leadership', value: 70 },
    { subject: 'Problem Solving', value: 95 },
    { subject: 'Teamwork', value: 80 },
  ]

  const config: ChartConfig = {
    player1: { label: 'Player 1', color: 'hsl(var(--primary))' },
    player2: { label: 'Player 2', color: 'hsl(var(--secondary))' },
    value: { label: 'Skills', color: 'hsl(var(--primary))' },
  }

  return (
    <>
      <ComponentDoc
        name="RadarChart"
        registryName="radar-chart"
        description="Multi-variable comparison chart for skills, metrics, and feature comparisons."
        dependencies={['recharts']}
        vueDependencies={['vue-echarts', 'echarts']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="max-w-[350px]">
          <RadarChart
            data={skillsData}
            dataKeys={['player1', 'player2']}
            config={config}
          />
        </div>
      </ComponentDoc>

      <ExampleSection
        title="Single Dataset"
        description="Display a single set of metrics."
        code={`<RadarChart
  data={singleData}
  dataKeys={['value']}
  config={config}
/>`}
        vueCode={`<template>
  <RadarChart
    :data="singleData"
    :data-keys="['value']"
    :config="config"
  />
</template>`}
      >
        <div className="max-w-[300px]">
          <RadarChart
            data={singleData}
            dataKeys={['value']}
            config={config}
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Different visual styles for the radar area."
        code={`<RadarChart data={data} dataKeys={keys} variant="default" />
<RadarChart data={data} dataKeys={keys} variant="filled" />
<RadarChart data={data} dataKeys={keys} variant="outlined" />`}
        vueCode={`<template>
  <RadarChart :data="data" :data-keys="keys" variant="default" />
  <RadarChart :data="data" :data-keys="keys" variant="filled" />
  <RadarChart :data="data" :data-keys="keys" variant="outlined" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Default</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              variant="default"
              showLegend={false}
            />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Filled</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              variant="filled"
              showLegend={false}
            />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Outlined</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              variant="outlined"
              showLegend={false}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Comparison"
        description="Compare multiple datasets on the same radar."
        code={`<RadarChart
  data={comparisonData}
  dataKeys={['player1', 'player2']}
  config={config}
  showLegend
/>`}
        vueCode={`<template>
  <RadarChart
    :data="comparisonData"
    :data-keys="['player1', 'player2']"
    :config="config"
    show-legend
  />
</template>`}
      >
        <div className="max-w-[350px]">
          <RadarChart
            data={skillsData}
            dataKeys={['player1', 'player2']}
            config={config}
            showLegend
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Without Grid"
        description="Hide the polar grid for a cleaner look."
        code={`<RadarChart data={data} dataKeys={keys} showGrid={false} />`}
        vueCode={`<template>
  <RadarChart :data="data" :data-keys="keys" :show-grid="false" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">With Grid</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              showGrid
              showLegend={false}
            />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Without Grid</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              showGrid={false}
              showLegend={false}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Fill Opacity"
        description="Adjust the opacity of the filled area."
        code={`<RadarChart data={data} dataKeys={keys} fillOpacity={0.3} />
<RadarChart data={data} dataKeys={keys} fillOpacity={0.8} />`}
        vueCode={`<template>
  <RadarChart :data="data" :data-keys="keys" :fill-opacity="0.3" />
  <RadarChart :data="data" :data-keys="keys" :fill-opacity="0.8" />
</template>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">Low Opacity (0.3)</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              fillOpacity={0.3}
              showLegend={false}
            />
          </div>
          <div className="max-w-[250px]">
            <p className="text-xs font-bold uppercase mb-2">High Opacity (0.8)</p>
            <RadarChart
              data={singleData}
              dataKeys={['value']}
              config={config}
              fillOpacity={0.8}
              showLegend={false}
            />
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
