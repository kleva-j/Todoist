import type { Id } from "@/convex/_generated/dataModel";
import type { SubTask } from "@/types";

import { motion, AnimatePresence, LayoutGroup, Reorder } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubtasksProps {
  todoId: Id<"todos">;
}

export const SubTasks = ({ todoId }: SubtasksProps) => {
  const subtasks = useQuery(api.todos.getSubTaskByTodo, { todoId });
  const [notes, setNotes] = useState<SubTask[]>(subtasks ?? []);

  const memoizedSubtasks = useMemo(() => subtasks ?? [], [subtasks]);

  useEffect(() => {
    setNotes(memoizedSubtasks);
  }, [memoizedSubtasks]);

  return (
    <div>
      {notes.length > 0 && (
        <LayoutGroup>
          <AnimatePresence>
            <Reorder.Group
              axis="y"
              values={notes}
              onReorder={setNotes}
              className="flex flex-col gap-y-4 pb-5"
            >
              {notes.map((subtask, index) => (
                <Reorder.Item
                  layout
                  custom={index}
                  value={subtask}
                  key={subtask._id}
                  layoutId={`subtask-${subtask._id}`}
                >
                  <motion.li key={subtask._id} className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      onChange={() => {}}
                      checked={subtask.isCompleted}
                    />
                    <Text
                      className={cn({ "line-through": subtask.isCompleted })}
                    >
                      {subtask.title}
                    </Text>
                  </motion.li>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </AnimatePresence>
        </LayoutGroup>
      )}
      <Button className="self-start p-0 hover:bg-transparent" variant="ghost">
        <Plus className="mr-1.5 stroke-zinc-400 stroke-[1px] size-5" />
        Add Subtask
      </Button>
    </div>
  );
};
