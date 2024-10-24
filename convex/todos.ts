import { mutateWithUser, queryWithUser } from "./utils";
import { internalQuery } from "./_generated/server";
import { Todos, SubTasks } from "./schema";

import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

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
  args: Todos.withoutSystemFields,
  handler: async (ctx, { title, projectId, ...rest }) => {
    const userId = ctx.identity.tokenIdentifier;

    const project = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), projectId))
      .unique();

    if (!project) throw new Error("Project does not exist");

    const todo = await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("title"), title))
      .unique();

    if (todo) throw new Error("Todo already exists");

    return ctx.db.insert("todos", { ...rest, userId, title, projectId });
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
  args: Todos.withSystemFields,
  handler: async ({ db, identity }, { _id, projectId, labelId, ...rest }) => {
    const userId = identity.tokenIdentifier;

    const todo = await db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), _id))
      .unique();

    if (!todo) return null;

    const { title, priority, isCompleted, description, dueDate } = rest;

    await db.patch(todo._id, {
      description,
      priority,
      title,
      isCompleted,
      dueDate,
      projectId,
      labelId,
    });
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
