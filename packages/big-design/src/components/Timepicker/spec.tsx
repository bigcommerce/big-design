import 'jest-styled-components';
import { fireEvent, render } from '@testing-library/react';
import React, { createRef } from 'react';

import { warning } from '../../utils';
import { FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Timepicker } from './';

test('should use the passed in ref object if provided', () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<Timepicker ref={ref} onTimeChange={jest.fn()} />);

  const input = container.querySelector('input');

  expect(ref.current).toEqual(input);
});

test('calls onTimeChange function when a value is selected', () => {
  const changeFunction = jest.fn();
  const { getAllByRole, getByTestId } = render(<Timepicker onTimeChange={changeFunction} data-testid="timepicker" />);

  const input = getByTestId('timepicker');
  fireEvent.focus(input);
  const options = getAllByRole('option');
  expect(options.length).toBe(25);
  fireEvent.click(options[3]);

  expect(changeFunction).toHaveBeenCalledWith('3:00', { content: '3:00 AM', value: '3:00' });
});

test('renders label as a string', () => {
  const { getByText } = render(<Timepicker label="Time" onTimeChange={jest.fn()} data-testid="timepicker" />);

  expect(getByText('Time')).toBeInTheDocument();
});

test('accepts a Label Component', () => {
  const { getByText } = render(
    <Timepicker label={<FormControlLabel>Time</FormControlLabel>} onTimeChange={jest.fn()} data-testid="timepicker" />,
  );

  expect(getByText('Time')).toBeInTheDocument();
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

  const { queryByTestId } = render(<Timepicker label={NotALabel} onTimeChange={jest.fn()} data-testid="timepicker" />);

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

  const { queryByTestId } = render(
    <FormGroup>
      <Timepicker error={CustomError} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  expect(queryByTestId('test')).toBeInTheDocument();
});

test('renders an error', () => {
  const errorText = 'This is an error';
  const { queryByText } = render(
    <FormGroup>
      <Timepicker error={errorText} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  expect(queryByText(errorText)).toBeInTheDocument();
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

  const { queryByTestId } = render(
    <FormGroup>
      <Timepicker error={NotAnError} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  expect(queryByTestId('test')).not.toBeInTheDocument();
});

test('error shows with valid string', () => {
  const error = 'Error';
  const { container, rerender } = render(
    <FormGroup>
      <Timepicker error="" onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  expect(container.querySelector('[class*="StyledError"]')).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <Timepicker error={error} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  expect(container.querySelector('[class*="StyledError"]')).toBeInTheDocument();
});

test('error shows when an array of strings', () => {
  const errors = ['Error 0', 'Error 1'];
  const { getByText } = render(
    <FormGroup>
      <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
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
    <FormGroup>
      <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  testIds.forEach((id) => expect(getByTestId(id)).toBeInTheDocument());
});

describe('error does not show when invalid type', () => {
  test('single element', () => {
    const error = <div data-testid="err">Error</div>;
    const { queryByTestId } = render(
      <FormGroup>
        <Timepicker error={error} onTimeChange={jest.fn()} data-testid="timepicker" />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
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
      <FormGroup>
        <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
      </FormGroup>,
    );

    expect(warning).toHaveBeenCalledTimes(1);
    expect(queryByTestId('err')).not.toBeInTheDocument();
  });
});

test('appends (optional) text to label if input is not required', () => {
  const { container } = render(<Timepicker label="Test Label" onTimeChange={jest.fn()} data-testid="timepicker" />);
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
