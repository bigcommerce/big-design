import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import 'jest-styled-components';
import React, { createRef } from 'react';
import { act } from 'react-dom/test-utils';

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

test('renders select combobox', async () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('combobox')).toBeInTheDocument();
  await waitForElement(() => getByRole('combobox'));
});

test('renders select string label', async () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries')).toBeInTheDocument();
  await waitForElement(() => getByText('Countries'));
});

test('renders FormControlLabel string label', async () => {
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
  await waitForElement(() => getByText('Countries'));
});

test('select label has id', async () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').id).toBeDefined();
  await waitForElement(() => getByText('Countries'));
});

test('select label accepts custom id', async () => {
  const { getByText } = render(
    <Select onOptionChange={onChange} label="Countries" labelId="testId" options={mockOptions} />,
  );

  expect(getByText('Countries').id).toBe('testId');
  await waitForElement(() => getByText('Countries'));
});

test('select label has for attribute', async () => {
  const { getByText } = render(SelectMock);

  expect(getByText('Countries').hasAttribute('for')).toBe(true);
  await waitForElement(() => getByText('Countries'));
});

test('renders select input', async () => {
  const { getByTestId } = render(SelectMock);

  expect(getByTestId('select')).toBeInTheDocument();
  await waitForElement(() => getByTestId('select'));
});

test('select input has id', async () => {
  const { getByTestId } = render(SelectMock);

  expect(getByTestId('select').id).toBeDefined();
  await waitForElement(() => getByTestId('select'));
});

test('select accepts custom id', async () => {
  const { getByTestId } = render(
    <Select onOptionChange={onChange} id="testId" data-testid="select" options={mockOptions} />,
  );

  expect(getByTestId('select').id).toBe('testId');
  await waitForElement(() => getByTestId('select'));
});

test('combobox has aria-haspopup', async () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('combobox').getAttribute('aria-haspopup')).toBe('listbox');
  await waitForElement(() => getByRole('combobox'));
});

test('select input has placeholder text', async () => {
  const { getByPlaceholderText } = render(SelectMock);

  expect(getByPlaceholderText('Choose country')).toBeDefined();
  await waitForElement(() => getByPlaceholderText('Choose country'));
});

test('select input has aria-controls', async () => {
  const { getByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);

  expect(input.getAttribute('aria-controls')).toBe(getByRole('listbox').id);
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select input has autocomplete=no', async () => {
  const { getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  expect(input.getAttribute('autocomplete')).toBe('no');
  await waitForElement(() => getByTestId('select'));
});

test('renders input button', async () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button')).toBeDefined();
  await waitForElement(() => getByRole('button'));
});

test('input button has aria-label', async () => {
  const { getByRole } = render(SelectMock);

  expect(getByRole('button').getAttribute('aria-label')).toBe('toggle menu');
  await waitForElement(() => getByRole('button'));
});

