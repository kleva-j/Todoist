"use client";

import Link from "next/link";

import { MoreHorizontal, Trash2, Folder, Share, Frame } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuSkeleton,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects() {
  const { isMobile } = useSidebar();

  const projects = useQuery(api.projects.getAllByUser);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects === undefined ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuSkeleton />
            </SidebarMenuItem>
          ))
        ) : (
          <>
            {projects.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={"#"}>
                    <Frame />
                    <span>{item.name}</span>
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
                      <Folder className="text-muted-foreground size-4" />
                      <span className="text-sm">View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Share className="text-muted-foreground size-4" />
                      <span className="text-sm">Share Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Trash2 className="text-muted-foreground size-4" />
                      <span className="text-sm">Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            {projects.length > 3 && (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MoreHorizontal />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
