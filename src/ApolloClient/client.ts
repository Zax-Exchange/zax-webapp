import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
 
const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message.includes("INVALID_TOKEN")) {
        document.dispatchEvent(new CustomEvent("logout"))
      }
    }
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: ApolloLink.from([errorLink, authLink, uploadLink]),

});
