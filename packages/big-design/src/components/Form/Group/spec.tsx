import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Input } from '../../Input';

import { Group } from './';

test('renders a form group', () => {
  const { container } = render(<Group />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders group with input', () => {
  const { container } = render(
    <Group>
      <Input />
    </Group>,
  );

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders group and input with error', () => {
  const error = 'Error';
  const { getByText } = render(
    <Group>
      <Input error={error} />
    </Group>,
  );

  expect(getByText(error)).toBeInTheDocument();
});
