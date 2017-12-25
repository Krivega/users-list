// @flow

import React from 'react';
import { Grid, Cell } from 'react-md';
import UserItem from 'components/UserItem';
import Pagination from 'components/Pagination';
import PageLoader from 'components/PageLoader';

type UserType = {
  id: string,
  name: string,
  avatarUrl: string
};

type Props = {
  items?: Array<UserType>,
  nextUrl?: string,
  prevUrl?: string,
  loading?: boolean,
  location: {
    key: string
  },
  history: {
    push: (location?: string) => void
  }
};

export default class UsersList extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    if (
      this.props.location.key !== nextProps.location.key ||
      this.props.loading !== nextProps.loading
    ) {
      return true;
    }

    return false;
  }

  handlePrevPage = () => {
    const { prevUrl } = this.props;

    this.props.history.push(prevUrl);
  };

  handleNextPage = () => {
    const { nextUrl } = this.props;

    this.props.history.push(nextUrl);
  };

  renderItem = ({ id, name, avatarUrl }: UserType) => {
    return (
      <Cell size={3} key={id}>
        <UserItem link={`/user/${id}`} name={name} avatarUrl={avatarUrl} />
      </Cell>
    );
  };

  renderLoader() {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return <PageLoader id="usersList" />;
  }

  renderList() {
    const { items, prevUrl, nextUrl } = this.props;

    if (!items) {
      return null;
    }

    return (
      <Grid className="grid_unwrap">
        {items.map(this.renderItem)}
        <Cell size={12}>
          <Pagination
            hasPrev={!!prevUrl}
            hasNext={!!nextUrl}
            onClickPrev={this.handlePrevPage}
            onClickNext={this.handleNextPage}
          />
        </Cell>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
        {this.renderLoader()}
      </div>
    );
  }
}
