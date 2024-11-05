import type { Id } from "@/convex/_generated/dataModel";
import type { TodoItem } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TodoItemProps {
  todo: TodoItem;
  handleToggle: (id: Id<"todos">, isCompleted: boolean) => void;
}

export function TodoItem({ todo, handleToggle }: TodoItemProps) {
  const { _id, title, isCompleted } = todo;

  const checkId = `todo-${_id}`;

  return (
    <div
      className="flex flex-col py-1.5 border-b border-zinc-100"
    >
      <div
        className={cn("flex items-center gap-2", { "opacity-50": isCompleted })}
      >
        <Label
          htmlFor={checkId}
          className={cn(
            "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer flex gap-1.5 items-center relative",
            { "line-through text-muted-foreground": isCompleted }
          )}
          onClick={() => handleToggle(_id, !isCompleted)}
        >
          <Checkbox
            id={checkId}
            checked={isCompleted}
            className={cn("rounded-full size-4", {})}
          />
          <Text className="[&:not(:first-child)]:mt-0">{title}</Text>
        </Label>
      </div>
      <div></div>
    </div>
  );
}
