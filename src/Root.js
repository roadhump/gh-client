import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './screens/App';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    // authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    authorization: 'Bearer 227333569fa36d8edff068a64c719957633827eb',
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true,
});

const client = new ApolloClient({
  link,
  cache,
});

const Root = () => (
  <ApolloProvider client={client}>

      <MuiThemeProvider>
        <Router>
          <App />
        </Router>
      </MuiThemeProvider>

  </ApolloProvider>
);

export default Root;
