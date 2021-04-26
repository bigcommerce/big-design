import { act, fireEvent, render, screen, waitForElement } from '@testing-library/react';
import React from 'react';

import { useStore } from './hooks';
import { WorksheetColumn } from './types';
import { Worksheet } from './Worksheet';

interface Product {
  productName: string;
  categories: string;
  otherField: string;
  otherField2: string;
  otherField3: number;
}

const columns: WorksheetColumn<Product>[] = [
  { hash: 'productName', header: 'Product name' },
  { hash: 'categories', header: 'Categories' },
  {
    hash: 'otherField',
    header: 'Other field',
    options: [
      { value: 'Plastic', content: 'Plastic' },
      { value: 'Leather', content: 'Leather' },
      { value: 'Cloth', content: 'Cloth' },
    ],
    type: 'select',
    validation: (value) => !!value,
  },
  { hash: 'otherField2', header: 'Other field' },
  { hash: 'otherField3', header: 'Other field', type: 'number', validation: (value: number) => value >= 4 },
];

const items = [
  {
    productName: 'Shoes Name Three',
    categories: 'Shoes',
    otherField: 'Plastic',
    otherField2: 'Field',
    otherField3: 1,
  },
  {
    productName: 'Shoes Name Two',
    categories: 'Shoes',
    otherField: 'Plastic',
    otherField2: 'Field',
    otherField3: 2,
  },
  {
    productName: 'Shoes Name One',
    categories: 'Shoes',
    otherField: 'Plastic',
    otherField2: 'Field',
    otherField3: 3,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Leather',
    otherField2: 'Field',
    otherField3: 4,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Leather',
    otherField2: 'Field',
    otherField3: 5,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Leather',
    otherField2: 'Field',
    otherField3: 6,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Plastic',
    otherField2: 'Field',
    otherField3: 7,
  },
  {
    productName: 'Dress Name One',
    categories: 'Dresses',
    otherField: '',
    otherField2: 'Field',
    otherField3: 8,
  },
  {
    productName: 'Fans Name One',
    categories: 'Dresses',
    otherField: 'Cloth',
    otherField2: 'Field',
    otherField3: 9,
  },
];

let handleChange = jest.fn();
let handleErrors = jest.fn();

const initialStoreState = useStore.getState();

beforeEach(() => {
  act(() => {
    handleChange = jest.fn();
    handleErrors = jest.fn();
    useStore.setState(initialStoreState, true);
  });
});

test('renders worksheet', async () => {
  const { container } = render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

  expect(container.firstChild).toMatchSnapshot();

  await waitForElement(() => screen.getAllByRole('combobox'));
});

describe('selection', () => {
  test('selects cell on click', async () => {
    const { getByText } = render(<Worksheet columns={columns} items={items} onChange={handleChange} />);
    const cell = getByText('Shoes Name One').parentElement as HTMLTableDataCellElement;
    const row = cell.parentElement as HTMLTableRowElement;

    fireEvent.click(cell);

    expect(cell).toHaveStyle('border-color: #3C64F4');
    expect(row.firstChild).toHaveStyle('background-color: #3C64F4');

    await waitForElement(() => screen.getAllByRole('combobox'));
  });
});

describe('edition', () => {
  test('onChange is not called when value does not change', async () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cell;

    cell = getByText('Shoes Name One');

    fireEvent.doubleClick(getByText('Shoes Name One'));

    const input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Shoes Name One' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One');
    expect(cell).toBeDefined();
    expect(handleChange).not.toHaveBeenCalled();

    await waitForElement(() => screen.getAllByRole('combobox'));
  });

  test('onChange is called when value changes', async () => {
    const { getAllByDisplayValue, getAllByRole, getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cell;
    let input;

    cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One Edit');
    expect(cell).toBeDefined();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([
      { columnIndex: 0, hash: 'productName', rowIndex: 2, type: 'text', value: 'Shoes Name One Edit' },
    ]);

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('Shoes Name One Edit') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit 2' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One Edit 2');
    expect(cell).toBeDefined();
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith([
      { columnIndex: 0, hash: 'productName', rowIndex: 2, type: 'text', value: 'Shoes Name One Edit 2' },
    ]);

    const cells = getAllByDisplayValue('Plastic');

    act(() => {
      fireEvent.click(cells[0]);
    });

    const options = getAllByRole('option');

    act(() => {
      fireEvent.click(options[2]);
    });

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith([
      { columnIndex: 0, hash: 'productName', rowIndex: 2, type: 'text', value: 'Shoes Name One Edit 2' },
      { columnIndex: 2, hash: 'otherField', rowIndex: 0, type: 'select', value: 'Cloth' },
    ]);

    await waitForElement(() => screen.getAllByRole('combobox'));
  });

  test('edition does not mutate items array', () => {
    // At this point, if our previous tests mutated the items array, this value would be different
    expect(items[2]).toStrictEqual({
      productName: 'Shoes Name One',
      categories: 'Shoes',
      otherField: 'Plastic',
      otherField2: 'Field',
      otherField3: 3,
    });
  });
});

