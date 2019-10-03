import { AddIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Form } from '../Form';

import { Select } from './Select';

const onItemChange = jest.fn();

const SelectMock = (
  <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" required>
    <Select.Option value="us">United States</Select.Option>
    <Select.Option value="mx">Mexico</Select.Option>
    <Select.Option value="ca">Canada</Select.Option>
    <Select.Option value="en">England</Select.Option>
  </Select>
);

const MultiselectMock = (
  <Select
    multi={true}
    onItemChange={onItemChange}
    label="Countries"
    placeholder="Choose country"
    value={['us', 'mx']}
    required
  >
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
  const { getAllByLabelText } = render(SelectMock);

  expect(getAllByLabelText('Countries')[0]).toBeInTheDocument();
});

test('select input has id', () => {
  const { getAllByLabelText } = render(SelectMock);

  expect(getAllByLabelText('Countries')[0].id).toBeDefined();
});

test('select input has placeholder text', () => {
  const { getByPlaceholderText } = render(SelectMock);

  expect(getByPlaceholderText('Choose country')).toBeDefined();
});

test('select input has aria-controls', () => {
  const { getByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

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
  const { getAllByLabelText, queryByRole } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  expect(queryByRole('listbox')).toHaveStyle('height: 1px');

  fireEvent.focus(input);

  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');
});

test('select menu opens/closes when input button is clicked', () => {
  const { getByRole, queryByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.click(button);
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('esc should close menu', () => {
  const { getAllByLabelText, queryByRole } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(input, { key: 'Escape' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('tab should close menu', () => {
  const { getAllByLabelText, queryByRole } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(input, { key: 'Tab' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('select has items', () => {
  const { getAllByRole } = render(SelectMock);

  expect(getAllByRole('option').length).toBe(4);
});

test('select items should have values', () => {
  const { getAllByRole } = render(SelectMock);
  const options = getAllByRole('option');

  expect(options[0].getAttribute('data-value')).toBe('us');
  expect(options[1].getAttribute('data-value')).toBe('mx');
  expect(options[2].getAttribute('data-value')).toBe('ca');
  expect(options[3].getAttribute('data-value')).toBe('en');
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
  const { getAllByRole, getAllByLabelText, getByRole } = render(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="mx" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );
  const button = getByRole('button');
  const input = getAllByLabelText('Countries')[0];

  fireEvent.click(button);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);
});

test('select input text should match the value selected', () => {
  const { getAllByLabelText, rerender } = render(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="mx" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('value')).toEqual('Mexico');

  rerender(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="ca">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  expect(input.getAttribute('value')).toEqual('Canada');
});

test('select items should be filterable', () => {
  const { getAllByRole, getAllByLabelText, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getAllByLabelText('Countries')[0], { target: { value: 'm' } });

  const options = getAllByRole('option');

  expect(options.length).toBe(1);
});

test('up/down arrows should change select item selection', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

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

test('home should select first select item', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

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
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });
  expect(options[3].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should trigger onItemChange', () => {
  const { getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onItemChange).toHaveBeenCalledWith('us');
});

test('clicking on select options should trigger onItemClick', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onItemChange).toHaveBeenCalledWith('mx');
});

test('clicking on disabled select options should not trigger onItemClick', () => {
  const spy = jest.fn();
  const { getAllByRole, getAllByLabelText } = render(
    <Select onItemChange={spy} label="Countries" placeholder="Choose country">
      <Select.Option value="us" disabled>
        United States
      </Select.Option>
      <Select.Action>Action</Select.Action>
    </Select>,
  );
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');
  const item = options[0];

  fireEvent.mouseOver(item);
  fireEvent.click(item);
  expect(spy).not.toHaveBeenCalled();
});

test('select options should be highlighted when moused over', () => {
  const { getAllByLabelText, getAllByRole } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const option = getAllByRole('option')[0];

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.mouseOver(option);
  expect(option.dataset.highlighted).toBe('true');
});

test('select should render select action', () => {
  const { getByRole, getByText } = render(
    <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
      <Select.Action>Action</Select.Action>
    </Select>,
  );

  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(getByText('Action')).toBeInTheDocument();
});

test('select action should execute onActionClick function', () => {
  const onActionClick = jest.fn();
  const { getAllByLabelText, getByText } = render(
    <Select
      onActionClick={onActionClick}
      onItemChange={onItemChange}
      label="Countries"
      placeholder="Choose country"
      required
    >
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
      <Select.Action>Action</Select.Action>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  fireEvent.change(input, { target: { value: 'm' } });

  const action = getByText('Action');

  fireEvent.click(action);

  expect(onActionClick).toHaveBeenCalledWith('m');
});

test('select action supports icons', () => {
  const { getAllByLabelText, getByRole } = render(
    <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
      <Select.Action iconLeft={<AddIcon />}>Action</Select.Action>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const select = getByRole('listbox');

  expect(select.lastChild).toMatchSnapshot();
});

test('select action supports actionTypes', () => {
  const { getAllByLabelText, getByRole } = render(
    <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
      <Select.Action actionType="destructive">Action</Select.Action>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const select = getByRole('listbox');

  expect(select.lastChild).toMatchSnapshot();
});

test('select should render an error if one is provided', () => {
  const { getByText } = render(
    <Form.Group>
      <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country" error="You must choose">
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="mx">Mexico</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="en">England</Select.Option>
        <Select.Action actionType="destructive">Action</Select.Action>
      </Select>
    </Form.Group>,
  );

  expect(getByText('You must choose')).toBeInTheDocument();
});

test('select should have a required attr if set as required', () => {
  const { getAllByLabelText } = render(
    <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country" error="Required" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('required')).toEqual('');
});

test('select should not have a required attr if not set as required', () => {
  const { getAllByLabelText } = render(
    <Select label="Countries" onItemChange={onItemChange} placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('required')).toEqual(null);
});

test('select should have a disabled attr if set as disabled', () => {
  const { getAllByLabelText } = render(
    <Select onItemChange={() => null} label="Countries" value="us" disabled>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual('');
});

test('select should not have a disabled attr if not set as disabled', () => {
  const { getAllByLabelText } = render(
    <Select onItemChange={() => null} label="Countries" placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual(null);
});

test('should be valid if not required', () => {
  const { getAllByLabelText } = render(
    <Select onItemChange={() => null} label="Countries" placeholder="Choose country">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries (optional)')[0] as HTMLSelectElement;

  expect(input.checkValidity()).toEqual(true);
});

test('should be invalid if required and has no value', () => {
  const { getAllByLabelText } = render(
    <Select onItemChange={() => null} label="Countries" placeholder="Choose country" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0] as HTMLSelectElement;

  expect(input.checkValidity()).toEqual(false);
});

test('should be valid if required and has a value', () => {
  const { getAllByLabelText } = render(
    <Select value="us" onItemChange={() => null} label="Countries" placeholder="Choose country" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0] as HTMLSelectElement;

  expect(input.checkValidity()).toEqual(true);
});

test('should be invalid when it has an error', () => {
  const { getAllByLabelText } = render(
    <Select error="Unrelated failure" onItemChange={() => null} label="Countries" placeholder="Choose country" required>
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0] as HTMLSelectElement;

  expect(input.checkValidity()).toEqual(false);

  fireEvent.change(input, { target: { value: 'us' } });

  expect(input.checkValidity()).toEqual(false);
});

test('select input text should update if a matching child appears', () => {
  const { getAllByLabelText, rerender } = render(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" required value="mx">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('value')).toEqual('');

  rerender(
    <Select onItemChange={onItemChange} label="Countries" placeholder="Choose country" value="mx">
      <Select.Option value="us">United States</Select.Option>
      <Select.Option value="mx">Mexico</Select.Option>
      <Select.Option value="ca">Canada</Select.Option>
      <Select.Option value="en">England</Select.Option>
    </Select>,
  );

  expect(input.getAttribute('value')).toEqual('Mexico');
});

test('multiselect should render four items with checkboxes', () => {
  const { getByRole } = render(MultiselectMock);

  const menu = getByRole('listbox');

  const options = menu.querySelectorAll('input[type="checkbox"]');

  expect(options.length).toEqual(4);
});

test('multiselect should have two selected options', () => {
  const { getByRole } = render(MultiselectMock);

  const menu = getByRole('listbox');

  const options = menu.querySelectorAll(':checked');

  expect(options.length).toEqual(2);
});

test('multiselect should be able to select multiple options', () => {
  const { getAllByLabelText } = render(MultiselectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onItemChange).toHaveBeenCalledWith(['us', 'mx', 'ca']);
});

test('multiselect should be able to deselect options', () => {
  const { getAllByLabelText } = render(MultiselectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onItemChange).toHaveBeenCalledWith(['mx']);
});

test('chips should be rendered', () => {
  const { getAllByText } = render(MultiselectMock);

  expect(getAllByText('United States').length).toEqual(2);
  expect(getAllByText('Mexico').length).toEqual(2);
  expect(getAllByText('Canada').length).not.toEqual(2);
});
