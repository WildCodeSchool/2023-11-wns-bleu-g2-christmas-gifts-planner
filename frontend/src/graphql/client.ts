import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';



const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4001/',
  // url: 'ws://localhost:4001/chat',



}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  uri: "http://localhost:4001",
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
