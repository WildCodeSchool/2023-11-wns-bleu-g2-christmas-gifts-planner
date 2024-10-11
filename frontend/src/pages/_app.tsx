import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/config";
import Layout from "@/components/Layout";
import { ErrorContextProvider } from "@/contexts/ErrorContext";
import "../i18n";
import { GroupContextProvider } from "@/contexts/GroupContext";

interface MyAppProps extends AppProps {
  pageProps: {
    pageTitle: string;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: "bottom-right",
            variant: "top-accent",
            isClosable: true,
            duration: 5000,
            containerStyle: {
              maxWidth: "24rem",
            },
          },
        }}
      >
        <ErrorContextProvider>
          <GroupContextProvider>
            <Layout pageTitle={pageProps.pageTitle}>
              <Component {...pageProps} />
            </Layout>
          </GroupContextProvider>
        </ErrorContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
