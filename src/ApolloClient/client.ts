import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { envConfig as config, envConfig } from "../app/Config/EnvConfig";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
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

  if (networkError) {
    if (window.location.href.includes("localhost")) {
      // only log when it's local
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: ApolloLink.from([errorLink, authLink, uploadLink]),

});
