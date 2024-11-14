import type { FormStateType } from "@/components/labels/create-new";
import type { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";

import {
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form";

const formSchema = z.object({ title: z.string().min(1).max(30) });
const resolver = zodResolver(formSchema);
export type Schema = z.infer<typeof formSchema>;

interface CreateLabelFormProps {
  formStatus: FormStateType;
  onSubmit: (data: Schema) => void;
}

export const CreateLabelForm: FC<CreateLabelFormProps> = (props) => {
  const { formStatus, onSubmit } = props;
  const form = useForm<Schema>({ resolver, defaultValues: { title: "" } });

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
                <div className="flex rounded-lg shadow-sm shadow-black/5 relative">
                  <Input
                    className="font-medium text-base dark:focus-within:ring-zinc-800"
                    placeholder="Label Name"
                    type="text"
                    {...field}
                  />
                  {formStatus === "loading" && (
                    <Button
                      className={cn("absolute end-0 hover:bg-transparent")}
                      variant="ghost"
                      size="icon"
                    >
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="button" className="hidden" />
      </form>
    </Form>
  );
};
