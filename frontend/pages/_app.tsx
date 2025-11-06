import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import type { NextPage } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { AuthProvider } from "../context/auth";
import Head from "next/head";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component?: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? Layout;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Vacuumba</title>
      </Head>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
