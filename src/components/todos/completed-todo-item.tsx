import type { Id } from "@/convex/_generated/dataModel";
import type { TodoItem } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TodoItemProps {
  todo: TodoItem;
  handleDelete: (id: Id<"todos">) => void;
  handleToggle: (id: Id<"todos">, isCompleted: boolean) => void;
}

export function CompletedTodoItem({ todo, handleToggle }: TodoItemProps) {
  const { _id, title, isCompleted } = todo;

  return (
    <div
      id={`todo-${_id}`}
      className="py-1.5 pb-2 border-b border-zinc-200/50 dark:border-zinc-800 group"
    >
      <div className="flex items-center gap-2 opacity-50 [&_p]:font-normal">
        <Label
          className={cn(
            "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer flex gap-1.5 items-center relative line-through text-muted-foreground"
          )}
        >
          <Checkbox
            checked={isCompleted}
            className={cn("rounded-full size-4 text-muted")}
            onCheckedChange={() => handleToggle(_id, false)}
          />
        </Label>

        <Text
          className={cn(
            "flex-1 font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm cursor-pointer line-through text-muted-foreground [&:not(:first-child)]:mt-0"
          )}
        >
          {title}
        </Text>
      </div>
    </div>
  );
}
