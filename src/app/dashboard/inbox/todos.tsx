"use client";

import { LoadingSkeleton } from "@/components/todos/loader";
import { Todolist } from "@/components/todos/todo-list";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const InboxTodos = () => {
  const todos = useQuery(api.todos.getAllByUser, {});

  if (todos === undefined) {
    return (
      <div className="flex flex-col gap-1 py-4">
        <div className="flex flex-1 mt-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return <Todolist todos={todos} />;
};
