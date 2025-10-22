import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

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
      {
        header: 'Name',
        hash: 'name',
        render: ({ name }) => <span data-testid="name">{name}</span>,
        sortKey: 'name',
      },
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
  render(getSimpleTable());

  const rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(105);
});

test('pagination can be enabled', async () => {
  render(getSimpleTable({ pagination: true }));

  const rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(26);
});

test('dragAndDrop can be enabled', async () => {
  const spaceKey = { keyCode: 32 };
  const downKey = { keyCode: 40 };
  const name = 'Product A - 1';
  const onRowDrop = jest.fn();

  render(getSimpleTable({ onRowDrop }));

  // eslint-disable-next-line testing-library/no-node-access
  let dragEls = document.querySelectorAll<HTMLButtonElement>('[data-rbd-draggable-id]');

  let names = screen.getAllByTestId('name');

  // Item at index 0 has product name Product A - 1
  expect(names[0]).toHaveTextContent(name);

  dragEls[0].focus();

  expect(dragEls[0]).toHaveFocus();

  fireEvent.keyDown(dragEls[0], spaceKey);
  fireEvent.keyDown(dragEls[0], downKey);
  fireEvent.keyDown(dragEls[0], spaceKey);

  // eslint-disable-next-line testing-library/no-node-access
  dragEls = document.querySelectorAll('[data-rbd-draggable-id]');

  names = screen.getAllByTestId('name');

  // After drag and drop item at index 1 has product name Product A - 1
  expect(names[1]).toHaveTextContent(name);
  expect(onRowDrop).toHaveBeenCalled();
});

test('changing pagination page changes the displayed items', async () => {
  render(getSimpleTable({ pagination: true }));

  await screen.findByTestId('simple-table');

  const pageOneItemName = screen.getAllByTestId('name')[0].textContent;

  fireEvent.click(screen.getByTitle('Next page'));

  const pageTwoItemName = screen.getAllByTestId('name')[0].textContent;

  expect(pageOneItemName).not.toBe(pageTwoItemName);
});

test('renders rows without checkboxes by default', () => {
  render(getSimpleTable());

  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
});

test('renders rows without checkboxes when opting in to selectable', () => {
  render(getSimpleTable({ selectable: true, pagination: false }));

  // 104 tbody rows + Select all checkbox
  expect(screen.queryAllByRole('checkbox')).toHaveLength(105);
});

test('items are unselected by default', async () => {
  render(getSimpleTable({ selectable: true }));

  const checkboxes = await screen.findAllByRole<HTMLInputElement>('checkbox');

  expect(checkboxes[0]).not.toBeChecked();
});

test('items can be selected by default', async () => {
  const testItem = { name: 'Test Item', stock: 1 };
  const items: TestItem[] = [testItem];

  render(getSimpleTable({ selectable: true, items, defaultSelected: [testItem] }));

  const checkboxes = await screen.findAllByRole<HTMLInputElement>('checkbox');

  expect(checkboxes[0]).toBeChecked();
});

test('onSelectionChange gets called when an item selection happens', async () => {
  const testItemOne = { name: 'Test Item', stock: 1 };
  const testItemTwo = { name: 'Test Item Two', stock: 2 };
  const testItemThree = { name: 'Test Item Three', stock: 3 };
  const items: TestItem[] = [testItemOne, testItemTwo, testItemThree];
  const onSelectionChange = jest.fn();

  render(
    getSimpleTable({
      selectable: true,
      items,
      defaultSelected: [testItemThree],
      onSelectionChange,
    }),
  );

  const checkboxes = await screen.findAllByRole<HTMLInputElement>('checkbox');

  fireEvent.click(checkboxes[1]);

  expect(onSelectionChange).toHaveBeenCalledWith([testItemThree, testItemOne]);
});

test('multi-page select', async () => {
  const onSelectionChange = jest.fn();

  render(getSimpleTable({ selectable: true, onSelectionChange, pagination: true }));

  await screen.findByTestId('simple-table');

  let checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox');
  // Skip the "select all" checkbox at index 0
  let checkbox = checkboxes[1];

  fireEvent.click(checkbox);
  fireEvent.click(screen.getByTitle('Next page'));

  checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox');
  checkbox = checkboxes[1];
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

  render(getSimpleTable({ selectable: true, items, onSelectionChange, pagination: true }));

  await screen.findByTestId('simple-table');

  const checkbox = screen.getAllByRole('checkbox')[0];

  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([testItemOne, testItemTwo, testItemThree]);
});

