"use client";

import type { Id } from "@/convex/_generated/dataModel";
import type { Projects, Todos, Labels } from "@/types";

import { CreateTodo } from "@/components/todos/create-new";
import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "@/components/todos/todo-item";
import { CircleCheckBig, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface TodolistProps {
  todos: Todos;
  labels: Labels;
  projects: Projects;
}

export function Todolist({ todos, projects, labels }: TodolistProps) {
  const groups = Object.groupBy(todos ?? [], (item) =>
    item.isCompleted ? "completed" : "inCompleted"
  );

  const projectsById = Object.groupBy(projects ?? [], (item) => item._id);
  const labelsById = Object.groupBy(labels ?? [], (item) => item._id);

  const updateMutation = useMutation(api.todos.update);

  const toggleCompleted = (id: Id<"todos">, isCompleted: boolean) => {
    toast.promise(updateMutation({ _id: id, isCompleted }), {
      success: isCompleted ? "Todo completed" : "Todo reverted",
      error: "An error occurred",
      loading: "Updating...",
      duration: 1000,
    });
  };

  return (
    <div className="flex flex-col gap-1 py-4">
      <AnimatePresence mode="popLayout">
        {groups.inCompleted?.map(({ projectId, labelId, ...todo }) => (
          <motion.div
            layout
            key={todo._id}
            initial={{ opacity: 0, x: -300, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <TodoItem
              todo={todo}
              handleToggle={toggleCompleted}
              label={labelId ? labelsById[labelId]?.[0] : undefined}
              project={projectId ? projectsById[projectId]?.[0] : undefined}
            />
          </motion.div>
        ))}

        <CreateTodo>
          <Button
            className="self-start px-0 hover:bg-transparent my-1"
            variant="ghost"
          >
            <Plus className="mr-1.5 stroke-red-400 stroke-[1px] size-5" />
            Add task
          </Button>
        </CreateTodo>

        {groups.completed?.map(({ projectId, labelId, ...todo }) => (
          <motion.div
            layout
            key={todo._id}
            initial={{ opacity: 0, x: -300, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <TodoItem
              todo={todo}
              handleToggle={toggleCompleted}
              label={labelId ? labelsById[labelId]?.[0] : undefined}
              project={projectId ? projectsById[projectId]?.[0] : undefined}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center gap-1 border-b py-2 text-xs italic border-zinc-100 dark:border-zinc-800 text-foreground/60">
        <>
          <CircleCheckBig
            className={cn("size-4", {
              "text-emerald-400": groups.completed?.length,
            })}
          />
          <span>+ {groups.completed?.length ?? 0}</span>
          <span>Completed Task(s)</span>
        </>
      </div>
    </div>
  );
}

export default Todolist;
