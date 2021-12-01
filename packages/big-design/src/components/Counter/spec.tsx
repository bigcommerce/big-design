import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ComponentProps, createRef, useState } from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

import { FormControlDescription, FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Counter } from './index';

const CounterMock: React.FC<Partial<ComponentProps<typeof Counter>>> = ({ value = 5, ...props }) => {
  const [counterValue, setCounterValue] = useState(value);
  const handleChange = (value: number) => setCounterValue(value);

  return (
    <Counter
      label="Label"
      error=""
      description=""
      value={counterValue}
      min={0}
      max={100}
      onCountChange={props.onCountChange ?? handleChange}
      {...props}
    />
  );
};

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  render(<Counter value={5} onCountChange={jest.fn()} ref={ref} />);

  const input = screen.getByRole('textbox');

  expect(ref.current).toBe(input);
});

test('renders a counter as an input tag', () => {
  render(<CounterMock value={5} />);

  expect(screen.getByLabelText(/Label/i)).toBeInTheDocument();
});

test('renders a counter with matched label', () => {
  render(<CounterMock value={5} label="Test Label" />);

  // This one checks for matching id and htmlFor
  expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
});

test('create unique ids if not provided', () => {
  render(
    <>
      <CounterMock value={5} label="Label First" />
      <CounterMock value={5} label="Label Second" />
    </>,
  );

  const item1 = screen.getByLabelText(/label first/i);
  const item2 = screen.getByLabelText(/label second/i);

  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', () => {
  const providedIdValue = 'test';

  render(<CounterMock value={5} id={providedIdValue} label="Test Label" />);

  const counter = screen.getByLabelText(/test label/i);

  expect(counter).toHaveAttribute('id', providedIdValue);
});

test('matches label htmlFor with id provided', () => {
  const providedValue = 'test';

  render(<CounterMock value={5} id={providedValue} label="Test Label" />);

  const label = screen.getByText<HTMLLabelElement>(/test label/i);

  expect(label).toHaveAttribute('for', providedValue);
});

test('respects provided labelId', () => {
  const providedValue = 'test';
  render(<CounterMock value={5} labelId={providedValue} label="Test Label" />);

  const label = screen.getByText<HTMLLabelElement>(/test label/i);

  expect(label).toHaveAttribute('id', providedValue);
});

test('renders a description', () => {
  const description = 'This is a description';

  render(<CounterMock value={5} description={description} />);

  expect(screen.getByText(description)).toBeInTheDocument();
});

test('renders an error', () => {
  const error = 'This is an error';

  render(
    <FormGroup>
      <CounterMock value={5} error={error} />
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a href="#">has a url</a>
    </FormControlLabel>
  );

  render(<CounterMock value={5} label={CustomLabel} />);

  expect(screen.getByRole('link')).toBeInTheDocument();
});

test('does not accept non-Label Components', () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a href="#">has a url</a>
    </div>
  );

  render(<CounterMock value={5} label={NotALabel} />);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <FormControlDescription>
      This is a custom Description
      <a href="#">has a url</a>
    </FormControlDescription>
  );

  render(<CounterMock value={5} description={CustomDescription} />);

  expect(screen.getByRole('link')).toBeInTheDocument();
});

test('does not accept non-Description Components', () => {
  const NotADescription = (
    <div>
      This is a not custom description
      <a href="#">has a url</a>
    </div>
  );

  render(<CounterMock value={5} description={NotADescription} />);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a href="#">has a url</a>
    </FormControlError>
  );

  render(
    <FormGroup>
      <CounterMock value={5} error={CustomError} />
    </FormGroup>,
  );

  expect(screen.getByRole('link')).toBeInTheDocument();
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a href="#">has a url</a>
    </div>
  );

  render(
    <FormGroup>
      <CounterMock value={5} error={NotAnError} />
    </FormGroup>,
  );

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('renders both the add and subtract icons', () => {
  render(<CounterMock value={5} />);

  const buttons = screen.getAllByRole('button');

  expect(buttons).toHaveLength(2);
});

