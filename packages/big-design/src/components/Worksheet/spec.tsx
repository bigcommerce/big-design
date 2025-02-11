import { AllInclusiveIcon } from '@bigcommerce/big-design-icons';
import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { StatefulTree } from '../StatefulTree';

import { WorksheetColumn } from './types';
import { Worksheet } from './Worksheet';

interface Product {
  id: number | string;
  productName: string;
  visibleOnStorefront: boolean;
  otherField: string;
  otherField2: number;
  numberField: number;
  multiField: number[];
}

const TreeComponent = (
  value: string | number | boolean,
  onChange: (value: string | number | boolean) => void,
) => {
  const nodes = [
    {
      id: '0',
      value: 0,
      label: 'Category 0',
      children: [
        {
          id: '5',
          value: 5,
          label: 'Category 5',
          children: [{ id: '9', value: 9, label: 'Category 9' }],
        },
      ],
    },
    {
      id: '1',
      value: 1,
      label: 'Category 1',
      children: [{ id: '6', value: 6, label: 'Category 6' }],
    },
    { id: '2', value: 2, label: 'Category 2' },
    {
      id: '3',
      value: 3,
      label: 'Category 3',
      children: [{ id: '7', value: 7, label: 'Category 7' }],
    },
    {
      id: '4',
      value: 4,
      label: 'Category 4',
      children: [{ id: '8', value: 8, label: 'Category 8' }],
    },
  ];

  return (
    <StatefulTree
      defaultExpanded={['0', '5', '1']}
      defaultSelected={[String(value)]}
      disabledNodes={['1']}
      nodes={nodes}
      onSelectionChange={(selectedNodes) => onChange(selectedNodes[0])}
      selectable="radio"
    />
  );
};

const columns: Array<WorksheetColumn<Product>> = [
  {
    hash: 'productName',
    header: 'Product name',
    validation: (value: string) => !!value,
    notation: (value) =>
      value === 'Shoes Name One Edit' ? { color: 'danger20', description: 'Text' } : undefined,
  },
  { hash: 'visibleOnStorefront', header: 'Visible on storefront', type: 'checkbox', width: 80 },
  { hash: 'otherField', header: 'Other field', width: 'auto' },
  {
    hash: 'otherField2',
    header: 'Other field',
    type: 'modal',
    config: { header: 'Choose categories', render: TreeComponent },
  },
  {
    hash: 'numberField',
    header: 'Number field',
    tooltip: 'Info about number field',
    type: 'number',
    validation: (value: number) => value >= 50,
    formatting: (value: number) => `$${value}.00`,
    width: 90,
    enabled: true,
  },
];

const selectableColumns: Array<WorksheetColumn<Partial<Product>>> = [
  {
    hash: 'productName',
    header: 'Product name',
    validation: (value: string) => !!value,
    disabled: true,
  },
  {
    hash: 'otherField',
    header: 'Other field',
    type: 'select',
    config: {
      options: [
        { value: 'value1', content: 'Value 1' },
        { value: 'value2', content: 'Value 2' },
        { value: 'value3', content: 'Value 3' },
      ],
    },
    validation: (value: string) => !!value,
  },
];

const multiSelectColumns: Array<WorksheetColumn<Partial<Product>>> = [
  {
    hash: 'productName',
    header: 'Product name',
    validation: (value: string) => !!value,
    disabled: true,
  },
  {
    hash: 'multiField',
    header: 'Multi field',
    type: 'multiSelect',
    config: {
      options: [
        { value: 1, content: 'Multi 1' },
        { value: 2, content: 'Multi 2' },
        { value: 3, content: 'Multi 3' },
      ],
    },
    validation: (value: string) => !!value,
  },
];

const disabledColumns: Array<WorksheetColumn<Product>> = [
  {
    hash: 'productName',
    header: 'Product name',
    validation: (value: string) => !!value,
    disabled: true,
  },
  {
    hash: 'visibleOnStorefront',
    header: 'Visible on storefront',
    type: 'checkbox',
    disabled: true,
  },
  { hash: 'otherField', header: 'Other field', disabled: true },
  {
    hash: 'otherField2',
    header: 'Other field',
    type: 'modal',
    config: { header: 'Choose categories', render: TreeComponent },
    disabled: true,
  },
  {
    hash: 'numberField',
    header: 'Number field',
    type: 'number',
    validation: (value: number) => value >= 50,
    formatting: (value: number) => `$${value}.00`,
    disabled: true,
  },
];

