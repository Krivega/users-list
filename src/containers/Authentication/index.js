// @flow

import { graphql, compose } from 'react-apollo';
import Container from './Container';
import { AUTHENTICATE_ADMIN_MUTATION, LOGGED_IN_ADMIN_QUERY } from './api';
import {
  mapResultsToPropsAuthenticateAdmin,
  mapResultsToPropsloggedInAdmin,
  mapPropsToOptions
} from './selectors';

export default compose(
  graphql(AUTHENTICATE_ADMIN_MUTATION, {
    name: 'authenticateAdminMutation',
    props: mapResultsToPropsAuthenticateAdmin,
    options: mapPropsToOptions
  }),
  graphql(LOGGED_IN_ADMIN_QUERY, {
    name: 'loggedInAdminQuery',
    props: mapResultsToPropsloggedInAdmin,
    options: mapPropsToOptions
  })
)(Container);
