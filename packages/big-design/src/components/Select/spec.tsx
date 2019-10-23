import { DeleteIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Form } from '../Form';

import { Select } from './Select';

const onChange = jest.fn();
const onActionClick = jest.fn();

const SelectMock = (
  <Select
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onClick: onActionClick,
    }}
    error="Required"
    onChange={onChange}
    label="Countries"
    placeholder="Choose country"
    options={[
      { value: 'us', content: 'United States' },
      { value: 'mx', content: 'Mexico' },
      { value: 'ca', content: 'Canada' },
      { value: 'en', content: 'England' },
      { value: 'fr', content: 'France', disabled: true },
    ]}
    required
    value="mx"
  />
);

const MultiselectMock = (
  <Select
    onChange={onChange}
    label="Countries"
    multi
    placeholder="Choose country"
    options={[
      { value: 'us', content: 'United States' },
      { value: 'mx', content: 'Mexico' },
      { value: 'ca', content: 'Canada' },
      { value: 'en', content: 'England' },
    ]}
    value={['us', 'mx']}
  />
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

  expect(getAllByRole('option').length).toBe(6);
});

test('select items should be unfiltered when opened', () => {
  const { getAllByRole, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);

  const options = getAllByRole('option');

  expect(options.length).toBe(6);
});

test('select item should be highlighted when opened', () => {
  const { getAllByRole, getAllByLabelText, getByRole } = render(SelectMock);
  const button = getByRole('button');
  const input = getAllByLabelText('Countries')[0];

  fireEvent.click(button);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);
});

test('select input text should match the value selected', () => {
  const { getAllByLabelText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('value')).toEqual('Mexico');
});

test('select items should be filterable', () => {
  const { getAllByRole, getAllByLabelText, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getAllByLabelText('Countries')[0], { target: { value: 'm' } });

  const options = getAllByRole('option');

  expect(options.length).toBe(2);
});

test('up/down arrows should change select item selection', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[2].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[2].id);

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('home should select first select item', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(input, { key: 'Home' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last select item', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });
  expect(options[5].dataset.highlighted).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[5].id);
});

test('enter should trigger onChange', () => {
  const { getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onChange).toHaveBeenCalledWith('ca');
});

test('clicking on select options should trigger onChange', () => {
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onChange).toHaveBeenCalledWith('mx');
});

test('clicking on disabled select options should not trigger onClick', () => {
  const spy = jest.fn();
  const { getAllByRole, getAllByLabelText } = render(SelectMock);
  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const options = getAllByRole('option');
  const item = options[4];

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
  const { getByText } = render(SelectMock);

  expect(getByText('Remove Country')).toBeInTheDocument();
});

test('select action should call onClick', () => {
  const { getAllByLabelText, getByText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  fireEvent.change(input, { target: { value: 'm' } });

  const action = getByText('Remove Country');

  fireEvent.click(action);

  expect(onActionClick).toHaveBeenCalledWith('m');
});

test('select action supports icons', () => {
  const { getAllByLabelText, getByRole } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);

  const select = getByRole('listbox');

  expect(select.lastChild).toMatchSnapshot();
});

test('select action supports actionTypes', () => {
  const { getAllByLabelText, getByText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];
  fireEvent.focus(input);

  const action = getByText('Remove Country');
  fireEvent.mouseOver(action);

  expect(action).toMatchSnapshot();
});

test('select should render an error if one is provided', () => {
  const { getByText } = render(
    <Form.Group>
      <Select
        onChange={onChange}
        label="Countries"
        error="Required"
        placeholder="Choose country"
        options={[
          { value: 'us', content: 'United States' },
          { value: 'mx', content: 'Mexico' },
          { value: 'ca', content: 'Canada' },
          { value: 'en', content: 'England' },
          { value: 'fr', content: 'France', disabled: true },
        ]}
        required
      />
    </Form.Group>,
  );

  expect(getByText('Required')).toBeInTheDocument();
});

test('select should have a required attr if set as required', () => {
  const { getAllByLabelText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('required')).toEqual('');
});

test('select should not have a required attr if not set as required', () => {
  const { getAllByLabelText } = render(
    <Select
      onChange={onChange}
      label="Countries"
      placeholder="Choose country"
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
        { value: 'fr', content: 'France', disabled: true },
      ]}
    />,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('required')).toEqual(null);
});

test('select should have a disabled attr if set as disabled', () => {
  const { getAllByLabelText } = render(
    <Select
      disabled
      onChange={onChange}
      label="Countries"
      placeholder="Choose country"
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
        { value: 'fr', content: 'France', disabled: true },
      ]}
    />,
  );

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual('');
});

test('select should not have a disabled attr if not set as disabled', () => {
  const { getAllByLabelText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual(null);
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

  expect(onChange).toHaveBeenCalledWith(['us', 'mx', 'ca']);
});

test('multiselect should be able to deselect options', () => {
  const { getAllByLabelText } = render(MultiselectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith(['mx']);
});

test('chips should be rendered', () => {
  const { getAllByText } = render(MultiselectMock);

  expect(getAllByText('United States').length).toEqual(2);
  expect(getAllByText('Mexico').length).toEqual(2);
  expect(getAllByText('Canada').length).not.toEqual(2);
});

test('appends (optional) text to label if select is not required', () => {
  const { container } = render(
    <Select
      onChange={onChange}
      label="Countries"
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
        { value: 'fr', content: 'France', disabled: true },
      ]}
      placeholder="Choose country"
    />,
  );
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});

test('does not forward styles', () => {
  const { container, getByRole } = render(
    <Select
      className="test"
      onChange={onChange}
      label="Countries"
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
        { value: 'fr', content: 'France', disabled: true },
      ]}
      placeholder="Choose country"
      style={{ background: 'red' }}
    />,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(getByRole('listbox')).not.toHaveStyle('background: red');
});
