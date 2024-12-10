"use client";

import type { FilterGroups } from "@/types";

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type FilterOption = keyof typeof FilterGroups;
export type ViewOption = "priority" | "label" | "project";
export type ViewOptionMap = { [k in ViewOption]: boolean };

export const viewOptions: ViewOption[] = ["priority", "label", "project"];
export const filterOptions: FilterOption[] = ["inbox", "today", "upcoming"];

interface DashboardContext {
  viewOptions: ViewOption[];
  viewOptionMap: ViewOptionMap;
  filterOptions: FilterOption[];
  activeFilterOption: FilterOption | undefined;
  toggleOption: (option: ViewOption) => void;
  setViewOptionMap: (options: ViewOptionMap) => void;
  setActiveFilterOption: (option: FilterOption | undefined) => void;
}

const DashboardContext = createContext<DashboardContext | null>(null);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );

  return context;
};

export interface DashboardProviderProps extends PropsWithChildren {
  defaultFilterOption?: FilterOption;
}

export const DashboardProvider = (props: DashboardProviderProps) => {
  const { defaultFilterOption, children } = props;

  const [activeFilterOption, setActiveFilterOption] = useState(
    defaultFilterOption ?? filterOptions[0]
  );

  const [viewOptionMap, setViewOptionMap] = useState<ViewOptionMap>(
    () =>
      Object.fromEntries(
        viewOptions.map((option) => [option, true])
      ) as ViewOptionMap
  );

  const toggleOption = (option: ViewOption) =>
    setViewOptionMap((prev) => ({ ...prev, [option]: !prev[option] }));

  useEffect(() => {
    localStorage.setItem("viewOptions", JSON.stringify(viewOptionMap));
  }, [viewOptionMap]);

  return (
    <DashboardContext.Provider
      value={{
        viewOptions,
        filterOptions,
        viewOptionMap,
        activeFilterOption,
        toggleOption,
        setViewOptionMap,
        setActiveFilterOption,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
