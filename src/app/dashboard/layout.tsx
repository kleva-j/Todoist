import type { PropsWithChildren, ReactNode } from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";

type LayoutProps = Readonly<PropsWithChildren & { header: ReactNode }>;

function DashboardLayout({ children, header }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {header}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
