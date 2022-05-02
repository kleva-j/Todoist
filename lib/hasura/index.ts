import fetch from "isomorphic-unfetch";

const hasuraUrl = process.env.HASURA_URL || "";
const admin_secret = process.env.HASURA_ADMIN_SECRET || "";

type QueryResolver<T, U> = (arg0: T, arg1: U) => Promise<any>;

export const hasuraQuery: QueryResolver<any, any> = async (query, variables) => {
  const result = await fetch(hasuraUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": admin_secret,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());
  if (!result || !result.data) {
    console.error("<<<<<<< error start", result, "error end >>>>>>>");
    return [];
  }
  return result.data;
};
