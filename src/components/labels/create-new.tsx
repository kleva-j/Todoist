import { type Schema, CreateLabelForm } from "@/components/labels/form";
import { type MouseEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

export type FormStateType = "idle" | "loading" | "success";

export interface CreateLabelProps {
  handleEffect?: () => void;
}

export function CreateLabel({ handleEffect }: CreateLabelProps) {
  const createLabel = useMutation(api.labels.create);

  const [formState, setFormState] = useState<FormStateType>("idle");
  const [isOpen, setOpen] = useState(false);

  function submit({ title }: Schema) {
    setFormState("loading");

    toast.promise(createLabel({ name: title }), {
      success: "Label created successfully",
      error: "Failed to create label",
      loading: "Creating Label...",
      finally() {
        setOpen(false);
        setFormState("idle");
        handleEffect?.();
      },
    });
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center justify-center ml-auto">
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger title="Create label" onClick={handleClick} asChild>
          <Button variant="ghost" className="size-6 p-0 rounded-full">
            <Plus className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <CreateLabelForm formStatus={formState} onSubmit={submit} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
