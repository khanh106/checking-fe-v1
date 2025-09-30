import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Flex } from "@/elements/Flex/Flex"
import { cn } from "@/lib/utils"
import { cookies } from "next/headers"
import Header from "../Header/Header"
import LeftSidebar from "../LeftSidebar/LeftSidebar"

export default async function LayoutWithSidebars({
  children,
  leftSidebarChildren,
  showHeader = true,
}: Readonly<{
  children: React.ReactNode
  leftSidebarChildren?: React.ReactNode
  showHeader?: boolean
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider className="flex flex-col" defaultOpen={defaultOpen}>
      {showHeader && <Header />}
      <Flex className="flex-1" align="start">
        <LeftSidebar>
          {leftSidebarChildren}
          {/* {items.map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} className={cn(item.isActive && "bg-neutral-3")}>
                    <AvatarText text={item.title} className={cn(!item.isActive && "text-neutral-8")} />
                    <span>{item.title}</span>
                    <Icon name="ChevronRightRegular" className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <AvatarText text={subItem.title} length={1} className={cn("text-neutral-6")} />
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))} */}
        </LeftSidebar>
        <SidebarInset
          className={cn(
            "h-[calc(100svh-var(--header-height))] overflow-x-auto",
            // "max-w-[calc(100%-var(--sidebar-width)-var(--right-sidebar-width))]",
            // "peer-data-[collapsible=icon]:max-w-[calc(100%-var(--sidebar-width-icon)-var(--right-sidebar-width))]",
            "gap-y-4 px-4",
          )}
        >
          {children}
        </SidebarInset>
        {/* <RightSidebar /> */}
      </Flex>
    </SidebarProvider>
  )
}
