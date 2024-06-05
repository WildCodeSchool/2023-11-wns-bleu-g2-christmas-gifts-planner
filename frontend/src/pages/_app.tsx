import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#003b1e",
    900: "#003b1e",
  },
};

const theme = extendTheme( { colors });


export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
      </ApolloProvider>
  );
}
