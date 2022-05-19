import { useSession, signIn, signOut } from "next-auth/react";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { NextPage } from "next";

import WithApollo from "../lib/Apollo";

const About: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  return (
    <></>
  );
};

export default WithApollo(About, { getDataFromTree });
