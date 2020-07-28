import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React, { createRef } from 'react';

import { FormControlLabel, FormGroup } from '../Form';

import { Select } from './';

const onChange = jest.fn();
const onActionClick = jest.fn();

const mockOptions = [
  { value: 'us', content: 'United States' },
  { value: 'mx', content: 'Mexico' },
  { value: 'ca', content: 'Canada' },
  { value: 'en', content: 'England' },
  { value: 'fr', content: 'France', disabled: true },
];

const groupMockOptions = [
  {
    label: 'Label 1',
    options: [
      { value: 'us', content: 'United States' },
      { value: 'mx', content: 'Mexico' },
    ],
  },
  {
    label: 'Label 2',
    options: [
      { value: 'ca', content: 'Canada' },
      { value: 'en', content: 'England' },
      { value: 'fr', content: 'France', disabled: true },
    ],
  },
];

const mockOptionsWithDescription = [
  { value: 'us', content: 'United States', description: 'US Description' },
  { value: 'mx', content: 'Mexico', description: 'MX Description' },
  { value: 'fr', content: 'France', disabled: true, description: 'FR Description' },
];

const SelectMock = (
  <Select
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="select"
    error="Required"
    label="Countries"
    onOptionChange={onChange}
    options={mockOptions}
    placeholder="Choose country"
    required
    value="mx"
  />
);

const GroupedSelectMock = (
  <Select
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="groupSelect"
    error="Required"
    label="Countries"
    onOptionChange={onChange}
    options={groupMockOptions}
    placeholder="Choose country"
    required
    value="mx"
  />
);

const SelectWithOptionsDescriptions = (
  <Select
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      description: 'Action Description',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="select"
    error="Required"
    label="Countries"
    onOptionChange={onChange}
    options={mockOptionsWithDescription}
    placeholder="Choose country"
    required
    value="mx"
  />
);

test('renders select combobox', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('combobox')).toBeInTheDocument();
});

test('renders select string label', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries')).toBeInTheDocument();
});

test('renders FormControlLabel string label', () => {
  const { getByText } = render(
    <Select
      label={<FormControlLabel>Countries</FormControlLabel>}
      onOptionChange={onChange}
      id="testId"
      data-testid="select"
      options={mockOptions}
    />,
  );

  expect(getByText('Countries')).toBeInTheDocument();
});

test('select label has id', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').id).toBeDefined();
});

test('select label accepts custom id', () => {
  const { getByText } = render(
    <Select onOptionChange={onChange} label="Countries" labelId="testId" options={mockOptions} />,
  );

  expect(getByText('Countries').id).toBe('testId');
});

test('select label has for attribute', () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').hasAttribute('for')).toBe(true);
});

test('renders select input', () => {
  const { getByTestId } = render(SelectMock);

  expect(getByTestId('select')).toBeInTheDocument();
});

test('select input has id', () => {
  const { getByTestId } = render(SelectMock);

  expect(getByTestId('select').id).toBeDefined();
});

test('select accepts custom id', () => {
  const { getByTestId } = render(
    <Select onOptionChange={onChange} id="testId" data-testid="select" options={mockOptions} />,
  );

  expect(getByTestId('select').id).toBe('testId');
});

test('combobox has aria-haspopup', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('combobox').getAttribute('aria-haspopup')).toBe('listbox');
});

test('select input has placeholder text', () => {
  const { getByPlaceholderText } = render(SelectMock);

  expect(getByPlaceholderText('Choose country')).toBeDefined();
});

test('select input has aria-controls', () => {
  const { getByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);

  expect(input.getAttribute('aria-controls')).toBe(getByRole('listbox').id);
});

test('select input has autocomplete=no', () => {
  const { getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  expect(input.getAttribute('autocomplete')).toBe('no');
});

test('renders input button', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button')).toBeDefined();
});

test('input button has aria-label', () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button').getAttribute('aria-label')).toBe('toggle menu');
});

test('select menu opens when focused on input', () => {
  const { getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  expect(queryByRole('listbox')).not.toBeInTheDocument();

  fireEvent.focus(input);

  expect(queryByRole('listbox')).toBeInTheDocument();
});

test('select menu opens/closes when input button is clicked', () => {
  const { getByRole, queryByRole } = render(SelectMock);
  const button = getByRole('button');
  fireEvent.click(button);
  expect(queryByRole('listbox')).toBeInTheDocument;

  fireEvent.click(button);
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('esc should close menu', () => {
  const { getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).toBeInTheDocument();

  fireEvent.keyDown(input, { key: 'Escape' });
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('blurring input should close menu', () => {
  const { getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).toBeInTheDocument();

  fireEvent.blur(input);
  expect(queryByRole('listbox')).not.toBeInTheDocument();
});

test('select has items', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getAllByRole('option').length).toBe(6);
});

test('select items should be unfiltered when opened', () => {
  const { getAllByRole, getByRole } = render(SelectMock);
  const button = getByRole('button');
  fireEvent.click(button);

  const options = getAllByRole('option');
  expect(options.length).toBe(6);
});

test('selected item should be highlighted when opened', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);
});

test('select input text should match the value selected', () => {
  const { getByTestId } = render(SelectMock);

  const input = getByTestId('select');

  expect(input.getAttribute('value')).toEqual('Mexico');
});

test('select items should be filterable', () => {
  const { getAllByRole, getByTestId, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getByTestId('select'), { target: { value: 'm' } });

  const options = getAllByRole('option');

  expect(options.length).toBe(2);
});

test('select options should immediately rerender when prop changes', () => {
  const { getAllByRole, getByRole, rerender } = render(<Select onOptionChange={onChange} options={mockOptions} />);
  const button = getByRole('button');
  fireEvent.click(button);

  let options = getAllByRole('option');
  expect(options.length).toBe(5);

  rerender(
    <Select
      onOptionChange={onChange}
      options={[
        { content: 'foo', value: 'foo' },
        { content: 'bar', value: 'bar' },
      ]}
    />,
  );

  options = getAllByRole('option');
  expect(options.length).toBe(2);
});

test('up/down arrows should change select item selection', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[2].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[2].id);

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('home should select first select item', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'Home' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last select item', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });

  expect(options[5].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[5].id);
});

