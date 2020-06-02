import 'jest-styled-components';

import React, { createRef } from 'react';
import ReactDatePicker from 'react-datepicker';

import { fireEvent, render } from '@test/utils';

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
