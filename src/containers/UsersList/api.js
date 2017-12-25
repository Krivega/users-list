import gql from 'graphql-tag';

export const USERS_LIST_QUERY = gql`
  query usersList($first: Int!, $skip: Int!) {
    allUsers(first: $first, skip: $skip) {
      id
      name
      avatarUrl
    }
  }
`;
