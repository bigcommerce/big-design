import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'jest-styled-components';
import React, { createRef } from 'react';

import { FormControlLabel, FormGroup } from '../Form';

import { Select } from './';

const onChange = jest.fn();
const onActionClick = jest.fn();
const onOpen = jest.fn();
const onClose = jest.fn();

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
    onClose={onClose}
    onOpen={onOpen}
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
    data-testid="group-select"
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
  render(SelectMock);

  const combobox = await screen.findByRole('combobox');

  expect(combobox).toBeInTheDocument();
});

test('renders select string label', async () => {
  render(SelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries).toBeInTheDocument();
});

test('renders FormControlLabel string label', async () => {
  render(
    <Select
      data-testid="select"
      label={<FormControlLabel>Countries</FormControlLabel>}
      onOptionChange={onChange}
      options={mockOptions}
    />,
  );

  const countries = await screen.findByText('Countries');

  expect(countries).toBeInTheDocument();
});

test('select label has id', async () => {
  render(SelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries.id).toBeDefined();
});

test('select label accepts custom id', async () => {
  render(
    <Select label="Countries" labelId="testId" onOptionChange={onChange} options={mockOptions} />,
  );

  const countries = await screen.findByText('Countries');

  expect(countries.id).toBe('testId');
});

test('select label has for attribute', async () => {
  render(SelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries).toHaveAttribute('for');
});

test('renders select input', async () => {
  render(SelectMock);

  const select = await screen.findByTestId('select');

  expect(select).toBeInTheDocument();
});

test('select input has id', async () => {
  render(SelectMock);

  const select = await screen.findByTestId('select');

  expect(select.id).toBeDefined();
});

test('select accepts custom id', async () => {
  render(
    <Select data-testid="select" id="testId" onOptionChange={onChange} options={mockOptions} />,
  );

  const select = await screen.findByTestId('select');

  expect(select.id).toBe('testId');
});

test('select input has placeholder text', async () => {
  render(SelectMock);

  const placeholder = await screen.findByPlaceholderText('Choose country');

  expect(placeholder).toBeInTheDocument();
});

test('select input has aria-controls', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const listbox = await screen.findByRole('listbox');

  expect(input).toHaveAttribute('aria-controls', listbox.id);
});

test('select input has autocomplete=off', async () => {
  render(SelectMock);

  const input = await screen.findByTestId('select');

  expect(input).toHaveAttribute('autocomplete', 'off');
});

test('renders input button', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  expect(button).toBeInTheDocument();
});

test('input button has aria-label', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  expect(button).toHaveAttribute('aria-label', 'toggle menu');
});

test('select menu opens when clicked on input', async () => {
  render(SelectMock);

  const input = screen.getByRole('combobox');

  const listbox = await screen.findByRole('listbox');

  expect(listbox).toBeEmptyDOMElement();

  await userEvent.click(input);

  await screen.findByRole('listbox');

  expect(listbox).not.toBeEmptyDOMElement();
});

test('select menu opens/closes when input button is clicked', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  fireEvent.click(button);

  const listbox = await screen.findByRole('listbox');

  expect(listbox).not.toBeEmptyDOMElement();

  fireEvent.click(button);

  await screen.findByRole('listbox');

  expect(listbox).toBeEmptyDOMElement();
});

test('menu should not open on focus', async () => {
  render(SelectMock);

  await userEvent.tab();

  const listbox = await screen.findByRole('listbox');

  expect(listbox).toBeEmptyDOMElement();
});

test('esc should close menu', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  await userEvent.click(input);

  const listbox = await screen.findByRole('listbox');

  expect(listbox).not.toBeEmptyDOMElement();

  await userEvent.keyboard('{Escape}');

  expect(listbox).toBeEmptyDOMElement();
});

test('select calls onFocus callback', async () => {
  const onFocus = jest.fn();

  render(<Select onFocus={onFocus} onOptionChange={onChange} options={[]} />);

  const input = screen.getByRole('combobox');

  await userEvent.click(input);

  expect(onFocus).toHaveBeenCalled();
});

test('select has items', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
});

test('select items should be unfiltered when opened', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  fireEvent.click(button);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
});

test('selected item should be highlighted when opened', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options[1]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
});

test('select input text should match the value selected', async () => {
  render(SelectMock);

  const input = await screen.findByTestId('select');

  expect(input).toHaveValue('Mexico');
});

