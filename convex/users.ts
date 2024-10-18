import type { Doc } from "./_generated/dataModel";

import { internalMutation, QueryCtx } from "./_generated/server";

import schema from "./schema";

// USER MUTATIONS
const userFields = schema.tables.users.validator.fields;

export const createOrUpdate = internalMutation({
  args: userFields,
  handler: async (ctx, { tokenIdentifier, ...rest }) => {
    const existingUser = await checkExistingUser(ctx, tokenIdentifier);
    if (!existingUser)
      return ctx.db.insert("users", { tokenIdentifier, ...rest });
    return ctx.db.patch(existingUser._id, { ...rest });
  },
});

export const deleteUser = internalMutation({
  args: { id: userFields.tokenIdentifier },
  handler: async (ctx, { id }) => {
    const existingUser = await checkExistingUser(ctx, id);
    if (!existingUser) throw new Error("User not found");
    return ctx.db.delete(existingUser._id);
  },
});

async function checkExistingUser(
  ctx: QueryCtx,
  tokenIdentifier: string
): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .unique();
}
