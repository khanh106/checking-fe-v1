import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarTrigger } from "@/components/ui/sidebar"

export default function LeftSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
