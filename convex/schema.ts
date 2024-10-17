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
  expireAt: v.string(),
  lastActiveAt: v.string(),
  httpRequest: v.object({
    userAgent: v.string(),
    clientIp: v.string(),
  }),
});

export default defineSchema({
  users: Users.table.index("by_token", ["tokenIdentifier"]),
  sessions: Sessions.table
    .index("by_user", ["userId"])
    .index("status", ["status"]),
});
