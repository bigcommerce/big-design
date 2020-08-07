import 'jest-styled-components';
import { fireEvent, render } from '@testing-library/react';
import React, { createRef } from 'react';

import { FormControlLabel } from '../Form';

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

test('renders timepicker string label', () => {
  const { getByText } = render(<Timepicker label="Time" onTimeChange={jest.fn()} data-testid="timepicker" />);

  expect(getByText('Time')).toBeInTheDocument();
});

test('renders FormControlLabel string label', () => {
  const { getByText } = render(
    <Timepicker label={<FormControlLabel>Time</FormControlLabel>} onTimeChange={jest.fn()} data-testid="timepicker" />,
  );

  expect(getByText('Time')).toBeInTheDocument();
});