describe('validation', () => {
  test('invalid cells have the red border', async () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );
    const cell = getByText('1').parentElement as HTMLTableDataCellElement;
    const row = cell.parentElement as HTMLTableRowElement;

    expect(cell).toHaveStyle('border-color: #DB3643');
    expect(row.firstChild).toHaveStyle('background-color: #DB3643');

    await waitForElement(() => screen.getAllByRole('combobox'));
  });

  test('onErrors gets called with invalid cells', async () => {
    let cell;
    let input;

    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );

    await waitForElement(() => screen.getAllByRole('combobox'));

    expect(handleErrors).toBeCalledTimes(1);
    expect(handleErrors).toBeCalledWith([
      { columnIndex: 4, hash: 'otherField3', rowIndex: 0, type: 'number', value: 1 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 1, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 2, type: 'number', value: 3 },
      { columnIndex: 2, hash: 'otherField', rowIndex: 7, type: 'select', value: '' },
    ]);

    cell = getByText('1') as HTMLElement;

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('1') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 2 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleErrors).toBeCalledTimes(2);
    expect(handleErrors).toBeCalledWith([
      { columnIndex: 4, hash: 'otherField3', rowIndex: 0, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 1, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 2, type: 'number', value: 3 },
      { columnIndex: 2, hash: 'otherField', rowIndex: 7, type: 'select', value: '' },
    ]);

    cell = getByText('3');

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('3') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 5 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleErrors).toBeCalledTimes(3);
    expect(handleErrors).toBeCalledWith([
      { columnIndex: 4, hash: 'otherField3', rowIndex: 0, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 1, type: 'number', value: 2 },
      { columnIndex: 2, hash: 'otherField', rowIndex: 7, type: 'select', value: '' },
    ]);
  });
});

describe('TextEditor', () => {
  test('renders TextEditor', async () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    expect(input).toBeDefined();

    await waitForElement(() => screen.getAllByRole('combobox'));
  });

  test('TextEditor shows the appropriate state', async () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let input;
    let cell;

    cell = getByText('Shoes Name One');

    expect(cell.parentNode).toHaveStyle('background-color: rgb(255, 255, 255);');

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    expect(input).toHaveStyle('background-color: white;');

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One Edit');

    expect(cell.parentNode).toHaveStyle('background-color: #FFF9E6;');

    fireEvent.doubleClick(cell);

    input = getByDisplayValue('Shoes Name One Edit') as HTMLInputElement;

    expect(input).toHaveStyle('background-color: #FFF9E6;');

    await waitForElement(() => screen.getAllByRole('combobox'));
  });
});

describe('SelectEditor', () => {
  test('renders SelectEditor', async () => {
    const { getAllByRole } = render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const cells = getAllByRole('combobox');

    expect(cells.length).toBe(9);

    await waitForElement(() => screen.getAllByRole('combobox'));
  });

  test('SelectEditor shows the appropriate state', async () => {
    const { getAllByRole, getAllByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cells = getAllByDisplayValue('Plastic');

    expect(cells[0]).toHaveStyle('background-color: white');

    act(() => {
      fireEvent.click(cells[0]);
    });

    const options = getAllByRole('option');

    act(() => {
      fireEvent.click(options[2]);
    });

    expect(cells[0]).toHaveStyle('background-color: #FFF9E6;');

    await waitForElement(() => screen.getAllByRole('combobox'));
  });
});
