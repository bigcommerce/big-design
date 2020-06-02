import 'jest-styled-components';

import React, { createRef } from 'react';
import ReactDatePicker from 'react-datepicker';

import { fireEvent, render } from '@test/utils';

import { Datepicker } from './index';

test('forwards ref', () => {
  const ref = createRef<ReactDatePicker>();
  const { container } = render(<Datepicker data-testid="datepicker" ref={ref} onChange={jest.fn()} />);
  const input = container.querySelector('input');
  fireEvent.focus(input as HTMLInputElement);
  expect(true).toBe(true);
});
