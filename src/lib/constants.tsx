import type { FilterQueryFunctions } from "@/types";

import { api } from "@/convex/_generated/api";

export const queryFunctionGroups: FilterQueryFunctions = {
  today: {
    projectsQuery: api.projects.getAllByUser,
    labelsQuery: api.labels.getAllByUser,
    todosQuery: api.todos.getTodayTodos,
  },
  inbox: {
    projectsQuery: api.projects.getAllByUser,
    labelsQuery: api.labels.getAllByUser,
    todosQuery: api.todos.getRecentTodos,
  },
  upcoming: {
    projectsQuery: api.projects.getAllByUser,
    labelsQuery: api.labels.getAllByUser,
    todosQuery: api.todos.getAllByUser,
  }
};
