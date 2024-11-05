import Dynamic from "next/dynamic";

import type { ComponentProps } from "react";

import { SidebarContent, Sidebar } from "@/components/ui/sidebar";
import { Sidebar_Header } from "@/components/sidebar-header";
import { NavMain } from "@/components/nav-main";

const NavProjects = Dynamic(() =>
  import("@/components/nav-projects").then((mod) => mod.NavProjects)
);

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <Sidebar_Header />
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
    </Sidebar>
  );
}
