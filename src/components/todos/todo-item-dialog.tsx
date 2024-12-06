import type { Label, Project, TodoItem } from "@/types";
import type { Id } from "@/convex/_generated/dataModel";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateTimePickerPopover } from "@/components/date-picker/popover";
import { formatRelative } from "date-fns/formatRelative";
import { SubTasks } from "@/components/todos/subtasks";
import { isSameMinute } from "date-fns/isSameMinute";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  CalendarDays,
  FolderOpen,
  PlusCircle,
  FileText,
  Hash,
  Flag,
  Tag,
} from "lucide-react";

import {
  type PriorityKey,
  type DateTime,
  priorityOptions,
} from "@/components/todos/todo-item";

import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

import {
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  Breadcrumb,
} from "@/components/ui/breadcrumb";

export interface TabItem {
  value: string;
  label: string;
  component: (props: { todoId: Id<"todos"> }) => JSX.Element;
}

const tabs: TabItem[] = [
  { value: "subtasks", label: "Subtasks", component: SubTasks },
];

type TodoItemDialogProps = {
  labels: Label[];
  projects: Project[];
  todo: (TodoItem & { project?: Project; label?: Label }) | null;
};

export const TodoItemDialog = (props: TodoItemDialogProps) => {
  const { todo, labels, projects } = props;

  const originalDueDate = todo ? new Date(todo.dueDate!) : new Date();

  const [datetime, setDateTime] = useState<DateTime>(originalDueDate);

  const updateMutation = useMutation(api.todos.update);

  if (todo) {
    const updateTodo = (values: Partial<TodoItem>) => {
      if (!todo) return;

      toast.promise(updateMutation({ _id: todo._id, ...values }), {
        success: "Todo updated",
        error: "An error occurred",
        loading: "Updating...",
        duration: 2000,
      });
    };

    const priority = priorityOptions[String(todo?.priority) as PriorityKey];

    const handleOpen = (value?: boolean) => {
      if (!value) {
        const isValueChanged = datetime !== originalDueDate;
        const withinSameMinutes = isSameMinute(
          datetime as Date,
          originalDueDate
        );

        if (isValueChanged && !withinSameMinutes) {
          // @ts-expect-error: Temporary workaround for type mismatch in external library
          updateTodo({ dueDate: datetime.getTime() });
        }
      }
    };

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {todo?.projectId ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize text-ellipsis text-purple-500">
                    {todo?.project?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : null}
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-ellipsis">
                # {todo._id.slice(0, 10) + "..."}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-emerald-500">edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <Text
            as="h1"
            variant="h4"
            className="font-semibold my-2 tracking-tight"
          >
            {todo.title}
          </Text>
        </div>

        <div className="flex flex-col gap-2 my-2">
          <div className="grid grid-cols-[100px_1fr] gap-2 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Flag className="stroke-[1px] size-4" />
              <Text className="text-sm [&:not(:first-child)]:mt-0">
                Priority
              </Text>
            </div>

            <Select
              defaultValue={
                priority?.value ? String(priority?.value) : undefined
              }
              onValueChange={(value: string) =>
                updateTodo({ priority: parseInt(value) })
              }
            >
              <SelectTrigger className="h-6 w-max border-none shadow-none focus:ring-0 px-0">
                <SelectValue placeholder="Add Priority" className="text-sm" />
              </SelectTrigger>

              <SelectContent>
                {[1, 2, 3, 4].map((value) => {
                  const priority =
                    priorityOptions[String(value) as PriorityKey];
                  return (
                    <SelectItem key={`priority-${value}`} value={String(value)}>
                      <Text className="[&:not(:first-child)]:mt-0 text-sm leading-none flex items-center gap-1 m-0 text-neutral-500 dark:text-neutral-300">
                        <Flag className={cn("size-3", priority?.cn)} />
                        {priority.label}
                      </Text>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-2 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Tag className="stroke-[1px] size-4" />
              <Text className="text-sm [&:not(:first-child)]:mt-0">Label</Text>
            </div>
            {labels && labels.length > 0 ? (
              <Select
                defaultValue={todo.label?._id}
                onValueChange={(labelId: Id<"labels">) =>
                  updateTodo({ labelId })
                }
              >
                <SelectTrigger className="h-6 w-max border-none shadow-none focus:ring-0 px-0">
                  <SelectValue placeholder="Add Label" className="text-sm" />
                </SelectTrigger>
                <SelectContent>
                  {labels.map(({ _id, name }) => (
                    <SelectItem defaultChecked key={_id} value={_id}>
                      <Text className="[&:not(:first-child)]:mt-0 leading-none text-sm flex items-center m-0 text-neutral-500 dark:text-neutral-300">
                        <Tag className="mr-1 size-3 text-sky-400" /> {name}
                      </Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Text className="[&:not(:first-child)]:mt-0 leading-none text-sm flex items-center m-0 text-neutral-500 dark:text-neutral-300">
                No labels
              </Text>
            )}
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-2 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <FolderOpen className="stroke-[1px] size-4" />
              <Text className="text-sm [&:not(:first-child)]:mt-0">
                Project
              </Text>
            </div>
            {projects && projects.length > 0 ? (
              <Select
                defaultValue={todo.project?._id}
                onValueChange={(projectId: Id<"projects">) =>
                  updateTodo({ projectId })
                }
              >
                <SelectTrigger className="h-6 w-max border-none shadow-none focus:ring-0 px-0">
                  <SelectValue placeholder="Add Project" className="text-sm" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(({ _id, name }) => (
                    <SelectItem defaultChecked key={_id} value={_id}>
                      <Text className="[&:not(:first-child)]:mt-0 leading-none text-sm flex items-center m-0 text-purple-500">
                        <Hash className="mr-1 size-3" />
                        {name}
                      </Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Text className="[&:not(:first-child)]:mt-0 leading-none text-sm flex items-center m-0 text-neutral-500 dark:text-neutral-300">
                No projects
              </Text>
            )}
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-2">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <CalendarDays className="stroke-[1px] size-4" />
              <Text className="text-sm [&:not(:first-child)]:mt-0">
                Due date
              </Text>
            </div>
            <DateTimePickerPopover
              setDateTime={setDateTime}
              setInputValue={() => {}}
              dateTime={datetime}
              onOpen={handleOpen}
            >
              {todo.dueDate ? (
                <Button
                  className="p-0 leading-none h-min w-max hover:bg-transparent"
                  variant="ghost"
                >
                  <Text className="[&:not(:first-child)]:mt-0 text-sm capitalize tracking-tight text-neutral-600 dark:text-neutral-400">
                    {formatRelative(new Date(todo.dueDate), new Date())}
                  </Text>
                </Button>
              ) : (
                <Button
                  className="w-max p-0 hover:bg-transparent border px-2 rounded-lg border-dashed border-neutral-400 text-sm h-7"
                  variant="ghost"
                >
                  <PlusCircle className="mr-1.5 stroke-[1px] size-4" />
                  Add
                </Button>
              )}
            </DateTimePickerPopover>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-2 text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <FileText className="stroke-[1px] size-4" />
              <Text className="text-sm [&:not(:first-child)]:mt-0">
                Description
              </Text>
            </div>
            {todo.description && todo.description.length > 0 ? (
              <div className="text-xs text-muted-foreground">
                <Text className="[&:not(:first-child)]:mt-0 text-sm">
                  {todo.description}
                </Text>
              </div>
            ) : (
              <Button
                className="w-max p-0 hover:bg-transparent border px-2 rounded-lg border-dashed border-neutral-400 text-sm h-6"
                variant="ghost"
              >
                <PlusCircle className="mr-1.5 stroke-[1px] size-4" />
                Add
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="subtasks" className="w-full">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="">
                <Text className="text-sm">{tab.label}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => {
            const Component = tab.component;
            return (
              <TabsContent key={tab.value} value={tab.value}>
                <Component todoId={todo._id} />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    );
  }
};
