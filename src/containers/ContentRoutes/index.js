// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Content from 'components/Content';
import FadeContainer from 'components/FadeContainer';
import UsersList from 'containers/UsersList';
import UserDetail from 'containers/UserDetail';
import NotFoundInfo from 'containers/NotFoundInfo';
import withRouterUpdates from 'withRouterUpdates';

type Props = {
  location: {
    key: string
  }
};

export default withRouterUpdates(function ContentRoutes({ location }: Props) {
  return (
    <Content>
      <FadeContainer keyCode={location.key}>
        <Switch location={location}>
          <Route exact path="/:page" render={props => <UsersList {...props} />} />
          <Route exact path="/" render={props => <UsersList {...props} />} />
          <Route exact path="/user/:id" render={props => <UserDetail {...props} />} />
          <Route path="**" component={NotFoundInfo} />
        </Switch>
      </FadeContainer>
    </Content>
  );
});
