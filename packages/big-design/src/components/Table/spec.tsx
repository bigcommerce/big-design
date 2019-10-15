import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React, { CSSProperties } from 'react';

import { Table } from './Table';

interface SimpleTableOptions {
  className?: string;
  dataTestId?: string;
  id?: string;
  style?: CSSProperties;
  columns?: any[];
}

const getSimpleTable = ({ className, columns, dataTestId, id, style }: SimpleTableOptions = {}) => (
  <Table
    id={id}
    data-testid={dataTestId}
    className={className}
    style={style}
    columns={
      columns || [
        { header: 'Sku', render: ({ sku }) => sku },
        { header: 'Name', render: ({ name }) => name },
        { header: 'Stock', render: ({ stock }) => stock },
      ]
    }
    items={[
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ]}
  />
);

test('renders a simple table', () => {
  const { container } = render(getSimpleTable());

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

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('renders column with custom component', () => {
  const { getAllByTestId } = render(
    getSimpleTable({
      columns: [
        { header: 'Sku', render: ({ sku }: any) => sku },
        { header: 'Name', render: ({ name }: any) => <h3 data-testid="name">{name}</h3> },
      ],
    }),
  );

  expect(getAllByTestId('name').length).toBe(5);
});

test('tweaks column styles with props', () => {
  const { container } = render(
    getSimpleTable({
      columns: [
        {
          header: 'Sku',
          render: ({ sku }: any) => sku,
          align: 'right',
          verticalAlign: 'center',
        },
        {
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

  expect(skuHeader).toHaveStyle('text-align: right');
  expect(skuHeader).not.toHaveStyle('vertical-align: center');

  expect(nameHeader).toHaveStyle('width: 100px');
  expect(skuHeader).not.toHaveStyle('padding: 0');

  const columns = container.querySelectorAll('tbody td');
  const skuTd = columns[0];
  const nameTd = columns[1];

  expect(skuTd).toHaveStyle(`
    text-align: right;
    vertical-align: center;
  `);

  expect(nameTd).toHaveStyle(`
    width: 100px;
    padding: 0;
  `);
});

test('renders a pagination component', () => {
  const onItemsPerPageChange = jest.fn();
  const onPageChange = jest.fn();

  const { container, getByTitle } = render(
    <Table
      columns={[
        { header: 'Sku', render: ({ sku }) => sku },
        { header: 'Name', render: ({ name }) => name },
        { header: 'Stock', render: ({ stock }) => stock },
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
        totalItems: 5,
        itemsPerPageOptions: [3, 5, 10],
        onItemsPerPageChange,
        onPageChange,
      }}
    />,
  );

  fireEvent.click(getByTitle('Next page'));

  expect(onPageChange).toHaveBeenCalledWith(2);
  expect(container.firstChild).toMatchSnapshot();
});

describe('selectable', () => {
  let columns: any;
  let items: any;
  let onSelectionChange: jest.Mock;
  const itemType = 'Product';

  beforeEach(() => {
    onSelectionChange = jest.fn();
    items = [
      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
    ];
    columns = [
      { header: 'Sku', render: ({ sku }: any) => sku },
      { header: 'Name', render: ({ name }: any) => name },
      { header: 'Stock', render: ({ stock }: any) => stock },
    ];
  });

  test('renders selectable actions and checkboxes', () => {
    const { container, getAllByRole } = render(
      <Table
        columns={columns}
        items={items}
        selectable={{
          itemType,
          onSelectionChange,
          selectedItems: [],
        }}
      />,
    );

    // One per item + Actions (select all) checkbox
    expect(getAllByRole('checkbox').length).toBe(items.length + 1);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('click on select all should call selectedItems with all items', () => {
    const { getAllByRole } = render(
      <Table
        columns={columns}
        items={items}
        selectable={{
          itemType,
          onSelectionChange,
          selectedItems: [],
        }}
      />,
    );

    const [selectAllCheckbox] = getAllByRole('checkbox') as HTMLInputElement[];

    // Select All
    expect(selectAllCheckbox.checked).toBe(false);
    fireEvent.click(selectAllCheckbox);
    expect(onSelectionChange).toHaveBeenCalledWith(items);
  });

  test('select all when already all selected should deselect all items', () => {
    const { getAllByRole } = render(
      <Table
        columns={columns}
        items={items}
        selectable={{
          itemType,
          onSelectionChange,
          selectedItems: items,
        }}
      />,
    );
    const [selectAllCheckbox] = getAllByRole('checkbox') as HTMLInputElement[];

    // Deselect all
    expect(selectAllCheckbox.checked).toBe(true);
    fireEvent.click(selectAllCheckbox);
    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });
});
