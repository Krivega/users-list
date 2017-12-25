// @flow

import { graphql } from 'react-apollo';
import Container from './Container';
import { USERS_LIST_QUERY } from './api';
import { mapResultsToProps, mapPropsToOptions } from './selectors';

export default graphql(USERS_LIST_QUERY, {
  name: 'usersList',
  props: mapResultsToProps,
  options: mapPropsToOptions
})(Container);
