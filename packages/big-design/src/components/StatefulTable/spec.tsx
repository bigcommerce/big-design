import React from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { StatefulTable, StatefulTablePillTabFilter, StatefulTableProps } from './StatefulTable';

interface TestItem {
  name: string;
  stock: number;
}

/**
 * Generate items (104 so we can do A-Z * 4) that looks like:
 * [
 *    { name: 'Product A - 1', stock: 1 },
 *    { name: 'Product B - 2', stock: 2 },
 *    ...
 *    { name: 'Product A - 2', stock: 27 },
 *    { name: 'Product B - 2', stock: 28 },
 * ]
 */
const generateItems = (): TestItem[] =>
  [...Array(104)].map((_, index) => ({
    name: `Product ${String.fromCharCode(65 + (index % 26))} - ${Math.ceil((index + 1) / 26)}`,
    stock: index + 1,
  }));

const getSimpleTable = (props: Partial<StatefulTableProps<TestItem>> = {}) => (
  <StatefulTable
    columns={[
      { header: 'Name', hash: 'name', render: ({ name }) => <span data-testid="name">{name}</span>, sortKey: 'name' },
      {
        header: 'Stock',
        hash: 'stock',
        render: ({ stock }) => <span data-testid="stock">{stock}</span>,
        sortKey: 'stock',
      },
    ]}
    data-testid="simple-table"
    items={generateItems()}
    {...props}
  />
);

test('renders a non-paginated table by default', async () => {
  const { findAllByRole } = render(getSimpleTable());

  const rows = await findAllByRole('row');

  expect(rows.length).toBe(105);
});

test('pagination can be enabled', async () => {
  const { findAllByRole } = render(getSimpleTable({ pagination: true }));

  const rows = await findAllByRole('row');

  expect(rows.length).toBe(26);
});

test('dragAndDrop can be enabled', async () => {
  const spaceKey = { keyCode: 32 };
  const downKey = { keyCode: 40 };
  const name = 'Product A - 1';
  const onRowDrop = jest.fn();
  const { container, getAllByTestId } = render(getSimpleTable({ onRowDrop }));

  let dragEls = container.querySelectorAll('[data-rbd-draggable-id]') as NodeListOf<HTMLElement>;

  let names = getAllByTestId('name');
  // Item at index 0 has product name Product A - 1
  expect(names[0].textContent).toBe(name);

  dragEls[0].focus();
  expect(dragEls[0]).toHaveFocus();

  fireEvent.keyDown(dragEls[0], spaceKey);
  fireEvent.keyDown(dragEls[0], downKey);
  fireEvent.keyDown(dragEls[0], spaceKey);

  dragEls = container.querySelectorAll('[data-rbd-draggable-id]') as NodeListOf<HTMLElement>;

  names = getAllByTestId('name');

  // After drag and drop item at index 1 has product name Product A - 1
  expect(names[1].textContent).toBe(name);
  expect(onRowDrop).toHaveBeenCalled();
});

test('changing pagination page changes the displayed items', async () => {
  const { getByTitle, getAllByTestId, findByTestId } = render(getSimpleTable({ pagination: true }));

  await findByTestId('simple-table');

  const pageOneItemName = getAllByTestId('name')[0].textContent;
  fireEvent.click(getByTitle('Next page'));
  const pageTwoItemName = getAllByTestId('name')[0].textContent;

  expect(pageOneItemName).not.toBe(pageTwoItemName);
});

test('renders rows without checkboxes by default', () => {
  const { queryAllByRole } = render(getSimpleTable());

  expect(queryAllByRole('checkbox').length).toBe(0);
});

test('renders rows without checkboxes when opting in to selectable', () => {
  const { queryAllByRole } = render(getSimpleTable({ selectable: true, pagination: false }));

  // 104 tbody rows + Select all checkbox
  expect(queryAllByRole('checkbox').length).toBe(105);
});

test('items are unselected by default', () => {
  const { container } = render(getSimpleTable({ selectable: true }));
  const checkbox = container.querySelector('tbody > tr input') as HTMLInputElement;

  expect(checkbox.checked).toBe(false);
});

test('items can be selected by default', () => {
  const testItem = { name: 'Test Item', stock: 1 };
  const items: TestItem[] = [testItem];
  const { container } = render(getSimpleTable({ selectable: true, items, defaultSelected: [testItem] }));
  const checkbox = container.querySelector('tbody > tr input') as HTMLInputElement;

  expect(checkbox.checked).toBe(true);
});

