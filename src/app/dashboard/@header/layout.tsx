import Link from "next/link";

import type { PropsWithChildren } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Breadcrumb,
} from "@/components/ui/breadcrumb";

function DashboardHeaderLayout({ children }: PropsWithChildren) {
  return (
    <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-b bg-background justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {children}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mr-4 flex gap-2 flex-wrap items-center">
        <ModeToggle className="[&>svg]:size-3.5 [&>svg]:stroke-[1px] size-5" />
      </div>
    </header>
  );
}

export default DashboardHeaderLayout;