const items: Array<Partial<Product>> = [
  {
    id: 1,
    productName: 'Shoes Name Three',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 1,
    numberField: 50,
  },
  {
    id: 2,
    productName: 'Shoes Name Two',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 2,
    numberField: 50,
  },
  {
    id: 3,
    productName: 'Shoes Name One',
    visibleOnStorefront: false,
    otherField2: 3,
    numberField: 50,
  },
  {
    id: 4,
    productName: 'Variant 1',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 4,
    numberField: 50,
  },
  {
    id: 5,
  },
  {
    id: 6,
    productName: 'Variant 2',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 6,
    numberField: 50,
  },
  {
    id: 7,
    productName: 'Variant 3',
    visibleOnStorefront: false,
    otherField: 'Text',
    otherField2: 7,
    numberField: 49,
  },
  {
    id: 8,
    productName: 'Dress Name One',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 8,
    numberField: 50,
  },
  {
    id: 9,
    productName: 'Fans Name One',
    visibleOnStorefront: true,
    otherField: 'Text',
    otherField2: 9,
    numberField: 50,
  },
];

const selectableItems: Array<Partial<Product>> = [
  {
    id: 1,
    productName: 'Shoes Name One',
    otherField: 'value1',
  },
  {
    id: 2,
    productName: 'Shoes Name Two',
    otherField: 'value2',
  },
];

const multiSelectItems: Array<Partial<Product>> = [
  {
    id: 1,
    productName: 'Shoes Name One',
    multiField: [1],
  },
  {
    id: 2,
    productName: 'Shoes Name Two',
    multiField: [2],
  },
];

let handleChange = jest.fn();
let handleErrors = jest.fn();

beforeEach(() => {
  handleChange = jest.fn();
  handleErrors = jest.fn();
});

test('renders worksheet', () => {
  const { container } = render(
    <Worksheet columns={columns} items={items} onChange={handleChange} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

describe('selection', () => {
  test('selects cell on click', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const foundElement = await screen.findByText('Shoes Name One');
    const cell = foundElement.parentElement;

    if (cell) {
      fireEvent.click(cell);
    }

    expect(cell).toHaveStyle(`border-color: ${theme.colors.primary}`);
    expect(cell?.parentElement?.firstChild).toHaveStyle(
      `background-color: ${theme.colors.primary}`,
    );
  });

  test('selects cells on selecting range', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const firstRowElement = await screen.findByText('Shoes Name Three');
    const firstCell = firstRowElement.parentElement;
    const lastRowElement = await screen.findByText('Shoes Name One');
    const lastCell = lastRowElement.parentElement;

    if (firstCell) {
      await userEvent.click(firstCell);
    }

    await userEvent.keyboard('{Shift>}');

    if (lastCell) {
      await userEvent.click(lastCell);
    }

    expect(firstCell).toHaveStyle(`border-color: ${theme.colors.primary}`);
    expect(firstCell?.parentElement?.firstChild).toHaveStyle(
      `background-color: ${theme.colors.primary}`,
    );

    expect(lastCell).toHaveStyle(`border-bottom-color: ${theme.colors.primary}`);
    expect(lastCell).toHaveStyle(`border-top-color: ${theme.colors.secondary30}`);
  });

  test('selects cells with arrow keys', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const firstRowElement = await screen.findByText('Shoes Name Three');
    const firstCell = firstRowElement.parentElement;
    const lastRowElement = await screen.findByText('Shoes Name One');
    const lastCell = lastRowElement.parentElement;

    if (firstCell) {
      await userEvent.click(firstCell);
    }

    await userEvent.keyboard('{Shift>}{ArrowDown>2}{/Shift}');

    expect(firstCell).toHaveStyle(`border-color: ${theme.colors.primary}`);
    expect(firstCell?.parentElement?.firstChild).toHaveStyle(
      `background-color: ${theme.colors.primary}`,
    );

    expect(lastCell).toHaveStyle(`border-bottom-color: ${theme.colors.primary}`);
    expect(lastCell).toHaveStyle(`border-top-color: ${theme.colors.secondary30}`);
  });

  test('copy/paste values through the columns', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const firstRowElement = await screen.findByText('Shoes Name Three');
    const firstCell = firstRowElement.parentElement;

    if (firstCell) {
      await userEvent.click(firstCell);
    }

    await userEvent.keyboard('{Shift>}{ArrowDown>2}{/Shift}');

    await userEvent.keyboard('{Meta>}{c}{/Meta}');

    await userEvent.keyboard('{ArrowDown>2}');

    await userEvent.keyboard('{Meta>}{v}{/Meta}');

    expect(handleChange).toHaveBeenCalledWith([
      {
        id: 3,
        numberField: 50,
        otherField2: 3,
        productName: 'Shoes Name Three',
        visibleOnStorefront: false,
      },
      {
        id: 4,
        numberField: 50,
        otherField: 'Text',
        otherField2: 4,
        productName: 'Shoes Name Two',
        visibleOnStorefront: true,
      },
      {
        id: 5,
        productName: 'Shoes Name One',
      },
    ]);
  });
});

