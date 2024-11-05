import { paginationOptsValidator } from "convex/server";
import { pick, pickBy } from "lodash";
import { v } from "convex/values";

import { internalQuery } from "./_generated/server";
import { Todos, SubTasks } from "./schema";
import {
  sanitizeInput as sanitize,
  mutateWithUser,
  queryWithUser,
} from "./utils";

// QUERIES
export const getOneByUser = queryWithUser({
  args: { todoId: Todos._id, includeSubTasks: v.optional(v.boolean()) },
  handler: async (ctx, { todoId, includeSubTasks }) => {
    const userId = ctx.identity.tokenIdentifier;

    const todo = await ctx.db
      .query("todos")
      .filter((q) =>
        q.and(q.eq(q.field("_id"), todoId), q.eq(q.field("userId"), userId))
      )
      .unique();

    if (!todo) return null;

    if (!includeSubTasks) return todo;

    const subTasks = await ctx.db
      .query("subtasks")
      .withIndex("by_todo", (q) => q.eq("todoId", todo._id))
      .collect();

    return { ...todo, subTasks };
  },
});

export const getAllByUser = queryWithUser({
  args: { includeSubTasks: v.optional(v.boolean()) },
  handler: async (ctx, { includeSubTasks }) => {
    const user = ctx.identity.tokenIdentifier;
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), user))
      .order("desc")
      .collect();

    if (!includeSubTasks) return todos;

    const payload = [];

    for (const todo of todos) {
      const subTask = await ctx.db
        .query("subtasks")
        .withIndex("by_todo", (q) => q.eq("todoId", todo._id))
        .order("desc")
        .collect();
      const group = { ...todo, subTask };
      payload.push(group);
    }

    return payload;
  },
});

export const getOne = internalQuery({
  args: { todoId: Todos._id },
  handler: async (ctx, { todoId }) => {
    return await ctx.db.get(todoId);
  },
});

export const getAll = internalQuery({
  args: { paginationOpts: paginationOptsValidator },
  handler: (ctx, { paginationOpts }) => {
    return ctx.db.query("todos").order("desc").paginate(paginationOpts);
  },
});

// MUTATIONS
export const create = mutateWithUser({
  args: {
    title: v.string(),
    priority: v.optional(v.number()),
    description: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
    dueDate: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
    labelId: v.optional(v.id("labels")),
  },
  handler: async (ctx, { title, isCompleted = false, ...rest }) => {
    const userId = ctx.identity.tokenIdentifier;

    if (!title) throw new Error("Title is required");

    if (rest.projectId) {
      const project = await ctx.db
        .query("projects")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("_id"), rest.projectId))
        .unique();

      if (!project) throw new Error("Project does not exist");
    }

    const input = sanitize(rest, [
      "description",
      "projectId",
      "priority",
      "labelId",
      "dueDate",
    ]);

    return ctx.db.insert("todos", { ...input, userId, title, isCompleted });
  },
});

export const createSubTask = mutateWithUser({
  args: SubTasks.withoutSystemFields,
  handler: async ({ db, identity }, { todoId, ...rest }) => {
    const userId = identity.tokenIdentifier;

    const todo = await db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), todoId))
      .unique();

    if (!todo) throw new Error("Todo does not exist");

    const payload = { ...rest, userId, todoId };

    return db.insert("subtasks", payload);
  },
});

export const update = mutateWithUser({
  args: {
    _id: Todos._id,
    priority: v.optional(v.number()),
    description: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
    dueDate: v.optional(v.number()),
    title: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
    labelId: v.optional(v.id("labels")),
  },
  handler: async ({ db, identity }, { _id, ...rest }) => {
    const userId = identity.tokenIdentifier;

    const todo = await db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), _id))
      .unique();

    if (!todo) return null;

    const input = pick(rest, [
      "title",
      "priority",
      "isCompleted",
      "description",
      "dueDate",
      "projectId",
      "labelId",
    ]);

    const sanitizedInput = pickBy(input, (value) => value !== undefined);

    await db.patch(todo._id, { ...sanitizedInput });
  },
});

export const updateSubTask = mutateWithUser({
  args: SubTasks.withSystemFields,
  handler: async ({ db, identity }, { _id, description, dueDate, ...rest }) => {
    const userId = identity.tokenIdentifier;

    const subTask = await db
      .query("subtasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), _id))
      .unique();

    if (!subTask) throw new Error("SubTask does not exist!");

    const { title, priority, isCompleted } = rest;

    const payload = { description, dueDate, priority, title, isCompleted };

    await db.patch(subTask._id, payload);
  },
});

export const remove = mutateWithUser({
  args: { todoId: Todos._id },
  handler: async ({ db, identity }, { todoId }) => {
    const userId = identity.tokenIdentifier;

    const todo = await db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), todoId))
      .unique();

    if (!todo) throw new Error("Todo does not exist.");

    await db
      .query("subtasks")
      .withIndex("by_todo", (q) => q.eq("todoId", todo._id))
      .order("desc")
      .collect()
      .then((subTasks) =>
        subTasks.forEach(async (task) => await db.delete(task._id))
      );

    return db.delete(todo._id);
  },
});

export const deleteSubTask = mutateWithUser({
  args: { subTaskId: SubTasks._id },
  handler: async ({ db, identity }, { subTaskId }) => {
    const userId = identity.tokenIdentifier;

    const subTask = await db
      .query("subtasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), subTaskId))
      .unique();

    if (!subTask) throw new Error("SubTask does not exist!");

    return db.delete(subTask._id);
  },
});
