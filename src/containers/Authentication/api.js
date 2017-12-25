import gql from 'graphql-tag';

export const AUTHENTICATE_ADMIN_MUTATION = gql`
  mutation AuthenticateAdmin($email: String!, $password: String!) {
    authenticateAdmin(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const LOGGED_IN_ADMIN_QUERY = gql`
  query LoggedInAdmin {
    loggedInAdmin {
      id
    }
  }
`;