describe('edition', () => {
  test('onChange is not called when value does not change', () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cell;

    cell = getByText('Shoes Name One');

    fireEvent.doubleClick(getByText('Shoes Name One'));

    const input = getByDisplayValue('Shoes Name One');

    fireEvent.change(input, { target: { value: 'Shoes Name One' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One');

    expect(cell).toBeDefined();
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('onChange is called when value changes', () => {
    const { getByDisplayValue, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cell;

    cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('Shoes Name One');

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    cell = getByText('Shoes Name One Edit');

    expect(cell).toBeDefined();
    expect(handleChange).toHaveBeenCalledWith([
      {
        id: 3,
        numberField: 50,
        otherField2: 3,
        productName: 'Shoes Name One Edit',
        visibleOnStorefront: false,
      },
    ]);
  });

  test('onChange is called when value changes after focus out', () => {
    const { getByText, getByRole, getByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    fireEvent.click(getByText('Shoes Name Three'));

    fireEvent.keyDown(getByRole('table'), { key: 'H' });

    expect(getByDisplayValue('H')).toBeDefined();

    fireEvent.blur(getByDisplayValue('H'));

    expect(handleChange).toHaveBeenCalledWith([
      {
        id: 1,
        productName: 'H',
        visibleOnStorefront: true,
        otherField: 'Text',
        otherField2: 1,
        numberField: 50,
      },
    ]);
  });

  test('regains focus when it stops editing', () => {
    const { getByText, getByDisplayValue, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const table = getByRole('table');

    fireEvent.doubleClick(getByText('Shoes Name Three'));

    fireEvent.keyDown(getByDisplayValue('Shoes Name Three'), { key: 'Escape' });

    expect(table).toHaveFocus();
  });

  test('edition does not mutate items array', () => {
    // At this point, if our previous tests mutated the items array, this value would be different
    expect(items[2]).toStrictEqual({
      id: 3,
      productName: 'Shoes Name One',
      visibleOnStorefront: false,
      otherField2: 3,
      numberField: 50,
    });
  });

  test('fills out full column', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const foundElement = await screen.findAllByText('Shoes Name Three');

    expect(foundElement).toHaveLength(1);

    if (foundElement) {
      fireEvent.click(foundElement[0]);
    }

    const button = await screen.findByLabelText('Autofill handler');

    expect(button).toBeInTheDocument();

    fireEvent.mouseDown(button);

    expect(await screen.findAllByText('Shoes Name Three')).toHaveLength(1);

    fireEvent.doubleClick(button);

    const foundElements = await screen.findAllByText('Shoes Name Three');

    expect(foundElements).toHaveLength(9);
  });

  test('fills out all bottom cells', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const foundElement = await screen.findByText('Shoes Name One');

    if (foundElement) {
      fireEvent.click(foundElement);
    }

    const button = await screen.findByLabelText('Autofill handler');

    expect(button).toBeInTheDocument();

    fireEvent.doubleClick(button);

    const foundElements = await screen.findAllByText('Shoes Name One');

    expect(foundElements).toHaveLength(7);
  });

  test('fills out only available cells', async () => {
    const items: Array<Partial<Product>> = [
      {
        id: 'test1',
        productName: 'Product 1',
        otherField: 'Text',
      },
      {
        id: 'test2',
        productName: 'Product 2',
        otherField: 'Text',
      },
      {
        id: 'test3',
        productName: 'Product 3',
        otherField: 'Text',
      },
      {
        id: 'test4',
        productName: 'Product 4',
        otherField: 'Text',
      },
      {
        id: 'test5',
        productName: 'Product 5',
        otherField: 'Text',
      },
    ];

    render(
      <Worksheet
        columns={columns}
        disabledRows={['test2', 'test4']}
        items={items}
        onChange={handleChange}
      />,
    );

    const foundElement = await screen.findByText('Product 1');

    if (foundElement) {
      fireEvent.click(foundElement);
    }

    const button = await screen.findByLabelText('Autofill handler');

    fireEvent.doubleClick(button);

    const foundElements = await screen.findAllByText('Product 1');

    expect(foundElements).toHaveLength(3);
  });
});

describe('validation', () => {
  test('invalid cells have the red border', () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );

    const cell = getByText('$49.00').parentElement;
    const row = cell?.parentElement;

    expect(cell).toHaveStyle(`border-color: ${theme.colors.danger}`);
    expect(row?.firstChild).toHaveStyle(`background-color: ${theme.colors.danger}`);
  });

  test('onErrors gets called with invalid cells', async () => {
    let cell;
    let input;

    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} onErrors={handleErrors} />,
    );

    expect(handleErrors).toHaveBeenCalledTimes(1);
    expect(handleErrors).toHaveBeenCalledWith([
      {
        item: {
          id: 5,
        },
        errors: ['productName', 'numberField'],
      },
      {
        item: {
          id: 7,
          productName: 'Variant 3',
          visibleOnStorefront: false,
          otherField: 'Text',
          otherField2: 7,
          numberField: 49,
        },
        errors: ['numberField'],
      },
    ]);

    cell = getByText('$49.00');

    fireEvent.doubleClick(cell);

    input = await screen.findByDisplayValue<HTMLInputElement>('49');

    fireEvent.change(input, { target: { value: 40 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleErrors).toHaveBeenCalledTimes(2);
    expect(handleErrors).toHaveBeenCalledWith([
      {
        item: {
          id: 5,
        },
        errors: ['productName', 'numberField'],
      },
      {
        item: {
          id: 7,
          productName: 'Variant 3',
          visibleOnStorefront: false,
          otherField: 'Text',
          otherField2: 7,
          numberField: 40,
        },
        errors: ['numberField'],
      },
    ]);

    cell = getByText('$40.00');

    fireEvent.doubleClick(cell);

    input = await screen.findByDisplayValue<HTMLInputElement>('40');

    fireEvent.change(input, { target: { value: 60 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleErrors).toHaveBeenCalledTimes(3);
    expect(handleErrors).toHaveBeenCalledWith([
      {
        item: {
          id: 5,
        },
        errors: ['productName', 'numberField'],
      },
    ]);
  });
});

describe('formatting', () => {
  test('formats values', () => {
    const { getAllByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    expect(getAllByText('$50.00')).toHaveLength(7);
  });
});

describe('notation', () => {
  test('indicates the cell', () => {
    const { getByDisplayValue, getByText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = getByDisplayValue('Shoes Name One');

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getByRole('note')).toBeInTheDocument();
  });
});

describe('Column action', () => {
  test('sets value by the action', async () => {
    render(
      <Worksheet
        columns={[
          {
            hash: 'numberField',
            header: 'Number field',
            type: 'number',
            width: 90,
            enabled: true,
            action: {
              icon: <AllInclusiveIcon />,
              transform: () => `Unlimited`,
            },
          },
        ]}
        items={items}
        onChange={handleChange}
      />,
    );

    const cell = screen.getByText('49');

    fireEvent.doubleClick(cell);

    const actionButton = screen.getByRole('button', { name: /cell action button/i });

    expect(actionButton).toBeVisible();

    await userEvent.click(actionButton);

    expect(screen.getByText('Unlimited')).toBeInTheDocument();
  });

  test('calls onChange by click on the action button', async () => {
    render(
      <Worksheet
        columns={[
          {
            hash: 'numberField',
            header: 'Number field',
            type: 'number',
            width: 90,
            enabled: true,
            action: {
              icon: <AllInclusiveIcon />,
              transform: () => `Unlimited`,
            },
          },
        ]}
        items={items}
        onChange={handleChange}
      />,
    );

    const cell = screen.getByText('49');

    fireEvent.doubleClick(cell);

    const actionButton = screen.getByRole('button', { name: /cell action button/i });

    await userEvent.click(actionButton);

    expect(handleChange).toHaveBeenCalledWith([
      {
        id: 7,
        productName: 'Variant 3',
        visibleOnStorefront: false,
        otherField: 'Text',
        otherField2: 7,
        numberField: 'Unlimited',
      },
    ]);
  });

  test('hides action button when value equals to transformed value', async () => {
    render(
      <Worksheet
        columns={[
          {
            hash: 'numberField',
            header: 'Number field',
            type: 'number',
            width: 90,
            enabled: true,
            action: {
              icon: <AllInclusiveIcon />,
              transform: () => `TestValue`,
            },
          },
        ]}
        items={items}
        onChange={handleChange}
      />,
    );

    const cell = screen.getByText('49');

    fireEvent.doubleClick(cell);

    const actionButton = screen.getByRole('button', { name: /cell action button/i });

    await userEvent.click(actionButton);

    fireEvent.doubleClick(screen.getByText('TestValue'));

    expect(actionButton).not.toBeInTheDocument();
  });
});

describe('keyboard navigation', () => {
  test('navigates with arrow keys', () => {
    const { getAllByText, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cell = getByText('Shoes Name Three');

    fireEvent.click(cell);

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowLeft' });

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowDown' });

    cell = getByText('Shoes Name Two');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowUp' });

    cell = getByText('Shoes Name Three');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowRight' });
    fireEvent.keyDown(cell, { key: 'ArrowRight' });

    const cells = getAllByText('Text');

    expect(cells[0].parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);
  });

  test('navigates with tab', () => {
    const { getAllByText, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name Three');

    fireEvent.click(cell);

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'Tab' });
    fireEvent.keyDown(cell, { key: 'Tab' });

    const cells = getAllByText('Text');

    expect(cells[0].parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'Tab', shiftKey: true });
    fireEvent.keyDown(cell, { key: 'Tab', shiftKey: true });

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);
  });

  test('enter starts editing the cell', () => {
    const { getByDisplayValue, getByText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const worksheet = getByRole('table');
    const cell = getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: 'Enter' });

    expect(getByDisplayValue('Shoes Name Three')).toBeDefined();
  });

  test('tab finish editing the cell', () => {
    const { getByDisplayValue, getByText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const worksheet = getByRole('table');
    const cell = getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: 'a' });

    expect(getByDisplayValue('a')).toBeDefined();

    fireEvent.keyDown(cell, { key: 'Tab' });
  });

  test('typing starts editing the cell', () => {
    const { getByDisplayValue, getByText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const worksheet = getByRole('table');
    const cell = getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: 'a' });

    expect(getByDisplayValue('a')).toBeDefined();
  });

  test('cell is not editted when key length is greater than 1', async () => {
    const { getByText, queryByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name Three');

    await userEvent.click(cell);
    await userEvent.keyboard('{capslock}');

    expect(getByText('Shoes Name Three')).toBeInTheDocument();
    expect(queryByDisplayValue('capslock')).not.toBeInTheDocument();
  });

  test('cell is not start to edit when using Meta key', async () => {
    const { getByText, queryByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name Three');

    await userEvent.click(cell);
    await userEvent.keyboard('{meta}');

    expect(queryByDisplayValue('Shoes Name Three')).toBeNull();
    expect(cell).toBeDefined();
  });

  test('cell is not editted when using Control key', async () => {
    const { getByText, getByDisplayValue, queryByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name Three');

    await userEvent.click(cell);
    await userEvent.keyboard('{control}');

    expect(getByDisplayValue('Shoes Name Three')).toBeDefined();
    expect(queryByDisplayValue('Control')).not.toBeInTheDocument();
  });

  test('current content in cell is not deleted when double cliking and copy new text in the cell', async () => {
    const { getByText, getByDisplayValue } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name Three');

    await userEvent.dblClick(cell);
    await userEvent.paste('hello');

    expect(getByDisplayValue('Shoes Name Threehello')).toBeDefined();
  });

  test('space starts editing the cell', () => {
    const { getByDisplayValue, getByText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const worksheet = getByRole('table');
    const cell = getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: ' ' });

    expect(getByDisplayValue('Shoes Name Three')).toBeDefined();
  });

  test('enter/space on checkbox navigates down and toggles value', () => {
    const { getAllByLabelText, getByRole } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const worksheet = getByRole('table');
    const cells = getAllByLabelText('Checked');

    fireEvent.click(cells[0]);
    fireEvent.keyDown(worksheet, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 1,
        productName: 'Shoes Name Three',
        visibleOnStorefront: true,
        otherField: 'Text',
        otherField2: 1,
        numberField: 50,
      },
    ]);
    expect(cells[1].parentElement?.parentElement?.parentElement).toHaveStyle(
      `border-color: ${theme.colors.primary};`,
    );

    fireEvent.keyDown(worksheet, { key: ' ' });

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 1,
        productName: 'Shoes Name Three',
        visibleOnStorefront: true,
        otherField: 'Text',
        otherField2: 1,
        numberField: 50,
      },
      {
        id: 2,
        productName: 'Shoes Name Two',
        visibleOnStorefront: false,
        otherField: 'Text',
        otherField2: 2,
        numberField: 50,
      },
    ]);
  });
});

