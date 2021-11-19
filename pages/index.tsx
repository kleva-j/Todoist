import type { NextPage } from "next";
import { getDataFromTree } from "@apollo/client/react/ssr";

import WithApollo from "../lib/Apollo";
import Header from "../components/molecules/Header";
import Layout from "../components/organisms/Layout";
import { Container } from "@chakra-ui/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Container>
      </Container>
    </Layout>
  );
};

export default WithApollo(Home, { getDataFromTree });
