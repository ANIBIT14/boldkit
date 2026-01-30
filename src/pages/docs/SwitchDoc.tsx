import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-3 border-foreground bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary bk-shadow-sm',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 border-2 border-foreground bg-background shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }`

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
