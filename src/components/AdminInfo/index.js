// @flow

import * as React from 'react';
import bem from 'bem-cn';

import './style.css';

const block = bem('admin-info');

type Props = {
  children?: React.Node
};

const AdminInfo = ({ children }: Props) => {
  return <div className={block()}>{children}</div>;
};

export default AdminInfo;
