import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink";
// import { RestLink } from "apollo-link-rest";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([uploadLink]),
});
