import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef, Ref } from 'react';
import 'jest-styled-components';

import { Button } from '../Button';
import {
  Form,
  FormControlDescription,
  FormControlError,
  FormControlLabel,
  FormGroup,
} from '../Form';

import { Counter, CounterProps } from './index';

interface MockCounterProps extends CounterProps {
  dataTestId?: string;
  ref?: Ref<HTMLInputElement>;
}

const val = 5;

const handleChange = jest.fn((num) => num);

const requiredAttributes = {
  value: val,
  onCountChange: handleChange,
};

const counterMock = ({
  ref,
  label = 'Label',
  labelId = '',
  localization,
  id = '',
  error = '',
  description = '',
  value,
  onCountChange,
  min = 0,
  max = 10,
  dataTestId = '',
  required = false,
}: MockCounterProps) => (
  <Counter
    data-testid={dataTestId}
    description={description}
    error={error}
    id={id}
    label={label}
    labelId={labelId}
    localization={localization}
    max={max}
    min={min}
    onCountChange={onCountChange}
    ref={ref}
    required={required}
    value={value}
  />
);

test('forwards ref', async () => {
  const ref = createRef<HTMLInputElement>();

  render(counterMock({ ref, ...requiredAttributes }));

  const counter = await screen.findByRole('textbox');

  expect(ref.current).toBe(counter);
});

test('renders a counter as an input tag', async () => {
  render(counterMock(requiredAttributes));

  const counter = await screen.findByRole('textbox');

  expect(counter).toBeInTheDocument();
});

test('renders a counter with matched label', async () => {
  render(counterMock({ label: 'Test Label', ...requiredAttributes }));

  const label = await screen.findByLabelText<HTMLLabelElement>('Test Label');

  // This one checks for matching id and htmlFor
  expect(label).toBeInTheDocument();
});

test('create unique ids if not provided', async () => {
  render(
    <>
      {counterMock({ dataTestId: 'item1', label: 'Test Label', ...requiredAttributes })}
      {counterMock({ dataTestId: 'item2', label: 'Test Label', ...requiredAttributes })}
    </>,
  );

  const item1 = await screen.findByTestId<HTMLInputElement>('item1');
  const item2 = await screen.findByTestId<HTMLInputElement>('item2');

  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', async () => {
  render(counterMock({ id: 'test', label: 'Test Label', ...requiredAttributes }));

  const counter = await screen.findByLabelText('Test Label');

  expect(counter.id).toBe('test');
});

test('matches label htmlFor with id provided', async () => {
  render(counterMock({ id: 'test', label: 'Test Label', ...requiredAttributes }));

  const label = await screen.findByText<HTMLLabelElement>('Test Label');

  expect(label.htmlFor).toBe('test');
});

test('respects provided labelId', async () => {
  render(counterMock({ label: 'Test Label', labelId: 'test', ...requiredAttributes }));

  const label = await screen.findByText<HTMLLabelElement>('Test Label');

  expect(label.id).toBe('test');
});

test('renders a description', async () => {
  const descriptionText = 'This is a description';

  render(counterMock({ description: descriptionText, ...requiredAttributes }));

  const description = await screen.findByText(descriptionText);

  expect(description).toBeInTheDocument();
});

test('renders an error', async () => {
  const errorText = 'This is an error';

  render(<FormGroup>{counterMock({ error: errorText, ...requiredAttributes })}</FormGroup>);

  const error = await screen.findByText(errorText);

  expect(error).toBeInTheDocument();
});

test('accepts a Label Component', async () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlLabel>
  );

  render(counterMock({ label: CustomLabel, ...requiredAttributes }));

  const label = await screen.findByTestId('test');

  expect(label).toBeInTheDocument();
});

test('does not accept non-Label Components', () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(counterMock({ label: NotALabel, ...requiredAttributes }));

  const maybeLabel = screen.queryByTestId('test');

  expect(maybeLabel).not.toBeInTheDocument();
});

test('accepts a Description Component', async () => {
  const CustomDescription = (
    <FormControlDescription>
      This is a custom Description
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlDescription>
  );

  render(counterMock({ description: CustomDescription, ...requiredAttributes }));

  const description = await screen.findByTestId('test');

  expect(description).toBeInTheDocument();
});

test('does not accept non-Description Components', () => {
  const NotADescription = (
    <div>
      This is a not custom description
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(counterMock({ description: NotADescription, ...requiredAttributes }));

  const maybeDescription = screen.queryByTestId('test');

  expect(maybeDescription).not.toBeInTheDocument();
});

test('accepts an Error Component', async () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlError>
  );

  render(<FormGroup>{counterMock({ error: CustomError, ...requiredAttributes })}</FormGroup>);

  const error = await screen.findByTestId('test');

  expect(error).toBeInTheDocument();
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(<FormGroup>{counterMock({ error: NotAnError, ...requiredAttributes })}</FormGroup>);

  const maybeError = screen.queryByTestId('test');

  expect(maybeError).not.toBeInTheDocument();
});

