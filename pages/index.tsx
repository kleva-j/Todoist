import { getDataFromTree } from "@apollo/client/react/ssr";
import type { NextPage } from "next";

import WithApollo from "lib/Apollo";

const Home: NextPage = () => {
  return <h4>This is the Home page</h4>;
};

export default WithApollo(Home, { getDataFromTree });
