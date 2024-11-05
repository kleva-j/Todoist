/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Auth } from "convex/server";

import type { DataModel } from "./_generated/dataModel";

import { getManyFrom } from "convex-helpers/server/relationships";
import { Triggers } from "convex-helpers/server/triggers";
import { ConvexError } from "convex/values";
import { asyncMap } from "convex-helpers";
import { pick, pickBy } from "lodash";

import {
  customMutation,
  customAction,
  customQuery,
  customCtx,
} from "convex-helpers/server/customFunctions";

import {
  type ActionCtx,
  type QueryCtx,
  mutation,
  action,
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

const triggers = new Triggers<DataModel>();

triggers.register("users", async (ctx, change) => {
  if (change.operation === "insert") {
    await createDefaultProject(ctx, change.newDoc.tokenIdentifier);
  } else if (change.operation === "delete") {
    await cleanupUserData(ctx, change.oldDoc.tokenIdentifier);
  }
});

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

/**
 * Pick only the specified fields from the input object and remove any undefined values.
 * @param input The input object to pick from
 * @param fields The fields to pick
 * @returns The object with the specified fields and undefined values removed.
 */
export const sanitizeInput = <T extends Record<string, any>>(
  input: T,
  fields: Array<keyof T>
) => {
  const sanitizedInput = pick(input, fields);
  return pickBy(sanitizedInput, (value) => value !== undefined) as {
    [K in keyof T as T[K] extends undefined ? never : K]: T[K];
  };
};
