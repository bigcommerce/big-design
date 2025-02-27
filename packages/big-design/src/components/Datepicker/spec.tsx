import 'jest-styled-components';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import { default as ReactDatePicker } from 'react-datepicker';

import { FormGroup } from '..';

import { Datepicker } from './index';

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<ReactDatePicker>();
  const { container } = render(<Datepicker onDateChange={jest.fn()} ref={ref} />);

  const input = await screen.findByRole('textbox');

  await userEvent.click(input);

  const datepicker = container.querySelector('.react-datepicker');
  const refClassname = ref?.current?.props?.calendarClassName ?? '';

  expect(datepicker?.className.includes(refClassname)).toBeTruthy();
});

test('renders select label', () => {
  const { getByText } = render(
    <Datepicker data-testid="datepicker" label="test" onDateChange={jest.fn()} />,
  );

  expect(getByText('test')).toBeInTheDocument();
});

test('calls onDateChange function when a date cell is clicked', async () => {
  const changeFunction = jest.fn();

  render(<Datepicker onDateChange={changeFunction} />);

  const input = await screen.findByRole('textbox');

  await userEvent.click(input);

  const cell = await screen.findByRole('option', { current: 'date' });

  await userEvent.click(cell);

  expect(changeFunction).toHaveBeenCalled();
});

test('no error when input date value manually', async () => {
  const changeFunction = jest.fn();

  render(<Datepicker onDateChange={changeFunction} />);

  const dateString = new Date('Wed, 03 June, 2020');

  const input = await screen.findByRole('textbox');

  await waitFor(() => {
    fireEvent.input(input, {
      target: {
        value: dateString.toDateString(),
      },
    });
  });

  expect(changeFunction).toHaveBeenCalled();
  expect(input?.getAttribute('value')).toEqual(dateString.toDateString());
});

test('renders an error if one is provided', () => {
  const { getByText } = render(
    <FormGroup>
      <Datepicker error="Required" onDateChange={jest.fn()} />
    </FormGroup>,
  );

  expect(getByText('Required')).toBeInTheDocument();
});

test('appends * text to label if select is required', () => {
  render(<Datepicker label="label" onDateChange={jest.fn()} required />);

  expect(screen.getByLabelText('label *')).toBeInTheDocument();
});

test('dates before minimum date passed are disabled', async () => {
  const selectedDate = '2020/1/5';
  const minimumDate = '2020/1/4';
  const { container } = render(
    <Datepicker label="label" min={minimumDate} onDateChange={jest.fn()} value={selectedDate} />,
  );
  const input = await screen.findByRole('textbox');

  await userEvent.click(input);

  const disabledDate = container.querySelector('.react-datepicker__day--003');

  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});

test('dates after max date passed are disabled', async () => {
  const selectedDate = '2020/1/5';
  const maximumDate = '2020/1/10';
  const { container } = render(
    <Datepicker label="label" max={maximumDate} onDateChange={jest.fn()} value={selectedDate} />,
  );
  const input = await screen.findByRole('textbox');

  await userEvent.click(input);

  const disabledDate = container.querySelector('.react-datepicker__day--011');

  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});

test('calls an optional onFocus callback upon focus', async () => {
  const onFocus = jest.fn();

  render(<Datepicker onDateChange={jest.fn()} onFocus={onFocus} />);

  const input = await screen.findByRole('textbox');

  await userEvent.click(input);

  expect(onFocus).toHaveBeenCalled();
});

test('calls an optional onBlur callback upon blur', async () => {
  const onBlur = jest.fn();

  render(<Datepicker onBlur={onBlur} onDateChange={jest.fn()} />);

  const input = await screen.findByRole('textbox');

  await userEvent.click(input);
  await userEvent.tab();

  expect(onBlur).toHaveBeenCalled();
});
