import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

import UnAuthenticated from "../layout/unauthenticated";
import Authenticated from "../layout/authenticated";

import WithApollo from "../lib/Apollo";
import Header from "../components/molecules/Header";
import Layout from "../components/organisms/Layout";

const Home: NextPage = () => {
  const [session] = useSession();

  return (
    <Layout>
      <Header />
      {!session ? <UnAuthenticated /> : <Authenticated />}
    </Layout>
  );
};

export default WithApollo(Home, { getDataFromTree });
