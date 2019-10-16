import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const tabsProps: Prop[] = [
  {
    name: 'activeTab',
    types: 'string',
    description: 'Determines the active tab by id.',
  },
  {
    name: 'onTabClick',
    types: '(tabId: string) => void',
    description: 'Function that will get called when a tab is clicked.',
  },
];

export const TabsPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Tabs" propList={tabsProps} {...props} />
);

const tabProps: Prop[] = [
  {
    name: 'id',
    types: 'string',
    description: 'Tab identifier, must be unique.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Determines if the Tab is disabled.',
  },
];

export const TabPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Tabs.Tab" propList={tabProps} {...props} />
);
