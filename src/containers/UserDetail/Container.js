// @flow

import React from 'react';
import PageLoader from 'components/PageLoader';
import UserInfo from 'components/UserInfo';

type Props = {
  id: string,
  name: string,
  avatarUrl: string,
  isLoggedIn?: boolean,
  loading?: boolean,
  onChangeName: (value: string) => void,
  onChangeAvatarUrl: (value: string) => void
};

type State = {
  loading: boolean
};

export default class UserDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps({ loading }: Props) {
    if (loading !== undefined) {
      this.setState({ loading });
    }
  }

  shouldComponentUpdate(nextProps: Props, nexState: State) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn ||
      this.props.id !== nextProps.id ||
      this.props.name !== nextProps.name ||
      this.props.avatarUrl !== nextProps.avatarUrl ||
      this.state.loading !== nextProps.loading ||
      this.state.loading !== nexState.loading
    ) {
      return true;
    }

    return false;
  }

  handleChangeName = (name: string) => {
    this.setState({ loading: true });
    this.props.onChangeName(name);
  };

  handleChangeAvatarUrl = (avatarUrl: string) => {
    this.setState({ loading: true });
    this.props.onChangeAvatarUrl(avatarUrl);
  };

  renderLoader() {
    const { loading } = this.state;

    if (!loading) {
      return null;
    }

    return <PageLoader id="userDetail" />;
  }

  renderInfo() {
    const { name, avatarUrl, isLoggedIn } = this.props;

    if (!name && !avatarUrl) {
      return null;
    }

    return (
      <UserInfo
        name={name}
        avatarUrl={avatarUrl}
        onChangeName={this.handleChangeName}
        onChangeAvatarUrl={this.handleChangeAvatarUrl}
        editable={isLoggedIn}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderInfo()}
        {this.renderLoader()}
      </div>
    );
  }
}
