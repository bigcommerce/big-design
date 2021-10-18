import 'jest-styled-components';
import { fireEvent, render } from '@testing-library/react';
import React, { createRef } from 'react';

import { act } from '@test/utils';

import { warning } from '../../utils';
import { FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Timepicker } from './';

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<HTMLInputElement>();
  const { findByRole } = render(<Timepicker ref={ref} onTimeChange={jest.fn()} />);

  const input = await findByRole('textbox');

  expect(ref.current).toEqual(input);
});

test('calls onTimeChange function when a value is selected', async () => {
  const changeFunction = jest.fn();
  const { findAllByRole, findByTestId } = render(<Timepicker onTimeChange={changeFunction} data-testid="timepicker" />);

  const input = await findByTestId('timepicker');

  await act(async () => {
    await fireEvent.click(input);
  });

  const options = await findAllByRole('option');

  expect(options.length).toBe(25);

  await act(async () => {
    await fireEvent.click(options[3]);
  });

  expect(changeFunction).toHaveBeenCalledWith('3:00', { content: '3:00 AM', value: '3:00' });
});

test('renders label as a string', async () => {
  const { findByText } = render(<Timepicker label="Time" onTimeChange={jest.fn()} data-testid="timepicker" />);

  const text = await findByText('Time');

  expect(text).toBeInTheDocument();
});

test('accepts a Label Component', async () => {
  const { findByText } = render(
    <Timepicker label={<FormControlLabel>Time</FormControlLabel>} onTimeChange={jest.fn()} data-testid="timepicker" />,
  );
  const text = await findByText('Time');

  expect(text).toBeInTheDocument();
});

test('does not accept non-Label Components', async () => {
  const NotALabel = (
    <div>
      This is a not custom Label Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId, findByTestId } = render(
    <Timepicker label={NotALabel} onTimeChange={jest.fn()} data-testid="timepicker" />,
  );

  await findByTestId('timepicker');
  const label = queryByTestId('test');

  expect(label).not.toBeInTheDocument();
});

test('accepts an Error Component', async () => {
  const CustomError = (
    <FormControlError>
      This is a custom Error Component
      <a href="#" data-testid="test">
        has a url
      </a>
    </FormControlError>
  );

  const { findByTestId } = render(
    <FormGroup>
      <Timepicker error={CustomError} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  const label = await findByTestId('test');

  expect(label).toBeInTheDocument();
});

test('renders an error', async () => {
  const errorText = 'This is an error';
  const { findByText } = render(
    <FormGroup>
      <Timepicker error={errorText} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  const error = await findByText(errorText);

  expect(error).toBeInTheDocument();
});

test('does not accept non-Error Components', async () => {
  const NotAnError = (
    <div>
      This is a not a custom error component
      <a href="#" data-testid="test">
        has a url
      </a>
    </div>
  );

  const { queryByTestId, findByTestId } = render(
    <FormGroup>
      <Timepicker error={NotAnError} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  await findByTestId('timepicker');
  const error = queryByTestId('test');

  expect(error).not.toBeInTheDocument();
});

test('error shows with valid string', async () => {
  const errorMsg = 'Error';
  const { rerender, findByText, queryByText, findByTestId } = render(
    <FormGroup>
      <Timepicker error="" onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  await findByTestId('timepicker');
  let error = queryByText(errorMsg);

  expect(error).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <Timepicker error={errorMsg} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  error = await findByText(errorMsg);

  expect(error).toBeInTheDocument();
});

test('error shows when an array of strings', async () => {
  const errors = ['Error 0', 'Error 1'];
  const { findByText } = render(
    <FormGroup>
      <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  const error0 = await findByText(errors[0]);
  const error1 = await findByText(errors[1]);

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
  const { findByTestId } = render(
    <FormGroup>
      <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
    </FormGroup>,
  );

  const error0 = await findByTestId(testIds[0]);
  const error1 = await findByTestId(testIds[1]);

  expect(error0).toBeInTheDocument();
  expect(error1).toBeInTheDocument();
});

describe('error does not show when invalid type', () => {
  test('single element', async () => {
    const error = <div data-testid="err">Error</div>;
    const { queryByTestId, findByTestId } = render(
      <FormGroup>
        <Timepicker error={error} onTimeChange={jest.fn()} data-testid="timepicker" />
      </FormGroup>,
    );

    await findByTestId('timepicker');
    const err = queryByTestId('err');

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

    const { queryByTestId, findByTestId } = render(
      <FormGroup>
        <Timepicker error={errors} onTimeChange={jest.fn()} data-testid="timepicker" />
      </FormGroup>,
    );

    await findByTestId('timepicker');
    const err = queryByTestId('err');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(err).not.toBeInTheDocument();
  });
});

test('appends (optional) text to label if input is not required', async () => {
  const { findByText } = render(<Timepicker label="Test Label" onTimeChange={jest.fn()} data-testid="timepicker" />);

  const label = await findByText('Test Label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
