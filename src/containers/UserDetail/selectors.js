export const mapPropsToOptions = ({ match: { params: { id, name, avatarUrl } } }) => {
  const options = {
    fetchPolicy: 'cache-and-network',
    variables: { id, name, avatarUrl }
  };

  return options;
};

export const mapResultsToPropsUserInfo = ({ userInfo: { User = {}, loading } }) => {
  const props = {
    loading,
    ...User
  };

  return props;
};

export const mapResultsToPropsUpdateUserInfo = ({
  updateUserInfo,
  updateUserInfo: { User = {}, loading }
}) => {
  const props = {
    loading,
    ...User,
    onChangeName: name => {
      updateUserInfo({
        variables: {
          name
        }
      });
    },
    onChangeAvatarUrl: avatarUrl => {
      updateUserInfo({
        variables: {
          avatarUrl
        }
      });
    }
  };

  return props;
};
