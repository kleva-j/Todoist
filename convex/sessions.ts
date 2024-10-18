import type { Doc } from "./_generated/dataModel";

import { internalMutation, QueryCtx } from "./_generated/server";

import schema from "./schema";

// SESSION MUTATIONS
const sessionFields = schema.tables.sessions.validator.fields;

export const createOrUpdate = internalMutation({
  args: sessionFields,
  handler: async (ctx, { sessionId, ...rest }) => {
    const existingSession = await checkExistingSession(ctx, sessionId);
    if (!existingSession)
      return ctx.db.insert("sessions", { sessionId, ...rest });
    const { lastActiveAt, status } = rest;
    return ctx.db.patch(existingSession._id, { lastActiveAt, status });
  },
});

export const remove = internalMutation({
  args: { sessionId: sessionFields.sessionId },
  handler: async (ctx, { sessionId }) => {
    const existingSession = await checkExistingSession(ctx, sessionId);
    if (!existingSession) throw new Error("Session not found");
    return ctx.db.delete(existingSession._id);
  },
});

async function checkExistingSession(
  ctx: QueryCtx,
  sessionId: string
): Promise<Doc<"sessions"> | null> {
  return await ctx.db
    .query("sessions")
    .withIndex("by_sess_id", (q) => q.eq("sessionId", sessionId))
    .unique();
}
