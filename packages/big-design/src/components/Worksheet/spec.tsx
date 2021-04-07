import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { WorksheetColumn } from './types';
import { Worksheet } from './Worksheet';

const columns: WorksheetColumn<string | number>[] = [
  { hash: 'productName', header: 'Product name' },
  { hash: 'categories', header: 'Categories' },
  { hash: 'otherField', header: 'Other field' },
  { hash: 'otherField2', header: 'Other field' },
  { hash: 'otherField3', header: 'Other field', type: 'number', validation: (value: number) => value >= 4 },
];

const items = [
  {
    productName: 'Shoes Name Three',
    categories: 'Shoes',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 1,
  },

  {
    productName: 'Shoes Name Two',
    categories: 'Shoes',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 2,
  },
  {
    productName: 'Shoes Name One',
    categories: 'Shoes',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 3,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 4,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 5,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 6,
  },
  {
    productName: 'Variant',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 7,
  },
  {
    productName: 'Dress Name One',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 8,
  },
  {
    productName: 'Fans Name One',
    categories: 'Dresses',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 9,
  },
];

const handleChange = jest.fn();
const handleErrors = jest.fn();

beforeEach(() => {
  handleChange.mockReset;
  handleErrors.mockReset;
});

test('renders worksheet', () => {
  const { container } = render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('selects cell on click', () => {
  const { getByText } = render(<Worksheet columns={columns} items={items} onChange={handleChange} />);
  const cell = getByText('Shoes Name One').parentElement as HTMLTableDataCellElement;
  const row = cell.parentElement as HTMLTableRowElement;

  fireEvent.click(cell);

  expect(cell).toHaveStyle('border-color: #3C64F4');
  expect(row.firstChild).toHaveStyle('background-color: #3C64F4');
});

describe('TextEditor', () => {
  test('renders TextEditor', () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );
    const cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    expect(input).toBeDefined();
  });

  test('TextEditor returns edited cells', () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );
    const cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('Shoes Name One') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getByText('Shoes Name One Edit')).toBeDefined();
    expect(handleChange).toHaveBeenCalledWith([
      { columnIndex: 0, hash: 'productName', rowIndex: 2, type: 'text', value: 'Shoes Name One Edit' },
    ]);
  });
});

describe('validation', () => {
  test('invalid cells have the red border', () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );
    const cell = getByText('1').parentElement as HTMLTableDataCellElement;
    const row = cell.parentElement as HTMLTableRowElement;

    expect(cell).toHaveStyle('border-color: #DB3643');
    expect(row.firstChild).toHaveStyle('background-color: #DB3643');
  });

  test('onErrors gets called with invalid cells', () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );

    expect(handleErrors).toBeCalledTimes(1);
    expect(handleErrors).toBeCalledWith([
      { columnIndex: 4, hash: 'otherField3', rowIndex: 0, type: 'number', value: 1 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 1, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 2, type: 'number', value: 3 },
    ]);

    const cell = getByText('1');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('1') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 2 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleErrors).toBeCalledTimes(2);
    expect(handleErrors).toBeCalledWith([
      { columnIndex: 4, hash: 'otherField3', rowIndex: 0, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 1, type: 'number', value: 2 },
      { columnIndex: 4, hash: 'otherField3', rowIndex: 2, type: 'number', value: 3 },
    ]);
  });
});
