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

  const projects = projectQuery.map(({ _id, name }) => ({ id: _id, name }));
  const labels = labelsQuery.map(({ name }) => name);

  const createMutation = useMutation(api.todos.create);

  const handleSubmit = async (values: CreateFormSchema) => {
    if (!values) return;

    toast.promise(
      createMutation({
        title: values.title,
        description: values.description,
        isCompleted: values.isCompleted,
        projectId: values.projectId as Id<"projects">,
        dueDate: values.dueDate.getTime(),
      }),
      {
        loading: "Creating todo...",
        success: "Todo created successfully",
        error: "Failed to create todo",
      }
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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
