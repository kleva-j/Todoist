import nextWithApollo from "next-with-apollo";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  DefaultOptions,
  split,
} from "@apollo/client";
import { useRouter } from "next/router";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import ws from "ws";

const HASURA_SECRET = process.env.HASURA_ADMIN_SECRET || "";
const HTTP_URI = process.env.NEXT_PUBLIC_HTTP_URL || "";
const WSS_URI = process.env.NEXT_PUBLIC_WSS_URL || "";

const WithApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      // link: split(
      //   ({ query }) => {
      //     const definition = getMainDefinition(query);
      //     return (
      //       definition.kind === "OperationDefinition" &&
      //       definition.operation === "subscription"
      //     );
      //   },
      //   new WebSocketLink({
      //     uri: WSS_URI,
      //     options: {
      //       reconnect: true,
      //       connectionParams: {
      //         headers: {
      //           "x-hasura-admin-secret": HASURA_SECRET,
      //         },
      //       },
      //     },
      //     webSocketImpl: ws
      //   }),
      //   new HttpLink({
      //     uri: HTTP_URI,
      //     headers: {
      //       "x-hasura-admin-secret": HASURA_SECRET,
      //     },
      //   })
      // ),
      link: new HttpLink({
        uri: HTTP_URI,
        headers: { "x-hasura-admin-secret": HASURA_SECRET },
      }),
      headers: { ...headers } as Record<string, string>,
      cache: new InMemoryCache().restore(initialState || {}),
      defaultOptions: {},
    });
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default WithApollo;
