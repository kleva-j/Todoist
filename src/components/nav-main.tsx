"use client";

import Link from "next/link";

import { CalendarDays, Calendar, Inbox } from "lucide-react";
import { usePathname } from "next/navigation";

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
            isActive={!activePath || activePath === "inbox"}
          >
            <Link href="/dashboard/inbox">
              <Inbox />
              <span>Inbox</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Today"
            isActive={activePath === "today"}
          >
            <Link href="/dashboard/today">
              <Calendar />
              <span>Today</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Upcoming"
            isActive={activePath === "upcoming"}
          >
            <Link href="/dashboard/upcoming">
              <CalendarDays />
              <span>Upcoming</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
