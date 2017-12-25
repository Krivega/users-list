// @flow

import * as React from 'react';
import bem from 'bem-cn';

import './style.css';

const block = bem('content');

type Props = {
  children?: React.Node
};

const Content = ({ children }: Props) => {
  return (
    <div className={block()}>
      <div className={block('body')()}>{children}</div>
    </div>
  );
};

export default Content;
