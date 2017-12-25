// @flow

import React from 'react';
import { Button } from 'react-md';
import ButtonLoader from 'components/ButtonLoader';
import AdminInfo from 'components/AdminInfo';
import LoggedInForm from 'components/LoggedInForm';

const TESTED_ADMIN = {
  email: 'admin@test.com',
  password: 'password'
};

type Props = {
  name: string,
  avatarUrl: string,
  isLoggedIn?: boolean,
  loading?: boolean,
  submitLoggedIn: ({ email: string, password: string }) => void,
  submitLoggedOut: () => void,
  onLoggedIn: () => void,
  onLoggedOut: () => void
};

type State = {
  openedLoggedInForm: boolean,
  loading: boolean
};

export default class Authentication extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      openedLoggedInForm: false,
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
      this.state.openedLoggedInForm !== nexState.openedLoggedInForm ||
      this.state.loading !== nextProps.loading ||
      this.state.loading !== nexState.loading
    ) {
      return true;
    }

    return false;
  }

  showLoggedInForm = () => {
    this.setState({ openedLoggedInForm: true });
  };

  hideLoggedInForm = () => {
    this.setState({ openedLoggedInForm: false });
  };

  handleClickLoggedIn = () => {
    this.showLoggedInForm();
  };

  handleClickLoggedOut = async () => {
    await this.props.submitLoggedOut();
    this.props.onLoggedOut();
  };

  handleHideLoggedInForm = () => {
    this.hideLoggedInForm();
  };

  handleSubmitLoggedInForm = async ({ email, password }: { email?: string, password?: string }) => {
    if (email && password) {
      this.setState({ loading: true });
      this.hideLoggedInForm();
      await this.props.submitLoggedIn({ email, password });
      this.props.onLoggedIn();
    }
  };

  renderLoggedInForm() {
    const { isLoggedIn } = this.props;
    const { openedLoggedInForm } = this.state;

    if (isLoggedIn) {
      return null;
    }

    return (
      <LoggedInForm
        opened={openedLoggedInForm}
        onSubmit={this.handleSubmitLoggedInForm}
        onHide={this.handleHideLoggedInForm}
        {...TESTED_ADMIN}
      />
    );
  }

  renderStatusButtons() {
    const { isLoggedIn } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <ButtonLoader id="authentication-loader" />;
    }

    if (isLoggedIn) {
      return (
        <Button secondary floating onClick={this.handleClickLoggedOut}>
          exit_to_app
        </Button>
      );
    }

    return (
      <Button secondary floating onClick={this.handleClickLoggedIn}>
        person
      </Button>
    );
  }

  render() {
    return (
      <div>
        <AdminInfo>{this.renderStatusButtons()}</AdminInfo>
        {this.renderLoggedInForm()}
      </div>
    );
  }
}
