import type { TodoItem, Project, Label } from "@/types";
import type { Id } from "@/convex/_generated/dataModel";

import { type PropsWithChildren, useState } from "react";

import { useDashboardContext } from "@/app/dashboard/_components/context";
import { DateTimePickerPopover } from "@/components/date-picker/popover";
import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { intlFormatDistance } from "date-fns/intlFormatDistance";
import { Label as LabelComponent } from "@/components/ui/label";
import { differenceInHours } from "date-fns/differenceInHours";
import { isSameMinute } from "date-fns/isSameMinute";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
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

export const priorityOptions = {
  "1": { label: "Low", value: 1, cn: "text-sky-500" },
  "2": { label: "Medium", value: 2, cn: "text-yellow-500" },
  "3": { label: "High", value: 3, cn: "text-amber-500" },
  "4": { label: "Urgent", value: 4, cn: "text-red-500" },
};

export type PriorityKey = keyof typeof priorityOptions;
export type DateTime = Date | undefined;

export interface TodoItemProps extends PropsWithChildren {
  todo: TodoItem;
  labels: Label[];
  projects: Project[];
  onClick: () => void;
  label: Label | undefined;
  project: Project | undefined;
  handleDelete: (id: Id<"todos">) => void;
  updateDueDate: (id: Id<"todos">, dueDate: Date) => void;
  updatePriority: (id: Id<"todos">, priority: number) => void;
  handleToggle: (id: Id<"todos">, isCompleted: boolean) => void;
  updateLabel: (id: Id<"todos">, labelId: Id<"labels">) => void;
  updateProject: (id: Id<"todos">, projectId: Id<"projects">) => void;
}

export function TodoItem({
  project: currentProject,
  label: currentLabel,
  updatePriority,
  updateDueDate,
  updateProject,
  handleDelete,
  handleToggle,
  updateLabel,
  onClick,
  projects,
  labels,
  todo,
}: TodoItemProps) {
  const { _id, title, isCompleted, dueDate } = todo;

  const priority = priorityOptions[String(todo.priority!) as PriorityKey];

  const current = new Date();
  const formatedDueDate = new Date(dueDate!);

  const timeDiffInHours = differenceInHours(formatedDueDate, current);
  const within2Hours = timeDiffInHours <= 2 && timeDiffInHours >= 1;

  const timeDiffInMinutes = differenceInMinutes(formatedDueDate, current);
  const within1Hour = timeDiffInMinutes <= 59 && timeDiffInMinutes >= 1;

  const isPastDueDate = timeDiffInHours <= 0 && timeDiffInMinutes <= 0;

  const [endDateTime, setEndDateTime] = useState<DateTime>(formatedDueDate);

  const handleOpen = (value?: boolean) => {
    if (!value) {
      const isValueChanged = endDateTime !== formatedDueDate;
      const withinSameMinutes = isSameMinute(
        endDateTime as Date,
        formatedDueDate
      );

      if (isValueChanged && !withinSameMinutes) {
        // @ts-expect-error: Temporary workaround for type mismatch in external library
        updateDueDate(_id, endDateTime);
      }
    }
  };

  const { viewOptionMap } = useDashboardContext();

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
                  !isCompleted && isPastDueDate,
              }
            )}
            onClick={onClick}
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
          <DateTimePickerPopover
            dateTime={endDateTime}
            setDateTime={setEndDateTime}
            setInputValue={() => {}}
            onOpen={handleOpen}
          >
            <Button
              className="p-0 leading-none h-min group hover:bg-transparent"
              variant="ghost"
            >
              <Text
                className={cn(
                  "text-foreground/50 text-xs font-normal leading-none flex gap-1",
                  {
                    "text-yellow-400 group-hover:text-yellow-500": within2Hours,
                    "text-orange-400 group-hover:text-orange-500": within1Hour,
                    "text-destructive dark:text-red-500 group-hover:text-red-500 dark:group-hover:text-red-400":
                      isPastDueDate,
                  }
                )}
              >
                {isPastDueDate && (
                  <RefreshCw className="size-3 text-red-400 cursor-pointer group-hover:text-red-500 stroke-[2.5px]" />
                )}
                {intlFormatDistance(formatedDueDate, current)}
                {(within2Hours || within1Hour) && (
                  <AlarmClock className="size-3 cursor-pointer stroke-[2.5px]" />
                )}
              </Text>
            </Button>
          </DateTimePickerPopover>

          <div className="flex gap-3 items-center">
            {priority && viewOptionMap["priority"] && (
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
            {currentProject && viewOptionMap["project"] && (
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
            {currentLabel && viewOptionMap["label"] && (
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
