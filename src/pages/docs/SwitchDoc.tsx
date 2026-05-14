import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/switch.tsx?raw'
import vueSourceCode from '@vue-ui/Switch.vue?raw'



const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui'
import { Label } from '@/components/ui'

const enabled = ref(false)
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode" v-model:checked="enabled" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>`

const usageCode = `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`

export function SwitchDoc() {
  return (
    <>
      <ComponentDoc
        name="Switch"
        description="A toggle switch control with bold neubrutalism styling for binary on/off states."
        dependencies={['@radix-ui/react-switch']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueDependencies={['reka-ui']}
        vueSourceCode={vueSourceCode}
        vueUsageCode={vueUsageCode}
      >
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </ComponentDoc>

      {/* Default Checked */}
      <ExampleSection
        title="Default Checked"
        description="A switch that is checked by default."
        code={`<div className="flex items-center space-x-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Enable Notifications</Label>
</div>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/ui'
import { Label } from '@/components/ui'

const notifications = ref(true)
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch id="notifications" v-model:checked="notifications" />
    <Label for="notifications">Enable Notifications</Label>
  </div>
</template>`}
      >
        <div className="flex items-center space-x-2">
          <Switch id="notifications" defaultChecked />
          <Label htmlFor="notifications">Enable Notifications</Label>
        </div>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="A disabled switch that cannot be toggled."
        code={`<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Switch id="disabled-off" disabled />
    <Label htmlFor="disabled-off">Disabled Off</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="disabled-on" disabled defaultChecked />
    <Label htmlFor="disabled-on">Disabled On</Label>
  </div>
</div>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/ui'
import { Label } from '@/components/ui'

const disabledOn = ref(true)
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <Switch id="disabled-off" disabled />
      <Label for="disabled-off">Disabled Off</Label>
    </div>
    <div class="flex items-center space-x-2">
      <Switch id="disabled-on" disabled v-model:checked="disabledOn" />
      <Label for="disabled-on">Disabled On</Label>
    </div>
  </div>
</template>`}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off">Disabled Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on">Disabled On</Label>
          </div>
        </div>
      </ExampleSection>

      {/* Form Example */}
      <ExampleSection
        title="Form"
        description="Multiple switches in a settings form."
        code={`<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label htmlFor="marketing">Marketing emails</Label>
    <Switch id="marketing" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="security">Security alerts</Label>
    <Switch id="security" defaultChecked />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="updates">Product updates</Label>
    <Switch id="updates" />
  </div>
</div>`}
        vueCode={`<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/ui'
import { Label } from '@/components/ui'

const marketing = ref(false)
const security = ref(true)
const updates = ref(false)
</script>

<template>
  <div class="w-full max-w-sm space-y-4">
    <div class="flex items-center justify-between">
      <Label for="marketing">Marketing emails</Label>
      <Switch id="marketing" v-model:checked="marketing" />
    </div>
    <div class="flex items-center justify-between">
      <Label for="security">Security alerts</Label>
      <Switch id="security" v-model:checked="security" />
    </div>
    <div class="flex items-center justify-between">
      <Label for="updates">Product updates</Label>
      <Switch id="updates" v-model:checked="updates" />
    </div>
  </div>
</template>`}
      >
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing">Marketing emails</Label>
            <Switch id="marketing" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="security">Security alerts</Label>
            <Switch id="security" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="updates">Product updates</Label>
            <Switch id="updates" />
          </div>
        </div>
      </ExampleSection>
    </>
  )
}
