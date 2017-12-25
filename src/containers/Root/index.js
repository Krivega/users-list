// @flow

import React from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'normalize.css';
import App from 'components/App';
import { getSession } from 'containers/Authentication/session';
import ContentRoutes from 'containers/ContentRoutes';
import SiteNavigation from 'containers/SiteNavigation';

const history = createHistory();
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjbgj3dmt0isc0193qgbrmdzj'
});
const middlewareLink = new ApolloLink((operation, forward) => {
  const session = getSession();

  if (session) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${session}`
      }
    });
  }
  return forward(operation);
});
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <App>
        <SiteNavigation />
        <ContentRoutes />
      </App>
    </Router>
  </ApolloProvider>
);

export default Root;
