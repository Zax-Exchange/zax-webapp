import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { envConfig as config } from "../app/Config/EnvConfig";

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = new HttpLink({
  uri: config.webserviceUrl
});
 
const uploadLink = createUploadLink({
  uri: config.webserviceUrl
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
