// @flow

import React from 'react';
import { FontIcon, Tab } from 'react-md';
import withRouterUpdates from 'withRouterUpdates';
import TabsNavigation from 'components/TabsNavigation';
import Authentication from 'containers/Authentication';

type Props = {
  location: {
    key: string,
    pathname: string
  },
  history: {
    push: (location: string) => void,
    goBack: () => void
  }
};

export default withRouterUpdates(
  class SiteNavigation extends React.Component<Props> {
    shouldComponentUpdate(nextProps: Props) {
      if (this.props.location.key !== nextProps.location.key) {
        return true;
      }

      return false;
    }

    getRoute() {
      const { location: { pathname } } = this.props;

      return pathname.split('/')[1];
    }

    hasUserTabActive() {
      const route = this.getRoute();

      return route === '' || Number.isInteger(+route);
    }

    getActiveTabIndex() {
      let activeTabIndex = 1;

      if (this.hasUserTabActive()) {
        activeTabIndex = 0;
      }

      return activeTabIndex;
    }

    handleTabChange = (index: number) => {
      if (index === 0) {
        if (this.hasUserTabActive()) {
          this.props.history.push('/');
        } else {
          this.props.history.goBack();
        }
      }
    };

    render() {
      const activeTabIndex = this.getActiveTabIndex();

      return (
        <TabsNavigation activeTabIndex={activeTabIndex} onTabChange={this.handleTabChange}>
          <Tab label="Users" icon={<FontIcon>people</FontIcon>} />
          <Authentication />
        </TabsNavigation>
      );
    }
  }
);
