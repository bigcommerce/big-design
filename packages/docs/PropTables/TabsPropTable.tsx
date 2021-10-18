import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const tabsProps: Prop[] = [
  {
    name: 'activeTab',
    types: 'string',
    description: 'Determines the active tab by tab id.',
  },
  {
    name: 'items',
    types: <NextLink href={{ hash: 'tab-item-prop-table', query: { props: 'tab-item' } }}>TabItem[]</NextLink>,
    description: (
      <>
        See <NextLink href={{ hash: 'tab-item-prop-table', query: { props: 'tab-item' } }}>TabItem</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'onTabClick',
    types: '(tabId: string) => void',
    description: 'Function that will get called when a tab is clicked.',
  },
];

export const TabsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Tabs" propList={tabsProps} {...props} />
);

const tabItemProps: Prop[] = [
  {
    name: 'id',
    types: 'string',
    description: 'Tab identifier, must be unique.',
    required: true,
  },
  {
    name: 'title',
    types: 'string',
    description: 'Title for the tab.',
    required: true,
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Determines if the Tab is disabled.',
  },
];

export const TabItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Tabs[TabItem]" propList={tabItemProps} {...props} />
);
