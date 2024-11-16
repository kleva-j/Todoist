import type { TodoItem, Project, Label as TodoLabel, Label } from "@/types";
import type { Id } from "@/convex/_generated/dataModel";

import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { intlFormatDistance } from "date-fns/intlFormatDistance";
import { Label as LabelComponent } from "@/components/ui/label";
import { differenceInHours } from "date-fns/differenceInHours";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { parseInt } from "lodash";
import { cn } from "@/lib/utils";
import {
  AlarmClock,
  RefreshCw,
  PenLine,
  Trash2,
  Hash,
  Flag,
  Tag,
} from "lucide-react";

import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

const priorityOptions = {
  "1": { label: "Low", value: 1, cn: "text-sky-500" },
  "2": { label: "Medium", value: 2, cn: "text-yellow-500" },
  "3": { label: "High", value: 3, cn: "text-amber-500" },
  "4": { label: "Urgent", value: 4, cn: "text-red-500" },
};

type PriorityKey = keyof typeof priorityOptions;

export interface TodoItemProps {
  todo: TodoItem;
  labels: Label[];
  projects: Project[];
  project: Project | undefined;
  label: TodoLabel | undefined;
  handleDelete: (id: Id<"todos">) => void;
  updatePriority: (id: Id<"todos">, priority: number) => void;
  handleToggle: (id: Id<"todos">, isCompleted: boolean) => void;
  updateLabel: (id: Id<"todos">, labelId: Id<"labels">) => void;
  updateProject: (id: Id<"todos">, projectId: Id<"projects">) => void;
}

export function TodoItem({
  project: currentProject,
  label: currentLabel,
  updatePriority,
  updateProject,
  handleDelete,
  handleToggle,
  updateLabel,
  projects,
  labels,
  todo,
}: TodoItemProps) {
  const { _id, title, isCompleted, dueDate } = todo;

  const priority = priorityOptions[String(todo.priority!) as PriorityKey];

  const current = new Date();
  const formatedDueDate = new Date(dueDate!);

  const diffInHrs = differenceInHours(formatedDueDate, current);
  const within2Hr = diffInHrs <= 2 && diffInHrs >= 1;

  const diffInMins = differenceInMinutes(formatedDueDate, current);
  const within1Hr = diffInMins <= 59 && diffInMins >= 1;

  const pastDueDate = diffInHrs <= 0 && diffInMins <= 0;

  return (
    <div
      id={`todo-${_id}`}
      className={cn(
        "flex flex-col py-1.5 pb-2 border-b gap-2 border-zinc-200/50 dark:border-zinc-800 group",
        {
          "gap-0.5":
            todo.projectId !== undefined ||
            todo.labelId !== undefined ||
            todo.priority !== undefined,
        }
      )}
    >
      <div
        className={cn("flex items-center gap-2", {
          "opacity-50 [&_p]:font-normal": isCompleted,
        })}
      >
        <LabelComponent
          className={cn(
            "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer flex gap-1.5 items-center relative",
            { "line-through text-muted-foreground": isCompleted }
          )}
        >
          <Checkbox
            checked={isCompleted}
            className={cn("rounded-full size-4 text-muted")}
            onCheckedChange={() => handleToggle(_id, !isCompleted)}
          />
        </LabelComponent>

        <div className="flex gap-3 flex-1 items-center">
          <Text
            className={cn(
              "[&:not(:first-child)]:mt-0 font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer",
              {
                "line-through text-muted-foreground": isCompleted,
                "animate-pulse bg-gradient-to-r from-white via-red-50/50 to-white dark:bg-gradient-to-r dark:from-neutral-950/40 dark:via-neutral-950/60 dark:to-neutral-950/40":
                  !isCompleted && pastDueDate,
              }
            )}
          >
            {title}
          </Text>
          {!isCompleted && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300 bg-slate-200/30 dark:bg-white/[.1] px-1 py-0.5 rounded-md">
              <PenLine className="size-3 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400 duration-300" />
              <Trash2
                className="size-3 stroke-red-300 hover:stroke-red-400 duration-300"
                onClick={() => handleDelete(_id)}
              />
            </div>
          )}
        </div>
      </div>
      {!isCompleted && (
        <div className="flex flex-1 justify-between items-center ml-6">
          <Text
            className={cn(
              "text-foreground/50 text-xs font-normal leading-none flex gap-1",
              {
                "text-yellow-400": within2Hr,
                "text-orange-400": within1Hr,
                "text-destructive dark:text-red-500": pastDueDate,
              }
            )}
          >
            {pastDueDate && (
              <RefreshCw className="size-3 text-red-400 cursor-pointer hover:text-red-500 stroke-[2.5px]" />
            )}
            {intlFormatDistance(formatedDueDate, current)}
            {(within2Hr || within1Hr) && (
              <AlarmClock className="size-3 cursor-pointer stroke-[2.5px]" />
            )}
          </Text>
          <div className="flex gap-3 items-center">
            {priority && (
              <Select
                onValueChange={(value) => updatePriority(_id, parseInt(value))}
                defaultValue={String(priority.value)}
              >
                <SelectTrigger className="h-6">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[1, 2, 3, 4].map((value) => {
                    const priority =
                      priorityOptions[String(value) as PriorityKey];
                    return (
                      <SelectItem
                        key={`priority-${value}`}
                        value={String(value)}
                      >
                        <Text className="[&:not(:first-child)]:mt-0 text-[11px] leading-none flex items-center gap-1">
                          <Flag className={cn("size-2.5", priority?.cn)} />
                          {priority.label}
                        </Text>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            {currentProject && (
              <Select
                onValueChange={(value: Id<"projects">) =>
                  updateProject(_id, value)
                }
                defaultValue={currentProject?._id}
              >
                <SelectTrigger className="h-6 px-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(({ _id, name }) => (
                    <SelectItem defaultChecked key={_id} value={_id}>
                      <Text className="[&:not(:first-child)]:mt-0 leading-none text-xs flex items-center text-purple-500">
                        <Hash className="mr-1 size-3" />
                        {name}
                      </Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {currentLabel && (
              <Select
                onValueChange={(value: Id<"labels">) => updateLabel(_id, value)}
                defaultValue={currentLabel?._id}
              >
                <SelectTrigger className="h-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {labels.map(({ _id, name }) => (
                    <SelectItem defaultChecked key={_id} value={_id}>
                      <Text className="[&:not(:first-child)]:mt-0 leading-none text-xs flex items-center m-0 text-neutral-500 dark:text-neutral-300">
                        <Tag className="mr-1 size-2.5 text-sky-400" /> {name}
                      </Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
