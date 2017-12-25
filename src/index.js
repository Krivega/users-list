// @flow

import { render } from 'react-dom';
import React from 'react';
import Root from 'containers/Root';
import { testUpdatesComponents } from 'developerTools';

if (process.env.NODE_ENV !== 'production') {
  testUpdatesComponents(React);
}
const rootEl = document.getElementById('root');

if (rootEl && rootEl.offsetWidth) {
  console.log(rootEl.offsetWidth);
}

if (rootEl) {
  render(<Root />, rootEl);
}
