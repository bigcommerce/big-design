import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Select } from './Select';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        // tslint:disable-next-line: no-empty
        destroy: () => {},
        // tslint:disable-next-line: no-empty
        scheduleUpdate: () => {},
      };
    }
  };
});

const onItemChange = jest.fn();

const SelectMock = (
  <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country">
    <Select.Option value="us">United States</Select.Option>
    <Select.Option value="mx">Mexico</Select.Option>
    <Select.Option value="ca">Canada</Select.Option>
    <Select.Option value="en">England</Select.Option>
  </Select>
);

test('renders select combobox', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('combobox')).toBeInTheDocument();
});

test('renders select label', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries')).toBeInTheDocument();
});

test('select label has id', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').id).toBeDefined();
});

test('select label has for attribute', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').hasAttribute('for')).toBe(true);
});

test('renders select input', () => {
  const { getByLabelText } = render(SelectMock);

  expect(getByLabelText('Countries')).toBeInTheDocument();
});

test('select input has id', () => {
  const { getByLabelText } = render(SelectMock);

  expect(getByLabelText('Countries').id).toBeDefined();
});

test('select input has placeholder text', () => {
  const { getByPlaceholderText } = render(SelectMock);

  expect(getByPlaceholderText('Choose country')).toBeDefined();
});

test('select input has aria-autocomplete', () => {
  const { getByLabelText } = render(SelectMock);

  expect(getByLabelText('Countries').getAttribute('aria-autocomplete')).toBe('list');
});

test('select input has aria-labelledby', () => {
  const { getByLabelText, getByText } = render(SelectMock);
  const input = getByLabelText('Countries');
  const label = getByText('Countries');

  expect(input.getAttribute('aria-labelledby')).toBe(label.id);
});

test('select input has aria-controls', () => {
  const { getByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  expect(input.getAttribute('aria-controls')).toBe(getByRole('listbox').id);
});

test('renders input button', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button'));
});

test('input button has aria-haspopup', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button').getAttribute('aria-haspopup')).toBe('true');
});

test('input button has aria-label', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button').getAttribute('aria-label')).toBe('toggle menu');
});

test('select menu opens when focused on input', () => {
  const { getByLabelText, queryByRole } = render(SelectMock);
  const input = getByLabelText('Countries');

  expect(queryByRole('listbox')).not.toBeInTheDocument();

  fireEvent.focus(input);

  expect(queryByRole('listbox')).toBeInTheDocument();
});

test('select menu opens/closes when input button is clicked', () => {
  const { getByRole, queryByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  expect(queryByRole('listbox')).toBeInTheDocument();

  fireEvent.click(button);
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('select has items', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  expect(getAllByRole('option').length).toBe(4);
});

test('select items should have values', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[0].getAttribute('value')).toBe('us');
  expect(options[1].getAttribute('value')).toBe('mx');
  expect(options[2].getAttribute('value')).toBe('ca');
  expect(options[3].getAttribute('value')).toBe('en');
});

test('select items should be unfiltered when opened', () => {
  const { getAllByRole, getByRole } = render(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="mx">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );
  const button = getByRole('button');

  fireEvent.click(button);

  const options = getAllByRole('option');

  expect(options.length).toBe(4);
});

test('select item should be highlighted when opened', () => {
  const { getAllByRole, getByLabelText, getByRole } = render(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="mx">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );
  const button = getByRole('button');
  const input = getByLabelText('Countries');

  fireEvent.click(button);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);
});

test('select items should be filterable', async () => {
  const { getAllByRole, getByLabelText, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getByLabelText('Countries'), { target: { value: 'm' } });

  const options = getAllByRole('option');

  expect(options.length).toBe(1);
});

test('up/down arrows should change select item selection', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('esc should close menu', () => {
  const { getByLabelText, queryByRole } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'Escape' });
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('tab should close menu', () => {
  const { getByLabelText, queryByRole } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'Tab' });
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('home should select first select item', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[2].dataset.highlighted).toBe('true');

  fireEvent.keyDown(input, { key: 'Home' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last select item', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });
  expect(options[3].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should trigger onItemChange', () => {
  const { getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onItemChange).toHaveBeenCalledWith('us');
});

test('space should trigger onItemChange', () => {
  const { getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: ' ' });
  expect(onItemChange).toHaveBeenCalledWith('mx');
});

test('clicking on select options should trigger onItemClick', () => {
  const { getAllByRole, getByLabelText } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onItemChange).toHaveBeenCalledWith('mx');
});

test('select options should be highlighted when moused over', () => {
  const { getByLabelText, getByRole } = render(SelectMock);
  const input = getByLabelText('Countries');

  fireEvent.focus(input);

  const option = getByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.mouseOver(option);
  expect(option.dataset.highlighted).toBe('true');
});
