import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/input-otp.tsx?raw'
import vueSourceCode from '@vue-ui/InputOtp.vue?raw'


const usageCode = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

export default function Example() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import { ref } from 'vue'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui'

const value = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="value" :max-length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>`

export function InputOtpDoc() {
  return (
    <>
      <ComponentDoc
        name="Input OTP"
        description="Accessible one-time password component with copy paste functionality and neubrutalism styling."
        dependencies={['input-otp']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple 6-digit OTP input."
        code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui'

const value = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="value" :max-length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>`}
      >
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </ExampleSection>

      {/* With Separator */}
      <ExampleSection
        title="With Separator"
        description="Add separators between groups of digits."
        code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui'

const value = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="value" :max-length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>`}
      >
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </ExampleSection>

      {/* 4-Digit PIN */}
      <ExampleSection
        title="4-Digit PIN"
        description="A shorter OTP for PIN codes."
        code={`<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui'

const value = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="value" :max-length="4">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
    </InputOTPGroup>
  </InputOTP>
</template>`}
      >
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </ExampleSection>

      {/* Pattern Validation */}
      <ExampleSection
        title="Numbers Only"
        description="Restrict input to numbers only using a pattern."
        code={`<InputOTP maxLength={6} pattern="^[0-9]+$">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui'

const value = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="value" :max-length="6" pattern="^[0-9]+$">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>`}
      >
        <div className="space-y-2">
          <InputOTP maxLength={6} pattern="^[0-9]+$">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">Only numbers are allowed</p>
        </div>
      </ExampleSection>
    </>
  )
}
