import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import React, { createRef } from 'react';

import { FormControlLabel, FormGroup } from '../Form';

import { MultiSelect } from './';

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
    onClose={onClose}
    onOpen={onOpen}
    onOptionsChange={onChange}
    options={mockOptions}
    placeholder="Choose country"
    required
    value={['us', 'mx']}
  />
);

const GroupedMultiSelectMock = (
  <MultiSelect
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="group-select"
    error="Required"
    label="Countries"
    onOptionsChange={onChange}
    options={groupMockOptions}
    placeholder="Choose country"
    required
    value={['mx']}
  />
);

const MultiSelectWithOptionsDescriptions = (
  <MultiSelect
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
    onOptionsChange={onChange}
    options={mockOptionsWithDescription}
    placeholder="Choose country"
    required
    value={['mx']}
  />
);

const DisabledMultiSelectMock = (
  <MultiSelect
    action={{
      actionType: 'destructive',
      content: 'Remove Country',
      icon: <DeleteIcon />,
      onActionClick,
    }}
    data-testid="multi-select"
    disabled
    error="Required"
    label="Countries"
    onClose={onClose}
    onOpen={onOpen}
    onOptionsChange={onChange}
    options={mockOptions}
    placeholder="Choose country"
    required
    value={['us', 'mx']}
  />
);

test('renders select combobox', async () => {
  render(MultiSelectMock);

  const combobox = await screen.findByRole('combobox');

  expect(combobox).toBeInTheDocument();
});

test('renders select label', async () => {
  render(MultiSelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries).toBeInTheDocument();
});

test('renders FormControlLabel string label', async () => {
  render(
    <MultiSelect
      label={<FormControlLabel>Countries</FormControlLabel>}
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

  const countries = await screen.findByText('Countries');

  expect(countries).toBeInTheDocument();
});

test('select label has id', async () => {
  render(MultiSelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries.id).toBeDefined();
});

test('select label accepts custom id', async () => {
  render(
    <MultiSelect
      label="Countries"
      labelId="testId"
      onOptionsChange={onChange}
      options={mockOptions}
    />,
  );

  const countries = await screen.findByText('Countries');

  expect(countries.id).toBe('testId');
});

test('select label has for attribute', async () => {
  render(MultiSelectMock);

  const countries = await screen.findByText('Countries');

  expect(countries.hasAttribute('for')).toBe(true);
});

test('renders select input', async () => {
  render(MultiSelectMock);

  const select = await screen.findByTestId('multi-select');

  expect(select).toBeInTheDocument();
});

test('select input has id', async () => {
  render(MultiSelectMock);

  const select = await screen.findByTestId('multi-select');

  expect(select.id).toBeDefined();
});

test('select accepts custom id', async () => {
  render(
    <MultiSelect
      data-testid="multi-select"
      id="testId"
      onOptionsChange={onChange}
      options={mockOptions}
    />,
  );

  const select = await screen.findByTestId('multi-select');

  expect(select.id).toBe('testId');
});

test('select input has placeholder text', async () => {
  render(MultiSelectMock);

  const placeholder = await screen.findByPlaceholderText('Choose country');

  expect(placeholder).toBeDefined();
});

test('select input has aria-controls', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const listbox = await screen.findByRole('listbox');

  expect(input.getAttribute('aria-controls')).toBe(listbox.id);
});

test('select input has autocomplete=off', async () => {
  render(MultiSelectMock);

  const select = await screen.findByTestId('multi-select');

  expect(select.getAttribute('autocomplete')).toBe('off');
});

test('renders input button', async () => {
  render(MultiSelectMock);

  const button = await screen.findByLabelText('toggle menu');

  expect(button).toBeInTheDocument();
});

test('multi select menu opens/closes when input button is clicked', async () => {
  render(MultiSelectMock);

  const button = await screen.findByRole('button', { name: 'toggle menu' });

  await userEvent.click(button);

  const listbox = await screen.findByRole('listbox');

  expect(listbox).not.toBeEmptyDOMElement();

  await userEvent.click(button);

  await screen.findByRole('listbox');

  expect(listbox).toBeEmptyDOMElement();
});

test('esc should close menu', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const listbox = await screen.findByRole('listbox');

  expect(listbox).not.toBeEmptyDOMElement();

  await userEvent.keyboard('{escape}');

  await screen.findByRole('listbox');

  expect(listbox).toBeEmptyDOMElement();
});

test('multi select has items', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
});

test('multi select items should be unfiltered when opened', async () => {
  render(MultiSelectMock);

  const button = await screen.findByLabelText('toggle menu');

  await userEvent.click(button);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
});

test('up/down arrows should change select item selection', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);

  await userEvent.keyboard('{arrowdown}');

  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  await userEvent.keyboard(`{arrowup}`);

  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('home should select first select item', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  await userEvent.keyboard('{arrowup}');

  expect(options[5].getAttribute('aria-selected')).toBe('true');

  await userEvent.keyboard('{home}');

  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last select item', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  await userEvent.keyboard('{arrowdown}');

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  await userEvent.keyboard('{end}');

  expect(options[5].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[5].id);
});

