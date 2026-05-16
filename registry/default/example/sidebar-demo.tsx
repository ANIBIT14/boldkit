import {
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
}