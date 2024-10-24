import { Table } from "convex-helpers/server";
import { defineSchema } from "convex/server";
import { v } from "convex/values";

export const Users = Table("users", {
  name: v.string(),
  email: v.string(),
  isVerified: v.boolean(),
  tokenIdentifier: v.string(),
});

export const Sessions = Table("sessions", {
  userId: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("ended"),
    v.literal("removed"),
    v.literal("revoked")
  ),
  clientId: v.string(),
  sessionId: v.string(),
  expireAt: v.number(),
  lastActiveAt: v.number(),
});

export const Todos = Table("todos", {
  title: v.string(),
  description: v.optional(v.string()),
  userId: v.string(),
  projectId: v.id("projects"),
  labelId: v.id("labels"),
  priority: v.optional(v.float64()),
  isCompleted: v.boolean(),
  dueDate: v.number(),
});

export const SubTasks = Table("subtasks", {
  title: v.string(),
  description: v.optional(v.string()),
  userId: v.string(),
  todoId: v.id("todos"),
  priority: v.optional(v.float64()),
  isCompleted: v.boolean(),
  dueDate: v.number(),
});

export const Labels = Table("labels", {
  name: v.string(),
  userId: v.string(),
  type: v.union(v.literal("system"), v.literal("user")),
});

export const Projects = Table("projects", {
  name: v.string(),
  userId: v.string(),
  type: v.union(v.literal("system"), v.literal("user")),
});

export default defineSchema({
  users: Users.table.index("by_token", ["tokenIdentifier"]),
  sessions: Sessions.table
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_sess_id", ["sessionId"]),
  todos: Todos.table
    .index("by_title", ["title"])
    .index("by_user", ["userId"])
    .index("by_label", ["labelId"])
    .index("by_project", ["projectId"]),
  subtasks: SubTasks.table
    .index("by_user", ["userId"])
    .index("by_todo", ["todoId"]),
  labels: Labels.table.index("by_user", ["userId"]),
  projects: Projects.table.index("by_user", ["userId"]),
});
