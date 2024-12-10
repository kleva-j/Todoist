import type { PropsWithChildren, ReactNode } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardProvider } from "@/dashboard/_components/context";
import { AppSidebar } from "@/components/layout/sidebar";

type LayoutProps = Readonly<PropsWithChildren & { header: ReactNode }>;

function DashboardLayout({ children, header }: LayoutProps) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {header}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}

export default DashboardLayout;
