import type { Doc } from "./_generated/dataModel";

import { internalMutation, QueryCtx } from "./_generated/server";
import { Users } from "./schema";

// USER MUTATIONS
export const createOrUpdate = internalMutation({
  args: Users.withoutSystemFields,
  handler: async (ctx, { tokenIdentifier, ...rest }) => {
    const existingUser = await checkExistingUser(ctx, tokenIdentifier);
    if (!existingUser)
      return ctx.db.insert("users", { tokenIdentifier, ...rest });
    return ctx.db.patch(existingUser._id, { name: rest.name });
  },
});

export const deleteUser = internalMutation({
  args: { id: Users.withoutSystemFields.tokenIdentifier },
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