test('onSelectionChange gets called when an item selection happens', () => {
  const testItemOne = { name: 'Test Item', stock: 1 };
  const testItemTwo = { name: 'Test Item Two', stock: 2 };
  const testItemThree = { name: 'Test Item Three', stock: 3 };
  const items: TestItem[] = [testItemOne, testItemTwo, testItemThree];
  const onSelectionChange = jest.fn();

  const { container } = render(
    getSimpleTable({ selectable: true, items, defaultSelected: [testItemThree], onSelectionChange }),
  );

  const checkbox = container.querySelector('tbody > tr input') as HTMLInputElement;

  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([testItemOne, testItemThree]);
});

test('multi-page select', async () => {
  const onSelectionChange = jest.fn();

  const { getByTitle, findByTestId } = render(
    getSimpleTable({ selectable: true, onSelectionChange, pagination: true }),
  );

  const table = await findByTestId('simple-table');
  let checkbox = table.querySelector('tbody > tr input') as HTMLInputElement;

  fireEvent.click(checkbox);
  fireEvent.click(getByTitle('Next page'));

  checkbox = table.querySelector('tbody > tr input') as HTMLInputElement;
  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([
    { name: 'Product A - 1', stock: 1 },
    { name: 'Product Z - 1', stock: 26 },
  ]);
});

test('select all selects all items in the current page', async () => {
  const testItemOne = { name: 'Test Item', stock: 1 };
  const testItemTwo = { name: 'Test Item Two', stock: 2 };
  const testItemThree = { name: 'Test Item Three', stock: 3 };
  const items: TestItem[] = [testItemOne, testItemTwo, testItemThree];
  const onSelectionChange = jest.fn();

  const { getAllByRole, findByTestId } = render(
    getSimpleTable({ selectable: true, items, onSelectionChange, pagination: true }),
  );

  await findByTestId('simple-table');

  const checkbox = getAllByRole('checkbox')[0];

  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([testItemOne, testItemTwo, testItemThree]);
});

test('unselect all should unselect all items in page', async () => {
  const testItemOne = { name: 'Test Item', stock: 1 };
  const testItemTwo = { name: 'Test Item Two', stock: 2 };
  const testItemThree = { name: 'Test Item Three', stock: 3 };
  const items: TestItem[] = [testItemOne, testItemTwo, testItemThree];
  const onSelectionChange = jest.fn();

  const { getAllByRole, findByTestId } = render(
    getSimpleTable({
      selectable: true,
      items,
      onSelectionChange,
      defaultSelected: [testItemOne, testItemTwo, testItemThree],
      pagination: true,
    }),
  );

  await findByTestId('simple-table');

  const checkbox = getAllByRole('checkbox')[0];

  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([]);
});

test('sorts alphabetically', () => {
  const { getAllByTestId, getByText } = render(getSimpleTable({ pagination: false }));

  let items = getAllByTestId('name');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(getByText('Name'));
  items = getAllByTestId('name');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('Product Z - 4');
  expect(lastItemContent).toBe('Product A - 1');

  // Ascending order
  fireEvent.click(getByText('Name'));
  items = getAllByTestId('name');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('Product A - 1');
  expect(lastItemContent).toBe('Product Z - 4');
});

test('sorts numerically', () => {
  const { getAllByTestId, getByText } = render(getSimpleTable({ pagination: false }));

  let items = getAllByTestId('stock');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(getByText('Stock'));
  items = getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('104');
  expect(lastItemContent).toBe('1');

  // Ascending order
  fireEvent.click(getByText('Stock'));
  items = getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('1');
  expect(lastItemContent).toBe('104');
});

test('sorts using a custom sorting function', () => {
  const { getAllByTestId, getByText } = render(
    getSimpleTable({
      columns: [
        { header: 'Name', hash: 'name', render: ({ name }) => <span data-testid="name">{name}</span>, sortKey: 'name' },
        {
          header: 'Stock',
          hash: 'stock',
          render: ({ stock }) => <span data-testid="stock">{stock}</span>,
          sortFn: (a, b, dir) => (dir === 'ASC' ? a.stock - b.stock : b.stock - a.stock),
        },
      ],
      pagination: false,
    }),
  );

  let items = getAllByTestId('stock');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(getByText('Stock'));

  items = getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('104');
  expect(lastItemContent).toBe('1');

  // Ascending order
  fireEvent.click(getByText('Stock'));
  items = getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('1');
  expect(lastItemContent).toBe('104');
});

test('renders custom actions', () => {
  const { getByTestId } = render(getSimpleTable({ actions: <div data-testid="customAction">Test Action</div> }));

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

test('renders pill tabs with the pillTabFilters prop', () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'In stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock > 0),
  };
  const { getByText } = render(getSimpleTable({ filters }));
  const customFilter = getByText('In stock');

  expect(customFilter).toBeInTheDocument();
  expect(customFilter).toBeVisible();
});

