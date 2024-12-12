"use client";

import Dynamic from "next/dynamic";

import { useDashboardContext } from "@/dashboard/_components/context";
import { FilterGroups } from "@/types";

const Todolist = Dynamic(() =>
  import("@/app/dashboard/todos").then((mod) => mod.Todos)
);

export const TodoListWrapper = () => {
  const { activeFilterOption } = useDashboardContext();

  return <Todolist filterGroup={FilterGroups[activeFilterOption ?? "inbox"]} />;
};
