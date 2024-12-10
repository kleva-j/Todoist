"use client";

import { useDashboardContext } from "@/dashboard/_components/context";
import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import { cn, toSentenceCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";

export function SelectViewOptions() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { viewOptionMap, viewOptions, toggleOption } = useDashboardContext();

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="outline"
          role="combobox"
          size="sm"
          className="ml-auto hidden h-8 gap-2 focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0 lg:flex px-1.5"
        >
          <Settings2 className="size-4" />
          View
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {viewOptions.map((option) => {
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleOption(option)}
                  >
                    <span className="truncate">{toSentenceCase(option)}</span>
                    <Check
                      className={cn(
                        "ml-auto size-4 shrink-0",
                        !!viewOptionMap[option] ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
