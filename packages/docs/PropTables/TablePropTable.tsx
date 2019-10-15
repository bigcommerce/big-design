import { NextLink, Prop, PropTable } from '../components';

const tableProps: Prop[] = [
  {
    name: 'columns',
    types: <NextLink href="#table-columns-prop-table">Columns[]</NextLink>,
    description: (
      <>
        See <NextLink href="#table-columns-prop-table">below</NextLink> for usage.
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
    name: 'keyField',
    types: 'string',
    defaultValue: 'id',
    description: 'Unique property identifier for items.',
  },
  {
    name: 'pagination',
    types: (
      <NextLink href="/Pagination/PaginationPage" as="/pagination">
        Pagination
      </NextLink>
    ),
    description: 'See pagination component for details.',
  },
  {
    name: 'selectable',
    types: <NextLink href="#table-selectable-prop-table">Selectable</NextLink>,
    description: (
      <>
        See <NextLink href="#table-selectable-prop-table">below</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'stickyHeader',
    types: 'boolean',
    description: 'Makes the table header fixed.',
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

const tableSelectableProps: Prop[] = [
  {
    name: 'selectedItems',
    types: 'Item[]',
    description: 'Defines which items are selected.',
  },
  {
    name: 'onSelectionChange',
    types: '(selectedItems: Item[]) => void',
    description: 'Function to be called when item selection changes.',
  },
  {
    name: 'itemType',
    types: 'string',
    description: 'Item type name displayed on the selected action section. (Eg: 2/10 Products)',
  },
];

export const TablePropTable: React.FC = () => <PropTable propList={tableProps} />;
export const TableColumnsPropTable: React.FC = () => <PropTable propList={tableColumnsProps} />;
export const TableSelectablePropTable: React.FC = () => <PropTable propList={tableSelectableProps} />;