test('enter should trigger onOptionsChange', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);
  await userEvent.keyboard('{arrowdown}{enter}');

  expect(onChange).toHaveBeenCalledWith([mockOptions[0].value], [mockOptions[0]]);
});

test('clicking on select options should trigger onOptionsChange', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  await userEvent.click(options[3]);

  expect(onChange).toHaveBeenCalledWith(
    [mockOptions[0].value, mockOptions[1].value, mockOptions[3].value],
    [mockOptions[0], mockOptions[1], mockOptions[3]],
  );
});

test('clicking on disabled select options should not trigger onItemClick', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  await userEvent.click(options[4]);

  expect(onChange).not.toHaveBeenCalled();
});

test('opening the MultiSelect triggers onOpen', async () => {
  render(MultiSelectMock);

  const button = await screen.findByLabelText('toggle menu');

  await userEvent.click(button);

  expect(onOpen).toHaveBeenCalled();
});

test('closing the MultiSelect triggers onClose', async () => {
  render(MultiSelectMock);

  const button = await screen.findByLabelText('toggle menu');

  await userEvent.dblClick(button);

  expect(onClose).toHaveBeenCalled();
});

test('select should render select action', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  expect(await screen.findByText('Remove Country')).toBeInTheDocument();
});

test('select action should call onActionClick', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  await userEvent.click(options[5]);

  expect(onActionClick).toHaveBeenCalled();
});

test('select action supports icons', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const action = await screen.findByText('Remove Country');

  expect(action.querySelector('svg')).toBeDefined();
});

test('select should render an error if one is provided', async () => {
  render(
    <FormGroup>
      <MultiSelect
        error="Required"
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
        required
      />
    </FormGroup>,
  );

  expect(await screen.findByText('Required')).toBeInTheDocument();
});

test('select should have a required attr if set as required', async () => {
  render(
    <MultiSelect
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
      required
    />,
  );

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0].getAttribute('required')).toBe('');
});

test('select should not have a required attr if not set as required', async () => {
  render(
    <MultiSelect
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0].getAttribute('required')).toBeNull();
});

test('required attr should be removed when item is selected', async () => {
  render(MultiSelectMock);

  const input = await screen.findByTestId('multi-select');

  expect(input.getAttribute('required')).toBeNull();
});

test('select should have a disabled attr if set as disabled', async () => {
  render(
    <MultiSelect
      disabled
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0].getAttribute('disabled')).toBe('');
});

test('select should not have a disabled attr if not set as disabled', async () => {
  render(MultiSelectMock);

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0].getAttribute('disabled')).toBeNull();
});

test('appends (optional) text to label if select is not required', async () => {
  render(
    <MultiSelect
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

  const label = await screen.findByText('Countries');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});

test('does not forward styles', async () => {
  render(
    <MultiSelect
      className="test"
      data-testid="multi-select"
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
      style={{ background: 'red' }}
    />,
  );

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  expect(input.getElementsByClassName('test')).toHaveLength(0);
  expect(await screen.findByRole('listbox')).not.toHaveStyle('background: red');
});

test('should render a non filterable select', async () => {
  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputs[0].getAttribute('readonly')).toBe('');
});

test('should accept a maxHeight prop', async () => {
  render(
    <MultiSelect
      label="Countries"
      maxHeight={350}
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

  const inputs = screen.getAllByLabelText('Countries');

  await userEvent.click(inputs[0]);

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(350));
});

test('should default max-height to 250', async () => {
  render(MultiSelectMock);

  const inputs = await screen.findAllByLabelText('Countries');

  await userEvent.click(inputs[0]);

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<HTMLInputElement>();

  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(ref.current).toEqual(inputs[0]);
});

test('should call the provided refSetter if any', async () => {
  let inputRef: HTMLInputElement | null = null;
  const refSetter = (ref: HTMLInputElement) => (inputRef = ref);

  render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  expect(inputRef).toEqual(inputs[0]);
});

test('multiselect should render four items with checkboxes', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const menu = await screen.findByRole('listbox');
  const options = menu.querySelectorAll('input[type="checkbox"]');

  expect(options).toHaveLength(5);
});

test('multiselect should have two selected options', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.click(input);

  const menu = await screen.findByRole('listbox');
  const options = menu.querySelectorAll(':checked');

  expect(options).toHaveLength(2);
});

test('multiselect should be able to select multiple options', async () => {
  render(MultiSelectMock);

  const input = screen.getAllByLabelText('Countries')[0];

  await userEvent.click(input);
  await userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}{enter}');

  expect(onChange).toHaveBeenCalledWith(
    [mockOptions[0].value, mockOptions[1].value, mockOptions[3].value],
    [mockOptions[0], mockOptions[1], mockOptions[3]],
  );
});

test('multiselect should be able to deselect options', async () => {
  render(MultiSelectMock);

  const inputs = await screen.findAllByLabelText('Countries');

  await userEvent.click(inputs[0]);
  await userEvent.keyboard('{arrowdown}{enter}');

  expect(onChange).toHaveBeenCalledWith([mockOptions[0].value], [mockOptions[0]]);
});

