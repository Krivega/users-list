// @flow

import React from 'react';
import bem from 'bem-cn';
import { CircularProgress } from 'react-md';

import './style.css';

const block = bem('button-loader');

type Props = {
  id: string
};

const ButtonLoader = ({ id }: Props) => {
  return (
    <div
      className={block.mix(
        'md-btn md-btn--icon md-btn--floating md-paper md-paper--4 md-background--secondary'
      )()}
    >
      <CircularProgress id={id} />
    </div>
  );
};

export default ButtonLoader;