test('select items should be filterable', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  await userEvent.tripleClick(input);

  await userEvent.keyboard('c');

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
});

test('select should select the filtered item', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  await userEvent.tripleClick(input);
  await userEvent.keyboard('c');

  expect(input).toHaveValue('c');

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);

  await userEvent.keyboard('{Enter}');

  expect(input).toHaveValue('Canada');
});

test('autoselects first matching option when filtering', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.change(input, { target: { value: 'm' } });

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(options[0]).toHaveAttribute('aria-selected', 'true');
  expect(options[1]).toHaveAttribute('aria-selected', 'false');
});

test('does not autoselect first matching option when it is disabled', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.change(input, { target: { value: 'f' } });

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(options[0]).toHaveAttribute('aria-selected', 'false');
  expect(options[1]).toHaveAttribute('aria-selected', 'true');
});

test('previous option remains selected after clearing the input value', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.change(input, { target: { value: 'ca' } });

  const canadaOption = await screen.findByRole('option', { name: 'Canada' });

  expect(canadaOption).toHaveAttribute('aria-selected', 'true');

  fireEvent.change(input, { target: { value: '' } });

  const options = await screen.findAllByRole('option');
  const mexicoOption = await screen.findByRole('option', { name: 'Mexico' });

  expect(options).toHaveLength(6);
  expect(mexicoOption).toHaveAttribute('aria-selected', 'true');
});

test('select options should immediately rerender when prop changes', async () => {
  const { rerender } = render(<Select onOptionChange={onChange} options={mockOptions} />);

  const button = await screen.findByLabelText('toggle menu');

  fireEvent.click(button);

  let options = await screen.findAllByRole('option');

  expect(options).toHaveLength(5);

  rerender(
    <Select
      onOptionChange={onChange}
      options={[
        { content: 'foo', value: 'foo' },
        { content: 'bar', value: 'bar' },
      ]}
    />,
  );

  options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
});

test('up/down arrows should change select item selection', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options[1]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });

  expect(options[2]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[2].id);

  fireEvent.keyDown(input, { key: 'ArrowUp' });
  fireEvent.keyDown(input, { key: 'ArrowUp' });

  expect(options[0]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('home should select first select item', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options[1]).toHaveAttribute('aria-selected', 'true');

  fireEvent.keyDown(input, { key: 'Home' });

  expect(options[0]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('end should select last select item', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options[1]).toHaveAttribute('aria-selected', 'true');

  fireEvent.keyDown(input, { key: 'End' });

  expect(options[5]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[5].id);
});

test('enter should trigger onOptionChange', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  fireEvent.keyDown(input, { key: 'ArrowDown' });

  await waitFor(() => {
    const options = screen.queryAllByRole('option');

    expect(options[2]).toHaveAttribute('aria-selected', 'true');
  });

  fireEvent.keyDown(input, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledWith(mockOptions[2].value, mockOptions[2]);
});

test('clicking on select options should trigger onOptionChange', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  fireEvent.click(options[3]);

  expect(onChange).toHaveBeenCalledWith(mockOptions[3].value, mockOptions[3]);
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('clicking on disabled select options should not trigger onItemClick', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  fireEvent.click(options[4]);

  expect(onChange).not.toHaveBeenCalled();
});

test('opening the Select triggers onOpen', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  fireEvent.click(button);

  expect(onOpen).toHaveBeenCalled();
});

test('closing the Select triggers onClose', async () => {
  render(SelectMock);

  const button = await screen.findByLabelText('toggle menu');

  await userEvent.click(button);

  await userEvent.click(button);

  expect(onClose).toHaveBeenCalled();
});

test('select should render select action', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  expect(await screen.findByText('Remove Country')).toBeInTheDocument();
});

test('select action should call onActionClick', async () => {
  render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  fireEvent.click(options[5]);

  expect(onActionClick).toHaveBeenCalled();
});

test('select action supports icons', async () => {
  const { container } = render(SelectMock);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  await screen.findByText('Remove Country');

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const icons = container.querySelectorAll('svg');

  expect(icons.length).toBeGreaterThan(0);
});

test('select should render an error if one is provided', async () => {
  render(
    <FormGroup>
      <Select
        error="Required"
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
        required
      />
    </FormGroup>,
  );

  expect(await screen.findByText('Required')).toBeInTheDocument();
});