test('renders both the add and subtract icons', () => {
  const { getAllByRole } = render(counterMock(requiredAttributes));

  const buttons = getAllByRole('button');

  expect(buttons).toHaveLength(2);
});

test('buttons are disabled when value hits max or min', async () => {
  const { rerender } = render(counterMock({ ...requiredAttributes, value: 0 }));

  const [decreaseButton, increaseButton] = await screen.findAllByRole('button');

  expect(decreaseButton).toBeDisabled();
  expect(increaseButton).toBeEnabled();

  rerender(counterMock({ ...requiredAttributes, value: 10 }));

  expect(decreaseButton).toBeEnabled();
  expect(increaseButton).toBeDisabled();
});

test('value prop only accepts whole numbers', async () => {
  render(counterMock({ max: 20, ...requiredAttributes, value: 1.5 }));

  expect(handleChange).toHaveBeenCalledWith(2);
});

test('value increases when increase or decrease icons are clicked', async () => {
  render(counterMock(requiredAttributes));

  const counter = await screen.findByRole('textbox');

  expect(counter).toHaveValue('5');

  const decreaseButton = await screen.findByRole('button', { name: 'Decrease count' });
  const increaseButton = await screen.findByRole('button', { name: 'Increase count' });

  await userEvent.click(increaseButton);

  expect(handleChange).toHaveBeenCalledWith(6);

  await userEvent.click(decreaseButton);

  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value increases and decreases with arrow keypresses', async () => {
  render(counterMock(requiredAttributes));

  const counter = await screen.findByRole('textbox');

  expect(counter).toHaveValue('5');

  await userEvent.click(counter);
  await userEvent.keyboard('{arrowUp}');

  expect(handleChange).toHaveBeenCalledWith(6);

  await userEvent.keyboard('{arrowDown}');

  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value is set to 0 when pressing Escape', async () => {
  render(counterMock(requiredAttributes));

  const counter = await screen.findByRole('textbox');

  expect(counter).toHaveValue('5');

  await userEvent.type(counter, '{escape}');

  expect(handleChange).toHaveBeenCalledWith(0);
});

test('value does not change when pressing Enter', async () => {
  render(counterMock(requiredAttributes));

  const counter = await screen.findByRole('textbox');

  expect(counter).toHaveValue('5');

  await userEvent.type(counter, '{enter}');

  expect(handleChange).not.toHaveBeenCalled();
});

test('provided onCountChange function is called on value change', async () => {
  render(counterMock(requiredAttributes));

  const increase = await screen.findByRole('button', { name: 'Increase count' });

  await userEvent.click(increase);

  expect(handleChange).toHaveBeenCalledWith(6);
});

test('error shows with valid string', async () => {
  const error = 'Error';
  const { rerender } = render(
    <FormGroup>{counterMock({ error: '', ...requiredAttributes })}</FormGroup>,
  );

  let errorText = screen.queryByText(error);

  expect(errorText).not.toBeInTheDocument();

  rerender(<FormGroup>{counterMock({ error, ...requiredAttributes })}</FormGroup>);

  errorText = await screen.findByText(error);

  expect(errorText).toBeInTheDocument();
});

test('error shows when an array of strings', () => {
  const errors = ['Error 0', 'Error 1'];

  render(<FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>);

  errors.forEach((error) => expect(screen.getByText(error)).toBeInTheDocument());
});

test('error shows when an array of Errors', () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));

  render(<FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>);

  testIds.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
});

test('input counter value does not change when using it inside a form', async () => {
  const handleOnSubmit = jest.fn((e: React.FormEvent) => {
    e.preventDefault();
  });

  render(
    <Form onSubmit={handleOnSubmit}>
      <FormGroup>{counterMock(requiredAttributes)}</FormGroup>
      <Button type="submit">Save</Button>
    </Form>,
  );

  const input = await screen.findByRole('textbox');

  await userEvent.type(input, '{enter}');

  expect(handleChange).not.toHaveBeenCalled();
  expect(handleOnSubmit).toHaveBeenCalledTimes(1);
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    const { queryByTestId } = render(
      <FormGroup>{counterMock({ error, ...requiredAttributes })}</FormGroup>,
    );

    const maybeError = queryByTestId('err');

    expect(maybeError).not.toBeInTheDocument();
  });

  test('array of elements', () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    const { queryByTestId } = render(
      <FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>,
    );

    const maybeError = queryByTestId('err');

    expect(maybeError).not.toBeInTheDocument();
  });
});

test('appends * text to label if input is required', () => {
  render(counterMock({ required: true, ...requiredAttributes }));

  expect(screen.getByLabelText('Label *')).toBeInTheDocument();
});