test('multiselect options should immediately rerender when prop changes', async () => {
  const { rerender } = render(<MultiSelect onOptionsChange={onChange} options={mockOptions} />);

  const button = await screen.findByRole('button');

  await userEvent.click(button);

  let options = await screen.findAllByRole('option');

  expect(options).toHaveLength(5);

  rerender(
    <MultiSelect
      onOptionsChange={onChange}
      options={[
        { content: 'foo', value: 'foo' },
        { content: 'bar', value: 'bar' },
      ]}
    />,
  );

  options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
});

test('chips should be rendered', async () => {
  render(MultiSelectMock);

  expect(await screen.findAllByText('United States')).toHaveLength(1);
  expect(await screen.findAllByText('Mexico')).toHaveLength(1);

  expect(
    await screen.getByRole('button', {
      name: /remove united states/i,
    }),
  ).toBeDefined();
  expect(
    await screen.getByRole('button', {
      name: /remove mexico/i,
    }),
  ).toBeDefined();
});

test('chips should be rendered without close button when MultiSelect is disabled', async () => {
  render(DisabledMultiSelectMock);

  await screen.findAllByText('United States');
  await screen.findAllByText('Mexico');

  expect(
    await screen.queryByRole('button', {
      name: /remove united states/i,
    }),
  ).toBeNull();

  expect(
    await screen.queryByRole('button', {
      name: /remove mexico/i,
    }),
  ).toBeNull();
});

test('options should allow icons', async () => {
  const { container } = render(
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

  const inputs = await screen.findAllByLabelText('Countries');

  await userEvent.click(inputs[0]);

  const svg = container.querySelectorAll('svg');

  expect(svg).toHaveLength(3);
});

test('grouped multiselect should render group labels, render uppercased', async () => {
  render(GroupedMultiSelectMock);

  const inputs = await screen.findAllByLabelText('Countries');

  await userEvent.click(inputs[0]);

  const label1 = await screen.findByText('Label 1');
  const label2 = await screen.findByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');
});

test('group labels should be grayed out', async () => {
  render(GroupedMultiSelectMock);

  const input = await screen.findByTestId('group-select');

  await userEvent.click(input);

  const label1 = await screen.findByText('Label 1');
  const label2 = await screen.findByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');
});

test('group labels should be skipped when using keyboard to navigate options', async () => {
  render(GroupedMultiSelectMock);

  const input = screen.getByTestId('group-select');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
  expect(options[0].getAttribute('aria-selected')).toBe('true');

  await userEvent.keyboard('{arrowdown}');

  expect(options[1].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[1].id);

  await userEvent.keyboard('{arrowdown}{arrowdown}');

  expect(options[3].getAttribute('aria-selected')).toBe('true');
  expect(input.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('group labels should still render when filtering options', async () => {
  render(GroupedMultiSelectMock);

  const input = await screen.findByTestId('group-select');

  await userEvent.type(input, 'm');

  const label1 = await screen.findByText('Label 1');
  const label2 = await screen.findByText('Label 2');
  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
});

test('autoselects first matching option when filtering', async () => {
  render(MultiSelectMock);

  const input = await screen.findByTestId('multi-select');

  await userEvent.type(input, 'm');

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(options[1].getAttribute('aria-selected')).toBe('false');
});

test('does not autoselect first matching option when it is disabled', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.type(input, 'f');

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
  expect(options[0].getAttribute('aria-selected')).toBe('false');
  expect(options[1].getAttribute('aria-selected')).toBe('true');
});

test('after clearing the input value, first option is always selected', async () => {
  render(MultiSelectMock);

  const input = screen.getByTestId('multi-select');

  await userEvent.clear(input);
  await userEvent.type(input, 'Can');

  const canadaOption = await screen.findByRole('option', { name: 'Canada' });

  expect(canadaOption.getAttribute('aria-selected')).toBe('true');

  await userEvent.clear(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(6);
  expect(options[0].getAttribute('aria-selected')).toBe('true');
});

test('select option should supports description', async () => {
  render(MultiSelectWithOptionsDescriptions);

  const input = await screen.findByTestId('select');

  await userEvent.click(input);

  expect(await screen.findByText('US Description')).toBeInTheDocument();
});

test('select action should supports description', async () => {
  render(MultiSelectWithOptionsDescriptions);

  const input = await screen.findByTestId('select');

  await userEvent.click(input);

  expect(await screen.findByText('Action Description')).toBeInTheDocument();
});

describe('aria-labelledby', () => {
  it('should not be set if using aria-label', async () => {
    render(<MultiSelect aria-label="Countries" onOptionsChange={onChange} options={mockOptions} />);

    const input = await screen.findByRole('combobox');

    expect(input).not.toHaveAttribute('aria-labelledby');
  });

  it('should set if using label', async () => {
    render(
      <MultiSelect
        label="Countries"
        labelId="countries"
        onOptionsChange={onChange}
        options={mockOptions}
      />,
    );

    const input = await screen.findByRole('combobox');

    expect(input).toHaveAttribute('aria-labelledby', 'countries');
  });
});
