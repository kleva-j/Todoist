import { type Schema, CreateProjectForm } from "@/components/projects/form";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

export type FormStateType = "idle" | "loading" | "success";

export function CreateProject() {
  const createProject = useMutation(api.projects.create);

  const [formState, setFormState] = useState<FormStateType>("idle");
  const [isOpen, setOpen] = useState(false);

  function submit({ title }: Schema) {
    setFormState("loading");

    toast.promise(createProject({ name: title }), {
      success: "Project created successfully",
      error: "Failed to create project",
      loading: "Creating project...",
      finally() {
        setOpen(false);
        setFormState("idle");
      },
    });
  }

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger title="Create project" asChild>
        <Button variant="ghost" className="size-6 p-0 rounded-full">
          <Plus className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <CreateProjectForm formStatus={formState} onSubmit={submit} />
      </PopoverContent>
    </Popover>
  );
}
