// @flow

import { graphql, compose } from 'react-apollo';
import Container from './Container';
import withSessionUpdates from 'withSessionUpdates';
import { USER_INFO_QUERY, UPDATE_USER_INFO_MUTATION } from './api';
import {
  mapResultsToPropsUserInfo,
  mapResultsToPropsUpdateUserInfo,
  mapPropsToOptions
} from './selectors';

export default compose(
  graphql(UPDATE_USER_INFO_MUTATION, {
    name: 'updateUserInfo',
    props: mapResultsToPropsUpdateUserInfo,
    options: mapPropsToOptions
  }),
  graphql(USER_INFO_QUERY, {
    name: 'userInfo',
    props: mapResultsToPropsUserInfo,
    options: mapPropsToOptions
  }),
  withSessionUpdates
)(Container);
