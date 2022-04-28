import { ApolloLink, gql, createHttpLink } from "@apollo/client";

const HTTP_URI = process.env.NEXT_PUBLIC_HTTP_URL || "";
const HASURA_SECRET = process.env.HASURA_ADMIN_SECRET || "";

export const httpLink = createHttpLink({
  uri: HTTP_URI,
  headers: { "x-hasura-admin-secret": HASURA_SECRET },
});

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { "x-hasura-admin-secret": HASURA_SECRET },
  });

  return forward(operation);
});
