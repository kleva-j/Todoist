"use client";

import Link from "next/link";

import { LayoutGrid, ChevronRight } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@/components/ui/collapsible";

import {
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  SidebarMenuSubItem,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

export const LabelSidebarMenu = () => {
  const labels = useQuery(api.labels.getAllByUser);

  return (
    <Collapsible asChild defaultOpen>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Filters & Labels">
            <LayoutGrid />
            <span>Filters & Labels</span>
            <SidebarMenuAction asChild className="data-[state=open]:rotate-90">
              <div>
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </div>
            </SidebarMenuAction>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {labels === undefined ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuSub key={index}>
              <SidebarMenuSkeleton />
            </SidebarMenuSub>
          ))
        ) : Array.isArray(labels) ? (
          <CollapsibleContent>
            <SidebarMenuSub>
              {labels?.map((item) => (
                <SidebarMenuSubItem key={item.name}>
                  <SidebarMenuSubButton asChild>
                    <Link href={"#"} className="capitalize">
                      #<span>{item.name}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
};
