import gql from 'graphql-tag';

export const USER_INFO_QUERY = gql`
  query userInfo($id: ID!) {
    User(id: $id) {
      id
      name
      avatarUrl
    }
  }
`;

export const UPDATE_USER_INFO_MUTATION = gql`
  mutation updateUuserInfo($id: ID!, $name: String, $avatarUrl: String) {
    updateUser(id: $id, name: $name, avatarUrl: $avatarUrl) {
      id
      name
      avatarUrl
    }
  }
`;
