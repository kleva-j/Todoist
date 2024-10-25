/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Auth } from "convex/server";

import type { DataModel } from "./_generated/dataModel";

import { getManyFrom } from "convex-helpers/server/relationships";
import { ConvexError } from "convex/values";
import { asyncMap } from "convex-helpers";

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

type DefaultTemplate = {
  name: string;
  type: "system" | "user";
  userId: string;
};

type TableParam = {
  table: Exclude<keyof DataModel, "users" | "sessions">;
  accessor: "by_user";
  key: "userId";
};

const DEFAULT_PROJECT: DefaultTemplate = {
  name: "Get Started",
  type: "system",
  userId: "",
};

const TABLES_TO_CLEAN: TableParam[] = [
  { table: "projects", accessor: "by_user", key: "userId" },
  { table: "todos", accessor: "by_user", key: "userId" },
  { table: "subtasks", accessor: "by_user", key: "userId" },
  { table: "labels", accessor: "by_user", key: "userId" },
];

export async function createDefaultProject(ctx: any, userId: string) {
  const projectData = { ...DEFAULT_PROJECT, userId };
  await ctx.db.insert("projects", projectData);
}

export async function cleanupUserData(ctx: any, userId: string) {
  const cleanupTasks = TABLES_TO_CLEAN.map(async ({ table, accessor, key }) => {
    const items = await getManyFrom(ctx.db, table, accessor, userId, key);
    await asyncMap(items, async (item) => await ctx.db.delete(item._id));
  });

  await Promise.all(cleanupTasks);
}

export const getTokenId = (id: string) =>
  `${process.env.CLERK_ISSUER_URL}|${id}`;

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
