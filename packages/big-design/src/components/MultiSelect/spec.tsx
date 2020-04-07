import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { FormGroup } from '../Form';

import { MultiSelect } from './';

const onChange = jest.fn();
const onActionClick = jest.fn();

const mockOptions = [
  { value: 'us', content: 'United States' },
  { value: 'mx', content: 'Mexico' },
  { value: 'ca', content: 'Canada' },
  { value: 'en', content: 'England' },
  { value: 'fr', content: 'France', disabled: true },
];

const MultiSelectMock = (
  <MultiSelect
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="multi-select"
    error="Required"
    label="Countries"
    onOptionsChange={onChange}
    options={mockOptions}
    placeholder="Choose country"
    required
    value={['us', 'mx']}
  />
);

test('renders select combobox', () => {
  const { getByRole } = render(MultiSelectMock);

  expect(getByRole('combobox')).toBeInTheDocument();
});

test('renders select label', () => {
  const { getByText } = render(MultiSelectMock);

  expect(getByText('Countries')).toBeInTheDocument();
});

test('select label has id', () => {
  const { getByText } = render(MultiSelectMock);

  expect(getByText('Countries').id).toBeDefined();
});

test('select label accepts custom id', () => {
  const { getByText } = render(
    <MultiSelect onOptionsChange={onChange} label="Countries" labelId="testId" options={mockOptions} />,
  );

  expect(getByText('Countries').id).toBe('testId');
});

test('select label has for attribute', () => {
  const { getByText } = render(MultiSelectMock);

  expect(getByText('Countries').hasAttribute('for')).toBe(true);
});

test('renders select input', () => {
  const { getByTestId } = render(MultiSelectMock);

  expect(getByTestId('multi-select')).toBeInTheDocument();
});

test('select input has id', () => {
  const { getByTestId } = render(MultiSelectMock);

  expect(getByTestId('multi-select').id).toBeDefined();
});

test('select accepts custom id', () => {
  const { getByTestId } = render(
    <MultiSelect onOptionsChange={onChange} id="testId" data-testid="multi-select" options={mockOptions} />,
  );

  expect(getByTestId('multi-select').id).toBe('testId');
});

test('combobox has aria-haspopup', () => {
  const { getByRole } = render(MultiSelectMock);

  expect(getByRole('combobox').getAttribute('aria-haspopup')).toBe('listbox');
});

test('select input has placeholder text', () => {
  const { getByPlaceholderText } = render(MultiSelectMock);

  expect(getByPlaceholderText('Choose country')).toBeDefined();
});