test('unselect all should unselect all items in page', async () => {
  const testItemOne = { name: 'Test Item', stock: 1 };
  const testItemTwo = { name: 'Test Item Two', stock: 2 };
  const testItemThree = { name: 'Test Item Three', stock: 3 };
  const items: TestItem[] = [testItemOne, testItemTwo, testItemThree];
  const onSelectionChange = jest.fn();

  render(
    getSimpleTable({
      selectable: true,
      items,
      onSelectionChange,
      defaultSelected: [testItemOne, testItemTwo, testItemThree],
      pagination: true,
    }),
  );

  await screen.findByTestId('simple-table');

  const checkbox = screen.getAllByRole('checkbox')[0];

  fireEvent.click(checkbox);

  expect(onSelectionChange).toHaveBeenCalledWith([]);
});

test('sorts alphabetically', () => {
  render(getSimpleTable({ pagination: false }));

  let items = screen.getAllByTestId('name');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(screen.getByText('Name'));
  items = screen.getAllByTestId('name');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('Product Z - 4');
  expect(lastItemContent).toBe('Product A - 1');

  // Ascending order
  fireEvent.click(screen.getByText('Name'));
  items = screen.getAllByTestId('name');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('Product A - 1');
  expect(lastItemContent).toBe('Product Z - 4');
});

test('sorts numerically', () => {
  render(getSimpleTable({ pagination: false }));

  let items = screen.getAllByTestId('stock');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(screen.getByText('Stock'));
  items = screen.getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('104');
  expect(lastItemContent).toBe('1');

  // Ascending order
  fireEvent.click(screen.getByText('Stock'));
  items = screen.getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('1');
  expect(lastItemContent).toBe('104');
});

test('sorts using a custom sorting function', () => {
  render(
    getSimpleTable({
      columns: [
        {
          header: 'Name',
          hash: 'name',
          render: ({ name }) => <span data-testid="name">{name}</span>,
          sortKey: 'name',
        },
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

  let items = screen.getAllByTestId('stock');
  let firstItemContent = items[0].textContent;
  let lastItemContent = items[items.length - 1].textContent;

  // Descending order
  fireEvent.click(screen.getByText('Stock'));

  items = screen.getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('104');
  expect(lastItemContent).toBe('1');

  // Ascending order
  fireEvent.click(screen.getByText('Stock'));
  items = screen.getAllByTestId('stock');
  firstItemContent = items[0].textContent;
  lastItemContent = items[items.length - 1].textContent;

  expect(firstItemContent).toBe('1');
  expect(lastItemContent).toBe('104');
});

test('renders custom actions', () => {
  render(getSimpleTable({ actions: <div data-testid="customAction">Test Action</div> }));

  const customAction = screen.getByTestId('customAction');

  expect(customAction).toBeInTheDocument();
  expect(customAction).toBeVisible();
});

test('renders headers by default and hides then via prop', () => {
  const { rerender } = render(getSimpleTable());

  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeVisible();

  rerender(getSimpleTable({ headerless: true }));

  expect(screen.getByRole('columnheader', { name: 'Name', hidden: true })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Name', hidden: true })).not.toBeVisible();
});

test('renders pill tabs with the pillTabFilters prop', () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'In stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock > 0),
  };

  render(getSimpleTable({ filters }));

  const customFilter = screen.getByText('In stock');

  expect(customFilter).toBeInTheDocument();
  expect(customFilter).toBeVisible();
});

test('it executes the filter function on click', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'In stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock === 1),
  };

  render(getSimpleTable({ filters }));

  const customFilter = await screen.findByText('In stock');

  fireEvent.click(customFilter);

  const rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(2);
});

test('can paginate on filtered rows', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'Low stock', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock < 40),
  };

  render(getSimpleTable({ filters, pagination: true }));

  const customFilter = await screen.findByText('Low stock');

  fireEvent.click(customFilter);

  const itemText = await screen.findByText('1 - 25 of 39');

  expect(itemText).toBeInTheDocument();
});

test('can undo filter actions', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [{ title: 'Stock 1', id: 'in_stock' }],
    filter: (_itemId, items) => items.filter((item) => item.stock === 1),
  };

  render(getSimpleTable({ filters }));

  const customFilter = await screen.findByText('Stock 1');

  fireEvent.click(customFilter);

  const filteredRows = await screen.findAllByRole('row');

  expect(filteredRows).toHaveLength(2);

  fireEvent.click(customFilter);

  const rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(105);
});

test('can stack filter actions (OR logic)', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [
      { title: 'Stock 1', id: 'stock_1' },
      { title: 'Stock 2', id: 'stock_2' },
    ],
    filter: (itemId, items) =>
      itemId === 'stock_1'
        ? items.filter((item) => item.stock === 1)
        : items.filter((item) => item.stock === 2),
  };

  render(getSimpleTable({ filters }));

  const customFilter1 = await screen.findByText('Stock 1');
  const customFilter2 = await screen.findByText('Stock 2');

  fireEvent.click(customFilter1);
  fireEvent.click(customFilter2);

  const rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(3);
});

