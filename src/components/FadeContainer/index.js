// @flow

import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style.css';

type Props = {
  children: React.Node,
  keyCode: string
};

const FadeContainer = ({ children, keyCode }: Props) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={keyCode}
        timeout={500}
        classNames="fade-translate"
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default FadeContainer;