test('it executes the filter function on click', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'In stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock === 1),
  };
  const { findAllByRole, findByText } = render(getSimpleTable({ filters }));

  const customFilter = await findByText('In stock');

  fireEvent.click(customFilter);

  const rows = await findAllByRole('row');

  expect(rows.length).toBe(2);
});

test('can paginate on filtered rows', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'Low stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock < 40),
  };
  const { findByText } = render(getSimpleTable({ filters, pagination: true }));
  const customFilter = await findByText('Low stock');

  fireEvent.click(customFilter);

  const itemText = await findByText('1 - 25 of 39');

  expect(itemText).toBeInTheDocument();
});

test('can undo filter actions', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'Stock 1', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock === 1),
  };
  const { findAllByRole, findByText } = render(getSimpleTable({ filters }));
  const customFilter = await findByText('Stock 1');

  fireEvent.click(customFilter);

  const filteredRows = await findAllByRole('row');

  expect(filteredRows.length).toBe(2);

  fireEvent.click(customFilter);

  const rows = await findAllByRole('row');

  expect(rows.length).toBe(105);
});

test('can stack filter actions (OR logic)', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [
      { title: 'Stock 1', id: 'stock_1' },
      { title: 'Stock 2', id: 'stock_2' },
    ],
    filter: (itemId, items) =>
      itemId === 'stock_1' ? items.filter((item) => item.stock === 1) : items.filter((item) => item.stock === 2),
  };
  const { findAllByRole, findByText } = render(getSimpleTable({ filters }));
  const customFilter1 = await findByText('Stock 1');
  const customFilter2 = await findByText('Stock 2');

  fireEvent.click(customFilter1);
  fireEvent.click(customFilter2);

  const rows = await findAllByRole('row');

  expect(rows.length).toBe(3);
});

test('can undo stacked filter actions', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [
      { title: 'Stock 1', id: 'stock_1' },
      { title: 'Stock 2', id: 'stock_2' },
    ],
    filter: (itemId, items) =>
      itemId === 'stock_1' ? items.filter((item) => item.stock === 1) : items.filter((item) => item.stock === 2),
  };
  const { findAllByRole, findByText } = render(getSimpleTable({ filters }));
  const customFilter1 = await findByText('Stock 1');
  const customFilter2 = await findByText('Stock 2');

  fireEvent.click(customFilter1);
  fireEvent.click(customFilter2);

  let rows = await findAllByRole('row');

  expect(rows.length).toBe(3);

  fireEvent.click(customFilter1);

  rows = await findAllByRole('row');

  expect(rows.length).toBe(2);

  fireEvent.click(customFilter2);

  rows = await findAllByRole('row');

  expect(rows.length).toBe(105);
});

describe('test search in the StatefulTable', () => {
  test('renders StatefulTable with the search prop', () => {
    const { getByText } = render(getSimpleTable({ search: true }));
    const customSearch = getByText('Search');

    expect(customSearch).toBeInTheDocument();
    expect(customSearch).toBeVisible();
  });

  test('it executes the filter function on click Search', async () => {
    const { findAllByRole, getByPlaceholderText, getByText } = render(getSimpleTable({ search: true }));
    const input = getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A - 1' } });
    fireEvent.click(getByText('Search'));

    const rows = await findAllByRole('row');

    expect(rows.length).toBe(2);
  });

  test('it executes the filter search and filter pills function on click Search', async () => {
    const filters: StatefulTablePillTabFilter<TestItem> = {
      pillTabs: [{ title: 'Stock 1', id: 'in_stock' }],
      filter: (_itemId, items) => items.filter((item) => item.stock === 1),
    };
    const { findAllByRole, getByPlaceholderText, getByText } = render(getSimpleTable({ search: true, filters }));
    const input = getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A' } });
    fireEvent.click(getByText('Search'));
    fireEvent.click(getByText('Stock 1'));

    const rows = await findAllByRole('row');

    expect(rows.length).toBe(2);
  });

  test('can paginate on filtered rows', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(getSimpleTable({ search: true, pagination: true }));
    const input = getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(getByText('Search'));

    const pagination = await findByText('1 - 25 of 38');

    expect(pagination).toBeInTheDocument();
  });

  test('can undo filter actions', async () => {
    const { findAllByRole, getByPlaceholderText, getByText } = render(getSimpleTable({ search: true }));
    const input = getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A - 1' } });
    fireEvent.click(getByText('Search'));

    let rows = await findAllByRole('row');

    expect(rows.length).toBe(2);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(getByText('Search'));

    rows = await findAllByRole('row');

    expect(rows.length).toBe(105);
  });
});