describe('TextEditor', () => {
  test('renders TextEditor', async () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('Shoes Name One');

    fireEvent.doubleClick(cell);

    const input = await screen.findByDisplayValue<HTMLInputElement>('Shoes Name One');

    expect(input).toBeDefined();
  });

  test('TextEditor is editable', async () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let input;
    let cell;

    cell = getByText('Shoes Name One');

    expect(cell.parentNode).toHaveStyle(`background-color: ${theme.colors.inherit};`);

    fireEvent.doubleClick(cell);

    input = await screen.findByDisplayValue<HTMLInputElement>('Shoes Name One');

    expect(input).toHaveStyle(`background-color: ${theme.colors.inherit}`);

    fireEvent.change(input, { target: { value: 'Shoes Name One Edit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 3,
        productName: 'Shoes Name One Edit',
        visibleOnStorefront: false,
        otherField2: 3,
        numberField: 50,
      },
    ]);

    cell = getByText('Shoes Name One Edit');

    expect(cell.parentNode).toHaveStyle(`background-color: ${theme.colors.warning10};`);

    fireEvent.doubleClick(cell);

    input = await screen.findByDisplayValue<HTMLInputElement>('Shoes Name One Edit');

    expect(input).toHaveStyle(`background-color: ${theme.colors.warning10};`);
  });

  test('column type number returns number', async () => {
    const { getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cell = getByText('$49.00');

    fireEvent.doubleClick(cell);

    const input = await screen.findByDisplayValue<HTMLInputElement>('49');

    fireEvent.change(input, { target: { value: 80 } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith([
      {
        id: 7,
        productName: 'Variant 3',
        visibleOnStorefront: false,
        otherField: 'Text',
        otherField2: 7,
        numberField: 80,
      },
    ]);
  });

  test('renders in disabled state', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    const cell = screen.getByText('Shoes Name One');

    expect(cell).toHaveStyle('color: #8C93AD');
  });
});

