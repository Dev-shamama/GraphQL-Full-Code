import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from "@apollo/client/link/context";

// Create the upload link
const uploadLink = createUploadLink({
  uri: "http://localhost:8000/api/v1/graphql",
});

// Create a middleware link to set headers
const authLink = setContext((_, { headers }) => {
  // You can fetch a token from localStorage or any other method
  // const token = localStorage.getItem("auth-token");

  return {
    headers: {
      ...headers,
      // "token": token,
      "Apollo-Require-Preflight": "true", // Necessary for Image Upload
    }
  };
});

// Combine the links
const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
