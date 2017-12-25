import { setSession, removeSession } from './session';

export const mapPropsToOptions = () => {
  const options = {
    fetchPolicy: 'network-only'
  };

  return options;
};

export const mapResultsToPropsAuthenticateAdmin = ({
  authenticateAdminMutation,
  authenticateAdminMutation: { loading }
}) => {
  const props = {
    loading,
    submitLoggedIn: async ({ email, password }) => {
      try {
        const { data: { authenticateAdmin } } = await authenticateAdminMutation({
          variables: {
            email,
            password
          }
        });

        if (authenticateAdmin && authenticateAdmin.token) {
          setSession(authenticateAdmin.token);

          return authenticateAdmin.id;
        }
      } catch (e) {
        console.error('An error occurred: ', e);
      }
    },
    submitLoggedOut: async () => {
      removeSession();
    }
  };

  return props;
};

export const mapResultsToPropsloggedInAdmin = ({
  loggedInAdminQuery,
  loggedInAdminQuery: { loading, loggedInAdmin }
}) => {
  const props = {
    loading,
    isLoggedIn: loggedInAdmin && loggedInAdmin.id !== '',
    onLoggedIn: () => {
      loggedInAdminQuery.refetch();
    },
    onLoggedOut: () => {
      loggedInAdminQuery.refetch();
    }
  };

  return props;
};
