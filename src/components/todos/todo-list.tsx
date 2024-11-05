"use client";

import type { Id } from "@/convex/_generated/dataModel";

import { LoadingSkeleton } from "@/components/todos/loader";
import { CreateTodo } from "@/components/todos/create-new";
import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "@/components/todos/todo-item";
import { useMutation, useQuery } from "convex/react";
import { CircleCheckBig, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Todolist() {
  const todos = useQuery(api.todos.getAllByUser, {});

  const groups = Object.groupBy(todos ?? [], (item) =>
    item.isCompleted ? "completed" : "inCompleted"
  );

  const updateMutation = useMutation(api.todos.update);

  const toggleCompleted = (id: Id<"todos">, isCompleted: boolean) => {
    toast.promise(updateMutation({ _id: id, isCompleted }), {
      success: "Todo updated",
      error: "An error occurred",
      loading: "Updating...",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        {todos === undefined ? (
          <div className="flex flex-1 mt-6">
            <LoadingSkeleton />
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {groups.inCompleted?.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <TodoItem todo={todo} handleToggle={toggleCompleted} />
                </motion.div>
              ))}

              <CreateTodo>
                <Button
                  className="self-start px-0 hover:bg-transparent"
                  variant="ghost"
                >
                  <Plus className="mr-1.5 stroke-red-400 stroke-[1px] size-5" />
                  Add task
                </Button>
              </CreateTodo>

              {groups.completed?.map((todo) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, x: -400, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 200, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <TodoItem todo={todo} handleToggle={toggleCompleted} />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex items-center gap-1 border-b py-2 text-xs italic border-zinc-100 text-foreground/60">
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
          </>
        )}
      </div>
    </>
  );
}

export default Todolist;
