import { mutateWithUser, queryWithUser } from "./utils";
import { internalQuery } from "./_generated/server";
import { Projects } from "./schema";
import { paginationOptsValidator } from "convex/server";

// PROJECT QUERIES
export const getOneByUser = queryWithUser({
  args: { projectId: Projects._id },
  handler: (ctx, { projectId }) => {
    const userId = ctx.identity.tokenIdentifier;
    return ctx.db
      .query("projects")
      .filter((q) =>
        q.and(q.eq(q.field("_id"), projectId), q.eq(q.field("userId"), userId))
      )
      .unique();
  },
});

export const getAllByUser = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const user = ctx.identity.tokenIdentifier;
    return ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), user))
      .order("desc")
      .collect();
  },
});

export const getOne = internalQuery({
  args: { projectId: Projects._id },
  handler: async (ctx, { projectId }) => {
    return await ctx.db.get(projectId);
  },
});

export const getAll = internalQuery({
  args: { paginationOpts: paginationOptsValidator },
  handler: (ctx, { paginationOpts }) => {
    return ctx.db.query("projects").order("desc").paginate(paginationOpts);
  },
});

// PROJECT MUTATIONS
export const create = mutateWithUser({
  args: Projects.withoutSystemFields,
  handler: async (ctx, { name, ...rest }) => {
    const userId = ctx.identity.tokenIdentifier;

    const project = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("name"), name))
      .unique();

    if (project) throw new Error("Project already exists");

    return ctx.db.insert("projects", { ...rest, userId, name });
  },
});

export const update = mutateWithUser({
  args: Projects.withSystemFields,
  handler: async ({ db, identity }, { _id, name }) => {
    const project = await db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", identity.tokenIdentifier))
      .filter((q) => q.eq(q.field("_id"), _id))
      .unique();
    if (!project) return null;
    const updated = await db.patch(project._id, { name });
    return updated;
  },
});

export const remove = mutateWithUser({
  args: { projectId: Projects._id },
  handler: async ({ db, identity }, { projectId }) => {
    const userId = identity.tokenIdentifier;
    const project = await db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), projectId))
      .unique();

    if (!project) throw new Error("Project does not exist.");

    return db.delete(project._id);
  },
});
