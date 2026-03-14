import { useState } from 'react'
import { Home, Settings, Users, FileText, HelpCircle, LogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
  SidebarToggle,
  SidebarInset,
} from '@/components/ui/sidebar'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: 'none' | 'icon' | 'hidden'
  side?: 'left' | 'right'
}

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  tooltip?: string
  variant?: 'default' | 'active'
}

// Sub-components: Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter,
// SidebarGroup, SidebarGroupLabel, SidebarItem, SidebarSeparator, SidebarToggle, SidebarInset

export { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, ... }`

const usageCode = `import {
  Sidebar, SidebarProvider, SidebarHeader, SidebarContent,
  SidebarItem, SidebarToggle, SidebarInset
} from '@/components/ui/sidebar'

export default function Example() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarContent>
          <SidebarItem icon={<Home />}>Home</SidebarItem>
          <SidebarItem icon={<Settings />}>Settings</SidebarItem>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarToggle />
        <main>Content</main>
      </SidebarInset>
    </SidebarProvider>
  )
}`

const vueUsageCode = `<script setup lang="ts">
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarItem, SidebarToggle, SidebarInset } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>Logo</SidebarHeader>
      <SidebarContent>
        <SidebarItem :icon="HomeIcon">Home</SidebarItem>
        <SidebarItem :icon="SettingsIcon">Settings</SidebarItem>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <SidebarToggle />
      <main>Content</main>
    </SidebarInset>
  </SidebarProvider>
</template>`

function SidebarDemo({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [activeItem, setActiveItem] = useState('home')

  return (
    <div className="border-3 border-foreground h-[400px] overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar>
          <SidebarHeader>
            <span className="font-bold text-lg">BoldKit</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarItem
                icon={<Home className="h-4 w-4" />}
                tooltip="Home"
                variant={activeItem === 'home' ? 'active' : 'default'}
                onClick={() => setActiveItem('home')}
              >
                Home
              </SidebarItem>
              <SidebarItem
                icon={<Users className="h-4 w-4" />}
                tooltip="Users"
                variant={activeItem === 'users' ? 'active' : 'default'}
                onClick={() => setActiveItem('users')}
              >
                Users
              </SidebarItem>
              <SidebarItem
                icon={<FileText className="h-4 w-4" />}
                tooltip="Documents"
                variant={activeItem === 'docs' ? 'active' : 'default'}
                onClick={() => setActiveItem('docs')}
              >
                Documents
              </SidebarItem>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarItem
                icon={<Settings className="h-4 w-4" />}
                tooltip="Settings"
                variant={activeItem === 'settings' ? 'active' : 'default'}
                onClick={() => setActiveItem('settings')}
              >
                Settings
              </SidebarItem>
              <SidebarItem
                icon={<HelpCircle className="h-4 w-4" />}
                tooltip="Help"
                variant={activeItem === 'help' ? 'active' : 'default'}
                onClick={() => setActiveItem('help')}
              >
                Help
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<LogOut className="h-4 w-4" />} tooltip="Logout">
              Logout
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <SidebarToggle />
              <h1 className="text-xl font-bold uppercase">{activeItem}</h1>
            </div>
            <p className="text-muted-foreground">
              Press Cmd+B (or Ctrl+B) to toggle the sidebar.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export function SidebarDoc() {
  return (
    <>
      <ComponentDoc
        name="Sidebar"
        description="A collapsible sidebar component with icon-only mode, mobile drawer support, and keyboard shortcut (Cmd+B)."
        dependencies={['@radix-ui/react-dialog', '@radix-ui/react-tooltip', 'lucide-react']}
        vueDependencies={['reka-ui', 'lucide-vue-next']}
        sourceCode={sourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <SidebarDemo />
      </ComponentDoc>

      {/* Collapsed by Default */}
      <ExampleSection
        title="Collapsed by Default"
        description="Start the sidebar in collapsed state."
        code={`<SidebarProvider defaultOpen={false}>
  <Sidebar>
    <SidebarContent>
      <SidebarItem icon={<Home />} tooltip="Home">Home</SidebarItem>
      <SidebarItem icon={<Settings />} tooltip="Settings">Settings</SidebarItem>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarToggle />
    <main>Content</main>
  </SidebarInset>
</SidebarProvider>`}
        vueCode={`<template>
  <SidebarProvider :default-open="false">
    <Sidebar>
      <SidebarContent>
        <SidebarItem :icon="HomeIcon" tooltip="Home">Home</SidebarItem>
        <SidebarItem :icon="SettingsIcon" tooltip="Settings">Settings</SidebarItem>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <SidebarToggle />
      <main>Content</main>
    </SidebarInset>
  </SidebarProvider>
