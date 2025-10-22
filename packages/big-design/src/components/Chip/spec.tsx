import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { Chip } from './index';

test('renders the label', () => {
  const label = 'Test';

  render(<Chip label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('renders without close button', () => {
  render(<Chip data-testid="chip" label="Test" />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.getByTestId('chip')).toMatchSnapshot();
});

test('renders with close button if onRemove is present', () => {
  render(<Chip data-testid="chip" label="Test" onDelete={jest.fn()} />);

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByTestId('chip')).toMatchSnapshot();
});

test('onDelete is called when close button is clicked', async () => {
  const onDelete = jest.fn();

  render(<Chip label="Test" onDelete={onDelete} />);

  await userEvent.click(screen.getByRole('button'));

  expect(onDelete).toHaveBeenCalled();
});

test('accepts custom margin props', () => {
  render(<Chip data-testid="chip" label="Test" margin="large" onDelete={jest.fn()} />);

  expect(screen.getByTestId('chip')).toHaveStyle('margin: 1.25rem');
});
