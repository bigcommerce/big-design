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
      "Hides the current tables's headers. Headers are only visually hidden to keep with accessibility best practices.",
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
    types: 'React.ComponentType<any>',
    description: 'Component to render custom actions.',
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
    name: 'align',
    types: ['left', 'center', 'right'],
    defaultValue: 'left',
    description: 'Sets alignment for column.',
  },
  {
    name: 'hash',
    types: 'string',
    required: true,
    description: 'Unique identifier for column.',
  },
  {
    name: 'sortKey',
    types: 'string',
    description: 'Enables sorting on the column using item[sortKey].',
  },
  {
    name: 'verticalAlign',
    types: ['top', 'center'],
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

export const StatefulTablePropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="StatefulTable" propList={statefulTableProps} {...props} />
);

export const StatefulTableColumnsPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="StatefulTable[Columns]" propList={tableColumnsProps} {...props} />
);
