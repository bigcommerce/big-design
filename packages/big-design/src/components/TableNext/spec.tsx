import { fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { CSSProperties } from 'react';
import 'jest-styled-components';

import { TableFigureNext, TableNext } from './TableNext';
import { TableColumn } from './types';

interface Item {
  sku: string;
  name: string;
  stock: number;
  children?: Item[];
}

interface SimpleTableOptions {
  className?: string;
  columns?: Array<TableColumn<Item>>;
  items?: Item[];
  dataTestId?: string;
  emptyComponent?: React.ReactElement;
  headerless?: boolean;
  id?: string;
  itemName?: string;
  style?: CSSProperties;
}

const getSimpleTable = ({
  className,
  columns,
  dataTestId,
  emptyComponent,
  headerless,
  id,
  itemName,
  items,
  style,
}: SimpleTableOptions = {}) => {
  const defaultColumns: Array<TableColumn<Item>> = [
    { hash: 'sku', header: 'Sku', render: ({ sku }) => sku },
    { hash: 'name', header: 'Name', render: ({ name }) => name },
    { hash: 'stock', header: 'Stock', render: ({ stock }) => stock },
  ];

  const defaultItems: Item[] = [
    { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
    { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
    { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
    { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
    { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  ];

  return (
    <TableNext
      className={className}
      columns={columns || defaultColumns}
      data-testid={dataTestId}
      emptyComponent={emptyComponent}
      headerless={headerless}
      id={id}
      itemName={itemName}
      items={items || defaultItems}
      style={style}
    />
  );
};

const mockChildrenRowsSmithJournal13 = [
  { sku: 'SM13-1', name: 'Small smith journal', stock: 10 },
  { sku: 'SM13-2', name: 'Large smith journal', stock: 15 },
];

const mockChildrenRowsDustpanAndBrush = [
  { sku: 'DPB-1', name: 'Small dustpan and brush', stock: 20 },
  { sku: 'DPB-2', name: 'Large dustpan and brush', stock: 14 },
];

const mockChildrenRowsUtilityCaddy = [
  { sku: 'OFSUC-1', name: 'Small utility caddy', stock: 20 },
  { sku: 'OFSUC-2', name: 'Large utility caddy', stock: 25 },
];

test('renders a simple table', () => {
  const { container } = render(getSimpleTable());

  expect(container.firstChild).toMatchSnapshot();
});

test('renders a table figure', () => {
  const { container } = render(<TableFigureNext />);

  expect(container.firstChild).toMatchSnapshot();
});

test('generates a table id automatically', () => {
  const { getByRole } = render(getSimpleTable());

  const table = getByRole('table');

  expect(table.id).toBeTruthy();
});

test('forwards id and testid when provided', () => {
  const id = 'testId';
  const dataTestId = 'dataTestId';

  const { getByRole } = render(getSimpleTable({ id, dataTestId }));

  const table = getByRole('table');

  expect(table.id).toBe(id);
  expect(table.dataset.testid).toBe(dataTestId);
});

test('does not forward styles', () => {
  const { container } = render(getSimpleTable({ className: 'test', style: { background: 'red' } }));

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders column with custom component', () => {
  const { getAllByTestId } = render(
    getSimpleTable({
      columns: [
        { hash: 'sku', header: 'Sku', render: ({ sku }: any) => sku },
        {
          hash: 'name',
          header: 'Name',
          render: ({ name }: any) => <h3 data-testid="name">{name}</h3>,
        },
      ],
    }),
  );

  expect(getAllByTestId('name')).toHaveLength(5);
});

test('renders column with tooltip icon', () => {
  const { getByTitle } = render(
    getSimpleTable({
      columns: [
        { hash: 'sku', header: 'Sku', render: ({ sku }: any) => sku },
        { hash: 'name', header: 'Name', tooltip: 'Some text', render: ({ name }: any) => name },
      ],
    }),
  );

  expect(getByTitle('Hover or focus for additional context.')).toBeInTheDocument();
});

test('renders tooltip when hovering on icon', async () => {
  const { getByTitle } = render(
    getSimpleTable({
      columns: [
        { hash: 'sku', header: 'Sku', render: ({ sku }: any) => sku },
        { hash: 'name', header: 'Name', tooltip: 'Some text', render: ({ name }: any) => name },
      ],
    }),
  );

  fireEvent.mouseOver(getByTitle('Hover or focus for additional context.'));

  const result = await screen.findByText('Some text');

  expect(result).toBeInTheDocument();
});

test('tweaks column styles with props', () => {
  const { container } = render(
    getSimpleTable({
      columns: [
        {
          hash: '1',
          header: 'Sku',
          render: ({ sku }: any) => sku,
          align: 'right',
          verticalAlign: 'middle',
        },
        {
          hash: '2',
          header: 'Name',
          render: ({ name }: any) => name,
          width: 100,
          withPadding: false,
        },
      ],
    }),
  );

  const headers = container.querySelectorAll('th');
  const skuHeader = headers[0];
  const nameHeader = headers[1];

  expect(skuHeader.childNodes[0]).toHaveStyleRule('justify-content', 'flex-end');
  expect(skuHeader).not.toHaveStyleRule('vertical-align', 'center');

  expect(nameHeader).toHaveStyleRule('width', '100px');
  expect(skuHeader).not.toHaveStyleRule('padding', '0');

  const columns = container.querySelectorAll('tbody td');
  const skuTd = columns[0];
  const nameTd = columns[1];

  expect(skuTd).toHaveStyle(`
    text-align: right;
    vertical-align: middle;
  `);

  expect(nameTd).toHaveStyle(`
    width: 100px;
  `);
});

test('renders the total number of items + item name', () => {
  const { getByText } = render(getSimpleTable({ itemName: 'Test Items' }));

  const itemNameNode = getByText(`5 Test Items`);

  expect(itemNameNode).toBeInTheDocument();
});

describe('offset pagination', () => {
  test('renders a pagination component', async () => {
    const onItemsPerPageChange = jest.fn();
    const onPageChange = jest.fn();

    const { container, findByTitle } = render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={[
          { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
          { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
          { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
          { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
          { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
        ]}
        keyField="sku"
        pagination={{
          currentPage: 1,
          itemsPerPage: 3,
          totalItems: 5,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange,
          onPageChange,
        }}
      />,
    );

    const nextPage = await findByTitle('Next page');

    await userEvent.click(nextPage);

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a pagination component with custom button labels', async () => {
    const getRangeLabel = (first: number, last: number, totalItems: number) => {
      return `[Custom label] ${first}-${last} of ${totalItems}`;
    };
    const onItemsPerPageChange = jest.fn();
    const onPageChange = jest.fn();

    const { findByRole } = render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={[
          { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
          { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
          { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
          { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
          { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
        ]}
        keyField="sku"
        pagination={{
          currentPage: 1,
          itemsPerPage: 3,
          totalItems: 5,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange,
          onPageChange,
          label: '[Custom] Pagination',
          localization: {
            previousPage: '[Custom] Previous page',
            nextPage: '[Custom] Next page',
          },
          getRangeLabel,
        }}
      />,
    );

    const navigation = await findByRole('navigation', { name: '[Custom] Pagination' });
    const paginationDropdown = await findByRole('button', { name: '[Custom label] 1-3 of 5' });
    const previousButtonPage = await findByRole('button', { name: '[Custom] Previous page' });
    const nextButtonPage = await findByRole('button', { name: '[Custom] Next page' });

    expect(navigation).toBeVisible();
    expect(paginationDropdown).toBeVisible();
    expect(previousButtonPage).toBeVisible();
    expect(nextButtonPage).toBeVisible();
  });

  test('selection persists indexes on other pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index >= 3 && index < 6)}
        keyField="sku"
        pagination={{
          currentPage: 2,
          itemsPerPage: 3,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: { 0: true },
          onSelectionChange,
        }}
      />,
    );

    const [, firstRow] = await screen.findAllByRole('row');
    const firstRowCheckbox = within(firstRow).getByRole('checkbox');

    await userEvent.click(firstRowCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith({ 0: true, 3: true });
  });

  test('deselection persists indexes on other pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index >= 3 && index < 6)}
        keyField="sku"
        pagination={{
          currentPage: 2,
          itemsPerPage: 3,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: { 0: true, 3: true },
          onSelectionChange,
        }}
      />,
    );

    const [, firstRow] = await screen.findAllByRole('row');
    const firstRowCheckbox = within(firstRow).getByRole('checkbox');

    await userEvent.click(firstRowCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith({ 0: true });
  });

  test('select all persists indexes on other pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index >= 3 && index < 6)}
        keyField="sku"
        pagination={{
          currentPage: 2,
          itemsPerPage: 3,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: { 0: true, 3: true },
          onSelectionChange,
        }}
      />,
    );

    const selectAll = await screen.findByRole('checkbox', { name: /select all/i });

    await userEvent.click(selectAll);

    expect(onSelectionChange).toHaveBeenCalledWith({ 0: true, 3: true, 4: true });
  });

  test('deselect all persists indexes on other pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index >= 3 && index < 6)}
        keyField="sku"
        pagination={{
          currentPage: 2,
          itemsPerPage: 3,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: { 0: true, 3: true, 4: true },
          onSelectionChange,
        }}
      />,
    );

    const deselectAll = await screen.findByRole('checkbox', { name: /deselect all/i });

    await userEvent.click(deselectAll);

    expect(onSelectionChange).toHaveBeenCalledWith({ 0: true });
  });

  test('selecting individual rows persists selection across pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
      { sku: 'TWB', name: '[Sample] Tiered Wire Basket', stock: 49 },
      { sku: 'OCG', name: '[Sample] Oak Cheese Grater', stock: 16 },
      { sku: 'SLLPJ', name: '[Sample] 1 L Le Parfait Jar', stock: 31 },
      { sku: 'CC3C', name: '[Sample] Chemex Coffeemaker 3 Cup', stock: 22 },
      { sku: 'ABS', name: '[Sample] Able Brewing System', stock: 41 },
      { sku: 'OTS', name: '[Sample] Orbit Terrarium - Small', stock: 14 },
      { sku: 'OTL', name: '[Sample] Orbit Terrarium - Large', stock: 12 },
      { sku: 'SLCTBS', name: '[Sample] Fog Linen Chambray Towel - Beige Stripe', stock: 34 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index < 10)}
        keyField="sku"
        pagination={{
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: {
            0: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
          },
          onSelectionChange,
        }}
      />,
    );

    const [, tableBody] = await screen.findAllByRole('rowgroup');
    const [, secondRowCheckbox] = await within(tableBody).findAllByRole('checkbox');

    await userEvent.click(secondRowCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith({
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
    });
  });

  test('deselecting individual rows persists selection across pages', async () => {
    const onSelectionChange = jest.fn();

    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
      { sku: 'TWB', name: '[Sample] Tiered Wire Basket', stock: 49 },
      { sku: 'OCG', name: '[Sample] Oak Cheese Grater', stock: 16 },
      { sku: 'SLLPJ', name: '[Sample] 1 L Le Parfait Jar', stock: 31 },
      { sku: 'CC3C', name: '[Sample] Chemex Coffeemaker 3 Cup', stock: 22 },
      { sku: 'ABS', name: '[Sample] Able Brewing System', stock: 41 },
      { sku: 'OTS', name: '[Sample] Orbit Terrarium - Small', stock: 14 },
      { sku: 'OTL', name: '[Sample] Orbit Terrarium - Large', stock: 12 },
      { sku: 'SLCTBS', name: '[Sample] Fog Linen Chambray Towel - Beige Stripe', stock: 34 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items.filter((_, index) => index < 10)}
        keyField="sku"
        pagination={{
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
          },
          onSelectionChange,
        }}
      />,
    );

    const [, tableBody] = await screen.findAllByRole('rowgroup');
    const [, secondRowCheckbox] = await within(tableBody).findAllByRole('checkbox');

    await userEvent.click(secondRowCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith({
      0: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
    });
  });

  test("selected expandable rows doesn't count towards total selected items", async () => {
    const items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      {
        sku: 'CLC',
        name: '[Sample] Canvas Laundry Cart',
        stock: 2,
        variants: [{ sku: 'CLC-RED', name: '[Sample] Canvas Laundry Cart - Red', stock: 2 }],
      },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        expandable={{
          expandedRows: {},
          onExpandedChange: jest.fn(),
          getChildren: (row) => row?.variants,
        }}
        items={items.filter((_, index) => index >= 3 && index < 6)}
        keyField="sku"
        pagination={{
          currentPage: 2,
          itemsPerPage: 3,
          totalItems: items.length,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onPageChange: jest.fn(),
        }}
        selectable={{
          selectedItems: { 0: true, 3: true, '3.0': true, 4: true },
          onSelectionChange: jest.fn(),
          isChildrenRowsSelectable: true,
          initialSelectedParentRows: ['0', '3', '4'],
        }}
      />,
    );

    const selectedItems = await screen.findByText('3/5');

    expect(selectedItems).toBeInTheDocument();
  });
});

describe('stateless pagination', () => {
  test('renders a pagination component', async () => {
    const onItemsPerPageChange = jest.fn();
    const onNext = jest.fn();

    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={[
          { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
          { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
          { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
          { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
          { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
        ]}
        pagination={{
          currentPage: 1,
          itemsPerPage: 3,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange,
          onNext,
          onPrevious: jest.fn(),
        }}
      />,
    );

    await userEvent.click(await screen.findByTitle('Next page'));

    expect(onNext).toHaveBeenCalled();
  });

  test('renders a pagination component with custom button labels', async () => {
    render(
      <TableNext
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={[
          { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
          { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
          { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
          { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
          { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
        ]}
        pagination={{
          currentPage: 1,
          itemsPerPage: 3,
          itemsPerPageOptions: [3, 5, 10],
          onItemsPerPageChange: jest.fn(),
          onNext: jest.fn(),
          onPrevious: jest.fn(),
          localization: {
            label: '[Custom] Pagination',
            previousPage: '[Custom] Previous page',
            nextPage: '[Custom] Next page',
            rangeLabel: '[Custom] Change items per page',
          },
        }}
      />,
    );

    const navigation = await screen.findByRole('navigation', { name: '[Custom] Pagination' });
    const paginationDropdown = await screen.findByRole('button', {
      name: '[Custom] Change items per page',
    });
    const previousButtonPage = await screen.findByRole('button', {
      name: '[Custom] Previous page',
    });
    const nextButtonPage = await screen.findByRole('button', { name: '[Custom] Next page' });

    expect(navigation).toBeVisible();
    expect(paginationDropdown).toBeVisible();
    expect(previousButtonPage).toBeVisible();
    expect(nextButtonPage).toBeVisible();
  });

  describe('selectable', () => {
    test('renders a summary of the selected items, without reference to the total number of items', async () => {
      render(
        <TableNext
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
          ]}
          itemName="Product"
          items={[
            { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
            { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
            { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
            { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
            { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
          ]}
          pagination={{
            currentPage: 1,
            itemsPerPage: 3,
            itemsPerPageOptions: [3, 5, 10],
            onItemsPerPageChange: jest.fn(),
            onNext: jest.fn(),
            onPrevious: jest.fn(),
          }}
          selectable={{ selectedItems: {}, onSelectionChange: jest.fn() }}
        />,
      );

      const rowOfCanvasLaundryCart = screen.getByRole('row', { name: /Canvas Laundry Cart/ });
      const rowOfLaundryDetergent = screen.getByRole('row', { name: /Laundry Detergent/ });

      await userEvent.click(within(rowOfCanvasLaundryCart).getByRole('checkbox'));
      await userEvent.click(within(rowOfLaundryDetergent).getByRole('checkbox'));

      const tableControls = screen.getByRole('toolbar', { name: 'Table Controls' });

      expect(within(tableControls).queryByText('2/6')).not.toBeInTheDocument();
      expect(within(tableControls).getByText('2')).toBeInTheDocument();
    });
  });
});

describe('selectable', () => {
  let columns: Array<TableColumn<Item>>;
  let items: Item[];
  let onSelectionChange: jest.Mock;
  let onExpandedChange: jest.Mock;
  const itemName = 'Product';

  beforeEach(() => {
    onSelectionChange = jest.fn();
    onExpandedChange = jest.fn();
    items = [
      {
        sku: 'SM13',
        name: '[Sample] Smith Journal 13',
        stock: 25,
        children: mockChildrenRowsSmithJournal13,
      },
      {
        sku: 'DPB',
        name: '[Sample] Dustpan & Brush',
        stock: 34,
        children: mockChildrenRowsDustpanAndBrush,
      },
      {
        sku: 'OFSUC',
        name: '[Sample] Utility Caddy',
        stock: 45,
        children: mockChildrenRowsUtilityCaddy,
      },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];

    columns = [
      { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku },
      { header: 'Name', hash: 'name', render: ({ name }: any) => name },
      { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
    ];
  });

  test('renders selectable actions and checkboxes', () => {
    const { container, getAllByRole } = render(
      <TableNext
        columns={columns}
        itemName={itemName}
        items={items}
        selectable={{
          onSelectionChange,
          selectedItems: {},
        }}
      />,
    );

    // One per item + Actions (select all) checkbox
    expect(getAllByRole('checkbox')).toHaveLength(items.length + 1);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('selectable by default (isChildrenRowsSelectable prop is not used or is set to false)', () => {
    test('when isChildrenRowsSelectable prop is not used or is set to false, as default renders checkboxes just for parent rows', () => {
      const { container, getAllByRole } = render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
          }}
        />,
      );

      // One per parent row + Actions (select all) checkbox
      expect(getAllByRole('checkbox')).toHaveLength(items.length + 1);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('by default, click on select all should call selectedItems with only all parerent rows', async () => {
      render(
        <TableNext
          columns={columns}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');
      const selectedItems = items.reduce(
        (acc: Record<string, true>, _parentRow, parentRowIndex) => {
          acc[`${parentRowIndex}`] = true;

          return acc;
        },
        {},
      );

      // Select All
      expect(selectAllCheckbox).not.toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('by default, select all when already all selected should deselect all parent rows', async () => {
      const selectedItems = items.reduce(
        (acc: Record<string, true>, _parentRow, parentRowIndex) => {
          acc[`${parentRowIndex}`] = true;

          return acc;
        },
        {},
      );

      render(
        <TableNext
          columns={columns}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems,
            isChildrenRowsSelectable: false,
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');

      // Deselect all
      expect(selectAllCheckbox).toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith({});
    });

    test('when selecting a parent row, retrieves the selected items (parent row) by sku when using getRowId prop', async () => {
      const smithJornal13Sku = items[0].sku;

      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: {},
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          getRowId={(item) => item.sku}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
          }}
        />,
      );

      const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/ });
      const checkbox = await within(parentRow).findByRole<HTMLInputElement>('checkbox');

      // Select all
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      const selectedItems: Record<string, true> = { [smithJornal13Sku]: true };

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('when clicking on select all should retrieve the selected items (all parent rows) by sku when using getRowId prop', async () => {
      render(
        <TableNext
          columns={columns}
          getRowId={(item) => item.sku}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');
      const selectedItems = items.reduce((acc: Record<string, true>, parentRow) => {
        const parentRowSku = parentRow.sku;

        acc[parentRowSku] = true;

        return acc;
      }, {});

      // Select All
      expect(selectAllCheckbox).not.toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });
  });

  describe('selectable by not default (isChildrenRowsSelectable prop is used and it is set to true', () => {
    test('renders checkboxes for parent rows and children rows)', () => {
      const { container, getAllByRole } = render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      // One per parent row and child row + Actions (select all) checkbox
      expect(getAllByRole('checkbox')).toHaveLength(
        items.length + mockChildrenRowsSmithJournal13.length * 3 + 1,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('click on select all should call selectedItems with all parentRows and chilrenRows.', async () => {
      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');
      const selectedItems = items.reduce((acc: Record<string, true>, parentRow, parentRowIndex) => {
        acc[`${parentRowIndex}`] = true;

        const { children } = parentRow;

        if (children !== undefined) {
          children.forEach((_childRow, childRowIndex) => {
            acc[`${parentRowIndex}.${childRowIndex}`] = true;
          });
        }

        return acc;
      }, {});

      // Select All
      expect(selectAllCheckbox).not.toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('select all when already all selected should deselect all parent rows and children rows', async () => {
      const selectedItems = items.reduce((acc: Record<string, true>, parentRow, parentRowIndex) => {
        acc[`${parentRowIndex}`] = true;

        const { children } = parentRow;

        if (children !== undefined) {
          children.forEach((_childRow, childRowIndex) => {
            acc[`${parentRowIndex}.${childRowIndex}`] = true;
          });
        }

        return acc;
      }, {});

      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems,
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');

      // Deselect all
      expect(selectAllCheckbox).toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith({});
    });

    test('select all children rows when selecting a parent row', async () => {
      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/ });
      const checkbox = await within(parentRow).findByRole<HTMLInputElement>('checkbox');

      // Select all
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      const selectedItems: Record<string, true> = { 0: true };

      const { children } = items[0];

      if (children) {
        children.forEach((_childRow: Item, childRowIndex: number) => {
          selectedItems[`0.${childRowIndex}`] = true;
        });
      }

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('unselect all children rows when unselecting a parent row', async () => {
      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: { 0: true, '0.0': true, '0.1': true },
            isChildrenRowsSelectable: true,
            initialSelectedParentRows: ['0'],
          }}
        />,
      );

      const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/ });
      const checkbox = await within(parentRow).findByRole<HTMLInputElement>('checkbox');

      // Deselect all
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);

      expect(onSelectionChange).toHaveBeenCalledWith({});
    });

    test('selects a parent row when a single child row is selected', async () => {
      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const smallSmithJournalChildrenRow = await screen.findByRole('row', {
        name: /Small smith journal/,
      });
      const childRowCheckbox = await within(
        smallSmithJournalChildrenRow,
      ).findByRole<HTMLInputElement>('checkbox');

      expect(childRowCheckbox).not.toBeChecked();

      await userEvent.click(childRowCheckbox);

      const selectedItems: Record<string, true> = { '0': true, '0.0': true };

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('unselects a parent row when a single child row is selected', async () => {
      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: { 0: true, 1: true, 2: true },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: { '0': true, '0.0': true },
            isChildrenRowsSelectable: true,
            initialSelectedParentRows: ['0'],
          }}
        />,
      );

      const smallSmithJournalChildrenRow = await screen.findByRole('row', {
        name: /Small smith journal/,
      });
      const childRowCheckbox = await within(
        smallSmithJournalChildrenRow,
      ).findByRole<HTMLInputElement>('checkbox');

      expect(childRowCheckbox).toBeChecked();

      await userEvent.click(childRowCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith({});
    });

    test('when selecting a single child row, retrieves the selected items (parent row when a single child row ) by sku when using getRowId prop', async () => {
      const smithJornal13Sku = items[0].sku;
      const dustpandAndBrushSku = items[1].sku;
      const utilityCaddySku = items[2].sku;
      const smallSmithJournalSku = mockChildrenRowsSmithJournal13[0].sku;

      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: {
              [smithJornal13Sku]: true,
              [dustpandAndBrushSku]: true,
              [utilityCaddySku]: true,
            },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          getRowId={(item) => item.sku}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const smallSmithJournalChildrenRow = await screen.findByRole('row', {
        name: /Small smith journal/,
      });
      const childRowCheckbox = await within(
        smallSmithJournalChildrenRow,
      ).findByRole<HTMLInputElement>('checkbox');

      expect(childRowCheckbox).not.toBeChecked();

      await userEvent.click(childRowCheckbox);

      const selectedItems: Record<string, true> = {
        [smithJornal13Sku]: true,
        [smallSmithJournalSku]: true,
      };

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('when selecting a parent row retrieves the selected items (parent row + children rows) by sku when using getRowId prop', async () => {
      const smithJornal13Sku = items[0].sku;
      const dustpandAndBrushSku = items[1].sku;
      const utilityCaddySku = items[2].sku;

      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: {
              [smithJornal13Sku]: true,
              [dustpandAndBrushSku]: true,
              [utilityCaddySku]: true,
            },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          getRowId={(item) => item.sku}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/ });
      const checkbox = await within(parentRow).findByRole<HTMLInputElement>('checkbox');

      // Select all
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      const selectedItems: Record<string, true> = { [smithJornal13Sku]: true };

      const { children } = items[0];

      if (children) {
        children.forEach((childRow: Item) => {
          const childRowSku = childRow.sku;

          selectedItems[childRowSku] = true;
        });
      }

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });

    test('when clickling on select all should retrieves the selected items (all parentRows and chilrenRows) by sku when using getRowId prop', async () => {
      const smithJornal13Sku = items[0].sku;
      const dustpandAndBrushSku = items[1].sku;
      const utilityCaddySku = items[2].sku;

      render(
        <TableNext
          columns={columns}
          expandable={{
            expandedRows: {
              [smithJornal13Sku]: true,
              [dustpandAndBrushSku]: true,
              [utilityCaddySku]: true,
            },
            onExpandedChange,
            getChildren: ({ children }) => children,
          }}
          getRowId={(item) => item.sku}
          itemName={itemName}
          items={items}
          selectable={{
            onSelectionChange,
            selectedItems: {},
            isChildrenRowsSelectable: true,
          }}
        />,
      );

      const [selectAllCheckbox] = await screen.findAllByRole<HTMLInputElement>('checkbox');
      const selectedItems = items.reduce((acc: Record<string, true>, parentRow) => {
        const parentRowSku = parentRow.sku;

        acc[parentRowSku] = true;

        const { children } = parentRow;

        if (children !== undefined) {
          children.forEach((childRow) => {
            const childRowSku = childRow.sku;

            acc[childRowSku] = true;
          });
        }

        return acc;
      }, {});

      // Select All
      expect(selectAllCheckbox).not.toBeChecked();

      fireEvent.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(selectedItems);
    });
  });
});

describe('sortable', () => {
  let columns: Array<TableColumn<Item>>;
  let items: Item[];
  let onSort: jest.Mock;

  beforeEach(() => {
    onSort = jest.fn();
    items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];
    columns = [
      { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku, isSortable: true },
      { header: 'Name', hash: 'name', render: ({ name }: any) => name },
      { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
    ];
  });

  test('renders ASC header icon', () => {
    const { getByTestId } = render(
      <TableNext
        columns={columns}
        items={items}
        sortable={{
          columnHash: 'sku',
          direction: 'ASC',
          onSort,
        }}
      />,
    );

    expect(getByTestId('asc-icon')).toBeInTheDocument();
  });

  test('calls onSort when pressing a sortable header', () => {
    const { container } = render(
      <TableNext
        columns={columns}
        items={items}
        sortable={{
          columnHash: 'sku',
          direction: 'ASC',
          onSort,
        }}
      />,
    );

    const skuHeaders: NodeListOf<HTMLTableCellElement> = container.querySelectorAll('th');

    fireEvent.click(skuHeaders[0]);

    expect(onSort).toHaveBeenCalledWith('sku', 'DESC', columns[0]);
  });

  test('does not call onSort when pressing a non-sortable header', () => {
    const { container } = render(
      <TableNext
        columns={columns}
        items={items}
        sortable={{
          columnHash: 'sku',
          direction: 'ASC',
          onSort,
        }}
      />,
    );

    const nameHeader = container.querySelectorAll('th');

    fireEvent.click(nameHeader[1]);

    expect(onSort).not.toHaveBeenCalled();
  });

  test('calls onSort when pressing the direction icon', () => {
    const { getByTestId } = render(
      <TableNext
        columns={columns}
        items={items}
        sortable={{
          columnHash: 'sku',
          direction: 'ASC',
          onSort,
        }}
      />,
    );

    const sortIcon = getByTestId('asc-icon');

    fireEvent.click(sortIcon);

    expect(onSort).toHaveBeenCalledWith('sku', 'DESC', columns[0]);
  });

  test('renders custom actions', () => {
    const { getByTestId } = render(
      <TableNext
        actions={<div data-testid="customAction">Test Action</div>}
        columns={columns}
        items={items}
      />,
    );

    const customAction = getByTestId('customAction');

    expect(customAction).toBeInTheDocument();
    expect(customAction).toBeVisible();
  });

  test('renders headers by default and hides then via prop', () => {
    const { container, rerender } = render(getSimpleTable());

    expect(container.querySelector('th')).toBeVisible();

    rerender(getSimpleTable({ headerless: true }));

    expect(container.querySelector('th')).toBeInTheDocument();
    expect(container.querySelector('th')).not.toBeVisible();
  });

  test('renders the emptyComponent when there are no items', () => {
    const emptyComponent = <p>There are no items!</p>;

    render(getSimpleTable({ items: [], emptyComponent }));

    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  test('does not render emptyComponent if there are items', () => {
    const emptyComponent = <p>There are no items!</p>;

    render(getSimpleTable({ emptyComponent }));

    expect(screen.queryByText(/no items/i)).not.toBeInTheDocument();
  });
});

describe('draggable', () => {
  let columns: Array<TableColumn<Item>>;
  let items: Item[];
  let onRowDrop: jest.Mock;
  let onExpandedChange: jest.Mock;

  beforeEach(() => {
    onRowDrop = jest.fn();
    items = [
      {
        sku: 'SM13',
        name: '[Sample] Smith Journal 13',
        stock: 25,
        children: mockChildrenRowsSmithJournal13,
      },
      {
        sku: 'DPB',
        name: '[Sample] Dustpan & Brush',
        stock: 34,
        children: mockChildrenRowsDustpanAndBrush,
      },
      {
        sku: 'OFSUC',
        name: '[Sample] Utility Caddy',
        stock: 45,
        children: mockChildrenRowsUtilityCaddy,
      },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];
    columns = [
      { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku, isSortable: true },
      { header: 'Name', hash: 'name', render: ({ name }: any) => name },
      { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
    ];
  });

  test('renders drag and drop icon only', () => {
    const { container } = render(
      <TableNext columns={columns} items={items} onRowDrop={onRowDrop} />,
    );
    const dragIcons = container.querySelectorAll('svg');

    expect(dragIcons).toHaveLength(items.length);
  });

  test('render drag and drop icons and expanded icons only for parent rows when expanded mode is on', () => {
    const { container } = render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: { 0: true, 1: true, 2: true },
          onExpandedChange,
          getChildren: ({ children }) => children,
        }}
        items={items}
        onRowDrop={onRowDrop}
      />,
    );

    const dragIcons = container.querySelectorAll('svg');
    // Only parent rows;
    const totalDragIcons = items.length;
    // Only parents with chidren rows);
    const totalExpandedIcons = items.length - 2;

    // Total of drag icons (only parents) + expanded icons (only parents with chidren rows);
    expect(dragIcons).toHaveLength(totalDragIcons + totalExpandedIcons);
  });

  test('onRowDrop called with expected args when a row is dropped', async () => {
    const spaceKey = { keyCode: 32 };
    const downKey = { keyCode: 40 };

    render(<TableNext columns={columns} items={items} onRowDrop={onRowDrop} />);

    const dragEls = await screen.findAllByRole<HTMLButtonElement>('button');
    const dragEl = dragEls[0];

    dragEl.focus();

    expect(dragEl).toHaveFocus();

    fireEvent.keyDown(dragEl, spaceKey);
    fireEvent.keyDown(dragEl, downKey);
    fireEvent.keyDown(dragEl, spaceKey);

    expect(onRowDrop).toHaveBeenCalledWith(0, 1);
  });
});

describe('expandable', () => {
  let columns: Array<TableColumn<Item>>;
  let items: Item[];
  let onExpandedChange: jest.Mock;

  beforeEach(() => {
    onExpandedChange = jest.fn();
    items = [
      {
        sku: 'SM13',
        name: '[Sample] Smith Journal 13',
        stock: 25,
        children: mockChildrenRowsSmithJournal13,
      },
      {
        sku: 'DPB',
        name: '[Sample] Dustpan & Brush',
        stock: 34,
        children: mockChildrenRowsDustpanAndBrush,
      },
      {
        sku: 'OFSUC',
        name: '[Sample] Utility Caddy',
        stock: 45,
        children: mockChildrenRowsUtilityCaddy,
      },
    ];
    columns = [
      { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku, isSortable: true },
      { header: 'Name', hash: 'name', render: ({ name }: any) => name },
      { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
    ];
  });

  test('render expanded icons only for parent rows', async () => {
    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: { 0: true, 1: true, 2: true },
          onExpandedChange,
          getChildren: ({ children }) => children,
        }}
        items={items}
      />,
    );

    const expandIcons = await screen.findAllByRole('button');

    expect(expandIcons).toHaveLength(items.length);
  });

  test('expands a parent row when clicking on the expand icon', async () => {
    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: {},
          onExpandedChange,
          getChildren: ({ children }) => children,
        }}
        items={items}
      />,
    );

    const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/i });
    const expandIcon = await within(parentRow).findByRole('button');

    await userEvent.click(expandIcon);

    expect(onExpandedChange).toHaveBeenCalledWith({ 0: true }, '0');
    expect(onExpandedChange).not.toHaveBeenCalledWith({ 1: true });
    expect(onExpandedChange).not.toHaveBeenCalledWith({ 2: true });
  });

  test('unexpands an expanded parent row when clicking on the expand icon', async () => {
    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: { 0: true, 1: true, 2: true },
          onExpandedChange,
          getChildren: ({ children }) => children,
        }}
        items={items}
      />,
    );

    const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/i });
    const expandIcon = await within(parentRow).findByRole('button');

    await userEvent.click(expandIcon);

    expect(onExpandedChange).toHaveBeenCalledWith({ 1: true, 2: true }, '0');
    expect(onExpandedChange).not.toHaveBeenCalledWith({ 0: true, 1: true, 2: true });
  });

  test('expands a parent row when clicking on the expand icon by sky when using getRowById prop', async () => {
    const smithJornal13Sku = items[0].sku;
    const dustpandAndBrushSku = items[1].sku;
    const utilityCaddySku = items[2].sku;

    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: {},
          onExpandedChange,
          getChildren: ({ children }) => children,
        }}
        getRowId={(item) => item.sku}
        items={items}
      />,
    );

    const parentRow = await screen.findByRole('row', { name: /Smith Journal 13/i });
    const expandIcon = await within(parentRow).findByRole('button');

    await userEvent.click(expandIcon);

    expect(onExpandedChange).toHaveBeenCalledWith({ [smithJornal13Sku]: true }, smithJornal13Sku);
    expect(onExpandedChange).not.toHaveBeenCalledWith({ [dustpandAndBrushSku]: true });
    expect(onExpandedChange).not.toHaveBeenCalledWith({ [utilityCaddySku]: true });
  });

  test('renders a "View more" button on an expandable row', async () => {
    const onClick = jest.fn();

    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: { 0: true, 1: true, 2: true },
          getChildren: ({ children }) => children,
          onExpandedChange,
          getLoadMoreAction: () => {
            return {
              text: 'View more',
              isLoading: false,
              onClick,
            };
          },
        }}
        items={items}
      />,
    );

    const cellsWithHelperRow = await screen.findAllByRole('cell', { name: /View more/ });

    expect(cellsWithHelperRow).toHaveLength(3);
  });

  test('does not render a View more button when action value is undefined', async () => {
    render(
      <TableNext
        columns={columns}
        expandable={{
          expandedRows: { 0: true },
          getChildren: ({ children }) => children,
          onExpandedChange,
          getLoadMoreAction: () => {
            return undefined;
          },
        }}
        items={items}
      />,
    );

    const cellWithHelperRow = screen.queryByRole('cell', { name: 'View more' });

    expect(cellWithHelperRow).not.toBeInTheDocument();
  });
});

test('renders localized ascending label', async () => {
  const onSort = jest.fn();
  const items = [
    { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
    { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
    { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
    { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
    { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  ];
  const columns = [
    { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku, isSortable: true },
    { header: 'Name', hash: 'name', render: ({ name }: any) => name },
    { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
  ];

  render(
    <TableNext
      columns={columns}
      items={items}
      localization={{ ascendingOrder: 'Orden ascendiente', descendingOrder: 'Orden descendiente' }}
      sortable={{
        columnHash: 'sku',
        direction: 'ASC',
        onSort,
      }}
    />,
  );

  const ascSortIcon = screen.getByTitle('Orden ascendiente');

  expect(ascSortIcon).toBeInTheDocument();
});

test('renders localized descending label', async () => {
  const onSort = jest.fn();
  const items = [
    { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
    { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
    { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
    { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
    { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  ];
  const columns = [
    { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku, isSortable: true },
    { header: 'Name', hash: 'name', render: ({ name }: any) => name },
    { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
  ];

  render(
    <TableNext
      columns={columns}
      items={items}
      localization={{ ascendingOrder: 'Orden ascendiente', descendingOrder: 'Orden descendiente' }}
      sortable={{
        columnHash: 'sku',
        direction: 'DESC',
        onSort,
      }}
    />,
  );

  const descSortIcon = screen.queryByTitle('Orden descendiente');

  expect(descSortIcon).toBeInTheDocument();
});
