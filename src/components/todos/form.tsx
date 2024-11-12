"use client";

import { CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { InputBlock, Input } from "@/components/ui/input-block";
import { DateTimePicker } from "@/components/date-picker";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { addMinutes } from "date-fns/addMinutes";
import { Button } from "@/components/ui/button";
import { type Tag, TagInput } from "emblor";
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
  labels: z.array(z.object({ id: z.string(), text: z.string() })),
  isCompleted: z.boolean().default(true),
  dueDate: z.date(),
});

export type CreateFormSchema = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export interface CreateTodosFormProps {
  projects: { id: string; name: string }[];
  labels: Tag[];
  onSubmit: (values: CreateFormSchema) => void;
}

export function CreateTodosForm(props: CreateTodosFormProps) {
  const { projects, labels, onSubmit } = props;

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const defaultValues = {
    title: "",
    labels,
    projects,
    priority: "1",
    isCompleted: false,
    dueDate: addMinutes(new Date(), 30),
  };

  const [expand, setExpand] = useState(false);

  const form = useForm<CreateFormSchema>({ resolver, defaultValues });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto w-full"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputBlock
                  variant={expand ? "default" : "ghost"}
                  className={cn(
                    "font-medium focus-within:ring-1 focus-within:ring-offset-1",
                    { "ring-emerald-500": !expand }
                  )}
                >
                  <Input
                    placeholder="Task Name"
                    className=""
                    type="text"
                    {...field}
                  />
                </InputBlock>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible open={expand} onOpenChange={setExpand}>
          <CollapsibleContent asChild>
            <div className="flex flex-col gap-y-4 overflow-visible bg-white dark:bg-black">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description.</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Add a task description"
                        className={cn(
                          "resize-none dark:placeholder:text-zinc-600 px-2 placeholder:text-neutral-400 text-base focus-within:ring-1 focus-visible:ring-1 focus-within:ring-offset-1"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {projects.length > 0 && (
                <FormField
                  name="projectId"
                  control={form.control}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="labels"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Labels</FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value}
                        setTags={field.onChange}
                        placeholder="Add a label"
                        styleClasses={{
                          tagList: { container: "gap-1" },
                          input:
                            "rounded-lg ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:ring-offset-1 mb-2",
                          tag: {
                            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-bold text-xs ps-2 pe-7 space-y-3 capitalize",
                            closeButton:
                              "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 border border-transparent ring-offset-background transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 text-muted-foreground/80 hover:text-foreground",
                          },
                        }}
                        activeTagIndex={activeTagIndex}
                        setActiveTagIndex={setActiveTagIndex}
                        inputFieldPosition="top"
                        interaction="clickable"
                        inlineTags={false}
                        animation="bounce"
                        maxTags={5}
                        showCount
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-start justify-between">
                <FormField
                  name="dueDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-max">
                      <FormLabel>Due Date</FormLabel>
                      <DateTimePicker
                        name={field.name}
                        dateTime={field.value}
                        setDateTime={field.onChange}
                        onBlur={field.onBlur}
                        autoComplete="off"
                      />
                      <FormDescription>
                        You can enter the expected completion date and time.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="priority"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="max-w-[120px]">
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
                          <SelectItem value="1">Priority 1</SelectItem>
                          <SelectItem value="2">Priority 2</SelectItem>
                          <SelectItem value="3">Priority 3</SelectItem>
                          <SelectItem value="4">Priority 4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Set a priority rating for the task.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isCompleted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-x-2 space-y-0 py-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as Completed</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
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
