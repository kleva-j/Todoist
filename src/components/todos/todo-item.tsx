import type { Id } from "@/convex/_generated/dataModel";
import type { TodoItem } from "@/types";

import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { intlFormatDistance } from "date-fns/intlFormatDistance";
import { differenceInHours } from "date-fns/differenceInHours";
import { AlarmClock, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TodoItemProps {
  todo: TodoItem;
  handleToggle: (id: Id<"todos">, isCompleted: boolean) => void;
}

export function TodoItem({ todo, handleToggle }: TodoItemProps) {
  const { _id, title, isCompleted, dueDate } = todo;

  const current = new Date();
  const formatedDueDate = new Date(dueDate!);

  const diffInHrs = differenceInHours(formatedDueDate, current);
  const within2Hr = diffInHrs <= 2 && diffInHrs >= 1;

  const diffInMins = differenceInMinutes(formatedDueDate, current);
  const within1Hr = diffInMins <= 59 && diffInMins >= 1;

  const pastDueDate = diffInHrs <= 0 && diffInMins <= 0;

  const checkId = `todo-${_id}`;

  return (
    <div
      className={cn(
        "flex flex-col py-1.5 pb-2 gap-2 border-b border-zinc-100 dark:border-zinc-800",
        {
          "animate-pulse bg-gradient-to-r from-white via-red-50/50 to-white dark:bg-gradient-to-r dark:from-neutral-950/40 dark:via-neutral-950/60 dark:to-neutral-950/40":
            !isCompleted && pastDueDate,
        }
      )}
    >
      <div
        className={cn("flex items-center gap-2", {
          "opacity-50 [&_p]:font-normal": isCompleted,
        })}
      >
        <Label
          htmlFor={checkId}
          className={cn(
            "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer flex gap-1.5 items-center relative",
            { "line-through text-muted-foreground": isCompleted }
          )}
        >
          <Checkbox
            id={checkId}
            checked={isCompleted}
            className={cn("rounded-full size-4 text-muted")}
            onCheckedChange={() => handleToggle(_id, !isCompleted)}
          />
          <Text className="[&:not(:first-child)]:mt-0 font-medium leading-4">
            {title}
          </Text>
        </Label>
      </div>
      {!isCompleted && (
        <div className="flex flex-1 ml-6">
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
        </div>
      )}
    </div>
  );
}
