"use client";

import type { Project, Label, FilterGroups } from "@/types";
import type { Id } from "@/convex/_generated/dataModel";

import { TodoItemDialog } from "@/components/todos/todo-item-dialog";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { LoadingSkeleton } from "@/components/todos/loader";
import { Todolist } from "@/components/todos/todo-list";
import { queryFunctionGroups } from "@/lib/constants";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { waitFor } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { groupBy } from "lodash";

export interface TodosProps {
  filterGroup: FilterGroups;
}

export const Todos = ({ filterGroup }: TodosProps) => {
  const { projectsQuery, labelsQuery, todosQuery } =
    queryFunctionGroups[filterGroup];

  const projects = useQuery(projectsQuery, {});
  const labels = useQuery(labelsQuery, {});
  const todos = useQuery(todosQuery, {});

  const projectsById = groupBy(projects ?? [], (project) => project._id);
  const labelsById = groupBy(labels ?? [], (label) => label._id);
  const todosById = groupBy(todos ?? [], (todo) => todo._id);

  const [queryState, setQueryState] = useQueryState("tid");
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    waitFor(() => !open).then(() => setQueryState(null));
  };

  const handleTodoItemClick = (todoId: Id<"todos">) => {
    setQueryState(todoId);
    setOpen(true);
  };

  const selectedTodo = useMemo(() => {
    const matchingTodo = todosById[queryState as Id<"todos">]?.[0];

    if (!matchingTodo) return null;

    return {
      ...matchingTodo,
      project:
        matchingTodo.projectId &&
        projectsById[matchingTodo.projectId as Id<"projects">]
          ? (
              projectsById[
                matchingTodo.projectId as Id<"projects">
              ] as Project[]
            )[0]
          : undefined,
      label:
        matchingTodo.labelId && labelsById[matchingTodo.labelId as Id<"labels">]
          ? (labelsById[matchingTodo.labelId as Id<"labels">] as Label[])[0]
          : undefined,
    };
  }, [queryState, todosById, projectsById, labelsById]);

  if (todos === undefined || labels === undefined || projects === undefined) {
    return (
      <div className="flex flex-col gap-1 py-4">
        <div className="flex flex-1 mt-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <Todolist
        todos={todos}
        labels={labels}
        projects={projects}
        labelsById={labelsById}
        projectsById={projectsById}
        onTodoItemClick={handleTodoItemClick}
      />

      <Dialog open={open && !!selectedTodo} onOpenChange={handleOpenChange}>
        <DialogContent className="p-4">
          <TodoItemDialog
            projects={projects}
            todo={selectedTodo}
            labels={labels}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
