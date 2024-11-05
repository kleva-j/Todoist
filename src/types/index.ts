import type { Doc } from "@/convex/_generated/dataModel";

export type Project = Doc<"projects">;
export type TodoItem = Doc<"todos">;
export type Label = Doc<"labels">;

export type Projects = Project[];
export type Todos = TodoItem[];
export type Labels = Label[];
