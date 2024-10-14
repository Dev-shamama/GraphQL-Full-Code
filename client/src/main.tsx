import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/api/v1/graphql', // Apollo Server is served from port 4000
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})


createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
)
