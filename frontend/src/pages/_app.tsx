import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
      </ApolloProvider>
  );
}
