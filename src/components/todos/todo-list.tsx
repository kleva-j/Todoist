"use client";

import type { Id } from "@/convex/_generated/dataModel";
import type { Projects, Todos, Labels } from "@/types";

import { CompletedTodoItem } from "@/components/todos/completed-todo-item";
import { CreateTodo } from "@/components/todos/create-new";
import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "@/components/todos/todo-item";
import { CircleCheckBig, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";

export interface TodolistProps {
  todos: Todos;
  labels: Labels;
  projects: Projects;
}

export function Todolist({ todos, projects, labels }: TodolistProps) {
  const todoGroups = Object.groupBy(todos ?? [], (todo) =>
    todo.isCompleted ? "completed" : "inCompleted"
  );

  const [deletionAlertOpen, setDeletionAlertOpen] = useState(false);
  const [deletionAlertData, setDeletionAlertData] = useState<{
    id: Id<"todos">;
  } | null>(null);

  const projectsById = Object.groupBy(projects ?? [], (project) => project._id);
  const labelsById = Object.groupBy(labels ?? [], (label) => label._id);

  const updateMutation = useMutation(api.todos.update);
  const deleteMutation = useMutation(api.todos.remove);

  const toggleCompleted = (id: Id<"todos">, isCompleted: boolean) => {
    toast.promise(updateMutation({ _id: id, isCompleted }), {
      success: isCompleted ? "Todo completed" : "Todo reverted",
      error: "An error occurred",
      loading: "Updating...",
      duration: 2000,
    });
  };

  const deleteTodo = (id: Id<"todos">) => {
    setDeletionAlertData({ id });
    setDeletionAlertOpen(true);
  };

  const closeDeletionAlert = () => {
    setDeletionAlertOpen(false);
    setDeletionAlertData(null);
  };

  const confirmDeletion = () => {
    if (!deletionAlertData) return;

    toast.promise(deleteMutation({ todoId: deletionAlertData.id }), {
      success: "Todo deleted",
      error: "An error occurred",
      loading: "Deleting...",
      duration: 2000,
    });

    closeDeletionAlert();
  };

  const updateTodo = (id: Id<"todos">, values: Partial<Todos[number]>) => {
    toast.promise(updateMutation({ _id: id, ...values }), {
      success: "Todo updated",
      error: "An error occurred",
      loading: "Updating...",
      duration: 2000,
    });
  };

  const updateProject = (id: Id<"todos">, projectId: Id<"projects">) => {
    updateTodo(id, { projectId });
  };

  const updateLabel = (id: Id<"todos">, labelId: Id<"labels">) => {
    updateTodo(id, { labelId });
  };

  const updatePriority = (id: Id<"todos">, priority: number) => {
    updateTodo(id, { priority });
  };

  return (
    <div className="flex flex-col gap-1 py-4">
      <AnimatePresence mode="popLayout">
        {todoGroups.inCompleted?.map((todo) => (
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
              labels={labels}
              projects={projects}
              handleDelete={deleteTodo}
              updateLabel={updateLabel}
              updateProject={updateProject}
              handleToggle={toggleCompleted}
              updatePriority={updatePriority}
              label={todo.labelId ? labelsById[todo.labelId]?.[0] : undefined}
              project={
                todo.projectId ? projectsById[todo.projectId]?.[0] : undefined
              }
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

        {todoGroups.completed?.map((todo) => (
          <motion.div
            layout
            key={todo._id}
            initial={{ opacity: 0, x: -300, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <CompletedTodoItem
              todo={todo}
              handleDelete={deleteTodo}
              handleToggle={toggleCompleted}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center gap-1 border-b py-2 text-xs italic border-zinc-100 dark:border-zinc-800 text-foreground/60">
        <CircleCheckBig
          className={cn("size-4", {
            "text-emerald-400": todoGroups.completed?.length,
          })}
        />
        <span>+ {todoGroups.completed?.length ?? 0}</span>
        <span>Completed Task(s)</span>
      </div>

      <AlertDialog open={deletionAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this todo?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeletionAlert}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletion}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Todolist;