test('renders localized labels', async () => {
  render(
    counterMock({
      ...requiredAttributes,
      localization: {
        decreaseCount: 'Decrementar cuenta',
        increaseCount: 'Incrementar cuenta',
      },
    }),
  );

  const decreaseButton = await screen.findByRole('button', { name: 'Decrementar cuenta' });
  const increaseButton = await screen.findByRole('button', { name: 'Incrementar cuenta' });

  expect(decreaseButton).toBeInTheDocument();
  expect(increaseButton).toBeInTheDocument();
});

test('calls onFocus callback when provided', async () => {
  const onFocus = jest.fn();

  render(<Counter {...requiredAttributes} onFocus={onFocus} />);

  const counter = await screen.findByRole('textbox');

  await userEvent.click(counter);

  expect(onFocus).toHaveBeenCalled();
});

test('calls onBlur callback when provided', async () => {
  const onBlur = jest.fn();

  render(<Counter {...requiredAttributes} onBlur={onBlur} />);

  const counter = await screen.findByRole('textbox');

  await userEvent.click(counter);
  await userEvent.tab();

  expect(onBlur).toHaveBeenCalled();
});

test('increases to next multiple of step when value is not a multiple', async () => {
  const onCountChange = jest.fn();

  // Use value 5, step 2: 5 is not a multiple of 2
  // Should increase to: 5 + (2 - 5%2) = 5 + (2 - 1) = 5 + 1 = 6
  render(counterMock({ value: 5, step: 2, max: 20, onCountChange }));

  const increaseButton = await screen.findByRole('button', { name: 'Increase count' });

  onCountChange.mockClear();

  await userEvent.click(increaseButton);

  // 5 is not a multiple of 2, so should increase to 6 (5 + (2 - 5%2)) - line 103
  expect(onCountChange).toHaveBeenCalledWith(6);
});

test('decreases to previous multiple of step when value is not a multiple', async () => {
  const onCountChange = jest.fn();

  // Use value 5, step 2: 5 is not a multiple of 2
  // Should decrease to: 5 - 5%2 = 5 - 1 = 4
  render(counterMock({ value: 5, step: 2, max: 20, onCountChange }));

  const decreaseButton = await screen.findByRole('button', { name: 'Decrease count' });

  onCountChange.mockClear();

  await userEvent.click(decreaseButton);

  // 5 is not a multiple of 2, so should decrease to 4 (5 - 5%2) - line 118
  expect(onCountChange).toHaveBeenCalledWith(4);
});

test('handles manual input change with valid number within range', async () => {
  const onCountChange = jest.fn();

  render(counterMock({ value: 5, max: 20, min: 0, onCountChange }));

  const counter = await screen.findByRole('textbox');

  onCountChange.mockClear();

  // Use fireEvent.change to directly set the value
  fireEvent.change(counter, { target: { value: '8' } });

  // Should call onCountChange with 8 (tests line 133-134)
  expect(onCountChange).toHaveBeenCalledWith(8);
});

test('handles manual input change with non-integer value gets rounded', async () => {
  const onCountChange = jest.fn();

  render(counterMock({ value: 5, max: 20, min: 0, onCountChange }));

  const counter = await screen.findByRole('textbox');

  onCountChange.mockClear();

  // Use fireEvent.change to set a non-integer value
  fireEvent.change(counter, { target: { value: '3.5' } });

  // Should have been called with rounded value 4 (tests line 129-130)
  expect(onCountChange).toHaveBeenCalledWith(4);
});

test('ignores manual input with non-numeric value', async () => {
  render(counterMock({ ...requiredAttributes, value: 5 }));

  const counter = await screen.findByRole('textbox');

  handleChange.mockClear();

  await userEvent.type(counter, 'abc');

  // Should not call onCountChange for non-numeric input
  expect(handleChange).not.toHaveBeenCalled();
});

test('does not change value when manual input exceeds max', async () => {
  const onCountChange = jest.fn();

  render(counterMock({ value: 5, max: 10, onCountChange }));

  const counter = await screen.findByRole('textbox');

  await userEvent.clear(counter);
  await userEvent.type(counter, '15');

  // Should call with valid intermediate values (1, 5) but not 15 since 15 > 10
  // Check that it wasn't called with 15
  expect(onCountChange).not.toHaveBeenCalledWith(15);
});

test('does not change value when manual input below min', async () => {
  const onCountChange = jest.fn();

  render(counterMock({ value: 5, min: 2, onCountChange }));

  const counter = await screen.findByRole('textbox');

  await userEvent.clear(counter);
  await userEvent.type(counter, '1');

  // Should not call onCountChange with 1 since 1 < 2 (min)
  expect(onCountChange).not.toHaveBeenCalledWith(1);
});

test('renders without label when label is not provided', () => {
  const { container } = render(<Counter onCountChange={handleChange} value={5} />);

  const label = container.querySelector('label');

  expect(label).not.toBeInTheDocument();
});
