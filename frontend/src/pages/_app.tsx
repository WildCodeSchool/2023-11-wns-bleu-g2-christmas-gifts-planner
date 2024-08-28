import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/config";
import Layout from "@/components/Layout";
import { ErrorContextProvider } from "@/contexts/ErrorContext";

interface MyAppProps extends AppProps {
  pageProps: {
    pageTitle: string;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <ErrorContextProvider>
          <Layout pageTitle={pageProps.pageTitle}>
            <Component {...pageProps} />
          </Layout>
        </ErrorContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
