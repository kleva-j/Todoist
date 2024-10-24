import type { Auth } from "convex/server";

import { ConvexError } from "convex/values";

import {
  customMutation,
  customAction,
  customQuery,
  customCtx,
} from "convex-helpers/server/customFunctions";

import {
  type ActionCtx,
  type QueryCtx,
  action,
  mutation,
  query,
} from "./_generated/server";

type CustomCtxType = ActionCtx | QueryCtx;

export type SessionStatus = "active" | "ended" | "removed" | "revoked";

export const getTokenId = (id: string) => `${process.env.CLERK_ISSUER_URL}|${id}`;

export const getUserIdentity = async (ctx: CustomCtxType & { auth: Auth }) =>
  await ctx.auth.getUserIdentity();

export async function getAuthStatus(ctx: CustomCtxType) {
  const identity = await getUserIdentity(ctx);
  if (!identity) throw new ConvexError("Not Authenticated.");
  return { identity };
}

export const queryWithUser = customQuery(query, customCtx(getAuthStatus));
export const actionWithUser = customAction(action, customCtx(getAuthStatus));
export const mutateWithUser = customMutation(
  mutation,
  customCtx(getAuthStatus)
);