test('select should have a required attr if set as required', async () => {
  render(SelectMock);

  const input = await screen.findByTestId('select');

  expect(input).toBeRequired();
});

test('select should not have a required attr if not set as required', async () => {
  render(
    <Select
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0]).not.toBeRequired();
});

test('select should have a disabled attr if set as disabled', async () => {
  render(
    <Select
      disabled
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0]).toBeDisabled();
});

test('select should not have a disabled attr if not set as disabled', async () => {
  render(SelectMock);

  const inputs = await screen.findAllByLabelText('Countries *');

  expect(inputs[0]).toBeEnabled();
});

test('appends * text to label if select is required', async () => {
  render(
    <Select
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
      required
    />,
  );

  const label = await screen.findByText(/Countries/);

  expect(label).toHaveTextContent('*');
});

test('does not forward styles', async () => {
  render(
    <Select
      className="test"
      data-testid="select"
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
      style={{ background: 'red' }}
    />,
  );

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  expect(input).not.toHaveClass('test');
  expect(await screen.findByRole('listbox')).not.toHaveStyle('background: red');
});

test('should render a non filterable select', async () => {
  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0]).toHaveAttribute('readonly', '');
});

test('should accept a maxHeight prop', async () => {
  render(
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

  const inputs = screen.getAllByLabelText('Countries');

  fireEvent.click(inputs[0]);

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(350));
});

test('should default max-height to 250', async () => {
  render(SelectMock);

  const inputs = await screen.findAllByLabelText('Countries *');

  fireEvent.click(inputs[0]);

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<HTMLInputElement>();

  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(ref.current).toEqual(inputs[0]);
});

test('should call the provided refSetter if any', async () => {
  let inputRef: HTMLInputElement | null = null;
  const refSetter = (ref: HTMLInputElement) => (inputRef = ref);

  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputRef).toEqual(inputs[0]);
});

test('options should allow icons', async () => {
  const { container } = render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  fireEvent.click(inputs[0]);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const svg = container.querySelectorAll('svg');

  expect(svg.length).toBeGreaterThanOrEqual(2);
});

test('grouped select should render group labels, render uppercased', async () => {
  render(GroupedSelectMock);

  const button = await screen.findByLabelText('toggle menu');

  await userEvent.click(button);

  const label1 = screen.getByText('Label 1');
  const label2 = screen.getByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');

  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');
});

test('group labels should be grayed out', async () => {
  render(GroupedSelectMock);

  const input = screen.getByTestId('group-select');

  fireEvent.click(input);

  const label1 = screen.getByText('Label 1');
  const label2 = screen.getByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');
});

test('group labels should be skipped when using keyboard to navigate options', async () => {
  render(GroupedSelectMock);

  const input = screen.getByTestId('group-select');

  fireEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
  expect(options[1]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[1].id);

  fireEvent.keyDown(input, { key: 'ArrowDown' });

  expect(options[2]).toHaveAttribute('aria-selected', 'true');
  expect(input).toHaveAttribute('aria-activedescendant', options[2].id);
});

test('group labels should still render when filtering options', async () => {
  render(GroupedSelectMock);

  const input = screen.getByTestId('group-select');
  const button = await screen.findByLabelText('toggle menu');

  fireEvent.click(button);

  fireEvent.change(input, { target: { value: 'm' } });

  const label1 = screen.getByText('Label 1');
  const label2 = screen.getByText('Label 2');

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
});

test('select option should supports description', async () => {
  render(SelectWithOptionsDescriptions);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  expect(await screen.findByText('US Description')).toBeInTheDocument();
});

test('select action should supports description', async () => {
  render(SelectWithOptionsDescriptions);

  const input = screen.getByTestId('select');

  fireEvent.click(input);

  expect(await screen.findByText('Action Description')).toBeInTheDocument();
});

describe('aria-labelledby', () => {
  it('should not be set if using aria-label', async () => {
    render(<Select aria-label="Countries" onOptionChange={onChange} options={mockOptions} />);

    const input = await screen.findByRole('combobox');

    expect(input).not.toHaveAttribute('aria-labelledby');
  });

  it('should set if using label', async () => {
    render(
      <Select
        label="Countries"
        labelId="countries"
        onOptionChange={onChange}
        options={mockOptions}
      />,
    );

    const input = await screen.findByRole('combobox');

    expect(input).toHaveAttribute('aria-labelledby', 'countries');
  });
});