describe('SelectEditor', () => {
  test('renders SelectEditor', async () => {
    const { findAllByRole } = render(
      <Worksheet columns={selectableColumns} items={selectableItems} onChange={handleChange} />,
    );

    const cells = await findAllByRole('combobox');

    expect(cells).toHaveLength(2);
  });

  test('SelectEditor is editable', async () => {
    const { findAllByRole, findAllByDisplayValue } = render(
      <Worksheet columns={selectableColumns} items={selectableItems} onChange={handleChange} />,
    );

    const cells = await findAllByDisplayValue('Value 1');

    await userEvent.click(cells[0]);

    const options = await findAllByRole('option');

    await userEvent.click(options[2]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 1,
        productName: 'Shoes Name One',
        otherField: 'value3',
      },
    ]);
  });

  test('renders in disabled state', async () => {
    render(
      <Worksheet
        columns={[
          {
            hash: 'productName',
            header: 'Product name',
            validation: (value: string) => !!value,
            disabled: true,
          },
          {
            hash: 'otherField',
            header: 'Other field',
            type: 'select',
            config: {
              options: [
                { value: 'value1', content: 'Value 1' },
                { value: 'value2', content: 'Value 2' },
                { value: 'value3', content: 'Value 3' },
              ],
            },
            validation: (value: string) => !!value,
            disabled: true,
          },
        ]}
        items={selectableItems}
        onChange={handleChange}
      />,
    );

    const cell = await screen.findAllByDisplayValue('Value 1');

    expect(cell[0]).toHaveAttribute('disabled');
  });
});