test('buttons are disabled when value hits max or min', () => {
  const { rerender } = render(<CounterMock value={0} />);

  const buttons = screen.getAllByRole('button');

  expect(buttons[0]).toBeDisabled;
  expect(buttons[1]).toBeEnabled;

  rerender(<CounterMock value={10} />);

  expect(buttons[0]).toBeEnabled;
  expect(buttons[1]).toBeDisabled;
});

test('value prop only accepts whole numbers', () => {
  render(<CounterMock value={5} />);

  const input = screen.getByRole('textbox');
  const fractionalValue = '1.7';

  userEvent.clear(input);
  userEvent.type(input, fractionalValue);

  expect(input).toHaveValue('17');
});

test('value increases when increase or decrease icons are clicked', () => {
  const handleChange = jest.fn((num: number) => num);
  render(<CounterMock value={5} onCountChange={handleChange} />);

  const counter = screen.getByRole('textbox');
  const increaseButton = screen.getByRole('button', { name: /increase count/i });
  const decreaseButton = screen.getByRole('button', { name: /decrease count/i });

  expect(counter).toHaveValue('5');

  userEvent.click(increaseButton);
  expect(handleChange).toHaveBeenCalledWith(6);

  userEvent.click(decreaseButton);
  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value increases and decreases with arrow keypresses', () => {
  const handleChange = jest.fn((num: number) => num);
  render(<CounterMock value={5} onCountChange={handleChange} />);

  const counter = screen.getByRole('textbox');
  counter.focus();

  expect(counter).toHaveValue('5');
  userEvent.type(counter, '{arrowup}');
  expect(handleChange).toHaveBeenCalledWith(6);
  userEvent.type(counter, '{arrowdown}');
  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value is set to 0 when pressing Escape', () => {
  const handleChange = jest.fn((num: number) => num);
  render(<CounterMock value={5} onCountChange={handleChange} />);

  const counter = screen.getByRole('textbox');

  expect(counter).toHaveValue('5');
  userEvent.type(counter, '{esc}');
  expect(handleChange).toHaveBeenCalledWith(0);
});

test('value does not change when pressing Enter', () => {
  const handleChange = jest.fn((num: number) => num);
  render(<CounterMock value={5} onCountChange={handleChange} />);

  const counter = screen.getByRole('textbox');

  expect(counter).toHaveValue('5');
  userEvent.type(counter, '{enter}');
  expect(handleChange).not.toHaveBeenCalled();
});

test('provided onCountChange function is called on value change', () => {
  const handleChange = jest.fn((num: number) => num);
  render(<CounterMock value={5} onCountChange={handleChange} />);

  const increase = screen.getByTitle('Increase count');

  userEvent.click(increase);
  expect(handleChange).toHaveBeenCalledWith(6);
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { rerender } = render(
    <FormGroup>
      <CounterMock value={5} error="" />
    </FormGroup>,
  );

  expect(screen.queryByText(error)).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <CounterMock value={5} error={error} />
    </FormGroup>,
  );

  expect(screen.getByText(error)).toBeInTheDocument();
});

test('error shows when an array of strings', () => {
  const errors = ['Error 0', 'Error 1'];

  render(
    <FormGroup>
      <CounterMock value={5} error={errors} />
    </FormGroup>,
  );

  errors.forEach((error) => expect(screen.getByText(error)).toBeInTheDocument());
});

test('error shows when an array of Errors', () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));

  render(
    <FormGroup>
      <CounterMock value={5} error={errors} />
    </FormGroup>,
  );

  testIds.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;

    render(
      <FormGroup>
        <CounterMock value={5} error={error} />
      </FormGroup>,
    );

    expect(screen.queryByTestId('err')).not.toBeInTheDocument();
  });

  test('array of elements', () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    render(
      <FormGroup>
        <CounterMock value={5} error={errors} />
      </FormGroup>,
    );

    expect(screen.queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('appends (optional) text to label if input is not required', () => {
  render(<CounterMock value={5} label="Test Label" />);

  const label = screen.getByText(/test label/i);

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