test('can undo stacked filter actions', async () => {
  const filters: StatefulTablePillTabFilter<TestItem> = {
    pillTabs: [
      { title: 'Stock 1', id: 'stock_1' },
      { title: 'Stock 2', id: 'stock_2' },
    ],
    filter: (itemId, items) =>
      itemId === 'stock_1'
        ? items.filter((item) => item.stock === 1)
        : items.filter((item) => item.stock === 2),
  };

  render(getSimpleTable({ filters }));

  const customFilter1 = await screen.findByText('Stock 1');
  const customFilter2 = await screen.findByText('Stock 2');

  fireEvent.click(customFilter1);
  fireEvent.click(customFilter2);

  let rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(3);

  fireEvent.click(customFilter1);

  rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(2);

  fireEvent.click(customFilter2);

  rows = await screen.findAllByRole('row');

  expect(rows).toHaveLength(105);
});

describe('test search in the StatefulTable', () => {
  test('renders StatefulTable with the search prop', () => {
    render(getSimpleTable({ search: true }));

    const customSearch = screen.getByText('Search');

    expect(customSearch).toBeInTheDocument();
    expect(customSearch).toBeVisible();
  });

  test('it executes the filter function on click Search', async () => {
    render(getSimpleTable({ search: true }));

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A - 1' } });
    fireEvent.click(screen.getByText('Search'));

    const rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(2);
  });

  test('it executes the filter search and filter pills function on click Search', async () => {
    const filters: StatefulTablePillTabFilter<TestItem> = {
      pillTabs: [{ title: 'Stock 1', id: 'in_stock' }],
      filter: (_itemId, items) => items.filter((item) => item.stock === 1),
    };

    render(getSimpleTable({ search: true, filters }));

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A' } });
    fireEvent.click(screen.getByText('Search'));
    fireEvent.click(screen.getByText('Stock 1'));

    const rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(2);
  });

  test('can paginate on filtered rows', async () => {
    render(getSimpleTable({ search: true, pagination: true }));

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(screen.getByText('Search'));

    const pagination = await screen.findByText('1 - 25 of 38');

    expect(pagination).toBeInTheDocument();
  });

  test('can undo filter actions', async () => {
    render(getSimpleTable({ search: true }));

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'Product A - 1' } });
    fireEvent.click(screen.getByText('Search'));

    let rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(2);

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Search'));

    rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(105);
  });

  test('maintains filtered state when both filters and search are active & items per page is changed', async () => {
    const filters: StatefulTablePillTabFilter<TestItem> = {
      pillTabs: [{ title: 'Low stock', id: 'low_stock' }],
      filter: (_itemId, items) => items.filter((item) => item.stock !== 0 && item.stock < 10),
    };

    render(getSimpleTable({ filters, pagination: true, search: true }));

    // Click on filter pill
    await userEvent.click(screen.getByText('Low stock'));

    // Add search term
    await userEvent.type(screen.getByPlaceholderText('Search'), 'Product B');
    await userEvent.click(screen.getByText('Search'));

    let rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(2);

    const itemsPerPageButton = await screen.findByText('1 of 1');

    await userEvent.click(itemsPerPageButton);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(2);
  });

  test('maintains filtered state when only filters are active & items per page is changed', async () => {
    const filters: StatefulTablePillTabFilter<TestItem> = {
      pillTabs: [{ title: 'Low stock', id: 'low_stock' }],
      filter: (_itemId, items) => items.filter((item) => item.stock < 5),
    };

    render(getSimpleTable({ filters, pagination: true }));

    // Click on filter pill
    await userEvent.click(screen.getByText('Low stock'));

    let rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(5);

    const itemsPerPageButton = await screen.findByText('1 - 4 of 4');

    await userEvent.click(itemsPerPageButton);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(5);
  });

  test('maintains filtered state when only search is active & items per page is changed', async () => {
    render(getSimpleTable({ search: true, pagination: true }));

    await userEvent.type(screen.getByPlaceholderText('Search'), 'Product B');

    await userEvent.click(screen.getByText('Search'));

    let rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(5);

    const itemsPerPageButton = await screen.findByText('1 - 4 of 4');

    await userEvent.click(itemsPerPageButton);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(5);
  });
});

test('renders localized labels', async () => {
  render(
    getSimpleTable({
      getRangeLabel: (start: number, end: number, totalItems: number): string => {
        return `${start} - ${end} de ${totalItems}`;
      },
      pagination: true,
      localization: {
        nextPage: 'Pagina siguiente',
        previousPage: 'Pagina previa',
        search: 'Buscar',
      },
      search: true,
    }),
  );

  const input = screen.getByLabelText('Buscar');
  const dropdown = await screen.findByRole('button', { name: '1 - 25 de 104' });
  const prevPage = await screen.findByRole('button', { name: 'Pagina previa' });
  const nextPage = await screen.findByRole('button', { name: 'Pagina siguiente' });

  expect(input).toBeInTheDocument();
  expect(dropdown).toBeInTheDocument();
  expect(prevPage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
});
