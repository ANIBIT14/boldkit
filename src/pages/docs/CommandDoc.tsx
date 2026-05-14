import { useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import sourceCode from '@/components/ui/command.tsx?raw'
import vueSourceCode from '@vue-ui/Command.vue?raw'


const usageCode = `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export default function Example() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`


const vueUsageCode = `<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui'
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Search</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>`

export function CommandDoc() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ComponentDoc
        name="Command"
        description="A command menu component for searching and selecting actions with keyboard navigation."
        dependencies={['cmdk', '@radix-ui/react-dialog']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
        nuxtClientOnly={true}
      >
        <Command className="border-3 border-foreground bk-shadow max-w-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="A simple command menu with groups."
        code={`<Command className="border-3 border-foreground">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar className="mr-2 h-4 w-4" />
        Calendar
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        vueCode={`<script setup lang="ts">
import { Calendar, Settings } from 'lucide-vue-next'
</script>

<template>
  <Command class="border-3 border-foreground">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <Calendar class="mr-2 h-4 w-4" />
          Calendar
        </CommandItem>
        <CommandItem>
          <Settings class="mr-2 h-4 w-4" />
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>`}
      >
        <Command className="border-3 border-foreground bk-shadow max-w-md">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ExampleSection>

      {/* With Shortcuts */}
      <ExampleSection
        title="With Shortcuts"
        description="Display keyboard shortcuts alongside command items."
        code={`<Command className="border-3 border-foreground">
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>Ctrl+P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
        <CommandShortcut>Ctrl+B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>Ctrl+S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        vueCode={`<script setup lang="ts">
import { User, CreditCard, Settings } from 'lucide-vue-next'
</script>

<template>
  <Command class="border-3 border-foreground">
    <CommandInput placeholder="Type a command..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Actions">
        <CommandItem>
          <User class="mr-2 h-4 w-4" />
          <span>Profile</span>
          <CommandShortcut>Ctrl+P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCard class="mr-2 h-4 w-4" />
          <span>Billing</span>
          <CommandShortcut>Ctrl+B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Settings class="mr-2 h-4 w-4" />
          <span>Settings</span>
          <CommandShortcut>Ctrl+S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>`}
      >
        <Command className="border-3 border-foreground bk-shadow max-w-md">
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>Ctrl+P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>Ctrl+B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>Ctrl+S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ExampleSection>

      {/* With Separator */}
      <ExampleSection
        title="With Separator"
        description="Use separators to divide command groups."
        code={`<Command className="border-3 border-foreground">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Preferences</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        vueCode={`<template>
  <Command class="border-3 border-foreground">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>Profile</CommandItem>
        <CommandItem>Preferences</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>`}
      >
        <Command className="border-3 border-foreground bk-shadow max-w-md">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ExampleSection>

      {/* Dialog */}
      <ExampleSection
        title="Command Dialog"
        description="Open command menu in a dialog with keyboard shortcut."
        code={`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>
  Open Command Menu
</Button>
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
        vueCode={`<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div>
    <Button @click="open = true">
      Open Command Menu
    </Button>
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem @select="open = false">Calendar</CommandItem>
          <CommandItem @select="open = false">Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>`}
      >
        <div>
          <Button onClick={() => setOpen(true)}>
            Open Command Menu
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => setOpen(false)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem onSelect={() => setOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>Ctrl+P</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>Ctrl+S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </ExampleSection>
    </>
  )
}
