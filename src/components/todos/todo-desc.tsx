import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCheck, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { z } from "zod";

import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form";

const FormSchema = z.object({ description: z.string().min(1).max(100) });
const resolver = zodResolver(FormSchema);
type Schema = z.infer<typeof FormSchema>;

interface UpdateTodoDescProps {
  description: string;
  onDescUpdate: (text: string) => void;
}

export const TodoDesc = (props: UpdateTodoDescProps) => {
  const { description, onDescUpdate } = props;

  const form = useForm<Schema>({ resolver, defaultValues: { description } });

  function onSubmit({ description }: Schema) {
    const hasChanged = !isEqual(description, props.description);
    if (hasChanged) onDescUpdate(description);
    else form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2 my-2 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <>
                    <Textarea
                      placeholder="Add a description"
                      className="roundd-sm resize-none"
                      {...field}
                    />
                    {!isEqual(description, field.value) && (
                      <div className="flex absolute right-2 bottom-1.5">
                        <Button
                          className="group w-max p-0 border-none hover:bg-neutral-50/50 px-2 text-sm h-7"
                          variant="ghost"
                        >
                          <X className="stroke-[1px] size-4 group-hover:stroke-red-700" />
                        </Button>
                        <Button
                          className="group w-max p-0 border-none hover:bg-neutral-50/50 px-2 text-sm h-7"
                          variant="ghost"
                        >
                          <CheckCheck className="stroke-[1px] size-4 group-hover:stroke-green-700" />
                        </Button>
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
};
