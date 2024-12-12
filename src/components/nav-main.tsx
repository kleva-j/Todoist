"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Inbox } from "lucide-react";

import {
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";

export function NavMain() {
  const pathname = usePathname();
  const activePath = pathname.split("/").filter(Boolean)[1];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Inbox"
            isActive={activePath === "dashboard"}
          >
            <Link href="/dashboard">
              <Inbox />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