test('select input has aria-controls', () => {
  const { getByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  fireEvent.focus(input);

  expect(input.getAttribute('aria-controls')).toBe(getByRole('listbox').id);
});

test('select input has autocomplete=no', () => {
  const { getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  expect(input.getAttribute('autocomplete')).toBe('no');
});

test('renders input button', () => {
  const { getAllByRole } = render(MultiSelectMock);

  expect(getAllByRole('button')[2]).toBeDefined();
});

test('input button has aria-label', () => {
  const { getAllByRole } = render(MultiSelectMock);

  expect(getAllByRole('button')[2].getAttribute('aria-label')).toBe('toggle menu');
});

test('multi select menu opens when focused on input', () => {
  const { getByTestId, queryByRole } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  expect(queryByRole('listbox')).toBeEmpty();

  fireEvent.focus(input);

  expect(queryByRole('listbox')).not.toBeEmpty();
});

test('multi select menu opens/closes when input button is clicked', () => {
  const { getAllByRole, queryByRole } = render(MultiSelectMock);
  const button = getAllByRole('button')[2];

  fireEvent.click(button);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.click(button);
  expect(queryByRole('listbox')).toBeEmpty();
});

test('esc should close menu', () => {
  const { getByTestId, queryByRole } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.keyDown(input, { key: 'Escape' });
  expect(queryByRole('listbox')).toBeEmpty();
});

test('blurring input should close menu', () => {
  const { getByTestId, queryByRole } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.blur(input);
  expect(queryByRole('listbox')).toBeEmpty();
});

test('multi select has items', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  expect(getAllByRole('option').length).toBe(6);
});

test('multi select items should be unfiltered when opened', () => {
  const { getAllByRole } = render(MultiSelectMock);
  const button = getAllByRole('button')[2];
  fireEvent.click(button);

  const options = getAllByRole('option');
  expect(options.length).toBe(6);
});

test('up/down arrows should change select item selection', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('home should select first select item', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  expect(options[5].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'Home' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last select item', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });

  expect(options[5].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[5].id);
});

test('enter should trigger onOptionsChange', () => {
  const { getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith([mockOptions[1].value], [mockOptions[1]]);
});

test('clicking on select options should trigger onOptionsChange', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[3]);
  expect(onChange).toHaveBeenCalledWith(
    [mockOptions[0].value, mockOptions[1].value, mockOptions[3].value],
    [mockOptions[0], mockOptions[1], mockOptions[3]],
  );
});

test('clicking on disabled select options should not trigger onItemClick', () => {
  const { getAllByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[4]);
  expect(onChange).not.toHaveBeenCalled();
});

test('select should render select action', () => {
  const { getByText, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  expect(getByText('Remove Country')).toBeInTheDocument();
});

test('select action should call onActionClick', () => {
  const { getByTestId, getAllByRole } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[5]);
  expect(onActionClick).toHaveBeenCalled();
});

test('select action supports icons', () => {
  const { getByTestId, getByText } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  fireEvent.focus(input);

  const action = getByText('Remove Country');
  expect(action.querySelector('svg')).toBeDefined();
});

test('select should render an error if one is provided', () => {
  const { getByText } = render(
    <FormGroup>
      <MultiSelect
        onOptionsChange={onChange}
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
  const { getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');

  expect(input.getAttribute('required')).toEqual('');
});

test('select should not have a required attr if not set as required', () => {
  const { getAllByLabelText } = render(
    <MultiSelect
      onOptionsChange={onChange}
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
    <MultiSelect
      disabled
      label="Countries"
      onOptionsChange={onChange}
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
  const { getAllByLabelText } = render(MultiSelectMock);

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual(null);
});

test('appends (optional) text to label if select is not required', () => {
  const { container } = render(
    <MultiSelect
      onOptionsChange={onChange}
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
    <MultiSelect
      className="test"
      onOptionsChange={onChange}
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

test('should render a non filterable select', () => {
  const { getAllByLabelText } = render(
    <MultiSelect
      filterable={false}
      label="Countries"
      onOptionsChange={onChange}
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

test('should use the passed in ref object if provided', () => {
  const ref = React.createRef<HTMLInputElement>();
  const { getAllByLabelText } = render(
    <MultiSelect
      inputRef={ref}
      label="Countries"
      onOptionsChange={onChange}
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
    <MultiSelect
      inputRef={refSetter}
      label="Countries"
      onOptionsChange={onChange}
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

test('multiselect should render four items with checkboxes', () => {
  const { getByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  const menu = getByRole('listbox');

  fireEvent.focus(input);

  const options = menu.querySelectorAll('input[type="checkbox"]');

  expect(options.length).toEqual(5);
});

test('multiselect should have two selected options', () => {
  const { getByRole, getByTestId } = render(MultiSelectMock);
  const input = getByTestId('multi-select');
  const menu = getByRole('listbox');

  fireEvent.focus(input);

  const options = menu.querySelectorAll(':checked');

  expect(options.length).toEqual(2);
});

test('multiselect should be able to select multiple options', () => {
  const { getAllByLabelText } = render(MultiSelectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith(
    [mockOptions[0].value, mockOptions[1].value, mockOptions[2].value],
    [mockOptions[0], mockOptions[1], mockOptions[2]],
  );
});

test('multiselect should be able to deselect options', () => {
  const { getAllByLabelText } = render(MultiSelectMock);

  const input = getAllByLabelText('Countries')[0];

  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith([mockOptions[1].value], [mockOptions[1]]);
});

test('multiselect options should immediately rerender when prop changes', () => {
  const { getAllByRole, getByRole, rerender } = render(
    <MultiSelect onOptionsChange={onChange} options={mockOptions} />,
  );
  const button = getByRole('button');
  fireEvent.click(button);

  let options = getAllByRole('option');
  expect(options.length).toBe(5);

  rerender(
    <MultiSelect
      onOptionsChange={onChange}
      options={[
        { content: 'foo', value: 'foo' },
        { content: 'bar', value: 'bar' },
      ]}
    />,
  );

  options = getAllByRole('option');
  expect(options.length).toBe(2);
});

test('chips should be rendered', () => {
  const { getAllByText } = render(MultiSelectMock);

  expect(getAllByText('United States').length).toEqual(1);
  expect(getAllByText('Mexico').length).toEqual(1);
});

test('options should allow icons', () => {
  const { container, getAllByLabelText } = render(
    <MultiSelect
      filterable={false}
      label="Countries"
      onOptionsChange={onChange}
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
