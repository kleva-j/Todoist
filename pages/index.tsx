import { getDataFromTree } from "@apollo/client/react/ssr";
import { gql, useQuery } from "@apollo/client";
import { useSession, SessionProvider } from "next-auth/react";
import type { NextPage } from "next";

import UnAuthenticated from "../layout/unauthenticated";
import Authenticated from "../layout/authenticated";

import Header from "../components/molecules/Header";
import Layout from "../components/organisms/Layout";
import WithApollo from "../lib/Apollo";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  return (
    <SessionProvider>
      <Layout>
        <Header />
        {/* {!session ? <UnAuthenticated /> : <Authenticated />} */}
      </Layout>
    </SessionProvider>
  );
};

export default WithApollo(Home, { getDataFromTree });
