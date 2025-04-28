import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const tableProps: Prop[] = [
  {
    name: 'columns',
    types: (
      <NextLink href={{ hash: 'table-columns-prop-table', query: { props: 'columns' } }}>
        Columns[]
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'table-columns-prop-table', query: { props: 'columns' } }}>
          Columns
        </NextLink>{' '}
        for usage.
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
    name: 'onRowDrop',
    types: '(from: number, to: number) => void',
    description: 'Callback called with form and to index once a row has been dragged and dropped.',
  },
  {
    name: 'pagination',
    types: [
      <NextLink href="/offset-pagination" key="offset">
        OffsetPagination
      </NextLink>,
      <NextLink href="/stateless-pagination" key="stateless">
        StatelessPagination
      </NextLink>,
    ],
    description: 'See the specific pagination components for details.',
  },
  {
    name: 'selectable',
    types: (
      <NextLink href={{ hash: 'table-selectable-prop-table', query: { props: 'selectable' } }}>
        Selectable
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'table-selectable-prop-table', query: { props: 'selectable' } }}>
          Selectable
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
  {
    name: 'sortable',
    types: (
      <NextLink href={{ hash: 'table-sortable-prop-table', query: { props: 'sortable' } }}>
        Sortable
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'table-sortable-prop-table', query: { props: 'sortable' } }}>
          Sortable
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
  {
    name: 'stickyHeader',
    types: 'boolean',
    description: 'Makes the table header and actions fixed.',
  },
  {
    name: 'headerless',
    types: 'boolean',
    defaultValue: 'false',
    description:
      'Hides header row with all table headers. Headers are only visually hidden to keep with accessibility best practices.',
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
    name: 'localization',
    types: '{ ascendingOrder?: string, descendingOrder?: string, controlsLabel?: string }',
    description: 'Overrides the labels with localized text.',
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
    name: 'isSortable',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Defines if the column is sortable.',
  },
  {
    name: 'verticalAlign',
    types: ['top', 'middle'],
    defaultValue: 'top',
    description: 'Sets vertical alignment for column (td only).',
  },
  {
    name: 'tooltip',
    types: 'string',
    description: 'Tooltip for the table column header.',
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

const tableSelectableProps: Prop[] = [
  {
    name: 'selectedItems',
    types: 'Item[]',
    description: 'Defines which items are selected.',
    required: true,
  },
  {
    name: 'onSelectionChange',
    types: '(selectedItems: Item[]) => void',
    description: 'Function to be called when item selection changes.',
    required: true,
  },
];

const tableSortableProps: Prop[] = [
  {
    name: 'direction',
    types: ['ASC', 'DESC'],
    required: true,
    description: 'Defines sort direction.',
  },
  {
    name: 'columnHash',
    types: 'string',
    description: 'Defines which column is currently sorted.',
  },
  {
    name: 'onSort',
    types: '(columnHash: string, direction: TableSortDirection, column: TableColumn<T>): void;',
    description: 'Function to be called when a sortable header is clicked.',
    required: true,
  },
];

export const TablePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tableProps} title="Table" {...props} />
);

export const TableColumnsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tableColumnsProps} title="Table[Columns]" {...props} />
);

export const TableSelectablePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tableSelectableProps} title="Table[Selectable]" {...props} />
);

export const TableSortablePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tableSortableProps} title="Table[Sortable]" {...props} />
);

export const TableFigurePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['figure', 'all']} propList={[]} title="TableFigure" {...props} />
);
