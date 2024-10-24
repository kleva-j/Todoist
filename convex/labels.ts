import { mutateWithUser, queryWithUser } from "./utils";
import { internalQuery } from "./_generated/server";
import { Labels } from "./schema";

// LABELS QUERIES
export const getOneByUser = queryWithUser({
  args: { labelId: Labels._id },
  handler: ({ db, identity }, { labelId }) => {
    const userId = identity.tokenIdentifier;
    return db
      .query("labels")
      .filter((q) =>
        q.and(q.eq(q.field("_id"), labelId), q.eq(q.field("userId"), userId))
      )
      .unique();
  },
});

export const getAllByUser = queryWithUser({
  args: {},
  handler: async ({ db, identity }) => {
    const user = identity.tokenIdentifier;

    return db
      .query("labels")
      .filter((q) => q.eq(q.field("userId"), user))
      .order("desc")
      .collect();
  },
});

export const getOne = internalQuery({
  args: { labelId: Labels._id },
  handler: async ({ db }, { labelId }) => {
    return await db.get(labelId);
  },
});

export const getAll = internalQuery({
  args: {},
  handler: ({ db }) => {
    return db.query("labels").order("desc").collect();
  },
});

// LABELS MUTATIONS
export const create = mutateWithUser({
  args: Labels.withoutSystemFields,
  handler: async ({ db, identity }, { name, ...rest }) => {
    const userId = identity.tokenIdentifier;

    const label = await db
      .query("labels")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("name"), name))
      .unique();

    if (label) throw new Error("Label already exists");

    return db.insert("labels", { ...rest, userId, name });
  },
});

export const update = mutateWithUser({
  args: Labels.withSystemFields,
  handler: async ({ db, identity }, { _id, name }) => {
    const userId = identity.tokenIdentifier;

    const label = await db
      .query("labels")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), _id))
      .unique();

    if (!label) return null;

    return await db.patch(label._id, { name });
  },
});

export const remove = mutateWithUser({
  args: { labelId: Labels._id },
  handler: async ({ db, identity }, { labelId }) => {
    const userId = identity.tokenIdentifier;

    const label = await db
      .query("labels")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), labelId))
      .unique();

    if (!label) throw new Error("Label does not exist.");

    return await db.delete(label._id);
  },
});
