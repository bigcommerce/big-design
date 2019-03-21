import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Form } from './index';

test('forwards ref', () => {
  const ref = React.createRef<HTMLFormElement>();

  const { container } = render(<Form ref={ref} />);
  const form = container.querySelector('form');

  expect(form).toBe(ref.current);
});

test('calls onSubmit', () => {
  const onSubmit = jest.fn();
  const { container } = render(<Form onSubmit={onSubmit} />);
  const form = container.querySelector('form') as HTMLFormElement;

  fireEvent.submit(form);

  expect(onSubmit).toHaveBeenCalled();
});
