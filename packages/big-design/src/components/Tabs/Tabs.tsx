import React, { HTMLAttributes, memo } from 'react';

import { StyledTab, StyledTabs } from './styled';

export interface TabItem {
  id: string;
  title: string;
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  activeTab?: TabItem['id'];
  items?: TabItem[];
  onTabClick?(tabId: TabItem['id']): void;
}

export const Tabs: React.FC<TabsProps> = memo(
  ({ activeTab, children, className, items = [], onTabClick, style, role, ...props }) => {
    const handleOnTabClick = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();

      const tabId = event.currentTarget.id;

      if (tabId !== activeTab && typeof onTabClick === 'function') {
        onTabClick(tabId);
      }
    };

    return (
      <>
        <StyledTabs {...props} flexDirection="row" role="tablist">
          {items.map(({ id, title, disabled }) => (
            <StyledTab
              activeTab={activeTab}
              id={id}
              key={id}
              onClick={handleOnTabClick}
              role="tab"
              tabIndex={id === activeTab ? -1 : 0}
              disabled={disabled}
            >
              {title}
            </StyledTab>
          ))}
        </StyledTabs>
      </>
    );
  },
);

Tabs.displayName = 'Tabs';
