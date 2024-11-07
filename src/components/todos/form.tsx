"use client";

import { InputBlock, Input, rootVariants } from "@/components/ui/input-block";
import { CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { SmartDatetimeInput } from "@/components/ui/date-time-input";
import { TagsInput } from "@/components/ui/tags-input";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { addMinutes } from "date-fns/addMinutes";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  FormDescription,
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.string().optional(),
  projectId: z.string().optional(),
  labels: z.array(z.string()),
  isCompleted: z.boolean().default(true),
  dueDate: z.date(),
});

export type CreateFormSchema = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export interface CreateTodosFormProps {
  projects: { id: string; name: string }[];
  labels: string[];
  onSubmit: (values: CreateFormSchema) => void;
}

export function CreateTodosForm(props: CreateTodosFormProps) {
  const { projects, labels, onSubmit } = props;

  const defaultValues = {
    title: "",
    labels,
    projects,
    isCompleted: false,
    dueDate: addMinutes(new Date(), 30),
  };

  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState(false);

  const form = useForm<CreateFormSchema>({ resolver, defaultValues });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputBlock
                  variant="ghost"
                  className="font-medium w-full"
                  rightSection={
                    show ? null : (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShow(true)}
                      >
                        Add description
                      </Button>
                    )
                  }
                >
                  <Input placeholder="Task Name" type="text" {...field} />
                </InputBlock>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible open={show} onOpenChange={setShow}>
          <CollapsibleContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add a Task description"
                      className={cn(
                        "resize-none h-32 dark:placeholder:text-zinc-600 placeholder:text-zinc-400 text-base border-none",
                        rootVariants({ variant: "filled" }),
                        "focus-visible:ring-0"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={expand} onOpenChange={setExpand}>
          <CollapsibleContent className="space-y-6">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Projects.</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a project for the task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-between">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Set a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Set a priority rating for the task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <SmartDatetimeInput
                      name="dueDate"
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="e.g. tomorrow at 3pm"
                    />
                    <FormDescription>
                      You can enter the expected completion date and time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Labels</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select labels."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCompleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as done</FormLabel>
                    <FormDescription>
                      You can manage your mobile notifications in the mobile
                      settings page.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <DialogFooter className="flex items-center gap-4 w-full pt-4">
          <Button
            type="button"
            variant="link"
            className="mr-auto text-muted-foreground text-xs px-0 decoration-muted-foreground"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Hide" : "More"} details {expand ? "-" : "+"}
          </Button>
          <Button type="submit">Create Task</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default CreateTodosForm;
