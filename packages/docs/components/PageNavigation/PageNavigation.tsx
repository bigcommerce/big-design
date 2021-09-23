import { TabItem, Tabs } from '@bigcommerce/big-design';
import React, { useContext, useEffect, useMemo } from 'react';

import { ActiveTabContext } from '../TabWrapper';

interface Items extends TabItem {
  default?: boolean;
  render(): JSX.Element;
}

export interface PageNavigationProps {
  items: Items[];
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ items }) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);

  const renderedContent = useMemo(() => {
    const content = items.find((item) => item.id === activeTab);

    if (content) {
      return content.render();
    }

    return items[0].render();
  }, [activeTab, items]);

  useEffect(() => {
    const hasActiveTab = items.find((item) => item.id === activeTab);

    if (!hasActiveTab) {
      const defaultTab = items.find((item) => item.default) ?? items[0];

      setActiveTab(defaultTab.id);
    }
  }, [activeTab, items, setActiveTab]);

  return (
    <>
      <Tabs activeTab={activeTab} items={items} onTabClick={setActiveTab} />
      {renderedContent}
    </>
  );
};