describe('MultiSelectEditor', () => {
  test('renders MultiSelectEditor', async () => {
    const { findAllByRole } = render(
      <Worksheet columns={multiSelectColumns} items={multiSelectItems} onChange={handleChange} />,
    );

    const cells = await findAllByRole('combobox');

    expect(cells).toHaveLength(2);
  });

  test('MultiSelectEditor is editable', async () => {
    const { findAllByRole, findByLabelText } = render(
      <Worksheet columns={multiSelectColumns} items={multiSelectItems} onChange={handleChange} />,
    );

    const cells = await findAllByRole('combobox');

    await userEvent.click(cells[0]);

    const options = await findAllByRole('option');

    await userEvent.click(options[2]);

    const deleteButtons = await findByLabelText('Remove Multi 2');

    await userEvent.click(deleteButtons);

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 1,
        productName: 'Shoes Name One',
        multiField: [1, 3],
      },
      {
        id: 2,
        productName: 'Shoes Name Two',
        multiField: [],
      },
    ]);
  });

  test('renders in disabled state', async () => {
    const { findAllByRole } = render(
      <Worksheet
        columns={[
          {
            hash: 'productName',
            header: 'Product name',
            validation: (value: string) => !!value,
            disabled: true,
          },
          {
            hash: 'multiField',
            header: 'Multi field',
            type: 'multiSelect',
            config: {
              options: [
                { value: 1, content: 'Multi 1' },
                { value: 2, content: 'Multi 2' },
                { value: 3, content: 'Multi 3' },
              ],
            },
            validation: (value: string) => !!value,
            disabled: true,
          },
        ]}
        items={selectableItems}
        onChange={handleChange}
      />,
    );

    const cells = await findAllByRole('combobox');

    expect(cells[0]).toHaveAttribute('disabled');
  });
});

describe('CheckboxEditor', () => {
  test('renders CheckboxEditor', () => {
    const { getAllByLabelText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    let cells = getAllByLabelText('Checked');

    expect(cells).toHaveLength(6);

    cells = getAllByLabelText('Unchecked');

    expect(cells).toHaveLength(3);
  });

  test('CheckboxEditor is editable', () => {
    const { getAllByLabelText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const cells = getAllByLabelText('Checked');
    const cell = cells[0];

    fireEvent.click(cell);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 1,
        productName: 'Shoes Name Three',
        visibleOnStorefront: false,
        otherField: 'Text',
        otherField2: 1,
        numberField: 50,
      },
    ]);
  });

  test('renders in disabled state', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    const cell = screen.getAllByLabelText('Checked');

    expect(cell[0]).toHaveAttribute('disabled');
  });
});

