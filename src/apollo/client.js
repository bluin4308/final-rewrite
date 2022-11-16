import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://dsa1mc.wp4.host/graphql",
  cache: new InMemoryCache(),
});

export default client;
