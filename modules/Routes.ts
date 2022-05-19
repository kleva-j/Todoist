import { projectsRouting } from "components/organisms/Projects/navigationLayer";
import { settingsRouting } from "components/organisms/Settings/navigationLayer";
import { createAppRouting, prefixRouting } from "./Routing";

export const Routing = createAppRouting(() => ({
  home: "",
  favorites: "favorites",
  settings: prefixRouting("settings", settingsRouting),
  projects: prefixRouting("projects", projectsRouting),
  teams: "teams",
  calendar: "calendar",
  activity: "activity",
  messages: "messages",
  schedule: "schedule",
  report: "report",
  tasks: "tasks",
}));

export const RoutingPatterns = createAppRouting(() => ({
  home: "",
  settings: "settings/*",
  projects: "projects/*",
  calendar: "calendar",
  activity: "activity",
  messages: "messages",
  schedule: "schedule",
  report: "report",
  tasks: "tasks",
  teams: "teams",
  archive: "archive",
  notes: "notes",
  analytics: "analytics",
  notification: "notification",
  reminders: "reminders",
}));
