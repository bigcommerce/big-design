import 'jest-styled-components';

import { Placement } from '@popperjs/core';
import userEvent from '@testing-library/user-event';
import React, { createRef } from 'react';
import DatePicker from 'react-datepicker';

import { render } from '@test/utils';

import { FormGroup } from '..';

import { Datepicker } from './index';

jest.mock(
  'react-popper',
  () =>
    class Popper {
      static placements: Placement[] = [
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ];

      constructor() {
        return {
          destroy: () => jest.fn(),
          scheduleUpdate: () => jest.fn(),
        };
      }
    },
);

test('should use the passed in ref object if provided', async () => {
  const ref = createRef<DatePicker>();
  const { container } = render(<Datepicker ref={ref} onDateChange={jest.fn()} />);

  const input = container.querySelector('input');

  await userEvent.click(input as HTMLInputElement);
  const datepicker = container.querySelector('.react-datepicker');

  expect(datepicker?.className.includes(ref.current?.props.calendarClassName as string)).toBeTruthy();
});

test('renders select label', () => {
  const { getByText } = render(<Datepicker data-testid="datepicker" label={'test'} onDateChange={jest.fn()} />);

  expect(getByText('test')).toBeInTheDocument();
});

test('calls onDateChange function when a date cell is clicked', async () => {
  const changeFunction = jest.fn();
  const { container } = render(<Datepicker onDateChange={changeFunction} />);

  const input = container.querySelector('input');

  await userEvent.click(input as HTMLInputElement);

  const datepicker = container.querySelector('.react-datepicker');

  const cell = datepicker?.querySelector('.react-datepicker__day--today');

  await userEvent.click(cell as HTMLElement);

  expect(changeFunction).toHaveBeenCalled();
});

test('no error when input date value manually', async () => {
  const changeFunction = jest.fn();
  const { container } = render(<Datepicker onDateChange={changeFunction} />);

  const dateString = 'Wed, 03 June, 2020';
  const input = container.querySelector('input');

  await userEvent.type(input as HTMLInputElement, dateString);

  expect(changeFunction).toBeCalled();
  expect(input?.getAttribute('value')).toEqual(dateString);
});

test('renders an error if one is provided', () => {
  const { getByText } = render(
    <FormGroup>
      <Datepicker onDateChange={jest.fn()} error="Required" />
    </FormGroup>,
  );

  expect(getByText('Required')).toBeInTheDocument();
});

test('appends (optional) text to label if select is not required', () => {
  const { container } = render(<Datepicker onDateChange={jest.fn()} label="label" />);
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});

test('dates before minimum date passed are disabled', async () => {
  const selectedDate = '2020/1/5';
  const minimumDate = '2020/1/4';
  const { container } = render(
    <Datepicker onDateChange={jest.fn()} value={selectedDate} min={minimumDate} label="label" />,
  );
  const input = container.querySelector('input');

  await userEvent.click(input as HTMLInputElement);

  const disabledDate = container.querySelector('.react-datepicker__day--003');
  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});

test('dates after max date passed are disabled', async () => {
  const selectedDate = '2020/1/5';
  const maximumDate = '2020/1/10';
  const { container } = render(
    <Datepicker onDateChange={jest.fn()} value={selectedDate} max={maximumDate} label="label" />,
  );
  const input = container.querySelector('input');

  await userEvent.click(input as HTMLInputElement);

  const disabledDate = container.querySelector('.react-datepicker__day--011');
  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});
