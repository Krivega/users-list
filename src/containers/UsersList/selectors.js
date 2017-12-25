const VISIBLE_COUNT = 8;

export const mapPropsToOptions = ({ match: { params: { page = 1 } } }) => {
  const options = {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: VISIBLE_COUNT,
      skip: (page - 1) * VISIBLE_COUNT
    }
  };

  return options;
};

export const mapResultsToProps = ({ usersList, usersList: { allUsers, loading } }) => {
  const currentPage = usersList.variables.skip / VISIBLE_COUNT + 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const props = {
    loading,
    items: allUsers
  };

  if (prevPage > 0) {
    props.prevUrl = `/${prevPage}`;
  }

  if (allUsers && allUsers.length === VISIBLE_COUNT) {
    props.nextUrl = `/${nextPage}`;
  }

  return props;
};
