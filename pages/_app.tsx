import type { AppProps, AppContext } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import Layout from "components/organisms/Layout";
import Seo from "components/organisms/Seo";
import theme from "styles/theme"
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Seo />
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

const isProd = process.env.NODE_ENV === "production";
const base = isProd ? "https://www.taskaider.com" : "http://localhost:4000";

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { router: { asPath } } = appContext;
  return { ...appProps, canonical: base + asPath };
};

export default MyApp;
