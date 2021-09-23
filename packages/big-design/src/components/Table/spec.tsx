import React, { CSSProperties } from 'react';
import 'jest-styled-components';

import { fireEvent, render, screen, waitForElement } from '@test/utils';

import { Table, TableFigure } from './Table';

interface SimpleTableOptions {
  className?: string;
  columns?: any[];
  items?: any[];
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
}: SimpleTableOptions = {}) => (
  <Table
    className={className}
    data-testid={dataTestId}
    id={id}
    headerless={headerless}
    itemName={itemName}
    emptyComponent={emptyComponent}
    style={style}
    columns={
      columns || [
        { header: 'Sku', render: ({ sku }) => sku },
        { header: 'Name', render: ({ name }) => name },
        { header: 'Stock', render: ({ stock }) => stock },
      ]
    }
    items={
      items || [
        { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
        { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
        { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
        { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
        { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
      ]
    }
  />
);

test('renders a simple table', () => {
  const { container } = render(getSimpleTable());

  expect(container.firstChild).toMatchSnapshot();
});

test('renders a table figure', () => {
  const { container } = render(<TableFigure />);

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

test('renders column with tooltip icon', () => {
  const { getByTitle } = render(
    getSimpleTable({
      columns: [
        { header: 'Sku', render: ({ sku }: any) => sku },
        { header: 'Name', tooltip: 'Some text', render: ({ name }: any) => name },
      ],
    }),
  );

  expect(getByTitle('Hover or focus for additional context.')).toBeTruthy();
});

test('renders tooltip when hovering on icon', async () => {
  const { getByTitle } = render(
    getSimpleTable({
      columns: [
        { header: 'Sku', render: ({ sku }: any) => sku },
        { header: 'Name', tooltip: 'Some text', render: ({ name }: any) => name },
      ],
    }),
  );

  fireEvent.mouseOver(getByTitle('Hover or focus for additional context.'));

  const result = await waitForElement(() => screen.getByText('Some text'));

  expect(result).toBeInTheDocument();
});

test('tweaks column styles with props', () => {
  const { container } = render(
    getSimpleTable({
      columns: [
        {
          header: 'Sku',
          render: ({ sku }: any) => sku,
          align: 'right',
          verticalAlign: 'middle',
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
    padding: 0;
  `);
});

test('renders the total number of items + item name', () => {
  const { getByText } = render(getSimpleTable({ itemName: 'Test Items' }));

  const itemNameNode = getByText(`5 Test Items`);

  expect(itemNameNode).toBeInTheDocument();
});

test('renders a pagination component', async () => {
  const onItemsPerPageChange = jest.fn();
  const onPageChange = jest.fn();

  const { container, getByTitle } = render(
    <Table
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
  await waitForElement(() => screen.getByTitle('Next page'));
});

describe('selectable', () => {
  let columns: any;
  let items: any;
  let onSelectionChange: jest.Mock;
  const itemName = 'Product';

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
      { header: 'Sku', hash: 'sku', render: ({ sku }: any) => sku },
      { header: 'Name', hash: 'name', render: ({ name }: any) => name },
      { header: 'Stock', hash: 'stock', render: ({ stock }: any) => stock },
    ];
  });

  test('renders selectable actions and checkboxes', () => {
    const { container, getAllByRole } = render(
      <Table
        columns={columns}
        itemName={itemName}
        items={items}
        selectable={{
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
        itemName={itemName}
        items={items}
        selectable={{
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

  test('click on select all should call selectedItems with all items respecting multi-page', () => {
    const previouslySelectedItem = {
      sku: 'Test',
      name: 'Test Previously Select Item (multi-page)',
      stock: 25,
    };

    const { getAllByRole } = render(
      <Table
        columns={columns}
        itemName={itemName}
        items={items}
        selectable={{
          onSelectionChange,
          selectedItems: [previouslySelectedItem],
        }}
      />,
    );

    const [selectAllCheckbox] = getAllByRole('checkbox') as HTMLInputElement[];

    // Select All
    expect(selectAllCheckbox.checked).toBe(false);
    fireEvent.click(selectAllCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith([previouslySelectedItem, ...items]);
  });

  test('select all when already all selected should deselect all items', () => {
    const { getAllByRole } = render(
      <Table
        columns={columns}
        itemName={itemName}
        items={items}
        selectable={{
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

  test('select all when already all selected should deselect all items and respect multi-page', () => {
    const previouslySelectedItem = {
      sku: 'Test',
      name: 'Test Previously Select Item (multi-page)',
      stock: 25,
    };

    const { getAllByRole } = render(
      <Table
        columns={columns}
        itemName={itemName}
        items={items}
        selectable={{
          onSelectionChange,
          selectedItems: [previouslySelectedItem, ...items],
        }}
      />,
    );

    const [selectAllCheckbox] = getAllByRole('checkbox') as HTMLInputElement[];

    // Deselect all
    expect(selectAllCheckbox.checked).toBe(true);
    fireEvent.click(selectAllCheckbox);
    expect(onSelectionChange).toHaveBeenCalledWith([previouslySelectedItem]);
  });
});

describe('sortable', () => {
  let columns: any;
  let items: any;
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
      <Table
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
      <Table
        columns={columns}
        items={items}
        sortable={{
          columnHash: 'sku',
          direction: 'ASC',
          onSort,
        }}
      />,
    );

    const skuHeader = container.querySelector('th') as HTMLTableCellElement;

    fireEvent.click(skuHeader);

    expect(onSort).toBeCalledWith('sku', 'DESC', columns[0]);
  });

  test('does not call onSort when pressing a non-sortable header', () => {
    const { container } = render(
      <Table
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

    expect(onSort).not.toBeCalled();
  });

  test('calls onSort when pressing the direction icon', () => {
    const { getByTestId } = render(
      <Table
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

    expect(onSort).toBeCalledWith('sku', 'DESC', columns[0]);
  });

  test('renders custom actions', () => {
    const { getByTestId } = render(
      <Table columns={columns} items={items} actions={<div data-testid="customAction">Test Action</div>} />,
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
  let columns: any;
  let items: any;
  let onRowDrop: jest.Mock;

  beforeEach(() => {
    onRowDrop = jest.fn();
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

  test('renders drag and drop icon', () => {
    const { container } = render(<Table columns={columns} items={items} onRowDrop={onRowDrop} />);
    const dragIcons = container.querySelectorAll('svg');

    expect(dragIcons?.length).toBe(items.length);
  });

  test('onRowDrop called with expected args when a row is dropped', () => {
    const spaceKey = { keyCode: 32 };
    const downKey = { keyCode: 40 };
    const { container } = render(<Table columns={columns} items={items} onRowDrop={onRowDrop} />);
    const dragEl = container.querySelector('[data-rbd-draggable-id]') as HTMLElement;
    dragEl.focus();
    expect(dragEl).toHaveFocus();

    fireEvent.keyDown(dragEl, spaceKey);
    fireEvent.keyDown(dragEl, downKey);
    fireEvent.keyDown(dragEl, spaceKey);

    expect(onRowDrop).toHaveBeenCalledWith(0, 1);
  });
});
