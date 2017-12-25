// @flow

import * as React from 'react';
import bem from 'bem-cn';

import './style.css';

const block = bem('app');

type Props = {
  children?: React.Node
};

const App = ({ children }: Props) => {
  return <div className={block()}>{children}</div>;
};

export default App;