</template>`}
      >
        <SidebarDemo defaultOpen={false} />
      </ExampleSection>

      {/* Structure */}
      <ExampleSection
        title="Component Structure"
        description="The sidebar is composed of multiple sub-components for flexibility."
        code={`<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      {/* Logo, branding */}
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarItem icon={<Icon />} tooltip="Label">
          Label
        </SidebarItem>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        {/* Another section */}
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      {/* User menu, logout */}
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarToggle />
    {/* Main content */}
  </SidebarInset>
</SidebarProvider>`}
        vueCode={`<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader><!-- Logo --></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Section</SidebarGroupLabel>
          <SidebarItem :icon="Icon" tooltip="Label">Label</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter><!-- Footer --></SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <SidebarToggle />
      <!-- Main content -->
    </SidebarInset>
  </SidebarProvider>
</template>`}
      >
        <div className="text-sm text-muted-foreground space-y-2">
          <p><code className="bg-muted px-1">SidebarProvider</code> - Context wrapper, handles state</p>
          <p><code className="bg-muted px-1">Sidebar</code> - The sidebar container</p>
          <p><code className="bg-muted px-1">SidebarHeader</code> - Top section for logo/branding</p>
          <p><code className="bg-muted px-1">SidebarContent</code> - Scrollable main content area</p>
          <p><code className="bg-muted px-1">SidebarFooter</code> - Bottom section for user/logout</p>
          <p><code className="bg-muted px-1">SidebarGroup</code> - Groups related items</p>
          <p><code className="bg-muted px-1">SidebarGroupLabel</code> - Label for a group</p>
          <p><code className="bg-muted px-1">SidebarItem</code> - Navigation item with icon and tooltip</p>
          <p><code className="bg-muted px-1">SidebarSeparator</code> - Visual divider</p>
          <p><code className="bg-muted px-1">SidebarToggle</code> - Button to toggle sidebar</p>
          <p><code className="bg-muted px-1">SidebarInset</code> - Main content wrapper</p>
        </div>
      </ExampleSection>

      {/* Keyboard Shortcut */}
      <ExampleSection
        title="Keyboard Shortcut"
        description="The sidebar can be toggled with Cmd+B (Mac) or Ctrl+B (Windows/Linux)."
        code={`// The keyboard shortcut is built-in
// Press Cmd+B or Ctrl+B to toggle

// You can also programmatically toggle:
const { toggleSidebar } = useSidebar()
toggleSidebar()`}
        vueCode={`// The keyboard shortcut is built-in
// Press Cmd+B or Ctrl+B to toggle

// You can also programmatically toggle:
const { toggleSidebar } = useSidebar()
toggleSidebar()`}
      >
        <div className="p-4 border-3 border-dashed border-muted-foreground/50 text-center">
          <p className="text-sm text-muted-foreground">
            Try pressing <kbd className="px-2 py-1 bg-muted border-2 border-foreground text-xs font-bold">⌘ B</kbd> or <kbd className="px-2 py-1 bg-muted border-2 border-foreground text-xs font-bold">Ctrl B</kbd>
          </p>
        </div>
      </ExampleSection>

      {/* Active State */}
      <ExampleSection
        title="Active State"
        description="Highlight the currently active navigation item."
        code={`<SidebarItem
  icon={<Home />}
  tooltip="Home"
  variant="active"
>
  Home
</SidebarItem>

<SidebarItem
  icon={<Settings />}
  tooltip="Settings"
  variant="default"
>
  Settings
</SidebarItem>`}
        vueCode={`<template>
  <SidebarItem :icon="HomeIcon" tooltip="Home" variant="active">
    Home
  </SidebarItem>
  <SidebarItem :icon="SettingsIcon" tooltip="Settings" variant="default">
    Settings
  </SidebarItem>
</template>`}
      >
        <div className="flex gap-4">
          <div className="space-y-1 border-3 border-foreground p-2 bg-background">
            <SidebarItem icon={<Home className="h-4 w-4" />} variant="active">
              Active Item
            </SidebarItem>
            <SidebarItem icon={<Settings className="h-4 w-4" />} variant="default">
              Default Item
            </SidebarItem>
          </div>
        </div>
      </ExampleSection>

      {/* Mobile Support */}
      <ExampleSection
        title="Mobile Support"
        description="On mobile screens, the sidebar automatically becomes a Sheet/drawer."
        code={`// No extra code needed!
// The sidebar automatically uses Sheet on mobile (< 768px)
// Triggered via SidebarToggle or Cmd+B`}
        vueCode={`<!-- No extra code needed! -->
<!-- The sidebar automatically uses Sheet on mobile (< 768px) -->
<!-- Triggered via SidebarToggle or Cmd+B -->`}
      >
        <div className="p-4 border-3 border-dashed border-muted-foreground/50 text-center">
          <p className="text-sm text-muted-foreground">
            Resize your browser to see the mobile drawer behavior.
          </p>
        </div>
      </ExampleSection>
    </>
  )
}
