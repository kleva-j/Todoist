import type { CreateFormSchema } from "@/components/todos/form";
import type { Id } from "@/convex/_generated/dataModel";
import type { PropsWithChildren } from "react";

import { CreateTodosForm } from "@/components/todos/form";
import { useMutation, useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb,
} from "@/components/ui/breadcrumb";
import {
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";

export function CreateTodo({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const currentPath = pathname?.split("/").pop();

  const projectQuery = useQuery(api.projects.getAllByUser) ?? [];
  const labelsQuery = useQuery(api.labels.getAllByUser) ?? [];

  const projects = projectQuery.map(({ _id, name }) => ({ value: _id, label: name }));
  const labels = labelsQuery.map(({ _id, name }) => ({ id: _id, text: name }));

  const createMutation = useMutation(api.todos.create);

  const handleSubmit = async (values: CreateFormSchema) => {
    if (!values) return;

    const { title, description, isCompleted, dueDate, project } = values;


    toast.promise(
      createMutation({
        title,
        description,
        isCompleted,
        dueDate: dueDate.getTime(),
        priority: Number(values.priority),
        projectId: project?.value as Id<"projects">,
        labelId: values.labels[0]?.id as Id<"labels">,
      }),
      {
        success: "Todo created successfully",
        error: "Failed to create todo",
        loading: "Creating todo...",
      }
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {currentPath}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-emerald-500">
                    new task
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </DialogTitle>
        </DialogHeader>
        <CreateTodosForm
          projects={projects}
          labels={labels}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateTodo;
