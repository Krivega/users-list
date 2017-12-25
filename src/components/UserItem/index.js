// @flow

import React from 'react';
import bem from 'bem-cn';
import { Card, CardTitle } from 'react-md';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'components/ProgressiveImage';

import './style.css';

import placeholder from './placeholder.jpg';

const block = bem('user-item');

type Props = {
  name: string,
  link: string,
  avatarUrl: string
};

const UserItem = ({ name, link, avatarUrl }: Props) => {
  return (
    <Link className={block()} to={link}>
      <Card>
        <div className={block('image')()}>
          <ProgressiveImage src={avatarUrl} placeholder={placeholder} alt={name} fit />
        </div>
        <CardTitle title={name} />
      </Card>
    </Link>
  );
};

export default UserItem;
