import Dynamic from "next/dynamic";

import type { ComponentProps } from "react";

import { SidebarContent, Sidebar } from "@/components/ui/sidebar";
import { Sidebar_Header } from "@/components/sidebar-header";
import { NavMain } from "@/components/nav-main";

const NavProjects = Dynamic(() =>
  import("@/components/nav-projects").then((mod) => mod.NavProjects)
);

const LabelSidebarMenu = Dynamic(() =>
  import("@/components/label-sidebar-menu").then((mod) => mod.NavLabelMenu)
);

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <Sidebar_Header />
      <SidebarContent>
        <NavMain />
        <LabelSidebarMenu />
        <NavProjects />
      </SidebarContent>
    </Sidebar>
  );
}
