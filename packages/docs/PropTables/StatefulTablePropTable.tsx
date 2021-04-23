import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const statefulTableProps: Prop[] = [
  {
    name: 'columns',
    types: <NextLink href="#stateful-table-columns-prop-table">Columns[]</NextLink>,
    description: (
      <>
        See <NextLink href="#stateful-table-columns-prop-table">below</NextLink> for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'items',
    types: 'any[]',
    description: 'The array of items to display.',
    required: true,
  },
  {
    name: 'itemName',
    types: 'string',
    description: 'Item name displayed on the table actions section.',
  },
  {
    name: 'keyField',
    types: 'string',
    defaultValue: 'id',
    description: 'Unique property identifier for items.',
  },
  {
    name: 'pagination',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Defines if table should be paginated.',
  },
  {
    name: 'search',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Defines if table should have search by visible fields with type string, number, boolean',
  },
  {
    name: 'selectable',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Defines if table should be selectable.',
  },
  {
    name: 'stickyHeader',
    types: 'boolean',
    description: 'Makes the table header fixed.',
  },
  {
    name: 'headerless',
    types: 'boolean',
    defaultValue: 'false',
    description:
      'Hides header row with all table headers. Headers are only visually hidden to keep with accessibility best practices.',
  },
  {
    name: 'defaultSelected',
    types: 'Item[]',
    description: 'Defines which items are selected by default on initial render.',
  },
  {
    name: 'onSelectionChange',
    types: '(selectedItems: Item[]) => void',
    description: 'Function to be called when item selection changes.',
  },
  {
    name: 'actions',
    types: 'React.ReactNode',
    description: 'Component to render custom actions.',
  },
  {
    name: 'emptyComponent',
    types: 'React.ReactElement',
    description: 'Component to render when there are no items.',
  },
  {
    name: 'onRowDrop',
    types: '(items: any[]) => void',
    description: 'Callback called with updated items list once drag and drop action has been completed.',
  },
  {
    name: 'filters',
    types: <NextLink href="#stateful-table-filters-prop-table">Filters</NextLink>,
    description: (
      <>
        See <NextLink href="#stateful-table-filters-prop-table">below</NextLink> for usage.
      </>
    ),
  },
];

const tableColumnsProps: Prop[] = [
  {
    name: 'render',
    types: 'React.ComponentType<Item>',
    required: true,
    description: 'Component used to render a column.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header title.',
  },
  {
    name: 'hideHeader',
    types: 'boolean',
    defaultValue: 'false',
    description:
      'Hides individual header values in the header row. Header is only visually hidden to keep with accessibility best practices.',
  },
  {
    name: 'align',
    types: ['left', 'center', 'right'],
    defaultValue: 'left',
    description: 'Sets alignment for column.',
  },
  {
    name: 'display',
    types: ['table-cell', 'none'],
    description: 'Sets the CSS display property of a column.',
  },
  {
    name: 'hash',
    types: 'string',
    required: true,
    description: 'Unique identifier for column.',
  },
  {
    name: 'sortFn',
    types: `(a: Item, b: Item, dir: 'ASC' | 'DESC') => number`,
    description: 'Enables sorting on the column using a custom sort function.',
  },
  {
    name: 'sortKey',
    types: 'string',
    description: 'Enables sorting on the column using item[sortKey].',
  },
  {
    name: 'verticalAlign',
    types: ['top', 'middle'],
    defaultValue: 'top',
    description: 'Sets vertical alignment for column (td only).',
  },
  {
    name: 'width',
    types: ['string', 'number'],
    description: 'Sets column width.',
  },
  {
    name: 'withPadding',
    types: 'boolean',
    defaultValue: true,
    description: 'Toggles padding on td elements.',
  },
];

const filterProps: Prop[] = [
  {
    description: (
      <>
        An array of pill tab items to render in the table. See{' '}
        <NextLink href="/PillTabs/PillTabPage" as="/pill-tabs">
          Pill Tabs
        </NextLink>{' '}
        for usage.
      </>
    ),
    name: 'pillTabs',
    types: 'PillTabItem[]',
  },
  {
    name: 'filter',
    types: '(itemId: string, items: Item[]) => Item[]',
    description: 'A function that takes the current items and filters them according to the desired functionality.',
  },
];

export const StatefulTablePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="StatefulTable" propList={statefulTableProps} {...props} />
);

export const StatefulTableColumnsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="StatefulTable[Columns]" propList={tableColumnsProps} {...props} />
);

export const StatefulTableFiltersPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="StatefulTable[Filters]" propList={filterProps} {...props} />
);
