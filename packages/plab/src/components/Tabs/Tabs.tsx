import React from 'react';

import { StyledTab, StyledTabs } from './styled';

const Tab = StyledTab;

export interface TabProps {
  activeTab?: string;
}

export interface TabsProps {
  activeTab?: string;
  className?: string;
  onTabClick(tabId: string): void;
}

export class Tabs extends React.PureComponent<TabsProps> {
  static Tab = Tab;

  render() {
    const { children, className, onTabClick, ...props } = this.props;

    return <StyledTabs {...props}>{this.renderChildren()}</StyledTabs>;
  }

  private renderChildren() {
    const { activeTab, children } = this.props;

    return React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement<any>, {
        activeTab,
        onClick: this.handleOnTabClick,
      }),
    );
  }

  private handleOnTabClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const tabId = event.currentTarget.id;
    const activeTab = this.props.activeTab;

    if (tabId !== activeTab && typeof this.props.onTabClick === 'function') {
      this.props.onTabClick(tabId);
    }
  };
}
