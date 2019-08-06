import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Input } from '../../Input';

import { Row } from './';

test('renders a form row', () => {
  const { container } = render(<Row />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders row with input', () => {
  const { container } = render(
    <Row>
      <Input />
    </Row>,
  );

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders row and input with error', () => {
  const error = 'Error';
  const { getByText } = render(
    <Row>
      <Input error={error} />
    </Row>,
  );

  expect(getByText(error)).toBeInTheDocument();
});
