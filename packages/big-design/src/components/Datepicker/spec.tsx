import 'jest-styled-components';

import React, { createRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { act } from 'react-dom/test-utils';

import { fireEvent, render } from '@test/utils';

import { FormGroup } from '..';

import { Datepicker } from './index';

jest.mock(
  'popper.js',
  () =>
    class Popper {
      static placements = [
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

test('should use the passed in ref object if provided', () => {
  const ref = createRef<ReactDatePicker>();
  const { container } = render(<Datepicker ref={ref} onChange={jest.fn()} />);

  const input = container.querySelector('input');

  fireEvent.focus(input as HTMLInputElement);
  const datepicker = container.querySelector('.react-datepicker');

  expect(datepicker?.className.includes(ref.current?.props.calendarClassName as string)).toBeTruthy();
});

test('renders select label', () => {
  const { getByText } = render(<Datepicker data-testid="datepicker" label={'test'} onChange={jest.fn()} />);

  expect(getByText('test')).toBeInTheDocument();
});

test('calls onChange function when a date cell is clicked', () => {
  const changeFunction = jest.fn();
  const { container } = render(<Datepicker onChange={changeFunction} />);

  const input = container.querySelector('input');

  act(() => {
    fireEvent.focus(input as HTMLInputElement);
  });

  const datepicker = container.querySelector('.react-datepicker');

  const cell = datepicker?.querySelector('.react-datepicker__day--today');

  act(() => {
    fireEvent.click(cell as HTMLElement);
  });

  expect(changeFunction).toHaveBeenCalled();
});

test('renders an error if one is provided', () => {
  const { getByText } = render(
    <FormGroup>
      <Datepicker onChange={jest.fn()} error="Required" />
    </FormGroup>,
  );

  expect(getByText('Required')).toBeInTheDocument();
});

test('appends (optional) text to label if select is not required', () => {
  const { container } = render(<Datepicker onChange={jest.fn()} label="label" />);
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});

test('dates before minimum date passed are disabled', () => {
  const selectedDate = new Date('1/5/2020');
  const minimumDate = new Date('1/4/2020');
  const { container } = render(
    <Datepicker onChange={jest.fn()} selected={selectedDate} minDate={minimumDate} label="label" />,
  );
  const input = container.querySelector('input');

  act(() => {
    fireEvent.focus(input as HTMLInputElement);
  });

  const disabledDate = container.querySelector('.react-datepicker__day--003');
  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});

test('dates after max date passed are disabled', () => {
  const selectedDate = new Date('1/5/2020');
  const maximumDate = new Date('1/10/2020');
  const { container } = render(
    <Datepicker onChange={jest.fn()} selected={selectedDate} maxDate={maximumDate} label="label" />,
  );
  const input = container.querySelector('input');

  act(() => {
    fireEvent.focus(input as HTMLInputElement);
  });

  const disabledDate = container.querySelector('.react-datepicker__day--011');
  expect(disabledDate?.classList.contains('react-datepicker__day--disabled')).toBe(true);
});

test('sets dates which do not satisfy filter as disabled', () => {
  const selectedDate = new Date('1/5/2020');
  const isWeekday = (date: Date) => {
    const day = date.getDay();

    return day !== 0 && day !== 6;
  };

  const { container } = render(<Datepicker onChange={jest.fn()} selected={selectedDate} filterDate={isWeekday} />);
  const input = container.querySelector('input');

  act(() => {
    fireEvent.focus(input as HTMLInputElement);
  });

  const disabledDate = container.querySelector('.react-datepicker__day--disabled');
  const disabledLabel = disabledDate?.getAttribute('aria-label');

  expect(disabledLabel).toBe('Not available Sunday, December 29th, 2019');
});
