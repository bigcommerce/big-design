import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React, { Ref } from 'react';

import { warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Counter, CounterProps } from './index';

interface MockCounterProps extends CounterProps {
  dataTestId?: string;
  ref?: Ref<HTMLInputElement>;
}

const val = 5;

const handleChange = jest.fn(num => num);

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
  description = 'Description for the counter.',
  value,
  onCountChange,
  min = 0,
  max = 10,
  dataTestId = '',
}: MockCounterProps) => (
  <Counter
    ref={ref}
    label={label}
    labelId={labelId}
    error={error}
    id={id}
    description={description}
    value={value}
    data-testid={dataTestId}
    min={min}
    max={max}
    onCountChange={onCountChange}
  />
);

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
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

test('create unique ids if not provided', () => {
  const { queryByTestId } = render(
    <>
      {counterMock({ dataTestId: 'item1', label: 'Test Label', ...requiredAttributes })}
      {counterMock({ dataTestId: 'item2', label: 'Test Label', ...requiredAttributes })}
    </>,
  );

  const item1 = queryByTestId('item1') as HTMLInputElement;
  const item2 = queryByTestId('item2') as HTMLInputElement;

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
  expect(item1.id).not.toBe(item2.id);
});

test('respects provided id', () => {
  const { container } = render(counterMock({ id: 'test', label: 'Test Label', ...requiredAttributes }));
  const counter = container.querySelector('#test') as HTMLInputElement;

  expect(counter.id).toBe('test');
});

test('matches label htmlFor with id provided', () => {
  const { container } = render(counterMock({ id: 'test', label: 'Test Label', ...requiredAttributes }));
  const label = container.querySelector('label') as HTMLLabelElement;

  expect(label.htmlFor).toBe('test');
});

test('respects provided labelId', () => {
  const { container } = render(counterMock({ label: 'Test Label', labelId: 'test', ...requiredAttributes }));
  const label = container.querySelector('#test') as HTMLLabelElement;

  expect(label.id).toBe('test');
});

test('renders a description', () => {
  const descriptionText = 'This is a description';
  const { queryByText } = render(counterMock({ description: descriptionText, ...requiredAttributes }));

  expect(queryByText(descriptionText)).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(<FormGroup>{counterMock({ error: errorText, ...requiredAttributes })}</FormGroup>);

  expect(queryByText(errorText)).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const CustomLabel = (
    <FormControlLabel>
      This is a custom Label
      <a href="#" data-testid="test">
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
      <a href="#" data-testid="test">
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
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlDescription>
  );

  const { queryByTestId } = render(counterMock({ description: CustomDescription, ...requiredAttributes }));

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Description Components', () => {
  const NotADescription = (
    <div>
      This is a not custom description
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(counterMock({ description: NotADescription, ...requiredAttributes }));

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('accepts an Error Component', () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlError>
  );

  const { queryByTestId } = render(<FormGroup>{counterMock({ error: CustomError, ...requiredAttributes })}</FormGroup>);

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('does not accept non-Error Components', () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId } = render(<FormGroup>{counterMock({ error: NotAnError, ...requiredAttributes })}</FormGroup>);

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('renders both the add and subtract icons', () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5');

  expect(counter.previousSibling).toBeInTheDocument();
  expect(counter.nextElementSibling).toBeInTheDocument();
});

test('value increases when increase or decrease icons are clicked', () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5') as HTMLInputElement;
  const decrease = counter.previousElementSibling as HTMLElement;
  const increase = counter.nextElementSibling as HTMLElement;

  expect(counter.value).toEqual('5');
  fireEvent.click(increase);

  expect(handleChange).toHaveBeenCalledWith(6);
  fireEvent.click(decrease);
  expect(handleChange).toHaveBeenCalledWith(4);
});

test('value increases and decreases with arrow keypresses', () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5') as HTMLInputElement;
  counter.focus();

  expect(counter.value).toEqual('5');
  fireEvent.keyDown(counter, { key: 'ArrowUp', code: 'ArrowUp' });
  expect(handleChange).toHaveBeenCalledWith(6);
  fireEvent.keyDown(counter, { key: 'ArrowDown', code: 'ArrowDown' });
  expect(handleChange).toHaveBeenCalledWith(4);
});

test('provided onCountChange function is called on value change', () => {
  const { getByDisplayValue } = render(counterMock(requiredAttributes));

  const counter = getByDisplayValue('5') as HTMLInputElement;
  const increase = counter.nextElementSibling as HTMLElement;

  expect(counter.value).toEqual('5');
  fireEvent.click(increase);
  expect(handleChange).toHaveBeenCalledWith(6);
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { container, rerender } = render(<FormGroup>{counterMock({ error: '', ...requiredAttributes })}</FormGroup>);

  expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();

  rerender(<FormGroup>{counterMock({ error, ...requiredAttributes })}</FormGroup>);

  expect(container.querySelector('[class*="StyledError"]')).toBeInTheDocument();
});

test('error shows when an array of strings', () => {
  const errors = ['Error 0', 'Error 1'];
  const { getByText } = render(<FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>);

  errors.forEach(error => expect(getByText(error)).toBeInTheDocument());
});

test('error shows when an array of Errors', () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map(id => <FormControlError data-testid={id}>Error</FormControlError>);
  const { getByTestId } = render(<FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>);

  testIds.forEach(id => expect(getByTestId(id)).toBeInTheDocument());
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    const { queryByTestId } = render(<FormGroup>{counterMock({ error, ...requiredAttributes })}</FormGroup>);

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
  });

  test('array of elements', () => {
    const errors = ['Error', <FormControlError>Error</FormControlError>, <div data-testid="err">Error</div>];

    const { queryByTestId } = render(<FormGroup>{counterMock({ error: errors, ...requiredAttributes })}</FormGroup>);

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('appends (optional) text to label if input is not required', () => {
  const { container } = render(counterMock({ label: 'Test Label', ...requiredAttributes }));
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
