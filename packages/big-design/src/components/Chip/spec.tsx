import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Chip } from './index';

test('renders the label', () => {
  const label = 'Test';
  const { queryByText } = render(<Chip>{label}</Chip>);

  expect(queryByText(label)).toBeInTheDocument();
});

test('renders without close button', () => {
  const { queryByRole } = render(<Chip>Test</Chip>);

  expect(queryByRole('button')).not.toBeInTheDocument();
});

test('renders with close button if onRemove is present', () => {
  const { queryByRole } = render(<Chip onDelete={jest.fn()}>Test</Chip>);

  expect(queryByRole('button')).toBeInTheDocument();
});

test('onDelete is called when close button is clicked', () => {
  const onDelete = jest.fn();

  const { getByRole } = render(<Chip onDelete={onDelete}>Test</Chip>);

  fireEvent.click(getByRole('button'));

  expect(onDelete).toHaveBeenCalled();
});
