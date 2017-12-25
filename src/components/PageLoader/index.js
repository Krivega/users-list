// @flow

import React from 'react';
import bem from 'bem-cn';
import { CircularProgress } from 'react-md';

import './style.css';

const block = bem('page-loader');

type Props = {
  id: string
};

const PageLoader = ({ id }: Props) => {
  return (
    <div className={block()}>
      <CircularProgress id={id} />
    </div>
  );
};

export default PageLoader;
