import 'jest-styled-components';
import { act, fireEvent, render } from '@testing-library/react';
import React, { createRef } from 'react';

import { warning } from '../../utils';
import { FormControlError, FormControlLabel, FormGroup } from '../Form';

import { Timepicker } from './';

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<HTMLInputElement>();
  const { findByRole } = render(<Timepicker onTimeChange={jest.fn()} ref={ref} />);

  const input = await findByRole('combobox');

  expect(ref.current).toEqual(input);
});

test('calls onTimeChange function when a value is selected', async () => {
  const changeFunction = jest.fn();
  const { findAllByRole, findByTestId } = render(
    <Timepicker data-testid="timepicker" onTimeChange={changeFunction} />,
  );

  const input = await findByTestId('timepicker');

  await act(async () => {
    await fireEvent.click(input);
  });

  const options = await findAllByRole('option');

  expect(options).toHaveLength(25);

  await act(async () => {
    await fireEvent.click(options[3]);
  });

  expect(changeFunction).toHaveBeenCalledWith('3:00', { content: '3:00 AM', value: '3:00' });
});

test('renders label as a string', async () => {
  const { findByText } = render(
    <Timepicker data-testid="timepicker" label="Time" onTimeChange={jest.fn()} />,
  );

  const text = await findByText('Time');

  expect(text).toBeInTheDocument();
});

test('accepts a Label Component', async () => {
  const { findByText } = render(
    <Timepicker
      data-testid="timepicker"
      label={<FormControlLabel>Time</FormControlLabel>}
      onTimeChange={jest.fn()}
    />,
  );
  const text = await findByText('Time');

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

  const { queryByTestId, findByTestId } = render(
    <Timepicker data-testid="timepicker" label={NotALabel} onTimeChange={jest.fn()} />,
  );

  await findByTestId('timepicker');

  const label = queryByTestId('test');

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

  const { findByTestId } = render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={CustomError} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const label = await findByTestId('test');

  expect(label).toBeInTheDocument();
});

test('renders an error', async () => {
  const errorText = 'This is an error';
  const { findByText } = render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errorText} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  const error = await findByText(errorText);

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

  const { queryByTestId, findByTestId } = render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={NotAnError} onTimeChange={jest.fn()} />
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
      <Timepicker data-testid="timepicker" error="" onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  await findByTestId('timepicker');

  let error = queryByText(errorMsg);

  expect(error).not.toBeInTheDocument();

  rerender(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errorMsg} onTimeChange={jest.fn()} />
    </FormGroup>,
  );

  error = await findByText(errorMsg);

  expect(error).toBeInTheDocument();
});

test('error shows when an array of strings', async () => {
  const errors = ['Error 0', 'Error 1'];
  const { findByText } = render(
    <FormGroup>
      <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
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
      <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
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
        <Timepicker data-testid="timepicker" error={error} onTimeChange={jest.fn()} />
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
        <Timepicker data-testid="timepicker" error={errors} onTimeChange={jest.fn()} />
      </FormGroup>,
    );

    await findByTestId('timepicker');

    const err = queryByTestId('err');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(err).not.toBeInTheDocument();
  });
});

test('appends * text to label if input is required', async () => {
  const { findByText } = render(
    <Timepicker data-testid="timepicker" label="Test Label" onTimeChange={jest.fn()} required />,
  );

  const label = await findByText('Test Label');

  expect(label?.lastChild).toHaveTextContent('*');
});
