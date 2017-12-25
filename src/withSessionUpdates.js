// @flow

import * as React from 'react';
import {
  isLoggedIn,
  onChangeSession,
  removeListenerSession
} from 'containers/Authentication/session';

type Props = any;

type State = {
  isLoggedIn?: boolean
};

export default function withSessionUpdates(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  return class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        isLoggedIn: isLoggedIn()
      };
    }

    componentDidMount() {
      onChangeSession(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        isLoggedIn: isLoggedIn()
      });
    };

    render() {
      return <WrappedComponent isLoggedIn={this.state.isLoggedIn} {...this.props} />;
    }

    componentWillUnmount() {
      removeListenerSession(this.handleChange);
    }
  };
}
