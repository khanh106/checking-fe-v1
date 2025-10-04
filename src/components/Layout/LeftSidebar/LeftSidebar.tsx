"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/constants/app";
import { Home, History, MapPin, HelpCircle } from "lucide-react";

export default function LeftSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const getIcon = (path: string) => {
    switch (path) {
      case "/":
        return <Home className="h-4 w-4" />;
      case "/attendance/history":
        return <History className="h-4 w-4" />;
      case "/work-location":
        return <MapPin className="h-4 w-4" />;
      case "/guide":
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarContent>
        <SidebarMenu className="pt-16 pb-4">
          {MENU_ITEMS.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                className="w-full"
              >
                <Link href={item.path} className="flex items-center gap-2">
                  {getIcon(item.path)}
                  <span className="truncate">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {children}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="hidden md:flex" />
      </SidebarFooter>
    </Sidebar>
  );
}
