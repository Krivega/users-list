// @flow

import * as React from 'react';
import bem from 'bem-cn';
import { TabsContainer, Tabs } from 'react-md';

import './style.css';

const block = bem('tabs-navigation');

type Props = {
  children: React.Node,
  activeTabIndex: number,
  onTabChange: (index: number) => void
};

const TabsNavigation = ({ children, activeTabIndex, onTabChange }: Props) => {
  return (
    <div className={block()}>
      <TabsContainer
        fixed
        themed
        labelAndIcon
        activeTabIndex={activeTabIndex}
        defaultTabIndex={1}
        onTabChange={onTabChange}
      >
        <Tabs tabId="nav" className={block('tabs')()}>
          {children}
        </Tabs>
      </TabsContainer>
    </div>
  );
};

export default TabsNavigation;