describe('ModalEditor', () => {
  test('renders ModalEditor', () => {
    const { getAllByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const buttons = getAllByText('Edit');

    expect(buttons).toHaveLength(9);
  });

  test('ModalEditor is editable', () => {
    const { getAllByText, getByText } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    const buttons = getAllByText('Edit');

    expect(buttons).toHaveLength(9);

    fireEvent.click(buttons[3]);

    // Find checkbox to click
    const parent = getByText('Category 0').parentNode?.parentNode;
    const checkbox = parent?.querySelector('label');

    if (checkbox) {
      fireEvent.click(checkbox);
    }

    const save = getByText('Save');

    fireEvent.click(save);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenLastCalledWith([
      {
        id: 4,
        productName: 'Variant 1',
        visibleOnStorefront: true,
        otherField: 'Text',
        otherField2: 0,
        numberField: 50,
      },
    ]);

    const cell = buttons[3].parentNode?.parentNode?.parentNode;

    expect(cell).toHaveStyle(`background-color: ${theme.colors.warning10};`);
  });

  test('renders in disabled state', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    const buttons = screen.getAllByRole('button', { name: /edit/i });

    expect(buttons[0]).toHaveAttribute('disabled');
  });
});

describe('disable', () => {
  test('navigation works on disabled cells', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    let cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowLeft' });

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowDown' });

    cell = screen.getByText('Shoes Name Two');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowUp' });

    cell = screen.getByText('Shoes Name Three');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowRight' });
    fireEvent.keyDown(cell, { key: 'ArrowRight' });

    const cells = screen.getAllByText('Text');

    expect(cells[0].parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);
  });

  test('enter does not start editing the cell', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    const worksheet = screen.getByRole('table');

    const cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: 'Enter' });

    expect(screen.queryByDisplayValue('Shoes Name Three')).toBeNull();
  });

  test('space does not start editing the cell', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    const worksheet = screen.getByRole('table');

    const cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: ' ' });

    expect(screen.queryByDisplayValue('Shoes Name Three')).toBeNull();
  });

  test('mouse will not trigger input field', () => {
    render(<Worksheet columns={disabledColumns} items={items} onChange={handleChange} />);

    fireEvent.doubleClick(screen.getByText('Shoes Name One'));

    expect(screen.queryByDisplayValue('Shoes Name One')).toBeNull();
  });
});

describe('disable rows', () => {
  test('navigation works on disabled cells', () => {
    render(
      <Worksheet columns={columns} disabledRows={[1, 2]} items={items} onChange={handleChange} />,
    );

    let cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowLeft' });

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowDown' });

    cell = screen.getByText('Shoes Name Two');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowUp' });

    cell = screen.getByText('Shoes Name Three');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowRight' });
    fireEvent.keyDown(cell, { key: 'ArrowRight' });

    const cells = screen.getAllByText('Text');

    expect(cells[0].parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);
  });

  test('enter does not start editing the cell', () => {
    render(
      <Worksheet columns={columns} disabledRows={[1, 2]} items={items} onChange={handleChange} />,
    );

    const worksheet = screen.getByRole('table');

    const cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: 'Enter' });

    expect(screen.queryByDisplayValue('Shoes Name Three')).toBeNull();
  });

  test('space does not start editing the cell', () => {
    render(
      <Worksheet columns={columns} disabledRows={[1, 2]} items={items} onChange={handleChange} />,
    );

    const worksheet = screen.getByRole('table');

    const cell = screen.getByText('Shoes Name Three');

    fireEvent.click(cell);
    fireEvent.keyDown(worksheet, { key: ' ' });

    expect(screen.queryByDisplayValue('Shoes Name Three')).toBeNull();
  });

  test('mouse will not trigger input field', () => {
    render(
      <Worksheet columns={columns} disabledRows={[1, 3]} items={items} onChange={handleChange} />,
    );

    fireEvent.doubleClick(screen.getByText('Shoes Name One'));

    expect(screen.queryByDisplayValue('Shoes Name One')).toBeNull();
  });

  test('enables column within disabled row', () => {
    const [, ...restCols] = columns;

    render(
      <Worksheet
        columns={[
          {
            hash: 'productName',
            header: 'Product name',
            enabled: true,
          },
          ...restCols,
        ]}
        disabledRows={[1, 3]}
        items={items}
        onChange={handleChange}
      />,
    );

    fireEvent.doubleClick(screen.getByText('Shoes Name Three'));

    const input = screen.getByDisplayValue('Shoes Name Three');

    fireEvent.change(input, { target: { value: 'test test test' } });

    expect(screen.getByDisplayValue('test test test')).toBeInTheDocument();
  });
});

