import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';

import { warning } from '../../utils';
import { FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Timepicker } from './';

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<HTMLInputElement>();

  render(<Timepicker onTimeChange={jest.fn()} ref={ref} />);

  const input = await screen.findByRole('combobox');

  expect(ref.current).toEqual(input);
});

test('calls onTimeChange function when a value is selected', async () => {
  const changeFunction = jest.fn();

  render(<Timepicker data-testid="timepicker" onTimeChange={changeFunction} />);

  const input = await screen.findByTestId('timepicker');

  await userEvent.click(input);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(25);

  await userEvent.click(options[3]);

  expect(changeFunction).toHaveBeenCalledWith('3:00', { content: '3:00 AM', value: '3:00' });
});

test('renders label as a string', async () => {
  render(<Timepicker data-testid="timepicker" label="Time" onTimeChange={jest.fn()} />);

  const text = await screen.findByText('Time');

  expect(text).toBeInTheDocument();
});

test('accepts a Label Component', async () => {
  render(
    <Timepicker
      data-testid="timepicker"
      label={<FormControlLabel>Time</FormControlLabel>}
      onTimeChange={jest.fn()}
    />,
  );

  const text = await screen.findByText('Time');

  expect(text).toBeInTheDocument();
});

test('does not accept non-Label Components', async () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(<Timepicker data-testid="timepicker" label={NotALabel} onTimeChange={jest.fn()} />);

  await screen.findByTestId('timepicker');

  const label = screen.queryByTestId('test');

  expect(label).not.toBeInTheDocument();
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

  render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={CustomError} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const label = await screen.findByTestId('test');

  expect(label).toBeInTheDocument();
});

test('renders an error', async () => {
  const errorText = 'This is an error';

  render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errorText} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const error = await screen.findByText(errorText);

  expect(error).toBeInTheDocument();
});

test('does not accept non-Error Components', async () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a data-testid="test" href="#">
        has a url
      </a>
    </div>
  );

  render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={NotAnError} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  await screen.findByTestId('timepicker');

  const error = screen.queryByTestId('test');

  expect(error).not.toBeInTheDocument();
});

test('error shows with valid string', async () => {
  const errorMsg = 'Error';
  const { rerender } = render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error="" onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  await screen.findByTestId('timepicker');

  let error = screen.queryByText(errorMsg);

  expect(error).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errorMsg} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  error = await screen.findByText(errorMsg);

  expect(error).toBeInTheDocument();
});

test('error shows when an array of strings', async () => {
  const errors = ['Error 0', 'Error 1'];

  render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const error0 = await screen.findByText(errors[0]);
  const error1 = await screen.findByText(errors[1]);

  expect(error0).toBeInTheDocument();
  expect(error1).toBeInTheDocument();
});

test('error shows when an array of Errors', async () => {
  const testIds = ['error_0', 'error_1'];
  const errors = testIds.map((id) => (
    <FormControlError data-testid={id} key={id}>
      Error
    </FormControlError>
  ));

  render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const error0 = await screen.findByTestId(testIds[0]);
  const error1 = await screen.findByTestId(testIds[1]);

  expect(error0).toBeInTheDocument();
  expect(error1).toBeInTheDocument();
});

describe('error does not show when invalid type', () => {
  test('single element', async () => {
    const error = <div data-testid="err">Error</div>;

    render(
      <FormGroup>
        <Timepicker data-testid="timepicker" error={error} onTimeChange={jest.fn()} />
      </FormGroup>,
    );

    await screen.findByTestId('timepicker');

    const err = screen.queryByTestId('err');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(err).not.toBeInTheDocument();
  });

  test('array of elements', async () => {
    const errors = [
      'Error',
      <FormControlError key="1">Error</FormControlError>,
      <div data-testid="err" key="2">
        Error
      </div>,
    ];

    render(
      <FormGroup>
        <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
      </FormGroup>,
    );

    await screen.findByTestId('timepicker');

    const err = screen.queryByTestId('err');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(err).not.toBeInTheDocument();
  });
});

test('appends * text to label if input is required', async () => {
  render(
    <Timepicker data-testid="timepicker" label="Test Label" onTimeChange={jest.fn()} required />,
  );

  const label = await screen.findByText('Test Label');
  const required = screen.getByText('*');

  expect(required).toBeInTheDocument();
  expect(label).toContainElement(required);
});
