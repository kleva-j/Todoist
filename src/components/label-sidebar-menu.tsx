"use client";

import Link from "next/link";

import { MoreHorizontal, Trash2, Frame } from "lucide-react";
import { CreateLabel } from "@/components/labels/create-new";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenuSkeleton,
  SidebarMenuAction,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarGroup,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

export const NavLabelMenu = () => {
  const labels = useQuery(api.labels.getAllByUser);

  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="justify-between">
        Filters & Labels
        {labels !== undefined ? <CreateLabel /> : null}
      </SidebarGroupLabel>
      <SidebarMenu>
        {labels === undefined
          ? Array.from({ length: 3 }).map((_, index) => (
              <SidebarMenuSub key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuSub>
            ))
          : labels.map(({ name }) => (
              <SidebarMenuItem key={name}>
                <SidebarMenuButton asChild>
                  <Link href={"#"}>
                    <Frame />
                    <span>{name}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem className="gap-2">
                      <Trash2 className="text-muted-foreground size-4" />
                      <span className="text-sm">Delete Label</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
