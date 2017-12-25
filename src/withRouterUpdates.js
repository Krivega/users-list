// @flow

import * as React from 'react';
import { withRouter } from 'react-router';

type Props = {
  location: Object,
  history: {
    listen: (listener: Function) => Function
  }
};

type State = {
  location: Object
};

export default function withRouterUpdates(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  return withRouter(
    class extends React.Component<Props, State> {
      unlistenHistory: Function;

      constructor(props: Props) {
        super(props);

        this.state = {
          location: props.location
        };
      }

      componentWillReceiveProps({ location }: Props) {
        this.setState({
          location
        });
      }

      componentDidMount() {
        this.unlistenHistory = this.props.history.listen(this.handleChange);
      }

      handleChange = ({ location }: State) => {
        this.setState({
          location
        });
      };

      render() {
        return <WrappedComponent location={this.state.location} {...this.props} />;
      }

      componentWillUnmount() {
        this.unlistenHistory();
      }
    }
  );
}
