import type { Doc } from "@/convex/_generated/dataModel";

import { api } from "@/convex/_generated/api";

export type SubTask = Doc<"subtasks">;
export type Project = Doc<"projects">;
export type TodoItem = Doc<"todos">;
export type Label = Doc<"labels">;

export type Projects = Project[];
export type Todos = TodoItem[];
export type Labels = Label[];

export enum FilterGroups {
  today = "today",
  inbox = "inbox",
}

export type QueryGroup = {
  projectsQuery: (typeof api)["projects"]["getAllByUser"];
  labelsQuery: (typeof api)["labels"]["getAllByUser"];
  todosQuery:
    | (typeof api)["todos"]["getAllByUser"]
    | (typeof api)["todos"]["getTodayTodos"]
    | (typeof api)["todos"]["getRecentTodos"];
};

export type FilterQueryFunctions = Record<FilterGroups, QueryGroup>;