describe('expandable', () => {
  test('renders expandable buttons', () => {
    render(
      <Worksheet
        columns={disabledColumns}
        expandableRows={{ 2: [3], 5: [6, 7] }}
        items={items}
        onChange={handleChange}
      />,
    );

    expect(screen.queryAllByTitle('toggle row expanded')).toHaveLength(2);
  });

  test('toggles rows', () => {
    render(
      <Worksheet
        columns={disabledColumns}
        expandableRows={{ 2: [3], 5: [6, 7] }}
        items={items}
        onChange={handleChange}
      />,
    );

    // expect(screen.queryAllByRole('row').length).toBeVisible();
    expect(screen.queryByRole('row', { name: /shoes name one/i })).not.toBeInTheDocument();

    const buttons = screen.queryAllByTitle('toggle row expanded');

    fireEvent.click(buttons[0]);

    expect(screen.queryByRole('row', { name: /shoes name one/i })).toBeInTheDocument();

    // expect(screen.queryAllByRole('row').length).toBe(8);

    expect(screen.queryByRole('row', { name: /variant 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /variant 3/i })).not.toBeInTheDocument();

    fireEvent.click(buttons[1]);

    expect(screen.queryByRole('row', { name: /variant 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /variant 2/i })).toBeInTheDocument();
    // expect(screen.queryAllByRole('row').length).toBe(10);

    fireEvent.click(buttons[1]);

    expect(screen.queryByRole('row', { name: /variant 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /variant 3/i })).not.toBeInTheDocument();

    // expect(screen.queryAllByRole('row').length).toBe(8);

    fireEvent.keyDown(buttons[1], { key: 'Enter' });

    // expect(screen.queryAllByRole('row').length).toBe(10);
    expect(screen.queryByRole('row', { name: /variant 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /variant 2/i })).toBeInTheDocument();
  });

  test('keyboard navigates correctly', () => {
    render(
      <Worksheet
        columns={disabledColumns}
        expandableRows={{ 2: [3], 5: [6, 7] }}
        items={items}
        onChange={handleChange}
      />,
    );

    const buttons = screen.queryAllByTitle('toggle row expanded');

    let cell = screen.getByText('Shoes Name Two');

    fireEvent.click(cell);

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowDown' });

    const variant = screen.getByText('Variant 1');

    expect(variant.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.keyDown(cell, { key: 'ArrowUp' });

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);

    fireEvent.click(buttons[0]);
    fireEvent.click(variant);

    fireEvent.keyDown(cell, { key: 'ArrowUp' });

    cell = screen.getByText('Shoes Name One');

    expect(cell.parentElement).toHaveStyle(`border-color: ${theme.colors.primary}`);
  });
});

describe('column widths', () => {
  test('table has 100% width when some or none columns have fixed width', () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const table = screen.getByRole('table');

    expect(table).toHaveStyle('width: 100%');
  });

  test('table has auto width if all columns have fixed width', () => {
    render(
      <Worksheet columns={[{ ...columns[0], width: 90 }]} items={items} onChange={handleChange} />,
    );

    const table = screen.getByRole('table');

    expect(table).toHaveStyle('width: auto');
  });

  test('table accepts a minWidth prop', () => {
    render(<Worksheet columns={columns} items={items} minWidth={900} onChange={handleChange} />);

    const table = screen.getByRole('table');

    expect(table).toHaveStyle('min-width: 900px');
  });

  test('columns have defined widths (or auto if none)', async () => {
    render(<Worksheet columns={columns} items={items} onChange={handleChange} />);

    const productNameColumn = await screen.findByText('Product name');
    const visibleOnStorefrontColumn = await screen.findByText('Visible on storefront');
    const numberFieldColumn = await screen.findByText('Number field');

    expect(productNameColumn).toHaveStyle('width: auto');
    expect(visibleOnStorefrontColumn).toHaveStyle('width: 80px');
    expect(numberFieldColumn).toHaveStyle('width: 90px');
  });
});

describe('Header tooltip', () => {
  test('renders column with tooltip icon', () => {
    const { getByTitle } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    expect(getByTitle('Hover or focus for additional context.')).toBeTruthy();
  });

  test('renders tooltip when hovering on icon', async () => {
    const { getByTitle } = render(
      <Worksheet columns={columns} items={items} onChange={handleChange} />,
    );

    await userEvent.hover(getByTitle('Hover or focus for additional context.'));

    const result = screen.getByText('Info about number field');

    expect(result).toBeInTheDocument();
  });
});

test('renders localized labels', () => {
  render(
    <Worksheet
      columns={disabledColumns}
      expandableRows={{ 2: [3], 5: [6, 7] }}
      items={items}
      localization={{ toggleRowExpanded: 'cambiar expansion de fila' }}
      onChange={handleChange}
    />,
  );

  expect(screen.queryAllByTitle('cambiar expansion de fila')).toHaveLength(2);
});