test('enter should trigger onOptionChange', () => {
  const { getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith(mockOptions[2].value, mockOptions[2]);
});

test('clicking on select options should trigger onOptionChange', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[3]);
  expect(onChange).toHaveBeenCalledWith(mockOptions[3].value, mockOptions[3]);
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('clicking on disabled select options should not trigger onItemClick', () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[4]);
  expect(onChange).not.toHaveBeenCalled();
});

test('select should render select action', () => {
  const { getByText, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('Remove Country')).toBeInTheDocument();
});

test('select action should call onActionClick', () => {
  const { getByTestId, getAllByRole } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[5]);
  expect(onActionClick).toHaveBeenCalled();
});

test('select action supports icons', () => {
  const { getByTestId, getByText } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const action = getByText('Remove Country');
  expect(action.querySelector('svg')).toBeDefined();
});

test('select should render an error if one is provided', () => {
  const { getByText } = render(
    <FormGroup>
      <Select
        onOptionChange={onChange}
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
    </FormGroup>,
  );

  expect(getByText('Required')).toBeInTheDocument();
});

test('select should have a required attr if set as required', () => {
  const { getByTestId } = render(SelectMock);

  const input = getByTestId('select');

  expect(input.getAttribute('required')).toEqual('');
});

test('select should not have a required attr if not set as required', () => {
  const { getAllByLabelText } = render(
    <Select
      onOptionChange={onChange}
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
      onOptionChange={onChange}
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

test('appends (optional) text to label if select is not required', () => {
  const { container } = render(
    <Select
      onOptionChange={onChange}
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
  const { container, getByRole, getByTestId } = render(
    <Select
      className="test"
      onOptionChange={onChange}
      data-testid="select"
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

  const input = getByTestId('select');

  fireEvent.focus(input);
  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(getByRole('listbox')).not.toHaveStyle('background: red');
});

test('should render a non filterable select', () => {
  const { getAllByLabelText } = render(
    <Select
      filterable={false}
      label="Countries"
      onOptionChange={onChange}
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

  const input = getAllByLabelText('Countries')[0];
  expect(input.getAttribute('readonly')).toBe('');
});

test('should accept a maxHeight prop', () => {
  const { getAllByLabelText, getByRole } = render(
    <Select
      label="Countries"
      maxHeight={350}
      onOptionChange={onChange}
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

  const input = getAllByLabelText('Countries')[0];
  fireEvent.focus(input);

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(350));
});

test('should default max-height to 250', () => {
  const { getAllByLabelText, getByRole } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];
  fireEvent.focus(input);

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('should use the passed in ref object if provided', () => {
  const ref = createRef<HTMLInputElement>();
  const { getAllByLabelText } = render(
    <Select
      inputRef={ref}
      label="Countries"
      onOptionChange={onChange}
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

  const input = getAllByLabelText('Countries')[0];

  expect(ref.current).toEqual(input);
});

test('should call the provided refSetter if any', () => {
  let inputRef: HTMLInputElement | null = null;
  const refSetter = (ref: HTMLInputElement) => (inputRef = ref);
  const { getAllByLabelText } = render(
    <Select
      inputRef={refSetter}
      label="Countries"
      onOptionChange={onChange}
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

  const input = getAllByLabelText('Countries')[0];

  expect(inputRef).toEqual(input);
});

test('options should allow icons', () => {
  const { container, getAllByLabelText } = render(
    <Select
      filterable={false}
      label="Countries"
      onOptionChange={onChange}
      options={[
        { value: 'us', content: 'United States', icon: <ArrowForwardIcon /> },
        { value: 'mx', content: 'Mexico', icon: <ArrowBackIcon /> },
      ]}
      placeholder="Choose country"
    />,
  );

  const input = getAllByLabelText('Countries')[0];
  fireEvent.focus(input);

  const svg = container.querySelectorAll('svg');
  expect(svg.length).toBe(3);
});

test('grouped select should render group labels, render uppercased', () => {
  const { getByRole, getByText } = render(GroupedSelectMock);

  const button = getByRole('button');

  fireEvent.click(button);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');
});

test('group labels should be grayed out', () => {
  const { getByTestId, getByText } = render(GroupedSelectMock);
  const input = getByTestId('groupSelect');
  fireEvent.focus(input);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');
});

test('group labels should be skipped when using keyboard to navigate options', () => {
  const { getAllByRole, getByTestId } = render(GroupedSelectMock);
  const input = getByTestId('groupSelect');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options.length).toBe(6);
  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[2].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[2].id);
});

test('group labels should still render when filtering options', () => {
  const { getAllByRole, getByRole, getByTestId, getByText } = render(GroupedSelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getByTestId('groupSelect'), { target: { value: 'm' } });

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');
  const options = getAllByRole('option');

  expect(options.length).toBe(2);
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
});

test('select option should supports description', () => {
  const { getByText, getByTestId } = render(SelectWithOptionsDescriptions);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('US Description')).toBeInTheDocument();
});

test('select action should supports description', () => {
  const { getByText, getByTestId } = render(SelectWithOptionsDescriptions);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('Action Description')).toBeInTheDocument();
});
