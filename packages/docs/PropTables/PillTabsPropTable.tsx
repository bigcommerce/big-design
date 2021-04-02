import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const pillTabsPropTable: Prop[] = [
  {
    description: (
      <>
        See <NextLink href="#pill-tabs-items-prop-table">below</NextLink> for usage.
      </>
    ),
    name: 'items',
    required: true,
    types: <NextLink href="#pill-tabs-items-prop-table">PillTabItem[]</NextLink>,
  },
];

export const PillTabsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Pill Tabs" propList={pillTabsPropTable} {...props} />
);

const tabItemProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'The text inside the Pill Tab Item',
    required: true,
  },
  {
    name: 'isActive',
    types: 'boolean',
    description: 'Flag that determines whether the tab is active or not',
    required: true,
  },
  {
    name: 'onClick',
    types: 'funtion',
    description: 'A callback to execute whenever the Pill Tab Item is clicked',
    required: true,
  },
];

export const PillTabItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="PillTabs[PillTabItem]" propList={tabItemProps} {...props} />
);
