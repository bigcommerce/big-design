import userEvent from '@testing-library/user-event';
import React, { createRef, Ref } from 'react';
import 'jest-styled-components';

import { render, screen } from '@test/utils';

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
  id = '',
  error = '',
  description = '',
  value,
  onCountChange,
  min = 0,
  max = 10,
  dataTestId = '',
}: MockCounterProps) => (
  <Counter
    data-testid={dataTestId}
    description={description}
    error={error}
    id={id}
    label={label}
    labelId={labelId}
    max={max}
    min={min}
    onCountChange={onCountChange}
    ref={ref}
    value={value}
  />
);

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(counterMock({ ref, ...requiredAttributes }));
  const counter = container.querySelector('input');

  expect(ref.current).toBe(counter);
});

test('renders a counter as an input tag', () => {
  const { container } = render(counterMock(requiredAttributes));

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders a counter with matched label', () => {
  const { queryByLabelText } = render(counterMock({ label: 'Test Label', ...requiredAttributes }));

  // This one checks for matching id and htmlFor
  expect(queryByLabelText('Test Label')).toBeInTheDocument();
});

test('create unique ids if not provided', async () => {
  render(
    <>
      {counterMock({ dataTestId: 'item1', label: 'Test Label', ...requiredAttributes })}
      {counterMock({ dataTestId: 'item2', label: 'Test Label', ...requiredAttributes })}
    </>,
  );

  const [item1, item2] = await screen.findAllByLabelText<HTMLInputElement>('Test Label');

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
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

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(
    counterMock({ description: descriptionText, ...requiredAttributes }),
  );

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(
    <FormGroup>{counterMock({ error: errorText, ...requiredAttributes })}</FormGroup>,
  );

  expect(queryByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlLabel>
  );

  const { queryByTestId } = render(counterMock({ label: CustomLabel, ...requiredAttributes }));

  expect(queryByTestId('test')).toBeInTheDocument();
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

  const { queryByTestId } = render(counterMock({ label: NotALabel, ...requiredAttributes }));

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts a Description Component', () => {
  const CustomDescription = (
    <FormControlDescription>
      This is a custom Description
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlDescription>
  );

  const { queryByTestId } = render(
    counterMock({ description: CustomDescription, ...requiredAttributes }),
  );

  expect(queryByTestId('test')).toBeInTheDocument();
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

  const { queryByTestId } = render(
    counterMock({ description: NotADescription, ...requiredAttributes }),
  );

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </FormControlError>
  );

  const { queryByTestId } = render(
    <FormGroup>{counterMock({ error: CustomError, ...requiredAttributes })}</FormGroup>,
  );

  expect(queryByTestId('test')).toBeInTheDocument();
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

  const { queryByTestId } = render(
    <FormGroup>{counterMock({ error: NotAnError, ...requiredAttributes })}</FormGroup>,
  );

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('renders both the add and subtract icons', () => {
  const { getAllByRole } = render(counterMock(requiredAttributes));

  const buttons = getAllByRole('button');

  expect(buttons).toHaveLength(2);
});

test('buttons are disabled when value hits max or min', () => {
  const { getAllByRole, rerender } = render(counterMock({ ...requiredAttributes, value: 0 }));

  const buttons = getAllByRole('button');

  expect(buttons[0]).toHaveProperty('disabled', true);
  expect(buttons[1]).toHaveProperty('disabled', false);

  rerender(counterMock({ ...requiredAttributes, value: 10 }));

  expect(buttons[0]).toHaveProperty('disabled', false);
  expect(buttons[1]).toHaveProperty('disabled', true);
});

test('value prop only accepts whole numbers', async () => {
  render(counterMock({ max: 20, ...requiredAttributes, value: 1.5 }));

  expect(handleChange).toHaveBeenCalledWith(2);
});

test('value increases when increase or decrease icons are clicked', async () => {
  const { container } = render(counterMock(requiredAttributes));

  const counter = await screen.findByDisplayValue<HTMLInputElement>('5');

  const icons = container.getElementsByTagName('svg');

  expect(counter.value).toBe('5');

  await userEvent.click(icons[1]);

  expect(handleChange).toHaveBeenCalledWith(6);

  await userEvent.click(icons[0]);

  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value increases and decreases with arrow keypresses', async () => {
  render(counterMock(requiredAttributes));

  const counter = screen.getByDisplayValue<HTMLInputElement>('5');

  counter.focus();

  expect(counter.value).toBe('5');

  await userEvent.keyboard('{arrowUp}');

  expect(handleChange).toHaveBeenCalledWith(6);

  await userEvent.keyboard('{arrowDown}');

  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value is set to 0 when pressing Escape', async () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5');

  expect(counter.getAttribute('value')).toBe('5');

  await userEvent.type(counter, '{escape}');

  expect(handleChange).toHaveBeenCalledWith(0);
});

test('value does not change when pressing Enter', async () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5');

  expect(counter.getAttribute('value')).toBe('5');

  await userEvent.type(counter, '{enter}');

  expect(handleChange).not.toHaveBeenCalled();
});

test('provided onCountChange function is called on value change', async () => {
  const { getByTitle } = render(counterMock(requiredAttributes));

  const increase = getByTitle('Increase count');

  await userEvent.click(increase);

  expect(handleChange).toHaveBeenCalledWith(6);
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { container, rerender } = render(
    <FormGroup>{counterMock({ error: '', ...requiredAttributes })}</FormGroup>,
  );

  expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();

  rerender(<FormGroup>{counterMock({ error, ...requiredAttributes })}</FormGroup>);

  expect(container.querySelector('[class*="StyledError"]')).toBeInTheDocument();
});

test('error shows when an array of strings', () => {
  const errors = ['Error 0', 'Error 1'];
  const { getByText } = render(
    <FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>,
  );

  errors.forEach((error) => expect(getByText(error)).toBeInTheDocument());
});

test('error shows when an array of Errors', () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));
  const { getByTestId } = render(
    <FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>,
  );

  testIds.forEach((id) => expect(getByTestId(id)).toBeInTheDocument());
});

test('input value does not change when submitting the form via Enter key', async () => {
  const handleOnSubmit = jest.fn((e: React.FormEvent) => {
    e.preventDefault();
  });

  render(
    <Form onSubmit={handleOnSubmit}>
      <FormGroup>{counterMock({ ...requiredAttributes })}</FormGroup>
      <Button type="submit">Save</Button>
    </Form>,
  );

  const input = await screen.findByDisplayValue<HTMLInputElement>('5');

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

    expect(queryByTestId('err')).not.toBeInTheDocument();
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

    expect(queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('appends (optional) text to label if input is not required', () => {
  const { container } = render(counterMock({ label: 'Test Label', ...requiredAttributes }));
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
