import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const pillTabsPropTable: Prop[] = [
  {
    name: 'activePills',
    types: 'string[]',
    description: 'The currently active pill ids as an array of strings.',
  },
  {
    description: (
      <>
        Accepts either a flat array of{' '}
        <NextLink href={{ hash: 'pill-tabs-items-prop-table', query: { props: 'pill-tab-item' } }}>
          PillTabItem
        </NextLink>{' '}
        or an array of{' '}
        <NextLink
          href={{
            hash: 'pill-tabs-item-group-prop-table',
            query: { props: 'pill-tab-item-group' },
          }}
        >
          PillTabItemGroup
        </NextLink>{' '}
        for grouped pills with visual separators.
      </>
    ),
    name: 'items',
    required: true,
    types: (
      <>
        <NextLink href={{ hash: 'pill-tabs-items-prop-table', query: { props: 'pill-tab-item' } }}>
          PillTabItem[]
        </NextLink>{' '}
        |{' '}
        <NextLink
          href={{
            hash: 'pill-tabs-item-group-prop-table',
            query: { props: 'pill-tab-item-group' },
          }}
        >
          PillTabItemGroup[]
        </NextLink>
      </>
    ),
  },
  {
    name: 'onPillClick',
    types: '(itemId: string) => void',
    description: 'Function that will get called when a pill tab is clicked.',
    required: true,
  },
  {
    name: 'dropdownItems',
    types: 'Array<DropdownItem | DropdownLinkItem> | Array<DropdownItemGroup>',
    description: (
      <>
        See the <NextLink href="/dropdown">Dropdown</NextLink> component for usage.
      </>
    ),
  },
];

export const PillTabsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={pillTabsPropTable} title="PillTabs" {...props} />
);

const tabItemProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'The text inside the Pill Tab Item.',
    required: true,
  },
  {
    description: 'A unique identifier for the pill.',
    name: 'id',
    required: true,
    types: 'string',
  },
];

export const PillTabItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tabItemProps} title="PillTabs[PillTabItem]" {...props} />
);

const tabItemGroupProps: Prop[] = [
  {
    name: 'items',
    types: 'PillTabItem[]',
    description: 'Array of pill tab items within this group.',
    required: true,
  },
  {
    name: 'label',
    types: 'string',
    description: 'Optional label displayed as a header in the dropdown when items overflow.',
  },
  {
    name: 'separated',
    types: 'boolean',
    description: 'Whether to show a separator before this group in the dropdown.',
  },
];

export const PillTabItemGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tabItemGroupProps} title="PillTabs[PillTabItemGroup]" {...props} />
);