test('select menu opens when focused on input', async () => {
  const { getByRole, getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  expect(queryByRole('listbox')).toBeEmptyDOMElement();

  fireEvent.focus(input);

  expect(queryByRole('listbox')).not.toBeEmptyDOMElement();
  await waitForElement(() => getByRole('option', { name: /mex/i }));
});

test('select menu opens/closes when input button is clicked', async () => {
  const { getByRole, queryByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);

  fireEvent.click(button);
  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('esc should close menu', async () => {
  const { getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toBeEmptyDOMElement();

  fireEvent.keyDown(input, { key: 'Escape' });
  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('blurring input should close menu', async () => {
  const { getByTestId, queryByRole } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);
  expect(queryByRole('listbox')).not.toBeEmptyDOMElement();

  fireEvent.blur(input);
  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('select has items', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getAllByRole('option').length).toBe(6);
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select items should be unfiltered when opened', async () => {
  const { getAllByRole, getByRole } = render(SelectMock);
  const button = getByRole('button');
  fireEvent.click(button);

  const options = getAllByRole('option');
  expect(options.length).toBe(6);
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('selected item should be highlighted when opened', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select input text should match the value selected', async () => {
  const { getByTestId } = render(SelectMock);

  const input = getByTestId('select');

  expect(input.getAttribute('value')).toEqual('Mexico');
  await waitForElement(() => screen.getByTestId('select'));
});

test('select items should be filterable', async () => {
  const { getAllByRole, getByTestId, getByRole } = render(SelectMock);
  const button = getByRole('button');

  fireEvent.click(button);
  fireEvent.change(getByTestId('select'), { target: { value: 'm' } });

  const options = getAllByRole('option');

  expect(options.length).toBe(2);
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select options should immediately rerender when prop changes', async () => {
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
  await waitForElement(() => screen.getByRole('option', { name: /foo/i }));
});

test('up/down arrows should change select item selection', async () => {
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

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('home should select first select item', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'Home' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('end should select last select item', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);

  const options = getAllByRole('option');

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(input, { key: 'End' });
  expect(options[5].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[5].id);

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('enter should trigger onOptionChange', async () => {
  const { getByTestId } = render(SelectMock);
  const input = getByTestId('select');

  fireEvent.focus(input);

  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith(mockOptions[2].value, mockOptions[2]);
  await waitForElement(() => screen.getByTestId('select'));
});

test('clicking on select options should trigger onOptionChange', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[3]);
  expect(onChange).toHaveBeenCalledWith(mockOptions[3].value, mockOptions[3]);
  expect(onChange).toHaveBeenCalledTimes(1);
  await waitForElement(() => screen.getByTestId('select'));
});

test('clicking on disabled select options should not trigger onItemClick', async () => {
  const { getAllByRole, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[4]);
  expect(onChange).not.toHaveBeenCalled();

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select should render select action', async () => {
  const { getByText, getByTestId } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('Remove Country')).toBeInTheDocument();
  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select action should call onActionClick', async () => {
  const { getByTestId, getAllByRole } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const options = getAllByRole('option');
  fireEvent.click(options[5]);
  expect(onActionClick).toHaveBeenCalled();
  await waitForElement(() => screen.getByTestId('select'));
});

test('select action supports icons', async () => {
  const { getByTestId, getByText } = render(SelectMock);
  const input = getByTestId('select');
  fireEvent.focus(input);

  const action = getByText('Remove Country');
  expect(action.querySelector('svg')).toBeDefined();

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select should render an error if one is provided', async () => {
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
  await waitForElement(() => screen.getByText('Required'));
});

test('select should have a required attr if set as required', async () => {
  const { getByTestId } = render(SelectMock);

  const input = getByTestId('select');

  expect(input.getAttribute('required')).toEqual('');
  await waitForElement(() => screen.getByTestId('select'));
});

test('select should not have a required attr if not set as required', async () => {
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
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('select should have a disabled attr if set as disabled', async () => {
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
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('select should not have a disabled attr if not set as disabled', async () => {
  const { getAllByLabelText } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];

  expect(input.getAttribute('disabled')).toEqual(null);
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('appends (optional) text to label if select is not required', async () => {
  const { getByText } = render(
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
  const label = getByText('Countries');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
  await waitForElement(() => screen.getByText('Countries'));
});

test('does not forward styles', async () => {
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

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('should render a non filterable select', async () => {
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
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('should accept a maxHeight prop', async () => {
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
  act(() => {
    fireEvent.focus(input);
  });

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(350));

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('should default max-height to 250', async () => {
  const { getAllByLabelText, getByRole } = render(SelectMock);

  const input = getAllByLabelText('Countries')[0];
  act(() => {
    fireEvent.focus(input);
  });

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(250));

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('should use the passed in ref object if provided', async () => {
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
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('should call the provided refSetter if any', async () => {
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
  await waitForElement(() => screen.getAllByLabelText('Countries'));
});

test('options should allow icons', async () => {
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
      value="mx"
    />,
  );

  const input = getAllByLabelText('Countries')[0];
  fireEvent.focus(input);

  const svg = container.querySelectorAll('svg');
  expect(svg.length).toBe(5);

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('grouped select should render group labels, render uppercased', async () => {
  const { getByRole, getByText } = render(GroupedSelectMock);

  const button = getByRole('button');

  fireEvent.click(button);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('group labels should be grayed out', async () => {
  const { getByTestId, getByText } = render(GroupedSelectMock);
  const input = getByTestId('groupSelect');
  fireEvent.focus(input);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('group labels should be skipped when using keyboard to navigate options', async () => {
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

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('group labels should still render when filtering options', async () => {
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

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select option should supports description', async () => {
  const { getByText, getByTestId } = render(SelectWithOptionsDescriptions);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('US Description')).toBeInTheDocument();

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});

test('select action should supports description', async () => {
  const { getByText, getByTestId } = render(SelectWithOptionsDescriptions);
  const input = getByTestId('select');
  fireEvent.focus(input);

  expect(getByText('Action Description')).toBeInTheDocument();

  await waitForElement(() => screen.getByRole('option', { name: /mex/i }));
});
