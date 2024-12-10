"use client";

import { Calendar } from "lucide-react";

import {
  type FilterOption,
  useDashboardContext,
} from "@/dashboard/_components/context";

import {
  SelectContent,
  SelectTrigger,
  SelectItem,
  Select,
} from "@/components/ui/select";

export const SelectOptions = () => {
  const context = useDashboardContext();

  const { filterOptions, activeFilterOption, setActiveFilterOption } = context;

  return (
    <Select
      defaultValue={activeFilterOption}
      onValueChange={(value: string) =>
        setActiveFilterOption(value as FilterOption)
      }
    >
      <SelectTrigger className="relative ps-9 h-8">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
          <Calendar size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <span className="capitalize">
          {activeFilterOption ?? "Select Option"}
        </span>
      </SelectTrigger>
      <SelectContent>
        {filterOptions.map((option) => (
          <SelectItem key={option} value={option} className="capitalize">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
